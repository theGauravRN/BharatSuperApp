'use client';
import React, { useState, useRef, useEffect } from 'react';

type Message = {
  id: number;
  role: 'user' | 'assistant';
  text: string;
  lang?: string;
  module?: string;
  actions?: { label: string; href: string }[];
  time: string;
};

const SAMPLE_CONVERSATIONS: Message[] = [
  {
    id: 1, role: 'user', text: 'Aaj mandi mein gehun ka kya rate chal raha hai?', lang: 'Hindi',
    time: '10:02 AM',
  },
  {
    id: 2, role: 'assistant', module: '🌾 Agri-Tech',
    text: 'आज जयपुर मंडी में गेहूँ का भाव ₹2,180 प्रति क्विंटल है। यह कल से ₹30 ज़्यादा है। अलवर मंडी में ₹2,200 मिल रहा है जो सबसे अच्छा भाव है।\n\n📊 Top 3 Mandis Today:\n• Alwar: ₹2,200/qtl ⬆️\n• Jaipur: ₹2,180/qtl ⬆️\n• Ajmer: ₹2,160/qtl ➡️',
    actions: [{ label: 'See All Mandi Prices', href: '/hi/agri' }, { label: 'Sell My Produce', href: '/hi/agri' }],
    time: '10:02 AM',
  },
  {
    id: 3, role: 'user', text: 'Doctor se milna hai, sir mein dard ho raha hai', lang: 'Hindi',
    time: '10:05 AM',
  },
  {
    id: 4, role: 'assistant', module: '🏥 HealthTech',
    text: 'आपको सिरदर्द है। मैं अभी उपलब्ध डॉक्टर दिखाता हूँ:\n\n👨‍⚕️ Dr. Priya Sharma (General Physician)\n⭐ 4.9 · ₹299 · Available now\n🗣️ Hindi, English\n\nक्या मैं अभी अपॉइंटमेंट बुक करूँ?',
    actions: [{ label: '📹 Book Video Consultation', href: '/hi/health' }, { label: 'See More Doctors', href: '/hi/health' }],
    time: '10:05 AM',
  },
  {
    id: 5, role: 'user', text: 'Paisa bhejna hai mujhe 500 rupaye Ramesh ko', lang: 'Hindi',
    time: '10:08 AM',
  },
  {
    id: 6, role: 'assistant', module: '💰 FinTech',
    text: 'ठीक है! मैं Ramesh को ₹500 UPI से भेज सकता हूँ।\n\n📤 Payment Details:\n• Receiver: Ramesh Kumar\n• UPI: ramesh.kumar@upi\n• Amount: ₹500\n• Method: UPI\n\nक्या आप confirm करना चाहते हैं?',
    actions: [{ label: '✅ Confirm & Send ₹500', href: '/hi/fintech' }, { label: 'Change Amount', href: '/hi/fintech' }],
    time: '10:08 AM',
  },
];

const SUGGESTED_QUERIES = [
  { text: 'आज मौसम कैसा है?', label: 'Weather', icon: '🌤️', module: 'agri' },
  { text: 'Mera UPI balance kitna hai?', label: 'Balance', icon: '💰', module: 'fintech' },
  { text: 'UPSC exam ki preparation kaise karu?', label: 'Education', icon: '📚', module: 'edtech' },
  { text: 'Mere gaon mein naukri chahiye', label: 'Jobs', icon: '💼', module: 'jobs' },
  { text: 'Sarkar ki yojana ke liye apply karna hai', label: 'GovTech', icon: '🏛️', module: 'govtech' },
  { text: 'Bijli ka bill kaise bhaaru?', label: 'Bill Pay', icon: '⚡', module: 'fintech' },
];

const LANGUAGES = [
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ta', name: 'தமிழ்', flag: '🌐' },
  { code: 'te', name: 'తెలుగు', flag: '🌐' },
  { code: 'bn', name: 'বাংলা', flag: '🌐' },
  { code: 'mr', name: 'मराठी', flag: '🌐' },
  { code: 'gu', name: 'ગુજરાતી', flag: '🌐' },
  { code: 'kn', name: 'ಕನ್ನಡ', flag: '🌐' },
];

const AI_RESPONSES: Record<string, Message['text']> = {
  default: "मैं आपकी मदद करने के लिए तैयार हूँ! आप मुझसे खेती, स्वास्थ्य, पैसा, नौकरी, पढ़ाई — कुछ भी पूछ सकते हैं।\n\nI'm ready to help you! Ask me about farming, health, money, jobs, education — anything!",
};

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(SAMPLE_CONVERSATIONS);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedLang, setSelectedLang] = useState('hi');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text?: string) => {
    const msg = text || inputText.trim();
    if (!msg) return;

    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      text: msg,
      lang: LANGUAGES.find(l => l.code === selectedLang)?.name,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        text: AI_RESPONSES.default,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        sendMessage('आज मंडी में गेहूँ का क्या भाव है?');
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-bharat-navy overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-bharat-saffron via-orange-500 to-bharat-orange px-4 py-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-2xl">🎤</div>
          <div className="flex-1">
            <p className="font-bold text-white">Bharat AI Assistant</p>
            <p className="text-xs text-white/80">बोलो भारत — 22 languages</p>
          </div>
          {/* Language selector */}
          <select
            value={selectedLang}
            onChange={e => setSelectedLang(e.target.value)}
            className="bg-white/20 border border-white/30 text-white text-xs rounded-lg px-2 py-1.5 outline-none backdrop-blur"
          >
            {LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code} className="text-gray-800 bg-white">
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Welcome banner */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/10 rounded-2xl p-4 border border-orange-200 dark:border-orange-800 text-center">
          <p className="text-3xl mb-2">🎤</p>
          <p className="font-bold text-gray-900 dark:text-white">नमस्ते! मैं आपका AI सहायक हूँ</p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">बोलिए या टाइप करिए — किसी भी भाषा में</p>
          <p className="text-xs text-gray-400 mt-1">हिंदी, English, தமிழ், తెలుగు, বাংলা and 17 more languages</p>
        </div>

        {/* Suggested queries */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_QUERIES.map(q => (
              <button
                key={q.text}
                onClick={() => sendMessage(q.text)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-700 dark:text-gray-300 hover:border-bharat-saffron hover:text-bharat-saffron transition shadow-sm"
              >
                <span>{q.icon}</span>
                <span className="font-medium">{q.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat messages */}
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
            {msg.role === 'assistant' && (
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-bharat-saffron to-bharat-orange flex items-center justify-center text-sm flex-shrink-0 mt-1">
                🤖
              </div>
            )}
            <div className={`max-w-xs sm:max-w-md lg:max-w-lg ${msg.role === 'user' ? 'order-first' : ''}`}>
              {msg.module && (
                <p className="text-xs text-bharat-saffron font-semibold mb-1 ml-1">{msg.module}</p>
              )}
              <div
                className={`rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-bharat-saffron text-white rounded-tr-sm'
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm rounded-tl-sm border border-gray-100 dark:border-gray-700'
                }`}
              >
                <p className="text-sm whitespace-pre-line leading-relaxed">{msg.text}</p>
                {msg.lang && (
                  <p className="text-xs mt-1 opacity-60">🗣️ {msg.lang}</p>
                )}
              </div>
              {/* Action buttons */}
              {msg.actions && (
                <div className="flex flex-wrap gap-2 mt-2 ml-1">
                  {msg.actions.map(action => (
                    <a
                      key={action.label}
                      href={action.href}
                      className="text-xs px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-900/20 text-bharat-saffron border border-orange-200 dark:border-orange-800 font-medium hover:bg-orange-100 transition"
                    >
                      {action.label}
                    </a>
                  ))}
                </div>
              )}
              <p className={`text-xs mt-1 text-gray-400 ${msg.role === 'user' ? 'text-right' : 'ml-1'}`}>{msg.time}</p>
            </div>
            {msg.role === 'user' && (
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-1">
                R
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-2 items-center">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-bharat-saffron to-bharat-orange flex items-center justify-center text-sm flex-shrink-0">🤖</div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex gap-1 items-center h-4">
                <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="flex-shrink-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-3">
        {/* Voice listening indicator */}
        {isListening && (
          <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 rounded-xl px-4 py-2.5 mb-3 border border-red-200 dark:border-red-800">
            <span className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
            <p className="text-red-600 dark:text-red-400 text-sm font-medium">Listening... बोलिए</p>
            <button onClick={() => setIsListening(false)} className="ml-auto text-xs text-red-500 font-medium">Stop</button>
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* Voice button */}
          <button
            onClick={toggleListening}
            className={`h-12 w-12 flex-shrink-0 rounded-full flex items-center justify-center text-xl shadow-md transition ${
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-gradient-to-br from-bharat-saffron to-bharat-orange text-white hover:opacity-90'
            }`}
          >
            🎤
          </button>

          {/* Text input */}
          <div className="flex-1 relative">
            <input
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Type or speak in any language..."
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 pr-12 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 outline-none focus:ring-2 focus:ring-bharat-saffron"
            />
          </div>

          {/* Send button */}
          <button
            onClick={() => sendMessage()}
            disabled={!inputText.trim()}
            className="h-12 w-12 flex-shrink-0 rounded-full bg-bharat-saffron text-white flex items-center justify-center text-xl hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ➤
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-2">
          AI-powered · 22 Indian languages · Works offline for basics
        </p>
      </div>
    </div>
  );
}
