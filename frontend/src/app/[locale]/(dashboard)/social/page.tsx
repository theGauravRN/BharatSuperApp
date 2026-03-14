'use client';
import React, { useState } from 'react';

const STORIES = [
  { id: 1, name: 'Priya', avatar: 'P', color: 'from-pink-400 to-rose-500', isOwn: false },
  { id: 2, name: 'Amit', avatar: 'A', color: 'from-blue-400 to-cyan-500', isOwn: false },
  { id: 3, name: 'Sunita', avatar: 'S', color: 'from-purple-400 to-violet-500', isOwn: false },
  { id: 4, name: 'Ravi', avatar: 'R', color: 'from-green-400 to-emerald-500', isOwn: false },
  { id: 5, name: 'Deepa', avatar: 'D', color: 'from-orange-400 to-amber-500', isOwn: false },
  { id: 6, name: 'Karan', avatar: 'K', color: 'from-indigo-400 to-blue-500', isOwn: false },
];

const POSTS = [
  {
    id: 1,
    user: { name: 'Priya Sharma', handle: '@priya_sharma', avatar: 'P', color: 'from-pink-400 to-rose-500', location: 'Jaipur, Rajasthan', verified: true },
    content: 'नमस्ते दोस्तों! आज मेरे गाँव में बहुत अच्छी बारिश हुई 🌧️ फसल के लिए बहुत जरूरी था। भगवान का शुक्र है 🙏\n\nToday, heavy rains blessed our village — perfect for the crops!',
    image: null,
    tags: ['#Rajasthan', '#Farming', '#Bharat'],
    likes: 234,
    comments: 18,
    shares: 12,
    time: '2 min ago',
    liked: false,
  },
  {
    id: 2,
    user: { name: 'Amit Kumar', handle: '@amit_delhi', avatar: 'A', color: 'from-blue-400 to-cyan-500', location: 'Delhi', verified: false },
    content: 'Delhi Metro से आज की trip! नई Line 8 बहुत अच्छी है 🚇 समय पर पहुँचे ऑफिस। आप सब कहाँ से travel करते हैं?',
    image: '🚇',
    tags: ['#Delhi', '#Metro', '#Travel'],
    likes: 89,
    comments: 34,
    shares: 5,
    time: '15 min ago',
    liked: true,
  },
  {
    id: 3,
    user: { name: 'Sunita Devi', handle: '@sunita_farmer', avatar: 'S', color: 'from-yellow-400 to-amber-500', location: 'Varanasi, UP', verified: false },
    content: 'आज मंडी में गेहूँ का भाव ₹2,180/क्विंटल मिला 🌾 पिछले हफ्ते से ₹30 ज्यादा। किसान भाइयों को बधाई! BharatApp पर मंडी भाव देखते रहें।',
    image: null,
    tags: ['#Kisan', '#MandiPrice', '#UP'],
    likes: 456,
    comments: 67,
    shares: 89,
    time: '1 hr ago',
    liked: false,
  },
  {
    id: 4,
    user: { name: 'Ravi Patel', handle: '@ravipatel_guj', avatar: 'R', color: 'from-green-400 to-emerald-500', location: 'Surat, Gujarat', verified: true },
    content: 'BharatApp के FinTech feature से UPI payment done in 3 seconds! No more juggling multiple apps 💪 My kirana store loves it too.\n\nFinally, one app for everything 🇮🇳',
    image: null,
    tags: ['#BharatApp', '#UPI', '#SuperApp'],
    likes: 712,
    comments: 45,
    shares: 123,
    time: '2 hr ago',
    liked: false,
  },
];

const COMMUNITIES = [
  { name: 'Rajasthan Farmers', members: '12.4K', icon: '🌾', color: 'bg-yellow-100 text-yellow-700' },
  { name: 'Delhi Techies', members: '8.2K', icon: '💻', color: 'bg-blue-100 text-blue-700' },
  { name: 'Mumbai Foodies', members: '24K', icon: '🍛', color: 'bg-orange-100 text-orange-700' },
  { name: 'Women Entrepreneurs', members: '18.5K', icon: '👩‍💼', color: 'bg-pink-100 text-pink-700' },
  { name: 'Yoga & Wellness', members: '9.1K', icon: '🧘', color: 'bg-teal-100 text-teal-700' },
];

export default function SocialPage() {
  const [posts, setPosts] = useState(POSTS);
  const [newPost, setNewPost] = useState('');
  const [activeTab, setActiveTab] = useState<'feed' | 'discover' | 'communities'>('feed');

  const toggleLike = (id: number) => {
    setPosts(posts.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bharat-navy">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Social <span className="text-bharat-saffron">Feed</span></h1>
          <div className="flex gap-2">
            <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-lg hover:bg-gray-200">🔍</button>
            <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-lg hover:bg-gray-200">📡</button>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex gap-1 mt-3">
          {(['feed', 'discover', 'communities'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all capitalize ${activeTab === tab ? 'bg-bharat-saffron text-white' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4">
        {/* Stories */}
        <div className="flex gap-3 overflow-x-auto pb-1 mb-4 scrollbar-none">
          {/* Add story */}
          <div className="flex-shrink-0 flex flex-col items-center gap-1">
            <div className="h-14 w-14 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-2xl text-gray-400 bg-gray-100 dark:bg-gray-800">
              +
            </div>
            <span className="text-xs text-gray-500">Your Story</span>
          </div>
          {STORIES.map(story => (
            <div key={story.id} className="flex-shrink-0 flex flex-col items-center gap-1 cursor-pointer">
              <div className={`h-14 w-14 rounded-full bg-gradient-to-br ${story.color} flex items-center justify-center text-white font-bold text-xl ring-2 ring-bharat-saffron ring-offset-2`}>
                {story.avatar}
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">{story.name}</span>
            </div>
          ))}
        </div>

        {/* Post composer */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm mb-4">
          <div className="flex gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-bharat-saffron to-bharat-orange flex items-center justify-center text-white font-bold flex-shrink-0">
              R
            </div>
            <input
              value={newPost}
              onChange={e => setNewPost(e.target.value)}
              placeholder="कुछ share करें... What's on your mind?"
              className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-2 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 outline-none focus:ring-2 focus:ring-bharat-saffron"
            />
          </div>
          <div className="flex gap-2 mt-3 pl-13">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 text-xs font-medium hover:bg-blue-100 transition">📷 Photo</button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 text-xs font-medium hover:bg-green-100 transition">🎥 Video</button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-600 text-xs font-medium hover:bg-orange-100 transition">📍 Location</button>
            <button className="ml-auto px-4 py-1.5 rounded-lg bg-bharat-saffron text-white text-xs font-semibold hover:opacity-90 transition">Post</button>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
              {/* Post header */}
              <div className="flex items-start gap-3 p-4 pb-3">
                <div className={`h-11 w-11 rounded-full bg-gradient-to-br ${post.user.color} flex items-center justify-center text-white font-bold text-base flex-shrink-0`}>
                  {post.user.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">{post.user.name}</span>
                    {post.user.verified && <span className="text-blue-500 text-sm">✓</span>}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{post.user.handle}</span>
                    <span>·</span>
                    <span>📍 {post.user.location}</span>
                    <span>·</span>
                    <span>{post.time}</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 text-lg">⋯</button>
              </div>

              {/* Content */}
              <div className="px-4 pb-3">
                <p className="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-line leading-relaxed">{post.content}</p>
                {post.image && (
                  <div className="mt-3 bg-gray-100 dark:bg-gray-700 rounded-xl h-48 flex items-center justify-center text-7xl">
                    {post.image}
                  </div>
                )}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs text-bharat-saffron hover:underline cursor-pointer">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center border-t border-gray-100 dark:border-gray-700 px-4 py-2.5 gap-1">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition ${post.liked ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  {post.liked ? '❤️' : '🤍'} {post.likes}
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  💬 {post.comments}
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  🔁 {post.shares}
                </button>
                <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  📤
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Communities section */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900 dark:text-white">Communities</h3>
            <button className="text-sm text-bharat-saffron font-medium">See all →</button>
          </div>
          <div className="space-y-2.5">
            {COMMUNITIES.map((c) => (
              <div key={c.name} className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-xl ${c.color}`}>{c.icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">{c.name}</p>
                  <p className="text-xs text-gray-500">{c.members} members</p>
                </div>
                <button className="px-3 py-1 rounded-full border border-bharat-saffron text-bharat-saffron text-xs font-medium hover:bg-orange-50 transition">Join</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
