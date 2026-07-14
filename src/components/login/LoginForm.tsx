import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HeartWaveLoader } from '@/components/feedback/HeartWaveLoader';
import { useLogin } from '@/queries/auth.query';
import { LoginFormValues, loginSchema } from '@/components/login/login.schema';
import logoBlue from '@/assets/logo2.jpg';

interface LoginFormProps {
  currentLang: 'EN' | 'VI';
  onSubmitSuccess: () => void;
}

export default function LoginForm({ currentLang, onSubmitSuccess }: LoginFormProps) {
  const login = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    login.mutate(values, {
      onSuccess: () => {
        onSubmitSuccess();
      },
    });
  });

  const t = {
    EN: {
      hi: 'Sign in to your account',
      welcome: 'Enter your credentials to access the system.',
      username: 'Username',
      password: 'Password',
      forgot: 'Forgot password?',
      login: 'Sign in',
      authenticating: 'Signing in...',
      failed: 'Authentication Failed',
      failedDesc: 'Invalid credentials. Please contact IT support if you need help.',
      placeholderUser: 'e.g. jdoe',
      logoAlt: 'Hospital Logo',
      noAccount: "Don't have an account?",
      register: 'Register',
    },
    VI: {
      hi: 'Đăng nhập vào hệ thống',
      welcome: 'Vui lòng nhập thông tin để tiếp tục.',
      username: 'Tên đăng nhập',
      password: 'Mật khẩu',
      forgot: 'Quên mật khẩu?',
      login: 'Đăng nhập',
      authenticating: 'Đang xác thực...',
      failed: 'Đăng nhập thất bại',
      failedDesc: 'Sai thông tin đăng nhập. Vui lòng liên hệ bộ phận IT nếu cần hỗ trợ.',
      placeholderUser: 'VD: nvan',
      logoAlt: 'Logo Bệnh viện',
      noAccount: 'Chưa có tài khoản?',
      register: 'Đăng ký ngay',
    },
  }[currentLang];

  const getErrorMessage = (msgKey: string | undefined) => {
    if (!msgKey) return '';
    const validationMessages: Record<'EN' | 'VI', Record<string, string>> = {
      EN: {
        username_required: 'Username is required.',
        password_required: 'Password is required.',
        password_no_spaces: 'Password cannot contain spaces.',
      },
      VI: {
        username_required: 'Tên đăng nhập là bắt buộc.',
        password_required: 'Mật khẩu là bắt buộc.',
        password_no_spaces: 'Mật khẩu không được chứa khoảng trắng.',
      },
    };
    return validationMessages[currentLang][msgKey] ?? msgKey;
  };

  return (
    <div className="w-full">
      <div className="mb-10 text-center">
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-2xl bg-white p-3 shadow-md">
            <img
              src={logoBlue}
              alt={t.logoAlt}
              className="h-10 w-auto object-contain mix-blend-multiply"
            />
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-md">{t.hi}</h1>
        <p className="mt-2.5 text-[15px] font-medium text-slate-300 drop-shadow-sm">{t.welcome}</p>
      </div>

      {login.error && (
        <div
          className="mb-6 flex gap-3 rounded-xl border border-red-500/50 bg-red-900/60 p-4 text-sm text-white shadow-sm animate-in fade-in duration-300"
          aria-live="polite"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" aria-hidden="true" />
          <div>
            <h5 className="font-bold leading-none drop-shadow-sm">{t.failed}</h5>
            <p className="mt-1.5 text-xs font-medium leading-relaxed text-red-200 drop-shadow-sm">
              {t.failedDesc}
            </p>
          </div>
        </div>
      )}

      <form
        onSubmit={(e) => {
          void onSubmit(e);
        }}
        className="space-y-5"
      >
        <div className="space-y-2 text-left">
          <Label htmlFor="username" className="text-sm font-bold text-slate-200 drop-shadow-sm">
            {t.username}
          </Label>
          <Input
            id="username"
            autoComplete="username"
            tabIndex={1}
            className="h-12 rounded-xl border-slate-600 bg-slate-800/80 px-4 text-[15px] text-white shadow-inner transition-colors hover:bg-slate-800 focus:border-slate-400 focus:bg-slate-800 focus:ring-1 focus:ring-slate-400 focus:outline-none"
            {...form.register('username')}
            aria-invalid={!!form.formState.errors.username}
          />
          {form.formState.errors.username && (
            <p className="mt-1.5 flex items-center gap-1 text-xs font-bold text-red-400 drop-shadow-sm animate-in fade-in">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {getErrorMessage(form.formState.errors.username.message)}
            </p>
          )}
        </div>

        <div className="space-y-2 text-left">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-bold text-slate-200 drop-shadow-sm">
              {t.password}
            </Label>
            <a
              href="#forgot"
              onClick={(e) => e.preventDefault()}
              tabIndex={4}
              className="rounded-sm text-[13px] font-bold text-white! drop-shadow-sm transition-colors hover:text-slate-200! hover:underline focus:outline-none focus:ring-2 focus:ring-white"
            >
              {t.forgot}
            </a>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              tabIndex={2}
              className="h-12 rounded-xl border-slate-600 bg-slate-800/80 px-4 pr-12 text-[15px] text-white shadow-inner transition-colors hover:bg-slate-800 focus:border-slate-400 focus:bg-slate-800 focus:ring-1 focus:ring-slate-400 focus:outline-none"
              {...form.register('password')}
              aria-invalid={!!form.formState.errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              className="absolute inset-y-0 right-1 flex w-10 items-center justify-center rounded-xl text-slate-400 transition-colors hover:text-white focus:outline-none"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
            </button>
          </div>
          {form.formState.errors.password && (
            <p className="mt-1.5 flex items-center gap-1 text-xs font-bold text-red-400 drop-shadow-sm animate-in fade-in">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {getErrorMessage(form.formState.errors.password.message)}
            </p>
          )}
        </div>

        <div className="pt-3">
          <Button
            type="submit"
            disabled={login.isPending}
            tabIndex={3}
            className="btn-shimmer-dark flex h-12 w-full items-center justify-center rounded-xl bg-white text-[15px] font-bold text-slate-900 shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-slate-50 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:translate-y-0 active:scale-95"
          >
            {login.isPending ? (
              <>
                <HeartWaveLoader label={t.authenticating} className="h-9 w-9 text-slate-900" />
                <span>{t.authenticating}</span>
              </>
            ) : (
              t.login
            )}
          </Button>
        </div>

        <div className="pt-3 text-center text-[13px] font-medium text-slate-300 drop-shadow-sm">
          {t.noAccount}{' '}
          <a
            href="#register"
            onClick={(e) => e.preventDefault()}
            tabIndex={5}
            className="font-bold text-white transition-colors hover:underline"
          >
            {t.register}
          </a>
        </div>
      </form>
    </div>
  );
}
