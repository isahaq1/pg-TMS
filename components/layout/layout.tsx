"use client";

import { ReactNode, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  breadcrumbs: { label: string; href?: string }[];
  activeNavItem?: string;
  onNavClick?: (id: string) => void;
}

// Menu icon for mobile - uses currentColor for theme-aware stroke
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground">
    <path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Close icon
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground">
    <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default function DashboardLayout({
  children,
  title,
  breadcrumbs,
  activeNavItem = "dashboard",
  onNavClick,
}: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex w-full min-h-screen relative bg-background" >
      {/* Mobile Menu Button - Only visible on mobile/tablet */}
      <button
        type="button"
        className="lg:hidden fixed top-2 left-2 z-50 w-10 h-10 flex items-center justify-center bg-card border border-border rounded-lg shadow-md hover:bg-muted transition-colors"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Container - Responsive with collapse support */}
      <div 
        className={`
          fixed lg:relative inset-y-0 left-0 z-40
          transform transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:flex flex-shrink-0
        `}
        style={{ 
          width: isSidebarCollapsed ? '76px' : '286px',
          padding: '8px 0px 8px 8px',
          height: '100vh'
        }}
      >
        {/* Sidebar Content */}
        <Sidebar 
          activeItem={activeNavItem} 
          onNavClick={(id) => {
            onNavClick?.(id);
            setIsMobileMenuOpen(false);
          }}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      {/* Main Content - Responsive */}
      <div 
        className="flex flex-col flex-1 overflow-hidden w-full transition-all duration-300"
        style={{ padding: '8px', gap: '8px' }}
      >
        {/* Spacer for mobile menu button */}
        <div className="lg:hidden h-10" />
        
        {/* Header */}
        <Header title={title} breadcrumbs={breadcrumbs} />
        
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden rounded-[12px] border border-border bg-card shadow-[0_1px_3px_0_#0000001A]">
          {children}
        </main>
        {/* <Footer/> */}
      </div>
      
    </div>
  );
}
