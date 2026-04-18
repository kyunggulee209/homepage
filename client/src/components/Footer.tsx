/*
 * DESIGN: Luxury Trading House Footer
 * Deep Navy background with Gold accents
 */
import { Globe, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ backgroundColor: "oklch(0.15 0.055 255)", color: "oklch(0.9 0.005 85)" }}>
      {/* Gold top border */}
      <div className="h-0.5" style={{ background: "linear-gradient(90deg, transparent, oklch(0.72 0.12 75), transparent)" }} />

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "oklch(0.72 0.12 75)" }}>
                <Globe className="w-5 h-5" style={{ color: "oklch(0.22 0.065 255)" }} />
              </div>
              <div>
                <div className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.975 0.008 85)" }}>
                  글로벌 수입 무역
                </div>
                <div className="text-xs tracking-widest uppercase" style={{ color: "oklch(0.72 0.12 75)", fontFamily: "'Cormorant Garamond', serif" }}>
                  Global Import Trade
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "oklch(0.7 0.01 85)" }}>
              중국, 독일, 인도, 일본에서 엄선된 제품을 수입하여 전국 도매 납품하는 전문 무역 회사입니다.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: "oklch(0.72 0.12 75)" }}>
              빠른 메뉴
            </h3>
            <ul className="space-y-3">
              {[
                { label: "회사 소개", href: "#about" },
                { label: "제품 카테고리", href: "#products" },
                { label: "수입 국가", href: "#countries" },
                { label: "전국 판매처", href: "#dealers" },
                { label: "문의하기", href: "#contact" },
              ].map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="text-sm transition-colors duration-200 hover:text-amber-300"
                    style={{ color: "oklch(0.7 0.01 85)" }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: "oklch(0.72 0.12 75)" }}>
              주요 제품
            </h3>
            <ul className="space-y-3">
              {[
                "크리스마스 용품",
                "조화 (인공 꽃)",
                "인테리어 소품",
                "계절 장식품",
                "선물 포장 용품",
                "홈 데코 아이템",
              ].map((item) => (
                <li key={item} className="text-sm" style={{ color: "oklch(0.7 0.01 85)" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: "oklch(0.72 0.12 75)" }}>
              연락처
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "oklch(0.72 0.12 75)" }} />
                <div>
                  <div className="text-sm" style={{ color: "oklch(0.9 0.005 85)" }}>02-000-0000</div>
                  <div className="text-xs" style={{ color: "oklch(0.6 0.01 85)" }}>평일 09:00 - 18:00</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "oklch(0.72 0.12 75)" }} />
                <div className="text-sm" style={{ color: "oklch(0.9 0.005 85)" }}>info@globalimport.co.kr</div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "oklch(0.72 0.12 75)" }} />
                <div className="text-sm" style={{ color: "oklch(0.9 0.005 85)" }}>서울특별시 중구 을지로</div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: "oklch(0.3 0.065 255)" }}>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-xs" style={{ color: "oklch(0.5 0.01 85)" }}>
              © 2024 글로벌 수입 무역. All rights reserved.
            </p>
            <Link href="/admin">
              <a className="text-[10px] uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity" style={{ color: "oklch(0.7 0.01 85)" }}>
                Admin Portal
              </a>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            {["🇨🇳 중국", "🇩🇪 독일", "🇮🇳 인도", "🇯🇵 일본"].map((country) => (
              <span key={country} className="text-xs px-2 py-1 rounded-sm" style={{ backgroundColor: "oklch(0.22 0.065 255)", color: "oklch(0.72 0.12 75)" }}>
                {country}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
