'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Toaster } from 'sonner';
import {
  Home, Users, MessageCircle, Phone, Newspaper, Wallet, Sprout,
  ShoppingCart, BookOpen, Heart, Video, Briefcase, Landmark,
  Zap, Mic, Bell, Settings, User, Search, Menu, X, ChevronLeft,
  ChevronRight, Dot,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { id: 'home',     label: 'Home',          icon: Home,          href: '/hi/home' },
  { id: 'social',   label: 'Social',         icon: Users,         href: '/hi/social' },
  { id: 'messages', label: 'Messages',       icon: MessageCircle, href: '/hi/messages' },
  { id: 'calling',  label: 'Calling',        icon: Phone,         href: '/hi/calling' },
  { id: 'news',     label: 'News',           icon: Newspaper,     href: '/hi/news' },
  { id: 'fintech',  label: 'FinTech',        icon: Wallet,        href: '/hi/fintech' },
  { id: 'agri',     label: 'Agri-Tech',      icon: Sprout,        href: '/hi/agri' },
  { id: 'shop',     label: 'Shop',           icon: ShoppingCart,  href: '/hi/shop' },
  { id: 'edtech',   label: 'EdTech',         icon: BookOpen,      href: '/hi/edtech' },
  { id: 'health',   label: 'Health',         icon: Heart,         href: '/hi/health' },
  { id: 'creator',  label: 'Creator',        icon: Video,         href: '/hi/creator' },
  { id: 'jobs',     label: 'Jobs',           icon: Briefcase,     href: '/hi/jobs' },
  { id: 'govtech',  label: 'GovTech',        icon: Landmark,      href: '/hi/govtech' },
  { id: 'ev-green', label: 'EV & Green',     icon: Zap,           href: '/hi/ev-green' },
  { id: 'ai',       label: 'AI Assistant',   icon: Mic,           href: '/hi/ai' },
];

const BOTTOM_NAV = [
  { id: 'notifications', label: 'Alerts',   icon: Bell,     href: '/hi/notifications' },
  { id: 'settings',      label: 'Settings', icon: Settings, href: '/hi/settings' },
  { id: 'profile',       label: 'Profile',  icon: User,     href: '/hi/profile' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => {
    const segment = href.split('/').pop() ?? '';
    return pathname?.includes(segment) ?? false;
  };

  return (
    <div className="flex min-h-screen">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-30 flex h-full flex-col border-r border-orange-100/60 bg-white/90 shadow-xl backdrop-blur-md transition-all duration-300 dark:border-gray-700/60 dark:bg-gray-900/90',
          collapsed ? 'w-[68px]' : 'w-64',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className={cn(
          'flex items-center border-b border-orange-100/60 dark:border-gray-700/60',
          collapsed ? 'justify-center px-3 py-4' : 'gap-3 px-4 py-4'
        )}>
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-bharat-saffron to-bharat-orange text-base font-black text-white shadow-md">
            भ
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-[15px] font-bold text-bharat-navy dark:text-white">BharatApp</h1>
              <p className="text-[10px] font-medium text-bharat-saffron">Super App</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3">
          <div className="space-y-0.5 px-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150',
                    collapsed && 'justify-center px-2',
                    active
                      ? 'bg-gradient-to-r from-orange-50 to-amber-50 text-bharat-saffron shadow-sm ring-1 ring-orange-200/60 dark:from-orange-900/20 dark:to-amber-900/10 dark:ring-orange-800/40'
                      : 'text-gray-500 hover:bg-orange-50/60 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white'
                  )}
                >
                  <Icon
                    size={18}
                    strokeWidth={active ? 2.5 : 1.8}
                    className={active ? 'text-bharat-saffron' : ''}
                  />
                  {!collapsed && <span>{item.label}</span>}
                  {!collapsed && active && <Dot size={18} className="ml-auto text-bharat-saffron" />}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom items */}
        <div className="border-t border-orange-100/60 px-2 py-3 dark:border-gray-700/60">
          {BOTTOM_NAV.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                title={collapsed ? item.label : undefined}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-500 transition-all hover:bg-orange-50/60 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white',
                  collapsed && 'justify-center px-2'
                )}
              >
                <Icon size={18} strokeWidth={1.8} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}

          {/* Collapse toggle (desktop) */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              'mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-gray-400 transition hover:bg-orange-50/60 hover:text-gray-600 dark:hover:bg-white/5 dark:hover:text-gray-300',
              collapsed ? 'justify-center px-2' : '',
              'hidden lg:flex'
            )}
          >
            {collapsed
              ? <ChevronRight size={16} />
              : <><ChevronLeft size={16} /><span>Collapse</span></>
            }
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className={cn(
        'flex flex-1 flex-col transition-all duration-300',
        collapsed ? 'lg:ml-[68px]' : 'lg:ml-64'
      )}>
        {/* Top header */}
        <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b border-orange-100/60 bg-white/80 px-4 backdrop-blur-md dark:border-gray-700/60 dark:bg-gray-900/80">
          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 hover:bg-orange-50 hover:text-gray-800 lg:hidden"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Search */}
          <div className="relative hidden flex-1 max-w-md lg:flex">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search anything... या बोलें"
              className="w-full rounded-xl border border-orange-100 bg-orange-50/50 py-2 pl-9 pr-4 text-sm text-gray-700 placeholder-gray-400 outline-none transition focus:border-bharat-saffron focus:ring-1 focus:ring-bharat-saffron/30 dark:border-gray-700 dark:bg-white/5 dark:text-gray-200"
            />
          </div>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-2">
            <button className="relative flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 hover:bg-orange-50 hover:text-gray-800 dark:hover:bg-white/5">
              <Bell size={18} strokeWidth={1.8} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-bharat-saffron ring-2 ring-white" />
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-bharat-saffron to-bharat-orange text-sm font-bold text-white shadow-sm">
              R
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      <Toaster position="top-center" richColors />
    </div>
  );
}
