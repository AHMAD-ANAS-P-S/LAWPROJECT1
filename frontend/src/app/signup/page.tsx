'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { LawLibraryLayout } from '../../components/LawLibraryLayout';
import { SignUpForm } from '../../components/SignUpForm';

export default function SignUpPage() {
  const router = useRouter();

  const handleSignUpSuccess = (user: any, token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = '/dashboard';
    }
  };

  return (
    <LawLibraryLayout activePage="signup">
      {({ lang, openTerms }) => (
        <SignUpForm
          lang={lang}
          onNavigateToLogin={() => router.push('/login')}
          onOpenTerms={openTerms}
          onSignUpSuccess={handleSignUpSuccess}
        />
      )}
    </LawLibraryLayout>
  );
}
