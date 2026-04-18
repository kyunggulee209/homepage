import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Lock, User } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    let savedId = "admin";
    let savedPassword = "admin";
    
    try {
      const savedCreds = localStorage.getItem("adminCredentials");
      if (savedCreds) {
        const parsed = JSON.parse(savedCreds);
        if (parsed.id) savedId = parsed.id;
        if (parsed.password) savedPassword = parsed.password;
      }
    } catch (err) {
      console.error("Failed to parse admin credentials:", err);
    }

    if (username === savedId && password === savedPassword) {
      localStorage.setItem("isAdminAuthenticated", "true");
      toast.success("다람쥐 부장이 확인했습니다! 어드민 센터로 모시겠습니다.");
      setLocation("/admin");
    } else {
      toast.error("계정 정보가 일치하지 않습니다, 대표님! 다시 한 번 확인 부탁 드립니다.");
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: "oklch(0.22 0.065 255)" }}
    >
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      <Card className="w-full max-w-md border-none shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
        <div className="h-2 w-full bg-gradient-to-r from-amber-500 to-amber-200"></div>
        <CardHeader className="text-center pt-8">
          <div 
            className="w-16 h-16 rounded-sm flex items-center justify-center mx-auto mb-4 shadow-lg"
            style={{ backgroundColor: "oklch(0.22 0.065 255)", color: "oklch(0.85 0.09 75)" }}
          >
            <Globe className="w-10 h-10" />
          </div>
          <CardTitle className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Global Trade Admin
          </CardTitle>
          <CardDescription className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground/60">
            Secure Access Only
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Admin ID</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 h-12 rounded-sm border-slate-200 focus-visible:ring-primary/20" 
                  placeholder="ID 입력"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 rounded-sm border-slate-200 focus-visible:ring-primary/20" 
                  placeholder="비밀번호 입력"
                />
              </div>
            </div>
            
            <Button 
              type="submit"
              className="w-full h-12 rounded-sm font-bold shadow-xl shadow-primary/10 hover:scale-[1.02] transition-transform active:scale-95"
            >
              로그인하기
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-[10px] text-muted-foreground font-medium italic">
              "대표님, 암호는 admin / admin 입니다! 보안을 위해 나중에 꼭 변경하십시오!"
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
