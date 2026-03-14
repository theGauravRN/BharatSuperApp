'use client';
import React, { useState } from 'react';
import { Send, Download, ScanLine, ArrowDownUp, Smartphone, Zap, Building2, CreditCard, BarChart2, Shield, QrCode, TrendingUp, TrendingDown, X } from 'lucide-react';

const TRANSACTIONS = [
  { id: 1, name: 'Ramesh Kirana Store',   type: 'debit',  amount: 450,   method: 'UPI',     time: 'Today 2:30 PM',  Icon: ShoppingIcon },
  { id: 2, name: 'Salary — Mehta Textiles', type: 'credit', amount: 18500, method: 'NEFT',   time: 'Today 10:00 AM', Icon: BriefcaseIcon },
  { id: 3, name: 'JVVNL Electricity Bill', type: 'debit',  amount: 890,   method: 'Bill Pay', time: 'Yesterday',      Icon: ZapIcon },
  { id: 4, name: 'Priya Sharma',          type: 'credit', amount: 1200,  method: 'UPI',     time: 'Yesterday',      Icon: UserIcon },
  { id: 5, name: 'Airtel Recharge',       type: 'debit',  amount: 299,   method: 'UPI',     time: 'Mar 12',         Icon: SmartphoneIcon },
];

function ShoppingIcon({ className }: { className?: string }) { return <div className={`text-orange-500 ${className}`}><svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg></div>; }
function BriefcaseIcon({ className }: { className?: string }) { return <div className={`text-blue-500 ${className}`}><svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></div>; }
function ZapIcon({ className }: { className?: string }) { return <div className={`text-yellow-500 ${className}`}><svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>; }
function UserIcon({ className }: { className?: string }) { return <div className={`text-purple-500 ${className}`}><svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>; }
function SmartphoneIcon({ className }: { className?: string }) { return <div className={`text-teal-500 ${className}`}><svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg></div>; }

const SERVICES = [
  { Icon: Send,       label: 'Send',      color: 'bg-blue-50 text-blue-600' },
  { Icon: Download,   label: 'Receive',   color: 'bg-green-50 text-green-600' },
  { Icon: Smartphone, label: 'Recharge',  color: 'bg-purple-50 text-purple-600' },
  { Icon: Zap,        label: 'Bills',     color: 'bg-yellow-50 text-yellow-600' },
  { Icon: Building2,  label: 'Bank',      color: 'bg-teal-50 text-teal-600' },
  { Icon: CreditCard, label: 'Credit',    color: 'bg-pink-50 text-pink-600' },
  { Icon: BarChart2,  label: 'Invest',    color: 'bg-indigo-50 text-indigo-600' },
  { Icon: Shield,     label: 'Insure',    color: 'bg-orange-50 text-bharat-saffron' },
];

export default function FinTechPage() {
  const [tab, setTab] = useState<'wallet' | 'loans' | 'invest' | 'insurance'>('wallet');
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="min-h-screen">
      {/* QR Modal */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setShowQR(false)}>
          <div className="w-full max-w-xs rounded-3xl bg-white p-8 text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="mb-1 flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-lg">Scan to Pay</h3>
              <button onClick={() => setShowQR(false)} className="rounded-full p-1 hover:bg-gray-100"><X size={18} /></button>
            </div>
            <p className="text-sm text-gray-500 mb-5">rahul.verma@bharatpay</p>
            <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-2xl bg-orange-50 ring-4 ring-bharat-saffron/20">
              <QrCode size={100} className="text-bharat-saffron" strokeWidth={1.5} />
            </div>
            <p className="mt-4 text-xs text-gray-400">UPI ID: rahul.verma@bharatpay</p>
            <button onClick={() => setShowQR(false)} className="mt-5 w-full rounded-xl bg-bharat-saffron py-3 text-sm font-bold text-white hover:opacity-90 transition">Close</button>
          </div>
        </div>
      )}

      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 px-4 pb-8 pt-5">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">FinTech & Payments</h1>
          <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-white hover:bg-white/30"><ArrowDownUp size={17} /></button>
        </div>
        {/* Balance card */}
        <div className="rounded-2xl border border-white/20 bg-white/15 p-5 backdrop-blur">
          <p className="text-sm text-white/70">Total Balance</p>
          <p className="mt-1 text-4xl font-bold text-white">₹12,450</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/15 p-3 text-center">
              <p className="text-xs text-white/70">Income this month</p>
              <p className="mt-0.5 font-bold text-white">+₹18,500</p>
            </div>
            <div className="rounded-xl bg-white/15 p-3 text-center">
              <p className="text-xs text-white/70">Spent this month</p>
              <p className="mt-0.5 font-bold text-red-300">-₹6,139</p>
            </div>
          </div>
        </div>
        {/* Quick actions */}
        <div className="mt-4 grid grid-cols-4 gap-2">
          {[{ Icon: Send, l: 'Send' }, { Icon: Download, l: 'Receive' }, { Icon: ScanLine, l: 'Scan QR', cb: () => setShowQR(true) }, { Icon: Building2, l: 'Bank' }].map(b => (
            <button key={b.l} onClick={b.cb} className="flex flex-col items-center gap-1.5 rounded-xl bg-white/15 py-3 hover:bg-white/25 transition">
              <b.Icon size={22} className="text-white" />
              <span className="text-xs font-medium text-white">{b.l}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-4">
        {/* Tabs */}
        <div className="mb-4 flex gap-1 rounded-xl bg-orange-50/80 p-1 dark:bg-white/5">
          {(['wallet', 'loans', 'invest', 'insurance'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`flex-1 rounded-lg py-2 text-xs font-bold capitalize transition ${tab === t ? 'bg-white text-gray-900 shadow dark:bg-gray-700 dark:text-white' : 'text-gray-500'}`}>
              {t === 'wallet' ? 'Wallet' : t === 'loans' ? 'Loans' : t === 'invest' ? 'Invest' : 'Insure'}
            </button>
          ))}
        </div>

        {tab === 'wallet' && (
          <>
            {/* Services */}
            <div className="mb-4 rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100/40 backdrop-blur-sm dark:bg-white/5 dark:ring-white/10">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">All Services</p>
              <div className="grid grid-cols-4 gap-3">
                {SERVICES.map(s => (
                  <button key={s.label} className="flex flex-col items-center gap-1.5 hover:opacity-80 transition">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${s.color}`}><s.Icon size={20} /></div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Credit Score */}
            <div className="mb-4 flex items-center gap-4 rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 to-purple-50 p-4 dark:border-violet-800 dark:from-violet-900/20 dark:to-purple-900/10">
              <div className="relative h-16 w-16 flex-shrink-0">
                <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="28" fill="none" stroke="#e8e0ff" strokeWidth="8" />
                  <circle cx="32" cy="32" r="28" fill="none" stroke="#7c3aed" strokeWidth="8" strokeDasharray={`${2 * Math.PI * 28 * 0.74} ${2 * Math.PI * 28}`} />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-black text-violet-700 dark:text-violet-300">740</span>
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">Credit Score: 740</p>
                <p className="text-sm text-violet-600 dark:text-violet-300">Good — Eligible for low-interest loans</p>
                <p className="text-xs text-gray-400 mt-0.5">Based on UPI transaction history</p>
              </div>
            </div>

            {/* Transactions */}
            <div className="overflow-hidden rounded-2xl bg-white/80 shadow-sm ring-1 ring-orange-100/40 backdrop-blur-sm dark:bg-white/5 dark:ring-white/10">
              <div className="flex items-center justify-between border-b border-orange-50/80 px-4 py-3 dark:border-white/5">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Recent Transactions</p>
                <button className="text-xs font-semibold text-bharat-saffron hover:underline">View All</button>
              </div>
              {TRANSACTIONS.map((t, i) => (
                <div key={t.id} className={`flex items-center gap-3 px-4 py-3 ${i < TRANSACTIONS.length - 1 ? 'border-b border-orange-50/80 dark:border-white/5' : ''}`}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 dark:bg-white/5">
                    <t.Icon />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.method} · {t.time}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {t.type === 'credit' ? <TrendingUp size={13} className="text-green-500" /> : <TrendingDown size={13} className="text-red-500" />}
                    <span className={`text-sm font-bold ${t.type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                      {t.type === 'credit' ? '+' : '-'}₹{t.amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'loans' && (
          <div className="space-y-3">
            <div className="rounded-xl bg-blue-50 px-4 py-3 text-center dark:bg-blue-900/20">
              <p className="text-sm font-bold text-blue-700 dark:text-blue-300">Pre-approved for up to ₹50,000</p>
              <p className="text-xs text-blue-500 mt-0.5">Based on your UPI & transaction history</p>
            </div>
            {[
              { name: 'Instant Micro Loan', amount: '₹500–₹50K', rate: '12% p.a.', dur: '3–12 months', badge: 'Pre-approved', color: 'border-green-200 bg-green-50/80 dark:bg-green-900/10' },
              { name: 'Business Loan',       amount: '₹1L–₹10L',  rate: '14% p.a.', dur: '12–36 months', badge: 'Apply Now', color: 'border-blue-200 bg-blue-50/80 dark:bg-blue-900/10' },
              { name: 'Kisan Credit Card',   amount: '₹10K–₹3L',  rate: '7% p.a.',  dur: 'Seasonal',    badge: 'Subsidy',   color: 'border-yellow-200 bg-yellow-50/80 dark:bg-yellow-900/10' },
            ].map(loan => (
              <div key={loan.name} className={`rounded-2xl border p-4 ${loan.color}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{loan.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">{loan.amount}</p>
                    <div className="mt-1.5 flex gap-3 text-xs text-gray-500">
                      <span>📊 {loan.rate}</span><span>⏱ {loan.dur}</span>
                    </div>
                  </div>
                  <span className="rounded-full border border-current bg-white px-2.5 py-1 text-xs font-bold text-bharat-green dark:bg-gray-800">{loan.badge}</span>
                </div>
                <button className="mt-3 w-full rounded-xl bg-bharat-saffron py-2.5 text-sm font-bold text-white hover:opacity-90 transition">Apply Now</button>
              </div>
            ))}
          </div>
        )}

        {tab === 'invest' && (
          <div className="space-y-3">
            <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-4 dark:border-emerald-800 dark:from-emerald-900/20">
              <p className="text-xs text-gray-500">Portfolio Value</p>
              <p className="text-3xl font-bold text-emerald-600">₹21,814</p>
              <p className="text-sm font-semibold text-emerald-500 mt-0.5">+₹1,814 (+9.1%) overall</p>
            </div>
            {[
              { name: 'Nifty 50 Index Fund', returns: '+14.2%', inv: '₹5,000',  cur: '₹5,710', up: true },
              { name: 'PPF',                  returns: '7.1%',   inv: '₹12,000', cur: '₹12,852', up: true },
              { name: 'Gold ETF',             returns: '+8.4%',  inv: '₹3,000',  cur: '₹3,252', up: true },
            ].map(inv => (
              <div key={inv.name} className="flex items-center gap-3 rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5 dark:ring-white/10">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
                  <BarChart2 size={20} className="text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900 dark:text-white">{inv.name}</p>
                  <p className="text-xs text-gray-500">Invested: {inv.inv}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-gray-900 dark:text-white">{inv.cur}</p>
                  <p className={`text-xs font-bold ${inv.up ? 'text-green-500' : 'text-red-500'}`}>{inv.returns}</p>
                </div>
              </div>
            ))}
            <button className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3.5 text-sm font-bold text-white hover:opacity-90 transition">+ Start SIP from ₹100/month</button>
          </div>
        )}

        {tab === 'insurance' && (
          <div className="space-y-3">
            {[
              { name: 'Health Insurance',     cover: '₹5 Lakh', premium: '₹1/day',  active: true,  Icon: Shield },
              { name: 'Crop Insurance (PMFBY)', cover: '₹2 Lakh', premium: '₹2/day', active: false, Icon: Shield },
              { name: 'Life Insurance',        cover: '₹10 Lakh', premium: '₹3/day', active: false, Icon: Shield },
              { name: 'Vehicle Insurance',     cover: 'Third-party+own', premium: '₹5/day', active: false, Icon: Shield },
            ].map(ins => (
              <div key={ins.name} className={`flex items-center gap-3 rounded-2xl border p-4 ${ins.active ? 'border-green-300 bg-green-50/80 dark:bg-green-900/10' : 'border-orange-100/60 bg-white/80 dark:bg-white/5'}`}>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${ins.active ? 'bg-green-100 dark:bg-green-900/30' : 'bg-orange-50 dark:bg-white/5'}`}>
                  <ins.Icon size={22} className={ins.active ? 'text-green-600' : 'text-bharat-saffron'} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-gray-900 dark:text-white">{ins.name}</p>
                    {ins.active && <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-600 dark:bg-green-900/30">Active</span>}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{ins.cover} · {ins.premium}</p>
                </div>
                {!ins.active && <button className="rounded-xl bg-bharat-saffron px-3 py-1.5 text-xs font-bold text-white">Buy</button>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
