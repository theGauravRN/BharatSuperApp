'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  Heart, MessageCircle, Share2, Bookmark, Play, Pause,
  Upload, BarChart2, IndianRupee, Users, Video, Plus,
  BadgeCheck, Volume2, VolumeX, Maximize2, Crown,
} from 'lucide-react';

const VIDEOS = [
  {
    id: 1,
    creator: 'Shivani Raj',
    handle: '@shivani_dances',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    verified: true,
    caption: 'Haryanvi folk dance at Teej festival 🎊 Watch till end! #TeejFestival #Folk #Bharat',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    likes: 45200, comments: 1240, shares: 890, views: '1.2M',
  },
  {
    id: 2,
    creator: 'Raju Kisan',
    handle: '@rajukisan_vlogs',
    avatar: 'https://randomuser.me/api/portraits/men/28.jpg',
    verified: false,
    caption: 'मेरे खेत में आज गेहूँ की कटाई! 🌾 Come join me. #KisanVlog #Farming',
    thumbnail: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    likes: 12800, comments: 456, shares: 234, views: '234K',
  },
  {
    id: 3,
    creator: 'Tech Wali Didi',
    handle: '@techwali',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    verified: true,
    caption: 'Simple tricks to speed up your Android phone 📱 Must watch! #TechTips #Android',
    thumbnail: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    likes: 89400, comments: 3200, shares: 1900, views: '3.4M',
  },
];

const MY_STATS = [
  { label: 'Followers', value: '12.4K', Icon: Users,       color: 'text-violet-600', bg: 'bg-violet-50' },
  { label: 'Views',     value: '1.2M',  Icon: Play,        color: 'text-blue-600',   bg: 'bg-blue-50' },
  { label: 'Earnings',  value: '₹8,240', Icon: IndianRupee, color: 'text-green-600',  bg: 'bg-green-50' },
  { label: 'Videos',    value: '48',    Icon: Video,       color: 'text-pink-600',   bg: 'bg-pink-50' },
];

function VideoCard({ vid }: { vid: typeof VIDEOS[0] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(vid.likes);

  const toggle = () => {
    if (videoRef.current) {
      if (playing) { videoRef.current.pause(); setPlaying(false); }
      else { videoRef.current.play(); setPlaying(true); }
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-white/80 shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5 dark:ring-white/10">
      {/* Video player */}
      <div className="relative bg-black" style={{ aspectRatio: '16/9' }}>
        <video
          ref={videoRef}
          src={vid.videoUrl}
          poster={vid.thumbnail}
          loop
          muted={muted}
          playsInline
          className="h-full w-full object-cover"
          style={{ aspectRatio: '16/9' }}
        />
        {/* Overlay controls */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button onClick={toggle} className="flex h-14 w-14 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60">
            {playing ? <Pause size={24} /> : <Play size={24} fill="white" />}
          </button>
        </div>
        {/* Bottom overlay */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-black/60 px-3 py-2">
          <span className="rounded-full bg-black/50 px-2 py-0.5 text-[11px] font-bold text-white">{vid.views} views</span>
          <div className="flex gap-2">
            <button onClick={() => setMuted(!muted)} className="flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white">
              {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
            </button>
            <button className="flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white"><Maximize2 size={13} /></button>
          </div>
        </div>
      </div>
      {/* Info */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Image src={vid.avatar} alt={vid.creator} width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
          <div>
            <div className="flex items-center gap-1">
              <p className="text-sm font-bold text-gray-900 dark:text-white">{vid.creator}</p>
              {vid.verified && <BadgeCheck size={14} className="text-blue-500" fill="#3b82f6" />}
            </div>
            <p className="text-xs text-gray-400">{vid.handle}</p>
          </div>
          <button className="ml-auto rounded-full border border-bharat-saffron px-3 py-1 text-xs font-bold text-bharat-saffron hover:bg-orange-50 transition">Follow</button>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-200 line-clamp-2">{vid.caption}</p>
        <div className="mt-3 flex items-center gap-1 border-t border-orange-50/80 pt-3 dark:border-white/5">
          <button onClick={() => { setLiked(!liked); setLikes(l => liked ? l - 1 : l + 1); }} className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition ${liked ? 'text-red-500' : 'text-gray-500 hover:bg-orange-50'}`}>
            <Heart size={15} fill={liked ? '#ef4444' : 'none'} /> {(likes / 1000).toFixed(1)}K
          </button>
          <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-orange-50 transition">
            <MessageCircle size={15} /> {vid.comments}
          </button>
          <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-orange-50 transition">
            <Share2 size={15} />
          </button>
          <button onClick={() => setSaved(!saved)} className="ml-auto rounded-lg p-2 text-gray-400 hover:bg-orange-50 transition">
            <Bookmark size={15} fill={saved ? '#FF9933' : 'none'} className={saved ? 'text-bharat-saffron' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CreatorPage() {
  const [tab, setTab] = useState<'feed' | 'studio' | 'earnings'>('feed');

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1536240478700-b869ad10a2eb?w=1200&q=80" alt="creator" width={1200} height={180} className="h-44 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-700/85 via-rose-600/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-4 pb-4">
          <h1 className="text-xl font-bold text-white">Creator Economy</h1>
          <p className="text-xs text-white/80">Create · Share · Earn — भारत की भाषा में</p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-4">
        <div className="mb-4 flex gap-1 rounded-xl bg-orange-50/80 p-1 dark:bg-white/5">
          {([['feed','Video Feed'],['studio','My Studio'],['earnings','Earnings']] as const).map(([t, l]) => (
            <button key={t} onClick={() => setTab(t)} className={`flex-1 rounded-lg py-2 text-xs font-bold transition ${tab === t ? 'bg-white text-gray-900 shadow dark:bg-gray-700 dark:text-white' : 'text-gray-500'}`}>{l}</button>
          ))}
        </div>

        {tab === 'feed' && (
          <div className="space-y-4">
            {VIDEOS.map(v => <VideoCard key={v.id} vid={v} />)}
          </div>
        )}

        {tab === 'studio' && (
          <div className="space-y-4">
            {/* Upload CTA */}
            <button className="flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-bharat-saffron/40 bg-orange-50/60 py-8 hover:bg-orange-50 transition dark:bg-orange-900/10">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-bharat-saffron/20">
                <Upload size={28} className="text-bharat-saffron" />
              </div>
              <p className="font-bold text-gray-800 dark:text-white">Upload Video</p>
              <p className="text-sm text-gray-400">MP4, MOV up to 512 MB</p>
            </button>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {MY_STATS.map(s => (
                <div key={s.label} className={`flex items-center gap-3 rounded-2xl border border-orange-100/60 bg-white/80 p-4 dark:bg-white/5 dark:border-white/10`}>
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.bg} dark:bg-white/5`}>
                    <s.Icon size={22} className={s.color} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
                    <p className="text-xs text-gray-500">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* My videos */}
            <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5 dark:ring-white/10">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">My Videos</p>
                <button className="flex items-center gap-1 rounded-lg bg-bharat-saffron px-3 py-1.5 text-xs font-bold text-white"><Plus size={12} /> Upload</button>
              </div>
              <div className="space-y-3">
                {[
                  { title: 'Teej festival dance video', views: '45K', likes: '2.1K', thumb: VIDEOS[0].thumbnail },
                  { title: 'Cooking rajasthani dal baati', views: '12K', likes: '890',   thumb: VIDEOS[1].thumbnail },
                  { title: 'Village morning routine vlog', views: '8.2K', likes: '540', thumb: VIDEOS[2].thumbnail },
                ].map((v, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Image src={v.thumb} alt={v.title} width={60} height={60} className="h-14 w-20 rounded-xl object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800 dark:text-white line-clamp-1">{v.title}</p>
                      <div className="flex gap-3 mt-0.5">
                        <span className="text-xs text-gray-400"><Play size={10} className="inline mr-0.5" />{v.views} views</span>
                        <span className="text-xs text-gray-400"><Heart size={10} className="inline mr-0.5" />{v.likes}</span>
                      </div>
                    </div>
                    <BarChart2 size={18} className="text-gray-300 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'earnings' && (
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-5 text-white shadow-lg">
              <p className="text-sm opacity-80">Total Earned (March)</p>
              <p className="mt-1 text-4xl font-black">₹8,240</p>
              <p className="mt-0.5 text-sm text-emerald-100">+₹1,340 from last month (+19.4%)</p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                {[['Creator Fund','₹3,200'],['Brand Deals','₹4,500'],['Gifts','₹540']].map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-white/20 py-2"><p className="opacity-70">{k}</p><p className="font-black">{v}</p></div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
              <div className="flex items-center gap-2 mb-2">
                <Crown size={20} className="text-yellow-500" />
                <p className="font-bold text-gray-900 dark:text-white">Upgrade to Creator Pro</p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Get 2x monetization rate, brand deal access, and verified badge</p>
              <button className="mt-3 w-full rounded-xl bg-yellow-500 py-2.5 text-sm font-black text-white hover:bg-yellow-600 transition">Upgrade — ₹99/month</button>
            </div>
            <div className="overflow-hidden rounded-2xl bg-white/80 shadow-sm ring-1 ring-orange-100/40 dark:bg-white/5 dark:ring-white/10">
              <div className="border-b border-orange-50/80 px-4 py-3 dark:border-white/5">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Payment History</p>
              </div>
              {[
                { month: 'February 2026', amount: '₹6,900', status: 'Paid', date: 'Mar 7' },
                { month: 'January 2026',  amount: '₹5,440', status: 'Paid', date: 'Feb 7' },
                { month: 'December 2025', amount: '₹4,200', status: 'Paid', date: 'Jan 7' },
              ].map((p, i) => (
                <div key={i} className={`flex items-center justify-between px-4 py-3 ${i < 2 ? 'border-b border-orange-50/80 dark:border-white/5' : ''}`}>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">{p.month}</p>
                    <p className="text-xs text-gray-400">{p.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-gray-900 dark:text-white">{p.amount}</span>
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-600">{p.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
