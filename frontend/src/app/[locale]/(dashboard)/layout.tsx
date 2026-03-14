'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { id: 'home',       label: 'Home',          labelHi: 'होम',         icon: '🏠', href: '/hi/home' },
  { id: 'social',     label: 'Social',         labelHi: 'सोशल',        icon: '👥', href: '/hi/social' },
  { id: 'messages',   label: 'Messages',       labelHi: 'संदेश',       icon: '💬', href: '/hi/messages' },
  { id: 'calling',    label: 'Calling',        labelHi: 'कॉल',         icon: '📞', href: '/hi/calling' },
  { id: 'news',       label: 'News',           labelHi: 'समाचार',      icon: '📰', href: '/hi/news' },
  { id: 'fintech',    label: 'FinTech',        labelHi: 'पेमेंट',      icon: '💰', href: '/hi/fintech' },
  { id: 'agri',       label: 'Agri-Tech',      labelHi: 'खेती',        icon: '🌾', href: '/hi/agri' },
  { id: 'shop',       label: 'Shop',           labelHi: 'दुकान',       icon: '🛒', href: '/hi/shop' },
  { id: 'edtech',     label: 'EdTech',         labelHi: 'शिक्षा',      icon: '📚', href: '/hi/edtech' },
  { id: 'health',     label: 'Health',         labelHi: 'स्वास्थ्य',   icon: '🏥', href: '/hi/health' },
  { id: 'creator',    label: 'Creator',        labelHi: 'क्रिएटर',     icon: '🎬', href: '/hi/creator' },
  { id: 'jobs',       label: 'Jobs',           labelHi: 'नौकरी',       icon: '💼', href: '/hi/jobs' },
  { id: 'govtech',    label: 'GovTech',        labelHi: 'सरकारी',      icon: '🏛️', href: '/hi/govtech' },
  { id: 'ev-green',   label: 'EV & Green',     labelHi: 'ईवी',         icon: '🔌', href: '/hi/ev-green' },
  { id: 'ai',         label: 'AI Assistant',   labelHi: 'AI सहायक',    icon: '🎤', href: '/hi/ai' },
];

const BOTTOM_NAV = [
  { id: 'notifications', label: 'Alerts', icon: '🔔', href: '/hi/notifications' },
  { id: 'settings',      label: 'Settings', icon: '⚙️', href: '/hi/settings' },
  { id: 'profile',       label: 'Profile', icon: '👤', href: '/hi/profile' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => pathname?.includes(href.split('/').pop() ?? '') ?? false;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-bharat-navy font-sans">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-30 flex h-full flex-col border-r border-gray-200 bg-white shadow-xl transition-all duration-300 dark:border-gray-700 dark:bg-gray-900',
          collapsed ? 'w-16' : 'w-64',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className={cn('flex items-center border-b border-gray-200 dark:border-gray-700', collapsed ? 'justify-center p-3' : 'gap-3 p-4')}>
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-bharat-saffron to-bharat-orange text-lg font-bold text-white shadow-md">
            भ
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-base font-bold text-bharat-navy dark:text-white">BharatApp</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Super App</p>
            </div>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-3 scrollbar-thin">
          <div className="space-y-0.5 px-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150',
                  collapsed ? 'justify-center px-2' : '',
                  isActive(item.href)
                    ? 'bg-gradient-to-r from-orange-50 to-orange-100 text-bharat-saffron shadow-sm dark:from-orange-900/20 dark:to-orange-800/10 dark:text-bharat-saffron'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
                )}
                title={collapsed ? item.label : undefined}
              >
                <span className="text-base leading-none">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
                {!collapsed && isActive(item.href) && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-bharat-saffron" />
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* Bottom nav */}
        <div className="border-t border-gray-200 px-2 py-3 dark:border-gray-700">
          <div className="space-y-0.5">
            {BOTTOM_NAV.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white',
                  collapsed ? 'justify-center px-2' : ''
                )}
              >
                <span className="text-base">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </div>
          {/* Collapse toggle (desktop only) */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="mt-2 hidden w-full items-center justify-center rounded-lg py-2 text-xs text-gray-400 transition hover:bg-gray-100 dark:hover:bg-gray-800 lg:flex"
          >
            {collapsed ? '→' : '← Collapse'}
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className={cn('flex flex-1 flex-col transition-all duration-300', collapsed ? 'lg:ml-16' : 'lg:ml-64')}>
        {/* Top header */}
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-gray-200 bg-white/95 px-4 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/95">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
          >
            <span className="text-lg">☰</span>
          </button>

          {/* Search bar */}
          <div className="mx-4 hidden max-w-md flex-1 lg:flex">
            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search anything... या बोलें 🎤"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-bharat-saffron focus:ring-1 focus:ring-bharat-saffron dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-500"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
              <span className="text-lg">🔔</span>
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-bharat-saffron" />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-bharat-saffron to-bharat-orange text-sm font-bold text-white shadow-sm">
              R
            </button>
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
