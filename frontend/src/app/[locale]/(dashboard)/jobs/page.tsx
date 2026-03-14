'use client';
import React, { useState } from 'react';

const JOB_LISTINGS = [
  { id: 1, title: 'Delivery Partner', company: 'Zomato', location: 'Jaipur', salary: '₹18,000–₹25,000/mo', type: 'Full-time', category: 'Delivery', posted: '2 hr ago', openings: 12, urgent: true, skills: ['Bike', '2-Wheeler licence'], icon: '🛵' },
  { id: 2, title: 'Electrician', company: 'L&T Construction', location: 'Jaipur', salary: '₹20,000–₹28,000/mo', type: 'Contract', category: 'Skilled Trade', posted: '1 day ago', openings: 5, urgent: false, skills: ['Wiring', 'ITI Certificate'], icon: '⚡' },
  { id: 3, title: 'House Cleaning Staff', company: 'Urban Company', location: 'Jaipur', salary: '₹12,000–₹18,000/mo', type: 'Part-time', category: 'Domestic', posted: '3 hr ago', openings: 20, urgent: true, skills: ['Cleaning', 'Flexible hours'], icon: '🧹' },
  { id: 4, title: 'Auto-Rickshaw Driver', company: 'Namma Yatri', location: 'Jaipur', salary: '₹22,000–₹35,000/mo', type: 'Self-employed', category: 'Transport', posted: '5 hr ago', openings: 50, urgent: false, skills: ['Driving licence', 'Smartphone'], icon: '🛺' },
  { id: 5, title: 'Construction Labour (Skilled)', company: 'Godrej Properties', location: 'Jaipur', salary: '₹600–₹900/day', type: 'Daily Wage', category: 'Construction', posted: '6 hr ago', openings: 30, urgent: true, skills: ['Masonry', 'Bar bending'], icon: '🏗️' },
  { id: 6, title: 'Tailor / Stitching Expert', company: 'Manyavar', location: 'Jaipur', salary: '₹15,000–₹22,000/mo', type: 'Full-time', category: 'Skilled Trade', posted: '1 day ago', openings: 8, urgent: false, skills: ['Stitching', 'Pattern cutting'], icon: '🧵' },
];

const PROFILE = {
  name: 'Rahul Verma',
  skills: ['Driving', 'Basic Electronics', 'Smartphone use'],
  experience: '2 years',
  completeness: 72,
  verifications: ['Aadhaar ✓', 'Phone ✓', 'Skill Test: Pending'],
  applied: 3,
  interviews: 1,
};

const CATEGORIES = ['All', 'Delivery', 'Skilled Trade', 'Domestic', 'Transport', 'Construction', 'Security'];

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState<'jobs' | 'applied' | 'profile' | 'earn'>('jobs');
  const [activeCategory, setActiveCategory] = useState('All');
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);

  const applyJob = (id: number) => setAppliedJobs(prev => prev.includes(id) ? prev : [...prev, id]);

  const filtered = JOB_LISTINGS.filter(j => activeCategory === 'All' || j.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bharat-navy">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-700 via-gray-800 to-slate-900 px-4 pb-6 pt-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl font-bold text-white">💼 Gig & Jobs</h1>
            <p className="text-xs text-white/70">नौकरी खोजो — काम पाओ</p>
          </div>
          <div className="text-right text-white/80 text-xs">
            <p>📍 Jaipur</p>
            <p>24 new jobs today</p>
          </div>
        </div>
        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3">
          {[['📤 Applied', '3 jobs'], ['📅 Interviews', '1 upcoming'], ['💰 Avg Salary', '₹22K/mo']].map(([k, v]) => (
            <div key={k} className="bg-white/15 rounded-xl p-3 text-center border border-white/20">
              <p className="text-white font-bold text-sm">{v}</p>
              <p className="text-white/70 text-xs">{k}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-4">
        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-4">
          {(['jobs', 'applied', 'profile', 'earn'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition ${activeTab === tab ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow' : 'text-gray-500'}`}
            >
              {tab === 'jobs' ? '🔍 Find Jobs' : tab === 'applied' ? '📤 Applied' : tab === 'profile' ? '👤 Profile' : '💰 Income'}
            </button>
          ))}
        </div>

        {activeTab === 'jobs' && (
          <>
            {/* Search */}
            <div className="relative mb-3">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input
                placeholder="Search jobs... नौकरी खोजें"
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-bharat-saffron"
              />
            </div>

            {/* Category filter */}
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-0.5 mb-3">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition ${activeCategory === cat ? 'bg-bharat-saffron text-white' : 'bg-white dark:bg-gray-800 text-gray-500 border border-gray-200 dark:border-gray-700'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* AI job match */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/10 rounded-2xl p-4 border border-indigo-200 dark:border-indigo-800 mb-4 flex items-center gap-3">
              <span className="text-3xl">🤖</span>
              <div className="flex-1">
                <p className="font-bold text-gray-900 dark:text-white text-sm">AI matched 3 jobs for you!</p>
                <p className="text-xs text-gray-500">Based on your skills: Driving, Electronics</p>
              </div>
              <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold">View →</button>
            </div>

            <div className="space-y-3">
              {filtered.map(job => (
                <div key={job.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-2xl">{job.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-gray-900 dark:text-white text-sm">{job.title}</p>
                            {job.urgent && <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-bold">URGENT</span>}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{job.company} · 📍 {job.location}</p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-bharat-saffron mt-1">{job.salary}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">{job.type}</span>
                        {job.skills.map(s => (
                          <span key={s} className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 px-2 py-0.5 rounded-full">{s}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                        <span>🕒 {job.posted}</span>
                        <span>·</span>
                        <span>👥 {job.openings} openings</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">View Details</button>
                    <button
                      onClick={() => applyJob(job.id)}
                      className={`flex-1 py-2 rounded-xl text-sm font-semibold transition ${appliedJobs.includes(job.id) ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : 'bg-bharat-saffron text-white hover:opacity-90'}`}
                    >
                      {appliedJobs.includes(job.id) ? '✓ Applied' : 'Apply Now'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'applied' && (
          <div className="space-y-3">
            {appliedJobs.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-6xl mb-3">📋</p>
                <p className="text-gray-500 font-medium">No applications yet</p>
                <button onClick={() => setActiveTab('jobs')} className="mt-4 px-6 py-2.5 bg-bharat-saffron text-white rounded-xl font-semibold text-sm">Find Jobs</button>
              </div>
            ) : (
              JOB_LISTINGS.filter(j => appliedJobs.includes(j.id)).map(job => (
                <div key={job.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-2xl">{job.icon}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white">{job.title}</p>
                      <p className="text-xs text-gray-500">{job.company} · {job.location}</p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-600 dark:bg-blue-900/30 px-2 py-0.5 rounded-full font-medium">Under Review</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-4">
            {/* Profile completeness */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-slate-500 to-gray-600 flex items-center justify-center text-white text-2xl font-bold">R</div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 dark:text-white">{PROFILE.name}</p>
                  <p className="text-xs text-gray-500">Profile {PROFILE.completeness}% complete</p>
                </div>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full mb-3">
                <div className="h-2 rounded-full bg-gradient-to-r from-bharat-saffron to-bharat-orange" style={{ width: `${PROFILE.completeness}%` }} />
              </div>
              <p className="text-xs text-gray-500 mb-3">Complete your profile to get 3x more job matches</p>

              <div className="space-y-2">
                {PROFILE.verifications.map(v => (
                  <div key={v} className="flex items-center gap-2 text-sm">
                    <span className={v.includes('✓') ? 'text-green-500' : 'text-yellow-500'}>{v.includes('✓') ? '✓' : '⏳'}</span>
                    <span className="text-gray-600 dark:text-gray-400">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900 dark:text-white">Skills</h3>
                <button className="text-xs text-bharat-saffron">+ Add Skill</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {PROFILE.skills.map(s => (
                  <span key={s} className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 text-xs font-medium rounded-full">{s}</span>
                ))}
              </div>
            </div>

            {/* Skill Test */}
            <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/10 rounded-2xl p-4 border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🏆</span>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Skill Verification</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Get verified badge — earn 40% more jobs</p>
                </div>
                <button className="ml-auto px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-semibold">Take Test</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'earn' && (
          <div className="space-y-4">
            {/* Income summary */}
            <div className="bg-gradient-to-br from-slate-700 to-gray-800 rounded-2xl p-5 text-white">
              <p className="text-sm opacity-70">This Month Earnings</p>
              <p className="text-4xl font-bold mt-1">₹24,500</p>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[['Days Worked', '22'], ['Avg/Day', '₹1,114'], ['Rating', '4.8 ⭐']].map(([k, v]) => (
                  <div key={k} className="bg-white/15 rounded-xl p-2.5 text-center">
                    <p className="opacity-70 text-xs">{k}</p>
                    <p className="font-bold">{v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Salary advance */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">💸 Income Smoothing</h3>
              <div className="space-y-3">
                {[
                  { title: 'Salary Advance', desc: 'Get ₹5,000 advance on earned salary', icon: '📤', color: 'bg-blue-50 text-blue-600' },
                  { title: 'Emergency Loan', desc: 'Instant ₹10,000 — repay in 3 months', icon: '🆘', color: 'bg-red-50 text-red-600' },
                  { title: 'ESI Benefits', desc: 'Health insurance for gig workers', icon: '❤️', color: 'bg-green-50 text-green-600' },
                  { title: 'PF Registration', desc: 'Provident fund for gig economy', icon: '🏦', color: 'bg-purple-50 text-purple-600' },
                ].map(item => (
                  <div key={item.title} className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-xl ${item.color}`}>{item.icon}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 dark:text-white">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    <button className="px-3 py-1.5 bg-bharat-saffron text-white rounded-lg text-xs font-semibold">Access</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
