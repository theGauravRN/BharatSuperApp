'use client';
import React, { useState } from 'react';

const MY_COURSES = [
  { id: 1, name: 'SSC CGL 2026 Complete Preparation', progress: 65, lessons: 120, done: 78, icon: '📝', color: 'from-blue-400 to-indigo-500', instructor: 'Rajesh Kumar Sir', nextLesson: 'Quantitative Aptitude: Time & Work' },
  { id: 2, name: 'Electrical Wiring — NSDC Certified', progress: 30, lessons: 60, done: 18, icon: '⚡', color: 'from-yellow-400 to-orange-500', instructor: 'Suresh Electricals', nextLesson: 'House Wiring: 3-Phase Connection' },
  { id: 3, name: 'Spoken English for Jobs', progress: 80, lessons: 40, done: 32, icon: '🗣️', color: 'from-green-400 to-teal-500', instructor: 'Anita Ma&apos;am', nextLesson: 'Interview Preparation' },
];

const CATEGORIES = [
  { name: 'Govt Exams', icon: '📝', count: 45 },
  { name: 'Skills', icon: '🔧', count: 120 },
  { name: 'Digital Literacy', icon: '💻', count: 35 },
  { name: 'Language', icon: '🗣️', count: 28 },
  { name: 'Business', icon: '📊', count: 52 },
  { name: 'Agriculture', icon: '🌾', count: 18 },
];

const LIVE_SESSIONS = [
  { title: 'SSC CGL — Reasoning Live', instructor: 'Vivek Sir', time: 'Today 4:00 PM', students: 1240, topic: 'Blood Relations & Puzzles', icon: '🔴' },
  { title: 'UPSC Prelims Strategy', instructor: 'IAS Meera Ma&apos;am', time: 'Today 6:00 PM', students: 3450, topic: 'History of Modern India', icon: '🔴' },
  { title: 'Plumbing Skills — Live Demo', instructor: 'Mohan Plumber', time: 'Tomorrow 10 AM', students: 345, topic: 'CPVC Pipe Fitting', icon: '⏰' },
];

const EXPLORE_COURSES = [
  { id: 10, name: 'UPSC CSE Complete Course', price: 999, originalPrice: 4999, language: 'Hindi', duration: '12 months', icon: '🏛️', rating: 4.8, students: '45K' },
  { id: 11, name: 'Plumbing Professional Cert', price: 499, originalPrice: 1999, language: 'Hindi + Telugu', duration: '3 months', icon: '🔧', rating: 4.7, students: '12K' },
  { id: 12, name: 'Digital Marketing for SMBs', price: 599, originalPrice: 2499, language: 'English + Hindi', duration: '2 months', icon: '📱', rating: 4.6, students: '28K' },
  { id: 13, name: 'Tailoring & Fashion Design', price: 799, originalPrice: 3499, language: 'Hindi', duration: '6 months', icon: '🧵', rating: 4.9, students: '8.2K' },
];

export default function EdTechPage() {
  const [activeTab, setActiveTab] = useState<'my' | 'explore' | 'live' | 'jobs'>('my');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bharat-navy">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-violet-700 px-4 pb-6 pt-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl font-bold text-white">📚 EdTech 2.0</h1>
            <p className="text-xs text-white/70">शिक्षा जो रोज़गार दिलाए</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 bg-white/20 text-white rounded-full text-xs font-medium border border-white/30">🔍 Search</button>
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[['📚 Enrolled', '3 courses'], ['🏆 Certificates', '2 earned'], ['⏱️ Study Time', '48 hrs']].map(([k, v]) => (
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
          {(['my', 'explore', 'live', 'jobs'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition ${activeTab === tab ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow' : 'text-gray-500'}`}
            >
              {tab === 'my' ? '📖 My Learning' : tab === 'explore' ? '🔍 Explore' : tab === 'live' ? '🔴 Live' : '💼 Jobs'}
            </button>
          ))}
        </div>

        {activeTab === 'my' && (
          <div className="space-y-4">
            {MY_COURSES.map(course => (
              <div key={course.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${course.color}`} style={{ width: `${course.progress}%` }} />
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                      {course.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm leading-snug">{course.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">by {course.instructor}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                        <span>📊 {course.progress}% complete</span>
                        <span>·</span>
                        <span>{course.done}/{course.lessons} lessons</span>
                      </div>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-3 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                    <div className={`h-1.5 rounded-full bg-gradient-to-r ${course.color}`} style={{ width: `${course.progress}%` }} />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-1.5 text-xs text-gray-600 dark:text-gray-300 flex-1 mr-2">
                      ▶ Next: {course.nextLesson}
                    </div>
                    <button className="px-4 py-1.5 bg-bharat-saffron text-white rounded-lg text-xs font-semibold hover:opacity-90 transition">Continue</button>
                  </div>
                </div>
              </div>
            ))}

            {/* Scholarship CTA */}
            <div className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/10 rounded-2xl p-4 border border-violet-200 dark:border-violet-800">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎓</span>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 dark:text-white">Scholarships Available!</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">3 scholarships matching your profile — NSP, PM-YASASVI, State Merit</p>
                </div>
                <button className="px-3 py-1.5 bg-violet-600 text-white rounded-lg text-xs font-semibold">Apply</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'explore' && (
          <>
            {/* Category grid */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {CATEGORIES.map(cat => (
                <button key={cat.name} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 text-center hover:shadow-md transition">
                  <span className="text-2xl">{cat.icon}</span>
                  <p className="text-xs font-medium text-gray-800 dark:text-white mt-1">{cat.name}</p>
                  <p className="text-xs text-gray-400">{cat.count} courses</p>
                </button>
              ))}
            </div>

            {/* Course cards */}
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Popular Courses</h3>
            <div className="space-y-3">
              {EXPLORE_COURSES.map(course => {
                const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);
                return (
                  <div key={course.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 flex gap-3">
                    <div className="h-16 w-16 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-3xl flex-shrink-0">
                      {course.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{course.name}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                        <span>🌐 {course.language}</span>
                        <span>·</span>
                        <span>⏱️ {course.duration}</span>
                        <span>·</span>
                        <span>👥 {course.students}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900 dark:text-white">₹{course.price}</span>
                          <span className="text-xs text-gray-400 line-through">₹{course.originalPrice}</span>
                          <span className="text-xs bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full font-semibold">{discount}% off</span>
                        </div>
                        <button className="px-3 py-1.5 bg-bharat-saffron text-white rounded-lg text-xs font-semibold">Enroll</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {activeTab === 'live' && (
          <div className="space-y-3">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-2.5 flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <p className="text-sm font-semibold text-red-700 dark:text-red-400">2 Live Sessions happening now</p>
            </div>
            {LIVE_SESSIONS.map((session, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-2xl">{session.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{session.title}</p>
                      {session.icon === '🔴' && <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-bold">LIVE</span>}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">by {session.instructor} · {session.time}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">📖 {session.topic}</p>
                    <p className="text-xs text-gray-400 mt-0.5">👥 {session.students.toLocaleString()} watching</p>
                  </div>
                </div>
                <button className={`mt-3 w-full py-2 rounded-xl text-sm font-semibold ${session.icon === '🔴' ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-bharat-saffron text-white hover:opacity-90'} transition`}>
                  {session.icon === '🔴' ? '🔴 Join Live Now' : '⏰ Set Reminder'}
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="space-y-3">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl px-4 py-3 mb-1">
              <p className="font-bold text-green-700 dark:text-green-400">🎯 Job-linked certifications</p>
              <p className="text-xs text-green-600 mt-0.5">Complete course → Get certified → Get hired by partner companies</p>
            </div>
            {[
              { course: 'Electrical Wiring Cert', companies: ['L&T', 'Havells', 'Polycab'], hired: 1240, icon: '⚡', salary: '₹18K–25K/month' },
              { course: 'Plumbing NSDC Cert', companies: ['Jaquar', 'Hindware', 'Cera'], hired: 890, icon: '🔧', salary: '₹15K–22K/month' },
              { course: 'Data Entry Operator', companies: ['Banks', 'SSC', 'BPO'], hired: 3450, icon: '💻', salary: '₹12K–18K/month' },
              { course: 'Tailoring & Stitching', companies: ['Manyavar', 'Fabindia', 'Local'], hired: 560, icon: '🧵', salary: '₹10K–20K/month' },
            ].map(item => (
              <div key={item.course} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-2xl">{item.icon}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{item.course}</p>
                    <p className="text-xs text-bharat-saffron font-medium mt-0.5">Salary: {item.salary}</p>
                    <p className="text-xs text-gray-500 mt-1">Hiring partners: {item.companies.join(', ')}</p>
                    <p className="text-xs text-green-600 mt-0.5">✓ {item.hired.toLocaleString()} placed so far</p>
                  </div>
                  <button className="px-3 py-1.5 bg-bharat-saffron text-white rounded-lg text-xs font-semibold">Enroll</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
