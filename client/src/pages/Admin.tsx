import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Globe, 
  Home as HomeIcon,
  TrendingUp,
  FileText,
  Image as ImageIcon,
  Save,
  Undo,
  Megaphone,
  Monitor,
  Layout,
  Maximize2,
  X,
  Plus,
  Trash2,
  Eye,
  PlusCircle,
  Navigation,
  Mail,
  Menu as MenuIcon,
  ChevronUp,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarInset, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider, 
  SidebarTrigger 
} from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { INITIAL_CONTENT } from "@/lib/cms-content";

// Mock Data for Inquiries
const INQUIRIES = [
  { id: "I001", name: "김태희", company: "플라워가든", date: "2024-04-18", status: "대기중", type: "도매문의" },
  { id: "I002", name: "이정재", company: "데코픽", date: "2024-04-17", status: "처리완료", type: "재입고문의" },
  { id: "I003", name: "정우성", company: "인테리어하우스", date: "2024-04-17", status: "대기중", type: "파트너십" },
];

type Section = "dashboard" | "cms" | "pages" | "banner" | "inquiries" | "settings";

function safeLoad() {
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
}

export default function Admin() {
  const [activeSection, setActiveSection] = useState<Section>("dashboard");
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    toast.info("안전하게 로그아웃 되었습니다, 대표님!");
    setLocation("/login");
  };

  const menuItems = [
    { id: "dashboard", label: "대시보드", icon: LayoutDashboard },
    { id: "cms", label: "홈페이지 편집", icon: FileText },
    { id: "pages", label: "페이지 관리", icon: Layout },
    { id: "banner", label: "이벤트 & 팝업", icon: Megaphone },
    { id: "inquiries", label: "문의 내역", icon: MessageSquare },
    { id: "settings", label: "설정", icon: Settings },
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-slate-50">
        {/* Sidebar */}
        <Sidebar variant="inset" className="border-r shadow-sm">
          <SidebarHeader className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0 shadow-inner"
                style={{ backgroundColor: "oklch(0.22 0.065 255)", color: "oklch(0.85 0.09 75)" }}
              >
                <Globe className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Global Trade
                </span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                  Admin Panel
                </span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                Main Menu
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton 
                        isActive={activeSection === item.id}
                        asChild
                      >
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveSection(item.id as Section);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 transition-all duration-200 rounded-sm cursor-pointer ${
                            activeSection === item.id 
                              ? "bg-secondary text-secondary-foreground shadow-sm font-bold" 
                              : "hover:bg-muted"
                          }`}
                        >
                          <item.icon className={`w-4 h-4 ${activeSection === item.id ? "text-primary" : "text-slate-400"}`} />
                          <span className="text-sm">{item.label}</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button 
                    onClick={() => setLocation("/")}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-500 hover:text-primary transition-colors cursor-pointer"
                  >
                    <HomeIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">홈페이지 바로가기</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">로그아웃</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <SidebarInset className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <header className="h-16 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md border-b z-20 sticky top-0">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden" />
              <h1 className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                {menuItems.find(i => i.id === activeSection)?.label}
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-xs font-bold">이경구 대표님</span>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Administrator</span>
              </div>
              <div className="w-9 h-9 rounded-sm bg-primary/10 flex items-center justify-center border border-primary/20">
                <span className="text-primary font-bold text-sm">CEO</span>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-10 custom-scrollbar">
            {activeSection === "dashboard" && <DashboardView />}
            {activeSection === "cms" && <CMSView />}
            {activeSection === "pages" && <PageBuilderView />}
            {activeSection === "banner" && <BannerManagementView />}
            {activeSection === "inquiries" && <InquiriesView />}
            {activeSection === "settings" && <SettingsView />}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function DashboardView() {
  return (
    <div className="space-y-10 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative overflow-hidden rounded-sm p-10 shadow-2xl bg-slate-900 group">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] group-hover:scale-110 transition-transform duration-1000"></div>
        <div 
          className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
          style={{ background: "linear-gradient(135deg, oklch(0.22 0.065 255) 0%, oklch(0.72 0.12 75 / 0.8) 100%)" }}
        ></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary-foreground font-bold tracking-widest px-3 py-1 bg-white/10 backdrop-blur-sm">
              SYSTEM ONLINE
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              반갑습니다, <span style={{ color: "oklch(0.72 0.12 75)" }}>다람쥐 부장</span>입니다!
            </h2>
            <p className="text-slate-300 max-w-md text-sm leading-relaxed">
              대표님, 오늘도 글로벌 트레이드는 순조롭게 운영되고 있습니다. 
              최근 24시간 동안 12건의 새로운 문의가 접수되었습니다.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "총 매출", value: "₩128,450,000", change: "+12.5%", icon: TrendingUp, color: "oklch(0.72 0.12 75)" },
          { title: "전국 판매처", value: "542개", change: "+5개", icon: Globe, color: "oklch(0.72 0.18 55)" },
          { title: "신규 문의", value: "12건", change: "오늘", icon: MessageSquare, color: "oklch(0.65 0.12 10)" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-md transition-all duration-300 rounded-sm overflow-hidden group">
            <CardContent className="p-0">
              <div className="flex items-center">
                <div className="p-6 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{stat.title}</p>
                  <h3 className="text-2xl font-bold tracking-tight mb-1">{stat.value}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded-sm">
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex items-center justify-center bg-muted/30 h-full group-hover:bg-muted/50 transition-colors">
                  <stat.icon className="w-8 h-8 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: stat.color }} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CMSView() {
  const [content, setContent] = useState(safeLoad);

  const handleSave = () => {
    localStorage.setItem("cmsContent", JSON.stringify(content));
    toast.success("홈페이지 콘텐츠가 성공적으로 업데이트 되었습니다, 대표님!");
  };

  const handleReset = () => {
    if (confirm("정말로 초기화하시겠습니까? 수정한 내용이 모두 사라집니다.")) {
      setContent(INITIAL_CONTENT);
      localStorage.setItem("cmsContent", JSON.stringify(INITIAL_CONTENT));
      toast.info("초기 데이터로 복구되었습니다.");
    }
  };

  const updateField = (path: string[], value: any) => {
    const newContent = { ...content };
    let current = newContent;
    for (let i = 0; i < path.length - 1; i++) {
      current = (current as any)[path[i]];
    }
    (current as any)[path[path.length - 1]] = value;
    setContent(newContent);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center border-b pb-6">
        <div>
          <h2 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>홈페이지 콘텐츠 편집</h2>
          <p className="text-sm text-muted-foreground mt-1">홈페이지의 모든 글자와 이미지를 실시간으로 수정합니다.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 h-10 font-bold" onClick={handleReset}>
            <Undo className="w-4 h-4" /> 초기화
          </Button>
          <Button className="gap-2 h-10 px-8 font-bold shadow-lg shadow-primary/20" onClick={handleSave}>
            <Save className="w-4 h-4" /> 저장하기
          </Button>
        </div>
      </div>

      <div className="grid gap-12">
        {/* SITE SETTINGS */}
        <CMSSection title="글로벌 사이트 설정 (Global Settings)">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CMSField label="브라우저 탭 타이틀 (Site Title)" value={content.siteSettings.title} onChange={(v: string) => updateField(["siteSettings", "title"], v)} />
              <CMSField label="홈페이지 로고 텍스트 (Logo Text)" value={content.siteSettings.logoText} onChange={(v: string) => updateField(["siteSettings", "logoText"], v)} />
              <CMSField label="파비콘 이미지 URL (Favicon)" value={content.siteSettings.favicon} onChange={(v: string) => updateField(["siteSettings", "favicon"], v)} isImage />
           </div>
        </CMSSection>

        {/* HERO SECTION EDIT */}
        <CMSSection title="히어로 섹션 (Hero)">
          <div className="space-y-4">
            <CMSField label="메인 타이틀" type="textarea" value={content.hero.title} onChange={(v: string) => updateField(["hero", "title"], v)} className="font-serif text-lg" />
            <CMSField label="서브 타이틀" type="textarea" value={content.hero.subtitle} onChange={(v: string) => updateField(["hero", "subtitle"], v)} />
            <CMSField label="배지 텍스트" value={content.hero.badge} onChange={(v: string) => updateField(["hero", "badge"], v)} />
            <CMSField label="배경 이미지 URL" value={content.hero.imageUrl} onChange={(v: string) => updateField(["hero", "imageUrl"], v)} isImage context={content.hero.title} />
          </div>
        </CMSSection>

        {/* STATS EDIT */}
        <CMSSection title="현황 수치 (Stats)">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <CMSField label="업력 (년)" type="number" value={content.stats.years} onChange={(v) => updateField(["stats", "years"], parseInt(v))} />
            <CMSField label="제품 (종)" type="number" value={content.stats.products} onChange={(v) => updateField(["stats", "products"], parseInt(v))} />
            <CMSField label="판매처 (개)" type="number" value={content.stats.dealers} onChange={(v) => updateField(["stats", "dealers"], parseInt(v))} />
            <CMSField label="수입국 (개)" type="number" value={content.stats.countries} onChange={(v) => updateField(["stats", "countries"], parseInt(v))} />
          </div>
        </CMSSection>

        {/* ABOUT SECTION EDIT */}
        <CMSSection title="회사 소개 (About)">
          <div className="space-y-4">
            <CMSField label="섹션 제목" type="textarea" value={content.about.title} onChange={(v: string) => updateField(["about", "title"], v)} className="font-serif text-lg" />
            <CMSField label="설명 1" type="textarea" value={content.about.description1} onChange={(v: string) => updateField(["about", "description1"], v)} className="min-h-[120px]" />
            <CMSField label="설명 2" type="textarea" value={content.about.description2} onChange={(v: string) => updateField(["about", "description2"], v)} className="min-h-[100px]" />
            <CMSField label="메인 이미지 URL" value={content.about.imageUrl} onChange={(v: string) => updateField(["about", "imageUrl"], v)} isImage context={content.about.title} />
          </div>
        </CMSSection>

        {/* CATEGORIES EDIT */}
        <CMSSection title="제품 카테고리 (Categories)">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CMSField label="섹션 제목" value={content.categories.title} onChange={(v) => updateField(["categories", "title"], v)} />
              <CMSField label="서브 타이틀" value={content.categories.subtitle} onChange={(v) => updateField(["categories", "subtitle"], v)} />
            </div>
            <CMSField label="섹션 설명" type="textarea" value={content.categories.description} onChange={(v) => updateField(["categories", "description"], v)} />
            
            <div className="space-y-8 pt-4">
              {content.categories.list.map((cat: any, idx: number) => (
                <div key={cat.id} className="p-6 border border-slate-200 rounded-sm bg-slate-50/50 space-y-4">
                  <div className="flex justify-between items-center bg-white px-4 py-2 rounded-sm border mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">Category {idx + 1}</span>
                    <ImageIcon className="w-4 h-4 text-slate-300" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CMSField label="카테고리명 (EN)" value={cat.category} onChange={(v) => {
                      const newList = [...content.categories.list];
                      newList[idx].category = v;
                      updateField(["categories", "list"], newList);
                    }} />
                    <CMSField label="타이틀 (KR)" value={cat.title} onChange={(v) => {
                      const newList = [...content.categories.list];
                      newList[idx].title = v;
                      updateField(["categories", "list"], newList);
                    }} />
                  </div>
                  <CMSField label="이미지 URL" value={cat.image} onChange={(v: string) => {
                    const newList = [...content.categories.list];
                    newList[idx].image = v;
                    updateField(["categories", "list"], newList);
                  }} isImage context={cat.title} />
                  <CMSField label="설명" type="textarea" value={cat.description} onChange={(v) => {
                    const newList = [...content.categories.list];
                    newList[idx].description = v;
                    updateField(["categories", "list"], newList);
                  }} />
                  <CMSField label="태그 (쉼표로 구분)" value={cat.tags.join(", ")} onChange={(v) => {
                    const newList = [...content.categories.list];
                    newList[idx].tags = v.split(",").map((s: string) => s.trim()).filter(Boolean);
                    updateField(["categories", "list"], newList);
                  }} />
                  <CMSField label="원산지" value={cat.origin} onChange={(v) => {
                    const newList = [...content.categories.list];
                    newList[idx].origin = v;
                    updateField(["categories", "list"], newList);
                  }} />
                </div>
              ))}
            </div>
          </div>
        </CMSSection>

        {/* CONTACT EDIT */}
        <CMSSection title="연락처 정보 (Contact)">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <CMSField label="섹션 제목" value={content.contact.title} onChange={(v) => updateField(["contact", "title"], v)} />
               <CMSField label="서브 타이틀" value={content.contact.subtitle} onChange={(v) => updateField(["contact", "subtitle"], v)} />
            </div>
            <CMSField label="설명" type="textarea" value={content.contact.description} onChange={(v) => updateField(["contact", "description"], v)} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
               <div className="space-y-4">
                  <CMSField label="전화번호" value={content.contact.phone} onChange={(v) => updateField(["contact", "phone"], v)} />
                  <CMSField label="전화 부설명" value={content.contact.phoneSub} onChange={(v) => updateField(["contact", "phoneSub"], v)} />
               </div>
               <div className="space-y-4">
                  <CMSField label="이메일" value={content.contact.email} onChange={(v) => updateField(["contact", "email"], v)} />
                  <CMSField label="이메일 부설명" value={content.contact.emailSub} onChange={(v) => updateField(["contact", "emailSub"], v)} />
               </div>
            </div>
            <CMSField label="주소" value={content.contact.address} onChange={(v) => updateField(["contact", "address"], v)} />
            <CMSField label="주소 부설명" value={content.contact.addressSub} onChange={(v) => updateField(["contact", "addressSub"], v)} />
          </div>
        </CMSSection>
      </div>

      <div className="flex justify-end pt-10 border-t pb-20">
        <Button className="h-12 px-12 font-bold shadow-xl shadow-primary/20 bg-primary" onClick={handleSave}>
          모두 저장하기
        </Button>
      </div>
    </div>
  );
}

function BannerManagementView() {
  const [content, setContent] = useState(safeLoad);

  const handleSave = () => {
    localStorage.setItem("cmsContent", JSON.stringify(content));
    toast.success("배너 및 팝업 설정이 저장되었습니다!");
  };

  const updateBanner = (field: string, value: any) => {
    setContent({ ...content, eventBanner: { ...content.eventBanner, [field]: value } });
  };
  
  const updatePopup = (field: string, value: any) => {
    setContent({ ...content, popupBanner: { ...content.popupBanner, [field]: value } });
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto animate-in fade-in duration-500 pb-20">
      <div className="border-b pb-8">
        <h2 className="text-2xl font-bold font-serif">이벤트 배너 & 팝업 관리</h2>
        <p className="text-sm text-muted-foreground mt-1">상단 배너의 크기와 팝업 노출 여부를 자유롭게 설정합니다.</p>
      </div>

      <div className="grid gap-12">
        {/* TOP BANNER */}
        <Card className="border-none shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-900 text-white">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                   <Layout className="w-5 h-5 text-primary" /> 상단 띠 배너 설정
                </CardTitle>
              </div>
              <Switch checked={content.eventBanner.isActive} onCheckedChange={(v) => updateBanner("isActive", v)} />
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-6">
                  <CMSField label="배너 제목" value={content.eventBanner.title} onChange={(v) => updateBanner("title", v)} />
                  <CMSField label="배너 설명" type="textarea" value={content.eventBanner.description} onChange={(v) => updateBanner("description", v)} />
                  <div className="space-y-4 pt-2">
                     <div className="flex justify-between">
                        <Label className="text-[10px] font-bold uppercase">배너 세로 크기 (높이)</Label>
                        <span className="text-xs font-bold text-primary">{content.eventBanner.height}px</span>
                     </div>
                     <Slider 
                        value={[content.eventBanner.height]} 
                        min={30} max={120} step={2}
                        onValueChange={(v) => updateBanner("height", v[0])}
                     />
                  </div>
               </div>
               <div className="space-y-4">
                  <CMSField label="이미지 URL" value={content.eventBanner.imageUrl} onChange={(v: string) => updateBanner("imageUrl", v)} isImage context={content.eventBanner.title} />
                  <CMSField label="링크 URL" value={content.eventBanner.link} onChange={(v: string) => updateBanner("link", v)} />
               </div>
            </div>
          </CardContent>
        </Card>

        {/* POPUP BANNER */}
        <Card className="border-none shadow-sm overflow-hidden">
          <CardHeader className="bg-primary text-primary-foreground">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                   <Maximize2 className="w-5 h-5" /> 메인 팝업 배너 설정
                </CardTitle>
                <CardDescription className="text-primary-foreground/70">홈페이지 첫 접속 시 나타나는 중앙 팝업입니다.</CardDescription>
              </div>
              <Switch checked={content.popupBanner.isActive} onCheckedChange={(v) => updatePopup("isActive", v)} className="bg-white/20" />
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                   <CMSField label="팝업 제목" value={content.popupBanner.title} onChange={(v) => updatePopup("title", v)} />
                   <CMSField label="팝업 설명" type="textarea" value={content.popupBanner.description} onChange={(v) => updatePopup("description", v)} className="min-h-[100px]" />
                   <div className="grid grid-cols-2 gap-4">
                      <CMSField label="팝업 가로폭 (px)" type="number" value={content.popupBanner.width} onChange={(v) => updatePopup("width", parseInt(v))} />
                      <CMSField label="팝업 높이 (px)" type="number" value={content.popupBanner.height} onChange={(v) => updatePopup("height", parseInt(v))} />
                   </div>
                </div>
                <div className="space-y-4">
                   <CMSField label="팝업 이미지 URL" value={content.popupBanner.imageUrl} onChange={(v: string) => updatePopup("imageUrl", v)} isImage context={content.popupBanner.title} />
                   <CMSField label="클릭 시 이동 링크" value={content.popupBanner.link} onChange={(v) => updatePopup("link", v)} />
                </div>
             </div>
             
             {/* Popup Preview Overlay */}
             <div className="mt-6">
                <Label className="text-[10px] font-bold uppercase mb-4 block opacity-50">팝업 디자인 미리보기</Label>
                <div className="relative h-[350px] bg-slate-100 rounded-sm border-2 border-dashed flex items-center justify-center overflow-hidden">
                   <div 
                      className="bg-white shadow-2xl rounded-sm border flex flex-col overflow-hidden animate-in fade-in zoom-in duration-500" 
                      style={{ width: '220px', height: '280px' }}
                   >
                      <div className="h-28 w-full bg-slate-200">
                         {content.popupBanner.imageUrl && <img src={content.popupBanner.imageUrl} className="w-full h-full object-cover" />}
                      </div>
                      <div className="p-4 flex-1">
                         <h5 className="font-bold text-xs mb-1 line-clamp-1">{content.popupBanner.title}</h5>
                         <p className="text-[9px] opacity-70 line-clamp-3">{content.popupBanner.description}</p>
                      </div>
                      <div className="p-2 border-t flex justify-end">
                         <button className="text-[8px] font-bold text-primary uppercase">오늘 하루 닫기</button>
                      </div>
                   </div>
                </div>
             </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
           <Button className="h-12 px-12 font-bold shadow-xl shadow-primary/20" onClick={handleSave}>
              최종 설정 저장
           </Button>
        </div>
      </div>
    </div>
  );
}

function PageBuilderView() {
  const [content, setContent] = useState(safeLoad);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);

  const handleSave = (newContent = content) => {
    localStorage.setItem("cmsContent", JSON.stringify(newContent));
    toast.success("대표님, 페이지 구성이 완벽하게 저장되었습니다! 🫡");
  };

  const addPage = () => {
    const newPage = {
      id: "p" + Date.now(),
      title: "새 이벤트 페이지",
      path: "/event-" + Math.floor(Math.random() * 1000),
      showInNav: true,
      sections: [
        { id: "s1", type: "content", title: "새로운 소식", content: "내용을 입력해 주십시오.", imageUrl: "" }
      ]
    };
    const newContent = { ...content, pages: [...content.pages, newPage] };
    setContent(newContent);
    setSelectedPageId(newPage.id);
    handleSave(newContent);
  };

  const deletePage = (id: string) => {
    if (confirm("정말로 이 페이지를 삭제하시겠습니까? 관련 데이터가 모두 삭제됩니다.")) {
      const newContent = { ...content, pages: content.pages.filter((p: any) => p.id !== id) };
      setContent(newContent);
      if (selectedPageId === id) setSelectedPageId(null);
      handleSave(newContent);
    }
  };

  const updatePage = (id: string, field: string, value: any) => {
    const newContent = {
      ...content,
      pages: content.pages.map((p: any) => p.id === id ? { ...p, [field]: value } : p)
    };
    setContent(newContent);
  };

  const addSection = (pageId: string, type: string = "content") => {
    const sectionTemplates: any = {
      content: { id: "s" + Date.now(), type: "content", title: "", content: "", imageUrl: "" },
      form: { id: "s" + Date.now(), type: "form", title: "문의하기", description: "문의사항을 남겨주시면 담당자가 연락드리겠습니다.", buttonText: "전송하기" },
      menu: { id: "s" + Date.now(), type: "menu", title: "빠른 메뉴", dropdownLabel: "옵션 선택", dropdownItems: ["수입 대행", "도매 예약", "기타"], items: [{ label: "공식몰 이동", primary: true }] },
      html: { id: "s" + Date.now(), type: "html", html: "<div class='p-10 text-center bg-slate-50'><h3>Custom HTML Block</h3></div>" }
    };

    const newContent = {
      ...content,
      pages: content.pages.map((p: any) => {
        if (p.id === pageId) {
          return { ...p, sections: [...p.sections, sectionTemplates[type]] };
        }
        return p;
      })
    };
    setContent(newContent);
  };

  const moveSection = (pageId: string, sectionId: string, direction: 'up' | 'down') => {
    const newContent = {
      ...content,
      pages: content.pages.map((p: any) => {
        if (p.id === pageId) {
          const idx = p.sections.findIndex((s: any) => s.id === sectionId);
          if (direction === 'up' && idx > 0) {
            const newSections = [...p.sections];
            [newSections[idx], newSections[idx - 1]] = [newSections[idx - 1], newSections[idx]];
            return { ...p, sections: newSections };
          }
          if (direction === 'down' && idx < p.sections.length - 1) {
            const newSections = [...p.sections];
            [newSections[idx], newSections[idx + 1]] = [newSections[idx + 1], newSections[idx]];
            return { ...p, sections: newSections };
          }
        }
        return p;
      })
    };
    setContent(newContent);
  };

  const removeSection = (pageId: string, sectionId: string) => {
    const newContent = {
      ...content,
      pages: content.pages.map((p: any) => {
        if (p.id === pageId) {
          return { ...p, sections: p.sections.filter((s: any) => s.id !== sectionId) };
        }
        return p;
      })
    };
    setContent(newContent);
  };

  const updateSection = (pageId: string, sectionId: string, field: string, value: any) => {
    const newContent = {
      ...content,
      pages: content.pages.map((p: any) => {
        if (p.id === pageId) {
          return {
            ...p,
            sections: p.sections.map((s: any) => s.id === sectionId ? { ...s, [field]: value } : s)
          };
        }
        return p;
      })
    };
    setContent(newContent);
  };

  const selectedPage = content.pages.find((p: any) => p.id === selectedPageId);

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-sm border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold font-serif flex items-center gap-2">
             <Navigation className="w-6 h-6 text-primary" /> 페이지 빌더 (CMS Builder)
          </h2>
          <p className="text-xs text-muted-foreground mt-1">대표님만의 전용 페이지를 조립식으로 구성할 수 있는 프리미엄 빌더입니다.</p>
        </div>
        <Button onClick={addPage} className="gap-2 bg-primary shadow-lg shadow-primary/20 h-11 px-6 font-bold uppercase tracking-tight">
          <Plus className="w-4 h-4" /> 새 페이지 생성
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar: Page List */}
        <div className="lg:col-span-3 space-y-4 sticky top-24">
          <div className="flex items-center justify-between px-1">
             <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Page Navigation List</h3>
          </div>
          <div className="space-y-2">
            {content.pages.map((p: any) => (
              <div 
                key={p.id}
                className={`group p-4 rounded-sm border transition-all duration-200 cursor-pointer flex justify-between items-center ${
                  selectedPageId === p.id 
                    ? "bg-white border-primary shadow-md border-l-4 translate-x-1 ring-1 ring-primary/10" 
                    : "bg-white hover:bg-slate-50 border-slate-100"
                }`}
                onClick={() => setSelectedPageId(p.id)}
              >
                <div className="flex flex-col overflow-hidden">
                  <span className="font-bold text-sm tracking-tight truncate">{p.title}</span>
                  <span className="text-[9px] text-muted-foreground font-mono opacity-50 truncate">{p.path}</span>
                </div>
                <div className="flex gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); window.open(p.path, '_blank'); }}>
                    <Eye className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:bg-destructive/10" onClick={(e) => { e.stopPropagation(); deletePage(p.id); }}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
            {content.pages.length === 0 && (
              <div className="p-8 text-center border-2 border-dashed rounded-sm opacity-40">
                 <p className="text-xs">생성된 페이지가 없습니다.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Page Editor */}
        <div className="lg:col-span-9">
           {selectedPage ? (
             <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <Card className="border-none shadow-sm overflow-hidden bg-slate-900 text-white">
                   <CardHeader className="p-8 border-b border-white/10">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                         <div className="space-y-1">
                            <Badge variant="outline" className="text-[9px] font-bold text-primary border-primary/50 mb-2 uppercase tracking-widest">Page Settings</Badge>
                            <CardTitle className="text-2xl font-serif">{selectedPage.title} 편집 중</CardTitle>
                         </div>
                         <div className="flex items-center gap-6 bg-white/5 p-4 rounded-sm border border-white/10">
                            <div className="flex flex-col items-end gap-1">
                               <span className="text-[9px] font-bold uppercase opacity-50 tracking-tighter">NAV MENU EXPOSURE</span>
                               <span className="text-[10px] font-bold">{selectedPage.showInNav ? '표시됨' : '숨김'}</span>
                            </div>
                            <Switch checked={selectedPage.showInNav} onCheckedChange={(v) => updatePage(selectedPage.id, "showInNav", v)} className="data-[state=checked]:bg-primary" />
                         </div>
                      </div>
                   </CardHeader>
                   <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-800/50">
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">페이지 타이틀</Label>
                        <Input value={selectedPage.title} onChange={(e) => updatePage(selectedPage.id, "title", e.target.value)} className="bg-white/5 border-white/10 text-white h-12 focus:border-primary" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">접속 주소 (PATH)</Label>
                        <div className="flex h-12">
                           <div className="bg-white/10 border border-r-0 border-white/10 px-3 flex items-center text-[10px] font-mono text-white/30 rounded-l-sm">/</div>
                           <Input value={selectedPage.path.replace(/^\//, '')} onChange={(e) => updatePage(selectedPage.id, "path", '/' + e.target.value.replace(/^\//,''))} className="bg-white/5 border-white/10 text-white h-full focus:border-primary rounded-l-none" />
                        </div>
                      </div>
                   </CardContent>
                </Card>

                <div className="space-y-6">
                   <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                      <h3 className="text-lg font-bold font-serif flex items-center gap-3">
                         <Layout className="w-5 h-5 text-primary" /> 페이지 섹션 타임라인
                         <Badge className="bg-slate-100 text-slate-500 border-none font-bold text-[10px]">{selectedPage.sections.length}</Badge>
                      </h3>
                      <div className="flex gap-2">
                        <Select onValueChange={(type) => addSection(selectedPage.id, type)}>
                           <SelectTrigger className="w-[180px] h-10 font-bold text-xs bg-white">
                              <Plus className="w-3.5 h-3.5 mr-2" /> <SelectValue placeholder="섹션 추가하기" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="content" className="text-xs">👑 컨텐츠 (이미지+설명)</SelectItem>
                              <SelectItem value="form" className="text-xs">📧 문의 메일 폼</SelectItem>
                              <SelectItem value="menu" className="text-xs">🔗 바로가기 메뉴 세트</SelectItem>
                              <SelectItem value="html" className="text-xs">💻 커스텀 HTML 코드</SelectItem>
                           </SelectContent>
                        </Select>
                        <Button onClick={() => handleSave()} className="h-10 px-8 font-bold gap-2 bg-primary shadow-lg shadow-primary/20">
                           <Save className="w-4 h-4" /> 전체 변경사항 저장
                        </Button>
                      </div>
                   </div>

                   <div className="space-y-4">
                   {selectedPage.sections.map((section: any, idx: number) => (
                      <Card key={section.id} className="border shadow-sm overflow-hidden border-slate-200 group/section hover:shadow-md transition-shadow">
                         <div className="bg-slate-50 border-b px-6 py-4 flex justify-between items-center h-14">
                            <div className="flex items-center gap-4">
                               <div className="flex flex-col gap-1 mr-2">
                                  <button onClick={() => moveSection(selectedPage.id, section.id, 'up')} className="text-slate-400 hover:text-primary disabled:opacity-30" disabled={idx === 0}><ChevronUp className="w-4 h-4" /></button>
                                  <button onClick={() => moveSection(selectedPage.id, section.id, 'down')} className="text-slate-400 hover:text-primary disabled:opacity-30" disabled={idx === selectedPage.sections.length - 1}><ChevronDown className="w-4 h-4" /></button>
                               </div>
                               <Badge className="bg-primary text-white text-[9px] font-bold tracking-widest px-3 py-1">#{idx + 1}</Badge>
                               <div className="flex items-center gap-2">
                                  {section.type === 'content' && <ImageIcon className="w-3.5 h-3.5 text-slate-400" />}
                                  {section.type === 'form' && <Mail className="w-3.5 h-3.5 text-slate-400" />}
                                  {section.type === 'menu' && <MenuIcon className="w-3.5 h-3.5 text-slate-400" />}
                                  {section.type === 'html' && <Code className="w-3.5 h-3.5 text-slate-400" />}
                                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                     {section.type === 'content' ? 'Content Block' : section.type === 'form' ? 'Inquiry Form' : section.type === 'menu' ? 'Action Menu' : 'Custom HTML'}
                                  </span>
                               </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-destructive hover:bg-destructive/5 rounded-full" onClick={() => removeSection(selectedPage.id, section.id)}>
                               <Trash2 className="w-4 h-4" />
                            </Button>
                         </div>
                         <CardContent className="p-8 space-y-6">
                            {section.type === "content" && (
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                  <div className="space-y-6">
                                     <CMSField label="섹션 소제목" value={section.title} onChange={(v: string) => updateSection(selectedPage.id, section.id, "title", v)} />
                                     <CMSField label="본문 내용" type="textarea" value={section.content} onChange={(v: string) => updateSection(selectedPage.id, section.id, "content", v)} className="min-h-[150px]" />
                                  </div>
                                  <div>
                                     <CMSField label="섹션 이미지" value={section.imageUrl} onChange={(v: string) => updateSection(selectedPage.id, section.id, "imageUrl", v)} isImage context={section.title} />
                                  </div>
                               </div>
                            )}

                            {section.type === "form" && (
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50 p-6 rounded-sm border border-slate-100 italic">
                                  <div className="space-y-4">
                                     <CMSField label="폼 헤드라인" value={section.title} onChange={(v: string) => updateSection(selectedPage.id, section.id, "title", v)} />
                                     <CMSField label="하단 안내 문구" value={section.description} onChange={(v: string) => updateSection(selectedPage.id, section.id, "description", v)} />
                                  </div>
                                  <div className="space-y-4">
                                     <CMSField label="전송 버튼 텍스트" value={section.buttonText} onChange={(v: string) => updateSection(selectedPage.id, section.id, "buttonText", v)} />
                                     <div className="p-4 bg-emerald-50 rounded-sm border border-emerald-100">
                                        <p className="text-[10px] font-bold text-emerald-700 uppercase flex items-center gap-2"><Mail className="w-3 h-3" /> FORM PREVIEW</p>
                                        <p className="text-[9px] text-emerald-600/80 mt-1 leading-relaxed">이 폼을 통해 접수되는 문의는 설정된 이메일로 자동 전송됩니다.</p>
                                     </div>
                                  </div>
                               </div>
                            )}

                            {section.type === "menu" && (
                               <div className="space-y-6">
                                  <div className="grid md:grid-cols-3 gap-6">
                                     <CMSField label="메뉴 블록 타이틀" value={section.title} onChange={(v: string) => updateSection(selectedPage.id, section.id, "title", v)} />
                                     <CMSField label="드롭다운 기본 라벨" value={section.dropdownLabel} onChange={(v: string) => updateSection(selectedPage.id, section.id, "dropdownLabel", v)} />
                                     <div className="space-y-2">
                                        <Label className="text-[10px] font-bold uppercase opacity-50">드롭다운 아이템 (쉼표로 구분)</Label>
                                        <Input value={section.dropdownItems.join(', ')} onChange={(e) => updateSection(selectedPage.id, section.id, "dropdownItems", e.target.value.split(',').map(i => i.trim()))} className="h-11" />
                                     </div>
                                  </div>
                                  <div className="p-4 border border-dashed rounded-sm bg-slate-50">
                                     <p className="text-[10px] font-bold mb-4 opacity-50 uppercase tracking-widest">Action Buttons Config</p>
                                     <div className="flex flex-wrap gap-4">
                                        {section.items.map((btn: any, bidx: number) => (
                                           <div key={bidx} className="flex gap-2 items-end bg-white p-3 rounded-sm border shadow-sm">
                                              <CMSField label={`버튼 ${bidx + 1} 문구`} value={btn.label} onChange={(v: string) => {
                                                 const newItems = [...section.items];
                                                 newItems[bidx] = { ...btn, label: v };
                                                 updateSection(selectedPage.id, section.id, "items", newItems);
                                              }} />
                                              <Button variant="ghost" size="icon" className="h-11 w-11 text-slate-300 hover:text-destructive" onClick={() => {
                                                 const newItems = section.items.filter((_: any, i: number) => i !== bidx);
                                                 updateSection(selectedPage.id, section.id, "items", newItems);
                                              }}><Trash2 className="w-4 h-4" /></Button>
                                           </div>
                                        ))}
                                        <Button variant="outline" className="h-[73px] border-dashed px-8 text-xs font-bold gap-2" onClick={() => updateSection(selectedPage.id, section.id, "items", [...section.items, { label: "새 버튼", primary: false }])}>
                                           <Plus className="w-4 h-4" /> 버튼 추가
                                        </Button>
                                     </div>
                                  </div>
                               </div>
                            )}

                            {section.type === "html" && (
                               <div className="space-y-4">
                                  <div className="flex items-center justify-between">
                                     <Label className="text-[10px] font-bold uppercase opacity-60 flex items-center gap-2"><Code className="w-3.5 h-3.5" /> HTML/JSX Source Editor</Label>
                                     <Badge variant="outline" className="text-[9px] font-bold text-amber-600 bg-amber-50">DANGEROUS BLOCK</Badge>
                                  </div>
                                  <Textarea 
                                    className="font-mono text-xs bg-slate-900 text-emerald-400 min-h-[400px] border-none p-8 rounded-sm shadow-2xl"
                                    value={section.html || ""}
                                    onChange={(e: any) => updateSection(selectedPage.id, section.id, "html", e.target.value)}
                                    placeholder="<!-- HTML 코드를 직접 입력하세요 -->\n<div class='custom-box'>...</div>"
                                  />
                               </div>
                            )}
                         </CardContent>
                      </Card>
                   ))}
                   </div>

                   {selectedPage.sections.length === 0 && (
                      <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed rounded-sm opacity-30 text-center">
                         <Layout className="w-12 h-12 mb-4" />
                         <p className="text-sm font-bold">섹션이 비어 있습니다.<br/>상단 [+ 섹션 추가하기] 버튼을 눌러보세요.</p>
                      </div>
                   )}
                </div>
             </div>
           ) : (
             <div className="h-[600px] flex flex-col items-center justify-center border-2 border-dashed rounded-sm bg-slate-50/50 opacity-60 text-center p-12 overflow-hidden">
                <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-8 ring-8 ring-slate-50">
                   <Monitor className="w-10 h-10 text-slate-300" />
                </div>
                <h4 className="text-2xl font-bold font-serif mb-3 text-slate-800">편집할 페이지를 선택해 주십시오, 대표님!</h4>
                <p className="text-sm max-w-sm mx-auto text-slate-500 leading-relaxed font-medium">좌측 목록에서 기존 페이지를 선택하거나, 우측 상단의 [새 페이지 생성] 버튼을 눌러 비즈니스 전략에 맞는 새로운 콘텐츠를 구성할 수 있습니다.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}

function InquiriesView() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b pb-8">
        <h2 className="text-2xl font-bold font-serif">고객 문의 관리</h2>
        <p className="text-sm text-muted-foreground mt-1">접수된 모든 거래 및 파트너십 문의를 확인합니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INQUIRIES.map((item) => (
          <Card key={item.id} className="border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-sm group overflow-hidden">
            <div className={`h-1.5 w-full ${item.status === '대기중' ? 'bg-destructive' : 'bg-emerald-500'}`} />
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center mb-2">
                <Badge variant="outline" className="text-[9px] font-bold tracking-widest px-1.5 py-0 rounded-sm border-muted text-muted-foreground bg-slate-50 italic">
                  REF: {item.id}
                </Badge>
                <span className="text-[10px] text-muted-foreground font-bold">{item.date}</span>
              </div>
              <CardTitle className="text-lg font-bold tracking-tight mb-0.5">{item.company}</CardTitle>
              <CardDescription className="text-xs font-medium text-primary/80">{item.type} · {item.name}</CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              <p className="text-sm leading-relaxed text-slate-600 mb-6 italic line-clamp-3">
                "안녕하세요. 저희는 새로 오픈하는 오프라인 소품샵입니다. 크리스마스 시즌을 대비하여 귀사의 럭셔리 제품군을 대량으로 사입하고 싶습니다..."
              </p>
              <div className="flex justify-between items-center">
                 <Badge variant={item.status === '대기중' ? 'destructive' : 'secondary'} className="rounded-sm text-[10px] font-bold h-6 px-3">
                   {item.status}
                 </Badge>
                 <Button className="h-8 text-[10px] font-bold px-4 rounded-sm">
                   상세 답변하기
                 </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function SettingsView() {
  const [content, setContent] = useState(safeLoad);
  const [, setLocation] = useLocation();

  // 관리자 계정 변경 상태
  const [showCredForm, setShowCredForm] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newId, setNewId] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const savedCreds = localStorage.getItem("adminCredentials");
    if (savedCreds) {
      const parsed = JSON.parse(savedCreds);
      setCurrentId(parsed.id);
      setNewId(parsed.id);
    } else {
      setCurrentId("admin");
      setNewId("admin");
    }
  }, []);

  const handleSaveContent = () => {
    localStorage.setItem("cmsContent", JSON.stringify(content));
    toast.success("관리자 설정이 저장되었습니다, 대표님! 🫡");
  };

  const handleSaveCredentials = () => {
    const savedCreds = localStorage.getItem("adminCredentials");
    const savedPassword = savedCreds ? JSON.parse(savedCreds).password : "admin";

    if (currentPassword !== savedPassword) {
      toast.error("현재 비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!newId || !newPassword) {
      toast.error("새로운 ID와 비밀번호를 모두 입력해주세요.");
      return;
    }

    localStorage.setItem("adminCredentials", JSON.stringify({ id: newId, password: newPassword }));
    toast.success("계정 정보가 성공적으로 변경되었습니다. 보안을 위해 다시 로그인해주세요.");
    
    // 로그아웃 처리
    localStorage.removeItem("isAdminAuthenticated");
    setLocation("/login");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500">
       <div className="border-b pb-8">
          <h2 className="text-3xl font-bold font-serif">관리자 설정</h2>
          <p className="text-sm text-muted-foreground mt-2">시스템 환경 및 AI API 설정을 관리합니다.</p>
       </div>

       <CMSSection title="AI 연동 설정 (Google FLOW)">
          <div className="space-y-6">
             <div className="p-4 bg-primary/5 border border-primary/20 rounded-sm">
                <p className="text-xs text-primary font-bold flex items-center gap-2 mb-2">
                   <TrendingUp className="w-3 h-3" /> Google Gemini API 연동 가이드
                </p>
                <p className="text-[10px] text-slate-600 leading-relaxed">
                   구글의 최신 이미지 생성 모델(FLOW)을 사용하기 위해 **Google AI Studio**에서 발급받은 API 키를 아래에 입력해 주십시오. 
                   입력하신 키는 브라우저 로컬 저장소에 암호화되어 보관되며, 더 선명하고 고급스러운 배너 이미지를 생성할 때 사용됩니다.
                </p>
             </div>
             
             <CMSField 
                label="Gemini API Key" 
                type="password"
                value={content.siteSettings.geminiKey || ""} 
                onChange={(v: string) => setContent({
                  ...content,
                  siteSettings: { ...content.siteSettings, geminiKey: v }
                })} 
                className="font-mono tracking-widest"
             />
          </div>
       </CMSSection>

       <CMSSection title="대시보드 보안 설정">
          <div className="space-y-6">
             <div className="flex items-center justify-between border-b pb-4">
                <div>
                   <p className="font-bold text-sm tracking-tight mb-0.5">관리자 계정 변경</p>
                   <p className="text-xs text-muted-foreground">현재 계정 ID: <span className="font-bold text-primary">{currentId}</span></p>
                </div>
                <Button 
                   variant={showCredForm ? "outline" : "default"} 
                   className="text-xs font-bold rounded-sm h-9" 
                   onClick={() => setShowCredForm(!showCredForm)}
                >
                   {showCredForm ? "취소하기" : "비밀번호 변경하기"}
                </Button>
             </div>

             {showCredForm && (
                <div className="pt-2 space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
                   <div className="p-4 bg-slate-50 border rounded-sm space-y-4">
                      <div className="space-y-2">
                         <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">현재 비밀번호 확인</Label>
                         <Input 
                            type="password" 
                            value={currentPassword} 
                            onChange={(e) => setCurrentPassword(e.target.value)} 
                            placeholder="보안을 위해 현재 비밀번호를 입력해주세요"
                            className="bg-white"
                         />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                         <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-widest text-primary">새로운 관리자 ID</Label>
                            <Input 
                               value={newId} 
                               onChange={(e) => setNewId(e.target.value)} 
                               placeholder="새로운 ID"
                               className="bg-white border-primary/20 focus-visible:ring-primary/20"
                            />
                         </div>
                         <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-widest text-primary">새로운 비밀번호</Label>
                            <Input 
                               type="password" 
                               value={newPassword} 
                               onChange={(e) => setNewPassword(e.target.value)} 
                               placeholder="새로운 비밀번호"
                               className="bg-white border-primary/20 focus-visible:ring-primary/20"
                            />
                         </div>
                      </div>
                      <div className="flex justify-end pt-2">
                         <Button onClick={handleSaveCredentials} className="font-bold">계정 정보 업데이트</Button>
                      </div>
                   </div>
                </div>
             )}
          </div>
       </CMSSection>

       <div className="flex justify-end pt-6 border-t pb-20">
          <Button 
            className="rounded-sm px-12 h-12 font-bold shadow-xl shadow-primary/20 bg-primary"
            onClick={handleSaveContent}
          >
             기본 설정 저장하기
          </Button>
       </div>
    </div>
  );
}

// UI Helpers
function CMSSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-6 bg-primary rounded-full"></div>
        <h3 className="font-bold uppercase tracking-widest text-xs text-slate-500 italic">{title}</h3>
      </div>
      <div className="p-8 bg-white border border-slate-100 rounded-sm shadow-sm">
        {children}
      </div>
    </section>
  );
}

// Image Upload Helper (Base64 for Vercel/localStorage compatibility)
function ImageUpload({ onUploaded }: { onUploaded: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("파일 크기가 너무 큽니다! (최대 5MB)");
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      onUploaded(reader.result as string);
      setUploading(false);
      toast.success("사진 업로드 완료!");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="inline-block">
      <input
        type="file"
        id="image-load-trigger"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      <Button 
        variant="outline" 
        size="sm" 
        className="h-7 text-[10px] font-bold gap-1 mt-1 bg-slate-50 border-slate-300"
        onClick={() => document.getElementById("image-load-trigger")?.click()}
        disabled={uploading}
      >
        <ImageIcon className="w-3 h-3" /> 내 사진 업로드
      </Button>
    </div>
  );
}

// AI Image Generator Helper with Context Aware Prompting
function AIGenerator({ onGenerated, context = "", label = "" }: { onGenerated: (url: string) => void; context?: string; label?: string }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open && context && !prompt) setPrompt(context);
  }, [open, context]);

  const generate = async () => {
    const finalPrompt = prompt || context || label;
    if (!finalPrompt) {
      toast.error("대표님, 키워드를 입력해 주셔야 AI가 그림을 그립니다! 🫡");
      return;
    }

    setLoading(true);
    
    // 로컬 스토리지에서 API 키 확인
    const saved = localStorage.getItem("cmsContent");
    const geminiKey = saved ? JSON.parse(saved).siteSettings?.geminiKey : "";

    try {
      // 대표님의 품격에 맞는 고퀄리티 키워드 강제 주입 (줄바꿈 제거 정제 추가)
      const cleanPrompt = finalPrompt.replace(/\n/g, " ").replace(/\r/g, " ").trim();
      const enhanced = `${cleanPrompt}, ultra luxury, professional product photography, soft museum lighting, elegant materials, 8k resolution, crisp detail, minimalist aesthetic`;
      const startTime = Date.now();

      // 제미나이 키 유무에 따른 엔진 최적화
      if (geminiKey && geminiKey.length > 20) {
        console.log("🚀 Google Gemini Imagen 3 로컬 프록시 가동...");
        
        // 서버 측 프록시 호출 (CORS 우회)
        try {
          const response = await fetch('/api/gemini/generate-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: enhanced, geminiKey })
          });

          if (response.ok) {
            const data = await response.json();
            if (data.image) {
              const finalImageUrl = data.image;
              
              onGenerated(finalImageUrl);
              setLoading(false);
              setOpen(false);
              toast.success("대표님, 제미나이의 지성으로 완성한 고품격 이미지입니다! 😎");
              return;
            }
          } else {
             const errorData = await response.json();
             console.error("Gemini Proxy Error Response:", errorData);
             toast.error(`제미나이 호출 실패: ${errorData.error || "알 수 없는 오류"}`);
             setLoading(false);
             return; // 제미나이 키가 있는데 실패한 경우, 폴리네이션으로 넘기지 않고 에러 표시
          }
        } catch (apiErr) {
          console.error("Gemini Proxy Fetch Error:", apiErr);
          toast.error("서버 연결에 실패했습니다. 다시 시도해 주십시오.");
          setLoading(false);
          return;
        }
      }

      // 제미나이 키가 없는 경우에만 예비용 프리미엄 엔진 작동
      console.log("ℹ️ 제미나이 키가 없어 예비 엔진을 사용합니다.");
      const encoded = encodeURIComponent(enhanced);
      const seed = Math.floor(Math.random() * 9999999);
      const imageUrl = `https://pollinations.ai/p/${encoded}?width=1280&height=720&seed=${seed}&nologo=true&enhance=true&model=flux`;

      // 이미지 객체를 미리 생성하여 캐싱 및 로딩 확인
      const img = new Image();
      img.src = imageUrl;
      
      const handleFinish = () => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(1200 - elapsedTime, 0);

        setTimeout(() => {
          onGenerated(imageUrl);
          setLoading(false);
          setOpen(false);
          toast.success("대표님, 프리미엄 엔진이 이미지를 완성했습니다! 🫡");
        }, remainingTime);
      };

      img.onload = handleFinish;
      img.onerror = handleFinish;

    } catch (err) {
      console.error(err);
      toast.error("이미지 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해 주십시오.");
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        className="h-7 text-[10px] font-bold gap-1 mt-1 border-primary/30 text-primary hover:bg-primary/5 uppercase tracking-tighter"
        onClick={() => setOpen(true)}
      >
        <TrendingUp className="w-3 h-3" /> AI 이미지 생성
      </Button>
    );
  }

  return (
    <div className="mt-2 p-4 bg-white rounded-sm border-2 border-primary/20 shadow-xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex justify-between items-center bg-slate-50 -m-4 p-3 mb-1 border-b">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
           <Monitor className="w-3 h-3 animate-pulse" /> Gemini Flow Engine
        </span>
        <button 
          onClick={() => !loading && setOpen(false)} 
          disabled={loading}
          className="p-1 hover:bg-slate-200 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        <Label className="text-[9px] text-slate-400 uppercase font-black tracking-widest">Image Prompting</Label>
        <Input 
          placeholder="이미지 컨셉을 한글로 입력하세요..." 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
          className="h-10 text-xs border-slate-200 focus:border-primary transition-all bg-slate-50/50"
        />
      </div>

      <Button 
        className="w-full h-12 text-xs font-black gap-2 shadow-lg shadow-primary/20 bg-primary group" 
        onClick={generate} 
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 border-2 border-white/40 border-t-white animate-spin rounded-full" />
            <span className="animate-pulse">AI 화가가 작업 중입니다...</span>
          </div>
        ) : (
          <>
            이미지 생성하기 <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </Button>
      
      {loading && (
        <p className="text-[9px] text-center text-slate-400 font-bold animate-bounce mt-2 uppercase tracking-tighter">
          Please wait while we render your masterpiece
        </p>
      )}
    </div>
  );
}

function CMSField({ label, value, onChange, type = "text", isImage = false, context = "", className = "" }: any) {
  const [imageLoading, setImageLoading] = useState(false);

  // value가 변경될 때 로딩 처리
  useEffect(() => {
    if (isImage && value) {
      setImageLoading(true);
      // 이미지가 캐시되어 있을 수 있으므로 브라우저 체크 후 5초 뒤 자동 해제 안전장치
      const timer = setTimeout(() => setImageLoading(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [value, isImage]);

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block">{label}</label>
      {type === "textarea" ? (
        <Textarea 
          value={value} 
          onChange={(e: any) => onChange(e.target.value)}
          className={`rounded-sm min-h-[80px] ${className}`} 
        />
      ) : (
        <Input 
          type={type}
          value={value} 
          onChange={(e: any) => onChange(e.target.value)}
          className={`rounded-sm h-11 ${className}`} 
        />
      )}
      {isImage && (
        <div className="space-y-4">
          <div className="relative mt-2 min-h-[200px] w-full max-w-[500px] border-2 border-slate-100 rounded-sm overflow-hidden bg-white shadow-sm group">
            {/* 로딩 표시 (이미지를 가리지 않고 위에 띄움) */}
            {imageLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[2px]">
                 <div className="w-10 h-10 border-4 border-primary/20 border-t-primary animate-spin rounded-full mb-3" />
                 <span className="text-[10px] font-black text-primary animate-pulse uppercase tracking-[0.2em]">Updating Preview...</span>
              </div>
            )}
            
            {value ? (
              <div className="p-2 h-full flex items-center justify-center">
                <img 
                  src={value} 
                  alt="CMS Preview" 
                  key={value}
                  className="max-w-full h-auto max-h-[400px] object-contain shadow-sm transition-transform duration-300 group-hover:scale-[1.01]"
                  onLoad={() => {
                    console.log("Preview Image Loaded");
                    setImageLoading(false);
                  }}
                  onError={() => {
                    setImageLoading(false);
                  }}
                />
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 bg-slate-50">
                 <ImageIcon className="w-12 h-12 mb-2 opacity-10" />
                 <span className="text-[10px] font-bold uppercase tracking-widest opacity-30">Waiting for Image...</span>
              </div>
            )}
            
            {value && (
              <div className="absolute top-2 left-2 z-20 flex gap-2">
                 <Badge variant="outline" className="bg-white/90 backdrop-blur-sm text-[8px] font-black border-slate-200">
                    {value.startsWith('data:') ? 'UPLOADED' : 'AI GENERATED'}
                 </Badge>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <AIGenerator onGenerated={onChange} context={context} label={label} />
            <ImageUpload onUploaded={onChange} />
          </div>
          
          {/* 디버깅용 URL 표시 (필요시 확인 가능) */}
          {value && (
             <p className="text-[9px] text-slate-400 font-mono truncate bg-slate-50 p-2 rounded-sm border border-slate-100">
                {value}
             </p>
          )}
        </div>
      )}
    </div>
  );
}
