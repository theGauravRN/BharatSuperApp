'use client';
import React, { useState } from 'react';

const DOCTORS = [
  { id: 1, name: 'Dr. Priya Sharma', spec: 'General Physician', rating: 4.9, reviews: 1240, exp: '12 yrs', fee: 299, available: 'Today 3:00 PM', lang: 'Hindi, English', avatar: 'P', color: 'from-pink-400 to-rose-500' },
  { id: 2, name: 'Dr. Anil Kumar', spec: 'Cardiologist', rating: 4.8, reviews: 890, exp: '18 yrs', fee: 599, available: 'Today 5:30 PM', lang: 'Hindi, Telugu', avatar: 'A', color: 'from-blue-400 to-indigo-500' },
  { id: 3, name: 'Dr. Sunita Rao', spec: 'Gynaecologist', rating: 4.9, reviews: 2100, exp: '15 yrs', fee: 499, available: 'Tomorrow 11 AM', lang: 'Kannada, Hindi', avatar: 'S', color: 'from-teal-400 to-emerald-500' },
  { id: 4, name: 'Dr. Ramesh Patel', spec: 'Diabetologist', rating: 4.7, reviews: 567, exp: '10 yrs', fee: 399, available: 'Today 6:00 PM', lang: 'Gujarati, Hindi', avatar: 'R', color: 'from-orange-400 to-amber-500' },
];

const LAB_TESTS = [
  { name: 'Complete Blood Count (CBC)', price: 199, originalPrice: 350, time: 'Report in 4 hrs', icon: '🩸' },
  { name: 'HbA1c (Diabetes Test)', price: 299, originalPrice: 499, time: 'Report in 6 hrs', icon: '💉' },
  { name: 'Thyroid Profile (T3,T4,TSH)', price: 499, originalPrice: 899, time: 'Report in 8 hrs', icon: '🔬' },
  { name: 'Lipid Profile', price: 249, originalPrice: 450, time: 'Report in 6 hrs', icon: '🧪' },
];

const APPOINTMENTS = [
  { doctor: 'Dr. Priya Sharma', spec: 'General Physician', date: 'Tomorrow, Mar 15', time: '10:30 AM', type: 'Video', status: 'Confirmed', avatar: 'P', color: 'from-pink-400 to-rose-500' },
  { doctor: 'Dr. Anil Kumar', spec: 'Cardiologist', date: 'Mar 20', time: '5:30 PM', type: 'Video', status: 'Upcoming', avatar: 'A', color: 'from-blue-400 to-indigo-500' },
];

const VITALS = [
  { name: 'Blood Pressure', value: '122/80', unit: 'mmHg', status: 'Normal', icon: '❤️', color: 'text-green-600' },
  { name: 'Blood Sugar', value: '98', unit: 'mg/dL', status: 'Normal', icon: '🩸', color: 'text-green-600' },
  { name: 'Weight', value: '68', unit: 'kg', status: 'Normal', icon: '⚖️', color: 'text-green-600' },
  { name: 'O2 Saturation', value: '98%', unit: 'SpO2', status: 'Normal', icon: '🫁', color: 'text-green-600' },
];

export default function HealthPage() {
  const [activeTab, setActiveTab] = useState<'home' | 'doctors' | 'labs' | 'records'>('home');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bharat-navy">
      {/* Header */}
      <div className="bg-gradient-to-br from-teal-600 via-emerald-600 to-cyan-700 px-4 pb-6 pt-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl font-bold text-white">🏥 HealthTech</h1>
            <p className="text-xs text-white/70">स्वास्थ्य सेवा — घर बैठे</p>
          </div>
          <button className="px-3 py-1.5 bg-red-500 text-white rounded-full text-xs font-bold border border-red-400 animate-pulse">
            🚑 Emergency
          </button>
        </div>

        {/* Health ID */}
        <div className="bg-white/15 rounded-2xl p-3.5 flex items-center gap-3 border border-white/20">
          <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">🆔</div>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">ABDM Health ID Linked</p>
            <p className="text-white/70 text-xs">rahul.verma@abdm · All records synced</p>
          </div>
          <button className="px-3 py-1.5 bg-white text-teal-700 rounded-xl text-xs font-bold">View</button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-4">
        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-4">
          {(['home', 'doctors', 'labs', 'records'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition ${activeTab === tab ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow' : 'text-gray-500'}`}
            >
              {tab === 'home' ? '🏠 Home' : tab === 'doctors' ? '👨‍⚕️ Doctors' : tab === 'labs' ? '🧪 Labs' : '📋 Records'}
            </button>
          ))}
        </div>

        {activeTab === 'home' && (
          <div className="space-y-4">
            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: '👨‍⚕️', title: 'Book Doctor', desc: 'Consult in 15 min', color: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/10', border: 'border-blue-200 dark:border-blue-800', action: () => setActiveTab('doctors') },
                { icon: '🧪', title: 'Book Lab Test', desc: 'Home sample pickup', color: 'from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/10', border: 'border-teal-200 dark:border-teal-800', action: () => setActiveTab('labs') },
                { icon: '💊', title: 'Order Medicine', desc: 'Delivered in 2 hrs', color: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/10', border: 'border-pink-200 dark:border-pink-800', action: () => {} },
                { icon: '🧘', title: 'Mental Health', desc: 'Anonymous counseling', color: 'from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/10', border: 'border-purple-200 dark:border-purple-800', action: () => {} },
              ].map(item => (
                <button key={item.title} onClick={item.action} className={`rounded-2xl border p-4 text-left ${item.color} ${item.border} hover:shadow-md transition`}>
                  <span className="text-3xl">{item.icon}</span>
                  <p className="font-bold text-gray-900 dark:text-white mt-2 text-sm">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </button>
              ))}
            </div>

            {/* Upcoming appointment */}
            {APPOINTMENTS.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">Upcoming Appointments</h3>
                {APPOINTMENTS.map((apt, i) => (
                  <div key={i} className={`flex items-center gap-3 ${i < APPOINTMENTS.length - 1 ? 'mb-3 pb-3 border-b border-gray-100 dark:border-gray-700' : ''}`}>
                    <div className={`h-11 w-11 rounded-full bg-gradient-to-br ${apt.color} flex items-center justify-center text-white font-bold`}>{apt.avatar}</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 dark:text-white text-sm">{apt.doctor}</p>
                      <p className="text-xs text-gray-500">{apt.spec} · {apt.type}</p>
                      <p className="text-xs text-bharat-saffron font-medium mt-0.5">📅 {apt.date} at {apt.time}</p>
                    </div>
                    <button className="px-3 py-1.5 bg-teal-100 dark:bg-teal-900/30 text-teal-600 rounded-lg text-xs font-semibold">Join</button>
                  </div>
                ))}
              </div>
            )}

            {/* Vitals */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">My Vitals</h3>
                <span className="text-xs text-gray-400">Last updated: today</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {VITALS.map(vital => (
                  <div key={vital.name} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{vital.icon}</span>
                      <div>
                        <p className="text-xs text-gray-500">{vital.name}</p>
                        <p className={`font-bold text-base ${vital.color}`}>{vital.value} <span className="text-xs font-normal text-gray-400">{vital.unit}</span></p>
                      </div>
                    </div>
                    <span className="text-xs text-green-600 mt-1 block">✓ {vital.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vaccination tracker */}
            <div className="bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/10 border border-blue-200 dark:border-blue-800 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">💉</span>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Vaccination Tracker</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Mohit (age 2) — Next vaccine: OPV Booster</p>
                  <p className="text-xs text-blue-600 mt-0.5">📅 Due: March 20, 2026</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'doctors' && (
          <div className="space-y-3">
            {/* Specialty filter */}
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-0.5">
              {['All', 'General', 'Cardiologist', 'Gynaecologist', 'Paediatrician', 'Dermatologist', 'AYUSH'].map(spec => (
                <button key={spec} className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition ${spec === 'All' ? 'bg-bharat-saffron text-white' : 'bg-white dark:bg-gray-800 text-gray-500 border border-gray-200 dark:border-gray-700'}`}>
                  {spec}
                </button>
              ))}
            </div>

            {DOCTORS.map(doctor => (
              <div key={doctor.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
                <div className="flex items-start gap-3">
                  <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${doctor.color} flex items-center justify-center text-white font-bold text-xl flex-shrink-0`}>
                    {doctor.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">{doctor.name}</p>
                        <p className="text-sm text-gray-500">{doctor.spec} · {doctor.exp} exp</p>
                      </div>
                      <p className="font-bold text-bharat-saffron">₹{doctor.fee}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-500">
                      <span>⭐ {doctor.rating} ({doctor.reviews})</span>
                      <span>·</span>
                      <span>🗣️ {doctor.lang}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 px-2 py-1 rounded-full font-medium">
                        ✓ Available: {doctor.available}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 py-2 rounded-xl border border-teal-500 text-teal-600 text-sm font-semibold hover:bg-teal-50 transition">📞 Audio</button>
                  <button className="flex-1 py-2 rounded-xl bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition">📹 Book Video</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'labs' && (
          <div className="space-y-3">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl px-4 py-3 mb-1 flex items-center gap-2">
              <span className="text-blue-500">🏠</span>
              <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">Free home sample collection on orders ₹400+</p>
            </div>
            {LAB_TESTS.map((test, i) => {
              const discount = Math.round(((test.originalPrice - test.price) / test.originalPrice) * 100);
              return (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-2xl">{test.icon}</div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{test.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">⏱️ {test.time}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-gray-900 dark:text-white">₹{test.price}</span>
                      <span className="text-xs text-gray-400 line-through">₹{test.originalPrice}</span>
                      <span className="text-xs bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full font-semibold">{discount}% off</span>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 bg-teal-600 text-white rounded-lg text-xs font-semibold hover:bg-teal-700 transition">Book</button>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'records' && (
          <div className="space-y-3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">📋</span>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Health Records</p>
                  <p className="text-xs text-gray-500">Secured via ABDM · End-to-end encrypted</p>
                </div>
              </div>
              {[
                { type: 'Prescription', date: 'Mar 10, 2026', doctor: 'Dr. Priya Sharma', icon: '📝' },
                { type: 'Lab Report — CBC', date: 'Feb 28, 2026', lab: 'Dr. Lal PathLabs', icon: '🧪' },
                { type: 'X-Ray Report', date: 'Feb 15, 2026', lab: 'Fortis Radiology', icon: '🩻' },
                { type: 'Discharge Summary', date: 'Jan 20, 2026', hospital: 'Jaipur Golden Hospital', icon: '🏥' },
              ].map((record, i) => (
                <div key={i} className={`flex items-center gap-3 py-3 ${i > 0 ? 'border-t border-gray-100 dark:border-gray-700' : ''}`}>
                  <div className="h-10 w-10 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-xl">{record.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{record.type}</p>
                    <p className="text-xs text-gray-400">{record.doctor || record.lab || record.hospital} · {record.date}</p>
                  </div>
                  <button className="text-xs text-bharat-saffron font-medium hover:underline">View</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
