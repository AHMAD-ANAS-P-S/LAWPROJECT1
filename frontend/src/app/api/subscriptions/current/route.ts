import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    package_name: 'Tamil + English Package',
    description: 'Full access to Acts, Rules, Amendments, Notifications & Updates',
    status: 'Active',
    plan_type: 'Yearly',
    start_date: '07 Nov 2026',
    expiry_date: '06 Nov 2027',
    days_remaining: 672,
    auto_renewal: true,
    amount: '₹ 4,999',
    usage: {
      notes_count: 246,
      notes_limit: 1000,
      bookmarks_count: 328,
      bookmarks_limit: 1000,
      saved_searches_count: 56,
      saved_searches_limit: 500,
      pdf_exports_count: 18,
      pdf_exports_limit: 200,
    },
    invoices: [
      { id: 'TRL-INV-0045', plan: 'Yearly', amount: '₹ 4,999', date: '07 Nov 2026', status: 'Paid' },
      { id: 'TRL-INV-0038', plan: 'Yearly', amount: '₹ 4,999', date: '07 Nov 2025', status: 'Paid' },
      { id: 'TRL-INV-0031', plan: 'Yearly', amount: '₹ 4,999', date: '07 Nov 2024', status: 'Paid' },
    ],
  });
}
