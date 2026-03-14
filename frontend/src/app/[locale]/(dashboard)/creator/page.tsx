'use client';
import React, { useState } from 'react';

const VIDEOS = [
  { id: 1, title: 'गाँव की सुबह — Morning vibes 🌅', creator: 'Sunita Devi', handle: '@sunita_village', views: '2.4M', likes: '145K', duration: '1:23', thumb: '🌄', verified: true },
  { id: 2, title: 'Street Food Mumbai — Best Vada Pav 🍔', creator: 'Foodie Rahul', handle: '@foodierahul', views: '890K', likes: '67K', duration: '2:45', thumb: '🌮', verified: false },
  { id: 3, title: 'कृषि टिप्स — Organic Farming for Beginners', creator: 'Kisan Tech', handle: '@kisantech', views: '1.2M', likes: '89K', duration: '0:58', thumb: '🌾', verified: true },
  { id: 4, title: 'Desi Jugaad — Life hacks that actually work!', creator: 'Jugaad King', handle: '@jugaadking', views: '5.6M', likes: '420K', duration: '1:45', thumb: '🔧', verified: true },
  { id: 5, title: 'Classical Bharatnatyam — 30 second clip', creator: 'Meena Dance', handle: '@meenadance', views: '450K', likes: '34K', duration: '0:32', thumb: '💃', verified: false },
  { id: 6, title: 'DIY Solar Lamp — Only ₹50!', creator: 'Green Bharat', handle: '@greenbharat', views: '3.2M', likes: '218K', duration: '2:15', thumb: '💡', verified: true },
];

const MY_STATS = [
  { label: 'Followers', value: '12.4K', icon: '👥', color: 'text-blue-600' },
  { label: 'Total Views', value: '2.8M', icon: '👁️', color: 'text-purple-600' },
  { label: 'This Month Earn', value: '₹8,450', icon: '💰', color: 'text-green-600' },
  { label: 'Videos Posted', value: '47', icon: '🎬', color: 'text-orange-600' },
];

const TRENDING_TAGS = ['#GramBharat', '#KisanTech', '#JugaadJugad', '#DesiRecipes', '#Bhajan', '#CricketTalk', '#StartupBharat'];

export default function CreatorPage() {
  const [activeTab, setActiveTab] = useState<'feed' | 'studio' | 'earn'>('feed');
  const [playing, setPlaying] = useState<number | null>(null);
  const [likedVideos, setLikedVideos] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLikedVideos(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bharat-navy">
      {/* Header */}
      <div className="bg-gradient-to-br from-pink-600 via-rose-600 to-red-700 px-4 pb-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">🎬 Creator Hub</h1>
            <p className="text-xs text-white/70">क्रिएट करो, कमाओ, बढ़ो</p>
          </div>
          <button className="px-4 py-2 bg-white text-pink-600 rounded-full text-sm font-bold hover:bg-pink-50 transition">
            + Create Video
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-4">
        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-4">
          {(['feed', 'studio', 'earn'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition ${activeTab === tab ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow' : 'text-gray-500'}`}
            >
              {tab === 'feed' ? '🎥 Discover' : tab === 'studio' ? '🎙️ Studio' : '💰 Earn'}
            </button>
          ))}
        </div>

        {activeTab === 'feed' && (
          <>
            {/* Trending tags */}
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-0.5 mb-4">
              {TRENDING_TAGS.map(tag => (
                <button key={tag} className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 hover:bg-pink-200 transition">
                  {tag}
                </button>
              ))}
            </div>

            {/* Video grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {VIDEOS.map(video => (
                <div
                  key={video.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition group"
                  onClick={() => setPlaying(playing === video.id ? null : video.id)}
                >
                  {/* Thumbnail */}
                  <div className="relative h-44 bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
                    <span className="text-7xl">{video.thumb}</span>
                    {playing === video.id ? (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-4xl">⏸</span>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <span className="text-white text-4xl">▶</span>
                      </div>
                    )}
                    <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded font-mono">{video.duration}</span>
                    <span className="absolute top-2 right-2 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded">👁 {video.views}</span>
                  </div>
                  {/* Info */}
                  <div className="p-3">
                    <p className="text-xs font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2">{video.title}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-xs font-bold">
                        {video.creator[0]}
                      </div>
                      <p className="text-xs text-gray-500 truncate">{video.creator}</p>
                      {video.verified && <span className="text-blue-500 text-xs">✓</span>}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleLike(video.id); }}
                        className={`flex items-center gap-1 text-xs ${likedVideos.includes(video.id) ? 'text-red-500' : 'text-gray-400'}`}
                      >
                        {likedVideos.includes(video.id) ? '❤️' : '🤍'} {video.likes}
                      </button>
                      <button className="text-xs text-gray-400 hover:text-gray-600">📤 Share</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'studio' && (
          <div className="space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {MY_STATS.map(stat => (
                <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 text-center">
                  <span className="text-2xl">{stat.icon}</span>
                  <p className={`text-xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Create options */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: '📱', title: 'Short Video', desc: '15s – 3min · Reels-style', color: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/10', border: 'border-pink-200 dark:border-pink-800' },
                { icon: '📺', title: 'Go Live', desc: 'Live stream + gifting', color: 'from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/10', border: 'border-red-200 dark:border-red-800' },
                { icon: '🎙️', title: 'Voice Note', desc: 'Audio story in your language', color: 'from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/10', border: 'border-purple-200 dark:border-purple-800' },
                { icon: '📸', title: 'Photo Story', desc: 'Slideshow + music', color: 'from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/10', border: 'border-blue-200 dark:border-blue-800' },
              ].map(item => (
                <button key={item.title} className={`rounded-2xl border p-4 text-left ${item.color} ${item.border} hover:shadow-md transition`}>
                  <span className="text-3xl">{item.icon}</span>
                  <p className="font-bold text-gray-900 dark:text-white mt-2">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </button>
              ))}
            </div>

            {/* My recent videos */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900 dark:text-white">My Recent Videos</h3>
                <button className="text-xs text-bharat-saffron">View All →</button>
              </div>
              {[
                { title: 'DIY Home Repair Tips', views: '12.4K', likes: '1.2K', date: '2 days ago', thumb: '🔨' },
                { title: 'Organic farming at home', views: '8.9K', likes: '892', date: '5 days ago', thumb: '🌱' },
              ].map((v, i) => (
                <div key={i} className={`flex items-center gap-3 py-2.5 ${i > 0 ? 'border-t border-gray-100 dark:border-gray-700' : ''}`}>
                  <div className="h-14 w-14 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-3xl">{v.thumb}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{v.title}</p>
                    <p className="text-xs text-gray-400">👁 {v.views} · ❤️ {v.likes} · {v.date}</p>
                  </div>
                  <button className="text-gray-400 text-lg">⋯</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'earn' && (
          <div className="space-y-4">
            {/* Earnings overview */}
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-5 text-white">
              <p className="text-sm opacity-80">Total Earnings</p>
              <p className="text-4xl font-bold mt-1">₹28,450</p>
              <p className="text-sm opacity-80 mt-1">This month: ₹8,450 ↑ 23% vs last month</p>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[['💝 Tips', '₹3,200'], ['👑 Subs', '₹2,500'], ['🤝 Brand', '₹2,750']].map(([k, v]) => (
                  <div key={k} className="bg-white/20 rounded-xl p-2 text-center">
                    <p className="text-xs opacity-70">{k}</p>
                    <p className="font-bold">{v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Monetization features */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Monetization</h3>
              <div className="space-y-3">
                {[
                  { icon: '💝', title: 'Fan Tips', desc: 'Receive tips from followers', enabled: true },
                  { icon: '👑', title: 'Paid Subscription', desc: '₹99/month premium content', enabled: true },
                  { icon: '🤝', title: 'Brand Deals', desc: 'Connect with brands for sponsorship', enabled: false },
                  { icon: '🛒', title: 'Creator Shop', desc: 'Sell your own products', enabled: false },
                ].map(item => (
                  <div key={item.title} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-xl">{item.icon}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 dark:text-white">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    {item.enabled ? (
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-medium">Active</span>
                    ) : (
                      <button className="px-3 py-1 bg-bharat-saffron text-white text-xs rounded-lg font-semibold">Enable</button>
                    )}
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
