'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, MessageCircle, Share2, Bookmark, BadgeCheck, Volume2, Play, TrendingUp, MapPin, Globe, Search } from 'lucide-react';

const CATEGORIES = ['Top Stories', 'National', 'Local', 'Agriculture', 'Business', 'Sports', 'Tech', 'World'];

const NEWS = [
  {
    id: 1, tag: 'Top Stories', breaking: true,
    title: 'PM Modi announces ₹50,000 crore PM Kisan package for 12 crore farmers',
    titleHi: 'PM मोदी ने 12 करोड़ किसानों के लिए ₹50,000 करोड़ का पैकेज घोषित किया',
    summary: 'The Prime Minister announced enhanced support for farmers, including enhanced MSP for 23 crops and direct benefit transfer.',
    img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&q=80',
    source: 'Dainik Bhaskar', time: '15 min ago', readTime: '3 min', likes: 4521, verified: true,
  },
  {
    id: 2, tag: 'Business', breaking: false,
    title: 'UPI transactions cross ₹20 lakh crore in February 2026 — new all-time high',
    titleHi: 'UPI लेनदेन फरवरी 2026 में ₹20 लाख करोड़ पार — नई ऊंचाई',
    summary: 'India\'s UPI recorded 20.64 billion transactions worth ₹20.07 lakh crore in February, marking the highest monthly volume.',
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80',
    source: 'Economic Times', time: '1 hr ago', readTime: '4 min', likes: 2345, verified: true,
  },
  {
    id: 3, tag: 'Agriculture', breaking: false,
    title: 'IMD predicts above-normal monsoon for 2026 — good news for Kharif season',
    titleHi: 'IMD ने 2026 के लिए सामान्य से अधिक मानसून की भविष्यवाणी की',
    summary: 'India Meteorological Department forecasts 106% of long-period average rainfall, bringing cheer to farmers.',
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80',
    source: 'The Hindu', time: '2 hr ago', readTime: '2 min', likes: 5678, verified: true,
  },
  {
    id: 4, tag: 'Tech', breaking: false,
    title: 'BharatNet Phase 3 to bring fibre connectivity to 6 lakh villages by 2027',
    titleHi: 'BharatNet Phase 3: 2027 तक 6 लाख गांवों में फाइबर कनेक्टिविटी',
    summary: 'The Union Cabinet approved Phase 3 of BharatNet, targeting gigabit-speed fibre broadband in all gram panchayats.',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80',
    source: 'NDTV', time: '3 hr ago', readTime: '3 min', likes: 1823, verified: true,
  },
  {
    id: 5, tag: 'Sports', breaking: false,
    title: 'India beats Australia 3-2 in ODI series — Shubman Gill scores century',
    titleHi: 'भारत ने ऑस्ट्रेलिया को 3-2 से हराया — शुभमन गिल ने शतक लगाया',
    summary: 'India clinched the ODI series with a thrilling 47-run win. Shubman Gill\'s 112* anchored India to 334/6.',
    img: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&q=80',
    source: 'Cricbuzz', time: '4 hr ago', readTime: '2 min', likes: 12450, verified: false,
  },
];

const TRENDING = [
  { tag: '#PMKisan', count: '8.2K posts' },
  { tag: '#UPI20LakhCrore', count: '5.4K posts' },
  { tag: '#Monsoon2026', count: '4.1K posts' },
  { tag: '#INDvsAUS', count: '15.2K posts' },
];

export default function NewsPage() {
  const [cat, setCat] = useState('Top Stories');
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [saved, setSaved] = useState<number[]>([]);

  const filtered = cat === 'Top Stories' ? NEWS : NEWS.filter(n => n.tag === cat);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-orange-100/60 bg-white/80 px-4 py-3 backdrop-blur-md dark:border-gray-700/60 dark:bg-gray-900/80">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">News & Updates</h1>
          <div className="flex gap-2">
            <button onClick={() => setLang(l => l === 'en' ? 'hi' : 'en')} className="flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-semibold text-bharat-saffron hover:bg-orange-100 transition">
              <Globe size={13} />{lang === 'en' ? 'हिंदी' : 'English'}
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-gray-500"><Search size={17} /></button>
          </div>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-0.5">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)} className={`flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition ${cat === c ? 'bg-bharat-saffron text-white' : 'bg-orange-50 text-gray-500 hover:bg-orange-100 dark:bg-white/5'}`}>{c}</button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-4">
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Feed */}
          <div className="space-y-4 lg:col-span-2">
            {/* Breaking */}
            {filtered.some(n => n.breaking) && (
              <div className="flex items-center gap-3 rounded-xl bg-red-500 px-4 py-2.5">
                <span className="animate-pulse rounded bg-white/30 px-1.5 py-0.5 text-[10px] font-black text-white tracking-wider">BREAKING</span>
                <p className="truncate text-sm font-medium text-white">{lang === 'hi' ? filtered.find(n => n.breaking)?.titleHi : filtered.find(n => n.breaking)?.title}</p>
              </div>
            )}

            {/* Audio bulletin */}
            <div className="flex items-center gap-3 rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 to-purple-50 px-4 py-3 dark:border-violet-800 dark:from-violet-900/20 dark:to-purple-900/10">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900/30">
                <Volume2 size={20} className="text-violet-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-violet-800 dark:text-violet-300">Audio News Bulletin</p>
                <p className="text-xs text-violet-500">Listen to today's top news in Hindi — 5 min</p>
              </div>
              <button className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 text-white hover:bg-violet-700 transition">
                <Play size={16} fill="white" />
              </button>
            </div>

            {filtered.map(item => (
              <div key={item.id} className="overflow-hidden rounded-2xl bg-white/80 shadow-sm ring-1 ring-orange-100/40 backdrop-blur-sm transition hover:shadow-md dark:bg-white/5 dark:ring-white/10 group">
                <div className="flex gap-3 p-4">
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl">
                    <Image src={item.img} alt={item.title} fill className="object-cover transition group-hover:scale-105" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-1.5 flex items-center gap-2">
                      <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[11px] font-bold text-bharat-saffron dark:bg-orange-900/30">{item.tag}</span>
                      {item.verified && <BadgeCheck size={13} className="text-blue-500 flex-shrink-0" fill="#3b82f6" />}
                    </div>
                    <h3 className="text-sm font-semibold leading-snug text-gray-900 line-clamp-2 dark:text-white group-hover:text-bharat-saffron transition">
                      {lang === 'hi' ? item.titleHi : item.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-400 line-clamp-2">{item.summary}</p>
                    <div className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-400">
                      <span className="font-medium">{item.source}</span>
                      <span>·</span><span>{item.time}</span>
                      <span>·</span><span>{item.readTime} read</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center border-t border-orange-50/80 px-4 py-2 gap-1 dark:border-white/5">
                  <button className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-gray-500 hover:bg-orange-50 dark:hover:bg-white/5 transition"><Heart size={13} /> {item.likes.toLocaleString('en-IN')}</button>
                  <button className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-gray-500 hover:bg-orange-50 dark:hover:bg-white/5 transition"><MessageCircle size={13} /> Comment</button>
                  <button className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-gray-500 hover:bg-orange-50 dark:hover:bg-white/5 transition"><Share2 size={13} /> Share</button>
                  <button onClick={() => setSaved(p => p.includes(item.id) ? p.filter(i => i !== item.id) : [...p, item.id])} className="ml-auto rounded-lg p-1.5 text-gray-400 hover:bg-orange-50 dark:hover:bg-white/5 transition">
                    <Bookmark size={14} fill={saved.includes(item.id) ? '#FF9933' : 'none'} className={saved.includes(item.id) ? 'text-bharat-saffron' : ''} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Weather */}
            <div className="overflow-hidden rounded-2xl shadow-md">
              <div className="relative h-28">
                <Image src="https://images.unsplash.com/photo-1504608524841-42584120d693?w=400&q=80" alt="weather" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-500/90 to-sky-400/60 p-4 flex items-end justify-between text-white">
                  <div>
                    <div className="flex items-center gap-1 text-xs opacity-80"><MapPin size={11} /> Jaipur, Rajasthan</div>
                    <p className="text-3xl font-bold mt-0.5">28°C</p>
                    <p className="text-sm">Partly Cloudy</p>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                    {[['Mon','☀️','32°'],['Tue','⛅','29°'],['Wed','🌧','24°']].map(([d,i,t]) => (
                      <div key={d} className="rounded-lg bg-white/20 px-1.5 py-1.5">
                        <p className="opacity-70">{d}</p>
                        <p>{i}</p>
                        <p className="font-bold">{t}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Trending */}
            <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100/40 backdrop-blur-sm dark:bg-white/5 dark:ring-white/10">
              <h3 className="mb-3 flex items-center gap-1.5 font-bold text-gray-900 dark:text-white"><TrendingUp size={16} className="text-bharat-saffron" /> Trending</h3>
              <div className="space-y-2.5">
                {TRENDING.map((t, i) => (
                  <div key={t.tag} className="flex items-center gap-3 cursor-pointer group">
                    <span className="w-5 text-sm font-bold text-gray-300">{i + 1}</span>
                    <div>
                      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:text-bharat-saffron transition">{t.tag}</p>
                      <p className="text-xs text-gray-400">{t.count}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100/40 backdrop-blur-sm dark:bg-white/5 dark:ring-white/10">
              <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-sm">Read in your language</h3>
              <div className="grid grid-cols-3 gap-1.5">
                {['हिंदी','বাংলা','தமிழ்','తెలుగు','मराठी','ਪੰਜਾਬੀ'].map(l => (
                  <button key={l} className="rounded-lg border border-orange-100 py-1.5 text-xs font-medium text-gray-600 hover:border-bharat-saffron hover:text-bharat-saffron dark:border-gray-700 dark:text-gray-400 transition">{l}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
