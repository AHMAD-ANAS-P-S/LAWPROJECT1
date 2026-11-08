'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LawLibraryLayout } from '../../components/LawLibraryLayout';
import { LoginForm } from '../../components/LoginForm';

export default function LoginPage() {
  const router = useRouter();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        router.push('/dashboard');
      }
    }
  }, [router]);

  const handleLoginSuccess = (user: any, token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
    // Navigate cleanly to /dashboard so URL reflects actual page
    router.push('/dashboard');
  };

  return (
    <LawLibraryLayout activePage="login">
      {({ lang, openForgotPassword, openTerms }) => (
        <LoginForm
          lang={lang}
          onNavigateToSignUp={() => router.push('/signup')}
          onOpenForgotPassword={openForgotPassword}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </LawLibraryLayout>
  );
}
