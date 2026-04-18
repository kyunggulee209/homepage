/*
 * DESIGN: Luxury Trading House - Main Page (Fully Dynamic & Admin Controlled)
 * Sections: Event Banner, Site Title, Popup, Hero, Stats, About, Categories, Contact
 */
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronDown, Globe, Phone, Mail, MapPin, CheckCircle, ArrowRight, X } from "lucide-react";
import { INITIAL_CONTENT } from "@/lib/cms-content";

// Animated counter hook
function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// Intersection observer hook
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// Section wrapper with fade-in
function Section({ id, children, className = "", style }: { id?: string; children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const { ref, inView } = useInView();
  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={style}
    >
      {children}
    </section>
  );
}

// Section heading component
function SectionHeading({ subtitle, title, description, light = false }: {
  subtitle: string; title: string; description?: string; light?: boolean;
}) {
  return (
    <div className="text-center mb-14">
      <div
        className="inline-block text-xs font-semibold uppercase tracking-[0.25em] mb-3 px-4 py-1.5 rounded-sm"
        style={{
          color: light ? "oklch(0.72 0.12 75)" : "oklch(0.22 0.065 255)",
          backgroundColor: light ? "oklch(0.72 0.12 75 / 0.15)" : "oklch(0.22 0.065 255 / 0.08)",
          fontFamily: "'Cormorant Garamond', serif",
        }}
      >
        {subtitle}
      </div>
      <h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 whitespace-pre-line"
        style={{
          fontFamily: "'Playfair Display', serif",
          color: light ? "oklch(0.975 0.008 85)" : "oklch(0.15 0.01 65)",
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="max-w-2xl mx-auto text-base leading-relaxed whitespace-pre-line"
          style={{ color: light ? "oklch(0.75 0.01 85)" : "oklch(0.5 0.01 65)" }}
        >
          {description}
        </p>
      )}
      <div className="gold-divider w-24 mx-auto mt-6" />
    </div>
  );
}

export default function Home() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [showEventBanner, setShowEventBanner] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  
  // Load Content from CMS with safety merge
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem("cmsContent");
    if (!saved) return INITIAL_CONTENT;
    try {
      const parsed = JSON.parse(saved);
      return {
        ...INITIAL_CONTENT,
        ...parsed,
        siteSettings: { ...INITIAL_CONTENT.siteSettings, ...parsed.siteSettings },
        hero: { ...INITIAL_CONTENT.hero, ...parsed.hero },
        stats: { ...INITIAL_CONTENT.stats, ...parsed.stats },
        about: { ...INITIAL_CONTENT.about, ...parsed.about },
        categories: { ...INITIAL_CONTENT.categories, ...parsed.categories },
        contact: { ...INITIAL_CONTENT.contact, ...parsed.contact },
        eventBanner: { ...INITIAL_CONTENT.eventBanner, ...parsed.eventBanner },
        popupBanner: { ...INITIAL_CONTENT.popupBanner, ...parsed.popupBanner },
      };
    } catch (e) {
      return INITIAL_CONTENT;
    }
  });

  // Update Document Title
  useEffect(() => {
    if (content.siteSettings?.title) {
      document.title = content.siteSettings.title;
    }
  }, [content.siteSettings?.title]);

  // Handle Popup visibility logic
  useEffect(() => {
    if (content.popupBanner?.isActive) {
      const hideUntil = localStorage.getItem("hidePopupUntil");
      if (!hideUntil || new Date().getTime() > parseInt(hideUntil)) {
        const timer = setTimeout(() => setShowPopup(true), 1200);
        return () => clearTimeout(timer);
      }
    }
  }, [content.popupBanner?.isActive]);

  const closePopupForToday = () => {
    const tomorrow = new Date();
    tomorrow.setHours(24, 0, 0, 0);
    localStorage.setItem("hidePopupUntil", tomorrow.getTime().toString());
    setShowPopup(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Listen for storage changes
  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem("cmsContent");
      if (saved) {
        const parsed = JSON.parse(saved);
        setContent((prev: any) => ({ ...prev, ...parsed }));
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const years = useCounter(content.stats.years, 1800, statsVisible);
  const productsCount = useCounter(content.stats.products, 2000, statsVisible);
  const dealers = useCounter(content.stats.dealers, 1800, statsVisible);
  const countries = useCounter(content.stats.countries, 1200, statsVisible);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.975 0.008 85)" }}>
      {/* ===== POPUP BANNER ===== */}
      {showPopup && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div 
              className="relative bg-white shadow-2xl rounded-sm overflow-hidden flex flex-col group animate-in zoom-in duration-500"
              style={{ width: `${content.popupBanner.width}px`, maxWidth: '95vw', maxHeight: '90vh' }}
            >
              <button 
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              
              <div className="relative flex-1 overflow-hidden min-h-[200px]">
                <img 
                  src={content.popupBanner.imageUrl} 
                  alt="Popup" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-10 left-8 right-8 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold font-serif mb-2">{content.popupBanner.title}</h3>
                  <p className="text-sm md:text-base opacity-90 line-clamp-3">{content.popupBanner.description}</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t flex justify-between items-center">
                 <button 
                  onClick={closePopupForToday}
                  className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors"
                 >
                   오늘 하루 보지 않기
                 </button>
                 <a 
                   href={content.popupBanner.link}
                   className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest rounded-sm hover:scale-105 transition-transform"
                   style={{ backgroundColor: "oklch(0.22 0.065 255)", color: "oklch(0.85 0.09 75)" }}
                 >
                   자세히 보기 <ArrowRight className="w-3.5 h-3.5" />
                 </a>
              </div>
           </div>
        </div>
      )}

      {/* ===== TOP EVENT BANNER ===== */}
      {content.eventBanner?.isActive && showEventBanner && (
        <div 
          className="relative bg-slate-900 text-white overflow-hidden z-[100] animate-in slide-in-from-top duration-500"
          style={{ 
            height: `${content.eventBanner.height}px`,
            borderBottom: "1px solid oklch(0.72 0.12 75 / 0.3)" 
          }}
        >
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ backgroundImage: `url(${content.eventBanner.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
          <div className="container h-full relative flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span 
                className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm"
                style={{ backgroundColor: "oklch(0.72 0.12 75)", color: "oklch(0.15 0.01 65)" }}
              >
                {content.eventBanner.badge || "EVENT"}
              </span>
              <p className="text-xs md:text-sm font-medium truncate max-w-[200px] sm:max-w-none">
                <span className="font-bold mr-2">{content.eventBanner.title}</span>
                <span className="opacity-80 hidden md:inline">{content.eventBanner.description}</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href={content.eventBanner.link}
                className="text-[10px] font-bold uppercase tracking-tighter hover:underline underline-offset-4"
                style={{ color: "oklch(0.72 0.12 75)" }}
              >
                지금 확인하기 <ArrowRight className="inline w-3 h-3 ml-1" />
              </a>
              <button 
                onClick={() => setShowEventBanner(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
          style={{ backgroundImage: `url(${content.hero.imageUrl})` }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, oklch(0.15 0.055 255 / 0.88) 0%, oklch(0.22 0.065 255 / 0.75) 50%, oklch(0.15 0.055 255 / 0.6) 100%)" }}
        />

        <div className="container relative z-10 pt-20">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-sm mb-8 text-xs font-semibold uppercase tracking-widest"
              style={{
                backgroundColor: "oklch(0.72 0.12 75 / 0.2)",
                border: "1px solid oklch(0.72 0.12 75 / 0.5)",
                color: "oklch(0.85 0.09 75)",
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              <Globe className="w-3.5 h-3.5" />
              {content.hero.badge}
            </div>

            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 whitespace-pre-line"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "oklch(0.975 0.008 85)",
              }}
            >
              {content.hero.title}
            </h1>

            <p
              className="text-lg md:text-xl leading-relaxed mb-10 max-w-xl whitespace-pre-line"
              style={{ color: "oklch(0.85 0.01 85)" }}
            >
              {content.hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 px-8 py-4 font-semibold text-sm rounded-sm transition-all duration-200 hover:scale-105 hover:shadow-lg text-white"
                style={{ backgroundColor: "oklch(0.72 0.12 75)", color: "oklch(0.15 0.01 65)" }}
              >
                제품 보기 <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 px-8 py-4 font-semibold text-sm rounded-sm transition-all duration-200 hover:bg-white/20 border border-white/50 text-white"
              >
                거래 문의
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs uppercase tracking-widest" style={{ color: "oklch(0.72 0.12 75)" }}>Scroll</span>
          <ChevronDown className="w-5 h-5" style={{ color: "oklch(0.72 0.12 75)" }} />
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <div
        ref={statsRef}
        style={{ backgroundColor: "oklch(0.22 0.065 255)" }}
        className="py-12"
      >
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: years, suffix: "년+", label: "업력" },
              { value: productsCount, suffix: "종+", label: "취급 제품" },
              { value: dealers, suffix: "개+", label: "전국 판매처" },
              { value: countries, suffix: "개국", label: "수입 국가" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-4xl md:text-5xl font-bold mb-1"
                  style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.85 0.09 75)" }}
                >
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm font-medium uppercase tracking-widest opacity-80 text-white">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== ABOUT SECTION ===== */}
      <Section id="about" className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div
                className="absolute -top-4 -left-4 w-full h-full rounded-sm bg-primary/10 border border-primary/20"
              />
              <img
                src={content.about.imageUrl}
                alt="About"
                className="relative z-10 w-full rounded-sm object-cover h-[420px]"
              />
              <div
                className="absolute -bottom-6 -right-6 z-20 p-5 rounded-sm shadow-xl bg-slate-900"
              >
                <div className="text-center text-white">
                  <div className="text-3xl font-bold font-serif" style={{ color: "oklch(0.85 0.09 75)" }}>{content.stats.years}+</div>
                  <div className="text-[10px] uppercase tracking-widest mt-1 opacity-70">Years of Excellence</div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.25em] mb-4 text-primary">About Us</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif whitespace-pre-line">{content.about.title}</h2>
              <div className="gold-divider w-16 mb-8 ml-0" />
              <p className="text-base leading-relaxed mb-6 opacity-80 whitespace-pre-line">{content.about.description1}</p>
              <p className="text-base leading-relaxed mb-8 opacity-80 whitespace-pre-line">{content.about.description2}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "자체 디자인 개발",
                  "직접 수입으로 가격 경쟁력",
                  "전국 도매 납품 네트워크",
                  "신속한 재고 관리",
                  "다양한 제품 카테고리",
                  "맞춤형 소싱 서비스",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 shrink-0 text-primary" />
                    <span className="text-sm opacity-70">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ===== PRODUCTS SECTION ===== */}
      <Section id="products" className="py-24 bg-slate-50">
        <div className="container">
          <SectionHeading
            subtitle={content.categories.subtitle}
            title={content.categories.title}
            description={content.categories.description}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.categories.list.map((product: any) => (
              <div key={product.id} className="luxury-card bg-white rounded-sm overflow-hidden group shadow-sm hover:shadow-xl transition-shadow border">
                <div className="relative overflow-hidden h-[260px]">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider bg-slate-900 text-primary font-serif">
                    {product.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-[10px] font-bold mb-2 text-primary uppercase tracking-widest">{product.origin}</div>
                  <h3 className="text-xl font-bold mb-3 font-serif">{product.title}</h3>
                  <p className="text-sm leading-relaxed mb-4 opacity-70 line-clamp-3">
                    {product.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag: string) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-sm bg-slate-100 text-slate-600 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ===== CONTACT SECTION ===== */}
      <Section id="contact" className="py-24">
        <div className="container">
          <SectionHeading
            subtitle={content.contact.subtitle}
            title={content.contact.title}
            description={content.contact.description}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-8 font-serif">연락처 정보</h3>
              <div className="space-y-6 mb-10">
                {[
                  {
                    icon: <Phone className="w-5 h-5" />,
                    title: "전화 문의",
                    content: content.contact.phone,
                    sub: content.contact.phoneSub,
                  },
                  {
                    icon: <Mail className="w-5 h-5" />,
                    title: "이메일 문의",
                    content: content.contact.email,
                    sub: content.contact.emailSub,
                  },
                  {
                    icon: <MapPin className="w-5 h-5" />,
                    title: "사무실 주소",
                    content: content.contact.address,
                    sub: content.contact.addressSub,
                  },
                ].map((info) => (
                  <div key={info.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-sm flex items-center justify-center shrink-0 bg-primary/10 text-primary">
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider mb-1 text-primary">
                        {info.title}
                      </div>
                      <div className="text-base font-bold">{info.content}</div>
                      <div className="text-sm opacity-60">{info.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-sm shadow-lg border bg-white">
              <h3 className="text-xl font-bold mb-6 font-serif">문의 양식</h3>
              <div className="space-y-4">
                <Input placeholder="성함 / 업체명" className="rounded-sm" />
                <Input placeholder="연락처" className="rounded-sm" />
                <Textarea placeholder="문의 내용" className="rounded-sm min-h-[120px]" />
                <Button className="w-full h-12 rounded-sm font-bold bg-primary text-white">문의 보내기</Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}

// UI Placeholders
function Textarea(props: any) {
  return <textarea className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${props.className}`} {...props} />;
}

function Input(props: any) {
  return <input className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${props.className}`} {...props} />;
}

function Button({ children, className, ...props }: any) {
  return (
    <button 
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
}
