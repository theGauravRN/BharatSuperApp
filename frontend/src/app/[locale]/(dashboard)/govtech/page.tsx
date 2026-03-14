'use client';
import React, { useState } from 'react';

const DOCUMENTS = [
  { name: 'Aadhaar Card', number: 'XXXX XXXX 4521', status: 'Verified', icon: '🆔', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { name: 'PAN Card', number: 'ABCDE1234F', status: 'Verified', icon: '📄', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' },
  { name: 'Driving Licence', number: 'RJ14 2022 0043211', status: 'Valid', icon: '🚗', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
  { name: 'Voter ID', number: 'RZJ0234521', status: 'Verified', icon: '🗳️', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  { name: 'Class 10 Certificate', number: 'RBSE/2018/456789', status: 'Uploaded', icon: '🎓', color: 'text-teal-600', bg: 'bg-teal-50 dark:bg-teal-900/20' },
  { name: 'Land Record (Khasra)', number: 'Khasra No. 234/B', status: 'Uploaded', icon: '🌾', color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
];

const SERVICES = [
  { name: 'DigiLocker', desc: 'Access all your documents', icon: '📁', color: 'from-blue-400 to-indigo-500' },
  { name: 'Land Records', desc: 'Bhulekh, mutation, registry', icon: '🌍', color: 'from-green-400 to-teal-500' },
  { name: 'Grievance Portal', desc: 'Submit & track complaints', icon: '📢', color: 'from-red-400 to-rose-500' },
  { name: 'Scheme Finder', desc: 'Check eligibility & apply', icon: '🎯', color: 'from-purple-400 to-violet-500' },
  { name: 'RTI Filing', desc: 'Right to Information', icon: '📜', color: 'from-orange-400 to-amber-500' },
  { name: 'Voter Services', desc: 'Registration, EPIC, info', icon: '🗳️', color: 'from-teal-400 to-cyan-500' },
  { name: 'Birth/Death Cert', desc: 'Apply for civic documents', icon: '📋', color: 'from-pink-400 to-rose-500' },
  { name: 'Income Certificate', desc: 'Revenue department', icon: '💼', color: 'from-indigo-400 to-blue-500' },
];

const GRIEVANCES = [
  { id: 'GR2024-0234', title: 'Road repair pending at Ward 12', dept: 'Municipal Corporation', date: 'Mar 10, 2026', status: 'In Progress', days: 4 },
  { id: 'GR2024-0198', title: 'Street light not working for 2 weeks', dept: 'JVVNL', date: 'Feb 28, 2026', status: 'Resolved', days: 14 },
];

const SCHEMES = [
  { name: 'PM Awas Yojana (Urban)', benefit: '₹2.5 Lakh housing subsidy', eligible: true, applied: true, icon: '🏠' },
  { name: 'Ayushman Bharat (PM-JAY)', benefit: '₹5 Lakh health cover', eligible: true, applied: true, icon: '❤️' },
  { name: 'PM SVANidhi', benefit: '₹50,000 micro-loan for vendors', eligible: false, applied: false, icon: '💰' },
  { name: 'PM Vishwakarma', benefit: 'Skill training + ₹15K toolkit', eligible: true, applied: false, icon: '🔨' },
  { name: 'NSP — National Scholarship', benefit: 'Up to ₹10,000 education', eligible: true, applied: false, icon: '🎓' },
];

export default function GovTechPage() {
  const [activeTab, setActiveTab] = useState<'services' | 'documents' | 'grievances' | 'schemes'>('services');
  const [grievanceText, setGrievanceText] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bharat-navy">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-800 via-indigo-800 to-blue-900 px-4 pb-6 pt-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl font-bold text-white">🏛️ GovTech</h1>
            <p className="text-xs text-white/70">सरकारी सेवाएं — एक जगह</p>
          </div>
          <div className="text-right">
            <p className="text-white/70 text-xs">Linked: Aadhaar ✓</p>
            <p className="text-white/70 text-xs">DigiLocker ✓</p>
          </div>
        </div>

        {/* Identity card */}
        <div className="bg-white/15 rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">👤</div>
            <div>
              <p className="text-white font-bold text-lg">Rahul Verma</p>
              <p className="text-white/70 text-xs">Aadhaar: XXXX XXXX 4521</p>
              <p className="text-white/70 text-xs">Jaipur, Rajasthan · PIN: 302001</p>
            </div>
            <div className="ml-auto text-right">
              <span className="bg-green-400/30 text-green-100 text-xs px-2 py-1 rounded-full font-medium">✓ eKYC Done</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-4">
        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-4">
          {(['services', 'documents', 'grievances', 'schemes'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition ${activeTab === tab ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow' : 'text-gray-500'}`}
            >
              {tab === 'services' ? '🏛️ Services' : tab === 'documents' ? '📁 Docs' : tab === 'grievances' ? '📢 Griev.' : '🎯 Schemes'}
            </button>
          ))}
        </div>

        {activeTab === 'services' && (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {SERVICES.map(service => (
                <button key={service.name} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 text-left hover:shadow-md transition group">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl mb-2`}>
                    {service.icon}
                  </div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">{service.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{service.desc}</p>
                </button>
              ))}
            </div>

            {/* Recent service */}
            <div className="mt-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Caste Certificate — Applied</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Application No: CAS/2026/3421</p>
                  <p className="text-xs text-gray-500 mt-0.5">Expected by: Mar 20, 2026 · Submitted: Mar 14</p>
                </div>
                <button className="ml-auto text-xs text-bharat-saffron font-medium">Track →</button>
              </div>
            </div>
          </>
        )}

        {activeTab === 'documents' && (
          <>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl px-4 py-3 mb-3 flex items-center gap-2">
              <span className="text-blue-500">🔒</span>
              <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">All documents secured via DigiLocker — Government verified</p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {DOCUMENTS.map(doc => (
                <div key={doc.name} className={`rounded-2xl p-4 border ${doc.bg} flex items-center gap-3`}>
                  <div className="h-12 w-12 rounded-xl bg-white dark:bg-gray-700 flex items-center justify-center text-2xl shadow-sm">{doc.icon}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{doc.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{doc.number}</p>
                    <span className={`text-xs font-semibold ${doc.color}`}>✓ {doc.status}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button className="text-xs text-bharat-saffron font-medium hover:underline">View</button>
                    <button className="text-xs text-gray-400 hover:text-gray-600">Share</button>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full py-3 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 text-sm font-medium hover:border-bharat-saffron hover:text-bharat-saffron transition">
              + Upload New Document
            </button>
          </>
        )}

        {activeTab === 'grievances' && (
          <div className="space-y-4">
            {/* File new */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">📢 File New Grievance</h3>
              <textarea
                value={grievanceText}
                onChange={e => setGrievanceText(e.target.value)}
                placeholder="Describe your complaint... or use voice 🎤"
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 p-3 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 outline-none focus:ring-2 focus:ring-bharat-saffron resize-none"
                rows={3}
              />
              <div className="flex gap-2 mt-2">
                <select className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 outline-none">
                  <option>Select Department</option>
                  <option>Municipal Corporation</option>
                  <option>Police</option>
                  <option>Electricity Board</option>
                  <option>Water Supply</option>
                </select>
                <button className="px-4 py-2 bg-bharat-saffron text-white rounded-xl text-sm font-semibold hover:opacity-90 transition">Submit</button>
              </div>
            </div>

            {/* Past grievances */}
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">My Grievances</h3>
            {GRIEVANCES.map(g => (
              <div key={g.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{g.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{g.dept} · {g.date}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${g.status === 'Resolved' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                    {g.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>🔢 {g.id}</span>
                  <span>·</span>
                  <span>⏱️ {g.days} days</span>
                  {g.status === 'In Progress' && <span className="text-bharat-saffron font-medium ml-auto">View Status →</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'schemes' && (
          <div className="space-y-3">
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl px-4 py-3 mb-1">
              <p className="font-bold text-purple-700 dark:text-purple-300">🎯 5 schemes match your profile</p>
              <p className="text-xs text-purple-500">Based on Aadhaar-linked data: income, age, location, occupation</p>
            </div>
            {SCHEMES.map(scheme => (
              <div key={scheme.name} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 flex items-start gap-3">
                <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-2xl">{scheme.icon}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-sm">{scheme.name}</p>
                      <p className="text-xs text-bharat-saffron font-semibold mt-0.5">{scheme.benefit}</p>
                    </div>
                    {scheme.eligible ? (
                      scheme.applied ? (
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-medium flex-shrink-0">✓ Applied</span>
                      ) : (
                        <button className="flex-shrink-0 px-3 py-1.5 bg-bharat-saffron text-white rounded-lg text-xs font-semibold hover:opacity-90 transition">Apply</button>
                      )
                    ) : (
                      <span className="text-xs bg-gray-100 text-gray-400 dark:bg-gray-700 px-2 py-0.5 rounded-full font-medium flex-shrink-0">Not Eligible</span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* RTI quick file */}
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-4 border border-orange-200 dark:border-orange-800">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">📜</span>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">File RTI Online</p>
                  <p className="text-xs text-gray-500">Right to Information Act 2005 — No lawyer needed</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Fee: ₹10 (SC/ST/BPL: Free) · Response in 30 days</p>
              <button className="w-full py-2.5 bg-orange-500 text-white rounded-xl text-sm font-semibold hover:bg-orange-600 transition">File RTI Now</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
