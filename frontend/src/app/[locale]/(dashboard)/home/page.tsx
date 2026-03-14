import Link from 'next/link';
import Image from 'next/image';
import {
  Users, Phone, Newspaper, Wallet, Sprout, ShoppingCart, BookOpen,
  Heart, Video, Briefcase, Landmark, Zap, Mic, CreditCard, Bell,
  Package, Activity, ArrowRight, TrendingUp, Send, Play,
} from 'lucide-react';

const MODULES = [
  { id: 'social',   label: 'Social',       sub: 'Feed, stories & DMs',     stat: '12 new posts',      Icon: Users,       color: 'from-violet-500 to-purple-600', href: '/hi/social' },
  { id: 'calling',  label: 'Calling',      sub: 'Free calls, works on 2G', stat: '3 missed calls',    Icon: Phone,       color: 'from-blue-500 to-cyan-500',    href: '/hi/calling' },
  { id: 'news',     label: 'News',         sub: 'Local to global',          stat: '48 articles',       Icon: Newspaper,   color: 'from-red-500 to-rose-500',     href: '/hi/news' },
  { id: 'fintech',  label: 'FinTech',      sub: 'UPI, loans & insurance',   stat: '₹12,450 balance',   Icon: Wallet,      color: 'from-emerald-500 to-teal-500', href: '/hi/fintech' },
  { id: 'agri',     label: 'Agri-Tech',    sub: 'Mandi prices & advisory',  stat: 'Wheat ₹2,180/qtl',  Icon: Sprout,      color: 'from-yellow-500 to-amber-500', href: '/hi/agri' },
  { id: 'shop',     label: 'Shop',         sub: 'Kirana stores near you',   stat: '30-min delivery',   Icon: ShoppingCart,color: 'from-orange-500 to-amber-500', href: '/hi/shop' },
  { id: 'edtech',   label: 'EdTech',       sub: 'Govt exams & skills',      stat: '2 courses active',  Icon: BookOpen,    color: 'from-indigo-500 to-blue-600',  href: '/hi/edtech' },
  { id: 'health',   label: 'Health',       sub: 'Doctors, labs & meds',     stat: 'Appt. tomorrow',    Icon: Heart,       color: 'from-teal-500 to-emerald-500', href: '/hi/health' },
  { id: 'creator',  label: 'Creator',      sub: 'Short video & earn',       stat: '1.2K followers',    Icon: Video,       color: 'from-pink-500 to-rose-500',    href: '/hi/creator' },
  { id: 'jobs',     label: 'Jobs',         sub: 'Gig & verified jobs',      stat: '24 jobs nearby',    Icon: Briefcase,   color: 'from-slate-500 to-gray-600',   href: '/hi/jobs' },
  { id: 'govtech',  label: 'GovTech',      sub: 'DigiLocker & schemes',     stat: '2 pending',         Icon: Landmark,    color: 'from-blue-700 to-indigo-700',  href: '/hi/govtech' },
  { id: 'ev-green', label: 'EV & Green',   sub: 'Charging & solar',         stat: '5 stations nearby', Icon: Zap,         color: 'from-lime-500 to-green-500',   href: '/hi/ev-green' },
  { id: 'ai',       label: 'AI Assistant', sub: '22 languages, voice-first', stat: 'Always on',        Icon: Mic,         color: 'from-bharat-saffron to-bharat-orange', href: '/hi/ai' },
];

const QUICK_STATS = [
  { label: 'Balance',       value: '₹12,450', Icon: CreditCard, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Notifications', value: '7 new',   Icon: Bell,       color: 'text-bharat-saffron', bg: 'bg-orange-50' },
  { label: 'Active Orders', value: '2',        Icon: Package,    color: 'text-blue-600',    bg: 'bg-blue-50' },
  { label: 'Health Score',  value: '82/100',   Icon: Activity,   color: 'text-rose-500',    bg: 'bg-rose-50' },
];

const ACTIVITY = [
  { Icon: Send,       text: 'UPI payment to Ramesh Store',   time: '2 min ago',  amount: '-₹450' },
  { Icon: Newspaper,  text: 'PM scheme announced for farmers', time: '15 min ago', amount: null },
  { Icon: Phone,      text: 'Video call with Dr. Priya Sharma', time: '1 hr ago', amount: null },
  { Icon: Sprout,     text: 'Wheat price updated ₹2,180/qtl', time: '2 hr ago',  amount: null },
  { Icon: Package,    text: 'Order delivered: Amul Milk 2L',  time: '3 hr ago',  amount: '-₹52' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero banner */}
      <div className="relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1400&q=80"
          alt="India cityscape"
          width={1400}
          height={320}
          className="h-56 w-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bharat-navy/90 via-bharat-navy/70 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-6">
          <p className="text-sm font-semibold text-bharat-saffron">नमस्ते, Rahul 👋</p>
          <h2 className="mt-0.5 text-2xl font-bold text-white">Welcome to BharatApp</h2>
          <p className="mt-0.5 text-sm text-gray-300">भारत का अपना Super App — सब कुछ एक जगह</p>
          {/* Quick stats */}
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {QUICK_STATS.map((s) => (
              <div key={s.label} className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2.5 backdrop-blur-sm ring-1 ring-white/10">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${s.bg}`}>
                  <s.Icon size={16} className={s.color} />
                </div>
                <div>
                  <p className={`text-sm font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-[10px] text-gray-300">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-5 sm:px-6">
        {/* AI Voice CTA */}
        <Link
          href="/hi/ai"
          className="mb-5 flex items-center gap-4 rounded-2xl border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-orange-800 dark:from-orange-900/20 dark:to-amber-900/10"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-bharat-saffron to-bharat-orange shadow-lg">
            <Mic size={22} className="text-white" strokeWidth={2} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-800 dark:text-white">Bolo Bharat! बोलो भारत!</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Tap to speak in any Indian language</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-bharat-saffron px-4 py-2 text-sm font-semibold text-white shadow-sm">
            Speak <ArrowRight size={14} />
          </div>
        </Link>

        {/* Modules grid */}
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">All Services</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {MODULES.map((mod) => (
            <Link
              key={mod.id}
              href={mod.href}
              className="group relative overflow-hidden rounded-2xl bg-white/80 p-4 shadow-sm backdrop-blur-sm ring-1 ring-orange-100/40 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-orange-200 dark:bg-white/5 dark:ring-white/10"
            >
              <div className={`absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r ${mod.color}`} />
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${mod.color} shadow-sm`}>
                <mod.Icon size={18} className="text-white" strokeWidth={2} />
              </div>
              <p className="text-sm font-semibold text-gray-800 dark:text-white">{mod.label}</p>
              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{mod.sub}</p>
              <div className="mt-2 flex items-center gap-1">
                <TrendingUp size={10} className="text-bharat-saffron" />
                <p className="text-[11px] font-medium text-bharat-saffron">{mod.stat}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent activity */}
        <div className="mt-6">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Recent Activity</p>
          <div className="overflow-hidden rounded-2xl bg-white/80 shadow-sm ring-1 ring-orange-100/40 backdrop-blur-sm dark:bg-white/5 dark:ring-white/10">
            {ACTIVITY.map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 px-4 py-3 ${i < ACTIVITY.length - 1 ? 'border-b border-orange-50 dark:border-white/5' : ''}`}
              >
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50 dark:bg-white/5">
                  <item.Icon size={16} className="text-bharat-saffron" strokeWidth={1.8} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-gray-700 dark:text-gray-200">{item.text}</p>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
                {item.amount && (
                  <span className="text-sm font-semibold text-red-500">{item.amount}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Promo video banner */}
        <div className="mt-6 overflow-hidden rounded-2xl bg-gradient-to-r from-bharat-navy to-slate-800 shadow-lg">
          <div className="relative h-36">
            <Image
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
              alt="India countryside"
              fill
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 flex items-center justify-between px-6">
              <div>
                <p className="text-xs font-semibold text-bharat-saffron uppercase tracking-wider">BharatApp Story</p>
                <p className="mt-1 text-lg font-bold text-white">One app for<br />every Indian</p>
              </div>
              <button className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 ring-2 ring-white/40 backdrop-blur-sm transition hover:bg-white/30">
                <Play size={22} className="ml-1 text-white" fill="white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
