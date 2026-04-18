/*
 * DESIGN: Luxury Trading House Navigation
 * Deep Navy background with Antique Gold accents
 * Sticky top navigation with smooth scroll links & Dynamic CMS pages
 */
import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useLocation } from "wouter";
import { INITIAL_CONTENT } from "@/lib/cms-content";

const staticLinks = [
  { label: "회사 소개", href: "#about" },
  { label: "제품 카테고리", href: "#products" },
  { label: "문의하기", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location, setLocation] = useLocation();

  const [navContent, setNavContent] = useState(() => {
    const saved = localStorage.getItem("cmsContent");
    if (!saved) return INITIAL_CONTENT;
    try {
      return { ...INITIAL_CONTENT, ...JSON.parse(saved) };
    } catch {
      return INITIAL_CONTENT;
    }
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleStorage = () => {
      const saved = localStorage.getItem("cmsContent");
      if (saved) setNavContent({ ...INITIAL_CONTENT, ...JSON.parse(saved) });
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    
    if (href.startsWith("#")) {
      if (location !== "/") {
        setLocation("/");
        // Wait for navigation and then scroll
        setTimeout(() => {
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setLocation(href);
      window.scrollTo(0, 0);
    }
  };

  const dynamicLinks = navContent.pages
    ? navContent.pages
        .filter((p: any) => p.showInNav)
        .map((p: any) => ({ label: p.title, href: p.path }))
    : [];

  const allLinks = [
    { label: "홈", href: "/" === location ? "#home" : "/" },
    ...staticLinks,
    ...dynamicLinks
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "oklch(0.22 0.065 255)" : "oklch(0.22 0.065 255 / 0.95)",
        backdropFilter: "blur(12px)",
        boxShadow: scrolled ? "0 2px 20px oklch(0 0 0 / 0.3)" : "none",
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleNavClick("/")}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-inner"
              style={{ backgroundColor: "oklch(0.72 0.12 75)" }}
            >
              <Globe className="w-5 h-5" style={{ color: "oklch(0.22 0.065 255)" }} />
            </div>
            <div>
              <div
                className="text-lg font-bold leading-tight"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "oklch(0.975 0.008 85)",
                }}
              >
                {navContent.siteSettings?.logoText || "글로벌 수입 무역"}
              </div>
              <div
                className="text-[10px] tracking-widest uppercase opacity-70"
                style={{ color: "oklch(0.72 0.12 75)", fontFamily: "'Cormorant Garamond', serif" }}
              >
                Global Trade Management
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {allLinks.map((link, i) => (
              <button
                key={`${link.href}-${i}`}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-2 text-sm font-medium transition-all duration-200 rounded-sm relative group"
                style={{
                  color: "oklch(0.9 0.005 85)",
                  fontFamily: "'Noto Sans KR', sans-serif",
                }}
              >
                {link.label}
                <span
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 group-hover:w-4/5 transition-all duration-300"
                  style={{ backgroundColor: "oklch(0.72 0.12 75)" }}
                />
              </button>
            ))}
            <button
              onClick={() => handleNavClick("#contact")}
              className="ml-4 px-5 py-2 text-sm font-semibold rounded-sm transition-all duration-200 hover:opacity-90 hover:scale-105 shadow-lg shadow-black/20"
              style={{
                backgroundColor: "oklch(0.72 0.12 75)",
                color: "oklch(0.15 0.01 65)",
                fontFamily: "'Noto Sans KR', sans-serif",
              }}
            >
              거래 문의
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            style={{ color: "oklch(0.975 0.008 85)" }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="lg:hidden border-t animate-in slide-in-from-top duration-300"
          style={{
            backgroundColor: "oklch(0.18 0.065 255)",
            borderColor: "oklch(0.3 0.065 255)",
          }}
        >
          <div className="container py-4 flex flex-col gap-1">
            {allLinks.map((link, i) => (
              <button
                key={`${link.href}-${i}-mobile`}
                onClick={() => handleNavClick(link.href)}
                className="text-left px-4 py-3 text-sm font-medium rounded-sm transition-colors duration-200 hover:bg-white/5"
                style={{
                  color: "oklch(0.9 0.005 85)",
                  fontFamily: "'Noto Sans KR', sans-serif",
                }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("#contact")}
              className="mt-2 mx-4 py-3 text-sm font-semibold rounded-sm shadow-lg"
              style={{
                backgroundColor: "oklch(0.72 0.12 75)",
                color: "oklch(0.15 0.01 65)",
              }}
            >
              거래 문의
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
