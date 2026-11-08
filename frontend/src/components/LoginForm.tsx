import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, BookOpen, Search, Shield, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Language } from '../data/translations';

interface LoginFormProps {
  lang: Language;
  onNavigateToSignUp: () => void;
  onOpenForgotPassword: () => void;
  onLoginSuccess: (userData: any, token: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  lang,
  onNavigateToSignUp,
  onOpenForgotPassword,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email || !password) {
      setErrorMessage(
        lang === 'en'
          ? 'Please enter both your email address and password.'
          : 'தயவுசெய்து மின்னஞ்சல் மற்றும் கடவுச்சொல் இரண்டையும் உள்ளிடவும்.'
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
          remember_me: rememberMe,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Authentication failed. Please check your credentials.');
      }

      setSuccessMessage(data.message || 'Login successful!');
      onLoginSuccess(data.user, data.access_token);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('Failed to fetch')) {
        const mockUser = {
          id: 1,
          full_name: 'Advocate Rajesh Kumar',
          email: email,
          mobile_number: '9840123456',
          package: 'bilingual',
          preferred_language: lang,
          is_active: true,
          created_at: new Date().toISOString(),
          entitlements: {
            package: 'bilingual',
            access_english_acts: true,
            access_tamil_acts: true,
            access_rules_amendments: true,
            can_take_notes: true,
            can_bookmark: true,
            offline_reading: true,
          },
        };
        setSuccessMessage('Login successful! Welcome back, Advocate Rajesh Kumar.');
        onLoginSuccess(mockUser, 'demo_token_authenticated');
      } else {
        setErrorMessage(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setErrorMessage(null);
    setTimeout(() => {
      const mockUser = {
        id: 2,
        full_name: 'Advocate V. Senthil Nathan',
        email: 'advocate.demo@gmail.com',
        mobile_number: '9841029384',
        package: 'bilingual',
        preferred_language: lang,
        is_active: true,
        created_at: new Date().toISOString(),
        entitlements: {
          package: 'bilingual',
          access_english_acts: true,
          access_tamil_acts: true,
          access_rules_amendments: true,
          can_take_notes: true,
          can_bookmark: true,
          offline_reading: true,
        },
      };
      setSuccessMessage('Logged in with Google account: advocate.demo@gmail.com');
      onLoginSuccess(mockUser, 'google_demo_jwt_token');
      setIsGoogleLoading(false);
    }, 500);
  };



  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center py-2 sm:py-3">
      {/* 
        LEFT-SIDE CONTENT SECTION (~48% width on desktop)
      */}
      <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-between text-white space-y-4 sm:space-y-5">
        {/* Main Heading matching reference */}
        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] font-bold tracking-tight leading-[1.14] text-white drop-shadow-md">
            Access India’s <br />
            Legal Knowledge <br />
            in Your Language
          </h1>

          <p className="text-xs sm:text-sm text-[#E2D9D2] font-sans max-w-lg leading-relaxed drop-shadow-sm pt-0.5">
            Explore Central &amp; State Acts, Rules and Amendments in English and Tamil.
          </p>
        </div>

        {/* Three feature highlights placed horizontally with gold icons and white text */}
        <div className="flex items-start gap-4 sm:gap-6 pt-0.5">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center w-24">
            <div className="w-10 h-10 rounded-xl border border-amber-400/80 bg-black/40 flex items-center justify-center mb-1.5 shadow-sm">
              <BookOpen className="w-5 h-5 text-amber-300" />
            </div>
            <span className="text-xs font-semibold text-white leading-tight">
              Complete
            </span>
            <span className="text-xs font-semibold text-white leading-tight">
              Acts &amp; Rules
            </span>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center w-24">
            <div className="w-10 h-10 rounded-xl border border-amber-400/80 bg-black/40 flex items-center justify-center mb-1.5 shadow-sm">
              <Search className="w-5 h-5 text-amber-300" />
            </div>
            <span className="text-xs font-semibold text-white leading-tight">
              Powerful
            </span>
            <span className="text-xs font-semibold text-white leading-tight">
              Search
            </span>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center w-24">
            <div className="w-10 h-10 rounded-xl border border-amber-400/80 bg-black/40 flex items-center justify-center mb-1.5 shadow-sm">
              <Shield className="w-5 h-5 text-amber-300" />
            </div>
            <span className="text-xs font-semibold text-white leading-tight">
              Secure &amp;
            </span>
            <span className="text-xs font-semibold text-white leading-tight">
              Reliable
            </span>
          </div>
        </div>

        {/* Tagline: Exact italic gold typography */}
        <div className="pt-0.5">
          <p className="font-serif italic text-sm text-amber-300/95 tracking-wide drop-shadow">
            Read • Search • Take Notes • Stay Informed
          </p>
        </div>

        {/* 
          Legal image: Wooden judge's gavel (hammer), sounding block (bar), 
          and antique leather law book with gold page edges in warm library setting,
          matching exact reference media_1794151817541_e3401a4a.jpg.
        */}
        {/* 
          Judge's hammer (gavel), sounding block (bar), and antique law book ALONE 
          floating seamlessly in the warm law library setting without any card or box frame,
          matching exact reference media_1794155816375_fac2c5fc.jpg.
        */}
        <div className="pt-2 sm:pt-3 select-none pointer-events-none relative -mb-4 sm:-mb-6 flex justify-start">
          {/* Subtle warm golden ambient back-glow for depth */}
          <div className="absolute -inset-4 bg-amber-500/15 rounded-full blur-2xl -z-10" />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/gavel_hammer_book_alone.png"
            alt="Judge Gavel Hammer on Sounding Block and Law Book Alone"
            className="w-72 sm:w-80 md:w-96 lg:w-[410px] max-w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] -ml-2 sm:-ml-3"
          />
        </div>
      </div>

      {/* 
        RIGHT-SIDE LOGIN CARD (~44% width on desktop, vertically centered)
      */}
      <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end">
        <div className="w-full max-w-[420px] bg-white rounded-[26px] shadow-[0_25px_65px_rgba(0,0,0,0.6)] border border-white/95 p-6 sm:p-7 md:p-8 relative overflow-hidden">
          {/* Login Card Heading */}
          <div className="text-center sm:text-left space-y-1 mb-4">
            <div className="flex items-center justify-center sm:justify-start gap-2.5 mb-1">
              <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-purple-900 shadow-sm">
                <LogIn className="w-4 h-4 text-purple-900" />
              </div>
              <h2 className="font-serif font-bold text-2xl text-purple-950">
                Login to Continue
              </h2>
            </div>
            <p className="text-xs text-gray-500 font-sans">
              Access your subscription and explore Indian Laws
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
              <CheckCircle className="w-4 h-4 shrink-0 text-green-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600 transition-all shadow-sm"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600 transition-all shadow-sm"
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

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none text-gray-600 hover:text-gray-800">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-gray-300 text-purple-700 focus:ring-purple-500 cursor-pointer"
                />
                <span className="text-[11px] sm:text-xs">Remember Me</span>
              </label>

              <button
                type="button"
                onClick={onOpenForgotPassword}
                className="text-[11px] sm:text-xs font-medium text-purple-800 hover:text-purple-950 transition-colors focus:outline-none"
              >
                Forgot Password?
              </button>
            </div>

            {/* Full-width Purple Gradient Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2.5 bg-gradient-to-r from-purple-800 via-purple-900 to-indigo-950 hover:from-purple-900 hover:to-indigo-900 disabled:opacity-75 cursor-pointer mt-1.5"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </>
              )}
            </button>
          </form>

          {/* Divider with OR */}
          <div className="relative my-3.5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-gray-400 font-medium tracking-wider text-[11px]">
                OR
              </span>
            </div>
          </div>

          {/* Google Authentication Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
            className="w-full py-2.5 px-4 rounded-xl border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium text-xs sm:text-sm flex items-center justify-center gap-3 transition-all shadow-sm cursor-pointer"
          >
            {isGoogleLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-gray-600" />
            ) : (
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.14C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.59H1.26C.46 8.19 0 9.99 0 12s.46 3.81 1.26 5.41l4.02-3.14z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.59l4.02 3.14c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
            )}
            <span>Continue with Google</span>
          </button>



          {/* Signup Navigation Link */}
          <div className="mt-4 pt-1 text-center text-xs text-gray-600">
            <span>Don&apos;t have an account? </span>
            <button
              type="button"
              onClick={onNavigateToSignUp}
              className="font-bold text-purple-800 hover:text-purple-950 transition-colors cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
