'use client';
import React, { useState } from 'react';

const CHARGING_STATIONS = [
  { id: 1, name: 'Tata Power EV Hub', address: 'MI Road, Jaipur', distance: '0.4 km', available: 8, total: 12, speed: 'Fast (22kW)', price: '₹12/unit', amenities: ['Café', 'Restroom'], rating: 4.6 },
  { id: 2, name: 'EESL Charging Point', address: 'Malviya Nagar, Jaipur', distance: '0.9 km', available: 2, total: 4, speed: 'Standard (7kW)', price: '₹10/unit', amenities: ['Parking'], rating: 4.2 },
  { id: 3, name: 'Ather Grid', address: 'Vaishali Nagar, Jaipur', distance: '1.2 km', available: 6, total: 6, speed: 'Fast (22kW)', price: '₹8/unit', amenities: ['Café', 'ATM'], rating: 4.8 },
  { id: 4, name: 'Jio-BP Pulse', address: 'C-Scheme, Jaipur', distance: '1.8 km', available: 0, total: 8, speed: 'Rapid (50kW)', price: '₹15/unit', amenities: ['Store', 'Restroom'], rating: 4.5 },
];

const EV_SUBSIDIES = [
  { name: 'FAME II Scheme', benefit: '₹15,000 off on 2-wheelers', expiry: 'Mar 31, 2026', icon: '🛵', eligible: true },
  { name: 'Rajasthan EV Policy', benefit: 'Additional ₹10,000 state subsidy', expiry: 'Dec 31, 2026', icon: '🏛️', eligible: true },
  { name: 'EV Loan at 7% p.a.', benefit: 'SBI Green Car Loan', expiry: 'Ongoing', icon: '💳', eligible: true },
];

const SOLAR_PRODUCTS = [
  { name: '1 kW Rooftop Solar', company: 'Tata Solar', price: 45000, subsidy: 14000, netPrice: 31000, payback: '4.5 years', savings: '₹7,200/year', icon: '☀️' },
  { name: '3 kW Rooftop Solar', company: 'Adani Solar', price: 120000, subsidy: 40000, netPrice: 80000, payback: '4 years', savings: '₹22,000/year', icon: '🌞' },
  { name: '500W Solar Pump', company: 'Kirloskar', price: 28000, subsidy: 10000, netPrice: 18000, payback: '3.5 years', savings: '₹6,000/year', icon: '💧' },
];

const EV_FLEET = [
  { vehicle: 'Ola S1 Pro', type: 'Electric Scooter', battery: 68, range: '92 km', earnings: '₹1,240', status: 'Active', icon: '🛵' },
  { vehicle: 'Tata Ace EV', type: 'EV Mini Truck', battery: 45, range: '130 km', earnings: '₹3,450', status: 'Charging', icon: '🚛' },
];

export default function EVGreenPage() {
  const [activeTab, setActiveTab] = useState<'charging' | 'fleet' | 'solar' | 'subsidies'>('charging');
  const [savedStations, setSavedStations] = useState<number[]>([]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bharat-navy">
      {/* Header */}
      <div className="bg-gradient-to-br from-lime-600 via-green-600 to-emerald-700 px-4 pb-6 pt-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl font-bold text-white">🔌 EV & Green Tech</h1>
            <p className="text-xs text-white/70">ग्रीन भारत — Clean Energy</p>
          </div>
          <div className="bg-white/20 rounded-full px-3 py-1.5 border border-white/30">
            <p className="text-white text-xs font-medium">🌱 Carbon: 0.4t saved</p>
          </div>
        </div>

        {/* My EV summary */}
        <div className="bg-white/15 rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🛵</span>
            <div>
              <p className="text-white font-bold">Ola S1 Pro</p>
              <p className="text-white/70 text-xs">RJ14 EV 2024</p>
            </div>
            <span className="ml-auto text-xs bg-green-400/30 text-green-100 px-2 py-1 rounded-full font-medium">Active</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[['🔋 Battery', '68%'], ['🛣️ Range', '92 km'], ['💰 Saved Today', '₹45']].map(([k, v]) => (
              <div key={k} className="bg-white/20 rounded-xl p-2.5 text-center">
                <p className="text-white/70 text-xs">{k}</p>
                <p className="text-white font-bold text-sm">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-4">
        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-4 overflow-x-auto">
          {(['charging', 'fleet', 'solar', 'subsidies'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 flex-1 py-2 rounded-lg text-xs font-semibold transition ${activeTab === tab ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow' : 'text-gray-500'}`}
            >
              {tab === 'charging' ? '⚡ Charging' : tab === 'fleet' ? '🚗 Fleet' : tab === 'solar' ? '☀️ Solar' : '💸 Subsidies'}
            </button>
          ))}
        </div>

        {activeTab === 'charging' && (
          <>
            {/* Map placeholder */}
            <div className="bg-gradient-to-br from-green-100 to-lime-100 dark:from-green-900/20 dark:to-lime-900/10 rounded-2xl h-40 flex items-center justify-center mb-4 relative border border-green-200 dark:border-green-800">
              <span className="text-7xl opacity-60">🗺️</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 rounded-xl px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-lg">
                  📍 4 stations near you
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {CHARGING_STATIONS.map(station => (
                <div key={station.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-gray-900 dark:text-white">{station.name}</p>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${station.available > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                          {station.available > 0 ? `${station.available} free` : 'Full'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">📍 {station.address} · {station.distance}</p>
                    </div>
                    <button
                      onClick={() => setSavedStations(p => p.includes(station.id) ? p.filter(i => i !== station.id) : [...p, station.id])}
                      className="text-xl ml-2"
                    >
                      {savedStations.includes(station.id) ? '🔖' : '📌'}
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400 mb-3">
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">⚡ {station.speed}</span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">💰 {station.price}</span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">⭐ {station.rating}</span>
                    {station.amenities.map(a => (
                      <span key={a} className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">{a}</span>
                    ))}
                  </div>

                  {/* Slot availability */}
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: station.total }, (_, i) => (
                      <div key={i} className={`h-2 flex-1 rounded-full ${i < station.available ? 'bg-green-400' : 'bg-red-300'}`} />
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-xl border border-green-500 text-green-600 text-sm font-semibold hover:bg-green-50 transition">🗺️ Navigate</button>
                    <button className="flex-1 py-2 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition" disabled={station.available === 0}>
                      {station.available > 0 ? '⚡ Reserve Slot' : 'Notify Me'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'fleet' && (
          <div className="space-y-4">
            {EV_FLEET.map((vehicle, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
                <div className="flex items-start gap-3">
                  <div className="h-14 w-14 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-3xl">{vehicle.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-gray-900 dark:text-white">{vehicle.vehicle}</p>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${vehicle.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                        {vehicle.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{vehicle.type}</p>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Battery</span>
                        <span className="font-semibold">{vehicle.battery}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                        <div
                          className={`h-2 rounded-full ${vehicle.battery > 60 ? 'bg-green-400' : vehicle.battery > 30 ? 'bg-yellow-400' : 'bg-red-400'}`}
                          style={{ width: `${vehicle.battery}%` }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
                        <p className="text-gray-500">Range left</p>
                        <p className="font-bold text-gray-800 dark:text-white">{vehicle.range}</p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2">
                        <p className="text-gray-500">Today&apos;s earnings</p>
                        <p className="font-bold text-green-600">{vehicle.earnings}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Carbon credits */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/10 rounded-2xl p-4 border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🌱</span>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Carbon Credits Earned</p>
                  <p className="text-xs text-gray-500">Your EV usage reduces carbon emissions</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                {[['CO₂ Saved', '124 kg'], ['Credits', '12.4 pts'], ['Value', '₹248']].map(([k, v]) => (
                  <div key={k} className="bg-white/70 dark:bg-gray-700/50 rounded-xl p-2">
                    <p className="text-gray-500">{k}</p>
                    <p className="font-bold text-emerald-600">{v}</p>
                  </div>
                ))}
              </div>
              <button className="mt-3 w-full py-2 bg-emerald-600 text-white rounded-xl text-sm font-semibold">Redeem Credits</button>
            </div>
          </div>
        )}

        {activeTab === 'solar' && (
          <div className="space-y-3">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl px-4 py-3 mb-1">
              <p className="font-bold text-yellow-800 dark:text-yellow-300">☀️ PM Surya Ghar Scheme</p>
              <p className="text-xs text-yellow-700 dark:text-yellow-400">Get up to ₹78,000 central subsidy on rooftop solar!</p>
            </div>
            {SOLAR_PRODUCTS.map((product, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-14 w-14 rounded-2xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-3xl">{product.icon}</div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 dark:text-white">{product.name}</p>
                    <p className="text-sm text-gray-500">by {product.company}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
                    <p className="text-gray-500">Total Cost</p>
                    <p className="font-bold text-gray-800 dark:text-white">₹{product.price.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2">
                    <p className="text-gray-500">After Subsidy</p>
                    <p className="font-bold text-green-600">₹{product.netPrice.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2">
                    <p className="text-gray-500">Annual Savings</p>
                    <p className="font-bold text-blue-600">{product.savings}</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-2">
                    <p className="text-gray-500">Payback Period</p>
                    <p className="font-bold text-purple-600">{product.payback}</p>
                  </div>
                </div>
                <button className="w-full py-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition">
                  Get Free Quote
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'subsidies' && (
          <div className="space-y-3">
            {EV_SUBSIDIES.map((scheme, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 border-l-4 border-green-400">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-2xl">{scheme.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-gray-900 dark:text-white">{scheme.name}</p>
                      {scheme.eligible && <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-medium">✓ Eligible</span>}
                    </div>
                    <p className="text-sm text-bharat-saffron font-semibold mt-0.5">{scheme.benefit}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Valid till: {scheme.expiry}</p>
                  </div>
                </div>
                <button className="mt-3 w-full py-2 bg-bharat-saffron text-white rounded-xl text-sm font-semibold hover:opacity-90 transition">Apply Now</button>
              </div>
            ))}

            {/* EV loan calculator */}
            <div className="bg-gradient-to-r from-green-50 to-lime-50 dark:from-green-900/20 dark:to-lime-900/10 rounded-2xl p-4 border border-green-200 dark:border-green-800">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">⚡ EV Loan Calculator</h3>
              <div className="space-y-2.5 text-sm">
                {[
                  ['Vehicle Price', '₹1,20,000'],
                  ['Less: Subsidy', '-₹25,000'],
                  ['Loan Amount', '₹95,000'],
                  ['EMI (36 months @7%)', '₹2,934/month'],
                  ['Fuel Saving/month', '~₹3,200/month'],
                  ['Net Monthly Benefit', '₹266/month ✓'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{k}</span>
                    <span className={`font-semibold ${v.includes('✓') ? 'text-green-600' : 'text-gray-900 dark:text-white'}`}>{v}</span>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-2.5 bg-green-600 text-white rounded-xl text-sm font-semibold">Apply for EV Loan</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
