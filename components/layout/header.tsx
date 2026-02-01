"use client";

import Image from "next/image";
import { useTheme } from "@/components/theme-provider";

import { ArrowRight01Icon,Message01Icon,Notification01Icon,Sun03Icon,Moon02Icon,More01Icon } from "hugeicons-react";


interface HeaderProps {
  title: string;
  breadcrumbs: { label: string; href?: string }[];
}

export default function Header({ title, breadcrumbs }: HeaderProps) {
  const currentDate = "June 01, 2025";
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="w-full h-auto sm:h-[96px] rounded-[12px] shadow-[0_1px_3px_0_#0000001A]">
      {/* Top Header Container */}
      <div 
        className="w-full max-w-full h-auto sm:h-[48px] flex justify-between px-3 sm:px-[12px] py-2 sm:py-[10px] border border-border rounded-t-[12px] bg-card"
        style={{ borderRadius: '12px 12px 0px 0px' }}
      >
        {/* Title Container */}
        <div className="w-[214px] h-[24px] flex gap-[6px] pl-[4px] opacity-100">
          <h1 className="font-sans font-semibold text-base leading-6 tracking-normal align-middle text-foreground">
           Task & Ticket Management
          </h1>
        </div>

        {/* Header Actions */}
        <div className="flex items-center w-[185px] h-[28px] gap-[8px] rotate-0 opacity-100" style={{ height: '28px' }}>
          {/* Chat Button */}
          <button
            type="button"
            className="flex items-center justify-center w-[28px] h-[28px] gap-[6px] rounded-lg border bg-card rotate-0 opacity-100 hover:bg-muted transition-colors"
            aria-label="Messages"
          >
            <Message01Icon size={14} className="text-muted-foreground" />
          </button>

          {/* Notification Button */}
          <button
            type="button"
            className="flex items-center justify-center w-[28px] h-[28px] gap-[6px] rounded-lg border bg-card rotate-0 opacity-100 hover:bg-muted transition-colors"
            aria-label="Notifications"
          >
            <Notification01Icon size={14} className="text-muted-foreground" />
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-pressed={isDark}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="relative w-[40px] h-[28px] gap-[10px] px-0 py-[6px] rounded-2xl border"
            style={{ width: '40px', height: '20px', background: isDark ? '#242529' : '#EEEFF1', borderRadius: '9999px' }}
          >
            <span
              className="absolute flex items-center justify-center bg-white dark:bg-[#3d3f42] shadow-sm rounded-full transition-[left] duration-150 ease-out"
              style={{
                width: '16px',
                height: '16px',
                left: isDark ? '22px' : '2px',
                top: '2px',
              }}
            >
              {isDark ? <Moon02Icon size={16} className="text-[#737373]" /> : <Sun03Icon size={16} className="text-[#737373]" />}
            </span>
          </button>

          {/* Vertical Divider - Hidden on small screens */}
          <div 
            className="hidden sm:block w-px h-[14px] rounded-full bg-border"
          />

          {/* Apps Grid */}
          <button
            type="button" 
            className="w-[28px] h-[28px] sm:w-7 sm:h-7 flex items-center justify-center hover:bg-muted rounded-lg transition-colors"
            aria-label="Apps"
          >
            <More01Icon size={17.5} className="text-[#242529]" />
          </button>

          {/* Profile Avatar */}
          <div 
            className="relative w-[20px] h-[20px] rounded-[20px] overflow-hidden flex items-center justify-center cursor-pointer flex-shrink-0 border border-border"
            
          >
            <Image
              src="/userimage.jpg"
              alt="User profile"
              fill
              sizes="20px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Bottom Header Container - Breadcrumb */}
      <div 
        className="w-full h-[48px] flex justify-between p-[10px_12px] opacity-100 rounded-b-[12px] border border-border bg-card"
        
      >
        {/* Breadcrumb Container */}
        <nav className="flex w-[219px] h-[20px] gap-[10px] opacity-100 flex items-center gap-1 sm:gap-1.5 min-w-0 flex-1">
        {(breadcrumbs ?? []).map((item, index) => (
    <div key={index} className="flex items-center gap-1 sm:gap-1.5 min-w-0">
      <span
        className={`font-inter font-medium text-xs sm:text-[14px] leading-4 sm:leading-5 truncate ${
          index === (breadcrumbs?.length ?? 0) - 1
            ? "text-foreground"
            : "text-muted-foreground"
        }`}
      >
        {item.label}
      </span>
      {index < (breadcrumbs?.length ?? 0) - 1 && (
        <span className="flex-shrink-0">
          <ArrowRight01Icon size={14} className="text-[rgba(0,0,0,0.55)]" />
        </span>
      )}
    </div>
  ))}
        </nav>

        
      </div>
    </header>
  );
}
