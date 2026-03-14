'use client';
import React, { useState } from 'react';

const CATEGORIES = ['Top Stories', 'National', 'Local', 'Agriculture', 'Business', 'Sports', 'Entertainment', 'World', 'Technology'];

const NEWS = [
  {
    id: 1, category: 'National', tag: 'Top Stories',
    title: 'PM Modi announces ₹50,000 crore PM Kisan package for 12 crore farmers',
    titleHi: 'PM मोदी ने 12 करोड़ किसानों के लिए ₹50,000 करोड़ का पैकेज घोषित किया',
    summary: 'The Prime Minister announced an enhanced support package for farmers, including enhanced MSP for 23 crops and direct benefit transfer to 12 crore registered farmers under PM-KISAN.',
    source: 'Dainik Bhaskar',
    time: '15 min ago',
    readTime: '3 min read',
    image: '🌾',
    imageColor: 'from-green-100 to-emerald-100',
    likes: 4521,
    verified: true,
    breaking: true,
  },
  {
    id: 2, category: 'Business', tag: 'Business',
    title: 'UPI transactions cross ₹20 lakh crore in February 2026 — new all-time high',
    titleHi: 'UPI लेनदेन फरवरी 2026 में ₹20 लाख करोड़ पार — नई ऊंचाई',
    summary: 'India\'s Unified Payments Interface recorded 20.64 billion transactions worth ₹20.07 lakh crore in February, marking the highest ever monthly volume since its launch.',
    source: 'Economic Times',
    time: '1 hr ago',
    readTime: '4 min read',
    image: '💳',
    imageColor: 'from-blue-100 to-cyan-100',
    likes: 2345,
    verified: true,
    breaking: false,
  },
  {
    id: 3, category: 'Agriculture', tag: 'Agriculture',
    title: 'IMD predicts above-normal monsoon for 2026 — good news for Kharif season',
    titleHi: 'IMD ने 2026 के लिए सामान्य से अधिक मानसून की भविष्यवाणी की',
    summary: 'The India Meteorological Department has forecast above-normal rainfall (106% of long-period average) for the upcoming monsoon season, bringing cheer to millions of farmers.',
    source: 'The Hindu',
    time: '2 hr ago',
    readTime: '2 min read',
    image: '🌧️',
    imageColor: 'from-sky-100 to-blue-100',
    likes: 5678,
    verified: true,
    breaking: false,
  },
  {
    id: 4, category: 'Technology', tag: 'Technology',
    title: 'BharatNet Phase 3 to bring fibre connectivity to 6 lakh villages by 2027',
    titleHi: 'BharatNet Phase 3: 2027 तक 6 लाख गांवों में फाइबर कनेक्टिविटी',
    summary: 'The Union Cabinet approved Phase 3 of BharatNet, targeting gigabit-speed fibre broadband in all 6 lakh gram panchayats across India.',
    source: 'NDTV',
    time: '3 hr ago',
    readTime: '3 min read',
    image: '🌐',
    imageColor: 'from-purple-100 to-violet-100',
    likes: 1823,
    verified: true,
    breaking: false,
  },
  {
    id: 5, category: 'Sports', tag: 'Sports',
    title: 'India beats Australia 3-2 in ODI series — Shubman Gill scores century',
    titleHi: 'भारत ने ऑस्ट्रेलिया को 3-2 से हराया — शुभमन गिल ने शतक लगाया',
    summary: 'India clinched the ODI series against Australia with a thrilling 47-run win in the final match. Shubman Gill\'s 112* anchored India to 334/6.',
    source: 'Cricbuzz',
    time: '4 hr ago',
    readTime: '2 min read',
    image: '🏏',
    imageColor: 'from-orange-100 to-amber-100',
    likes: 12450,
    verified: false,
    breaking: false,
  },
  {
    id: 6, category: 'Local', tag: 'Local',
    title: 'Jaipur Metro Phase 2 work accelerates; East-West corridor set for 2027 launch',
    titleHi: 'जयपुर मेट्रो फेज 2 का काम तेज; ईस्ट-वेस्ट कॉरिडोर 2027 में लॉन्च होगा',
    summary: 'Jaipur Metro Rail Corporation reports 68% completion of the East-West corridor. The 23 km stretch will connect Ambabari to Sitapura.',
    source: 'Rajasthan Patrika',
    time: '5 hr ago',
    readTime: '2 min read',
    image: '🚇',
    imageColor: 'from-pink-100 to-rose-100',
    likes: 892,
    verified: false,
    breaking: false,
  },
];

const TRENDING = [
  { tag: '#PMKisan', count: '8.2K posts' },
  { tag: '#UPI20LakhCrore', count: '5.4K posts' },
  { tag: '#Monsoon2026', count: '4.1K posts' },
  { tag: '#INDvsAUS', count: '15.2K posts' },
  { tag: '#BharatNet', count: '2.3K posts' },
];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('Top Stories');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [savedIds, setSavedIds] = useState<number[]>([]);

  const toggleSave = (id: number) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filtered = activeCategory === 'Top Stories' ? NEWS : NEWS.filter(n => n.tag === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bharat-navy">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">📰 News & Updates</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 transition"
            >
              {language === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
            </button>
            <button className="h-9 w-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-lg">🔍</button>
          </div>
        </div>
        {/* Category tabs */}
        <div className="flex gap-1 mt-3 overflow-x-auto scrollbar-none pb-0.5">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition ${activeCategory === cat ? 'bg-bharat-saffron text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main news feed */}
          <div className="lg:col-span-2 space-y-4">
            {/* Breaking news banner */}
            {filtered.some(n => n.breaking) && (
              <div className="bg-red-500 rounded-xl px-4 py-2.5 flex items-center gap-3">
                <span className="text-white text-xs font-bold bg-white/20 px-2 py-0.5 rounded animate-pulse">BREAKING</span>
                <p className="text-white text-sm font-medium truncate">
                  {language === 'hi' ? filtered.find(n => n.breaking)?.titleHi : filtered.find(n => n.breaking)?.title}
                </p>
              </div>
            )}

            {/* Audio news banner */}
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/10 rounded-xl px-4 py-3 flex items-center gap-3 border border-violet-200 dark:border-violet-800">
              <div className="h-10 w-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-xl">🎧</div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-violet-800 dark:text-violet-300">Audio News Bulletin</p>
                <p className="text-xs text-violet-600 dark:text-violet-400">Listen to today's top news in Hindi — 5 min</p>
              </div>
              <button className="px-3 py-1.5 bg-violet-600 text-white rounded-lg text-xs font-semibold">▶ Play</button>
            </div>

            {filtered.map(item => (
              <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition group">
                <div className="flex gap-3 p-4">
                  <div className={`h-20 w-20 flex-shrink-0 rounded-xl bg-gradient-to-br ${item.imageColor} flex items-center justify-center text-4xl`}>
                    {item.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-semibold text-bharat-saffron bg-orange-50 dark:bg-orange-900/20 px-2 py-0.5 rounded-full">{item.tag}</span>
                      {item.verified && <span className="text-xs text-green-600 font-medium">✓ Verified</span>}
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-bharat-saffron transition">
                      {language === 'hi' ? item.titleHi : item.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-gray-500 line-clamp-2">{item.summary}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                      <span className="font-medium">{item.source}</span>
                      <span>·</span>
                      <span>{item.time}</span>
                      <span>·</span>
                      <span>{item.readTime}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center border-t border-gray-100 dark:border-gray-700 px-4 py-2 gap-1">
                  <button className="flex items-center gap-1 text-xs text-gray-500 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                    ❤️ {item.likes.toLocaleString('en-IN')}
                  </button>
                  <button className="flex items-center gap-1 text-xs text-gray-500 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                    💬 Comment
                  </button>
                  <button className="flex items-center gap-1 text-xs text-gray-500 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                    🔁 Share
                  </button>
                  <button
                    onClick={() => toggleSave(item.id)}
                    className={`ml-auto flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition ${savedIds.includes(item.id) ? 'text-bharat-saffron' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  >
                    {savedIds.includes(item.id) ? '🔖 Saved' : '🔖 Save'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Weather widget */}
            <div className="bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium opacity-80">📍 Jaipur, Rajasthan</p>
                  <p className="text-4xl font-bold mt-1">28°C</p>
                  <p className="text-sm opacity-90">Partly Cloudy ⛅</p>
                </div>
                <div className="text-6xl">⛅</div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4 text-center text-xs">
                <div className="bg-white/20 rounded-lg p-2">
                  <p className="opacity-70">Mon</p>
                  <p className="text-lg">☀️</p>
                  <p className="font-semibold">32°</p>
                </div>
                <div className="bg-white/20 rounded-lg p-2">
                  <p className="opacity-70">Tue</p>
                  <p className="text-lg">⛅</p>
                  <p className="font-semibold">29°</p>
                </div>
                <div className="bg-white/20 rounded-lg p-2">
                  <p className="opacity-70">Wed</p>
                  <p className="text-lg">🌧️</p>
                  <p className="font-semibold">24°</p>
                </div>
              </div>
            </div>

            {/* Trending */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">🔥 Trending in India</h3>
              <div className="space-y-2.5">
                {TRENDING.map((t, i) => (
                  <div key={t.tag} className="flex items-center gap-3 cursor-pointer hover:text-bharat-saffron group">
                    <span className="text-sm font-bold text-gray-400 w-5">{i + 1}</span>
                    <div>
                      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:text-bharat-saffron">{t.tag}</p>
                      <p className="text-xs text-gray-400">{t.count}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Language select */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">🗣️ Read in your language</h3>
              <div className="grid grid-cols-3 gap-2">
                {['हिंदी', 'বাংলা', 'தமிழ்', 'తెలుగు', 'मराठी', 'ਪੰਜਾਬੀ'].map((lang) => (
                  <button key={lang} className="py-1.5 text-xs font-medium rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-bharat-saffron hover:text-bharat-saffron transition">
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
