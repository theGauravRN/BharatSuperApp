'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { BookOpen, GraduationCap, Play, Radio, Users, Trophy, Briefcase, ChevronRight, Star } from 'lucide-react';

const MY_COURSES = [
  { id: 1, name: 'SSC CGL 2026 Complete Preparation', progress: 65, lessons: 120, done: 78, instructor: 'Rajesh Kumar Sir', next: 'Time & Work', img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&q=80', color: 'from-blue-400 to-indigo-500' },
  { id: 2, name: 'Electrical Wiring — NSDC Certified', progress: 30, lessons: 60, done: 18, instructor: 'Suresh Electricals', next: '3-Phase House Wiring', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&q=80', color: 'from-yellow-400 to-orange-500' },
  { id: 3, name: 'Spoken English for Jobs', progress: 80, lessons: 40, done: 32, instructor: 'Anita Sharma', next: 'Interview Preparation', img: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=200&q=80', color: 'from-green-400 to-teal-500' },
];

const EXPLORE = [
  { id: 10, name: 'UPSC CSE Complete Course', price: 999, mrp: 4999, lang: 'Hindi', dur: '12 months', img: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=80', rating: 4.8, students: '45K' },
  { id: 11, name: 'Plumbing NSDC Certificate', price: 499, mrp: 1999, lang: 'Hindi+Telugu', dur: '3 months', img: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=200&q=80', rating: 4.7, students: '12K' },
  { id: 12, name: 'Digital Marketing for SMBs', price: 599, mrp: 2499, lang: 'English+Hindi', dur: '2 months', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&q=80', rating: 4.6, students: '28K' },
  { id: 13, name: 'Tailoring & Fashion Design', price: 799, mrp: 3499, lang: 'Hindi', dur: '6 months', img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=200&q=80', rating: 4.9, students: '8.2K' },
];

const LIVE = [
  { title: 'SSC CGL — Reasoning Live', instructor: 'Vivek Sir', time: 'Today 4:00 PM', students: 1240, img: 'https://randomuser.me/api/portraits/men/45.jpg', live: true },
  { title: 'UPSC Prelims Strategy', instructor: 'IAS Meera Ma\'am', time: 'Today 6:00 PM', students: 3450, img: 'https://randomuser.me/api/portraits/women/30.jpg', live: true },
  { title: 'Plumbing Skills Demo', instructor: 'Mohan Kumar', time: 'Tomorrow 10 AM', students: 345, img: 'https://randomuser.me/api/portraits/men/62.jpg', live: false },
];

export default function EdTechPage() {
  const [tab, setTab] = useState<'my' | 'explore' | 'live' | 'jobs'>('my');

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80" alt="education" width={1200} height={180} className="h-44 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-800/85 via-blue-700/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-4 pb-4">
          <h1 className="text-xl font-bold text-white">EdTech 2.0</h1>
          <p className="text-xs text-white/80">शिक्षा जो रोज़गार दिलाए</p>
          <div className="mt-3 flex gap-3">
            {[['3', 'Enrolled'], ['2', 'Certificates'], ['48h', 'Study Time']].map(([v, l]) => (
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
          {([['my','My Learning'],['explore','Explore'],['live','Live'],['jobs','Jobs']] as const).map(([t, l]) => (
            <button key={t} onClick={() => setTab(t)} className={`flex-1 rounded-lg py-2 text-xs font-bold transition ${tab === t ? 'bg-white text-gray-900 shadow dark:bg-gray-700 dark:text-white' : 'text-gray-500'}`}>{l}</button>
          ))}
        </div>

        {tab === 'my' && (
          <div className="space-y-4">
            {MY_COURSES.map(c => (
              <div key={c.id} className="overflow-hidden rounded-2xl bg-white/80 shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5 dark:ring-white/10">
                <div className={`h-1 bg-gradient-to-r ${c.color}`} style={{ width: `${c.progress}%` }} />
                <div className="flex gap-3 p-4">
                  <Image src={c.img} alt={c.name} width={64} height={64} className="h-16 w-16 flex-shrink-0 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="font-bold text-sm text-gray-900 dark:text-white leading-snug">{c.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">by {c.instructor}</p>
                    <div className="mt-2 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700">
                      <div className={`h-1.5 rounded-full bg-gradient-to-r ${c.color}`} style={{ width: `${c.progress}%` }} />
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-xs text-gray-400">{c.done}/{c.lessons} lessons · {c.progress}%</p>
                      <button className="flex items-center gap-1 rounded-lg bg-bharat-saffron px-3 py-1.5 text-xs font-bold text-white"><Play size={11} fill="white" /> Continue</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3 rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 to-indigo-50 p-4 dark:border-violet-800 dark:from-violet-900/20 dark:to-indigo-900/10">
              <GraduationCap size={32} className="text-violet-500 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-bold text-gray-900 dark:text-white">Scholarships Available!</p>
                <p className="text-sm text-gray-500">NSP, PM-YASASVI, State Merit — 3 matching your profile</p>
              </div>
              <button className="flex-shrink-0 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-bold text-white">Apply</button>
            </div>
          </div>
        )}

        {tab === 'explore' && (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[['Govt Exams','📝','45'],['Skills','🔧','120'],['Digital','💻','35'],['Language','🗣️','28'],['Business','📊','52'],['Agri','🌾','18']].map(([n, e, c]) => (
                <button key={n} className="flex flex-col items-center gap-1 rounded-2xl bg-white/80 p-3 shadow-sm ring-1 ring-orange-100/40 hover:ring-bharat-saffron/40 transition dark:bg-white/5 dark:ring-white/10">
                  <span className="text-2xl">{e}</span>
                  <p className="text-xs font-bold text-gray-800 dark:text-white">{n}</p>
                  <p className="text-[10px] text-gray-400">{c} courses</p>
                </button>
              ))}
            </div>
            {EXPLORE.map(c => {
              const disc = Math.round(((c.mrp - c.price) / c.mrp) * 100);
              return (
                <div key={c.id} className="flex gap-3 rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5 dark:ring-white/10">
                  <Image src={c.img} alt={c.name} width={72} height={72} className="h-18 w-18 flex-shrink-0 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="font-bold text-sm text-gray-900 dark:text-white">{c.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star size={11} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">{c.rating}</span>
                      <span className="text-xs text-gray-400">· {c.students} students · {c.lang}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-gray-900 dark:text-white">₹{c.price}</span>
                        <span className="text-xs text-gray-400 line-through">₹{c.mrp}</span>
                        <span className="rounded-full bg-green-100 px-1.5 py-0.5 text-[10px] font-black text-green-600">{disc}% off</span>
                      </div>
                      <button className="rounded-xl bg-bharat-saffron px-3 py-1.5 text-xs font-bold text-white">Enroll</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === 'live' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 dark:border-red-900 dark:bg-red-900/20">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <p className="text-sm font-bold text-red-600 dark:text-red-400">2 Live Sessions happening now</p>
            </div>
            {LIVE.map((s, i) => (
              <div key={i} className="flex items-start gap-3 rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5 dark:ring-white/10">
                <Image src={s.img} alt={s.instructor} width={52} height={52} className="h-13 w-13 flex-shrink-0 rounded-xl object-cover" />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <p className="font-bold text-sm text-gray-900 dark:text-white">{s.title}</p>
                    {s.live && <span className="ml-2 flex-shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-black text-red-600 flex items-center gap-1"><Radio size={9} /> LIVE</span>}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">by {s.instructor} · {s.time}</p>
                  <p className="text-xs text-gray-400 mt-0.5"><Users size={10} className="inline mr-0.5" />{s.students.toLocaleString()} watching</p>
                  <button className={`mt-2 flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white transition ${s.live ? 'bg-red-500 hover:bg-red-600' : 'bg-bharat-saffron hover:opacity-90'}`}>
                    {s.live ? <><Play size={12} fill="white" /> Join Now</> : 'Set Reminder'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'jobs' && (
          <div className="space-y-3">
            <div className="rounded-xl bg-green-50 px-4 py-3 dark:bg-green-900/20">
              <p className="flex items-center gap-2 font-bold text-green-700 dark:text-green-400"><Trophy size={16} /> Job-linked Certifications</p>
              <p className="mt-0.5 text-xs text-green-600">Complete → Get certified → Get hired by partner companies</p>
            </div>
            {[
              { course: 'Electrical Wiring Cert', companies: 'L&T, Havells, Polycab', hired: 1240, salary: '₹18K–25K/mo', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=80&q=80' },
              { course: 'Plumbing NSDC Cert',     companies: 'Jaquar, Hindware',      hired: 890,  salary: '₹15K–22K/mo', img: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=80&q=80' },
              { course: 'Data Entry Operator',    companies: 'Banks, SSC, BPO',       hired: 3450, salary: '₹12K–18K/mo', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&q=80' },
            ].map(item => (
              <div key={item.course} className="flex items-center gap-3 rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5 dark:ring-white/10">
                <Image src={item.img} alt={item.course} width={56} height={56} className="h-14 w-14 rounded-xl object-cover" />
                <div className="flex-1">
                  <p className="font-bold text-sm text-gray-900 dark:text-white">{item.course}</p>
                  <p className="text-xs font-semibold text-bharat-saffron">{item.salary}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.companies}</p>
                  <p className="text-xs text-green-600 mt-0.5"><Briefcase size={10} className="inline mr-0.5" />{item.hired.toLocaleString()} placed</p>
                </div>
                <button className="flex-shrink-0 rounded-xl bg-bharat-saffron px-3 py-1.5 text-xs font-bold text-white">Enroll</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
