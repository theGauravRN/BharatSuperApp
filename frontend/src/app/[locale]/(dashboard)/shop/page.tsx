'use client';
import React, { useState } from 'react';

const CATEGORIES = [
  { name: 'All', icon: '🏪' },
  { name: 'Grocery', icon: '🥦' },
  { name: 'Dairy', icon: '🥛' },
  { name: 'Snacks', icon: '🍿' },
  { name: 'Personal Care', icon: '🧴' },
  { name: 'Household', icon: '🧹' },
  { name: 'Electronics', icon: '📱' },
];

const STORES = [
  { id: 1, name: 'Ramesh Kirana Store', rating: 4.7, reviews: 234, distance: '0.3 km', time: '12 min', open: true, offers: '5% off on ₹500+', icon: '🏪' },
  { id: 2, name: 'Sharma General Store', rating: 4.5, reviews: 189, distance: '0.5 km', time: '15 min', open: true, offers: '₹30 off on first order', icon: '🛒' },
  { id: 3, name: 'Fresh Vegetables Depot', rating: 4.8, reviews: 412, distance: '0.8 km', time: '20 min', open: true, offers: 'Free delivery on ₹300', icon: '🥦' },
];

const PRODUCTS = [
  { id: 1, name: 'Amul Taza Milk 1L', price: 58, mrp: 62, unit: '1 litre', category: 'Dairy', icon: '🥛', rating: 4.8, store: 'Sharma General' },
  { id: 2, name: 'Fortune Atta 5kg', price: 240, mrp: 265, unit: '5 kg', category: 'Grocery', icon: '🌾', rating: 4.6, store: 'Ramesh Kirana' },
  { id: 3, name: 'Parle-G Biscuits 800g', price: 55, mrp: 60, unit: '800 grams', category: 'Snacks', icon: '🍪', rating: 4.7, store: 'Ramesh Kirana' },
  { id: 4, name: 'Surf Excel 1kg', price: 165, mrp: 180, unit: '1 kg', category: 'Household', icon: '🧺', rating: 4.5, store: 'Sharma General' },
  { id: 5, name: 'Colgate Toothpaste 200g', price: 110, mrp: 120, unit: '200 grams', category: 'Personal Care', icon: '🦷', rating: 4.6, store: 'Sharma General' },
  { id: 6, name: 'Tata Salt 1kg', price: 22, mrp: 24, unit: '1 kg', category: 'Grocery', icon: '🧂', rating: 4.9, store: 'Ramesh Kirana' },
  { id: 7, name: 'Loose Tomatoes', price: 35, mrp: 40, unit: '1 kg', category: 'Grocery', icon: '🍅', rating: 4.4, store: 'Fresh Veggies' },
  { id: 8, name: 'Frooti Mango 200ml ×6', price: 72, mrp: 78, unit: '6 pack', category: 'Snacks', icon: '🥭', rating: 4.7, store: 'Ramesh Kirana' },
];

const CART_INITIAL = [
  { id: 1, name: 'Amul Taza Milk 1L', price: 58, qty: 2, icon: '🥛' },
  { id: 3, name: 'Parle-G Biscuits 800g', price: 55, qty: 1, icon: '🍪' },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState(CART_INITIAL);
  const [activeTab, setActiveTab] = useState<'shop' | 'cart' | 'orders'>('shop');
  const [search, setSearch] = useState('');

  const addToCart = (product: typeof PRODUCTS[0]) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1, icon: product.icon }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0));
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const filteredProducts = PRODUCTS.filter(p =>
    (activeCategory === 'All' || p.category === activeCategory) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bharat-navy">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">🛒 Hyperlocal Shop</h1>
            <p className="text-xs text-gray-500">📍 Jaipur · 30-min delivery</p>
          </div>
          <button
            onClick={() => setActiveTab('cart')}
            className="relative h-10 w-10 rounded-xl bg-bharat-saffron flex items-center justify-center text-white text-xl"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
        <div className="flex gap-2">
          {(['shop', 'cart', 'orders'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition ${activeTab === tab ? 'bg-bharat-saffron text-white' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              {tab === 'cart' ? `🛒 Cart (${cartCount})` : tab === 'shop' ? '🏪 Shop' : '📦 Orders'}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-4">
        {activeTab === 'shop' && (
          <>
            {/* Search */}
            <div className="relative mb-3">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products, brands... या बोलें 🎤"
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-bharat-saffron"
              />
            </div>

            {/* Promo banner */}
            <div className="bg-gradient-to-r from-bharat-saffron to-bharat-orange rounded-2xl p-4 mb-4 flex items-center gap-3">
              <span className="text-4xl">🎁</span>
              <div className="flex-1 text-white">
                <p className="font-bold">First Order Special!</p>
                <p className="text-sm opacity-90">₹50 cashback on your first order above ₹300</p>
              </div>
              <button className="px-3 py-1.5 bg-white text-bharat-saffron rounded-xl text-xs font-bold">Claim</button>
            </div>

            {/* Nearby stores */}
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Nearby Stores</h3>
            <div className="flex gap-3 overflow-x-auto scrollbar-none mb-4 pb-1">
              {STORES.map(store => (
                <div key={store.id} className="flex-shrink-0 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-3 w-48 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-10 w-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-2xl">{store.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 dark:text-white truncate">{store.name}</p>
                      <p className="text-xs text-gray-500">⭐ {store.rating} · {store.distance}</p>
                    </div>
                  </div>
                  <p className="text-xs text-green-600 font-medium">🕐 {store.time} · {store.offers}</p>
                </div>
              ))}
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto scrollbar-none mb-3 pb-0.5">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition ${activeCategory === cat.name ? 'bg-bharat-saffron text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'}`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {filteredProducts.map(product => {
                const inCart = cart.find(i => i.id === product.id);
                const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
                return (
                  <div key={product.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
                    <div className="h-28 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-5xl relative">
                      {product.icon}
                      {discount > 0 && (
                        <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{discount}% off</span>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-semibold text-gray-800 dark:text-white leading-tight">{product.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{product.unit}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div>
                          <span className="font-bold text-gray-900 dark:text-white text-sm">₹{product.price}</span>
                          <span className="text-xs text-gray-400 line-through ml-1">₹{product.mrp}</span>
                        </div>
                        {inCart ? (
                          <div className="flex items-center gap-1">
                            <button onClick={() => updateQty(product.id, -1)} className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white text-sm font-bold flex items-center justify-center">−</button>
                            <span className="text-sm font-bold text-bharat-saffron w-4 text-center">{inCart.qty}</span>
                            <button onClick={() => updateQty(product.id, 1)} className="h-6 w-6 rounded-full bg-bharat-saffron text-white text-sm font-bold flex items-center justify-center">+</button>
                          </div>
                        ) : (
                          <button onClick={() => addToCart(product)} className="h-7 w-7 rounded-full bg-bharat-saffron text-white flex items-center justify-center text-base font-bold hover:opacity-90 transition">+</button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {activeTab === 'cart' && (
          <div>
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-6xl mb-3">🛒</p>
                <p className="text-gray-500 font-medium">Your cart is empty</p>
                <button onClick={() => setActiveTab('shop')} className="mt-4 px-6 py-2.5 bg-bharat-saffron text-white rounded-xl font-semibold text-sm">Start Shopping</button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
                  {cart.map((item, i) => (
                    <div key={item.id} className={`flex items-center gap-3 px-4 py-3 ${i < cart.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''}`}>
                      <div className="h-12 w-12 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-2xl">{item.icon}</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800 dark:text-white">{item.name}</p>
                        <p className="text-xs text-gray-500">₹{item.price} × {item.qty}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => updateQty(item.id, -1)} className="h-7 w-7 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white text-sm font-bold flex items-center justify-center">−</button>
                        <span className="text-sm font-bold w-5 text-center text-gray-900 dark:text-white">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="h-7 w-7 rounded-full bg-bharat-saffron text-white text-sm font-bold flex items-center justify-center">+</button>
                      </div>
                      <p className="font-bold text-gray-900 dark:text-white text-sm ml-1">₹{item.price * item.qty}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3">Bill Summary</h3>
                  {[
                    ['Item Total', `₹${cartTotal}`],
                    ['Delivery Fee', cartTotal >= 300 ? 'FREE ✓' : '₹20'],
                    ['Platform Fee', '₹2'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between py-1.5 text-sm text-gray-600 dark:text-gray-400">
                      <span>{k}</span>
                      <span className={v.includes('FREE') ? 'text-green-500 font-medium' : ''}>{v}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2 flex justify-between font-bold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>₹{cartTotal + (cartTotal >= 300 ? 0 : 20) + 2}</span>
                  </div>
                </div>

                <button className="w-full py-4 bg-gradient-to-r from-bharat-saffron to-bharat-orange text-white rounded-2xl font-bold text-base hover:opacity-90 transition shadow-md">
                  Place Order · ₹{cartTotal + (cartTotal >= 300 ? 0 : 20) + 2}
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-3">
            {[
              { id: '#ORD2431', store: 'Ramesh Kirana', items: 'Milk, Atta, Salt', status: 'Delivered', time: 'Today, 11:30 AM', amount: 320, icon: '✅' },
              { id: '#ORD2398', store: 'Fresh Veggies', items: 'Tomatoes, Onions', status: 'Out for Delivery', time: 'Today, 2:15 PM', amount: 180, icon: '🛵' },
              { id: '#ORD2341', store: 'Sharma General', items: 'Biscuits, Chips', status: 'Delivered', time: 'Yesterday', amount: 145, icon: '✅' },
            ].map(order => (
              <div key={order.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{order.icon}</span>
                    <span className="text-sm font-semibold text-gray-800 dark:text-white">{order.id}</span>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{order.store}</p>
                <p className="text-xs text-gray-400">{order.items}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-400">{order.time}</p>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">₹{order.amount}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
