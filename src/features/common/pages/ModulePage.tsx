interface ModulePageProps {
  capabilities: string[];
}

export default function ModulePage({ capabilities }: ModulePageProps) {
  return (
    <div className="rounded-md border border-brand-border bg-brand-surface p-4">
      <div className="grid gap-3 md:grid-cols-2">
        {capabilities.map((capability) => (
          <div
            key={capability}
            className="rounded-md border border-brand-border p-3 text-sm text-brand-secondary-text"
          >
            {capability}
          </div>
        ))}
      </div>
    </div>
  );
}
