'use client';
import React, { useState } from 'react';

const CONVERSATIONS = [
  { id: 1, name: 'Priya Sharma', lastMsg: 'Kal milte hain 🙏', time: '2:30 PM', unread: 2, avatar: 'P', color: 'from-pink-400 to-rose-500', online: true },
  { id: 2, name: 'Amit Kumar', lastMsg: 'UPI karo bhai', time: '11:15 AM', unread: 0, avatar: 'A', color: 'from-blue-400 to-cyan-500', online: true },
  { id: 3, name: 'Family Group 👨‍👩‍👧‍👦', lastMsg: 'Maa: Raat ko aana beta', time: 'Yesterday', unread: 5, avatar: 'F', color: 'from-orange-400 to-amber-500', online: false },
  { id: 4, name: 'Dr. Suresh', lastMsg: 'Dawa lena mat bhoolna', time: 'Yesterday', unread: 1, avatar: 'D', color: 'from-teal-400 to-emerald-500', online: false },
  { id: 5, name: 'Office Team', lastMsg: 'Meeting at 3 PM', time: 'Mar 12', unread: 0, avatar: 'O', color: 'from-violet-400 to-purple-500', online: false },
  { id: 6, name: 'Ramesh Kirana', lastMsg: '₹450 received ✓', time: 'Mar 12', unread: 0, avatar: 'R', color: 'from-green-400 to-emerald-500', online: true },
];

const ACTIVE_CHAT_MSGS = [
  { id: 1, from: 'them', text: 'Bhai, aaj mandi ka kya rate hai?', time: '10:01 AM' },
  { id: 2, from: 'me', text: 'Gehun ₹2,180 chal raha hai aaj', time: '10:02 AM' },
  { id: 3, from: 'them', text: 'Accha! Kal bechna chahiye tha 😅', time: '10:03 AM' },
  { id: 4, from: 'me', text: 'Haan, aaj thoda zyada hai. Kal dekho', time: '10:04 AM' },
  { id: 5, from: 'them', text: 'Theek hai. Kal milte hain 🙏', time: '10:05 AM' },
  { id: 6, from: 'them', text: 'Kal milte hain 🙏', time: '2:30 PM' },
];

export default function MessagesPage() {
  const [activeConv, setActiveConv] = useState<number | null>(null);
  const [newMsg, setNewMsg] = useState('');
  const [chatMsgs, setChatMsgs] = useState(ACTIVE_CHAT_MSGS);

  const active = CONVERSATIONS.find(c => c.id === activeConv);

  const sendMsg = () => {
    if (!newMsg.trim()) return;
    setChatMsgs(prev => [...prev, { id: Date.now(), from: 'me', text: newMsg.trim(), time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }]);
    setNewMsg('');
  };

  return (
    <div className="flex h-[calc(100vh-56px)] bg-gray-50 dark:bg-bharat-navy overflow-hidden">
      {/* Conversation list */}
      <div className={`${activeConv ? 'hidden lg:flex' : 'flex'} flex-col w-full lg:w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700`}>
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">💬 Messages</h1>
            <button className="h-9 w-9 rounded-xl bg-bharat-saffron text-white flex items-center justify-center text-lg">✏️</button>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input placeholder="Search messages..." className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-bharat-saffron" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {CONVERSATIONS.map(conv => (
            <button
              key={conv.id}
              onClick={() => setActiveConv(conv.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 border-b border-gray-100 dark:border-gray-800 text-left transition ${activeConv === conv.id ? 'bg-orange-50 dark:bg-orange-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
            >
              <div className="relative">
                <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${conv.color} flex items-center justify-center text-white font-bold text-base`}>
                  {conv.avatar}
                </div>
                {conv.online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white dark:border-gray-900" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900 dark:text-white text-sm">{conv.name}</span>
                  <span className="text-xs text-gray-400">{conv.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate mt-0.5">{conv.lastMsg}</p>
              </div>
              {conv.unread > 0 && (
                <span className="h-5 min-w-5 px-1.5 rounded-full bg-bharat-saffron text-white text-xs font-bold flex items-center justify-center">{conv.unread}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      {activeConv && active ? (
        <div className="flex flex-col flex-1 bg-gray-50 dark:bg-bharat-navy">
          {/* Chat header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <button onClick={() => setActiveConv(null)} className="lg:hidden text-gray-500 text-xl mr-1">←</button>
            <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${active.color} flex items-center justify-center text-white font-bold`}>{active.avatar}</div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-white text-sm">{active.name}</p>
              <p className="text-xs text-gray-400">{active.online ? '🟢 Online' : 'Last seen yesterday'}</p>
            </div>
            <div className="flex gap-2">
              <button className="h-9 w-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-lg">📞</button>
              <button className="h-9 w-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-lg">📹</button>
              <button className="h-9 w-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-lg">⋯</button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
            {chatMsgs.map(msg => (
              <div key={msg.id} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs rounded-2xl px-4 py-2.5 ${msg.from === 'me' ? 'bg-bharat-saffron text-white rounded-tr-sm' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm rounded-tl-sm'}`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-0.5 ${msg.from === 'me' ? 'text-white/70' : 'text-gray-400'}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <button className="h-10 w-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xl">😊</button>
            <input
              value={newMsg}
              onChange={e => setNewMsg(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMsg()}
              placeholder="Type a message... या बोलें 🎤"
              className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-bharat-saffron"
            />
            <button className="h-10 w-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xl">🎤</button>
            <button onClick={sendMsg} className="h-10 w-10 rounded-xl bg-bharat-saffron text-white flex items-center justify-center text-xl hover:opacity-90 transition">➤</button>
          </div>
        </div>
      ) : (
        <div className="hidden lg:flex flex-1 items-center justify-center bg-gray-50 dark:bg-bharat-navy">
          <div className="text-center">
            <p className="text-6xl mb-4">💬</p>
            <p className="text-xl font-bold text-gray-700 dark:text-white">Your Messages</p>
            <p className="text-gray-500 mt-2">Select a conversation to start chatting</p>
            <p className="text-sm text-gray-400 mt-1">End-to-end encrypted 🔒</p>
          </div>
        </div>
      )}
    </div>
  );
}
