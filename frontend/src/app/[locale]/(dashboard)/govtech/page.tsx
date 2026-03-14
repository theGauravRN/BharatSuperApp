'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Landmark, FileText, AlertCircle, IndianRupee, FolderOpen, ShieldCheck, CheckCircle2, Clock, ChevronRight, Download, Upload } from 'lucide-react';

const DIGILOCKER_DOCS = [
  { name: 'Aadhaar Card',        issuer: 'UIDAI',            date: 'Linked', status: 'verified', img: 'https://images.unsplash.com/photo-1586185745057-8fc1e21d3f6f?w=60&q=80' },
  { name: 'PAN Card',            issuer: 'Income Tax Dept',  date: 'Linked', status: 'verified', img: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=60&q=80' },
  { name: 'Voter ID (EPIC)',     issuer: 'Election Commission', date: 'Linked', status: 'verified', img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=60&q=80' },
  { name: 'Driving Licence',    issuer: 'Rajasthan RTO',    date: 'Feb 2028', status: 'verified', img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=60&q=80' },
  { name: 'Class 12 Certificate', issuer: 'RBSE',            date: 'May 2018', status: 'pending', img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=60&q=80' },
];

const SCHEMES = [
  { name: 'PM-KISAN Samman Nidhi', dept: 'Agriculture Ministry', benefit: '₹6,000/year', status: 'Enrolled', category: 'Farmer', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=80&q=80' },
  { name: 'Ayushman Bharat PMJAY', dept: 'Health Ministry', benefit: '₹5 Lakh health cover', status: 'Eligible', category: 'Health', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=80&q=80' },
  { name: 'PMEGP — Self Employment', dept: 'MSME Ministry', benefit: '35% subsidy', status: 'Apply Now', category: 'Business', img: 'https://images.unsplash.com/photo-1560472355-a3b1ece1c46f?w=80&q=80' },
  { name: 'Mukhyamantri Laghu Udyog', dept: 'Rajasthan Govt', benefit: '25% subsidy on equipment', status: 'Apply Now', category: 'Business', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=80&q=80' },
];

const GRIEVANCES = [
  { id: '#GRV-2843', dept: 'BSNL',         issue: 'Broadband outage since 3 days', date: 'Mar 10', status: 'In Progress', days: 4 },
  { id: '#GRV-2791', dept: 'JVVNL (Power)', issue: 'Street light not working since Jan', date: 'Mar 2', status: 'Resolved', days: 10 },
];

export default function GovTechPage() {
  const [tab, setTab] = useState<'home' | 'digilocker' | 'schemes' | 'grievance'>('home');
  const [newGrievance, setNewGrievance] = useState('');

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&q=80" alt="india" width={1200} height={180} className="h-44 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-indigo-700/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-4 pb-4">
          <h1 className="text-xl font-bold text-white">GovTech</h1>
          <p className="text-xs text-white/80">सरकारी सेवाएं — एक क्लिक में</p>
          <div className="mt-3 flex items-center gap-2">
            <ShieldCheck size={14} className="text-green-400" />
            <p className="text-xs text-white/90">Connected to DigiLocker · Aadhaar Verified</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-4">
        <div className="mb-4 flex gap-1 rounded-xl bg-orange-50/80 p-1 dark:bg-white/5">
          {([['home','Home'],['digilocker','DigiLocker'],['schemes','Schemes'],['grievance','Grievance']] as const).map(([t, l]) => (
            <button key={t} onClick={() => setTab(t)} className={`flex-1 rounded-lg py-2 text-xs font-bold transition ${tab === t ? 'bg-white text-gray-900 shadow dark:bg-gray-700 dark:text-white' : 'text-gray-500'}`}>{l}</button>
          ))}
        </div>

        {tab === 'home' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { Icon: FolderOpen,  title: 'DigiLocker',     desc: '5 docs linked',       color: 'border-blue-200 bg-blue-50/80',   onClick: () => setTab('digilocker') },
                { Icon: IndianRupee, title: 'My Schemes',     desc: '4 matching schemes',  color: 'border-green-200 bg-green-50/80', onClick: () => setTab('schemes') },
                { Icon: AlertCircle, title: 'File Grievance', desc: 'Register complaint',  color: 'border-orange-200 bg-orange-50/80', onClick: () => setTab('grievance') },
                { Icon: FileText,    title: 'RTI Filing',     desc: 'Right to Information', color: 'border-violet-200 bg-violet-50/80', onClick: () => {} },
              ].map(item => (
                <button key={item.title} onClick={item.onClick} className={`rounded-2xl border p-4 text-left transition hover:shadow-md dark:bg-white/5 dark:border-gray-700 ${item.color}`}>
                  <item.Icon size={28} strokeWidth={1.5} className="text-gray-700 dark:text-gray-300 mb-2" />
                  <p className="font-bold text-sm text-gray-900 dark:text-white">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </button>
              ))}
            </div>

            {/* Govt portals */}
            <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5 dark:ring-white/10">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">Govt Portals (Quick Access)</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: 'Income Tax', icon: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=40&q=80' },
                  { name: 'EPFO',       icon: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=40&q=80' },
                  { name: 'BHIM UPI',   icon: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=40&q=80' },
                  { name: 'e-Courts',   icon: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=40&q=80' },
                  { name: 'RERA',       icon: 'https://images.unsplash.com/photo-1560472355-a3b1ece1c46f?w=40&q=80' },
                  { name: 'RTO Parivahan', icon: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=40&q=80' },
                ].map(p => (
                  <button key={p.name} className="flex flex-col items-center gap-2 rounded-xl bg-orange-50/60 py-3 px-2 hover:bg-orange-100/80 transition dark:bg-white/5">
                    <Image src={p.icon} alt={p.name} width={32} height={32} className="h-8 w-8 rounded-lg object-cover" />
                    <span className="text-[10px] font-semibold text-gray-600 dark:text-gray-400 text-center">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Ration card */}
            <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50/80 p-4 dark:border-green-800 dark:bg-green-900/20">
              <div className="h-12 w-12 flex-shrink-0 rounded-xl bg-green-100 flex items-center justify-center dark:bg-green-900/30">
                <ShieldCheck size={24} className="text-green-600" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">Ration Card Linked</p>
                <p className="text-sm text-gray-500">AAY Category · 5 members · 35 kg/month</p>
              </div>
              <button className="ml-auto flex-shrink-0 rounded-xl bg-green-600 px-3 py-2 text-xs font-bold text-white">View</button>
            </div>
          </div>
        )}

        {tab === 'digilocker' && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 dark:bg-blue-900/20">
              <ShieldCheck size={20} className="text-blue-500 flex-shrink-0" />
              <div>
                <p className="font-bold text-blue-700 dark:text-blue-300 text-sm">DigiLocker — Aadhaar Verified</p>
                <p className="text-xs text-blue-500">rahul.verma@digilocker.gov.in</p>
              </div>
            </div>
            {DIGILOCKER_DOCS.map((doc, i) => (
              <div key={i} className="flex items-center gap-3 rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5 dark:ring-white/10">
                <Image src={doc.img} alt={doc.name} width={48} height={48} className="h-12 w-12 rounded-xl object-cover" />
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">{doc.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{doc.issuer} · {doc.date}</p>
                </div>
                {doc.status === 'verified' ? (
                  <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" fill="#22c55e" />
                ) : (
                  <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-[10px] font-bold text-yellow-600">Pending</span>
                )}
                <button className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition dark:bg-blue-900/30">
                  <Download size={14} />
                </button>
              </div>
            ))}
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-blue-300 py-4 text-sm font-semibold text-blue-500 hover:bg-blue-50 transition dark:border-blue-700 dark:hover:bg-blue-900/20">
              <Upload size={18} /> Upload Document
            </button>
          </div>
        )}

        {tab === 'schemes' && (
          <div className="space-y-3">
            <div className="rounded-xl bg-green-50 px-4 py-3 dark:bg-green-900/20">
              <p className="font-bold text-green-700 dark:text-green-400 text-sm">🎯 4 government schemes match your profile</p>
              <p className="text-xs text-green-600 mt-0.5">Based on Aadhaar, PAN, location & BPL status</p>
            </div>
            {SCHEMES.map((s, i) => (
              <div key={i} className="flex items-center gap-3 rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5 dark:ring-white/10">
                <Image src={s.img} alt={s.name} width={56} height={56} className="h-14 w-14 rounded-xl object-cover" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-sm text-gray-900 dark:text-white">{s.name}</p>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${s.status === 'Enrolled' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-bharat-saffron'}`}>{s.status}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{s.dept}</p>
                  <p className="text-sm font-semibold text-bharat-saffron mt-0.5">{s.benefit}</p>
                </div>
                <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
              </div>
            ))}
          </div>
        )}

        {tab === 'grievance' && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5 dark:ring-white/10">
              <p className="mb-3 text-sm font-bold text-gray-900 dark:text-white">File New Grievance</p>
              <select className="mb-3 w-full rounded-xl border border-orange-100 bg-orange-50/50 px-3 py-2.5 text-sm text-gray-700 outline-none dark:border-gray-700 dark:bg-white/5 dark:text-gray-200">
                <option>Select Department</option>
                <option>BSNL / Telecom</option>
                <option>JVVNL / Electricity</option>
                <option>Municipal Corporation</option>
                <option>Water / Jal Jeevan</option>
                <option>Police</option>
              </select>
              <textarea
                value={newGrievance}
                onChange={e => setNewGrievance(e.target.value)}
                placeholder="Describe your issue in detail... (Hindi or English)"
                rows={4}
                className="mb-3 w-full rounded-xl border border-orange-100 bg-orange-50/50 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-bharat-saffron/30 dark:border-gray-700 dark:bg-white/5"
              />
              <button className="w-full rounded-xl bg-bharat-saffron py-3 text-sm font-bold text-white hover:opacity-90 transition">Submit Grievance</button>
            </div>

            <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5 dark:ring-white/10">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">My Grievances</p>
              {GRIEVANCES.map((g, i) => (
                <div key={g.id} className={`py-3 ${i < GRIEVANCES.length - 1 ? 'border-b border-orange-50/80 dark:border-white/5' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-mono font-bold text-gray-400">{g.id}</p>
                      <p className="font-semibold text-sm text-gray-900 dark:text-white">{g.issue}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{g.dept} · Filed {g.date}</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${g.status === 'Resolved' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                      {g.status === 'Resolved' ? <CheckCircle2 size={10} className="mr-0.5 inline" /> : <Clock size={10} className="mr-0.5 inline" />}{g.status}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-gray-400">Response time: {g.days} days</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
