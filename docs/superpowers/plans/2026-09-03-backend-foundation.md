# Backend Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a production-oriented ASP.NET Core 10 foundation with PostgreSQL, tenant isolation primitives, consistent API errors, audit/outbox primitives, health checks and observable request handling.

**Architecture:** A modular monolith lives under `backend/`. Domain modules expose endpoint-registration methods to one API host and share only explicit building-block contracts. PostgreSQL is the transactional source of truth; tenant context is resolved from authenticated claims and applied to EF Core queries.

**Tech Stack:** .NET SDK 10.0.400, ASP.NET Core 10, EF Core 10, Npgsql 10, PostgreSQL 17+, xUnit, FluentAssertions, OpenTelemetry, Docker Compose.

**Spec:** `docs/superpowers/specs/2026-09-03-hospital-hrm-mvp-design.md`

## Global Constraints

- Backend targets `net10.0` with nullable reference types and warnings as errors.
- API base path is `/api/v1`; errors contain `code`, `message`, `fieldErrors`, and `traceId`.
- Tenant identity comes from the authenticated principal, never request bodies or query strings.
- Transactional entities use `Guid` IDs, UTC timestamps and optimistic concurrency.
- Raw logs, audit events and outbox messages are append-only.
- All secrets come from environment variables or a secret store; committed configuration contains no credentials.
- Unit and integration tests must pass before every task commit.

---

### Task 1: Create the .NET solution and enforce build rules

**Files:**
- Create: `global.json`
- Create: `backend/Directory.Build.props`
- Create: `backend/Hiu.Hrm.slnx`
- Create: `backend/src/Hiu.Hrm.Api/Hiu.Hrm.Api.csproj`
- Create: `backend/src/Hiu.Hrm.BuildingBlocks/Hiu.Hrm.BuildingBlocks.csproj`
- Create: `backend/tests/Hiu.Hrm.ArchitectureTests/Hiu.Hrm.ArchitectureTests.csproj`
- Modify: `.gitignore`

**Interfaces:**
- Produces: solution projects `Hiu.Hrm.Api`, `Hiu.Hrm.BuildingBlocks`, and `Hiu.Hrm.ArchitectureTests`.

- [ ] **Step 1: Pin the SDK and create projects**

```powershell
dotnet new globaljson --sdk-version 10.0.400 --roll-forward latestPatch
New-Item -ItemType Directory -Force backend/src,backend/tests
dotnet new sln -n Hiu.Hrm -o backend --format slnx
dotnet new webapi -n Hiu.Hrm.Api -o backend/src/Hiu.Hrm.Api -f net10.0 --no-https
dotnet new classlib -n Hiu.Hrm.BuildingBlocks -o backend/src/Hiu.Hrm.BuildingBlocks -f net10.0
dotnet new xunit -n Hiu.Hrm.ArchitectureTests -o backend/tests/Hiu.Hrm.ArchitectureTests -f net10.0
dotnet sln backend/Hiu.Hrm.slnx add backend/src/Hiu.Hrm.Api backend/src/Hiu.Hrm.BuildingBlocks backend/tests/Hiu.Hrm.ArchitectureTests
dotnet add backend/src/Hiu.Hrm.Api reference backend/src/Hiu.Hrm.BuildingBlocks
dotnet add backend/tests/Hiu.Hrm.ArchitectureTests reference backend/src/Hiu.Hrm.Api backend/src/Hiu.Hrm.BuildingBlocks
```

- [ ] **Step 2: Add repository-wide compiler rules**

Create `backend/Directory.Build.props`:

```xml
<Project>
  <PropertyGroup>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <TreatWarningsAsErrors>true</TreatWarningsAsErrors>
    <AnalysisLevel>latest-recommended</AnalysisLevel>
    <ContinuousIntegrationBuild Condition="'$(CI)' == 'true'">true</ContinuousIntegrationBuild>
    <RestorePackagesWithLockFile>true</RestorePackagesWithLockFile>
  </PropertyGroup>
</Project>
```

Append these entries to `.gitignore`:

```gitignore
backend/**/bin/
backend/**/obj/
backend/.vs/
backend/TestResults/
*.user
```

- [ ] **Step 3: Replace template tests with a build smoke test**

Create `backend/tests/Hiu.Hrm.ArchitectureTests/SolutionSmokeTests.cs`:

```csharp
namespace Hiu.Hrm.ArchitectureTests;

public sealed class SolutionSmokeTests
{
    [Fact]
    public void Runtime_is_dotnet_10_or_newer()
    {
        Assert.True(Environment.Version.Major >= 10);
    }
}
```

Delete the generated `UnitTest1.cs` and `WeatherForecast` endpoint/model from the API template.

- [ ] **Step 4: Verify the clean baseline**

Run: `dotnet restore backend/Hiu.Hrm.slnx --use-lock-file`  
Expected: restore succeeds and creates package lock files.

Run: `dotnet build backend/Hiu.Hrm.slnx --no-restore`  
Expected: build succeeds with zero warnings.

Run: `dotnet test backend/Hiu.Hrm.slnx --no-build`  
Expected: `SolutionSmokeTests` passes.

- [ ] **Step 5: Commit**

```powershell
git add global.json backend .gitignore
git commit -m "build: scaffold ASP.NET Core backend"
```

### Task 2: Add building-block domain primitives

**Files:**
- Create: `backend/src/Hiu.Hrm.BuildingBlocks/Domain/Entity.cs`
- Create: `backend/src/Hiu.Hrm.BuildingBlocks/Domain/DomainEvent.cs`
- Create: `backend/src/Hiu.Hrm.BuildingBlocks/Tenancy/ITenantContext.cs`
- Create: `backend/tests/Hiu.Hrm.ArchitectureTests/Domain/EntityTests.cs`

**Interfaces:**
- Produces: `Entity`, `DomainEvent`, `ITenantContext`, and `TenantId` used by every module.

- [ ] **Step 1: Write failing entity tests**

```csharp
using Hiu.Hrm.BuildingBlocks.Domain;

namespace Hiu.Hrm.ArchitectureTests.Domain;

public sealed class EntityTests
{
    [Fact]
    public void AddDomainEvent_records_event_in_order()
    {
        var entity = new TestEntity();
        var first = new TestEvent(Guid.NewGuid(), DateTimeOffset.UtcNow);
        var second = new TestEvent(Guid.NewGuid(), DateTimeOffset.UtcNow);

        entity.Raise(first);
        entity.Raise(second);

        Assert.Equal([first, second], entity.DomainEvents);
    }

    private sealed class TestEntity : Entity
    {
        public void Raise(DomainEvent domainEvent) => AddDomainEvent(domainEvent);
    }

    private sealed record TestEvent(Guid EventId, DateTimeOffset OccurredAt) : DomainEvent(EventId, OccurredAt);
}
```

- [ ] **Step 2: Verify the test fails**

Run: `dotnet test backend/tests/Hiu.Hrm.ArchitectureTests --filter EntityTests`  
Expected: compilation fails because domain primitives do not exist.

- [ ] **Step 3: Implement the primitives**

```csharp
// Domain/DomainEvent.cs
namespace Hiu.Hrm.BuildingBlocks.Domain;
public abstract record DomainEvent(Guid EventId, DateTimeOffset OccurredAt);
```

```csharp
// Domain/Entity.cs
namespace Hiu.Hrm.BuildingBlocks.Domain;
public abstract class Entity
{
    private readonly List<DomainEvent> _domainEvents = [];
    public Guid Id { get; protected init; } = Guid.CreateVersion7();
    public uint Version { get; private set; }
    public IReadOnlyList<DomainEvent> DomainEvents => _domainEvents;
    protected void AddDomainEvent(DomainEvent domainEvent) => _domainEvents.Add(domainEvent);
    public void ClearDomainEvents() => _domainEvents.Clear();
}
```

```csharp
// Tenancy/ITenantContext.cs
namespace Hiu.Hrm.BuildingBlocks.Tenancy;
public readonly record struct TenantId(Guid Value);
public interface ITenantContext
{
    TenantId TenantId { get; }
    bool IsAvailable { get; }
}
```

- [ ] **Step 4: Run tests**

Run: `dotnet test backend/Hiu.Hrm.slnx`  
Expected: all tests pass.

- [ ] **Step 5: Commit**

```powershell
git add backend/src/Hiu.Hrm.BuildingBlocks backend/tests/Hiu.Hrm.ArchitectureTests
git commit -m "feat: add domain and tenant primitives"
```

### Task 3: Resolve tenant context safely from authenticated claims

**Files:**
- Create: `backend/src/Hiu.Hrm.Api/Tenancy/HttpTenantContext.cs`
- Create: `backend/src/Hiu.Hrm.Api/Tenancy/TenantClaims.cs`
- Create: `backend/src/Hiu.Hrm.Api/Tenancy/TenancyServiceCollectionExtensions.cs`
- Create: `backend/tests/Hiu.Hrm.ArchitectureTests/Tenancy/HttpTenantContextTests.cs`
- Modify: `backend/src/Hiu.Hrm.Api/Program.cs`

**Interfaces:**
- Consumes: `ITenantContext`, `TenantId`.
- Produces: scoped `HttpTenantContext`; claim type `tenant_id`.

- [ ] **Step 1: Write tests for valid and missing claims**

```csharp
using System.Security.Claims;
using Hiu.Hrm.Api.Tenancy;
using Microsoft.AspNetCore.Http;

namespace Hiu.Hrm.ArchitectureTests.Tenancy;

public sealed class HttpTenantContextTests
{
    [Fact]
    public void Valid_tenant_claim_is_resolved()
    {
        var id = Guid.NewGuid();
        var http = new DefaultHttpContext { User = new ClaimsPrincipal(new ClaimsIdentity([new Claim(TenantClaims.TenantId, id.ToString())], "test")) };
        var context = new HttpTenantContext(new HttpContextAccessor { HttpContext = http });
        Assert.True(context.IsAvailable);
        Assert.Equal(id, context.TenantId.Value);
    }

    [Fact]
    public void Missing_tenant_claim_is_unavailable()
    {
        var context = new HttpTenantContext(new HttpContextAccessor { HttpContext = new DefaultHttpContext() });
        Assert.False(context.IsAvailable);
        Assert.Throws<InvalidOperationException>(() => context.TenantId);
    }
}
```

- [ ] **Step 2: Verify tests fail**

Run: `dotnet test backend/tests/Hiu.Hrm.ArchitectureTests --filter HttpTenantContextTests`  
Expected: compilation fails because tenancy classes do not exist.

- [ ] **Step 3: Implement tenant resolution**

```csharp
// Tenancy/TenantClaims.cs
namespace Hiu.Hrm.Api.Tenancy;
public static class TenantClaims { public const string TenantId = "tenant_id"; }
```

```csharp
// Tenancy/HttpTenantContext.cs
using Hiu.Hrm.BuildingBlocks.Tenancy;

namespace Hiu.Hrm.Api.Tenancy;
public sealed class HttpTenantContext(IHttpContextAccessor accessor) : ITenantContext
{
    private bool TryGet(out Guid id) => Guid.TryParse(accessor.HttpContext?.User.FindFirst(TenantClaims.TenantId)?.Value, out id);
    public bool IsAvailable => TryGet(out _);
    public TenantId TenantId => TryGet(out var id) ? new TenantId(id) : throw new InvalidOperationException("Authenticated request has no valid tenant_id claim.");
}
```

```csharp
// Tenancy/TenancyServiceCollectionExtensions.cs
using Hiu.Hrm.BuildingBlocks.Tenancy;

namespace Hiu.Hrm.Api.Tenancy;
public static class TenancyServiceCollectionExtensions
{
    public static IServiceCollection AddTenancy(this IServiceCollection services) => services
        .AddHttpContextAccessor()
        .AddScoped<ITenantContext, HttpTenantContext>();
}
```

Register `builder.Services.AddTenancy();` in `Program.cs`.

- [ ] **Step 4: Run tests and build**

Run: `dotnet test backend/Hiu.Hrm.slnx && dotnet build backend/Hiu.Hrm.slnx`  
Expected: all tests pass; zero warnings.

- [ ] **Step 5: Commit**

```powershell
git add backend/src/Hiu.Hrm.Api backend/tests/Hiu.Hrm.ArchitectureTests
git commit -m "feat: resolve tenant from authenticated claims"
```

### Task 4: Add PostgreSQL persistence, audit and outbox schema

**Files:**
- Create: `backend/src/Hiu.Hrm.Api/Persistence/HrmDbContext.cs`
- Create: `backend/src/Hiu.Hrm.Api/Persistence/AuditEvent.cs`
- Create: `backend/src/Hiu.Hrm.Api/Persistence/OutboxMessage.cs`
- Create: `backend/src/Hiu.Hrm.Api/Persistence/PersistenceExtensions.cs`
- Create: `backend/docker-compose.yml`
- Modify: `backend/src/Hiu.Hrm.Api/appsettings.json`
- Modify: `backend/src/Hiu.Hrm.Api/Hiu.Hrm.Api.csproj`
- Create: `backend/tests/Hiu.Hrm.ArchitectureTests/Persistence/AppendOnlyModelTests.cs`

**Interfaces:**
- Produces: `HrmDbContext`, tables `audit_events`, `outbox_messages`, connection string `hrm`.

- [ ] **Step 1: Add packages and PostgreSQL container**

```powershell
dotnet add backend/src/Hiu.Hrm.Api package Npgsql.EntityFrameworkCore.PostgreSQL --version 10.0.0
dotnet add backend/src/Hiu.Hrm.Api package Microsoft.EntityFrameworkCore.Design --version 10.0.11
```

Create `backend/docker-compose.yml`:

```yaml
services:
  postgres:
    image: postgres:17-alpine
    environment:
      POSTGRES_DB: hiu_hrm
      POSTGRES_USER: hiu_hrm
      POSTGRES_PASSWORD: local_only_password
    ports: ["5432:5432"]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U hiu_hrm -d hiu_hrm"]
      interval: 5s
      timeout: 3s
      retries: 10
```

- [ ] **Step 2: Write a model test**

```csharp
using Hiu.Hrm.Api.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hiu.Hrm.ArchitectureTests.Persistence;
public sealed class AppendOnlyModelTests
{
    [Theory]
    [InlineData(typeof(AuditEvent))]
    [InlineData(typeof(OutboxMessage))]
    public void Append_only_records_have_tenant_and_timestamp(Type type)
    {
        var properties = type.GetProperties().Select(x => x.Name).ToHashSet();
        Assert.Contains("TenantId", properties);
        Assert.Contains("OccurredAt", properties);
    }
}
```

- [ ] **Step 3: Verify the test fails**

Run: `dotnet test backend/tests/Hiu.Hrm.ArchitectureTests --filter AppendOnlyModelTests`  
Expected: compilation fails because persistence types do not exist.

- [ ] **Step 4: Implement records and DbContext**

```csharp
namespace Hiu.Hrm.Api.Persistence;
public sealed record AuditEvent(Guid Id, Guid TenantId, DateTimeOffset OccurredAt, Guid? ActorId, string Action, string SubjectType, string SubjectId, string PayloadJson, string TraceId);
public sealed record OutboxMessage(Guid Id, Guid TenantId, DateTimeOffset OccurredAt, string Type, string PayloadJson, DateTimeOffset? ProcessedAt, string? Error);
```

```csharp
using Microsoft.EntityFrameworkCore;

namespace Hiu.Hrm.Api.Persistence;
public sealed class HrmDbContext(DbContextOptions<HrmDbContext> options) : DbContext(options)
{
    public DbSet<AuditEvent> AuditEvents => Set<AuditEvent>();
    public DbSet<OutboxMessage> OutboxMessages => Set<OutboxMessage>();
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AuditEvent>().ToTable("audit_events").HasKey(x => x.Id);
        modelBuilder.Entity<OutboxMessage>().ToTable("outbox_messages").HasKey(x => x.Id);
        modelBuilder.Entity<AuditEvent>().HasIndex(x => new { x.TenantId, x.OccurredAt });
        modelBuilder.Entity<OutboxMessage>().HasIndex(x => new { x.ProcessedAt, x.OccurredAt });
    }
}
```

```csharp
// Persistence/PersistenceExtensions.cs
using Microsoft.EntityFrameworkCore;

namespace Hiu.Hrm.Api.Persistence;
public static class PersistenceExtensions
{
    public static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("hrm")
            ?? throw new InvalidOperationException("Connection string 'hrm' is required.");
        return services.AddDbContext<HrmDbContext>(options => options.UseNpgsql(connectionString));
    }
}
```

Add `builder.Services.AddPersistence(builder.Configuration);` to `Program.cs`. Add this development-only value to `appsettings.Development.json`:

```json
{
  "ConnectionStrings": {
    "hrm": "Host=localhost;Port=5432;Database=hiu_hrm;Username=hiu_hrm;Password=local_only_password"
  }
}
```

- [ ] **Step 5: Create and apply the migration**

```powershell
dotnet tool install --global dotnet-ef --version 10.0.11
dotnet ef migrations add Foundation --project backend/src/Hiu.Hrm.Api --output-dir Persistence/Migrations
docker compose -f backend/docker-compose.yml up -d postgres
dotnet ef database update --project backend/src/Hiu.Hrm.Api
```

Expected: both tables exist and migration succeeds.

- [ ] **Step 6: Run tests and commit**

```powershell
dotnet test backend/Hiu.Hrm.slnx
git add backend
git commit -m "feat: add PostgreSQL audit and outbox foundation"
```

### Task 5: Standardize API errors and request correlation

**Files:**
- Create: `backend/src/Hiu.Hrm.Api/Errors/ApiProblem.cs`
- Create: `backend/src/Hiu.Hrm.Api/Errors/GlobalExceptionHandler.cs`
- Create: `backend/src/Hiu.Hrm.Api/Diagnostics/CorrelationIdMiddleware.cs`
- Create: `backend/tests/Hiu.Hrm.ArchitectureTests/Api/ApiProblemTests.cs`
- Modify: `backend/src/Hiu.Hrm.Api/Program.cs`

**Interfaces:**
- Produces: JSON error contract `{ code, message, fieldErrors, traceId }`; response header `X-Correlation-ID`.

- [ ] **Step 1: Write the contract test**

```csharp
using Hiu.Hrm.Api.Errors;

namespace Hiu.Hrm.ArchitectureTests.Api;
public sealed class ApiProblemTests
{
    [Fact]
    public void Api_problem_exposes_required_fields()
    {
        var error = new ApiProblem("validation_failed", "Request is invalid", new Dictionary<string, string[]> { ["name"] = ["Required"] }, "trace-1");
        Assert.Equal("validation_failed", error.Code);
        Assert.Equal("trace-1", error.TraceId);
        Assert.Single(error.FieldErrors);
    }
}
```

- [ ] **Step 2: Verify failure, then implement**

Run: `dotnet test backend/tests/Hiu.Hrm.ArchitectureTests --filter ApiProblemTests`  
Expected: compilation fails because `ApiProblem` does not exist.

```csharp
namespace Hiu.Hrm.Api.Errors;
public sealed record ApiProblem(string Code, string Message, IReadOnlyDictionary<string, string[]> FieldErrors, string TraceId);
```

```csharp
// Errors/GlobalExceptionHandler.cs
using System.Diagnostics;
using Microsoft.AspNetCore.Diagnostics;

namespace Hiu.Hrm.Api.Errors;
public sealed class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext context, Exception exception, CancellationToken cancellationToken)
    {
        var traceId = Activity.Current?.TraceId.ToString() ?? context.TraceIdentifier;
        logger.LogError(exception, "Unhandled request error {TraceId}", traceId);
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        await context.Response.WriteAsJsonAsync(
            new ApiProblem("internal_error", "An unexpected error occurred.", new Dictionary<string, string[]>(), traceId),
            cancellationToken);
        return true;
    }
}
```

```csharp
// Diagnostics/CorrelationIdMiddleware.cs
namespace Hiu.Hrm.Api.Diagnostics;
public sealed class CorrelationIdMiddleware(RequestDelegate next, ILogger<CorrelationIdMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        const string header = "X-Correlation-ID";
        var supplied = context.Request.Headers[header].FirstOrDefault();
        var correlationId = !string.IsNullOrWhiteSpace(supplied) && supplied.Length <= 128
            ? supplied
            : Guid.CreateVersion7().ToString();
        context.TraceIdentifier = correlationId;
        context.Response.Headers[header] = correlationId;
        using (logger.BeginScope(new Dictionary<string, object> { ["CorrelationId"] = correlationId }))
        {
            await next(context);
        }
    }
}
```

- [ ] **Step 3: Register middleware in safe order**

In `Program.cs`: call `AddProblemDetails()`, `AddExceptionHandler<GlobalExceptionHandler>()`; after build call `UseExceptionHandler()` followed by `UseMiddleware<CorrelationIdMiddleware>()` before authentication/authorization and endpoints.

- [ ] **Step 4: Test and commit**

```powershell
dotnet test backend/Hiu.Hrm.slnx
dotnet build backend/Hiu.Hrm.slnx --no-restore
git add backend
git commit -m "feat: standardize API errors and correlation"
```

### Task 6: Add health checks, rate limiting, OpenAPI and OpenTelemetry

**Files:**
- Modify: `backend/src/Hiu.Hrm.Api/Hiu.Hrm.Api.csproj`
- Modify: `backend/src/Hiu.Hrm.Api/Program.cs`
- Create: `backend/src/Hiu.Hrm.Api/Diagnostics/DiagnosticsExtensions.cs`
- Create: `backend/tests/Hiu.Hrm.ArchitectureTests/Api/EndpointConventionTests.cs`

**Interfaces:**
- Produces: `/health/live`, `/health/ready`, `/openapi/v1.json`; OTLP configuration through `OTEL_EXPORTER_OTLP_ENDPOINT`.

- [ ] **Step 1: Add packages**

```powershell
dotnet add backend/src/Hiu.Hrm.Api package Microsoft.AspNetCore.OpenApi --version 10.0.11
dotnet add backend/src/Hiu.Hrm.Api package OpenTelemetry.Extensions.Hosting --version 1.14.0
dotnet add backend/src/Hiu.Hrm.Api package OpenTelemetry.Exporter.OpenTelemetryProtocol --version 1.14.0
dotnet add backend/src/Hiu.Hrm.Api package OpenTelemetry.Instrumentation.AspNetCore --version 1.14.0
dotnet add backend/src/Hiu.Hrm.Api package OpenTelemetry.Instrumentation.Http --version 1.14.0
dotnet add backend/src/Hiu.Hrm.Api package OpenTelemetry.Instrumentation.Runtime --version 1.14.0
dotnet add backend/src/Hiu.Hrm.Api package Microsoft.Extensions.Diagnostics.HealthChecks.EntityFrameworkCore --version 10.0.11
```

- [ ] **Step 2: Add a source-level endpoint convention test**

```csharp
namespace Hiu.Hrm.ArchitectureTests.Api;
public sealed class EndpointConventionTests
{
    [Fact]
    public void Api_routes_are_versioned()
    {
        var program = File.ReadAllText(Path.Combine(AppContext.BaseDirectory, "../../../../../src/Hiu.Hrm.Api/Program.cs"));
        Assert.Contains("/api/v1", program, StringComparison.Ordinal);
    }
}
```

- [ ] **Step 3: Verify failure and configure diagnostics**

Run: `dotnet test backend/tests/Hiu.Hrm.ArchitectureTests --filter EndpointConventionTests`  
Expected: test fails because the route group does not exist.

Create `Diagnostics/DiagnosticsExtensions.cs`:

```csharp
using System.Security.Claims;
using System.Threading.RateLimiting;
using Hiu.Hrm.Api.Persistence;
using OpenTelemetry.Metrics;
using OpenTelemetry.Trace;

namespace Hiu.Hrm.Api.Diagnostics;
public static class DiagnosticsExtensions
{
    public static IServiceCollection AddHrmDiagnostics(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddHealthChecks().AddDbContextCheck<HrmDbContext>("postgres", tags: ["ready"]);
        services.AddRateLimiter(options =>
        {
            options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
            options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(context =>
                RateLimitPartition.GetTokenBucketLimiter(
                    context.User.FindFirstValue(ClaimTypes.NameIdentifier)
                        ?? context.Connection.RemoteIpAddress?.ToString()
                        ?? "anonymous",
                    _ => new TokenBucketRateLimiterOptions
                    {
                        TokenLimit = 120,
                        TokensPerPeriod = 60,
                        ReplenishmentPeriod = TimeSpan.FromMinutes(1),
                        AutoReplenishment = true,
                        QueueLimit = 0
                    }));
        });

        var otel = services.AddOpenTelemetry()
            .WithTracing(x => x.AddAspNetCoreInstrumentation().AddHttpClientInstrumentation())
            .WithMetrics(x => x.AddAspNetCoreInstrumentation().AddHttpClientInstrumentation().AddRuntimeInstrumentation());
        if (!string.IsNullOrWhiteSpace(configuration["OTEL_EXPORTER_OTLP_ENDPOINT"]))
        {
            otel.UseOtlpExporter();
        }
        return services;
    }
}
```

In `Program.cs`:

```csharp
builder.Services.AddOpenApi("v1");
builder.Services.AddHrmDiagnostics(builder.Configuration);
var app = builder.Build();
app.MapHealthChecks("/health/live", new() { Predicate = _ => false });
app.MapHealthChecks("/health/ready", new() { Predicate = check => check.Tags.Contains("ready") });
if (app.Environment.IsDevelopment()) app.MapOpenApi("/openapi/{documentName}.json");
app.MapGroup("/api/v1").MapGet("/system/ping", () => Results.Ok(new { status = "ok" }));
```

- [ ] **Step 4: Run and probe**

```powershell
dotnet test backend/Hiu.Hrm.slnx
dotnet run --project backend/src/Hiu.Hrm.Api
```

In a second shell run `Invoke-WebRequest http://localhost:5000/health/live` and `/api/v1/system/ping`. Expected: HTTP 200 from both endpoints.

- [ ] **Step 5: Commit**

```powershell
git add backend
git commit -m "feat: add API diagnostics and operational endpoints"
```

### Task 7: Add CI quality gates and developer instructions

**Files:**
- Create: `.github/workflows/ci.yml`
- Create: `backend/README.md`
- Modify: `package.json`

**Interfaces:**
- Produces: repeatable frontend/backend quality gates and beginner-friendly local startup instructions.

- [ ] **Step 1: Add root scripts**

Add to `package.json` scripts:

```json
"backend:restore": "dotnet restore backend/Hiu.Hrm.slnx --locked-mode",
"backend:build": "dotnet build backend/Hiu.Hrm.slnx --no-restore",
"backend:test": "dotnet test backend/Hiu.Hrm.slnx --no-build"
```

- [ ] **Step 2: Write local instructions**

Create `backend/README.md` with this content:

````markdown
# HIU HRM Backend

The backend uses ASP.NET Core 10 and PostgreSQL. Docker runs only PostgreSQL; `dotnet run` starts the API on the host.

## Start locally

```powershell
docker compose -f backend/docker-compose.yml up -d postgres
dotnet restore backend/Hiu.Hrm.slnx --locked-mode
dotnet ef database update --project backend/src/Hiu.Hrm.Api
dotnet run --project backend/src/Hiu.Hrm.Api
```

Operational endpoints:

- `/health/live`: process liveness
- `/health/ready`: PostgreSQL readiness
- `/openapi/v1.json`: development-only OpenAPI document

The password `local_only_password` is only for the local container. Never reuse it in staging or production. Production connection strings and signing secrets must come from the deployment secret store.
````

```powershell
docker compose -f backend/docker-compose.yml up -d postgres
dotnet restore backend/Hiu.Hrm.slnx --locked-mode
dotnet ef database update --project backend/src/Hiu.Hrm.Api
dotnet run --project backend/src/Hiu.Hrm.Api
```

- [ ] **Step 3: Add CI workflow**

Create `.github/workflows/ci.yml`:

```yaml
name: ci
on:
  pull_request:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run test:run
      - run: npm run build

  backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-dotnet@v4
        with:
          dotnet-version: 10.0.400
          cache: true
          cache-dependency-path: backend/**/packages.lock.json
      - run: dotnet restore backend/Hiu.Hrm.slnx --locked-mode
      - run: dotnet build backend/Hiu.Hrm.slnx --no-restore
      - run: dotnet test backend/Hiu.Hrm.slnx --no-build
```

- [ ] **Step 4: Verify all gates locally**

```powershell
npm run typecheck
npm run lint
npm run test:run
npm run build
npm run backend:restore
npm run backend:build
npm run backend:test
```

Expected: every command exits 0.

- [ ] **Step 5: Commit**

```powershell
git add .github backend package.json package-lock.json
git commit -m "ci: validate frontend and backend"
```
