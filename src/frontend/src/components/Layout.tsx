import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import {
  BookOpen,
  Brain,
  ChevronDown,
  FileText,
  Globe,
  Image,
  LayoutDashboard,
  Menu,
  MessageCircle,
  Settings,
  Video,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { ReactNode } from "react";

interface NavItem {
  labelKey: string;
  icon: ReactNode;
  href: string;
  ocid: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    labelKey: "nav.dashboard",
    icon: <LayoutDashboard size={18} />,
    href: "/",
    ocid: "nav.dashboard.link",
  },
  {
    labelKey: "nav.textAnalysis",
    icon: <FileText size={18} />,
    href: "/text-analysis",
    ocid: "nav.text_analysis.link",
  },
  {
    labelKey: "nav.imageAnalysis",
    icon: <Image size={18} />,
    href: "/image-analysis",
    ocid: "nav.image_analysis.link",
  },
  {
    labelKey: "nav.videoAnalysis",
    icon: <Video size={18} />,
    href: "/video-analysis",
    ocid: "nav.video_analysis.link",
  },
  {
    labelKey: "nav.education",
    icon: <BookOpen size={18} />,
    href: "/education",
    ocid: "nav.education.link",
  },
  {
    labelKey: "nav.whatsappBot",
    icon: <MessageCircle size={18} />,
    href: "/whatsapp-bot",
    ocid: "nav.whatsapp_bot.link",
  },
];

function NavLink({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const location = useLocation();
  const { t } = useLanguage();
  const isActive =
    item.href === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(item.href);

  return (
    <Link
      to={item.href}
      data-ocid={item.ocid}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth relative group",
        isActive
          ? "bg-primary/15 text-primary glow-accent"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
      )}
    >
      {isActive && (
        <motion.div
          layoutId="nav-active"
          className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/30"
          transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
        />
      )}
      <span className="relative z-10 shrink-0">{item.icon}</span>
      {!collapsed && (
        <span className="relative z-10 truncate">
          {t(item.labelKey as Parameters<typeof t>[0])}
        </span>
      )}
    </Link>
  );
}

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? 64 : 240 }}
        transition={{ type: "spring", bounce: 0, duration: 0.3 }}
        className={cn(
          "fixed md:relative z-50 md:z-auto h-full flex-shrink-0",
          "bg-[oklch(0.14_0.01_200)] border-r border-border",
          "flex flex-col overflow-hidden",
          "transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 py-5 min-h-[68px]">
          <div className="shrink-0 w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center glow-cyan">
            <Brain size={16} className="text-primary" />
          </div>
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="min-w-0"
            >
              <p className="font-display font-bold text-sm text-foreground truncate">
                TruthLens AI
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {t("appTagline")}
              </p>
            </motion.div>
          )}
        </div>

        <Separator className="opacity-40" />

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} item={item} collapsed={sidebarCollapsed} />
          ))}
        </nav>

        <Separator className="opacity-40" />

        {/* Bottom section */}
        <div className="px-2 py-3 space-y-1">
          <Link
            to="/settings"
            data-ocid="nav.settings.link"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-smooth"
          >
            <Settings size={18} />
            {!sidebarCollapsed && (
              <span className="truncate">{t("nav.settings")}</span>
            )}
          </Link>
        </div>

        {/* Collapse toggle (desktop) */}
        <button
          type="button"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden md:flex items-center justify-center h-10 border-t border-border text-muted-foreground hover:text-foreground transition-smooth"
        >
          <motion.div animate={{ rotate: sidebarCollapsed ? 0 : 180 }}>
            <ChevronDown size={14} className="-rotate-90" />
          </motion.div>
        </button>
      </motion.aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="shrink-0 flex items-center justify-between px-4 md:px-6 h-[68px] bg-card border-b border-border">
          {/* Mobile menu button */}
          <button
            type="button"
            data-ocid="header.menu_button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground transition-smooth"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Page title area (desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <div className="w-1.5 h-6 rounded-full bg-primary glow-accent" />
            <span className="font-display font-semibold text-sm text-foreground">
              {t("appName")}
            </span>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Language toggle */}
            <div
              data-ocid="header.language_toggle"
              className="flex items-center gap-1 p-1 rounded-lg bg-muted/40 border border-border"
            >
              <Globe size={13} className="text-muted-foreground ml-1" />
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={cn(
                  "px-2.5 py-1 rounded-md text-xs font-semibold transition-smooth",
                  language === "en"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage("hi")}
                className={cn(
                  "px-2.5 py-1 rounded-md text-xs font-semibold transition-smooth",
                  language === "hi"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                HI
              </button>
            </div>

            {/* User menu */}
            <Button
              variant="ghost"
              size="sm"
              data-ocid="header.user_menu"
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">U</span>
              </div>
              <ChevronDown size={12} className="hidden sm:block" />
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-background">
          <motion.div
            key={
              typeof window !== "undefined" ? window.location.pathname : "page"
            }
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="min-h-full"
          >
            {children}
          </motion.div>
          {/* Branding footer */}
          <footer className="px-6 py-4 bg-muted/20 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()}.{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-smooth"
              >
                Built with love using caffeine.ai
              </a>
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
