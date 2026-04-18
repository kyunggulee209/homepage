import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { INITIAL_CONTENT } from "@/lib/cms-content";
import { ChevronRight, Home } from "lucide-react";

export default function DynamicPage() {
  const [match, params] = useRoute("/:slug");
  const slug = params?.slug;

  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem("cmsContent");
    if (!saved) return INITIAL_CONTENT;
    try {
      return { ...INITIAL_CONTENT, ...JSON.parse(saved) };
    } catch {
      return INITIAL_CONTENT;
    }
  });

  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem("cmsContent");
      if (saved) setContent({ ...INITIAL_CONTENT, ...JSON.parse(saved) });
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const page = content.pages.find((p: any) => p.path === `/${slug}`);

  if (!page) {
    return null; // Let wouter handle 404
  }

  useEffect(() => {
    document.title = `${page.title} | ${content.siteSettings.title}`;
    window.scrollTo(0, 0);
  }, [page.title, content.siteSettings.title]);

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: "oklch(0.975 0.008 85)" }}>
      <Navbar />
      
      {/* Breadcrumb / Header */}
      <div className="bg-slate-900 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="container relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest mb-6 opacity-60 text-white">
            <Home className="w-3 h-3" />
            <ChevronRight className="w-3 h-3 text-primary" />
            <span>Pages</span>
            <ChevronRight className="w-3 h-3 text-primary" />
            <span className="text-primary">{page.title}</span>
          </div>
          <h1 
            className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {page.title}
          </h1>
          <div className="gold-divider w-24 mx-auto" style={{ backgroundColor: "oklch(0.72 0.12 75)" }} />
        </div>
      </div>

      <div className="container py-20 pb-32">
        <div className="max-w-4xl mx-auto space-y-20">
          {page.sections.map((section: any, idx: number) => (
            <div key={section.id || idx} className="animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${idx * 150}ms` }}>
              {section.type === "content" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className={idx % 2 === 1 ? "md:order-2" : ""}>
                    {section.title && (
                      <h2 className="text-3xl font-bold font-serif mb-6 whitespace-pre-line">{section.title}</h2>
                    )}
                    <p className="text-lg leading-relaxed text-slate-600 whitespace-pre-line">{section.content}</p>
                  </div>
                  {section.imageUrl && (
                    <div className="relative group overflow-hidden rounded-sm shadow-xl">
                      <img 
                        src={section.imageUrl} 
                        alt={section.title || "Section Image"} 
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                </div>
              )}

              {section.type === "html" && (
                <div 
                  className="prose prose-slate max-w-none"
                  dangerouslySetInnerHTML={{ __html: section.html }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
