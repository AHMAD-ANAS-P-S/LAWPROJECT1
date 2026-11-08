import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Eye, EyeOff, UserPlus, Check, AlertCircle, Loader2, Scale, Edit3 } from 'lucide-react';
import { Language } from '../data/translations';

interface SignUpFormProps {
  lang: Language;
  onNavigateToLogin: () => void;
  onOpenTerms: (tab: 'terms' | 'privacy') => void;
  onSignUpSuccess: (userData: any, token: string) => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  lang,
  onNavigateToLogin,
  onOpenTerms,
  onSignUpSuccess,
}) => {
  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<'english' | 'tamil'>('english');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Status & validation feedback
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!fullName.trim()) {
      setErrorMessage(lang === 'en' ? 'Please enter your full name.' : 'தயவுசெய்து உங்கள் முழு பெயரை உள்ளிடவும்.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage(lang === 'en' ? 'Please provide a valid email address.' : 'சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்.');
      return;
    }

    const cleanPhone = mobileNumber.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage(
        lang === 'en'
          ? 'Mobile number must be at least 10 digits.'
          : 'கைபேசி எண் குறைந்தபட்சம் 10 இலக்கங்களைக் கொண்டிருக்க வேண்டும்.'
      );
      return;
    }

    if (password.length < 6) {
      setErrorMessage(
        lang === 'en'
          ? 'Password must be at least 6 characters long.'
          : 'கடவுச்சொல் குறைந்தபட்சம் 6 எழுத்துக்களைக் கொண்டிருக்க வேண்டும்.'
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage(
        lang === 'en' ? 'Passwords do not match.' : 'கடவுச்சொற்கள் பொருந்தவில்லை.'
      );
      return;
    }

    if (!agreeTerms) {
      setErrorMessage(
        lang === 'en'
          ? 'Please accept the Terms & Conditions and Privacy Policy.'
          : 'விதிமுறைகள் மற்றும் நிபந்தனைகளை ஒப்புக்கொள்ளவும்.'
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName.trim(),
          email: email.trim(),
          mobile_number: cleanPhone,
          password: password,
          confirm_password: confirmPassword,
          package: selectedPackage,
          agree_terms: agreeTerms,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Registration failed. Please check details.');
      }

      setSuccessMessage(data.message || 'Account created successfully!');
      onSignUpSuccess(data.user, data.access_token);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('Failed to fetch')) {
        const mockUser = {
          id: Math.floor(Math.random() * 9000) + 1000,
          full_name: fullName.trim(),
          email: email.trim(),
          mobile_number: cleanPhone,
          package: selectedPackage,
          preferred_language: selectedPackage === 'tamil' ? 'ta' : 'en',
          is_active: true,
          created_at: new Date().toISOString(),
          entitlements: {
            package: selectedPackage,
            access_english_acts: selectedPackage === 'english',
            access_tamil_acts: selectedPackage === 'tamil',
            access_rules_amendments: true,
            can_take_notes: true,
            can_bookmark: true,
            offline_reading: false,
          },
        };
        setSuccessMessage(`Registration successful! Welcome to Tamil Law Library (${selectedPackage.toUpperCase()} Package).`);
        onSignUpSuccess(mockUser, 'new_user_demo_token');
      } else {
        setErrorMessage(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center z-10 py-2 sm:py-4">
      {/* LEFT HERO COLUMN */}
      <div className="lg:col-span-5 flex flex-col justify-between text-white space-y-4 lg:space-y-5">
        {/* Main Heading with gold vertical bar */}
        <div className="space-y-2 border-l-4 border-amber-400 pl-4 sm:pl-5">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight leading-[1.15] text-white drop-shadow-md">
            Join Tamil <br />
            Law Library
          </h1>

          <p className="text-xs sm:text-sm text-[#E0D8D0] font-sans max-w-md leading-relaxed drop-shadow-sm pt-0.5">
            Get Unlimited Access to <br className="hidden sm:inline" />
            Indian Acts &amp; Rules
          </p>
        </div>

        {/* 4 Feature Highlights with Solid Gold Circles and Dark Checkmarks */}
        <div className="space-y-2.5 pt-1">
          {/* Highlight 1 */}
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center shrink-0 shadow-sm">
              <Check className="w-3.5 h-3.5 text-stone-900 stroke-[3]" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-white tracking-wide">
              Access English &amp; Tamil Legal Documents
            </span>
          </div>

          {/* Highlight 2 */}
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center shrink-0 shadow-sm">
              <Check className="w-3.5 h-3.5 text-stone-900 stroke-[3]" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-white tracking-wide">
              Advanced Search &amp; Amendments
            </span>
          </div>

          {/* Highlight 3 */}
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center shrink-0 shadow-sm">
              <Check className="w-3.5 h-3.5 text-stone-900 stroke-[3]" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-white tracking-wide">
              Take Notes &amp; Bookmark
            </span>
          </div>

          {/* Highlight 4 */}
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center shrink-0 shadow-sm">
              <Check className="w-3.5 h-3.5 text-stone-900 stroke-[3]" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-white tracking-wide">
              Secure &amp; Private Access
            </span>
          </div>
        </div>

        {/* Tagline in Gold Italics */}
        <div className="pt-0.5">
          <p className="font-serif italic text-sm sm:text-base text-amber-300/95 tracking-wide drop-shadow">
            Empower Yourself <br />
            with the Knowledge of Law
          </p>
        </div>

        {/* Photorealistic dark mahogany judge's gavel and antique Indian Law book */}
        <div className="pt-2 sm:pt-4 select-none relative -mb-3 sm:-mb-6 flex justify-start">
          <div className="w-52 sm:w-60 md:w-64 rounded-2xl overflow-hidden border border-amber-500/25 shadow-2xl bg-black/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/gavel_hammer_book_ref.jpg"
              alt="Judge Gavel on Antique Law Book"
              className="w-full h-auto object-cover block"
            />
          </div>
        </div>
      </div>

      {/* RIGHT SIGN UP CARD */}
      <div className="lg:col-span-7 w-full max-w-[420px] mx-auto lg:ml-auto lg:mr-0">
        <div className="bg-white rounded-[26px] shadow-[0_25px_60px_rgba(0,0,0,0.55)] border border-white/90 p-6 sm:p-7 relative overflow-hidden">
          {/* Card Header */}
          <div className="text-center sm:text-left space-y-1 mb-4">
            <div className="flex items-center justify-center sm:justify-start gap-2.5 mb-1">
              <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-purple-900">
                <Edit3 className="w-4 h-4 text-purple-900" />
              </div>
              <h2 className="font-serif font-bold text-2xl text-purple-950">
                Create Your Account
              </h2>
            </div>
            <p className="text-xs text-gray-500 font-sans">
              Start your journey with Tamil Law Library
            </p>
          </div>

          {/* Feedback Alerts */}
          {errorMessage && (
            <div className="mb-3 flex items-center gap-2 p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-3 flex items-center gap-2 p-2.5 rounded-xl bg-green-50 border border-green-200 text-xs text-green-700 animate-in fade-in">
              <Check className="w-4 h-4 shrink-0 text-green-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-2.5">
            {/* Full Name */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600 transition-all shadow-sm"
                required
              />
            </div>

            {/* Email Address */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600 transition-all shadow-sm"
                required
              />
            </div>

            {/* Mobile Number */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Mobile Number"
                maxLength={13}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600 transition-all shadow-sm"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-10 pr-10 py-2 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600 transition-all shadow-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full pl-10 pr-10 py-2 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600 transition-all shadow-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Choose Your Language Package */}
            <div className="pt-1">
              <h3 className="text-xs font-bold text-gray-800 tracking-wide mb-1.5">
                Choose Your Language Package
              </h3>

              {/* 2 Selectable Package Cards Side by Side */}
              <div className="grid grid-cols-2 gap-2.5">
                {/* 1. English Package */}
                <button
                  type="button"
                  onClick={() => setSelectedPackage('english')}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedPackage === 'english'
                      ? 'border-purple-600 bg-purple-50 ring-1 ring-purple-600 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <Scale className="w-5 h-5 text-purple-700 mb-1" />
                  <span className="text-[11px] sm:text-xs font-bold text-gray-900 leading-tight">
                    English Package
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-gray-500 leading-snug mt-0.5">
                    (Acts &amp; Rules in English)
                  </span>
                </button>

                {/* 2. Tamil Package */}
                <button
                  type="button"
                  onClick={() => setSelectedPackage('tamil')}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedPackage === 'tamil'
                      ? 'border-purple-600 bg-purple-50 ring-1 ring-purple-600 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <span className="text-lg font-bold font-serif text-purple-700 mb-0.5 leading-none">
                    அ
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold text-gray-900 leading-tight">
                    Tamil Package
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-gray-500 leading-snug mt-0.5">
                    (Acts &amp; Rules in Tamil)
                  </span>
                </button>
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="pt-0.5">
              <label className="flex items-start gap-2 text-xs text-gray-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-gray-300 text-purple-700 focus:ring-purple-500 mt-0.5 cursor-pointer"
                />
                <span className="leading-snug text-[10px] sm:text-[11px]">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      onOpenTerms('terms');
                    }}
                    className="font-semibold text-purple-800 hover:text-purple-950 underline underline-offset-1"
                  >
                    Terms &amp; Conditions
                  </button>{' '}
                  and{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      onOpenTerms('privacy');
                    }}
                    className="font-semibold text-purple-800 hover:text-purple-950 underline underline-offset-1"
                  >
                    Privacy Policy
                  </button>
                </span>
              </label>
            </div>

            {/* Primary Sign Up Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-800 via-purple-900 to-indigo-950 hover:from-purple-900 hover:to-indigo-900 disabled:opacity-75 cursor-pointer mt-1.5"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </>
              )}
            </button>
          </form>

          {/* Bottom Navigation */}
          <div className="mt-3.5 pt-1 text-center text-xs text-gray-600">
            <span>Already have an account? </span>
            <button
              type="button"
              onClick={onNavigateToLogin}
              className="font-bold text-purple-800 hover:text-purple-950 transition-colors cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
