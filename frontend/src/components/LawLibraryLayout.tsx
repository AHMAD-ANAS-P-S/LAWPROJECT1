'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LanguageSelector } from './LanguageSelector';
import { BottomWave } from './BottomWave';
import { ForgotPasswordModal } from './ForgotPasswordModal';
import { TermsModal } from './TermsModal';
import { Language } from '../data/translations';

interface LawLibraryLayoutProps {
  children: (props: {
    lang: Language;
    openForgotPassword: () => void;
    openTerms: (tab: 'terms' | 'privacy') => void;
  }) => React.ReactNode;
  activePage: 'login' | 'signup';
}

export const LawLibraryLayout: React.FC<LawLibraryLayoutProps> = ({
  children,
  activePage,
}) => {
  const [lang, setLang] = useState<Language>('en');
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [termsTab, setTermsTab] = useState<'terms' | 'privacy'>('terms');

  const handleOpenTerms = (tab: 'terms' | 'privacy') => {
    setTermsTab(tab);
    setIsTermsOpen(true);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#120517] font-sans selection:bg-purple-800 selection:text-white">
      {/* 
        BACKGROUND: 
        Full-screen law-library background with dark wooden bookshelves, 
        old law books, warm golden lighting, rich dark brown and maroon tones.
      */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/law_library_dark_shelves.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Dark overlay for optimal text contrast and rich warm depth */}
      <div className="fixed inset-0 z-0 bg-black/45 pointer-events-none" />

      {/* TOP HEADER - Always visible at the top */}
      <header className="relative z-20 w-full px-5 sm:px-10 lg:px-16 pt-5 sm:pt-6 pb-2">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between">
          {/* Logo & Website Name inside subtle dark translucent area */}
          <Link
            href="/login"
            className="group focus:outline-none"
          >
            <div className="inline-flex items-center gap-3.5 bg-black/40 hover:bg-black/55 backdrop-blur-md border border-amber-500/30 rounded-2xl px-3.5 py-2 transition-all shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/scales_logo_hd.png"
                alt="Lady Justice Gold Scales Logo"
                className="w-10 h-8 sm:w-11 sm:h-9 object-contain drop-shadow shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl sm:text-2xl text-[#E8C882] tracking-tight leading-tight group-hover:text-amber-100 transition-colors drop-shadow-sm">
                  Tamil Law Library
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#DFB56C] tracking-wide font-medium">
                  Indian Acts • Rules • Amendments
                </span>
              </div>
            </div>
          </Link>

          {/* Top-Right Language Selector */}
          <div className="flex items-center">
            <LanguageSelector currentLang={lang} onLanguageChange={setLang} />
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="relative z-10 flex-1 flex flex-col justify-center px-5 sm:px-10 lg:px-16 pt-2 pb-4 sm:pb-6">
        <div className="w-full max-w-[1240px] mx-auto">
          {children({
            lang,
            openForgotPassword: () => setIsForgotOpen(true),
            openTerms: handleOpenTerms,
          })}
        </div>
      </main>

      {/* SIGNATURE BOTTOM CURVED PURPLE WAVE */}
      <BottomWave />

      {/* FOOTER */}
      <footer className="relative z-10 w-full pb-3.5 pt-1 text-center pointer-events-none">
        <div className="text-[11px] sm:text-xs text-white/90 font-sans tracking-wide drop-shadow-sm">
          © 2026 TAMIL LAW LIBRARY (tamilrawlibrary.com) • All Rights Reserved
        </div>
      </footer>

      {/* Modals */}
      <ForgotPasswordModal
        isOpen={isForgotOpen}
        onClose={() => setIsForgotOpen(false)}
        lang={lang}
      />

      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        initialTab={termsTab}
        lang={lang}
      />
    </div>
  );
};
