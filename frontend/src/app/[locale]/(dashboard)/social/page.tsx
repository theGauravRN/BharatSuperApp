'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import {
  Heart, MessageCircle, Share2, Bookmark, MoreHorizontal,
  MapPin, BadgeCheck, Camera, Video, Navigation, Search,
  Users, Plus, Send,
} from 'lucide-react';

const STORIES = [
  { id: 1, name: 'Priya',  img: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 2, name: 'Amit',   img: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 3, name: 'Sunita', img: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { id: 4, name: 'Ravi',   img: 'https://randomuser.me/api/portraits/men/71.jpg' },
  { id: 5, name: 'Deepa',  img: 'https://randomuser.me/api/portraits/women/22.jpg' },
  { id: 6, name: 'Karan',  img: 'https://randomuser.me/api/portraits/men/15.jpg' },
];

const POSTS = [
  {
    id: 1,
    user: { name: 'Priya Sharma', handle: '@priya_sharma', img: 'https://randomuser.me/api/portraits/women/44.jpg', location: 'Jaipur, Rajasthan', verified: true },
    content: 'नमस्ते दोस्तों! आज मेरे गाँव में बहुत अच्छी बारिश हुई 🌧️ फसल के लिए बहुत जरूरी था। भगवान का शुक्र है 🙏\n\nToday, heavy rains blessed our village — perfect for the crops!',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80',
    tags: ['#Rajasthan', '#Farming', '#Bharat'],
    likes: 234, comments: 18, shares: 12, time: '2 min ago', liked: false,
  },
  {
    id: 2,
    user: { name: 'Amit Kumar', handle: '@amit_delhi', img: 'https://randomuser.me/api/portraits/men/32.jpg', location: 'Delhi', verified: false },
    content: 'Delhi Metro से आज की trip! नई Line 8 बहुत अच्छी है 🚇 समय पर पहुँचे ऑफिस। आप सब कहाँ से travel करते हैं?',
    image: 'https://images.unsplash.com/photo-1567473030492-533b30c5494c?w=600&q=80',
    tags: ['#Delhi', '#Metro', '#Travel'],
    likes: 89, comments: 34, shares: 5, time: '15 min ago', liked: true,
  },
  {
    id: 3,
    user: { name: 'Sunita Devi', handle: '@sunita_farmer', img: 'https://randomuser.me/api/portraits/women/68.jpg', location: 'Varanasi, UP', verified: false },
    content: 'आज मंडी में गेहूँ का भाव ₹2,180/क्विंटल मिला 🌾 पिछले हफ्ते से ₹30 ज्यादा। किसान भाइयों को बधाई! BharatApp पर मंडी भाव देखते रहें।',
    image: null,
    tags: ['#Kisan', '#MandiPrice', '#UP'],
    likes: 456, comments: 67, shares: 89, time: '1 hr ago', liked: false,
  },
];

const COMMUNITIES = [
  { name: 'Rajasthan Farmers',   members: '12.4K', img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=80&q=80' },
  { name: 'Delhi Techies',       members: '8.2K',  img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=80&q=80' },
  { name: 'Mumbai Foodies',      members: '24K',   img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=80&q=80' },
  { name: 'Women Entrepreneurs', members: '18.5K', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80' },
];

export default function SocialPage() {
  const [posts, setPosts] = useState(POSTS);
  const [saved, setSaved] = useState<number[]>([]);
  const [newPost, setNewPost] = useState('');

  const toggleLike = (id: number) =>
    setPosts(ps => ps.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-orange-100/60 bg-white/80 px-4 py-3 backdrop-blur-md dark:border-gray-700/60 dark:bg-gray-900/80">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Social <span className="text-bharat-saffron">Feed</span></h1>
          <div className="flex gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-gray-600 hover:bg-orange-100 dark:bg-white/5">
              <Search size={17} />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-gray-600 hover:bg-orange-100 dark:bg-white/5">
              <Users size={17} />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-4">
        {/* Stories */}
        <div className="mb-4 flex gap-3 overflow-x-auto pb-1">
          <div className="flex flex-shrink-0 flex-col items-center gap-1">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-bharat-saffron/40 bg-orange-50 dark:bg-white/5">
              <Plus size={20} className="text-bharat-saffron" />
            </div>
            <span className="text-xs text-gray-500">Your Story</span>
          </div>
          {STORIES.map(s => (
            <div key={s.id} className="flex flex-shrink-0 flex-col items-center gap-1 cursor-pointer">
              <div className="rounded-full p-0.5 bg-gradient-to-tr from-bharat-saffron to-bharat-orange">
                <Image src={s.img} alt={s.name} width={52} height={52} className="rounded-full ring-2 ring-white dark:ring-gray-900" />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">{s.name}</span>
            </div>
          ))}
        </div>

        {/* Post composer */}
        <div className="mb-4 rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100/40 backdrop-blur-sm dark:bg-white/5 dark:ring-white/10">
          <div className="flex gap-3">
            <Image src="https://randomuser.me/api/portraits/men/55.jpg" alt="You" width={40} height={40} className="h-10 w-10 flex-shrink-0 rounded-full" />
            <input
              value={newPost}
              onChange={e => setNewPost(e.target.value)}
              placeholder="कुछ share करें... What's on your mind?"
              className="flex-1 rounded-xl bg-orange-50/60 px-4 py-2 text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-bharat-saffron/30 dark:bg-white/5"
            />
          </div>
          <div className="mt-3 flex items-center gap-2">
            <button className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-100 transition"><Camera size={13} /> Photo</button>
            <button className="flex items-center gap-1.5 rounded-lg bg-green-50 px-3 py-1.5 text-xs font-medium text-green-600 hover:bg-green-100 transition"><Video size={13} /> Video</button>
            <button className="flex items-center gap-1.5 rounded-lg bg-orange-50 px-3 py-1.5 text-xs font-medium text-bharat-saffron hover:bg-orange-100 transition"><Navigation size={13} /> Location</button>
            <button className="ml-auto flex items-center gap-1.5 rounded-xl bg-bharat-saffron px-4 py-1.5 text-xs font-bold text-white hover:opacity-90 transition">
              <Send size={13} /> Post
            </button>
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="overflow-hidden rounded-2xl bg-white/80 shadow-sm ring-1 ring-orange-100/40 backdrop-blur-sm dark:bg-white/5 dark:ring-white/10">
              {/* Header */}
              <div className="flex items-start gap-3 p-4 pb-3">
                <Image src={post.user.img} alt={post.user.name} width={44} height={44} className="h-11 w-11 flex-shrink-0 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">{post.user.name}</span>
                    {post.user.verified && <BadgeCheck size={15} className="text-blue-500" fill="#3b82f6" />}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <span>{post.user.handle}</span>
                    <span>·</span>
                    <MapPin size={10} />
                    <span>{post.user.location}</span>
                    <span>·</span>
                    <span>{post.time}</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={18} /></button>
              </div>

              {/* Content */}
              <div className="px-4 pb-3">
                <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700 dark:text-gray-200">{post.content}</p>
                {post.image && (
                  <div className="mt-3 overflow-hidden rounded-xl">
                    <Image src={post.image} alt="post" width={600} height={300} className="h-56 w-full object-cover" />
                  </div>
                )}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {post.tags.map(t => <span key={t} className="cursor-pointer text-xs font-medium text-bharat-saffron hover:underline">{t}</span>)}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center border-t border-orange-50/80 px-3 py-2 dark:border-white/5">
                <button onClick={() => toggleLike(post.id)} className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition ${post.liked ? 'text-red-500' : 'text-gray-500 hover:bg-orange-50'}`}>
                  <Heart size={16} fill={post.liked ? '#ef4444' : 'none'} /> {post.likes}
                </button>
                <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-orange-50 transition">
                  <MessageCircle size={16} /> {post.comments}
                </button>
                <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-orange-50 transition">
                  <Share2 size={16} /> {post.shares}
                </button>
                <button
                  onClick={() => setSaved(p => p.includes(post.id) ? p.filter(i => i !== post.id) : [...p, post.id])}
                  className="ml-auto rounded-lg p-2 text-gray-400 hover:bg-orange-50 transition"
                >
                  <Bookmark size={16} fill={saved.includes(post.id) ? '#FF9933' : 'none'} className={saved.includes(post.id) ? 'text-bharat-saffron' : ''} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Communities */}
        <div className="mt-6 rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100/40 backdrop-blur-sm dark:bg-white/5 dark:ring-white/10">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-bold text-gray-900 dark:text-white">Communities</h3>
            <button className="text-sm font-medium text-bharat-saffron hover:underline">See all</button>
          </div>
          <div className="space-y-3">
            {COMMUNITIES.map(c => (
              <div key={c.name} className="flex items-center gap-3">
                <Image src={c.img} alt={c.name} width={44} height={44} className="h-11 w-11 rounded-xl object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">{c.name}</p>
                  <p className="text-xs text-gray-500">{c.members} members</p>
                </div>
                <button className="rounded-full border border-bharat-saffron px-3 py-1 text-xs font-semibold text-bharat-saffron hover:bg-orange-50 transition">Join</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
