'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Phone, Video, PhoneOff, MicOff, Mic, VideoOff, Volume2, PhoneCall, PhoneIncoming, PhoneMissed, Users, Plus, Search, Wifi } from 'lucide-react';

const AVATARS: Record<string, string> = {
  P: 'https://randomuser.me/api/portraits/women/44.jpg',
  A: 'https://randomuser.me/api/portraits/men/32.jpg',
  S: 'https://randomuser.me/api/portraits/men/10.jpg',
  R: 'https://randomuser.me/api/portraits/men/71.jpg',
  K: 'https://randomuser.me/api/portraits/women/22.jpg',
  M: 'https://randomuser.me/api/portraits/men/50.jpg',
};

const CONTACTS = [
  { id: 1, name: 'Priya Sharma', status: 'online',  key: 'P', location: 'Jaipur' },
  { id: 2, name: 'Amit Kumar',   status: 'online',  key: 'A', location: 'Delhi' },
  { id: 3, name: 'Dr. Suresh',   status: 'away',    key: 'S', location: 'Mumbai' },
  { id: 4, name: 'Ravi Patel',   status: 'offline', key: 'R', location: 'Surat' },
  { id: 5, name: 'Kavita Devi',  status: 'online',  key: 'K', location: 'Lucknow' },
  { id: 6, name: 'Mohan Lal',    status: 'offline', key: 'M', location: 'Varanasi' },
];

const HISTORY = [
  { id: 1, name: 'Priya Sharma', dir: 'incoming', type: 'video', dur: '12:34', time: 'Today 2:30 PM',  key: 'P' },
  { id: 2, name: 'Amit Kumar',   dir: 'outgoing', type: 'audio', dur: '5:21',  time: 'Today 11:15 AM', key: 'A' },
  { id: 3, name: 'Dr. Suresh',   dir: 'missed',   type: 'video', dur: null,    time: 'Yesterday 4PM',  key: 'S' },
  { id: 4, name: 'Ravi Patel',   dir: 'incoming', type: 'audio', dur: '23:10', time: 'Yesterday 9AM',  key: 'R' },
  { id: 5, name: 'Kavita Devi',  dir: 'outgoing', type: 'audio', dur: '8:42',  time: 'Mar 12',         key: 'K' },
];

const BADGE: Record<string, string> = { online: 'bg-green-400', away: 'bg-yellow-400', offline: 'bg-gray-300' };
const DIR_ICON: Record<string, React.ReactNode> = {
  incoming: <PhoneIncoming size={14} className="text-green-500" />,
  outgoing: <PhoneCall size={14} className="text-blue-500" />,
  missed:   <PhoneMissed size={14} className="text-red-500" />,
};

export default function CallingPage() {
  const [tab, setTab] = useState<'contacts' | 'history' | 'groups'>('contacts');
  const [inCall, setInCall] = useState(false);
  const [callContact, setCallContact] = useState<typeof CONTACTS[0] | null>(null);
  const [callType, setCallType] = useState<'audio' | 'video'>('audio');
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);

  const startCall = (c: typeof CONTACTS[0], t: 'audio' | 'video') => { setCallContact(c); setCallType(t); setInCall(true); };
  const endCall = () => { setInCall(false); setCallContact(null); setMuted(false); setVideoOff(false); };

  return (
    <div className="min-h-screen">
      {/* In-call overlay */}
      {inCall && callContact && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-gradient-to-b from-gray-900 via-slate-800 to-bharat-navy pb-12 pt-16">
          <div className="flex flex-col items-center">
            <div className="relative">
              <Image src={AVATARS[callContact.key]} alt={callContact.name} width={112} height={112} className="h-28 w-28 rounded-full object-cover ring-4 ring-white/20 shadow-2xl" />
              <span className={`absolute bottom-1 right-1 h-4 w-4 rounded-full ${BADGE[callContact.status]} ring-2 ring-gray-900`} />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-white">{callContact.name}</h2>
            <p className="mt-1 text-sm text-gray-400">{callType === 'video' ? 'Video Call' : 'Audio Call'}</p>
            <p className="mt-2 font-mono text-sm font-semibold text-green-400">● 00:42</p>
          </div>

          {callType === 'video' && (
            <div className="flex h-44 w-full max-w-sm items-center justify-center rounded-2xl bg-gray-800 mx-4">
              {videoOff ? <VideoOff size={40} className="text-gray-500" /> : <Image src={AVATARS[callContact.key]} alt="video" width={320} height={176} className="h-44 w-full rounded-2xl object-cover opacity-80" />}
            </div>
          )}

          <div className="flex items-center gap-5">
            <button onClick={() => setMuted(!muted)} className={`flex h-14 w-14 items-center justify-center rounded-full transition ${muted ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}>
              {muted ? <MicOff size={22} /> : <Mic size={22} />}
            </button>
            <button onClick={endCall} className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition">
              <PhoneOff size={26} />
            </button>
            {callType === 'video' && (
              <button onClick={() => setVideoOff(!videoOff)} className={`flex h-14 w-14 items-center justify-center rounded-full transition ${videoOff ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}>
                {videoOff ? <VideoOff size={22} /> : <Video size={22} />}
              </button>
            )}
            <button className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition">
              <Volume2 size={22} />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-orange-100/60 bg-white/80 px-4 py-3 backdrop-blur-md dark:border-gray-700/60 dark:bg-gray-900/80">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Calling</h1>
          <button className="flex items-center gap-1.5 rounded-full bg-bharat-saffron px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
            <Plus size={15} /> New Call
          </button>
        </div>
        <div className="flex gap-1">
          {(['contacts', 'history', 'groups'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition ${tab === t ? 'bg-bharat-saffron text-white' : 'text-gray-500 hover:bg-orange-50 dark:hover:bg-white/5'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-4 space-y-3">
        {tab === 'contacts' && (
          <>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input placeholder="Search contacts..." className="w-full rounded-xl border border-orange-100 bg-white/60 pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-bharat-saffron/30 dark:border-gray-700 dark:bg-white/5" />
            </div>
            <div className="overflow-hidden rounded-2xl bg-white/80 shadow-sm ring-1 ring-orange-100/40 backdrop-blur-sm dark:bg-white/5 dark:ring-white/10">
              {CONTACTS.map((c, i) => (
                <div key={c.id} className={`flex items-center gap-3 px-4 py-3 ${i < CONTACTS.length - 1 ? 'border-b border-orange-50/80 dark:border-white/5' : ''}`}>
                  <div className="relative">
                    <Image src={AVATARS[c.key]} alt={c.name} width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
                    <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${BADGE[c.status]} ring-2 ring-white dark:ring-gray-900`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-900 dark:text-white">{c.name}</p>
                    <p className="text-xs text-gray-400">📍 {c.location} · <span className="capitalize">{c.status}</span></p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startCall(c, 'audio')} className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/30 transition">
                      <Phone size={16} />
                    </button>
                    <button onClick={() => startCall(c, 'video')} className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/30 transition">
                      <Video size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'history' && (
          <div className="overflow-hidden rounded-2xl bg-white/80 shadow-sm ring-1 ring-orange-100/40 backdrop-blur-sm dark:bg-white/5 dark:ring-white/10">
            {HISTORY.map((h, i) => (
              <div key={h.id} className={`flex items-center gap-3 px-4 py-3 ${i < HISTORY.length - 1 ? 'border-b border-orange-50/80 dark:border-white/5' : ''}`}>
                <Image src={AVATARS[h.key]} alt={h.name} width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900 dark:text-white">{h.name}</p>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                    {DIR_ICON[h.dir]}
                    <span className="capitalize">{h.dir}</span>
                    <span>·</span>
                    {h.type === 'video' ? <Video size={11} /> : <Phone size={11} />}
                    <span>{h.type}</span>
                    {h.dur && <><span>·</span><span>{h.dur}</span></>}
                  </div>
                  <p className="text-xs text-gray-400">{h.time}</p>
                </div>
                <button
                  onClick={() => startCall(CONTACTS.find(c => c.key === h.key) || CONTACTS[0], h.type as 'audio' | 'video')}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-bharat-saffron hover:bg-orange-100 dark:bg-white/5 transition"
                >
                  {h.type === 'video' ? <Video size={16} /> : <Phone size={16} />}
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === 'groups' && (
          <div className="space-y-3">
            {[
              { name: 'Family Group', members: 8, imgs: ['P', 'A', 'K'] },
              { name: 'Office Team',  members: 14, imgs: ['R', 'M', 'S'] },
              { name: 'Cricket Friends', members: 11, imgs: ['A', 'R', 'M'] },
            ].map(g => (
              <div key={g.name} className="flex items-center gap-3 rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100/40 backdrop-blur-sm dark:bg-white/5 dark:ring-white/10">
                <div className="flex -space-x-2">
                  {g.imgs.map(k => <Image key={k} src={AVATARS[k]} alt={k} width={40} height={40} className="h-10 w-10 rounded-full ring-2 ring-white object-cover dark:ring-gray-900" />)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white">{g.name}</p>
                  <p className="text-xs text-gray-500"><Users size={11} className="inline mr-1" />{g.members} members</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/30 transition"><Phone size={16} /></button>
                  <button className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/30 transition"><Video size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Network quality */}
        <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 dark:border-green-900 dark:bg-green-900/20">
          <Wifi size={20} className="text-green-500 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-green-700 dark:text-green-400">Network: Good (4G)</p>
            <p className="text-xs text-green-600 dark:text-green-500">BharatApp calls work even on 2G — optimized for India</p>
          </div>
        </div>
      </div>
    </div>
  );
}
