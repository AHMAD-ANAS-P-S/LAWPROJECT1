import { NextResponse } from 'next/server';

const initialBookmarks = [
  {
    id: 1,
    document_id: 'act-1872-1',
    title: 'Indian Evidence Act, 1872',
    badge: { label: 'Act', bg: 'bg-[#EDE9FE]', text: 'text-[#7C3AED]', border: 'border-[#DDD6FE]' },
    iconType: 'scale',
    reference: 'Central Act',
    subRef: 'Act No. 1 of 1872',
    bookmarkedAt: '15 Jul 2024',
    type: 'Act',
    tag: 'Evidence',
    year: '2024',
    isImportant: true,
    content: 'An Act to consolidate, define and amend the law of Evidence in India, enacted on 15 March 1872.',
  },
  {
    id: 2,
    document_id: 'rule-1972-1',
    title: 'Indian Evidence Rules, 1972',
    badge: { label: 'Rule', bg: 'bg-[#FCE7F3]', text: 'text-[#BE185D]', border: 'border-[#FBCFE8]' },
    iconType: 'fileEdit',
    reference: 'Central Rules',
    subRef: 'Rule No. 1 of 1972',
    bookmarkedAt: '12 Jul 2024',
    type: 'Rule',
    tag: 'Procedure',
    year: '2024',
    isImportant: true,
    content: 'Procedural rules and operational guidelines framed under the Indian Evidence framework.',
  },
  {
    id: 3,
    document_id: 'sec-65b',
    title: 'Section 65B – Electronic Records',
    badge: { label: 'Section', bg: 'bg-[#FEF3C7]', text: 'text-[#B45309]', border: 'border-[#FDE68A]' },
    iconType: 'layers',
    reference: 'Indian Evidence Act, 1872',
    subRef: 'Section 65B',
    bookmarkedAt: '10 Jul 2024',
    type: 'Section',
    tag: 'IT & Digital',
    year: '2024',
    isImportant: true,
    content: 'Admissibility of electronic records and computer outputs as evidence in Indian courts.',
  },
  {
    id: 4,
    document_id: 'amend-2023',
    title: 'Amendment to Indian Evidence Act, 1872 (2023)',
    badge: { label: 'Amendment', bg: 'bg-[#FFEDD5]', text: 'text-[#C2410C]', border: 'border-[#FED7AA]' },
    iconType: 'gavel',
    reference: 'Amendment',
    subRef: 'G.S.R. 2547(E)',
    bookmarkedAt: '08 Jul 2024',
    type: 'Amendment',
    tag: 'Criminal Law',
    year: '2023',
    isImportant: true,
    content: 'Recent legislative amendment streamlining digital forensics and forensic lab certificates.',
  },
  {
    id: 5,
    document_id: 'notif-1968',
    title: 'Notification under Indian Evidence Act, 1872',
    badge: { label: 'Notification', bg: 'bg-[#E0E7FF]', text: 'text-[#4338CA]', border: 'border-[#C7D2FE]' },
    iconType: 'bell',
    reference: 'Notification',
    subRef: 'S.O. 1968(E)',
    bookmarkedAt: '05 Jul 2024',
    type: 'Notification',
    tag: 'Important',
    year: '2024',
    isImportant: true,
    content: 'Official Gazette notification designating certifying authorities under Section 79A.',
  },
];

export async function GET() {
  return NextResponse.json({
    bookmarks: initialBookmarks,
    total: initialBookmarks.length,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newBookmark = {
      id: Date.now(),
      document_id: `doc-${Date.now()}`,
      title: body.title || 'Untitled Document',
      badge: {
        label: body.type || 'Act',
        bg: 'bg-[#EDE9FE]',
        text: 'text-[#7C3AED]',
        border: 'border-[#DDD6FE]',
      },
      iconType: 'scale',
      reference: body.reference || 'Central Reference',
      subRef: body.subRef || '',
      bookmarkedAt: 'Today',
      type: body.type || 'Act',
      tag: body.tag || 'Evidence',
      year: body.year || '2024',
      isImportant: body.isImportant ?? true,
      content: body.content || '',
    };
    return NextResponse.json({
      message: 'Bookmark added successfully!',
      bookmark: newBookmark,
    });
  } catch (e) {
    return NextResponse.json({ detail: 'Failed to add bookmark.' }, { status: 500 });
  }
}
