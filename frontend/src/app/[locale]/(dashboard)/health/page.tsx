'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, Activity, FlaskConical, Pill, Brain, Ambulance, IdCard, Star, MapPin, BadgeCheck, Video, Phone, CalendarDays, ChevronRight, Syringe } from 'lucide-react';

const DOCTORS = [
  { id: 1, name: 'Dr. Priya Sharma',  spec: 'General Physician', rating: 4.9, reviews: 1240, exp: '12 yrs', fee: 299, available: 'Today 3:00 PM', lang: 'Hindi, English', img: 'https://randomuser.me/api/portraits/women/44.jpg', verified: true },
  { id: 2, name: 'Dr. Anil Kumar',    spec: 'Cardiologist',       rating: 4.8, reviews: 890,  exp: '18 yrs', fee: 599, available: 'Today 5:30 PM', lang: 'Hindi, Telugu', img: 'https://randomuser.me/api/portraits/men/46.jpg',   verified: true },
  { id: 3, name: 'Dr. Sunita Rao',    spec: 'Gynaecologist',      rating: 4.9, reviews: 2100, exp: '15 yrs', fee: 499, available: 'Tomorrow 11 AM',lang: 'Kannada, Hindi', img: 'https://randomuser.me/api/portraits/women/62.jpg', verified: true },
  { id: 4, name: 'Dr. Ramesh Patel',  spec: 'Diabetologist',      rating: 4.7, reviews: 567,  exp: '10 yrs', fee: 399, available: 'Today 6:00 PM', lang: 'Gujarati, Hindi', img: 'https://randomuser.me/api/portraits/men/73.jpg',  verified: false },
];

const LAB_TESTS = [
  { name: 'Complete Blood Count (CBC)', price: 199, mrp: 350, time: '4 hrs', img: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=80&q=80' },
  { name: 'HbA1c (Diabetes Test)',       price: 299, mrp: 499, time: '6 hrs', img: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=80&q=80' },
  { name: 'Thyroid Profile (T3,T4,TSH)', price: 499, mrp: 899, time: '8 hrs', img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=80&q=80' },
  { name: 'Lipid Profile',               price: 249, mrp: 450, time: '6 hrs', img: 'https://images.unsplash.com/photo-1560238970-cc0ae073d3a5?w=80&q=80' },
];

const VITALS = [
  { name: 'Blood Pressure', value: '122/80', unit: 'mmHg', status: 'Normal', Icon: Heart,     color: 'text-red-500',   bg: 'bg-red-50'     },
  { name: 'Blood Sugar',    value: '98',     unit: 'mg/dL', status: 'Normal', Icon: Activity,  color: 'text-blue-500',  bg: 'bg-blue-50'    },
  { name: 'Weight',         value: '68',     unit: 'kg',    status: 'Normal', Icon: Activity,  color: 'text-green-500', bg: 'bg-green-50'   },
  { name: 'O₂ Saturation', value: '98%',    unit: 'SpO₂',  status: 'Normal', Icon: Activity,  color: 'text-teal-500',  bg: 'bg-teal-50'    },
];

export default function HealthPage() {
  const [tab, setTab] = useState<'home' | 'doctors' | 'labs' | 'records'>('home');

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80" alt="health" width={1200} height={180} className="h-44 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-800/85 via-emerald-700/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-4 pb-4">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">HealthTech</h1>
              <p className="text-xs text-white/80">स्वास्थ्य सेवा — घर बैठे</p>
            </div>
            <button className="flex items-center gap-2 rounded-xl bg-red-500 px-3 py-2 text-sm font-bold text-white shadow-lg hover:bg-red-600 transition animate-pulse">
              <Ambulance size={16} /> Emergency
            </button>
          </div>
          {/* ABDM card */}
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/20 px-3 py-2 backdrop-blur-sm">
            <IdCard size={18} className="text-white flex-shrink-0" />
            <div>
              <p className="text-white text-xs font-semibold">ABDM Health ID Linked</p>
              <p className="text-white/70 text-[10px]">rahul.verma@abdm · All records synced</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-4">
        <div className="mb-4 flex gap-1 rounded-xl bg-orange-50/80 p-1 dark:bg-white/5">
          {(['home', 'doctors', 'labs', 'records'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`flex-1 rounded-lg py-2 text-xs font-bold capitalize transition ${tab === t ? 'bg-white text-gray-900 shadow dark:bg-gray-700 dark:text-white' : 'text-gray-500'}`}>{t}</button>
          ))}
        </div>

        {tab === 'home' && (
          <div className="space-y-4">
            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { Icon: Video,        title: 'Book Doctor',    desc: 'Consult in 15 min',    color: 'border-blue-200 bg-blue-50/80 dark:bg-blue-900/10',   cb: () => setTab('doctors') },
                { Icon: FlaskConical, title: 'Book Lab Test',  desc: 'Home sample pickup',   color: 'border-teal-200 bg-teal-50/80 dark:bg-teal-900/10',    cb: () => setTab('labs') },
                { Icon: Pill,         title: 'Order Medicine', desc: 'Delivered in 2 hrs',   color: 'border-pink-200 bg-pink-50/80 dark:bg-pink-900/10',    cb: () => {} },
                { Icon: Brain,        title: 'Mental Health',  desc: 'Anonymous counseling', color: 'border-purple-200 bg-purple-50/80 dark:bg-purple-900/10', cb: () => {} },
              ].map(item => (
                <button key={item.title} onClick={item.cb} className={`rounded-2xl border p-4 text-left transition hover:shadow-md ${item.color}`}>
                  <item.Icon size={28} className="text-gray-700 dark:text-gray-300 mb-2" strokeWidth={1.5} />
                  <p className="font-bold text-sm text-gray-900 dark:text-white">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </button>
              ))}
            </div>

            {/* Upcoming appointment */}
            <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5 dark:ring-white/10">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">Upcoming Appointments</p>
              {[
                { name: 'Dr. Priya Sharma', spec: 'General Physician', date: 'Tomorrow, Mar 15', time: '10:30 AM', img: DOCTORS[0].img },
              ].map((apt, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Image src={apt.img} alt={apt.name} width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-900 dark:text-white">{apt.name}</p>
                    <p className="text-xs text-gray-400">{apt.spec}</p>
                    <p className="flex items-center gap-1 text-xs font-semibold text-teal-600 mt-0.5"><CalendarDays size={11} /> {apt.date} at {apt.time}</p>
                  </div>
                  <button className="flex items-center gap-1 rounded-xl bg-teal-100 px-3 py-2 text-xs font-bold text-teal-700 dark:bg-teal-900/30 dark:text-teal-400">
                    <Video size={13} /> Join
                  </button>
                </div>
              ))}
            </div>

            {/* Vitals */}
            <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5 dark:ring-white/10">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">My Vitals · Today</p>
              <div className="grid grid-cols-2 gap-3">
                {VITALS.map(v => (
                  <div key={v.name} className={`flex items-center gap-3 rounded-xl p-3 ${v.bg} dark:bg-white/5`}>
                    <v.Icon size={20} className={v.color} strokeWidth={1.5} />
                    <div>
                      <p className="text-[10px] text-gray-500">{v.name}</p>
                      <p className={`text-base font-black ${v.color}`}>{v.value} <span className="text-xs font-normal text-gray-400">{v.unit}</span></p>
                      <p className="text-[10px] text-green-600">✓ {v.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vaccination */}
            <div className="flex items-center gap-3 rounded-2xl border border-blue-200 bg-blue-50/80 p-4 dark:border-blue-800 dark:bg-blue-900/20">
              <Syringe size={28} className="text-blue-500 flex-shrink-0" strokeWidth={1.5} />
              <div>
                <p className="font-bold text-gray-900 dark:text-white">Vaccination Tracker</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Mohit (age 2) — Next: OPV Booster</p>
                <p className="flex items-center gap-1 text-xs text-blue-600 mt-0.5"><CalendarDays size={10} /> Due: March 20, 2026</p>
              </div>
            </div>
          </div>
        )}

        {tab === 'doctors' && (
          <div className="space-y-3">
            <div className="flex gap-2 overflow-x-auto pb-0.5">
              {['All', 'General', 'Cardiologist', 'Gynaecologist', 'Paediatrician', 'AYUSH'].map(s => (
                <button key={s} className={`flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition ${s === 'All' ? 'bg-bharat-saffron text-white' : 'bg-white/80 text-gray-500 ring-1 ring-orange-100/60 hover:bg-orange-50 dark:bg-white/5 dark:ring-white/10'}`}>{s}</button>
              ))}
            </div>
            {DOCTORS.map(dr => (
              <div key={dr.id} className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5 dark:ring-white/10">
                <div className="flex items-start gap-3 mb-3">
                  <Image src={dr.img} alt={dr.name} width={56} height={56} className="h-14 w-14 rounded-2xl object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <p className="font-bold text-gray-900 dark:text-white">{dr.name}</p>
                        {dr.verified && <BadgeCheck size={16} className="text-blue-500" fill="#3b82f6" />}
                      </div>
                      <p className="font-bold text-bharat-saffron">₹{dr.fee}</p>
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">{dr.spec} · {dr.exp} exp</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                      <span className="flex items-center gap-0.5"><Star size={11} className="fill-yellow-400 text-yellow-400" /> {dr.rating} ({dr.reviews})</span>
                      <span>·</span><span>{dr.lang}</span>
                    </div>
                    <span className="mt-1.5 inline-block rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-semibold text-green-600 dark:bg-green-900/30 dark:text-green-400">✓ {dr.available}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-teal-400 py-2 text-sm font-bold text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition"><Phone size={14} /> Audio</button>
                  <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-teal-600 py-2 text-sm font-bold text-white hover:bg-teal-700 transition"><Video size={14} /> Book Video</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'labs' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-3 dark:bg-blue-900/20">
              <MapPin size={16} className="text-blue-500 flex-shrink-0" />
              <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">Free home sample collection on orders ₹400+</p>
            </div>
            {LAB_TESTS.map((test, i) => {
              const disc = Math.round(((test.mrp - test.price) / test.mrp) * 100);
              return (
                <div key={i} className="flex items-center gap-3 rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5 dark:ring-white/10">
                  <Image src={test.img} alt={test.name} width={56} height={56} className="h-14 w-14 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-900 dark:text-white">{test.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Report in {test.time}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-black text-gray-900 dark:text-white">₹{test.price}</span>
                      <span className="text-xs text-gray-400 line-through">₹{test.mrp}</span>
                      <span className="rounded-full bg-green-100 px-1.5 py-0.5 text-[10px] font-black text-green-600">{disc}% off</span>
                    </div>
                  </div>
                  <button className="flex-shrink-0 rounded-xl bg-teal-600 px-3 py-2 text-xs font-bold text-white">Book</button>
                </div>
              );
            })}
          </div>
        )}

        {tab === 'records' && (
          <div className="rounded-2xl bg-white/80 shadow-sm ring-1 ring-orange-100/40 backdrop-blur-sm dark:bg-white/5 dark:ring-white/10 overflow-hidden">
            <div className="flex items-center gap-3 border-b border-orange-50/80 px-4 py-3 dark:border-white/5">
              <Activity size={20} className="text-teal-500" strokeWidth={1.5} />
              <div>
                <p className="font-bold text-gray-900 dark:text-white">Health Records</p>
                <p className="text-xs text-gray-400">Secured via ABDM · End-to-end encrypted</p>
              </div>
            </div>
            {[
              { type: 'Prescription',        date: 'Mar 10, 2026', from: 'Dr. Priya Sharma',      Icon: Pill },
              { type: 'Lab Report — CBC',     date: 'Feb 28, 2026', from: 'Dr. Lal PathLabs',      Icon: FlaskConical },
              { type: 'X-Ray Report',         date: 'Feb 15, 2026', from: 'Fortis Radiology',      Icon: Activity },
              { type: 'Discharge Summary',    date: 'Jan 20, 2026', from: 'Jaipur Golden Hospital', Icon: Heart },
            ].map((r, i) => (
              <div key={i} className={`flex items-center gap-3 px-4 py-3 ${i < 3 ? 'border-b border-orange-50/80 dark:border-white/5' : ''}`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-900/20">
                  <r.Icon size={18} className="text-teal-600" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">{r.type}</p>
                  <p className="text-xs text-gray-400">{r.from} · {r.date}</p>
                </div>
                <button className="text-xs font-semibold text-bharat-saffron hover:underline">View</button>
                <ChevronRight size={14} className="text-gray-300" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
