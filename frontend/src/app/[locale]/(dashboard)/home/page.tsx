import Link from 'next/link';

const MODULES = [
  {
    id: 'social',    icon: '👥', name: 'Social & Connect',    nameHi: 'सोशल और कनेक्ट',
    stat: '12 new posts', color: 'from-violet-500 to-purple-600', href: '/hi/social',
    desc: 'Feed, stories, groups & DMs',
  },
  {
    id: 'calling',   icon: '📞', name: 'Audio & Video Call',  nameHi: 'ऑडियो/वीडियो कॉल',
    stat: '3 missed calls', color: 'from-blue-500 to-cyan-500', href: '/hi/calling',
    desc: 'Free calls, works on 2G',
  },
  {
    id: 'news',      icon: '📰', name: 'News & Updates',       nameHi: 'समाचार',
    stat: '48 articles today', color: 'from-red-500 to-rose-500', href: '/hi/news',
    desc: 'Local to global, 22 languages',
  },
  {
    id: 'fintech',   icon: '💰', name: 'FinTech & Payments',   nameHi: 'पेमेंट और बैंकिंग',
    stat: '₹2,450 balance', color: 'from-emerald-500 to-green-600', href: '/hi/fintech',
    desc: 'UPI, loans, insurance & more',
  },
  {
    id: 'agri',      icon: '🌾', name: 'Agri-Tech',            nameHi: 'किसान और खेती',
    stat: 'Wheat ₹2,150/qtl', color: 'from-yellow-500 to-amber-500', href: '/hi/agri',
    desc: 'Mandi prices, weather, AI advisory',
  },
  {
    id: 'shop',      icon: '🛒', name: 'Hyperlocal Shop',      nameHi: 'लोकल शॉप',
    stat: '30-min delivery', color: 'from-orange-500 to-amber-500', href: '/hi/shop',
    desc: 'Kirana stores near you',
  },
  {
    id: 'edtech',    icon: '📚', name: 'EdTech 2.0',           nameHi: 'शिक्षा और स्किल',
    stat: '2 courses in progress', color: 'from-indigo-500 to-blue-600', href: '/hi/edtech',
    desc: 'Govt exams, skills, certifications',
  },
  {
    id: 'health',    icon: '🏥', name: 'HealthTech',           nameHi: 'स्वास्थ्य',
    stat: 'Appointment tomorrow', color: 'from-teal-500 to-emerald-500', href: '/hi/health',
    desc: 'Doctors, labs, medicines',
  },
  {
    id: 'creator',   icon: '🎬', name: 'Creator & Video',      nameHi: 'क्रिएटर',
    stat: '1.2K followers', color: 'from-pink-500 to-rose-500', href: '/hi/creator',
    desc: 'Short video, live, earn',
  },
  {
    id: 'jobs',      icon: '💼', name: 'Gig & Jobs',           nameHi: 'नौकरी और गिग',
    stat: '24 new jobs nearby', color: 'from-slate-500 to-gray-600', href: '/hi/jobs',
    desc: 'Blue-collar, gig & verified jobs',
  },
  {
    id: 'govtech',   icon: '🏛️', name: 'GovTech',              nameHi: 'सरकारी सेवाएं',
    stat: '2 pending schemes', color: 'from-blue-700 to-indigo-700', href: '/hi/govtech',
    desc: 'DigiLocker, schemes, RTI',
  },
  {
    id: 'ev-green',  icon: '🔌', name: 'EV & Green Tech',      nameHi: 'ईवी और सोलर',
    stat: '5 stations nearby', color: 'from-lime-500 to-green-500', href: '/hi/ev-green',
    desc: 'EV charging, loans, solar',
  },
  {
    id: 'ai',        icon: '🎤', name: 'AI Voice Assistant',   nameHi: 'AI वॉइस असिस्टेंट',
    stat: 'Always listening', color: 'from-bharat-saffron to-bharat-orange', href: '/hi/ai',
    desc: '22 languages, voice-first',
  },
];

const QUICK_STATS = [
  { label: 'Total Balance', value: '₹12,450', icon: '💳', color: 'text-green-600' },
  { label: 'Notifications', value: '7 new', icon: '🔔', color: 'text-orange-500' },
  { label: 'Active Orders', value: '2 orders', icon: '📦', color: 'text-blue-500' },
  { label: 'Health Score', value: '82/100', icon: '❤️', color: 'text-red-500' },
];

const RECENT_ACTIVITY = [
  { icon: '💸', text: 'UPI payment to Ramesh Store', time: '2 min ago', amount: '-₹450' },
  { icon: '📰', text: 'PM scheme announced for farmers', time: '15 min ago', amount: null },
  { icon: '📞', text: 'Video call with Dr. Priya Sharma', time: '1 hr ago', amount: null },
  { icon: '🌾', text: 'Wheat price updated: ₹2,150/qtl', time: '2 hr ago', amount: null },
  { icon: '📦', text: 'Order delivered: Amul Milk 2L', time: '3 hr ago', amount: '-₹52' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bharat-navy">
      {/* Hero greeting */}
      <div className="relative overflow-hidden bg-gradient-to-r from-bharat-navy via-slate-800 to-bharat-navy px-6 pb-8 pt-6">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-10 top-4 h-32 w-32 rounded-full bg-bharat-saffron blur-3xl" />
          <div className="absolute right-10 top-8 h-24 w-24 rounded-full bg-bharat-green blur-3xl" />
        </div>
        <div className="relative">
          <p className="text-sm font-medium text-bharat-saffron">नमस्ते, Rahul! 👋</p>
          <h2 className="mt-1 text-2xl font-bold text-white">Welcome to BharatApp</h2>
          <p className="mt-0.5 text-sm text-gray-400">भारत का अपना Super App — सब कुछ एक जगह</p>

          {/* Quick stats row */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {QUICK_STATS.map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white/10 px-3 py-3 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{stat.icon}</span>
                  <div>
                    <p className={`text-base font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-xs text-gray-400">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-6 sm:px-6">
        {/* AI Voice CTA */}
        <Link href="/hi/ai" className="mb-6 flex items-center gap-4 rounded-2xl border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 p-4 shadow-sm transition hover:shadow-md dark:border-orange-800 dark:from-orange-900/20 dark:to-amber-900/10">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-bharat-saffron to-bharat-orange text-2xl shadow-md">
            🎤
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-800 dark:text-white">Bolo Bharat! बोलो भारत!</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Tap to speak in any Indian language</p>
          </div>
          <div className="flex h-9 items-center rounded-full bg-bharat-saffron px-4 text-sm font-semibold text-white shadow-sm">
            Speak →
          </div>
        </Link>

        {/* Module grid */}
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">All Services</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {MODULES.map((mod) => (
            <Link
              key={mod.id}
              href={mod.href}
              className="group relative overflow-hidden rounded-2xl bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:bg-gray-800"
            >
              {/* Gradient accent strip */}
              <div className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${mod.color}`} />
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${mod.color} text-xl shadow-sm`}>
                {mod.icon}
              </div>
              <p className="text-sm font-semibold text-gray-800 dark:text-white">{mod.name}</p>
              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{mod.desc}</p>
              <p className="mt-2 text-xs font-medium text-bharat-saffron">{mod.stat}</p>
            </Link>
          ))}
        </div>

        {/* Recent activity */}
        <div className="mt-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Recent Activity</h3>
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-gray-800">
            {RECENT_ACTIVITY.map((item, i) => (
              <div
                key={i}
                className={cn(
                  'flex items-center gap-3 px-4 py-3',
                  i < RECENT_ACTIVITY.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''
                )}
              >
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-base dark:bg-gray-700">
                  {item.icon}
                </span>
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
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
