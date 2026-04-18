import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useEffect, useState } from "react";

import CustomPage from "./pages/CustomPage";
import { INITIAL_CONTENT } from "./lib/cms-content";

function Router() {
  const [location, setLocation] = useLocation();
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

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
    if (location.startsWith("/admin") && !isAuthenticated) {
      setLocation("/login");
    }
  }, [location, setLocation]);

  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/login"} component={Login} />
      <Route path={"/admin"} component={Admin} />
      
      {/* Dynamic CMS Custom Pages */}
      {content.pages.map((page: any) => (
        <Route key={page.id} path={page.path}>
          <CustomPage pageData={page} />
        </Route>
      ))}

      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

