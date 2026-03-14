'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Zap, MapPin, Car, Bike, Sun, Leaf, Battery, BatteryCharging, Navigation, TrendingDown, IndianRupee, ChevronRight, CheckCircle2 } from 'lucide-react';

const STATIONS = [
  { id: 1, name: 'REIL EV Station — MI Road',     dist: '0.3 km', slots: 4, avail: 3, type: ['CCS2','Type2'], speed: 'Fast (50kW)', price: '₹8/unit', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80', operational: true },
  { id: 2, name: 'Tata Power Charging Hub',       dist: '0.8 km', slots: 8, avail: 5, type: ['CCS2','CHAdeMO','Type2'], speed: 'Ultra-Fast (150kW)', price: '₹10/unit', img: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=200&q=80', operational: true },
  { id: 3, name: 'Jaipur Municipal Corp EV Pt.',  dist: '1.2 km', slots: 2, avail: 0, type: ['Type2'], speed: 'AC (7.4kW)', price: '₹6/unit', img: 'https://images.unsplash.com/photo-1526786220381-1d21eeafd8bf?w=200&q=80', operational: false },
  { id: 4, name: 'Fortum Charge & Drive',         dist: '2.1 km', slots: 6, avail: 4, type: ['CCS2','Type2'], speed: 'Fast (60kW)', price: '₹9/unit', img: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=200&q=80', operational: true },
];

const VEHICLES = [
  { name: 'Ola S1 Pro', type: 'Scooter', range: '181 km', battery: 68, charging: false, img: 'https://images.unsplash.com/photo-1558981852-426c349b0d42?w=120&q=80' },
  { name: 'Tata Nexon EV', type: 'Car', range: '437 km', battery: 92, charging: true, img: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=120&q=80' },
];

export default function EVGreenPage() {
  const [tab, setTab] = useState<'stations' | 'vehicles' | 'solar' | 'subsidies'>('stations');
  const [activeStation, setActiveStation] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&q=80" alt="ev" width={1200} height={200} className="h-48 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-green-800/90 via-lime-700/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-4 pb-4">
          <h1 className="text-xl font-bold text-white">EV & Green Tech</h1>
          <p className="text-xs text-white/80">ईवी · सोलर · हरित ऊर्जा</p>
          <div className="mt-3 flex gap-3">
            {[['5 Nearby','Charging Stations'],['₹8/unit','Avg Cost'],['2h 15m','Est. Charge Time']].map(([v, l]) => (
              <div key={l} className="rounded-xl bg-white/15 px-3 py-2 text-center backdrop-blur">
                <p className="font-black text-white text-sm">{v}</p>
                <p className="text-[10px] text-white/70">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-4">
        <div className="mb-4 flex gap-1 rounded-xl bg-orange-50/80 p-1 dark:bg-white/5">
          {([['stations','Stations'],['vehicles','My EVs'],['solar','Solar'],['subsidies','Subsidies']] as const).map(([t, l]) => (
            <button key={t} onClick={() => setTab(t)} className={`flex-1 rounded-lg py-2 text-xs font-bold transition ${tab === t ? 'bg-white text-gray-900 shadow dark:bg-gray-700 dark:text-white' : 'text-gray-500'}`}>{l}</button>
          ))}
        </div>

        {tab === 'stations' && (
          <>
            {/* Map placeholder */}
            <div className="relative mb-4 overflow-hidden rounded-2xl">
              <Image src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80" alt="map" width={800} height={200} className="h-40 w-full object-cover opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center bg-green-800/40">
                <div className="rounded-xl bg-white/90 px-4 py-2 text-center shadow">
                  <p className="font-bold text-gray-900 text-sm">Jaipur, Rajasthan</p>
                  <p className="text-xs text-green-600 mt-0.5">5 charging stations nearby</p>
                </div>
              </div>
              {[{t:'0.3km',x:'25%',y:'35%'},{t:'0.8km',x:'60%',y:'50%'},{t:'2.1km',x:'75%',y:'30%'}].map((m, i) => (
                <div key={i} className="absolute" style={{ left: m.x, top: m.y }}>
                  <div className="flex flex-col items-center">
                    <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center shadow-lg ring-2 ring-white">
                      <Zap size={12} className="text-white" fill="white" />
                    </div>
                    <span className="mt-0.5 rounded bg-white/90 px-1 text-[9px] font-bold text-gray-700">{m.t}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {STATIONS.map(s => (
                <div
                  key={s.id}
                  className={`rounded-2xl bg-white/80 shadow-sm ring-1 transition cursor-pointer dark:bg-white/5 ${activeStation === s.id ? 'ring-bharat-saffron/60 shadow-md' : 'ring-orange-100/40 hover:ring-orange-200/60 dark:ring-white/10'}`}
                  onClick={() => setActiveStation(activeStation === s.id ? null : s.id)}
                >
                  <div className="flex items-start gap-3 p-4">
                    <Image src={s.img} alt={s.name} width={64} height={64} className="h-16 w-16 flex-shrink-0 rounded-xl object-cover" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <p className="font-bold text-sm text-gray-900 dark:text-white">{s.name}</p>
                        <span className={`ml-2 flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-black ${s.operational ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                          {s.operational ? 'Open' : 'Full'}
                        </span>
                      </div>
                      <p className="flex items-center gap-1 text-xs text-gray-400 mt-0.5"><MapPin size={10} />{s.dist} · {s.speed}</p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <span className="text-sm font-black text-bharat-saffron">{s.price}</span>
                        <span className="text-xs text-gray-400">{s.avail}/{s.slots} slots free</span>
                      </div>
                      <div className="mt-1.5 flex gap-1.5">
                        {s.type.map(t => <span key={t} className="rounded-md bg-orange-50 px-1.5 py-0.5 text-[10px] font-medium text-gray-600 dark:bg-white/5">{t}</span>)}
                      </div>
                    </div>
                  </div>
                  {activeStation === s.id && s.operational && (
                    <div className="border-t border-orange-50/80 px-4 py-3 dark:border-white/5">
                      <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-sm font-bold text-white hover:bg-green-700 transition">
                        <Navigation size={16} /> Navigate · Start Charging
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'vehicles' && (
          <div className="space-y-4">
            {VEHICLES.map(v => (
              <div key={v.name} className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5 dark:ring-white/10">
                <div className="flex items-start gap-4">
                  <Image src={v.img} alt={v.name} width={80} height={80} className="h-20 w-28 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-gray-900 dark:text-white">{v.name}</p>
                      <div className="flex items-center gap-1.5">
                        {v.type === 'Car' ? <Car size={18} className="text-blue-500" /> : <Bike size={18} className="text-green-500" />}
                        <span className="text-xs text-gray-500">{v.type}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span className="flex items-center gap-1">{v.charging ? <BatteryCharging size={12} className="text-green-500 animate-pulse" /> : <Battery size={12} />} Battery</span>
                        <span className="font-bold text-gray-800 dark:text-white">{v.battery}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-700">
                        <div
                          className={`h-2 rounded-full transition-all ${v.battery > 70 ? 'bg-green-500' : v.battery > 30 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${v.battery}%` }}
                        />
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="text-gray-500">Est. Range: <strong className="text-gray-900 dark:text-white">{v.range}</strong></span>
                      {v.charging && <span className="flex items-center gap-1 text-xs font-semibold text-green-500"><BatteryCharging size={12} /> Charging</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-green-300 py-4 text-sm font-semibold text-green-600 hover:bg-green-50 transition dark:border-green-700 dark:hover:bg-green-900/20">
              <Zap size={18} /> Add Another EV
            </button>
          </div>
        )}

        {tab === 'solar' && (
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <Image src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80" alt="solar" width={800} height={200} className="h-44 w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-700/80 to-yellow-500/30 flex items-end p-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Sun size={24} className="text-yellow-200" />
                    <p className="text-white font-black text-lg">Rooftop Solar</p>
                  </div>
                  <p className="text-yellow-100 text-sm">Generate your own electricity and sell surplus to grid</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[['Save ₹2,400/mo','Avg savings'],['25 years','Panel life'],['40% subsidy','PM Suryagarh']].map(([v, l]) => (
                <div key={l} className="rounded-2xl bg-white/80 p-3 text-center shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5">
                  <p className="font-black text-bharat-saffron text-sm">{v}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{l}</p>
                </div>
              ))}
            </div>
            {[
              { kw: '1 kW', cost: '₹45,000', after: '₹27,000', gen: '100 units/mo', payback: '3.5 yrs' },
              { kw: '3 kW', cost: '₹1,20,000', after: '₹72,000', gen: '300 units/mo', payback: '4 yrs' },
              { kw: '5 kW', cost: '₹1,80,000', after: '₹1,08,000', gen: '500 units/mo', payback: '4.5 yrs' },
            ].map((plan) => (
              <div key={plan.kw} className="flex items-center gap-4 rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5 dark:ring-white/10">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-yellow-100 dark:bg-yellow-900/30">
                  <Sun size={24} className="text-yellow-500" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 dark:text-white">{plan.kw} System</p>
                  <p className="text-xs text-gray-400 mt-0.5">{plan.gen} · Payback {plan.payback}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-black text-bharat-saffron">{plan.after}</span>
                    <span className="text-xs text-gray-400 line-through">{plan.cost}</span>
                    <span className="text-xs font-bold text-green-500">40% subsidy</span>
                  </div>
                </div>
                <button className="flex-shrink-0 rounded-xl bg-bharat-saffron px-3 py-2 text-xs font-bold text-white">Get Quote</button>
              </div>
            ))}
          </div>
        )}

        {tab === 'subsidies' && (
          <div className="space-y-3">
            <div className="rounded-xl bg-green-50 px-4 py-3 dark:bg-green-900/20">
              <p className="font-bold text-green-700 dark:text-green-400 text-sm">💡 3 EV subsidies matching your profile</p>
            </div>
            {[
              { name: 'FAME-II EV Subsidy', benefit: '₹10,000–₹1,50,000', desc: 'Central govt subsidy on EV purchase', status: 'Eligible', img: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=80&q=80' },
              { name: 'PM Suryagarh Yojana', benefit: '₹30,000–₹78,000', desc: '300 units free solar electricity/month', status: 'Apply Now', img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=80&q=80' },
              { name: 'Rajasthan EV Policy', benefit: '15% extra subsidy', desc: 'State top-up on FAME-II for Rajasthan residents', status: 'Eligible', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&q=80' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5 dark:ring-white/10">
                <Image src={s.img} alt={s.name} width={56} height={56} className="h-14 w-14 rounded-xl object-cover" />
                <div className="flex-1">
                  <p className="font-bold text-sm text-gray-900 dark:text-white">{s.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{s.desc}</p>
                  <p className="text-sm font-semibold text-bharat-saffron mt-0.5">{s.benefit}</p>
                </div>
                <span className={`flex-shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${s.status === 'Eligible' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-bharat-saffron'}`}>{s.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
