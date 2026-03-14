'use client';
import React, { useState } from 'react';

const MANDI_PRICES = [
  { crop: 'Wheat (Gehun)', cropHi: 'गेहूँ', price: 2180, prevPrice: 2150, unit: 'qtl', market: 'Jaipur Mandi', state: 'Rajasthan' },
  { crop: 'Rice (Dhan)', cropHi: 'धान', price: 2050, prevPrice: 2080, unit: 'qtl', market: 'Patna Mandi', state: 'Bihar' },
  { crop: 'Cotton (Kapas)', cropHi: 'कपास', price: 6800, prevPrice: 6600, unit: 'qtl', market: 'Rajkot Mandi', state: 'Gujarat' },
  { crop: 'Soybean (Soya)', cropHi: 'सोयाबीन', price: 4200, prevPrice: 4250, unit: 'qtl', market: 'Indore Mandi', state: 'MP' },
  { crop: 'Mustard (Sarso)', cropHi: 'सरसों', price: 5100, prevPrice: 5000, unit: 'qtl', market: 'Alwar Mandi', state: 'Rajasthan' },
  { crop: 'Onion (Pyaz)', cropHi: 'प्याज', price: 1800, prevPrice: 1950, unit: 'qtl', market: 'Nasik Mandi', state: 'Maharashtra' },
  { crop: 'Tomato (Tamatar)', cropHi: 'टमाटर', price: 2400, prevPrice: 2200, unit: 'qtl', market: 'Pune Mandi', state: 'Maharashtra' },
  { crop: 'Potato (Aloo)', cropHi: 'आलू', price: 1200, prevPrice: 1250, unit: 'qtl', market: 'Agra Mandi', state: 'UP' },
];

const CROP_ADVISORY = [
  {
    crop: 'Wheat', emoji: '🌾', stage: 'Flowering Stage',
    advisory: 'Apply second dose of nitrogen fertilizer (50kg urea/hectare). Ensure adequate irrigation as this is critical stage.',
    advisoryHi: 'दूसरी नाइट्रोजन खाद डालें (50 किग्रा यूरिया/हेक्टेयर)। इस अवस्था में पर्याप्त सिंचाई सुनिश्चित करें।',
    urgency: 'high',
  },
  {
    crop: 'Mustard', emoji: '🌻', stage: 'Pod Formation',
    advisory: 'Scout for aphid infestation. If >5 aphids/leaf tip, spray Imidacloprid 17.8% SL @ 150ml/acre.',
    advisoryHi: 'माहू कीट की निगरानी करें। यदि >5 माहू/पत्ती हों तो इमिडाक्लोप्रिड का छिड़काव करें।',
    urgency: 'medium',
  },
  {
    crop: 'Rice', emoji: '🌱', stage: 'Transplanting due',
    advisory: 'Prepare nursery beds. Soak seeds in warm water for 24 hours before sowing. Land preparation: 3 ploughings.',
    advisoryHi: 'नर्सरी की तैयारी करें। बुआई से पहले बीज को 24 घंटे पानी में भिगोएं।',
    urgency: 'low',
  },
];

const GOVT_SCHEMES = [
  { name: 'PM-KISAN', amount: '₹6,000/year', desc: 'Direct cash transfer to 12 crore farmers', status: 'Enrolled', icon: '🌾' },
  { name: 'PM Fasal Bima Yojana', amount: 'Up to 100% cover', desc: 'Crop insurance at subsidized premium', status: 'Apply Now', icon: '🛡️' },
  { name: 'Kisan Credit Card', amount: 'Up to ₹3 Lakh', desc: 'Low-interest crop loan @7% p.a.', status: 'Eligible', icon: '💳' },
  { name: 'eNAM Portal', amount: 'Market Access', desc: 'Sell produce on national online market', status: 'Register', icon: '🏪' },
];

export default function AgriPage() {
  const [activeTab, setActiveTab] = useState<'prices' | 'advisory' | 'weather' | 'schemes'>('prices');
  const [searchCrop, setSearchCrop] = useState('');

  const filtered = MANDI_PRICES.filter(m =>
    m.crop.toLowerCase().includes(searchCrop.toLowerCase()) ||
    m.cropHi.includes(searchCrop)
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bharat-navy">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 px-4 pb-6 pt-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl font-bold text-white">🌾 Agri-Tech</h1>
            <p className="text-xs text-white/70 mt-0.5">किसान का डिजिटल साथी</p>
          </div>
          <button className="px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-medium border border-white/30">
            📍 Jaipur
          </button>
        </div>

        {/* Pest AI CTA */}
        <div className="bg-white/15 rounded-2xl p-3.5 flex items-center gap-3 border border-white/20">
          <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl">📸</div>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">AI Pest Detection</p>
            <p className="text-white/70 text-xs">Click photo of diseased crop → instant diagnosis</p>
          </div>
          <button className="px-3 py-2 bg-white text-green-700 rounded-xl text-xs font-bold hover:bg-green-50 transition">
            📷 Scan
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-4">
        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto scrollbar-none mb-4">
          {(['prices', 'advisory', 'weather', 'schemes'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition capitalize ${activeTab === tab ? 'bg-bharat-saffron text-white' : 'bg-white dark:bg-gray-800 text-gray-500 border border-gray-200 dark:border-gray-700 hover:border-bharat-saffron'}`}
            >
              {tab === 'prices' ? '💰 Mandi Prices' : tab === 'advisory' ? '🌱 Crop Advisory' : tab === 'weather' ? '🌤️ Weather' : '🏛️ Govt Schemes'}
            </button>
          ))}
        </div>

        {activeTab === 'prices' && (
          <>
            <div className="relative mb-3">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
              <input
                value={searchCrop}
                onChange={e => setSearchCrop(e.target.value)}
                placeholder="Search crop... फसल खोजें"
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-bharat-saffron"
              />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
              <div className="grid grid-cols-4 text-xs font-semibold text-gray-500 px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border-b border-gray-100 dark:border-gray-700">
                <span>Crop</span>
                <span className="text-center">Price/qtl</span>
                <span className="text-center">Change</span>
                <span className="text-right">Market</span>
              </div>
              {filtered.map((m, i) => {
                const diff = m.price - m.prevPrice;
                const pct = ((diff / m.prevPrice) * 100).toFixed(1);
                return (
                  <div key={m.crop} className={`grid grid-cols-4 items-center px-4 py-3 ${i < filtered.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''}`}>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-white">{m.cropHi}</p>
                      <p className="text-xs text-gray-400">{m.crop}</p>
                    </div>
                    <p className="text-center text-sm font-bold text-gray-900 dark:text-white">₹{m.price}</p>
                    <div className="text-center">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${diff >= 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
                        {diff >= 0 ? '↑' : '↓'} {Math.abs(diff)} ({pct}%)
                      </span>
                    </div>
                    <p className="text-right text-xs text-gray-500">{m.state}</p>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">Data from 2,000+ mandis · Updated every 15 min</p>
          </>
        )}

        {activeTab === 'advisory' && (
          <div className="space-y-3">
            {CROP_ADVISORY.map(adv => (
              <div key={adv.crop} className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 border-l-4 ${adv.urgency === 'high' ? 'border-red-400' : adv.urgency === 'medium' ? 'border-yellow-400' : 'border-green-400'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{adv.emoji}</span>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{adv.crop}</p>
                    <p className="text-xs text-gray-500">Stage: {adv.stage}</p>
                  </div>
                  <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${adv.urgency === 'high' ? 'bg-red-100 text-red-600' : adv.urgency === 'medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                    {adv.urgency.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{adv.advisory}</p>
                <p className="text-sm text-gray-500 mt-1 italic">{adv.advisoryHi}</p>
                <button className="mt-2 text-xs text-bharat-saffron font-semibold">🎤 Listen in Hindi →</button>
              </div>
            ))}

            {/* Soil health */}
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/10 rounded-2xl p-4 border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🧪</span>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Soil Health Report</p>
                  <p className="text-xs text-gray-500">Last tested: Dec 2025</p>
                </div>
                <button className="ml-auto px-3 py-1.5 bg-bharat-saffron text-white text-xs font-semibold rounded-lg">Book Test</button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[['pH', '6.8', 'Normal'], ['N', 'Low', '⚠️'], ['P', 'Med', '✓'], ['K', 'High', '✓'], ['Organic', '0.4%', '⚠️'], ['EC', '0.8', '✓']].map(([name, val, status]) => (
                  <div key={name} className="bg-white/70 dark:bg-gray-700/50 rounded-xl p-2 text-center">
                    <p className="text-xs text-gray-500">{name}</p>
                    <p className="font-bold text-gray-800 dark:text-white text-sm">{val}</p>
                    <p className="text-xs">{status}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'weather' && (
          <div className="space-y-3">
            {/* Current weather */}
            <div className="bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl p-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-80">📍 Jaipur, Rajasthan · Farm</p>
                  <p className="text-6xl font-bold mt-2">28°C</p>
                  <p className="mt-1 opacity-90">Partly Cloudy ⛅</p>
                </div>
                <div className="text-8xl">⛅</div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[['💧 Humidity', '62%'], ['💨 Wind', '12 km/h'], ['🌧️ Rain', '0 mm']].map(([k, v]) => (
                  <div key={k} className="bg-white/20 rounded-xl p-2 text-center">
                    <p className="text-xs opacity-70">{k}</p>
                    <p className="font-bold">{v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 7-day forecast */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">7-Day Forecast</h3>
              <div className="grid grid-cols-7 gap-1 text-center">
                {[
                  { day: 'Mon', icon: '☀️', max: 32, min: 18 },
                  { day: 'Tue', icon: '⛅', max: 29, min: 17 },
                  { day: 'Wed', icon: '🌧️', max: 24, min: 15 },
                  { day: 'Thu', icon: '🌧️', max: 22, min: 14 },
                  { day: 'Fri', icon: '⛅', max: 26, min: 16 },
                  { day: 'Sat', icon: '☀️', max: 30, min: 18 },
                  { day: 'Sun', icon: '☀️', max: 33, min: 20 },
                ].map(d => (
                  <div key={d.day} className="bg-gray-50 dark:bg-gray-700 rounded-xl py-2 px-1">
                    <p className="text-xs text-gray-500">{d.day}</p>
                    <p className="text-xl my-1">{d.icon}</p>
                    <p className="text-xs font-bold text-gray-800 dark:text-white">{d.max}°</p>
                    <p className="text-xs text-gray-400">{d.min}°</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Agri weather alert */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <p className="font-bold text-yellow-800 dark:text-yellow-300">Frost Alert — Wednesday</p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">Temperature may drop to 4°C. Cover sensitive crops. Don&apos;t irrigate before frost night.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schemes' && (
          <div className="space-y-3">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl px-4 py-3 mb-1">
              <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">🎯 4 schemes available for your profile</p>
              <p className="text-xs text-blue-500 mt-0.5">Based on your land records & crop data</p>
            </div>
            {GOVT_SCHEMES.map(scheme => (
              <div key={scheme.name} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 flex items-start gap-3">
                <div className="h-12 w-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-2xl">{scheme.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-gray-900 dark:text-white">{scheme.name}</p>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${scheme.status === 'Enrolled' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-bharat-saffron'}`}>
                      {scheme.status}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-bharat-saffron mt-0.5">{scheme.amount}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{scheme.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
