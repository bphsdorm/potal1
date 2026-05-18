/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Users, 
  CalendarCheck, 
  AlertTriangle, 
  FileText, 
  BarChart3, 
  PencilLine,
  ShieldCheck,
  ArrowRight,
  School,
  Clock
} from 'lucide-react';

// --- Types ---
interface PortalItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  colorVariant: 'blue' | 'green' | 'purple' | 'red' | 'orange' | 'teal' | 'indigo' | 'pink';
}

// --- Data ---
const PORTAL_ITEMS: PortalItem[] = [
  {
    id: 'homepage',
    title: '기숙사 홈페이지',
    description: '공지사항, 생활 안내, 주요 정보를 확인합니다.',
    icon: <Home className="w-6 h-6 text-blue-600" />,
    href: 'https://sites.google.com/view/bphs1',
    colorVariant: 'blue',
  },
  {
    id: 'student-info',
    title: '기숙사생 정보 관리',
    description: '학생 기본 정보, 호실, 보호자 연락처 등을 관리합니다.',
    icon: <Users className="w-6 h-6 text-emerald-600" />,
    href: 'https://script.google.com/macros/s/AKfycbwrH62lwpvbY2hma7k01WpQGsoWl1ColNZYT8UvCJvkd55kwnZC1gpN_6S27Vz29BRL/exec',
    colorVariant: 'green',
  },
  {
    id: 'attendance',
    title: '야자 자습 관리',
    description: '자습 출결 현황 확인 및 출석 체크를 진행합니다.',
    icon: <CalendarCheck className="w-6 h-6 text-violet-600" />,
    href: 'https://yaja-attendance-149616724766.us-west1.run.app/dashboard',
    colorVariant: 'purple',
  },
  {
    id: 'demerits',
    title: '벌점 관리',
    description: '생활 지도 벌점 부여, 이력 조회 및 현황을 관리합니다.',
    icon: <AlertTriangle className="w-6 h-6 text-rose-600" />,
    href: 'https://script.google.com/macros/s/AKfycbzvU-v2vSWb5ArrIInzA7Y-86-iCAXf0gWcW63WKLLlP7OX3S7vy8aePw5yfZLiw3NL/exec',
    colorVariant: 'red',
  },
  {
    id: 'log',
    title: '운영일지 작성',
    description: '일일 기숙사 운영 기록, 사건 및 특이사항을 작성합니다.',
    icon: <FileText className="w-6 h-6 text-amber-600" />,
    href: 'https://script.google.com/macros/s/AKfycbxvQ4EQmJtcgrsPbz6svyl5z77JgLwegKtldXbtobYL3PZiLfPQZFBkQLzsMmcWPiuJ_w/exec',
    colorVariant: 'orange',
  },
  {
    id: 'dashboard',
    title: '운영 현황 대시보드',
    description: '기숙사 운영 통계와 현황을 한눈에 파악합니다.',
    icon: <BarChart3 className="w-6 h-6 text-teal-600" />,
    href: 'https://script.google.com/macros/s/AKfycbzoIBn_T-bG9lYHVFKeVwmJpIwAuKeIrr6VDy6Ca90qIsIQg5fNSil2R4XhSlcionqm/exec',
    colorVariant: 'teal',
  },
  {
    id: 'online-application',
    title: '온라인 지원서 작성',
    description: '기숙사 입사 지원서를 온라인으로 작성하고 제출합니다.',
    icon: <PencilLine className="w-6 h-6 text-indigo-600" />,
    href: 'https://script.google.com/macros/s/AKfycbxQmdQJs4NZ3XwvZJlR5KzyMYm8t7M5zMWliTszxFRXWQsCbM9_UN6IAL1EZpn8Ivbp/exec',
    colorVariant: 'indigo',
  },
  {
    id: 'online-application-admin',
    title: '온라인 지원서 작성 관리자',
    description: '제출된 온라인 지원서를 확인하고 관리합니다.',
    icon: <ShieldCheck className="w-6 h-6 text-pink-600" />,
    href: 'https://script.google.com/macros/s/AKfycbxQmdQJs4NZ3XwvZJlR5KzyMYm8t7M5zMWliTszxFRXWQsCbM9_UN6IAL1EZpn8Ivbp/exec?mode=admin',
    colorVariant: 'pink',
  },
];

const COLORS = {
  blue: { accent: 'bg-blue-500', iconBg: 'bg-blue-50' },
  green: { accent: 'bg-emerald-500', iconBg: 'bg-emerald-50' },
  purple: { accent: 'bg-violet-500', iconBg: 'bg-violet-50' },
  red: { accent: 'bg-rose-500', iconBg: 'bg-rose-50' },
  orange: { accent: 'bg-amber-500', iconBg: 'bg-amber-50' },
  teal: { accent: 'bg-teal-500', iconBg: 'bg-teal-50' },
  indigo: { accent: 'bg-indigo-500', iconBg: 'bg-indigo-50' },
  pink: { accent: 'bg-pink-500', iconBg: 'bg-pink-50' },
};

// --- Components ---

function ClockDisplay() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return (
    <div className="flex items-center gap-2 text-white/90 font-mono text-sm">
      <Clock className="w-4 h-4" />
      <span>{timeString}</span>
    </div>
  );
}

function PortalCard({ item }: { item: PortalItem }) {
  const color = COLORS[item.colorVariant];

  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex gap-4 p-6 bg-white rounded-[20px] shadow-[0_4px_24px_rgba(30,58,95,0.08)] border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(30,58,95,0.16)] overflow-hidden"
      whileTap={{ scale: 0.98, opacity: 0.8 }}
    >
      {/* Top Accent Line */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${color.accent}`} />
      
      {/* Icon */}
      <div className={`flex-shrink-0 w-[52px] h-[52px] rounded-xl flex items-center justify-center text-2xl transition-colors duration-300 ${color.iconBg}`}>
        {item.icon}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
          {item.title}
        </h3>
        <p className="text-[13px] text-slate-500 leading-relaxed mt-1">
          {item.description}
        </p>
      </div>

      <div className="flex items-center text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all">
        <ArrowRight className="w-5 h-5" />
      </div>
    </motion.a>
  );
}

export default function App() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    // Only update date once a day/long interval if needed, 
    // but usually keeping it simple is fine.
    const timer = setInterval(() => setDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const dateString = date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });

  return (
    <div className="min-h-screen bg-[#f0f4f8] font-sans selection:bg-blue-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-[#1e3a5f] to-[#1e40af] shadow-lg">
        <div className="max-w-[1100px] mx-auto h-16 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/15 border border-white/30 rounded-lg flex items-center justify-center text-white">
              <School className="w-5 h-5" />
            </div>
            <div className="text-white">
              <h2 className="text-[15px] font-bold leading-tight tracking-tight">기숙사 관리 포털</h2>
              <span className="text-[11px] opacity-65 block mt-0.5">Dormitory Management Portal</span>
            </div>
          </div>
          <div className="hidden sm:block">
            <ClockDisplay />
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#1e3a5f] to-[#1e40af] pt-14 pb-20 px-6 text-center text-white">
          <motion.h1 
            className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            기숙사 통합 관리 시스템
          </motion.h1>
          <motion.p 
            className="text-base text-white/75 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            아래 메뉴에서 원하는 관리 시스템으로 이동하세요.
          </motion.p>
          
          <motion.div 
            className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 border border-white/20 rounded-full text-[13px] text-white/90 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <span role="img" aria-label="calendar">📅</span>
            {dateString}
          </motion.div>
        </section>

        {/* Card Grid Section */}
        <section className="max-w-[1100px] mx-auto px-6 pb-20 -mt-10">
          <div className="mb-6 px-1">
            <h2 className="text-[11px] font-bold tracking-[1.5px] uppercase text-slate-500">
              관리 시스템 바로가기
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {PORTAL_ITEMS.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                >
                  <PortalCard item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-10 px-6 bg-white/50 text-center text-slate-500">
        <p className="text-[13px] font-medium">기숙사 통합 관리 포털</p>
        <p className="text-[11px] mt-2 opacity-70">문의: 기숙사 담당 교사</p>
        <p className="text-[10px] mt-6 opacity-40 uppercase tracking-widest font-mono">
          &copy; {new Date().getFullYear()} Dormitory Portal. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
