import React, { useState } from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';
import { Language, translations } from '../data/translations';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'terms' | 'privacy';
  lang: Language;
}

export const TermsModal: React.FC<TermsModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'terms',
  lang,
}) => {
  const [tab, setTab] = useState<'terms' | 'privacy'>(initialTab);

  if (!isOpen) return null;

  const t = translations[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-purple-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-700/60 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-white">
                Tamil Law Library Legal Policies
              </h3>
              <p className="text-xs text-amber-200/80">Compliance with Indian IT Act & Law Tech Guidelines</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-gray-200 bg-gray-50/70 px-6 pt-3 gap-4">
          <button
            type="button"
            onClick={() => setTab('terms')}
            className={`pb-3 text-sm font-semibold border-b-2 flex items-center gap-2 transition-colors ${
              tab === 'terms'
                ? 'border-purple-700 text-purple-900'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{t.terms_modal_title}</span>
          </button>
          <button
            type="button"
            onClick={() => setTab('privacy')}
            className={`pb-3 text-sm font-semibold border-b-2 flex items-center gap-2 transition-colors ${
              tab === 'privacy'
                ? 'border-purple-700 text-purple-900'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{t.privacy_modal_title}</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto text-sm text-gray-700 leading-relaxed space-y-4">
          {tab === 'terms' ? (
            <>
              <h4 className="font-bold text-gray-900 text-base">1. Acceptance of Terms</h4>
              <p>
                By registering for an account on Tamil Law Library (tamilrawlibrary.com), you acknowledge and agree that access to Central & State Acts, Rules, Amendments, and legal reference materials is subject to these Terms & Conditions.
              </p>

              <h4 className="font-bold text-gray-900 text-base">2. Subscription & Language Access Entitlements</h4>
              <p>
                Access to documents corresponds strictly to your chosen Language Package:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li><strong>English Package:</strong> Grants access to Indian Central & State Acts and Rules in English.</li>
                <li><strong>Tamil Package:</strong> Grants access to Tamil Nadu Acts, Rules, and authentic Tamil legal translations.</li>
                <li><strong>Bilingual Package:</strong> Grants full uninhibited access to both English and Tamil editions with comparative view.</li>
              </ul>

              <h4 className="font-bold text-gray-900 text-base">3. Intellectual Property & Fair Use</h4>
              <p>
                Official statutory legislative texts are matters of public record. Annotations, search indices, translation alignments, commentary, and platform interfaces are proprietary to Tamil Law Library. Redistribution for commercial database duplication is strictly prohibited.
              </p>

              <h4 className="font-bold text-gray-900 text-base">4. Legal Disclaimer</h4>
              <p>
                Tamil Law Library provides verified legal texts for informational, research, and educational purposes. While reasonable care is taken to provide accurate and up-to-date amendments, users are advised to verify with official government gazettes before judicial citations.
              </p>
            </>
          ) : (
            <>
              <h4 className="font-bold text-gray-900 text-base">1. Information We Collect</h4>
              <p>
                When you create an account, we collect your Full Name, Email Address, and 10-digit Indian Mobile Number. This information is utilized solely to manage your secure account authentication, verify subscription entitlements, and provide password recovery.
              </p>

              <h4 className="font-bold text-gray-900 text-base">2. Data Security & Encryption</h4>
              <p>
                All account passwords are encrypted using industry-standard bcrypt cryptographic hashing. We never store plain-text passwords or share your phone numbers with third-party telemarketers.
              </p>

              <h4 className="font-bold text-gray-900 text-base">3. Strict No-Payment Gateway Exposure on Login</h4>
              <p>
                In compliance with strict data protection guidelines, your authentication session is segregated from financial transactions, ensuring zero unauthorized payment access or telemetry leakage.
              </p>

              <h4 className="font-bold text-gray-900 text-base">4. Your Rights</h4>
              <p>
                You retain the right to inspect your account details, switch language packages, update your mobile number, or request account closure at any time through our verified support desk.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-purple-800 hover:bg-purple-900 text-white text-sm font-semibold transition-all shadow-sm"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
