'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Sprout, Camera, MapPin, TrendingUp, TrendingDown, Minus, Cloud, CloudRain, Sun, AlertTriangle, Search, ChevronRight } from 'lucide-react';

const MANDI = [
  { cropHi: 'गेहूँ',  crop: 'Wheat',    price: 2180, prev: 2150, market: 'Jaipur',  state: 'RJ' },
  { cropHi: 'धान',    crop: 'Rice',     price: 2050, prev: 2080, market: 'Patna',   state: 'BR' },
  { cropHi: 'कपास',  crop: 'Cotton',   price: 6800, prev: 6600, market: 'Rajkot',  state: 'GJ' },
  { cropHi: 'सोयाबीन', crop: 'Soybean', price: 4200, prev: 4250, market: 'Indore',  state: 'MP' },
  { cropHi: 'सरसों',  crop: 'Mustard',  price: 5100, prev: 5000, market: 'Alwar',   state: 'RJ' },
  { cropHi: 'प्याज',  crop: 'Onion',    price: 1800, prev: 1950, market: 'Nashik',  state: 'MH' },
  { cropHi: 'टमाटर',  crop: 'Tomato',   price: 2400, prev: 2200, market: 'Pune',    state: 'MH' },
  { cropHi: 'आलू',   crop: 'Potato',   price: 1200, prev: 1250, market: 'Agra',    state: 'UP' },
];

const ADVISORY = [
  { crop: 'Wheat', emoji: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=80&q=80', stage: 'Flowering', text: 'Apply second dose of nitrogen (50 kg urea/ha). Ensure irrigation — critical stage.', hi: 'दूसरी नाइट्रोजन खाद डालें। इस अवस्था में सिंचाई जरूरी है।', urgency: 'high' },
  { crop: 'Mustard', emoji: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&q=80', stage: 'Pod Formation', text: 'Scout for aphid. If >5 aphids/leaf tip, spray Imidacloprid 17.8% SL.', hi: 'माहू कीट की निगरानी करें। अधिक होने पर कीटनाशक छिड़कें।', urgency: 'medium' },
  { crop: 'Rice', emoji: 'https://images.unsplash.com/photo-1536304993881-ff86e0c9a7a8?w=80&q=80', stage: 'Transplanting due', text: 'Prepare nursery beds. Soak seeds 24 hours before sowing. 3 ploughings needed.', hi: 'नर्सरी तैयार करें। बीज 24 घंटे भिगोएं।', urgency: 'low' },
];

const FORECAST = [
  { day: 'Mon', Icon: Sun,       hi: 32, lo: 18 },
  { day: 'Tue', Icon: Cloud,     hi: 29, lo: 17 },
  { day: 'Wed', Icon: CloudRain, hi: 24, lo: 15 },
  { day: 'Thu', Icon: CloudRain, hi: 22, lo: 14 },
  { day: 'Fri', Icon: Cloud,     hi: 26, lo: 16 },
  { day: 'Sat', Icon: Sun,       hi: 30, lo: 18 },
  { day: 'Sun', Icon: Sun,       hi: 33, lo: 20 },
];

export default function AgriPage() {
  const [tab, setTab] = useState<'prices' | 'advisory' | 'weather' | 'schemes'>('prices');
  const [search, setSearch] = useState('');

  const filtered = MANDI.filter(m => m.crop.toLowerCase().includes(search.toLowerCase()) || m.cropHi.includes(search));

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80" alt="farm" width={1200} height={200} className="h-44 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-green-800/80 via-emerald-700/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-4 pb-4">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">Agri-Tech</h1>
              <p className="text-xs text-white/80 mt-0.5"><MapPin size={10} className="inline" /> Jaipur, Rajasthan · किसान का डिजिटल साथी</p>
            </div>
            <button className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-emerald-700 shadow-lg hover:bg-green-50 transition">
              <Camera size={16} /> AI Pest Scan
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-4">
        {/* Tabs */}
        <div className="mb-4 flex gap-1.5 overflow-x-auto pb-0.5">
          {([['prices','Mandi Prices'],['advisory','Crop Advisory'],['weather','Weather'],['schemes','Govt Schemes']] as const).map(([t, l]) => (
            <button key={t} onClick={() => setTab(t)} className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${tab === t ? 'bg-bharat-saffron text-white shadow-sm' : 'bg-white/80 text-gray-500 ring-1 ring-orange-100/60 hover:bg-orange-50 dark:bg-white/5 dark:ring-white/10'}`}>{l}</button>
          ))}
        </div>

        {tab === 'prices' && (
          <>
            <div className="relative mb-3">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search crop..." className="w-full rounded-xl border border-orange-100 bg-white/80 pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-bharat-saffron/30 dark:border-gray-700 dark:bg-white/5" />
            </div>
            <div className="overflow-hidden rounded-2xl bg-white/80 shadow-sm ring-1 ring-orange-100/40 backdrop-blur-sm dark:bg-white/5 dark:ring-white/10">
              <div className="grid grid-cols-4 border-b border-orange-50 bg-orange-50/80 px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:border-white/5 dark:bg-white/5">
                <span>Crop</span><span className="text-center">Price/qtl</span><span className="text-center">Change</span><span className="text-right">Market</span>
              </div>
              {filtered.map((m, i) => {
                const diff = m.price - m.prev;
                const pct = ((diff / m.prev) * 100).toFixed(1);
                const Icon = diff > 0 ? TrendingUp : diff < 0 ? TrendingDown : Minus;
                const clr = diff > 0 ? 'text-green-600 bg-green-50' : diff < 0 ? 'text-red-500 bg-red-50' : 'text-gray-500 bg-gray-50';
                return (
                  <div key={m.crop} className={`grid grid-cols-4 items-center px-4 py-3 ${i < filtered.length - 1 ? 'border-b border-orange-50/80 dark:border-white/5' : ''}`}>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">{m.cropHi}</p>
                      <p className="text-xs text-gray-400">{m.crop}</p>
                    </div>
                    <p className="text-center text-sm font-bold text-gray-900 dark:text-white">₹{m.price}</p>
                    <div className="flex justify-center">
                      <span className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-bold ${clr}`}>
                        <Icon size={10} /> {diff >= 0 ? '+' : ''}{diff} ({pct}%)
                      </span>
                    </div>
                    <p className="text-right text-xs text-gray-400">{m.state}</p>
                  </div>
                );
              })}
            </div>
            <p className="mt-2 text-center text-xs text-gray-400">2,000+ mandis · Updated every 15 min</p>
          </>
        )}

        {tab === 'advisory' && (
          <div className="space-y-3">
            {ADVISORY.map(a => (
              <div key={a.crop} className={`overflow-hidden rounded-2xl bg-white/80 shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5 dark:ring-white/10 border-l-4 ${a.urgency === 'high' ? 'border-red-400' : a.urgency === 'medium' ? 'border-yellow-400' : 'border-green-400'}`}>
                <div className="flex items-start gap-3 p-4">
                  <Image src={a.emoji} alt={a.crop} width={56} height={56} className="h-14 w-14 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-gray-900 dark:text-white">{a.crop}</p>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase ${a.urgency === 'high' ? 'bg-red-100 text-red-600' : a.urgency === 'medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>{a.urgency}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">Stage: {a.stage}</p>
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">{a.text}</p>
                    <p className="mt-1 text-xs italic text-gray-400">{a.hi}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'weather' && (
          <div className="space-y-3">
            <div className="relative overflow-hidden rounded-2xl shadow-md">
              <Image src="https://images.unsplash.com/photo-1504608524841-42584120d693?w=600&q=80" alt="sky" fill className="absolute inset-0 object-cover opacity-60" />
              <div className="relative bg-gradient-to-br from-sky-500/80 to-blue-600/80 p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="flex items-center gap-1 text-sm opacity-80"><MapPin size={12} /> Jaipur, Rajasthan</p>
                    <p className="mt-1 text-6xl font-black">28°</p>
                    <p className="mt-0.5">Partly Cloudy</p>
                  </div>
                  <Cloud size={80} className="opacity-80" />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-center">
                  {[['💧 Humidity','62%'],['💨 Wind','12 km/h'],['🌧 Rain','0 mm']].map(([k, v]) => (
                    <div key={k} className="rounded-xl bg-white/20 p-2"><p className="opacity-70">{k}</p><p className="font-bold">{v}</p></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5 dark:ring-white/10">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">7-Day Forecast</p>
              <div className="grid grid-cols-7 gap-1">
                {FORECAST.map(f => (
                  <div key={f.day} className="rounded-xl bg-orange-50/60 py-2 text-center dark:bg-white/5">
                    <p className="text-xs text-gray-500">{f.day}</p>
                    <f.Icon size={18} className="mx-auto my-1.5 text-sky-500" />
                    <p className="text-xs font-bold text-gray-800 dark:text-white">{f.hi}°</p>
                    <p className="text-[10px] text-gray-400">{f.lo}°</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
              <AlertTriangle size={20} className="mt-0.5 flex-shrink-0 text-yellow-500" />
              <div>
                <p className="font-bold text-yellow-800 dark:text-yellow-300">Frost Alert — Wednesday</p>
                <p className="mt-0.5 text-sm text-yellow-700 dark:text-yellow-400">Temperature may drop to 4°C. Cover sensitive crops.</p>
              </div>
            </div>
          </div>
        )}

        {tab === 'schemes' && (
          <div className="space-y-3">
            <div className="rounded-xl bg-blue-50 px-4 py-3 dark:bg-blue-900/20">
              <p className="text-sm font-bold text-blue-700 dark:text-blue-300">🎯 4 schemes available for your profile</p>
            </div>
            {[
              { name: 'PM-KISAN', benefit: '₹6,000/year', desc: 'Direct cash transfer to 12 crore farmers', status: 'Enrolled', img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=80&q=80' },
              { name: 'PM Fasal Bima', benefit: 'Up to 100% cover', desc: 'Crop insurance at subsidized premium', status: 'Apply Now', img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=80&q=80' },
              { name: 'Kisan Credit Card', benefit: 'Up to ₹3 Lakh', desc: 'Low-interest crop loan @7% p.a.', status: 'Eligible', img: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=80&q=80' },
            ].map(s => (
              <div key={s.name} className="flex items-center gap-3 rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5 dark:ring-white/10">
                <Image src={s.img} alt={s.name} width={56} height={56} className="h-14 w-14 rounded-xl object-cover" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-gray-900 dark:text-white">{s.name}</p>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${s.status === 'Enrolled' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-bharat-saffron'}`}>{s.status}</span>
                  </div>
                  <p className="mt-0.5 text-sm font-semibold text-bharat-saffron">{s.benefit}</p>
                  <p className="text-xs text-gray-400">{s.desc}</p>
                </div>
                <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
