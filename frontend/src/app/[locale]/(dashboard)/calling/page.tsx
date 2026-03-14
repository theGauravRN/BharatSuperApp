'use client';
import React, { useState } from 'react';

const CONTACTS = [
  { id: 1, name: 'Priya Sharma', status: 'online', avatar: 'P', color: 'from-pink-400 to-rose-500', location: 'Jaipur' },
  { id: 2, name: 'Amit Kumar', status: 'online', avatar: 'A', color: 'from-blue-400 to-cyan-500', location: 'Delhi' },
  { id: 3, name: 'Dr. Suresh', status: 'away', avatar: 'S', color: 'from-teal-400 to-emerald-500', location: 'Mumbai' },
  { id: 4, name: 'Ravi Patel', status: 'offline', avatar: 'R', color: 'from-green-400 to-emerald-500', location: 'Surat' },
  { id: 5, name: 'Kavita Devi', status: 'online', avatar: 'K', color: 'from-purple-400 to-violet-500', location: 'Lucknow' },
  { id: 6, name: 'Mohan Lal', status: 'offline', avatar: 'M', color: 'from-orange-400 to-amber-500', location: 'Varanasi' },
];

const CALL_HISTORY = [
  { id: 1, name: 'Priya Sharma', type: 'video', direction: 'incoming', duration: '12:34', time: 'Today, 2:30 PM', avatar: 'P', color: 'from-pink-400 to-rose-500' },
  { id: 2, name: 'Amit Kumar', type: 'audio', direction: 'outgoing', duration: '5:21', time: 'Today, 11:15 AM', avatar: 'A', color: 'from-blue-400 to-cyan-500' },
  { id: 3, name: 'Dr. Suresh', type: 'video', direction: 'missed', duration: null, time: 'Yesterday, 4:00 PM', avatar: 'S', color: 'from-teal-400 to-emerald-500' },
  { id: 4, name: 'Ravi Patel', type: 'audio', direction: 'incoming', duration: '23:10', time: 'Yesterday, 9:45 AM', avatar: 'R', color: 'from-green-400 to-emerald-500' },
  { id: 5, name: 'Group Call', type: 'audio', direction: 'outgoing', duration: '45:00', time: 'Mar 12, 6:00 PM', avatar: 'G', color: 'from-indigo-400 to-blue-500' },
];

const STATUS_COLOR: Record<string, string> = {
  online: 'bg-green-400',
  away: 'bg-yellow-400',
  offline: 'bg-gray-400',
};

export default function CallingPage() {
  const [activeTab, setActiveTab] = useState<'contacts' | 'history' | 'groups'>('contacts');
  const [inCall, setInCall] = useState(false);
  const [callContact, setCallContact] = useState<typeof CONTACTS[0] | null>(null);
  const [callType, setCallType] = useState<'audio' | 'video'>('audio');
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);

  const startCall = (contact: typeof CONTACTS[0], type: 'audio' | 'video') => {
    setCallContact(contact);
    setCallType(type);
    setInCall(true);
  };

  const endCall = () => {
    setInCall(false);
    setCallContact(null);
    setMuted(false);
    setVideoOff(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bharat-navy">
      {/* Active Call Overlay */}
      {inCall && callContact && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-gradient-to-b from-gray-900 via-slate-800 to-bharat-navy p-8">
          <div className="flex flex-col items-center mt-16">
            <div className={`h-28 w-28 rounded-full bg-gradient-to-br ${callContact.color} flex items-center justify-center text-5xl text-white font-bold shadow-2xl ring-4 ring-white/20`}>
              {callContact.avatar}
            </div>
            <h2 className="mt-4 text-2xl font-bold text-white">{callContact.name}</h2>
            <p className="text-gray-400 mt-1">{callType === 'video' ? '📹 Video Call' : '🎙️ Audio Call'}</p>
            <p className="text-green-400 mt-2 text-sm font-mono animate-pulse">● 00:42</p>
          </div>

          {callType === 'video' && (
            <div className="w-full max-w-sm h-48 bg-gray-800 rounded-2xl flex items-center justify-center text-6xl my-4">
              {videoOff ? '🚫' : '📹'}
            </div>
          )}

          <div className="flex items-center gap-5 mb-8">
            <button onClick={() => setMuted(!muted)} className={`h-14 w-14 rounded-full flex items-center justify-center text-xl transition ${muted ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}>
              {muted ? '🔇' : '🎙️'}
            </button>
            <button onClick={endCall} className="h-16 w-16 rounded-full bg-red-500 flex items-center justify-center text-2xl text-white shadow-lg hover:bg-red-600 transition">
              📵
            </button>
            {callType === 'video' && (
              <button onClick={() => setVideoOff(!videoOff)} className={`h-14 w-14 rounded-full flex items-center justify-center text-xl transition ${videoOff ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}>
                {videoOff ? '📷' : '📹'}
              </button>
            )}
            <button className="h-14 w-14 rounded-full bg-white/20 text-white flex items-center justify-center text-xl hover:bg-white/30 transition">
              🔊
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">📞 Calling</h1>
          <button className="px-4 py-1.5 bg-bharat-saffron text-white rounded-full text-sm font-semibold">+ New Call</button>
        </div>
        <div className="flex gap-1 mt-3">
          {(['contacts', 'history', 'groups'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition capitalize ${activeTab === tab ? 'bg-bharat-saffron text-white' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              {tab === 'contacts' ? '👥 Contacts' : tab === 'history' ? '📋 History' : '👥 Groups'}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
        {activeTab === 'contacts' && (
          <>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input placeholder="Search contacts..." className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-bharat-saffron" />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Online ({CONTACTS.filter(c => c.status === 'online').length})</p>
              </div>
              {CONTACTS.map((contact, i) => (
                <div key={contact.id} className={`flex items-center gap-3 px-4 py-3 ${i < CONTACTS.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''}`}>
                  <div className="relative">
                    <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${contact.color} flex items-center justify-center text-white font-bold text-lg`}>
                      {contact.avatar}
                    </div>
                    <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-gray-800 ${STATUS_COLOR[contact.status]}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{contact.name}</p>
                    <p className="text-xs text-gray-500">📍 {contact.location} · <span className="capitalize">{contact.status}</span></p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startCall(contact, 'audio')}
                      className="h-9 w-9 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center text-lg hover:bg-green-200 transition"
                      title="Audio Call"
                    >
                      📞
                    </button>
                    <button
                      onClick={() => startCall(contact, 'video')}
                      className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center text-lg hover:bg-blue-200 transition"
                      title="Video Call"
                    >
                      📹
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'history' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
            {CALL_HISTORY.map((call, i) => (
              <div key={call.id} className={`flex items-center gap-3 px-4 py-3 ${i < CALL_HISTORY.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''}`}>
                <div className={`h-11 w-11 rounded-full bg-gradient-to-br ${call.color} flex items-center justify-center text-white font-bold text-base`}>
                  {call.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{call.name}</p>
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className={call.direction === 'missed' ? 'text-red-500' : call.direction === 'incoming' ? 'text-green-500' : 'text-blue-500'}>
                      {call.direction === 'missed' ? '↗ missed' : call.direction === 'incoming' ? '↙ incoming' : '↗ outgoing'}
                    </span>
                    <span className="text-gray-400">·</span>
                    <span className="text-gray-400">{call.type === 'video' ? '📹' : '🎙️'} {call.type}</span>
                    {call.duration && <><span className="text-gray-400">·</span><span className="text-gray-500">{call.duration}</span></>}
                  </div>
                  <p className="text-xs text-gray-400">{call.time}</p>
                </div>
                <button
                  onClick={() => startCall({ ...CONTACTS[0], name: call.name, avatar: call.avatar, color: call.color }, call.type as 'audio' | 'video')}
                  className="h-9 w-9 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-base hover:bg-gray-200 transition"
                >
                  {call.type === 'video' ? '📹' : '📞'}
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'groups' && (
          <div className="space-y-3">
            {[
              { name: 'Family Group', members: 8, active: true, avatar: '👨‍👩‍👧‍👦' },
              { name: 'Office Team', members: 14, active: false, avatar: '💼' },
              { name: 'Cricket Friends', members: 11, active: true, avatar: '🏏' },
            ].map((group) => (
              <div key={group.name} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-2xl">
                  {group.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white">{group.name}</p>
                  <p className="text-xs text-gray-500">{group.members} members {group.active && <span className="text-green-500">· Active now</span>}</p>
                </div>
                <div className="flex gap-2">
                  <button className="h-9 w-9 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center text-lg hover:bg-green-200 transition">📞</button>
                  <button className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center text-lg hover:bg-blue-200 transition">📹</button>
                </div>
              </div>
            ))}
            <button className="w-full py-3 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 text-sm font-medium hover:border-bharat-saffron hover:text-bharat-saffron transition">
              + Create Group Call
            </button>
          </div>
        )}

        {/* Network quality banner */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl px-4 py-3 flex items-center gap-3">
          <span className="text-green-500 text-xl">📶</span>
          <div>
            <p className="text-sm font-medium text-green-700 dark:text-green-400">Network: Good (4G)</p>
            <p className="text-xs text-green-600 dark:text-green-500">BharatApp calls work even on 2G — optimized for India</p>
          </div>
        </div>
      </div>
    </div>
  );
}
