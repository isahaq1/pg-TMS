"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { SidebarLeftIcon,CommandIcon,ArrowDown01Icon,StickyNote02Icon,Calendar02Icon,Search01Icon,Analytics01Icon,LifebuoyIcon,TaskDaily02Icon,WorkIcon,CheckmarkSquare04Icon, DashboardSquare02Icon, Settings01Icon, Factory02Icon } from "hugeicons-react";

interface SidebarProps {
  activeItem?: string;
  onNavClick?: (id: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "DashboardSquare02Icon", href: "/dashboard" },
  { id: "sectors", label: "Sectors", icon: "Factory02Icon", href: "/sectors" },
  { id: "companies", label: "Companies", icon: "WorkIcon", href: "/companies" },

];

const Icons = {
  DashboardSquare02Icon: DashboardSquare02Icon,
  CheckmarkSquare04Icon: CheckmarkSquare04Icon,
  WorkIcon: WorkIcon,
  Factory02Icon: Factory02Icon,
  TaskDaily02Icon: TaskDaily02Icon,
  LifebuoyIcon: LifebuoyIcon,
  Analytics01Icon: Analytics01Icon,
  settings: Settings01Icon,
  quickAction: CommandIcon,

  ArrowDown01Icon: ArrowDown01Icon,
  Search01Icon: Search01Icon,
  submenuCalendar: Calendar02Icon,
  submenuFile: StickyNote02Icon,
};

export default function Sidebar({
  activeItem = "dashboard",
  onNavClick,
  isCollapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isJessoreOpen, setIsJessoreOpen] = useState(false);

  const getIcon = (iconName: string, isActive?: boolean) => {
    const IconComponent = Icons[iconName as keyof typeof Icons];
    return IconComponent ? (
      <IconComponent
        size={18}
        className={isActive ? "text-foreground" : "text-muted-foreground"}
      />
    ) : null;
  };

  return (
    <aside
      className={`flex flex-col h-screen bg-card border border-border 
      rounded-lg shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] transition-all duration-300 
      ${isCollapsed ? "w-[60px]" : "w-[282px]"} p-2`}
    >
      {/* Top Section */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Image src="/p-logo.jpeg" alt="Paragon" width={24} height={24} />
            <span className="font-semibold text-sm">Paragon Group</span>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className=" rounded hover:bg-gray-100 gap-2"
        >
          {isCollapsed ? <SidebarLeftIcon width={18} height={18} /> : <SidebarLeftIcon width={18} height={18} />}
        </button>
      </div>

      {/* Jessore */}
      {!isCollapsed && (
        <button
          onClick={() => setIsJessoreOpen(!isJessoreOpen)}
          className="flex items-center justify-between px-3 py-2 hover:bg-muted border-b border-border"
        >
          <div className="flex items-center gap-2">
            <Image src="/branchlogo.png" alt="Jessore" width={24} height={24} />
            <span className="font-semibold text-sm">Jessore Feed Ltd.</span>
          </div>
          <ArrowDown01Icon
            className={`transition-transform ${isJessoreOpen ? "rotate-180" : ""}`}
            size={16}
          />
        </button>
      )}
 {/* Quick Actions (Hidden when collapsed) */}
 {/* {!isCollapsed && (
          <div className="flex items-center justify-between px-3 py-2 border-b">
            <button 
              type="button"
              className="flex items-center justify-between flex-1 h-7 px-1.5 bg-white border border-[rgba(0,0,0,0.05)] rounded-lg hover:bg-[#F5F5F5] transition-colors"
            >
              <div className="flex items-center border border-[#0000000D]">
                <Icons.quickAction  size={10}/>
                <span className="font-inter font-medium text-[14px] leading-5 text-[#242529]">
                  Quick actions
                </span>
              </div>
              <div className="flex items-center justify-center px-1 h-5 bg-[rgba(255,255,255,0.002)] border border-[rgba(0,0,0,0.05)] rounded-md">
                <span className="font-inter font-normal text-[11px] leading-[11px] tracking-[0.22px] uppercase text-[rgba(0,0,0,0.4)]">
                  ⌘K
                </span>
              </div>
            </button>

            <button 
              type="button"
              className="flex items-center h-7 px-1.5 gap-1.5 bg-white border border-[rgba(0,0,0,0.05)] shadow-[0px_0px_2px_#FFFFFF,0px_1px_3px_rgba(255,255,255,0.08)] rounded-lg hover:bg-[#F5F5F5] transition-colors"
            >
              <Search01Icon size={14} />
              <div className="flex items-center justify-center w-5 h-5 bg-[rgba(255,255,255,0.002)] border border-[rgba(0,0,0,0.05)] shadow-[inset_0px_0px_0px_1px_rgba(255,255,255,0.05)] rounded-md">
                <span className="font-inter font-normal text-[11px] leading-[11px] tracking-[0.22px] uppercase text-[rgba(0,0,0,0.4)]">
                  /
                </span>
              </div>
            </button>
          </div>
        )} */}

        {/* Collapsed: Show search icon only */}
        {/* {isCollapsed && (
          <div className="flex items-center justify-center h-12 border-b border-[rgba(0,0,0,0.05)]">
            <button 
              type="button"
              className="w-8 h-8 flex items-center justify-center hover:bg-[#F5F5F5] rounded-lg transition-colors"
              title="Search"
            >
              <Icons.search />
            </button>
          </div>
        )} */}
   

      {/* Menu */}
      <nav className="flex-1 mt-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeItem === item.id;
          const hasSubmenu = item.id === "projects";

          return (
            <div key={item.id}>
              {item.href ? (
                <Link
                  href={item.href}
                  onClick={() => {
                    if (hasSubmenu && !isCollapsed) setIsProjectsOpen(!isProjectsOpen);
                    onNavClick?.(item.id);
                  }}
                  className={`flex items-center w-full px-3 py-2 rounded-md transition
                    ${isCollapsed ? "justify-center" : "gap-2"}
                    ${
                      isActive
                        ? "bg-muted text-foreground"
                        : "hover:bg-muted text-muted-foreground"
                    }`}
                >
                  {getIcon(item.icon, isActive)}
                  {!isCollapsed && <span className="text-sm">{item.label}</span>}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (hasSubmenu && !isCollapsed) setIsProjectsOpen(!isProjectsOpen);
                    onNavClick?.(item.id);
                  }}
                  className={`flex items-center w-full px-3 py-2 rounded-md transition
                    ${isCollapsed ? "justify-center" : "gap-2"}
                    ${
                      isActive
                        ? "bg-muted text-foreground"
                        : "hover:bg-muted text-muted-foreground"
                    }`}
                >
                  {getIcon(item.icon, isActive)}
                  {!isCollapsed && <span className="text-sm">{item.label}</span>}
                </button>
              )}

              {!isCollapsed && hasSubmenu && isProjectsOpen && (
                <div className="ml-6 mt-1 space-y-1 border-l pl-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600 hover:text-black cursor-pointer">
                    <Calendar02Icon size={14} /> Event Calendar
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 hover:text-black cursor-pointer">
                    <StickyNote02Icon size={14} /> Notes
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
