import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  GraduationCap,
  TrendingUp,
  Wallet,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import logoIcon from "@/assets/$.png";
import { useState } from "react";

const navItems = [
  { label: "Painel", icon: LayoutDashboard, href: "/dashboard", active: true },
  { label: "Cursos", icon: GraduationCap, href: "/cursos", active: false },
  { label: "Investimentos", icon: TrendingUp, href: "/investimentos", active: false },
  { label: "Renda", icon: Wallet, href: "/renda", active: false },
  { label: "Configurações", icon: Settings, href: "/configuracoes", active: false },
];

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className="h-screen sticky top-0 flex flex-col justify-between transition-all duration-300"
      style={{
        width: collapsed ? 72 : 240,
        background: "linear-gradient(180deg, #1a1a1a 0%, #2a2520 100%)",
      }}
    >
      {/* Top: Logo + Nav */}
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          <img src={logoIcon} alt="Eleutheriss" className="w-8 h-8 object-contain flex-shrink-0" />
          {!collapsed && (
            <span className="font-display text-lg font-bold text-gradient-gold whitespace-nowrap">
              Eleutheriss
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.active ? item.href : "#"}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#E8BE45]/15 text-[#E8BE45]"
                    : item.active
                    ? "text-[#d4c9b0] hover:bg-white/5 hover:text-[#E8BE45]"
                    : "text-[#6b6253] cursor-not-allowed"
                }`}
                title={!item.active ? "Em breve" : undefined}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="whitespace-nowrap">
                    {item.label}
                    {!item.active && (
                      <span className="ml-2 text-[10px] bg-[#E8BE45]/20 text-[#E8BE45] px-1.5 py-0.5 rounded-full">
                        Em breve
                      </span>
                    )}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom: collapse toggle + logout */}
      <div className="px-3 pb-4 flex flex-col gap-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-[#d4c9b0] hover:bg-white/5 transition-colors w-full"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          {!collapsed && <span>Recolher</span>}
        </button>
        <Link
          to="/login"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-[#c0392b] hover:bg-[#c0392b]/10 transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Sair</span>}
        </Link>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
