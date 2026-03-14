'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Search, Phone, Video, MoreHorizontal, Smile, Mic, Send, ArrowLeft, Edit2, Circle } from 'lucide-react';

const AVATARS: Record<string, string> = {
  P: 'https://randomuser.me/api/portraits/women/44.jpg',
  A: 'https://randomuser.me/api/portraits/men/32.jpg',
  F: 'https://randomuser.me/api/portraits/men/71.jpg',
  D: 'https://randomuser.me/api/portraits/men/10.jpg',
  O: 'https://randomuser.me/api/portraits/men/60.jpg',
  R: 'https://randomuser.me/api/portraits/men/33.jpg',
};

const CONVERSATIONS = [
  { id: 1, name: 'Priya Sharma',    lastMsg: 'Kal milte hain 🙏',          time: '2:30 PM',  unread: 2, key: 'P', online: true },
  { id: 2, name: 'Amit Kumar',      lastMsg: 'UPI karo bhai',              time: '11:15 AM', unread: 0, key: 'A', online: true },
  { id: 3, name: 'Family Group 👨‍👩‍👧‍👦', lastMsg: 'Maa: Raat ko aana beta', time: 'Yesterday', unread: 5, key: 'F', online: false },
  { id: 4, name: 'Dr. Suresh',      lastMsg: 'Dawa lena mat bhoolna',      time: 'Yesterday', unread: 1, key: 'D', online: false },
  { id: 5, name: 'Office Team',     lastMsg: 'Meeting at 3 PM',            time: 'Mar 12',   unread: 0, key: 'O', online: false },
  { id: 6, name: 'Ramesh Kirana',   lastMsg: '₹450 received ✓',            time: 'Mar 12',   unread: 0, key: 'R', online: true },
];

const INITIAL_MSGS = [
  { id: 1, from: 'them', text: 'Bhai, aaj mandi ka kya rate hai?', time: '10:01 AM' },
  { id: 2, from: 'me',   text: 'Gehun ₹2,180 chal raha hai aaj',  time: '10:02 AM' },
  { id: 3, from: 'them', text: 'Accha! Kal bechna chahiye tha 😅', time: '10:03 AM' },
  { id: 4, from: 'me',   text: 'Haan, aaj thoda zyada hai. Kal dekho', time: '10:04 AM' },
  { id: 5, from: 'them', text: 'Theek hai. Kal milte hain 🙏',    time: '2:30 PM' },
];

export default function MessagesPage() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [msgs, setMsgs] = useState(INITIAL_MSGS);
  const [input, setInput] = useState('');

  const active = CONVERSATIONS.find(c => c.id === activeId);

  const send = () => {
    if (!input.trim()) return;
    setMsgs(p => [...p, { id: Date.now(), from: 'me', text: input.trim(), time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }]);
    setInput('');
  };

  return (
    <div className="flex h-[calc(100vh-56px)] overflow-hidden">
      {/* List */}
      <div className={`${activeId ? 'hidden lg:flex' : 'flex'} w-full flex-col border-r border-orange-100/60 bg-white/80 backdrop-blur-md dark:border-gray-700/60 dark:bg-gray-900/80 lg:w-80`}>
        <div className="border-b border-orange-100/60 px-4 py-3 dark:border-gray-700/60">
          <div className="mb-3 flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Messages</h1>
            <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-bharat-saffron text-white hover:opacity-90">
              <Edit2 size={15} />
            </button>
          </div>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input placeholder="Search messages..." className="w-full rounded-xl border border-orange-100 bg-orange-50/50 pl-8 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-bharat-saffron/30 dark:border-gray-700 dark:bg-white/5" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {CONVERSATIONS.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`flex w-full items-center gap-3 border-b border-orange-50/60 px-4 py-3.5 text-left transition dark:border-white/5 ${activeId === c.id ? 'bg-orange-50 dark:bg-orange-900/20' : 'hover:bg-orange-50/60 dark:hover:bg-white/5'}`}
            >
              <div className="relative">
                <Image src={AVATARS[c.key] || ''} alt={c.name} width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
                {c.online && <Circle size={10} className="absolute bottom-0 right-0 fill-green-400 text-green-400 ring-2 ring-white dark:ring-gray-900" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-gray-900 dark:text-white truncate">{c.name}</span>
                  <span className="flex-shrink-0 text-xs text-gray-400">{c.time}</span>
                </div>
                <p className="truncate text-xs text-gray-500 mt-0.5">{c.lastMsg}</p>
              </div>
              {c.unread > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-bharat-saffron px-1.5 text-[11px] font-bold text-white">{c.unread}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat */}
      {activeId && active ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-3 border-b border-orange-100/60 bg-white/80 px-4 py-3 backdrop-blur-md dark:border-gray-700/60 dark:bg-gray-900/80">
            <button onClick={() => setActiveId(null)} className="lg:hidden"><ArrowLeft size={20} className="text-gray-500" /></button>
            <Image src={AVATARS[active.key] || ''} alt={active.name} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-900 dark:text-white">{active.name}</p>
              <p className="text-xs text-gray-400">{active.online ? <span className="text-green-500">● Online</span> : 'Last seen yesterday'}</p>
            </div>
            <div className="flex gap-1">
              {[Phone, Video, MoreHorizontal].map((Icon, i) => (
                <button key={i} className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-gray-600 hover:bg-orange-100 dark:bg-white/5 transition">
                  <Icon size={17} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
            {msgs.map(m => (
              <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs rounded-2xl px-4 py-2.5 shadow-sm ${m.from === 'me' ? 'rounded-tr-sm bg-bharat-saffron text-white' : 'rounded-tl-sm bg-white/90 text-gray-800 ring-1 ring-orange-100/60 dark:bg-white/10 dark:text-gray-200 dark:ring-white/10'}`}>
                  <p className="text-sm">{m.text}</p>
                  <p className={`mt-0.5 text-[10px] ${m.from === 'me' ? 'text-white/70' : 'text-gray-400'}`}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-orange-100/60 bg-white/80 px-4 py-3 backdrop-blur-md dark:border-gray-700/60 dark:bg-gray-900/80">
            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-gray-500 hover:bg-orange-100 dark:bg-white/5 transition"><Smile size={18} /></button>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Type a message..."
              className="flex-1 rounded-xl border border-orange-100 bg-orange-50/50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-bharat-saffron/30 dark:border-gray-700 dark:bg-white/5"
            />
            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-gray-500 hover:bg-orange-100 dark:bg-white/5 transition"><Mic size={18} /></button>
            <button onClick={send} className="flex h-10 w-10 items-center justify-center rounded-xl bg-bharat-saffron text-white hover:opacity-90 transition">
              <Send size={17} />
            </button>
          </div>
        </div>
      ) : (
        <div className="hidden flex-1 flex-col items-center justify-center lg:flex">
          <MessageCircle size={56} className="text-bharat-saffron/30" strokeWidth={1} />
          <p className="mt-4 text-xl font-bold text-gray-700 dark:text-white">Your Messages</p>
          <p className="mt-1 text-sm text-gray-400">Select a conversation to start chatting</p>
          <p className="mt-0.5 text-xs text-gray-400">End-to-end encrypted 🔒</p>
        </div>
      )}
    </div>
  );
}

function MessageCircle({ size, className, strokeWidth }: { size: number; className?: string; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth ?? 2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
