'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Mic, MicOff, Send, Volume2, Globe, RotateCcw, Sparkles, MessageCircle, HelpCircle } from 'lucide-react';

const SAMPLE_CONVS = [
  { role: 'user', text: 'Mera ration card kaise nikale?' },
  { role: 'ai',   text: '📋 आपके ration card के लिए:\n1. BharatApp → GovTech → DigiLocker जाएं\n2. "Ration Card" खोजें\n3. Aadhaar से verify करें\n4. PDF download करें\n\nGovTech module में डायरेक्ट जाना चाहते हैं? [हाँ, ले जाओ]' },
  { role: 'user', text: 'Aaj ke gehun ka mandi rate kya hai?' },
  { role: 'ai',   text: '🌾 आज के मंडी भाव (14 मार्च 2026):\n\n• **गेहूँ (Wheat)**: ₹2,180/क्विंटल 📈 +₹30\n• **सरसों (Mustard)**: ₹5,100/क्विंटल\n• **सोयाबीन**: ₹4,200/क्विंटल\n\n**Jaipur Mandi** में आज volume: 12,500 quintal\n\nपूरे मंडी भाव देखने के लिए Agri-Tech module में जाएं? 🌾' },
];

const SUGGESTIONS = [
  { icon: '💰', text: 'Mera balance kya hai?' },
  { icon: '🌾', text: 'Aaj ke mandi rate?' },
  { icon: '🏥', text: 'Doctor book karna hai' },
  { icon: '📋', text: 'Ration card kaise milega?' },
  { icon: '📱', text: 'Mobile recharge karo' },
  { icon: '🏛️', text: 'Kisan scheme batao' },
  { icon: '🚗', text: 'EV loan ke baare mein batao' },
  { icon: '📰', text: 'Aaj ki top news' },
];

const LANGS = ['हिंदी', 'English', 'বাংলা', 'தமிழ்', 'తెలుగు', 'मराठी', 'ਪੰਜਾਬੀ', 'ગુજરાતી', 'ಕನ್ನಡ', 'മലയാളം', 'অসমীয়া'];

type Msg = { role: 'user' | 'ai'; text: string };

export default function AIPage() {
  const [msgs, setMsgs] = useState<Msg[]>(SAMPLE_CONVS as Msg[]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [lang, setLang] = useState('हिंदी');
  const [speaking, setSpeaking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs]);

  const sendMsg = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');
    const newMsgs: Msg[] = [...msgs, { role: 'user', text: msg }];
    setMsgs(newMsgs);
    setTimeout(() => {
      setMsgs(m => [...m, { role: 'ai', text: `🤖 Processing your request in ${lang}...\n\nYour query: "${msg}"\n\nI am Bharat AI — your personal assistant for all 13 BharatApp modules. How can I help you further?` }]);
    }, 1000);
  };

  const toggleListening = () => {
    setListening(!listening);
    if (!listening) {
      setTimeout(() => {
        setListening(false);
        setInput('Doctor dikhana hai kal subah');
      }, 2000);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <div className="border-b border-orange-100/60 bg-white/80 px-4 py-3 backdrop-blur-md dark:border-gray-700/60 dark:bg-gray-900/80">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10">
            <Image src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=80&q=80" alt="AI" width={40} height={40} className="h-10 w-10 rounded-full object-cover ring-2 ring-bharat-saffron/40" />
            {speaking && <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-green-400 ring-2 ring-white animate-pulse" />}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-bold text-gray-900 dark:text-white">Bharat AI</h1>
              <Sparkles size={14} className="text-bharat-saffron" />
            </div>
            <p className="text-xs text-gray-400">22 Indian languages · Voice-first</p>
          </div>
          {/* Language picker */}
          <div className="ml-auto flex items-center gap-2">
            <Globe size={15} className="text-gray-400" />
            <select value={lang} onChange={e => setLang(e.target.value)} className="rounded-lg border border-orange-100 bg-orange-50/50 px-2 py-1 text-xs font-medium text-gray-700 outline-none dark:border-gray-700 dark:bg-white/5 dark:text-gray-200">
              {LANGS.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* AI intro card */}
        <div className="mb-6 overflow-hidden rounded-2xl shadow-md">
          <div className="relative h-36">
            <Image src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80" alt="AI" fill className="object-cover opacity-60" />
            <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-r from-bharat-navy/90 to-indigo-800/80 p-5">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={18} className="text-bharat-saffron" />
                <p className="font-black text-white">Bolo Bharat AI</p>
              </div>
              <p className="text-white/80 text-sm">बोलिए किसी भी भाषा में — मैं समझता हूँ</p>
              <p className="text-white/60 text-xs mt-1">Understands Hindi, English & 20 more Indian languages</p>
            </div>
          </div>
        </div>

        {/* Chat messages */}
        <div className="mx-auto max-w-2xl space-y-3">
          {msgs.map((msg, i) => (
            <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'ai' && (
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-bharat-saffron to-bharat-orange">
                  <Sparkles size={14} className="text-white" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${msg.role === 'user' ? 'rounded-tr-sm bg-bharat-saffron text-white' : 'rounded-tl-sm bg-white/90 ring-1 ring-orange-100/60 dark:bg-white/10 dark:ring-white/10'}`}>
                {msg.role === 'ai' ? (
                  <div className="text-sm text-gray-800 dark:text-gray-100 whitespace-pre-line leading-relaxed">
                    {msg.text.split('**').map((t, j) => j % 2 ? <strong key={j}>{t}</strong> : t)}
                  </div>
                ) : (
                  <p className="text-sm text-white">{msg.text}</p>
                )}
                {msg.role === 'ai' && (
                  <button onClick={() => setSpeaking(!speaking)} className="mt-2 flex items-center gap-1 text-[11px] text-gray-400 hover:text-bharat-saffron transition">
                    <Volume2 size={12} /> {speaking ? 'Playing...' : 'Listen'}
                  </button>
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Suggestions */}
      <div className="border-t border-orange-100/40 bg-white/70 backdrop-blur-sm dark:border-gray-700/40 dark:bg-gray-900/70">
        <div className="flex gap-2 overflow-x-auto px-4 py-2.5">
          {SUGGESTIONS.map(s => (
            <button
              key={s.text}
              onClick={() => sendMsg(s.text)}
              className="flex flex-shrink-0 items-center gap-1.5 rounded-full border border-orange-100/60 bg-orange-50/80 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-orange-100 hover:border-bharat-saffron/40 transition dark:border-gray-700 dark:bg-white/5 dark:text-gray-400"
            >
              <span>{s.icon}</span>{s.text}
            </button>
          ))}
        </div>

        {/* Input bar */}
        <div className="flex items-center gap-2 px-4 pb-4 pt-2">
          <button
            onClick={toggleListening}
            className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl transition ${listening ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse' : 'bg-orange-50 text-bharat-saffron hover:bg-orange-100 dark:bg-white/5'}`}
          >
            {listening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          <div className="relative flex-1">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMsg()}
              placeholder={listening ? '🎤 Listening...' : 'Type or speak in any language...'}
              className="w-full rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-2.5 pr-10 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-bharat-saffron/30 dark:border-gray-700 dark:bg-white/5 dark:text-gray-200"
            />
          </div>
          <button
            onClick={() => sendMsg()}
            disabled={!input.trim()}
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-bharat-saffron text-white shadow-md transition hover:opacity-90 disabled:opacity-40"
          >
            <Send size={18} />
          </button>
          <button onClick={() => { setMsgs([]); setInput(''); }} className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-gray-400 hover:bg-orange-100 hover:text-gray-600 transition dark:bg-white/5">
            <RotateCcw size={18} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 pb-3 text-[11px] text-gray-400">
          <div className="flex items-center gap-1"><HelpCircle size={11} /> 22 languages</div>
          <div className="flex items-center gap-1"><MessageCircle size={11} /> Voice & text</div>
          <div className="flex items-center gap-1"><Sparkles size={11} /> Bharat AI</div>
        </div>
      </div>
    </div>
  );
}
