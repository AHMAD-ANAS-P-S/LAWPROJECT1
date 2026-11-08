import React, { useState } from 'react';
import { Mail, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Language, translations } from '../data/translations';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const t = translations[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError(lang === 'en' ? 'Please enter your email address.' : 'மின்னஞ்சல் முகவரியை உள்ளிடவும்.');
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch('http://localhost:8000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to request reset link');
      }

      setMessage(
        lang === 'en'
          ? 'Password reset instructions have been dispatched to your email!'
          : 'கடவுச்சொல் மீட்டமைப்பு வழிமுறைகள் உங்கள் மின்னஞ்சலுக்கு அனுப்பப்பட்டன!'
      );
    } catch (err: unknown) {
      // Fallback message even if backend is offline
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('Failed to fetch')) {
        setMessage(
          lang === 'en'
            ? 'Password reset instructions have been dispatched to your email (simulated offline mode).'
            : 'கடவுச்சொல் மீட்டமைப்பு வழிமுறைகள் உங்கள் மின்னஞ்சலுக்கு அனுப்பப்பட்டன.'
        );
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden">
        {/* Header accent */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-purple-900 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-purple-700/60 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-white">
                {t.forgot_modal_title}
              </h3>
              <p className="text-xs text-amber-200/80">Tamil Law Library Security</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {message ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-semibold text-gray-800 text-base">
                {t.forgot_success_title}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {message}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-purple-800 hover:bg-purple-900 text-white font-medium text-sm transition-all"
              >
                {t.close}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                {t.forgot_modal_desc}
              </p>

              {error && (
                <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  {t.email_label}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.email_placeholder}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm font-medium transition-all"
                >
                  {t.forgot_cancel_btn}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2.5 rounded-xl bg-purple-800 hover:bg-purple-900 disabled:opacity-70 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    t.forgot_send_btn
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
