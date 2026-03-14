'use client';
import React, { useState } from 'react';

const TRANSACTIONS = [
  { id: 1, name: 'Ramesh Kirana Store', type: 'debit', amount: 450, method: 'UPI', time: 'Today, 2:30 PM', icon: '🛒', category: 'Shopping' },
  { id: 2, name: 'Salary - Mehta Textiles', type: 'credit', amount: 18500, method: 'NEFT', time: 'Today, 10:00 AM', icon: '💼', category: 'Income' },
  { id: 3, name: 'Electricity Bill - JVVNL', type: 'debit', amount: 890, method: 'Bill Pay', time: 'Yesterday', icon: '⚡', category: 'Bills' },
  { id: 4, name: 'Priya Sharma', type: 'credit', amount: 1200, method: 'UPI', time: 'Yesterday', icon: '👤', category: 'Transfer' },
  { id: 5, name: 'Airtel Recharge', type: 'debit', amount: 299, method: 'UPI', time: 'Mar 12', icon: '📱', category: 'Recharge' },
  { id: 6, name: 'LIC Premium', type: 'debit', amount: 2500, method: 'Auto-pay', time: 'Mar 10', icon: '🛡️', category: 'Insurance' },
];

const SERVICES = [
  { icon: '📤', label: 'Send Money', color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' },
  { icon: '📥', label: 'Receive', color: 'bg-green-50 text-green-600 dark:bg-green-900/20' },
  { icon: '📱', label: 'Recharge', color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20' },
  { icon: '⚡', label: 'Bills', color: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20' },
  { icon: '🏦', label: 'Bank', color: 'bg-teal-50 text-teal-600 dark:bg-teal-900/20' },
  { icon: '💳', label: 'Credit', color: 'bg-pink-50 text-pink-600 dark:bg-pink-900/20' },
  { icon: '📊', label: 'Invest', color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20' },
  { icon: '🛡️', label: 'Insurance', color: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20' },
];

const LOANS = [
  { name: 'Instant Micro Loan', amount: '₹500 – ₹50,000', interest: '12% p.a.', duration: '3–12 months', badge: 'Pre-approved', color: 'border-green-200 bg-green-50 dark:bg-green-900/10' },
  { name: 'Business Loan', amount: '₹1L – ₹10L', interest: '14% p.a.', duration: '12–36 months', badge: 'Apply Now', color: 'border-blue-200 bg-blue-50 dark:bg-blue-900/10' },
  { name: 'Kisan Credit', amount: '₹10,000 – ₹3L', interest: '7% p.a.', duration: 'Seasonal', badge: 'Subsidy', color: 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10' },
];

const INVESTMENTS = [
  { name: 'Nifty 50 Index Fund', returns: '+14.2%', invested: '₹5,000', current: '₹5,710', icon: '📈', change: 'up' },
  { name: 'PPF — Public Provident Fund', returns: '7.1%', invested: '₹12,000', current: '₹12,852', icon: '🏦', change: 'up' },
  { name: 'Gold ETF', returns: '+8.4%', invested: '₹3,000', current: '₹3,252', icon: '🪙', change: 'up' },
];

export default function FinTechPage() {
  const [activeTab, setActiveTab] = useState<'wallet' | 'loans' | 'invest' | 'insurance'>('wallet');
  const [showUPI, setShowUPI] = useState(false);
  const [balance] = useState(12450);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bharat-navy">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 px-4 pb-8 pt-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-white">💰 FinTech & Payments</h1>
          <button className="h-9 w-9 rounded-lg bg-white/20 flex items-center justify-center text-white text-lg hover:bg-white/30 transition">⚙️</button>
        </div>

        {/* Balance Card */}
        <div className="bg-white/15 backdrop-blur rounded-2xl p-5 border border-white/20">
          <p className="text-white/70 text-sm">Total Balance</p>
          <p className="text-4xl font-bold text-white mt-1">₹{balance.toLocaleString('en-IN')}</p>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex-1 bg-white/15 rounded-xl p-2.5 text-center">
              <p className="text-white/70 text-xs">This Month Income</p>
              <p className="text-white font-bold text-sm mt-0.5">+₹18,500</p>
            </div>
            <div className="flex-1 bg-white/15 rounded-xl p-2.5 text-center">
              <p className="text-white/70 text-xs">This Month Spend</p>
              <p className="text-red-300 font-bold text-sm mt-0.5">-₹6,139</p>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          {[
            { icon: '📤', label: 'Send', action: () => {} },
            { icon: '📲', label: 'Request', action: () => {} },
            { icon: '📷', label: 'Scan QR', action: () => setShowUPI(true) },
            { icon: '🏧', label: 'Withdraw', action: () => {} },
          ].map(btn => (
            <button key={btn.label} onClick={btn.action} className="flex flex-col items-center gap-1.5 bg-white/15 hover:bg-white/25 rounded-xl py-3 transition">
              <span className="text-2xl">{btn.icon}</span>
              <span className="text-white text-xs font-medium">{btn.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* QR Modal */}
      {showUPI && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setShowUPI(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-xs w-full text-center" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">Scan to Pay</h3>
            <p className="text-sm text-gray-500 mb-4">rahul@bharat · Rahul Verma</p>
            <div className="h-48 w-48 mx-auto bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center text-8xl">
              📱
            </div>
            <p className="mt-4 text-xs text-gray-400">UPI ID: rahul.verma@bharatpay</p>
            <button onClick={() => setShowUPI(false)} className="mt-4 w-full py-2.5 bg-bharat-saffron text-white rounded-xl font-semibold text-sm">Close</button>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-4 py-4">
        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-4">
          {(['wallet', 'loans', 'invest', 'insurance'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold capitalize transition ${activeTab === tab ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow' : 'text-gray-500'}`}
            >
              {tab === 'wallet' ? '💳 Wallet' : tab === 'loans' ? '💸 Loans' : tab === 'invest' ? '📈 Invest' : '🛡️ Insure'}
            </button>
          ))}
        </div>

        {activeTab === 'wallet' && (
          <>
            {/* Services grid */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">All Services</h3>
              <div className="grid grid-cols-4 gap-3">
                {SERVICES.map(s => (
                  <button key={s.label} className="flex flex-col items-center gap-1.5 hover:opacity-80 transition">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-2xl ${s.color}`}>{s.icon}</div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Credit score */}
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/10 border border-violet-200 dark:border-violet-800 rounded-2xl p-4 mb-4 flex items-center gap-4">
              <div className="relative h-16 w-16">
                <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="28" fill="none" stroke="#e8e0ff" strokeWidth="8" />
                  <circle cx="32" cy="32" r="28" fill="none" stroke="#7c3aed" strokeWidth="8" strokeDasharray={`${2 * Math.PI * 28 * 0.74} ${2 * Math.PI * 28}`} />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-violet-700 dark:text-violet-300">740</span>
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">Credit Score: 740</p>
                <p className="text-sm text-violet-600 dark:text-violet-300">Good — Eligible for low-interest loans</p>
                <p className="text-xs text-gray-500 mt-0.5">Based on UPI transaction history</p>
              </div>
            </div>

            {/* Transactions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">Recent Transactions</h3>
                <button className="text-xs text-bharat-saffron font-medium">View All →</button>
              </div>
              {TRANSACTIONS.map((t, i) => (
                <div key={t.id} className={`flex items-center gap-3 px-4 py-3 ${i < TRANSACTIONS.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''}`}>
                  <div className="h-10 w-10 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl">{t.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.method} · {t.time}</p>
                  </div>
                  <span className={`font-bold text-sm ${t.type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                    {t.type === 'credit' ? '+' : '-'}₹{t.amount.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'loans' && (
          <div className="space-y-3">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl px-4 py-3 text-center mb-2">
              <p className="text-blue-700 dark:text-blue-300 text-sm font-semibold">💡 You&apos;re pre-approved for up to ₹50,000</p>
              <p className="text-blue-500 text-xs mt-0.5">Based on your UPI & transaction history</p>
            </div>
            {LOANS.map(loan => (
              <div key={loan.name} className={`rounded-2xl border p-4 ${loan.color}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{loan.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">{loan.amount}</p>
                    <div className="flex gap-3 mt-2 text-xs text-gray-500">
                      <span>📊 {loan.interest}</span>
                      <span>⏱️ {loan.duration}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white dark:bg-gray-700 text-bharat-green border border-current">{loan.badge}</span>
                </div>
                <button className="mt-3 w-full py-2 bg-bharat-saffron text-white rounded-xl text-sm font-semibold hover:opacity-90 transition">Apply Now</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'invest' && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/10 rounded-2xl p-4 border border-emerald-200 dark:border-emerald-800">
              <p className="text-xs text-gray-500">Portfolio Value</p>
              <p className="text-3xl font-bold text-emerald-600">₹21,814</p>
              <p className="text-sm text-emerald-500 font-medium">+₹1,814 (+9.1%) overall returns</p>
            </div>
            {INVESTMENTS.map(inv => (
              <div key={inv.name} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-2xl">{inv.icon}</div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{inv.name}</p>
                  <p className="text-xs text-gray-500">Invested: {inv.invested}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{inv.current}</p>
                  <p className="text-xs text-green-500 font-semibold">{inv.returns}</p>
                </div>
              </div>
            ))}
            <button className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-semibold hover:opacity-90 transition">
              + Start SIP from ₹100/month
            </button>
          </div>
        )}

        {activeTab === 'insurance' && (
          <div className="space-y-3">
            {[
              { name: 'Health Insurance', cover: '₹5 Lakh cover', premium: '₹1/day', icon: '❤️', active: true },
              { name: 'Crop Insurance (PMFBY)', cover: 'Up to ₹2L crop', premium: '₹2/day', icon: '🌾', active: false },
              { name: 'Life Insurance', cover: '₹10 Lakh cover', premium: '₹3/day', icon: '🛡️', active: false },
              { name: 'Vehicle Insurance', cover: 'Third-party + own', premium: '₹5/day', icon: '🚗', active: false },
            ].map(ins => (
              <div key={ins.name} className={`rounded-2xl border p-4 ${ins.active ? 'border-green-300 bg-green-50 dark:bg-green-900/10' : 'border-gray-200 bg-white dark:bg-gray-800'}`}>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-2xl">{ins.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900 dark:text-white">{ins.name}</p>
                      {ins.active && <span className="text-xs bg-green-100 text-green-600 dark:bg-green-900/30 px-2 py-0.5 rounded-full font-medium">Active</span>}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{ins.cover} · {ins.premium}</p>
                  </div>
                  {!ins.active && (
                    <button className="px-3 py-1.5 bg-bharat-saffron text-white rounded-lg text-xs font-semibold">Buy</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
