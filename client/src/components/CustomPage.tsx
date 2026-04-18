import { Mail, ChevronRight, Globe, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function CustomPage({ page }: { page: any }) {
  if (!page) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("문의가 성공적으로 전달되었습니다. 곧 연락드리겠습니다!");
  };

  return (
    <div className="pt-20">
      {/* Dynamic Hero Style Title */}
      <div className="bg-slate-900 text-white py-24 relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         <div className="container relative z-10 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6">{page.title}</h1>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
         </div>
      </div>

      {/* Sections Rendering */}
      <div className="py-16">
        {page.sections.map((section: any, idx: number) => (
          <section key={section.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'} py-20`}>
            <div className="container mx-auto px-6">
              {section.type === 'content' && (
                <div className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16`}>
                  <div className="flex-1 space-y-6">
                    <h2 className="text-3xl font-bold font-serif">{section.title}</h2>
                    <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-wrap">{section.content}</p>
                  </div>
                  {section.imageUrl && (
                    <div className="flex-1">
                      <div className="aspect-video rounded-sm overflow-hidden shadow-2xl">
                        <img src={section.imageUrl} alt={section.title} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {section.type === 'form' && (
                <div className="max-w-2xl mx-auto bg-white p-12 shadow-2xl rounded-sm border-t-4 border-primary">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold font-serif mb-4">{section.title}</h2>
                    <p className="text-slate-500">{section.description}</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <Input placeholder="이름" required className="h-12" />
                      <Input placeholder="연락처" required className="h-12" />
                    </div>
                    <Input type="email" placeholder="이메일 주소" required className="h-12" />
                    <Textarea placeholder="문의사항을 적어주세요" className="min-h-[150px]" required />
                    <Button type="submit" className="w-full h-14 text-lg font-bold bg-primary shadow-lg shadow-primary/20">
                      {section.buttonText || "전송하기"}
                    </Button>
                  </form>
                </div>
              )}

              {section.type === 'menu' && (
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl font-bold font-serif mb-8">{section.title}</h2>
                  <div className="flex flex-wrap justify-center gap-6">
                     <select className="px-6 py-3 border-2 border-slate-200 rounded-sm font-bold bg-white outline-none focus:border-primary transition-colors cursor-pointer h-12">
                        <option disabled selected>{section.dropdownLabel || "옵션 선택"}</option>
                        {section.dropdownItems?.map((item: string, i: number) => (
                           <option key={i}>{item}</option>
                        ))}
                     </select>
                     {section.items?.map((btn: any, i: number) => (
                       <Button key={i} variant={btn.primary ? "default" : "outline"} className="h-12 px-8 font-bold">
                          {btn.label}
                       </Button>
                     ))}
                  </div>
                </div>
              )}

              {section.type === 'html' && (
                <div 
                  className="cms-html-wrapper" 
                  dangerouslySetInnerHTML={{ __html: section.html }} 
                />
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
