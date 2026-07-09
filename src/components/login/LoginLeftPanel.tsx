import { useState, useEffect } from 'react';
import loginBg from '@/assets/login-bg.png';

interface LoginLeftPanelProps {
  currentLang: 'EN' | 'VI';
}

export default function LoginLeftPanel({ currentLang }: LoginLeftPanelProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const slides = [
    {
      id: 'workforce',
      title: currentLang === 'EN' ? 'Workforce Optimization' : 'Tối ưu hóa nhân sự',
      description:
        currentLang === 'EN'
          ? 'Streamline staff scheduling, shift planning, leave allocations, and clinic roster management.'
          : 'Hệ thống hóa lịch làm việc, phân bổ ngày nghỉ và lập kế hoạch ca trực cho phòng khám chuyên khoa.',
    },
    {
      id: 'operations',
      title: currentLang === 'EN' ? 'Real-time Operations' : 'Vận hành thời gian thực',
      description:
        currentLang === 'EN'
          ? 'Track active check-ins, daily attendance logs, and secure operations workflow records.'
          : 'Theo dõi chấm công trực ca, kiểm soát ra vào và lưu trữ nhật ký quy trình khám chữa bệnh thời gian thực.',
    },
    {
      id: 'logistics',
      title: currentLang === 'EN' ? 'Healthcare Logistics' : 'Điều phối Y tế',
      description:
        currentLang === 'EN'
          ? 'Manage clinic resources, roster assignments, department staff counts, and workforce dispatch.'
          : 'Quản lý nhân lực chuyên môn, điều phối lịch trực khoa ban và tối ưu hóa định biên nhân sự.',
    },
    {
      id: 'analytics',
      title: currentLang === 'EN' ? 'Advanced Analytics' : 'Thống kê & Phân tích',
      description:
        currentLang === 'EN'
          ? 'Gain clear insights into hospital headcount statistics, department performance, and payroll integrations.'
          : 'Phân tích mật độ nhân sự ca trực, thống kê hiệu suất khoa phòng và tích hợp đồng bộ lương tự động.',
    },
    {
      id: 'security',
      title: currentLang === 'EN' ? 'Enterprise Security' : 'Bảo mật doanh nghiệp',
      description:
        currentLang === 'EN'
          ? 'Role-based access controls, detailed audit logs, and encrypted session management for data protection.'
          : 'Kiểm soát truy cập phân quyền chặt chẽ, truy vết hoạt động chi tiết và bảo mật dữ liệu y tế chuẩn doanh nghiệp.',
    },
  ];

  const SLIDE_DURATION = 8000;

  const handleSelectSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  useEffect(() => {
    const interval = 100;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((s) => (s + 1) % slides.length);
          return 0;
        }
        return prev + (interval / SLIDE_DURATION) * 100;
      });
    }, interval);

    return () => {
      clearInterval(timer);
      setProgress(0);
    };
  }, [currentSlide, slides.length]);

  return (
    <div className="hidden md:flex md:w-[46%] relative text-white flex-col justify-center p-8 z-20 overflow-hidden">
      {/* Background Image with Zoom on Hover */}
      <img
        src={loginBg}
        alt="Healthcare Abstract Background"
        className="absolute inset-0 w-full h-full object-cover z-0 scale-105 transition-transform duration-700 hover:scale-100 pointer-events-none"
      />
      {/* Dark overlay to dim the background graphic and maximize text readability */}
      <div className="absolute inset-0 bg-slate-950/45 z-10 pointer-events-none" />

      {/* Dynamic Highlight Accordion Section (Fully transparent background) */}
      <div className="z-20 w-[90%] select-none animate-slide-in space-y-5">
        <div className="flex flex-col gap-5">
          {slides.map((slide, index) => {
            const isActive = currentSlide === index;
            return (
              <div
                key={slide.id}
                className="relative pl-6 transition-all duration-300"
              >
                {/* Left Indicator vertical line */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/10 rounded-full overflow-hidden">
                  {isActive && (
                    <div
                      className="absolute top-0 left-0 right-0 bg-white transition-all duration-100 ease-linear"
                      style={{ height: `${progress}%`, width: '100%' }}
                    />
                  )}
                </div>

                {/* Tab Title / Button */}
                <button
                  type="button"
                  onClick={() => handleSelectSlide(index)}
                  className={`w-full text-left font-bold transition-all duration-300 cursor-pointer block text-shadow-md ${
                    isActive
                      ? 'text-white text-base lg:text-lg'
                      : 'text-white/35 hover:text-white/60 text-base lg:text-lg'
                  }`}
                >
                  {slide.title}
                </button>

                {/* Tab Description (Accordion transition using CSS grid rows) */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isActive
                      ? 'grid-rows-[1fr] opacity-100 mt-1.5'
                      : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[12px] lg:text-xs text-white/90 leading-relaxed max-w-[95%] text-shadow-md">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
