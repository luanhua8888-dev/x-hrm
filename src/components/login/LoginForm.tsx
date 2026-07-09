import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRound, User, AlertCircle, Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLogin } from '@/queries/auth.query';
import { LoginFormValues, loginSchema } from '@/features/auth/schemas/login.schema';

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
      hi: 'Hi Operator',
      welcome: 'Welcome to HRM',
      username: 'Username',
      password: 'Password',
      forgot: 'Forgot password?',
      login: 'Login',
      authenticating: 'Authenticating…',
      failed: 'Authentication Failed',
      failedDesc: 'Please verify your username and password. If the problem persists, contact your system administrator.',
      placeholderUser: 'Enter your username…',
      username_required: 'Username is required.',
      password_required: 'Password is required.',
      password_no_spaces: 'Password cannot contain spaces.',
    },
    VI: {
      hi: 'Xin chào',
      welcome: 'Chào mừng bạn đến với HRM',
      username: 'Tên đăng nhập',
      password: 'Mật khẩu',
      forgot: 'Quên mật khẩu?',
      login: 'Đăng nhập',
      authenticating: 'Đang xác thực…',
      failed: 'Đăng nhập thất bại',
      failedDesc: 'Vui lòng kiểm tra lại tài khoản và mật khẩu. Nếu vấn đề tiếp tục xảy ra, vui lòng liên hệ quản trị viên.',
      placeholderUser: 'Nhập tên đăng nhập…',
      username_required: 'Tên đăng nhập là bắt buộc.',
      password_required: 'Mật khẩu là bắt buộc.',
      password_no_spaces: 'Mật khẩu không được chứa khoảng trắng.',
    },
  }[currentLang];

  const getErrorMessage = (msgKey: string | undefined) => {
    if (!msgKey) return '';
    return t[msgKey as keyof typeof t] || msgKey;
  };

  return (
    <div className="w-full animate-slide-in">
      {/* Welcome Section */}
      <div className="mb-6 text-center">
        <h1 className="text-[32px] font-black tracking-tight leading-none text-slate-900">
          {t.hi}
        </h1>
        <p className="mt-2.5 text-sm text-slate-500 font-medium">
          {t.welcome}
        </p>
      </div>

      {/* Error State Banner */}
      {login.error ? (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 animate-in fade-in duration-300" aria-live="polite">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" aria-hidden="true" />
            <div className="space-y-1">
              <h5 className="font-semibold leading-none">{t.failed}</h5>
              <p className="text-xs text-red-600/90 mt-1 leading-relaxed">
                {t.failedDesc}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {/* Input Form */}
      <form
        className="space-y-4"
        onSubmit={(event) => {
          void onSubmit(event);
        }}
      >
        <div className="space-y-2">
          <Label
            htmlFor="username"
            className="text-[11px] font-bold uppercase tracking-wider text-brand-secondary-text/80"
          >
            {t.username}
          </Label>
          <div className="relative">
            <User className="absolute top-4 left-3.5 h-4 w-4 text-brand-secondary-text/50 pointer-events-none" aria-hidden="true" />
            <Input
              id="username"
              autoComplete="username"
              placeholder={t.placeholderUser}
              spellCheck={false}
              className="pl-10 h-12 bg-slate-50 border border-slate-200/80 text-brand-primary-text placeholder:text-brand-secondary-text/40 rounded-xl hover:bg-slate-100/40 hover:border-slate-300 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200"
              {...form.register('username')}
            />
          </div>
          {form.formState.errors.username ? (
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1 font-medium animate-in fade-in duration-200" aria-live="polite">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {getErrorMessage(form.formState.errors.username.message)}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-[11px] font-bold uppercase tracking-wider text-brand-secondary-text/80"
          >
            {t.password}
          </Label>
          <div className="relative">
            <KeyRound className="absolute top-4 left-3.5 h-4 w-4 text-brand-secondary-text/50 pointer-events-none" aria-hidden="true" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="••••••••"
              className="pl-10 pr-10 h-12 bg-slate-50 border border-slate-200/80 text-brand-primary-text placeholder:text-brand-secondary-text/40 rounded-xl hover:bg-slate-100/40 hover:border-slate-300 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200"
              {...form.register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3.5 top-4 text-brand-secondary-text/50 hover:text-brand-secondary-text/80 active:scale-95 transition-all cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          <div className="flex justify-end mt-1.5">
            <a
              href="#forgot"
              onClick={(e) => e.preventDefault()}
              className="text-xs font-bold text-primary hover:text-primary-hover hover:underline transition-colors"
            >
              {t.forgot}
            </a>
          </div>
          {form.formState.errors.password ? (
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1 font-medium animate-in fade-in duration-200" aria-live="polite">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {getErrorMessage(form.formState.errors.password.message)}
            </p>
          ) : null}
        </div>

        {/* Primary Submit Button */}
        <Button
          className="w-full mt-6 h-12 bg-primary text-white hover:bg-primary/95 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985] transition-all duration-300 ease-out font-bold text-sm tracking-wide rounded-xl shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/25 cursor-pointer flex items-center justify-center gap-2 btn-shimmer"
          type="submit"
          disabled={login.isPending}
        >
          {login.isPending ? t.authenticating : t.login}
        </Button>
      </form>
    </div>
  );
}
