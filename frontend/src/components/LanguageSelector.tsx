import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { Language } from '../data/translations';

interface LanguageSelectorProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLang,
  onLanguageChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Small, elegant rounded selector with dark purple background and gold/purple border */}
      <div className="flex items-center bg-[#250A36]/85 hover:bg-[#320D4A]/90 backdrop-blur-md border border-[#8A46B5]/40 hover:border-amber-400/50 rounded-full px-3.5 py-1.5 shadow-lg text-xs text-white transition-all duration-200">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 pr-2 focus:outline-none hover:text-amber-300 transition-colors"
          title="Select display language"
        >
          <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="font-medium tracking-wide">
            {currentLang === 'en' ? 'English' : 'ஆங்கிலம்'}
          </span>
          <ChevronDown className={`w-3 h-3 text-purple-200 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <span className="text-white/30 select-none">|</span>

        <button
          type="button"
          onClick={() => {
            const nextLang = currentLang === 'en' ? 'ta' : 'en';
            onLanguageChange(nextLang);
          }}
          className={`pl-2 font-medium transition-colors hover:text-amber-300 ${
            currentLang === 'ta' ? 'text-amber-300 font-semibold' : 'text-gray-200'
          }`}
          title="Toggle Tamil / தமிழ்"
        >
          தமிழ்
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-[#1B0529]/95 backdrop-blur-xl border border-amber-500/30 shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
          <button
            type="button"
            onClick={() => {
              onLanguageChange('en');
              setIsOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors ${
              currentLang === 'en'
                ? 'bg-purple-900/60 text-amber-300 font-medium'
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <span>English</span>
            {currentLang === 'en' && <Check className="w-3.5 h-3.5 text-amber-400" />}
          </button>
          <button
            type="button"
            onClick={() => {
              onLanguageChange('ta');
              setIsOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors ${
              currentLang === 'ta'
                ? 'bg-purple-900/60 text-amber-300 font-medium'
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <span>தமிழ் (Tamil)</span>
            {currentLang === 'ta' && <Check className="w-3.5 h-3.5 text-amber-400" />}
          </button>
        </div>
      )}
    </div>
  );
};
