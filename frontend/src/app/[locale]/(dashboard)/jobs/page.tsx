'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Briefcase, MapPin, Clock, Building2, ChevronRight, Search, Filter, Star, Users, TrendingUp, CheckCircle2, BookmarkPlus, Zap, Trophy } from 'lucide-react';

const JOBS = [
  { id: 1, title: 'Delivery Partner',      company: 'Swiggy',         loc: 'Jaipur',  sal: '₹18K–22K', type: 'Gig',     bg: 'immediate', skills: ['Bike', '2-Wheeler Licence'], img: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=80&q=80', hot: true },
  { id: 2, title: 'Electrician',           company: 'L&T',            loc: 'Jaipur',  sal: '₹22K–28K', type: 'Full-time','bg': 'fast',      skills: ['ITI Electrical', 'Wiring'], img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=80&q=80', hot: true },
  { id: 3, title: 'Data Entry Operator',   company: 'SBI',            loc: 'Remote',  sal: '₹15K–20K', type: 'Part-time', bg: 'open',      skills: ['Typing 30+ WPM', 'Computer'], img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&q=80', hot: false },
  { id: 4, title: 'Retail Associate',      company: 'Reliance Retail', loc: 'Jaipur', sal: '₹14K–18K', type: 'Full-time', bg: 'open',      skills: ['Communication', 'Customer service'], img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=80&q=80', hot: false },
  { id: 5, title: 'House Nurse / Caregiver', company: 'HealthFirst',  loc: 'Jaipur',  sal: '₹16K–24K', type: 'Full-time', bg: 'immediate', skills: ['GNM/ANM Certificate'], img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=80&q=80', hot: true },
  { id: 6, title: 'AC Technician',         company: 'Urban Company',  loc: 'Jaipur',  sal: '₹20K–35K', type: 'Gig',     bg: 'open',       skills: ['AC Repair', 'ITI'], img: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=80&q=80', hot: false },
];

const BG_COLORS: Record<string, string> = { immediate: 'bg-red-100 text-red-600', fast: 'bg-yellow-100 text-yellow-600', open: 'bg-green-100 text-green-600' };
const BG_LABEL: Record<string, string> = { immediate: 'Urgent Hire', fast: 'Fast-Track', open: 'Open' };

export default function JobsPage() {
  const [tab, setTab] = useState<'jobs' | 'applied' | 'gig' | 'income'>('jobs');
  const [search, setSearch] = useState('');
  const [saved, setSaved] = useState<number[]>([]);

  const filtered = JOBS.filter(j => j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80" alt="jobs" width={1200} height={180} className="h-44 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800/90 via-gray-700/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-4 pb-4">
          <h1 className="text-xl font-bold text-white">Gig Economy & Jobs</h1>
          <p className="text-xs text-white/80">नौकरी जो आपके पास आए — Verified jobs near you</p>
          <div className="mt-3 flex gap-3">
            {[['24K+', 'Jobs Nearby'], ['4.8★', 'Avg Rating'], ['72h', 'Avg Hiring']].map(([v, l]) => (
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
          {([['jobs','Jobs'],['applied','Applied'],['gig','Gig Work'],['income','Income']] as const).map(([t, l]) => (
            <button key={t} onClick={() => setTab(t)} className={`flex-1 rounded-lg py-2 text-xs font-bold transition ${tab === t ? 'bg-white text-gray-900 shadow dark:bg-gray-700 dark:text-white' : 'text-gray-500'}`}>{l}</button>
          ))}
        </div>

        {tab === 'jobs' && (
          <>
            <div className="mb-3 flex gap-2">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Job title, company, skills..." className="w-full rounded-xl border border-orange-100 bg-white/80 pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-bharat-saffron/30 dark:border-gray-700 dark:bg-white/5" />
              </div>
              <button className="flex items-center gap-1.5 rounded-xl border border-orange-100 bg-white/80 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-orange-50 dark:border-gray-700 dark:bg-white/5 transition">
                <Filter size={15} /> Filter
              </button>
            </div>
            <div className="mb-3 flex gap-2 overflow-x-auto pb-0.5">
              {['All','Gig','Full-time','Part-time','Work-from-Home'].map(f => (
                <button key={f} className={`flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition ${f === 'All' ? 'bg-bharat-saffron text-white' : 'bg-white/80 text-gray-500 ring-1 ring-orange-100/60 hover:bg-orange-50 dark:bg-white/5 dark:ring-white/10'}`}>{f}</button>
              ))}
            </div>
            <div className="space-y-3">
              {filtered.map(job => (
                <div key={job.id} className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5 dark:ring-white/10">
                  <div className="flex items-start gap-3">
                    <Image src={job.img} alt={job.company} width={56} height={56} className="h-14 w-14 rounded-2xl object-cover" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white">{job.title}</p>
                          <p className="flex items-center gap-1 text-sm text-gray-500 mt-0.5"><Building2 size={12} /> {job.company}</p>
                        </div>
                        {job.hot && <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-black text-red-600">🔥 Hot</span>}
                      </div>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><MapPin size={10} /> {job.loc}</span>
                        <span className="flex items-center gap-1"><Clock size={10} /> {job.type}</span>
                        <span className="font-bold text-bharat-saffron">{job.sal}/month</span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {job.skills.map(s => <span key={s} className="rounded-full bg-orange-50 px-2 py-0.5 text-[11px] font-medium text-gray-600 dark:bg-white/5 dark:text-gray-400">{s}</span>)}
                        <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${BG_COLORS[job.bg]}`}>{BG_LABEL[job.bg]}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => setSaved(p => p.includes(job.id) ? p.filter(i => i !== job.id) : [...p, job.id])} className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-orange-100 hover:bg-orange-50 dark:border-gray-700 transition">
                      <BookmarkPlus size={17} className={saved.includes(job.id) ? 'fill-bharat-saffron text-bharat-saffron' : 'text-gray-400'} />
                    </button>
                    <button className="flex-1 rounded-xl border border-gray-300 py-2.5 text-sm font-semibold text-gray-700 hover:bg-orange-50 dark:border-gray-600 dark:text-gray-300 transition">Details</button>
                    <button className="flex-1 rounded-xl bg-bharat-saffron py-2.5 text-sm font-bold text-white hover:opacity-90 transition">Apply Now</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'applied' && (
          <div className="space-y-3">
            {[
              { title: 'Electrician', company: 'L&T',   status: 'Under Review', date: 'Mar 12', step: 1, img: JOBS[1].img },
              { title: 'Delivery Partner', company: 'Swiggy', status: 'Interview Scheduled', date: 'Mar 14', step: 2, img: JOBS[0].img },
              { title: 'AC Technician', company: 'Urban Co', status: 'Selected', date: 'Mar 10', step: 3, img: JOBS[5].img },
            ].map((app, i) => (
              <div key={i} className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5 dark:ring-white/10">
                <div className="flex items-center gap-3">
                  <Image src={app.img} alt={app.company} width={48} height={48} className="h-12 w-12 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 dark:text-white">{app.title}</p>
                    <p className="text-xs text-gray-500">{app.company} · Applied {app.date}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${app.step === 3 ? 'bg-green-100 text-green-600' : app.step === 2 ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600'}`}>
                    {app.step === 3 ? <CheckCircle2 size={11} className="mr-0.5 inline" /> : null}{app.status}
                  </span>
                </div>
                <div className="mt-3 flex gap-0.5">
                  {['Applied', 'Reviewed', 'Interview', 'Offer'].map((s, si) => (
                    <div key={s} className={`flex-1 ${si > 0 ? 'ml-0.5' : ''}`}>
                      <div className={`h-1.5 rounded-full ${si < app.step ? 'bg-bharat-saffron' : 'bg-gray-200 dark:bg-gray-700'}`} />
                      <p className="mt-1 text-center text-[9px] text-gray-400 hidden sm:block">{s}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'gig' && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-gradient-to-r from-bharat-saffron to-bharat-orange p-4 text-white shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-lg">Today's Earnings</p>
                  <p className="text-3xl font-black mt-0.5">₹840</p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-80">5 gigs completed</p>
                  <p className="text-sm opacity-80 mt-0.5">4.9★ rating today</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5 dark:ring-white/10">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">Today's Gigs</p>
              {[
                { task: 'Package Delivery — Zone A', dur: '2.5 hrs', earned: '₹320', status: 'Completed' },
                { task: 'Grocery Delivery — Zone B', dur: '1 hr',   earned: '₹180', status: 'Completed' },
                { task: 'New delivery request nearby', dur: 'Est. 45 min', earned: '~₹150', status: 'Accept' },
              ].map((gig, i) => (
                <div key={i} className={`flex items-center gap-3 py-3 ${i < 2 ? 'border-b border-orange-50/80 dark:border-white/5' : ''}`}>
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${gig.status === 'Completed' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-blue-100 dark:bg-blue-900/20'}`}>
                    <Zap size={16} className={gig.status === 'Completed' ? 'text-green-500' : 'text-blue-500'} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{gig.task}</p>
                    <p className="text-xs text-gray-400">{gig.dur}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-gray-900 dark:text-white">{gig.earned}</p>
                    <span className={`text-xs font-semibold ${gig.status === 'Completed' ? 'text-green-500' : 'text-blue-500'}`}>
                      {gig.status === 'Accept' ? <button className="rounded-lg bg-blue-500 px-2 py-0.5 text-xs font-bold text-white">Accept</button> : gig.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'income' && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5 dark:ring-white/10">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">Income This Week</p>
              <div className="flex items-end justify-between gap-1 h-24">
                {[['Mon','₹420',70],['Tue','₹680',87],['Wed','₹320',52],['Thu','₹890',100],['Fri','₹600',78],['Sat','₹750',88],['Sun','—',0]].map(([d, v, h]) => (
                  <div key={d} className="flex flex-1 flex-col items-center gap-1">
                    <div className="w-full rounded-t-lg bg-gradient-to-t from-bharat-saffron to-bharat-orange" style={{ height: `${Number(h) * 0.88}%`, minHeight: Number(h) > 0 ? 4 : 0 }} />
                    <p className="text-[9px] text-gray-400">{d}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-center text-lg font-black text-gray-900 dark:text-white">₹3,660 this week</p>
            </div>
            <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-800 dark:bg-violet-900/20">
              <div className="flex items-center gap-2 mb-2">
                <Trophy size={20} className="text-violet-500" />
                <p className="font-bold text-gray-900 dark:text-white">Income Smoothing (Advance)</p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Get advance against your earned gig income — instant, no interest for 7 days</p>
              <p className="text-lg font-black text-violet-600 dark:text-violet-300 mt-2">₹2,000 available now</p>
              <button className="mt-3 w-full rounded-xl bg-violet-600 py-3 text-sm font-bold text-white hover:bg-violet-700 transition">Get Advance — 0% for 7 days</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
