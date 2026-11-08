'use client';

import React from 'react';
import { DashboardView } from '../../components/DashboardView';

export default function HelpPage() {
  const mockUser = {
    full_name: 'Adv. R. Karthik',
    email: 'karthik.advocate@gmail.com',
    package: 'English Package',
    valid_till: '06 Nov 2027',
  };

  return <DashboardView user={mockUser} initialNav="help" />;
}
