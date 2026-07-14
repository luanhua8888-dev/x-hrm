import hospitalBackground from '@/assets/bg1.jpg';

export default function LoginLeftPanel() {
  return (
    <section className="relative hidden min-h-[100dvh] overflow-hidden bg-slate-100 lg:block">
      <img
        src={hospitalBackground}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    </section>
  );
}
