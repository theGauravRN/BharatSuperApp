'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Search, Mic, Plus, Minus, MapPin, Star, Clock, Tag, Package, CheckCircle2, ChevronRight } from 'lucide-react';

const STORES = [
  { id: 1, name: 'Ramesh Kirana Store', rating: 4.7, dist: '0.3 km', time: '12 min', img: 'https://images.unsplash.com/photo-1604719312566-8912e9c8a213?w=200&q=80', offer: '5% off on ₹500+' },
  { id: 2, name: 'Sharma General Store', rating: 4.5, dist: '0.5 km', time: '15 min', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&q=80', offer: '₹30 off on first order' },
  { id: 3, name: 'Fresh Vegetables Depot', rating: 4.8, dist: '0.8 km', time: '20 min', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&q=80', offer: 'Free delivery ₹300+' },
];

const PRODUCTS = [
  { id: 1, name: 'Amul Taza Milk 1L',    price: 58,  mrp: 62,  img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&q=80', cat: 'Dairy' },
  { id: 2, name: 'Fortune Atta 5kg',     price: 240, mrp: 265, img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&q=80', cat: 'Grocery' },
  { id: 3, name: 'Parle-G Biscuits 800g', price: 55, mrp: 60,  img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200&q=80', cat: 'Snacks' },
  { id: 4, name: 'Surf Excel 1kg',       price: 165, mrp: 180, img: 'https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=200&q=80', cat: 'Household' },
  { id: 5, name: 'Tata Salt 1kg',        price: 22,  mrp: 24,  img: 'https://images.unsplash.com/photo-1555951015-6da899b5c2cd?w=200&q=80', cat: 'Grocery' },
  { id: 6, name: 'Fresh Tomatoes 1kg',   price: 35,  mrp: 40,  img: 'https://images.unsplash.com/photo-1546094096-0df4bcaad337?w=200&q=80', cat: 'Grocery' },
  { id: 7, name: 'Colgate Toothpaste',   price: 110, mrp: 120, img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&q=80', cat: 'Personal Care' },
  { id: 8, name: 'Frooti Mango 6-pack',  price: 72,  mrp: 78,  img: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=200&q=80', cat: 'Snacks' },
];

const CATS = ['All', 'Grocery', 'Dairy', 'Snacks', 'Household', 'Personal Care'];

export default function ShopPage() {
  const [tab, setTab] = useState<'shop' | 'cart' | 'orders'>('shop');
  const [activeCat, setActiveCat] = useState('All');
  const [cart, setCart] = useState<{ id: number; name: string; price: number; qty: number; img: string }[]>([
    { id: 1, name: 'Amul Taza Milk 1L', price: 58, qty: 2, img: PRODUCTS[0].img },
  ]);
  const [search, setSearch] = useState('');

  const addToCart = (p: typeof PRODUCTS[0]) => setCart(prev => {
    const ex = prev.find(i => i.id === p.id);
    if (ex) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
    return [...prev, { id: p.id, name: p.name, price: p.price, qty: 1, img: p.img }];
  });
  const changeQty = (id: number, d: number) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + d) } : i).filter(i => i.qty > 0));

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const filtered = PRODUCTS.filter(p => (activeCat === 'All' || p.cat === activeCat) && p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-orange-100/60 bg-white/80 px-4 py-3 backdrop-blur-md dark:border-gray-700/60 dark:bg-gray-900/80">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Hyperlocal Shop</h1>
            <p className="flex items-center gap-1 text-xs text-gray-400"><MapPin size={11} /> Jaipur · 30-min delivery</p>
          </div>
          <button onClick={() => setTab('cart')} className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-bharat-saffron text-white">
            <ShoppingCart size={18} />
            {cartCount > 0 && <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-black text-white">{cartCount}</span>}
          </button>
        </div>
        <div className="flex gap-1">
          {(['shop', 'cart', 'orders'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`rounded-full px-4 py-1.5 text-sm font-semibold transition capitalize ${tab === t ? 'bg-bharat-saffron text-white' : 'text-gray-500 hover:bg-orange-50 dark:hover:bg-white/5'}`}>
              {t === 'cart' ? `Cart (${cartCount})` : t}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-4">
        {tab === 'shop' && (
          <>
            {/* Search */}
            <div className="relative mb-3 flex gap-2">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products... या बोलें" className="w-full rounded-xl border border-orange-100 bg-white/80 pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-bharat-saffron/30 dark:border-gray-700 dark:bg-white/5" />
              </div>
              <button className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-bharat-saffron/10 text-bharat-saffron hover:bg-bharat-saffron/20 transition"><Mic size={18} /></button>
            </div>

            {/* Promo */}
            <div className="mb-4 overflow-hidden rounded-2xl">
              <div className="relative h-28">
                <Image src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80" alt="promo" fill className="object-cover" />
                <div className="absolute inset-0 flex items-center justify-between bg-gradient-to-r from-bharat-saffron/90 to-bharat-orange/80 px-5">
                  <div className="text-white">
                    <p className="font-black text-lg">First Order Special!</p>
                    <p className="text-sm opacity-90">₹50 cashback above ₹300</p>
                  </div>
                  <button className="rounded-xl bg-white px-4 py-2 text-sm font-black text-bharat-saffron shadow-md hover:bg-orange-50 transition">Claim</button>
                </div>
              </div>
            </div>

            {/* Stores */}
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">Nearby Stores</p>
            <div className="mb-4 flex gap-3 overflow-x-auto pb-1">
              {STORES.map(s => (
                <div key={s.id} className="flex w-52 flex-shrink-0 items-center gap-2.5 rounded-2xl bg-white/80 p-3 ring-1 ring-orange-100/40 shadow-sm dark:bg-white/5 dark:ring-white/10">
                  <Image src={s.img} alt={s.name} width={48} height={48} className="h-12 w-12 rounded-xl object-cover" />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-gray-800 dark:text-white">{s.name}</p>
                    <p className="flex items-center gap-1 text-[10px] text-gray-400"><Star size={9} className="fill-yellow-400 text-yellow-400" />{s.rating} · {s.dist}</p>
                    <p className="text-[10px] font-medium text-green-600"><Clock size={9} className="inline mr-0.5" />{s.time} · <Tag size={9} className="inline mr-0.5" />{s.offer}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Categories */}
            <div className="mb-3 flex gap-2 overflow-x-auto pb-0.5">
              {CATS.map(c => (
                <button key={c} onClick={() => setActiveCat(c)} className={`flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition ${activeCat === c ? 'bg-bharat-saffron text-white' : 'bg-white/80 text-gray-500 ring-1 ring-orange-100/60 hover:bg-orange-50 dark:bg-white/5 dark:ring-white/10'}`}>{c}</button>
              ))}
            </div>

            {/* Products */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {filtered.map(p => {
                const inCart = cart.find(i => i.id === p.id);
                const disc = Math.round(((p.mrp - p.price) / p.mrp) * 100);
                return (
                  <div key={p.id} className="overflow-hidden rounded-2xl bg-white/80 shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5 dark:ring-white/10">
                    <div className="relative h-28">
                      <Image src={p.img} alt={p.name} fill className="object-cover" />
                      {disc > 0 && <span className="absolute right-2 top-2 rounded-full bg-green-500 px-1.5 py-0.5 text-[10px] font-black text-white">{disc}% off</span>}
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-bold text-gray-800 dark:text-white leading-snug">{p.name}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div>
                          <span className="text-sm font-black text-gray-900 dark:text-white">₹{p.price}</span>
                          <span className="ml-1 text-xs text-gray-400 line-through">₹{p.mrp}</span>
                        </div>
                        {inCart ? (
                          <div className="flex items-center gap-1">
                            <button onClick={() => changeQty(p.id, -1)} className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700"><Minus size={10} /></button>
                            <span className="w-4 text-center text-sm font-bold text-bharat-saffron">{inCart.qty}</span>
                            <button onClick={() => changeQty(p.id, 1)} className="flex h-6 w-6 items-center justify-center rounded-full bg-bharat-saffron text-white"><Plus size={10} /></button>
                          </div>
                        ) : (
                          <button onClick={() => addToCart(p)} className="flex h-7 w-7 items-center justify-center rounded-full bg-bharat-saffron text-white hover:opacity-90 transition"><Plus size={14} /></button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {tab === 'cart' && (
          cart.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center">
              <ShoppingCart size={64} className="text-gray-200 dark:text-gray-700" strokeWidth={1} />
              <p className="mt-4 font-bold text-gray-500">Your cart is empty</p>
              <button onClick={() => setTab('shop')} className="mt-4 rounded-xl bg-bharat-saffron px-6 py-2.5 text-sm font-bold text-white">Start Shopping</button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="overflow-hidden rounded-2xl bg-white/80 shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5 dark:ring-white/10">
                {cart.map((item, i) => (
                  <div key={item.id} className={`flex items-center gap-3 px-4 py-3 ${i < cart.length - 1 ? 'border-b border-orange-50/80 dark:border-white/5' : ''}`}>
                    <Image src={item.img} alt={item.name} width={48} height={48} className="h-12 w-12 rounded-xl object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">{item.name}</p>
                      <p className="text-xs text-gray-400">₹{item.price} × {item.qty}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => changeQty(item.id, -1)} className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700"><Minus size={12} /></button>
                      <span className="w-5 text-center text-sm font-bold">{item.qty}</span>
                      <button onClick={() => changeQty(item.id, 1)} className="flex h-7 w-7 items-center justify-center rounded-full bg-bharat-saffron text-white"><Plus size={12} /></button>
                    </div>
                    <span className="ml-1 text-sm font-bold text-gray-900 dark:text-white">₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5 dark:ring-white/10">
                {[['Item Total', `₹${cartTotal}`], ['Delivery', cartTotal >= 300 ? 'FREE ✓' : '₹20'], ['Platform Fee', '₹2']].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-1.5 text-sm text-gray-600 dark:text-gray-300"><span>{k}</span><span className={v.includes('FREE') ? 'font-semibold text-green-500' : ''}>{v}</span></div>
                ))}
                <div className="mt-2 flex justify-between border-t border-orange-50/80 pt-2 text-sm font-black text-gray-900 dark:border-white/5 dark:text-white">
                  <span>Total</span><span>₹{cartTotal + (cartTotal >= 300 ? 0 : 20) + 2}</span>
                </div>
              </div>
              <button className="w-full rounded-2xl bg-gradient-to-r from-bharat-saffron to-bharat-orange py-4 text-base font-black text-white shadow-md hover:opacity-90 transition">
                Place Order · ₹{cartTotal + (cartTotal >= 300 ? 0 : 20) + 2}
              </button>
            </div>
          )
        )}

        {tab === 'orders' && (
          <div className="space-y-3">
            {[
              { id: '#ORD2431', store: 'Ramesh Kirana', items: 'Milk, Atta, Salt', status: 'Delivered', time: 'Today 11:30 AM', amount: 320, img: STORES[0].img },
              { id: '#ORD2398', store: 'Fresh Veggies', items: 'Tomatoes, Onions', status: 'Out for Delivery', time: 'Today 2:15 PM', amount: 180, img: STORES[2].img },
            ].map(o => (
              <div key={o.id} className="flex items-center gap-3 rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5 dark:ring-white/10">
                <Image src={o.img} alt={o.store} width={56} height={56} className="h-14 w-14 rounded-xl object-cover" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-gray-800 dark:text-white">{o.id}</p>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${o.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                      {o.status === 'Delivered' ? <CheckCircle2 size={11} className="mr-0.5 inline" /> : <Package size={11} className="mr-0.5 inline" />}{o.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{o.store}</p>
                  <div className="flex items-center justify-between mt-0.5">
                    <p className="text-xs text-gray-400">{o.time}</p>
                    <p className="text-sm font-black text-gray-900 dark:text-white">₹{o.amount}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
