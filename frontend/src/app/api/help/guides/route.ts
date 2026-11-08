import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    guides: [
      {
        id: 'guide-search',
        title: 'How to Search Acts, Rules and Sections',
        desc: 'Learn to use the search and advanced search features effectively.',
        category: 'search',
        videoUrl: '#',
      },
      {
        id: 'guide-notes',
        title: 'How to Create and Manage Notes',
        desc: 'Create, edit, tag and organize your legal notes.',
        category: 'notes',
        videoUrl: '#',
      },
      {
        id: 'guide-bookmarks',
        title: 'How to Add and Use Bookmarks',
        desc: 'Save important Acts, Sections and Notifications for quick access.',
        category: 'bookmarks',
        videoUrl: '#',
      },
      {
        id: 'guide-updates',
        title: 'How to Track Amendments & Updates',
        desc: 'Stay updated with the latest amendments, rules and notifications.',
        category: 'amendments',
        videoUrl: '#',
      },
    ],
  });
}
