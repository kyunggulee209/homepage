import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Mail, ChevronRight, Globe, TrendingUp } from "lucide-react";

export default function CustomPage({ pageData }: { pageData: any }) {
  const [formData, setFormData] = useState<any>({});

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("문의사항이 성공적으로 접수되었습니다, 대표님! 🫡");
  };

  if (!pageData) return null;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Premium Hero Title */}
      <div className="pt-20">
        <div className="bg-slate-900 text-white py-32 relative overflow-hidden">
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse"></div>
           <div 
             className="absolute inset-0 opacity-40 mix-blend-overlay"
             style={{ background: "linear-gradient(135deg, oklch(0.22 0.065 255) 0%, oklch(0.72 0.12 75 / 0.8) 100%)" }}
           ></div>
           
           <div className="container relative z-10 text-center animate-in fade-in slide-in-from-bottom-12 duration-1000 mx-auto px-6">
              <Badge variant="outline" className="mb-6 border-primary/50 text-primary font-bold tracking-[0.3em] uppercase px-4 py-1.5 bg-white/5 backdrop-blur-md">
                Custom Dynamic Page
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold font-serif mb-8 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                {pageData.title}
              </h1>
              <div className="w-24 h-1.5 bg-primary mx-auto rounded-full shadow-[0_0_20px_oklch(0.72_0.12_75)]"></div>
           </div>
        </div>

        {/* Dynamic Sections */}
        <div className="pb-32">
          {pageData.sections?.map((section: any, idx: number) => (
            <section key={section.id} className={`py-32 ${idx % 2 === 1 ? 'bg-slate-50' : 'bg-white'}`}>
              <div className="container mx-auto px-6">
                {section.type === "content" && (
                  <div className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-20`}>
                    <div className="flex-1 space-y-8">
                       <div className="space-y-4">
                          <span className="text-primary font-bold uppercase tracking-widest text-xs italic">Section Overview</span>
                          <h2 className="text-4xl md:text-5xl font-bold font-serif leading-tight">{section.title}</h2>
                       </div>
                       <p className="text-xl text-slate-600 leading-relaxed whitespace-pre-line font-medium opacity-80">
                         {section.content}
                       </p>
                       <Button variant="outline" className="h-14 px-10 rounded-full font-bold border-slate-200 group">
                          더 알아보기 <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                       </Button>
                    </div>
                    {section.imageUrl && (
                      <div className="flex-1 w-full">
                        <div className="relative group">
                          <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                          <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-700">
                            <img src={section.imageUrl} alt={section.title} className="w-full h-full object-cover" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {section.type === "form" && (
                  <div className="max-w-4xl mx-auto">
                    <div className="bg-white p-12 md:p-20 rounded-sm shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border-t-8 border-primary relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-8 opacity-5">
                          <Mail className="w-32 h-32" />
                       </div>
                       
                       <div className="text-center mb-16 space-y-4">
                          <h2 className="text-4xl font-bold font-serif">{section.title}</h2>
                          <p className="text-slate-500 text-lg max-w-2xl mx-auto">{section.description}</p>
                       </div>

                       <form onSubmit={handleFormSubmit} className="space-y-8">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">성함 / 업체명</label>
                                <Input className="h-14 bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 text-lg" placeholder="대표님 성함을 입력해 주십시오" required />
                             </div>
                             <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">연락처</label>
                                <Input className="h-14 bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 text-lg" placeholder="회신받으실 번호를 입력해 주십시오" required />
                             </div>
                          </div>
                          <div className="space-y-3">
                             <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">이메일 주소</label>
                             <Input type="email" className="h-14 bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 text-lg" placeholder="example@trusttrade.com" required />
                          </div>
                          <div className="space-y-3">
                             <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">문의 상세 내용</label>
                             <Textarea className="min-h-[200px] bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 text-lg p-6" placeholder="비즈니스 제안 또는 문의사항을 자유롭게 작성해 주십시오." required />
                          </div>
                          <Button className="w-full h-16 text-xl font-bold rounded-sm bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 group uppercase tracking-widest">
                             {section.buttonText || "문의 전송하기"}
                             <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                          </Button>
                       </form>
                    </div>
                  </div>
                )}

                {section.type === "menu" && (
                  <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                       <h2 className="text-4xl font-bold font-serif mb-4">{section.title}</h2>
                       <div className="w-16 h-1 bg-slate-200 mx-auto"></div>
                    </div>
                    
                    <div className="bg-slate-900 p-12 md:p-16 rounded-sm shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12">
                       <div className="space-y-2 text-center md:text-left">
                          <span className="text-primary font-bold text-xs uppercase tracking-[0.4em]">Fast Navigation</span>
                          <h3 className="text-2xl text-white font-serif">원하시는 옵션을 선택해 주십시오.</h3>
                       </div>
                       
                       <div className="flex flex-wrap justify-center md:justify-end gap-6 w-full md:w-auto">
                          <Select>
                            <SelectTrigger className="w-[240px] h-14 bg-white/5 border-white/20 text-white font-bold text-lg rounded-sm">
                              <SelectValue placeholder={section.dropdownLabel || "항목 선택"} />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 text-white border-white/10">
                              {section.dropdownItems?.map((item: string) => (
                                <SelectItem key={item} value={item} className="focus:bg-primary focus:text-white cursor-pointer py-3">{item}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          <div className="flex gap-4">
                            {section.items?.map((btn: any, i: number) => (
                              <Button key={i} variant={btn.primary ? "default" : "outline"} className={`h-14 px-10 font-bold rounded-sm ${!btn.primary ? 'border-white/20 text-white hover:bg-white/5' : ''}`}>
                                 {btn.label}
                              </Button>
                            ))}
                          </div>
                       </div>
                    </div>
                  </div>
                )}

                {section.type === "html" && (
                  <div className="max-w-6xl mx-auto">
                     <div 
                       className="cms-custom-html shadow-inner bg-white border border-slate-100 rounded-sm overflow-hidden"
                       dangerouslySetInnerHTML={{ __html: section.html }}
                     />
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

// Sub-component for badges
function Badge({ variant, className, children }: any) {
   const styles = variant === 'outline' ? 'border-primary/30 border' : 'bg-primary text-white';
   return (
      <span className={`inline-block text-[10px] rounded-full ${styles} ${className}`}>
         {children}
      </span>
   );
}
