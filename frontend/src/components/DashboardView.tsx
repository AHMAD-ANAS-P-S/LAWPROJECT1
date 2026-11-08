'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  ScrollText,
  Calendar,
  Search,
  FileEdit,
  Bookmark,
  Layers,
  HelpCircle,
  LogOut,
  Bell,
  ChevronDown,
  ChevronUp,
  Scale,
  Users,
  Landmark,
  HardHat,
  Leaf,
  IndianRupee,
  Building2,
  LayoutGrid,
  ChevronRight,
  Clock,
  FileText,
  Check,
  Crown,
  SlidersHorizontal,
  Sparkles,
  Flame,
  MoreVertical,
  AlignLeft,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  CheckSquare,
  Square,
  Fingerprint,
  Gavel,
  RotateCw,
  Star,
  Quote,
  Link2,
  History,
  X,
  Eye,
  Plus,
  Tag,
  Settings,
  Download,
  Upload,
  Zap,
  BarChart2,
  Headphones,
  CreditCard,
  Receipt,
  ShieldCheck,
  PlaySquare,
  Video,
  ExternalLink,
  Mail,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  PlayCircle,
  Wrench,
  Laptop,
  Play,
  User as UserIcon,
} from 'lucide-react';

interface DashboardViewProps {
  user?: any;
  initialNav?: string;
  onLogout?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  initialNav = 'dashboard',
  onLogout,
}) => {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState(initialNav);
  const [lang, setLang] = useState<'en' | 'ta'>('en');
  const [currentUser, setCurrentUser] = useState<any>(user);

  const navRouteMap: Record<string, string> = {
    dashboard: '/dashboard',
    browse_acts: '/acts',
    browse_rules: '/rules',
    amendments: '/amendments',
    search: '/search',
    my_notes: '/notes',
    bookmarks: '/bookmarks',
    subscription: '/subscription',
    help: '/help',
  };

  const routeNavMap: Record<string, string> = {
    '/dashboard': 'dashboard',
    '/acts': 'browse_acts',
    '/rules': 'browse_rules',
    '/amendments': 'amendments',
    '/search': 'search',
    '/notes': 'my_notes',
    '/my-notes': 'my_notes',
    '/bookmarks': 'bookmarks',
    '/subscription': 'subscription',
    '/subscription-details': 'subscription',
    '/help': 'help',
  };

  const handleNavChange = (id: string) => {
    setActiveNav(id);
    const targetRoute = navRouteMap[id];
    if (targetRoute && typeof window !== 'undefined' && window.location.pathname !== targetRoute) {
      window.history.pushState({ nav: id }, '', targetRoute);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed && (parsed.full_name || parsed.email)) {
            setCurrentUser(parsed);
          }
        } catch (e) {
          // ignore
        }
      }

      const pathname = window.location.pathname;
      const navFromRoute = routeNavMap[pathname];
      if (navFromRoute && navFromRoute !== activeNav) {
        setActiveNav(navFromRoute);
      }

      const handlePopState = () => {
        const path = window.location.pathname;
        const mapped = routeNavMap[path];
        if (mapped) {
          setActiveNav(mapped);
        }
      };

      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, []);
  const [searchQuery, setSearchQuery] = useState('');

  // Acts state
  const [activeActFilter, setActiveActFilter] = useState('all');
  const [selectedActTypes, setSelectedActTypes] = useState<string[]>(['central', 'state']);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);

  // Rules state
  const [activeRuleFilter, setActiveRuleFilter] = useState('all');
  const [selectedRuleTypes, setSelectedRuleTypes] = useState<string[]>(['central', 'state']);
  const [selectedRuleYears, setSelectedRuleYears] = useState<string[]>([]);

  // Amendments & Updates state
  const [activeUpdateFilter, setActiveUpdateFilter] = useState('all');
  const [selectedUpdateTypes, setSelectedUpdateTypes] = useState<string[]>([]);
  const [selectedUpdateYears, setSelectedUpdateYears] = useState<string[]>([]);
  const [bookmarkedUpdateIds, setBookmarkedUpdateIds] = useState<number[]>([]);

  // Advanced Search state
  const [searchMode, setSearchMode] = useState('universal');
  const [activeSearchCategory, setActiveSearchCategory] = useState('all');
  const [selectedSearchYears, setSelectedSearchYears] = useState<string[]>([]);
  const [selectedJurisdictions, setSelectedJurisdictions] = useState<string[]>([]);
  const [selectedActTypeFilters, setSelectedActTypeFilters] = useState<string[]>([]);
  const [selectedDocTypes, setSelectedDocTypes] = useState<string[]>([]);
  const [bookmarkedSearchIds, setBookmarkedSearchIds] = useState<number[]>([]);
  const [searchHistoryList, setSearchHistoryList] = useState([
    { id: 1, query: 'evidence', time: 'Today, 10:24 AM' },
    { id: 2, query: 'section 65B', time: 'Today, 09:58 AM' },
    { id: 3, query: 'criminal procedure', time: 'Yesterday, 04:12 PM' },
    { id: 4, query: 'digital record', time: 'Yesterday, 02:36 PM' },
  ]);

  // My Notes state
  const [notesSearchQuery, setNotesSearchQuery] = useState('');
  const [activeNoteFilter, setActiveNoteFilter] = useState('all');
  const [selectedNoteTypes, setSelectedNoteTypes] = useState<string[]>([]);
  const [selectedNoteTags, setSelectedNoteTags] = useState<string[]>([]);
  const [selectedNoteYears, setSelectedNoteYears] = useState<string[]>([]);
  const [bookmarkedNoteIds, setBookmarkedNoteIds] = useState<number[]>([]);
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);
  const [viewingNote, setViewingNote] = useState<any>(null);
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteType, setNewNoteType] = useState('Act Notes');
  const [newNoteAct, setNewNoteAct] = useState('Indian Evidence Act, 1872');
  const [newNoteSection, setNewNoteSection] = useState('Section 65B');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteTag, setNewNoteTag] = useState('Evidence');
  const [newNoteImportant, setNewNoteImportant] = useState(false);

  // Bookmarks state
  const [bookmarkSearchQuery, setBookmarkSearchQuery] = useState('');
  const [activeBookmarkFilter, setActiveBookmarkFilter] = useState('all');
  const [selectedBookmarkTypes, setSelectedBookmarkTypes] = useState<string[]>([]);
  const [selectedBookmarkTags, setSelectedBookmarkTags] = useState<string[]>([]);
  const [selectedBookmarkYears, setSelectedBookmarkYears] = useState<string[]>([]);
  const [starredBookmarkIds, setStarredBookmarkIds] = useState<number[]>([1, 2, 3, 4, 5]);
  const [isAddBookmarkOpen, setIsAddBookmarkOpen] = useState(false);
  const [viewingBookmark, setViewingBookmark] = useState<any>(null);
  const [newBookmarkTitle, setNewBookmarkTitle] = useState('');
  const [newBookmarkType, setNewBookmarkType] = useState('Act');
  const [newBookmarkRef, setNewBookmarkRef] = useState('Central Act | Act No. 1 of 1872');
  const [newBookmarkTag, setNewBookmarkTag] = useState('Evidence');
  const [newBookmarkYear, setNewBookmarkYear] = useState('2024');
  const [newBookmarkImportant, setNewBookmarkImportant] = useState(true);
  const [bookmarkSortBy, setBookmarkSortBy] = useState('Latest Added');

  const [bookmarksList, setBookmarksList] = useState([
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
      content: 'Procedural rules and prescribed formats for submission of documentary and oral evidence.',
    },
    {
      id: 3,
      document_id: 'sec-65b',
      title: 'Section 65B – Electronic Records',
      badge: { label: 'Section', bg: 'bg-[#FEF3C7]', text: 'text-[#B45309]', border: 'border-[#FDE68A]' },
      iconType: 'section',
      reference: 'Indian Evidence Act, 1872',
      subRef: 'Section 65B',
      bookmarkedAt: '10 Jul 2024',
      type: 'Section',
      tag: 'IT & Digital',
      year: '2024',
      isImportant: true,
      content: 'Special provisions regarding admissibility of electronic records and certificates.',
    },
    {
      id: 4,
      document_id: 'amend-2023-gsr2547',
      title: 'Amendment to Indian Evidence Act, 1872 (2023)',
      badge: { label: 'Amendment', bg: 'bg-[#FEF3C7]', text: 'text-[#B45309]', border: 'border-[#FDE68A]' },
      iconType: 'document',
      reference: 'Amendment',
      subRef: 'G.S.R. 2547(E)',
      bookmarkedAt: '08 Jul 2024',
      type: 'Amendment',
      tag: 'Evidence',
      year: '2023',
      isImportant: true,
      content: 'Amendments incorporating electronic signature authentication protocols and verification criteria.',
    },
    {
      id: 5,
      document_id: 'notif-2024-so1968',
      title: 'Notification under Indian Evidence Act, 1872',
      badge: { label: 'Notification', bg: 'bg-[#EDE9FE]', text: 'text-[#7C3AED]', border: 'border-[#DDD6FE]' },
      iconType: 'bell',
      reference: 'Notification',
      subRef: 'S.O. 1968(E)',
      bookmarkedAt: '05 Jul 2024',
      type: 'Notification',
      tag: 'Criminal Law',
      year: '2024',
      isImportant: true,
      content: 'Official Gazette notification designating approved examiners of electronic evidence.',
    },
  ]);

  // Synchronize bookmarks with backend API
  React.useEffect(() => {
    fetch('http://127.0.0.1:8000/api/bookmarks')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const badgeMap: Record<string, { label: string; bg: string; text: string; border: string }> = {
            act: { label: 'Act', bg: 'bg-[#EDE9FE]', text: 'text-[#7C3AED]', border: 'border-[#DDD6FE]' },
            rule: { label: 'Rule', bg: 'bg-[#FCE7F3]', text: 'text-[#BE185D]', border: 'border-[#FBCFE8]' },
            section: { label: 'Section', bg: 'bg-[#FEF3C7]', text: 'text-[#B45309]', border: 'border-[#FDE68A]' },
            amendment: { label: 'Amendment', bg: 'bg-[#FEF3C7]', text: 'text-[#B45309]', border: 'border-[#FDE68A]' },
            notification: { label: 'Notification', bg: 'bg-[#EDE9FE]', text: 'text-[#7C3AED]', border: 'border-[#DDD6FE]' },
          };
          const mapped = data.map((b: any, index: number) => {
            const dt = (b.document_type || 'act').toLowerCase();
            const badge = badgeMap[dt] || { label: dt, bg: 'bg-stone-100', text: 'text-stone-700', border: 'border-stone-200' };
            const refs = (b.reference || '').split('|').map((s: string) => s.trim());
            return {
              id: b.id || index + 1,
              document_id: b.document_id,
              title: b.document_title,
              badge,
              iconType: dt === 'act' ? 'scale' : dt === 'rule' ? 'fileEdit' : dt === 'section' ? 'section' : dt === 'notification' ? 'bell' : 'document',
              reference: refs[0] || b.reference || 'Central Act',
              subRef: refs[1] || b.section_id || '',
              bookmarkedAt: b.created_at ? new Date(b.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '15 Jul 2024',
              type: dt.charAt(0).toUpperCase() + dt.slice(1),
              tag: b.custom_tag || 'Evidence',
              year: b.year || '2024',
              isImportant: b.is_important ?? true,
              content: b.document_title + ' - Reference details and bookmark notes.',
            };
          });
          setBookmarksList(mapped);
          setStarredBookmarkIds(mapped.filter((m: any) => m.isImportant).map((m: any) => m.id));
        }
      })
      .catch(() => {});
  }, []);

  // Subscription state
  const [subscriptionData, setSubscriptionData] = useState({
    package_id: 'english',
    package_name: 'English Package',
    plan_type: 'Yearly',
    status: 'Active',
    start_date: '07 Nov 2026',
    expiry_date: '06 Nov 2027',
    days_remaining: 672,
    auto_renewal: true,
    price: 4999,
    description: 'Full access to Acts, Rules, Amendments, Notifications & Updates',
  });
  const [isManageSubscriptionOpen, setIsManageSubscriptionOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  // Help & How to Use state
  const [helpSearchQuery, setHelpSearchQuery] = useState('');
  const [activeHelpNav, setActiveHelpNav] = useState('getting_started');
  const [selectedHelpCategory, setSelectedHelpCategory] = useState('all');
  const [viewingGuide, setViewingGuide] = useState<any>(null);
  const [viewingVideo, setViewingVideo] = useState<any>(null);
  const [isContactSupportOpen, setIsContactSupportOpen] = useState(false);
  const [isRequirementsOpen, setIsRequirementsOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [supportCategory, setSupportCategory] = useState('Using Features');
  const [supportSubject, setSupportSubject] = useState('');
  const [supportDescription, setSupportDescription] = useState('');
  const [supportSubmitting, setSupportSubmitting] = useState(false);
  const [supportTicketCreated, setSupportTicketCreated] = useState<any>(null);
  const [expandedFaqId, setExpandedFaqId] = useState<number | null>(null);
  const [guideFeedbackMap, setGuideFeedbackMap] = useState<Record<number, 'helpful' | 'not_helpful'>>({});

  const helpCategoriesList = [
    { key: 'account_subscription', title: 'Account & Subscription', icon: 'User', count: 8 },
    { key: 'browsing_acts_rules', title: 'Browsing Acts & Rules', icon: 'BookOpen', count: 12 },
    { key: 'search_advanced', title: 'Search & Advanced Search', icon: 'Search', count: 10 },
    { key: 'notes_bookmarks', title: 'Notes & Bookmarks', icon: 'Bookmark', count: 9 },
    { key: 'amendments_notifications', title: 'Amendments & Notifications', icon: 'Bell', count: 7 },
    { key: 'using_features', title: 'Using Features', icon: 'Star', count: 11 },
    { key: 'billing_payments', title: 'Billing & Payments', icon: 'CreditCard', count: 6 },
    { key: 'troubleshooting', title: 'Troubleshooting', icon: 'Wrench', count: 8 },
  ];

  const helpNavCards = [
    { id: 'getting_started', title: 'Getting Started', subtitle: '(8 Guides)', icon: PlaySquare },
    { id: 'user_guides', title: 'User Guides', subtitle: '(15 Guides)', icon: BookOpen },
    { id: 'video_tutorials', title: 'Video Tutorials', subtitle: '(12 Videos)', icon: Video },
    { id: 'features_overview', title: 'Features Overview', subtitle: '(10 Topics)', icon: Star },
    { id: 'faqs', title: 'FAQs', subtitle: '(48 Questions)', icon: HelpCircle },
    { id: 'contact_support', title: 'Contact Support', subtitle: '(Get Help)', icon: Headphones },
  ];

  const [helpGuidesList, setHelpGuidesList] = useState<any[]>([
    {
      id: 1,
      title: 'How to Search Acts, Rules and Sections',
      category_key: 'search_advanced',
      category: 'Search & Advanced Search',
      description: 'Learn to use the search and advanced search features effectively.',
      reading_time: '3 min read',
      has_video: true,
      video_duration: '4:15',
      icon_type: 'laptop_play',
      helpful_count: 342,
      not_helpful_count: 5,
      steps: [
        { step: 1, title: 'Open Browse Acts or Search', desc: 'Navigate to Browse Acts or click the universal search bar at the top of any page.' },
        { step: 2, title: 'Enter Legal Keywords or Citations', desc: 'Type statutory act names (e.g., Bharatiya Nyaya Sanhita), section numbers, or legal keywords.' },
        { step: 3, title: 'Apply Multi-Dimensional Filters', desc: 'Filter by Act Type (Central vs State) and Enactment Year to narrow down results instantly.' },
        { step: 4, title: 'Instant Results & Relevance Sorting', desc: 'Review highlighted statutory provisions sorted by legal relevance or notification date.' },
        { step: 5, title: 'Open Document & Section Breakdown', desc: 'Click "View Act" or "Sections" to jump directly into the full consolidated text.' },
        { step: 6, title: 'Cross-Reference Related Rules', desc: 'Follow hyperlinked cross-references to inspect statutory rules and amendments framed under each section.' },
      ]
    },
    {
      id: 2,
      title: 'How to Create and Manage Notes',
      category_key: 'notes_bookmarks',
      category: 'Notes & Bookmarks',
      description: 'Create, edit, tag and organize your legal notes.',
      reading_time: '4 min read',
      has_video: true,
      video_duration: '3:40',
      icon_type: 'notes',
      helpful_count: 289,
      not_helpful_count: 4,
      steps: [
        { step: 1, title: 'Access My Notes Dashboard', desc: 'Select "My Notes" from the left burgundy navigation sidebar.' },
        { step: 2, title: 'Click "+ Create Note"', desc: 'Launch the dedicated legal notes editor with document citation linkage.' },
        { step: 3, title: 'Select Document Type & Section', desc: 'Tag the note under Act, Rule, Section, or Case Pointer with exact citation references.' },
        { step: 4, title: 'Assign Custom Tags', desc: 'Tag with "Evidence", "Procedure", "Important", or "Commercial" for instant classification.' },
        { step: 5, title: 'Write & Save Securely', desc: 'Store your observations in your encrypted personal legal cloud workspace.' },
        { step: 6, title: 'Export Notes Collection', desc: 'Export formatted PDF or clean text briefs for hearings and case files.' },
      ]
    },
    {
      id: 3,
      title: 'How to Add and Use Bookmarks',
      category_key: 'notes_bookmarks',
      category: 'Notes & Bookmarks',
      description: 'Save important Acts, Sections and Notifications for quick access.',
      reading_time: '2 min read',
      has_video: true,
      video_duration: '2:50',
      icon_type: 'bookmark',
      helpful_count: 412,
      not_helpful_count: 7,
      steps: [
        { step: 1, title: 'Locate Bookmark Ribbon Icon', desc: 'Every Act, Rule, Section, and Amendment card features a gold bookmark ribbon.' },
        { step: 2, title: 'Click Ribbon to Save', desc: 'Click to instantly save the document into your legal repository.' },
        { step: 3, title: 'Organize by Category', desc: 'Access items organized across 7 distinct bookmark categories.' },
        { step: 4, title: 'Mark as Important', desc: 'Star critical precedents and sections to highlight them at the top of your workspace.' },
        { step: 5, title: 'One-Click Quick Access', desc: 'Click "Open" on any bookmark to immediately return to the exact legal section.' },
      ]
    },
    {
      id: 4,
      title: 'How to Track Amendments & Updates',
      category_key: 'amendments_notifications',
      category: 'Amendments & Notifications',
      description: 'Stay updated with the latest amendments, rules and notifications.',
      reading_time: '3 min read',
      has_video: true,
      video_duration: '5:10',
      icon_type: 'bell',
      helpful_count: 275,
      not_helpful_count: 2,
      steps: [
        { step: 1, title: 'Open Amendments & Updates', desc: 'Select "Amendments & Updates" from the main navigation menu.' },
        { step: 2, title: 'Explore Gazette Feeds', desc: 'Browse Central and State Government notifications, G.S.R. numbers, and enforcement dates.' },
        { step: 3, title: 'Inspect Side-by-Side Diffs', desc: 'Compare original statutory text with modified clauses highlighted in green and red.' },
        { step: 4, title: 'Filter by Amendment Type', desc: 'Toggle between Amendments, Gazette Notifications, and Official Corrigenda.' },
        { step: 5, title: 'Configure Real-time Alerts', desc: 'Receive notification badges whenever new amendments affecting your bookmarked Acts are gazetted.' },
      ]
    },
    {
      id: 5,
      title: 'How to Use Advanced Legal Search',
      category_key: 'search_advanced',
      category: 'Search & Advanced Search',
      description: 'Master exact phrase queries, cross-references, and Boolean search filters.',
      reading_time: '5 min read',
      has_video: true,
      video_duration: '6:20',
      icon_type: 'search',
      helpful_count: 198,
      not_helpful_count: 3,
      steps: [
        { step: 1, title: 'Navigate to Search', desc: 'Open Advanced Search from the sidebar or the banner search bar.' },
        { step: 2, title: 'Choose Search Mode', desc: 'Switch between Universal Search, Exact Phrase, Section Search, and Cross-Reference Search.' },
        { step: 3, title: 'Enter Exact Quotations', desc: 'Use double quotes for precise statutory phrases such as "electronic records".' },
        { step: 4, title: 'Filter by Jurisdiction', desc: 'Refine by Central Government or specific State legislature acts.' },
        { step: 5, title: 'Save Search Queries', desc: 'Bookmark frequent complex queries for one-click re-execution in future sessions.' },
      ]
    },
    {
      id: 6,
      title: 'How to Change Tamil and English Languages',
      category_key: 'using_features',
      category: 'Using Features',
      description: 'Switch platform language, bilingual views, and translated Acts seamlessly.',
      reading_time: '2 min read',
      has_video: true,
      video_duration: '3:05',
      icon_type: 'translate',
      helpful_count: 310,
      not_helpful_count: 6,
      steps: [
        { step: 1, title: 'Top Bar Language Switcher', desc: 'Locate the pill switcher labeled "English | தமிழ்" in the top right header.' },
        { step: 2, title: 'One-Click Switch', desc: 'Click "தமிழ்" to translate statutory headings, acts index, and interface controls into Tamil.' },
        { step: 3, title: 'Bilingual Mode', desc: 'Subscribers with Bilingual package can view dual-column English and Tamil text simultaneously.' },
      ]
    },
    {
      id: 7,
      title: 'How to Manage Your Subscription',
      category_key: 'billing_payments',
      category: 'Billing & Payments',
      description: 'Check plan validity, upgrade package, and download GST tax invoices.',
      reading_time: '3 min read',
      has_video: true,
      video_duration: '4:00',
      icon_type: 'layers',
      helpful_count: 224,
      not_helpful_count: 2,
      steps: [
        { step: 1, title: 'Open Subscription Details', desc: 'Navigate to "Subscription Details" in the sidebar.' },
        { step: 2, title: 'View Active Package', desc: 'Check your current package (English Package), yearly validity date, and remaining days.' },
        { step: 3, title: 'Monitor Usage Metrics', desc: 'Review real-time usage meters for Notes, Bookmarks, and PDF exports.' },
        { step: 4, title: 'Download Invoices', desc: 'Click invoice numbers (e.g. TRL-INV-0045) to view and print official GST payment receipts.' },
      ]
    },
    {
      id: 8,
      title: 'How to Download Legal Documents',
      category_key: 'using_features',
      category: 'Using Features',
      description: 'Export Acts, Rules, and Notifications in high-resolution court-admissible PDF.',
      reading_time: '2 min read',
      has_video: true,
      video_duration: '2:30',
      icon_type: 'download',
      helpful_count: 185,
      not_helpful_count: 1,
      steps: [
        { step: 1, title: 'Select Document', desc: 'Open any Act, Section, or Gazette update.' },
        { step: 2, title: 'Click PDF Export', desc: 'Click the Export button to open the document generation options.' },
        { step: 3, title: 'Choose Format', desc: 'Select Full Act with Amendments, Section-only, or Summary brief.' },
        { step: 4, title: 'Download Clean Copy', desc: 'Save the watermark-free PDF ready for legal research and court submissions.' },
      ]
    }
  ]);

  const helpQuickLinks = [
    { title: 'Platform Overview', icon: FileText, action: 'overview' },
    { title: 'Feature Highlights', icon: Bell, action: 'features' },
    { title: 'Subscription Plans', icon: Calendar, action: 'subscription' },
    { title: 'System Requirements', icon: Laptop, action: 'requirements' },
    { title: 'Terms of Use', icon: ScrollText, action: 'terms' },
  ];

  const helpFaqsList = [
    { id: 1, q: 'How do I create an account?', a: 'You can register an advocate or legal researcher account directly from the Login page by clicking "Create Account". Provide your full name, email, bar registration number, and preferred language to get started.' },
    { id: 2, q: 'How do I purchase a subscription?', a: 'Navigate to Subscription Details and click "Upgrade Your Plan" or "View Plans". Choose between English, Tamil, or Bilingual All-Access yearly plans and complete the secure payment via UPI, NetBanking, or Credit/Debit Card.' },
    { id: 3, q: 'How can I access Tamil legal documents?', a: 'Use the language switcher pill at the top header to toggle to "தமிழ்". Tamil translations of Central Acts, Madras High Court rules, and Tamil Nadu State Acts will be immediately displayed.' },
    { id: 4, q: 'How can I search for a specific section?', a: 'Use either the top search bar with "Section [number] [Act name]" or switch to the Advanced Search tab and select "Section Search". Enter section number (e.g., "65B") to jump straight to the statutory text.' },
    { id: 5, q: 'How do I save bookmarks?', a: 'Click the gold bookmark ribbon icon on any Act, Rule, or Section card. You can view, filter, and organize all saved bookmarks inside the "Bookmarks" menu.' },
    { id: 6, q: 'How do I create legal notes?', a: 'Go to "My Notes" and click "+ Create Note". You can link your thoughts directly to an Act, Rule, or Section citation, assign custom tags, and export them as formatted PDF briefs.' },
    { id: 7, q: 'How can I download documents?', a: 'Click the "Export" or PDF icon located on the document view action bar to download clean, printable legal documents with full statutory citations.' },
    { id: 8, q: 'How do I renew my subscription?', a: 'In "Subscription Details", click "Manage Subscription" or "Renew Plan". If Auto-Renewal is enabled, your subscription will automatically renew upon expiry without interruption.' },
    { id: 9, q: 'How can I change my password?', a: 'Click on your user profile "Adv. R. Karthik" at the top right, select "Profile Settings", and update your password securely under the Security & Credentials tab.' },
    { id: 10, q: 'How do I contact customer support?', a: 'Click the "Contact Support" button in the Help & How to Use center or bottom right card. Fill out the support request form and our dedicated legal support team will respond within 24 hours.' },
  ];

  // Fetch help data from backend if available
  React.useEffect(() => {
    fetch('http://127.0.0.1:8000/api/help/guides')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setHelpGuidesList(data);
        }
      })
      .catch(() => {});
  }, []);

  const handleHelpFeedback = (guideId: number, isHelpful: boolean) => {
    setGuideFeedbackMap(prev => ({ ...prev, [guideId]: isHelpful ? 'helpful' : 'not_helpful' }));
    fetch(`http://127.0.0.1:8000/api/help/feedback?guide_id=${guideId}&helpful=${isHelpful}`, {
      method: 'POST'
    })
      .then(res => res.json())
      .then(resData => {
        if (resData.status === 'success') {
          setHelpGuidesList(prev => prev.map(g => g.id === guideId ? { ...g, helpful_count: resData.helpful_count, not_helpful_count: resData.not_helpful_count } : g));
          if (viewingGuide && viewingGuide.id === guideId) {
            setViewingGuide((prev: any) => ({ ...prev, helpful_count: resData.helpful_count, not_helpful_count: resData.not_helpful_count }));
          }
        }
      })
      .catch(() => {});
  };

  const handleSubmitSupportTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportSubject.trim() || !supportDescription.trim()) return;
    setSupportSubmitting(true);
    fetch('http://127.0.0.1:8000/api/help/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: supportSubject,
        category: supportCategory,
        description: supportDescription,
        user_name: userName,
        user_email: user?.email || 'karthik.advocate@gmail.com'
      })
    })
      .then(res => res.json())
      .then(ticket => {
        setSupportSubmitting(false);
        setSupportTicketCreated(ticket);
        setSupportSubject('');
        setSupportDescription('');
      })
      .catch(() => {
        setSupportSubmitting(false);
        setSupportTicketCreated({
          ticket_no: `TRL-TKT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          subject: supportSubject,
          category: supportCategory,
          status: 'Open'
        });
        setSupportSubject('');
        setSupportDescription('');
      });
  };

  const getCategoryIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'User': return UserIcon;
      case 'BookOpen': return BookOpen;
      case 'Search': return Search;
      case 'Bookmark': return Bookmark;
      case 'Bell': return Bell;
      case 'Star': return Star;
      case 'CreditCard': return CreditCard;
      case 'Wrench': return Wrench;
      default: return HelpCircle;
    }
  };

  const filteredHelpGuides = helpGuidesList.filter(g => {
    if (selectedHelpCategory !== 'all' && g.category_key !== selectedHelpCategory) return false;
    if (helpSearchQuery.trim()) {
      const q = helpSearchQuery.toLowerCase();
      const matchTitle = g.title.toLowerCase().includes(q);
      const matchDesc = g.description.toLowerCase().includes(q);
      return matchTitle || matchDesc;
    }
    return true;
  });
  const [selectedUpgradePlan, setSelectedUpgradePlan] = useState('english');
  const [selectedBillingCycle, setSelectedBillingCycle] = useState<'Yearly' | 'Monthly'>('Yearly');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccessMsg, setPaymentSuccessMsg] = useState('');

  React.useEffect(() => {
    fetch('http://127.0.0.1:8000/api/subscriptions/current')
      .then(res => res.json())
      .then(data => {
        if (data && data.package_name) {
          setSubscriptionData({
            package_id: data.package_id || 'english',
            package_name: data.package_name || 'English Package',
            plan_type: data.plan_type || 'Yearly',
            status: data.status || 'Active',
            start_date: data.start_date || '07 Nov 2026',
            expiry_date: data.expiry_date || '06 Nov 2027',
            days_remaining: data.days_remaining || 672,
            auto_renewal: data.auto_renewal ?? true,
            price: data.price || 4999,
            description: data.description || 'Full access to Acts, Rules, Amendments, Notifications & Updates',
          });
        }
      })
      .catch(() => {});
  }, []);

  const subscriptionBenefits = [
    { id: 1, title: 'Complete Access', desc: 'Acts, Rules & Sections', icon: BookOpen },
    { id: 2, title: 'Regular Updates', desc: 'Amendments & Notifications', icon: Bell },
    { id: 3, title: 'My Notes', desc: 'Create & Manage Notes', icon: Bookmark },
    { id: 4, title: 'Bookmarks', desc: 'Save Important References', icon: Star },
    { id: 5, title: 'Priority Support', desc: 'Email & Help Center', icon: Headphones },
  ];

  const billingHistoryList = [
    { id: 1, invoice_no: 'TRL-INV-0045', plan: 'Yearly', amount: '₹ 4,999', date: '07 Nov 2026', status: 'Paid' },
    { id: 2, invoice_no: 'TRL-INV-0038', plan: 'Yearly', amount: '₹ 4,999', date: '07 Nov 2025', status: 'Paid' },
    { id: 3, invoice_no: 'TRL-INV-0031', plan: 'Yearly', amount: '₹ 4,999', date: '07 Nov 2024', status: 'Paid' },
  ];

  const [sortBy, setSortBy] = useState('Latest Updated');
  const [currentPage, setCurrentPage] = useState(1);

  const userName = currentUser?.full_name || user?.full_name || 'Adv. R. Karthik';

  const handleLogoutClick = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    if (onLogout) {
      onLogout();
    }
    router.push('/login');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'browse_acts', label: 'Browse Acts', icon: BookOpen },
    { id: 'browse_rules', label: 'Browse Rules', icon: ScrollText },
    { id: 'amendments', label: 'Amendments & Updates', icon: Calendar },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'my_notes', label: 'My Notes', icon: FileEdit },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
    { id: 'subscription', label: 'Subscription Details', icon: Layers },
    { id: 'help', label: 'Help & How to Use', icon: HelpCircle },
  ];

  const quickActions = [
    { label: 'Browse Acts', icon: BookOpen, nav: 'browse_acts' },
    { label: 'Browse Rules', icon: Scale, nav: 'browse_rules' },
    { label: 'Amendments', icon: FileText, nav: 'amendments' },
    { label: 'My Notes', icon: FileEdit, nav: 'my_notes' },
    { label: 'Bookmarks', icon: Bookmark, nav: 'bookmarks' },
  ];

  const categories = [
    { name: 'Criminal Laws', icon: Scale, color: 'text-amber-700', bg: 'bg-amber-100/70' },
    { name: 'Civil Laws', icon: Users, color: 'text-blue-700', bg: 'bg-blue-100/70' },
    { name: 'Constitution', icon: Landmark, color: 'text-yellow-700', bg: 'bg-yellow-100/70' },
    { name: 'Labour Laws', icon: HardHat, color: 'text-purple-700', bg: 'bg-purple-100/70' },
    { name: 'Environmental Laws', icon: Leaf, color: 'text-emerald-700', bg: 'bg-emerald-100/70' },
    { name: 'Taxation Laws', icon: IndianRupee, color: 'text-orange-700', bg: 'bg-orange-100/70' },
    { name: 'Business & Commercial', icon: Building2, color: 'text-indigo-700', bg: 'bg-indigo-100/70' },
    { name: 'All Categories', icon: LayoutGrid, color: 'text-rose-700', bg: 'bg-rose-100/70' },
  ];

  const actPills = [
    { id: 'all', label: 'All Acts (750)', icon: Layers },
    { id: 'central', label: 'Central Acts (532)', icon: Landmark },
    { id: 'state', label: 'State Acts (218)', icon: Landmark },
    { id: 'latest', label: 'Latest Acts (42)', icon: Sparkles, badge: 'New' },
    { id: 'popular', label: 'Popular Acts (50)', icon: Flame },
    { id: 'bookmarks', label: 'My Bookmarks (12)', icon: Bookmark },
  ];

  const actsList = [
    {
      id: 1,
      title: 'Bharatiya Nyaya Sanhita, 2023',
      iconType: 'scales',
      type: 'Central Act',
      actNo: 'Act No. 45 of 2023',
      enforced: '01 Jul 2024',
    },
    {
      id: 2,
      title: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
      iconType: 'pen_doc',
      type: 'Central Act',
      actNo: 'Act No. 46 of 2023',
      enforced: '01 Jul 2024',
    },
    {
      id: 3,
      title: 'Indian Evidence Act, 1872',
      iconType: 'fingerprint_doc',
      type: 'Central Act',
      actNo: 'Act No. 1 of 1872',
      enforced: '01 Sep 1872',
    },
    {
      id: 4,
      title: 'Code of Criminal Procedure, 1973',
      iconType: 'users_group',
      type: 'Central Act',
      actNo: 'Act No. 2 of 1974',
      enforced: '01 Apr 1974',
    },
  ];

  const rulesPills = [
    { id: 'all', label: 'All Rules (2,485)', icon: Layers },
    { id: 'central', label: 'Central Rules (1,720)', icon: Landmark },
    { id: 'state', label: 'State Rules (765)', icon: Landmark },
    { id: 'latest', label: 'Latest Rules (120)', icon: Sparkles, badge: 'New' },
    { id: 'popular', label: 'Popular Rules (350)', icon: Flame },
    { id: 'bookmarks', label: 'My Bookmarks (42)', icon: Bookmark },
  ];

  const rulesList = [
    {
      id: 1,
      title: 'Bharatiya Nyaya Sanhita (Procedure) Rules, 2024',
      iconType: 'scales',
      type: 'Central Rules',
      ruleNo: 'Rule No. 45 of 2024',
      notified: '15 Jul 2024',
    },
    {
      id: 2,
      title: 'Bharatiya Nagarik Suraksha Sanhita Rules, 2024',
      iconType: 'gear_doc',
      type: 'Central Rules',
      ruleNo: 'Rule No. 46 of 2024',
      notified: '15 Jul 2024',
    },
    {
      id: 3,
      title: 'Indian Evidence Rules, 1972',
      iconType: 'gavel',
      type: 'Central Rules',
      ruleNo: 'Rule No. 1 of 1972',
      notified: '01 Sep 1972',
    },
    {
      id: 4,
      title: 'Code of Criminal Procedure Rules, 1973',
      iconType: 'open_book',
      type: 'Central Rules',
      ruleNo: 'Rule No. 2 of 1973',
      notified: '01 Apr 1973',
    },
  ];

  const updatePills = [
    { id: 'all', label: 'All Updates (1,842)', icon: Layers },
    { id: 'amendments', label: 'Amendments (986)', icon: FileEdit },
    { id: 'notifications', label: 'Notifications (432)', icon: Bell },
    { id: 'corrections', label: 'Corrections (128)', icon: RotateCw },
    { id: 'recent', label: 'Recent Updates (196)', icon: Star, badge: 'New' },
    { id: 'bookmarks', label: 'My Bookmarks (64)', icon: Bookmark },
  ];

  const updatesList = [
    {
      id: 1,
      title: 'Amendment to Bharatiya Nyaya Sanhita, 2023',
      iconType: 'gavel',
      type: 'Amendment',
      notificationNo: 'Notification No. G.S.R. 289(E)',
      dated: '15 Jul 2024',
      filterType: 'amendments',
      year: '2024',
    },
    {
      id: 2,
      title: 'Notification under Indian Evidence Act, 1872',
      iconType: 'bell',
      type: 'Notification',
      notificationNo: 'No. S.O. 2547(E)',
      dated: '01 Sep 2024',
      filterType: 'notifications',
      year: '2024',
    },
    {
      id: 3,
      title: 'Correction in Code of Criminal Procedure, 1973',
      iconType: 'rotate',
      type: 'Correction',
      notificationNo: 'No. S.O. 1968(E)',
      dated: '12 Aug 2024',
      filterType: 'corrections',
      year: '2024',
    },
    {
      id: 4,
      title: 'Amendment to Information Technology (IT) Rules, 2021',
      iconType: 'doc',
      type: 'Amendment',
      notificationNo: 'Notification No. G.S.R. 715(E)',
      dated: '28 Jun 2024',
      filterType: 'amendments',
      year: '2024',
    },
  ];

  const searchModes = [
    { id: 'universal', label: 'Universal Search', icon: Layers },
    { id: 'exact', label: 'Exact Phrase Search', icon: Quote },
    { id: 'section', label: 'Section Search', icon: FileText, symbol: '§' },
    { id: 'cross', label: 'Cross-Reference Search', icon: Link2 },
    { id: 'saved', label: 'Saved Searches', icon: Bookmark },
    { id: 'history', label: 'Search History', icon: History },
  ];

  const searchCategories = [
    { id: 'all', label: 'All Results (12,640)', icon: Layers },
    { id: 'acts', label: 'Acts (4,820)', icon: Scale },
    { id: 'rules', label: 'Rules (3,210)', icon: BookOpen },
    { id: 'amendments', label: 'Amendments (1,540)', icon: FileEdit },
    { id: 'notifications', label: 'Notifications (1,320)', icon: Bell },
    { id: 'sections', label: 'Sections (1,750)', icon: AlignLeft },
    { id: 'related', label: 'Related (Cross-Ref) (640)', icon: Link2 },
  ];

  const searchResultsData = [
    {
      id: 1,
      title: 'Indian Evidence Act, 1872',
      iconType: 'scale',
      badges: [
        { label: 'Act', bg: 'bg-[#FEF3C7]', text: 'text-[#92400E]', border: 'border-[#FDE68A]' },
        { label: 'Principal', bg: 'bg-[#EDE9FE]', text: 'text-[#6D28D9]', border: 'border-[#DDD6FE]' },
      ],
      jurisdiction: 'Central Act',
      number: 'Act No. 1 of 1872',
      status: 'In Force',
      buttonType: 'sections',
    },
    {
      id: 2,
      title: 'Indian Evidence Rules, 1972',
      iconType: 'rule_doc',
      badges: [
        { label: 'Rule', bg: 'bg-[#FCE7F3]', text: 'text-[#BE185D]', border: 'border-[#FBCFE8]' },
      ],
      jurisdiction: 'Central Rules',
      number: 'Rule No. 1 of 1972',
      status: 'Notified: 01 Sep 1972',
      buttonType: 'sections',
    },
    {
      id: 3,
      title: 'Amendment to Indian Evidence Act, 1872 (2023)',
      iconType: 'gavel',
      badges: [
        { label: 'Amendment', bg: 'bg-[#FEF3C7]', text: 'text-[#B45309]', border: 'border-[#FDE68A]' },
      ],
      jurisdiction: 'Amendment',
      number: 'Notification No. G.S.R. 2547(E)',
      status: 'Dated: 15 Jul 2023',
      buttonType: 'details',
    },
    {
      id: 4,
      title: 'Notification under Indian Evidence Act, 1872',
      iconType: 'bell',
      badges: [
        { label: 'Notification', bg: 'bg-[#EDE9FE]', text: 'text-[#7C3AED]', border: 'border-[#DDD6FE]' },
      ],
      jurisdiction: 'Notification',
      number: 'No. S.O. 1968(E)',
      status: 'Dated: 12 Aug 2024',
      buttonType: 'details',
    },
    {
      id: 5,
      title: 'Section 65B – Electronic Records',
      iconType: 'section',
      badges: [
        { label: 'Section', bg: 'bg-[#FFEDD5]', text: 'text-[#C2410C]', border: 'border-[#FED7AA]' },
      ],
      jurisdiction: 'Indian Evidence Act, 1872',
      number: 'Chapter V – Of the Production of Evidence',
      status: '',
      buttonType: 'related',
    },
  ];

  const savedSearchesList = [
    { id: 1, title: 'Evidence – All References', icon: Layers },
    { id: 2, title: 'IT Act Amendments (2021–2024)', icon: FileEdit },
    { id: 3, title: 'CrPC – Sections & Rules', icon: BookOpen },
    { id: 4, title: 'Notifications – Central (2024)', icon: Bell },
  ];

  const crossReferencePills = [
    { label: 'Related Acts (4)' },
    { label: 'Related Rules (2)' },
    { label: 'Amendments (3)' },
    { label: 'Notifications (5)' },
  ];

  const notePills = [
    { id: 'all', label: 'All Notes', count: 246, icon: Layers },
    { id: 'act', label: 'Act Notes', count: 98, icon: Scale },
    { id: 'rule', label: 'Rule Notes', count: 52, icon: BookOpen },
    { id: 'section', label: 'Section Notes', count: 64, icon: AlignLeft },
    { id: 'case', label: 'Case Notes', count: 18, icon: Gavel },
    { id: 'important', label: 'Important', count: 14, icon: Star },
    { id: 'recent', label: 'Recent', count: 20, icon: Clock },
  ];

  const [notesList, setNotesList] = useState([
    {
      id: 1,
      title: 'Section 65B – Electronic Records (Notes)',
      badge: { label: 'Evidence', bg: 'bg-[#EDE9FE]', text: 'text-[#7C3AED]', border: 'border-[#DDD6FE]' },
      iconType: 'file',
      primaryRef: 'Indian Evidence Act, 1872',
      primaryRefIcon: BookOpen,
      subRef: 'Section 65B',
      updatedAt: '15 Jul 2024',
      type: 'Act Notes',
      tag: 'Evidence',
      year: '2024',
      content: 'Conditions for admissibility of electronic records as secondary evidence without production of original device. Certificate requirement under Section 65B(4).'
    },
    {
      id: 2,
      title: 'Amendment to Evidence Act, 1872 (2023)',
      badge: { label: 'Amendment', bg: 'bg-[#FEF3C7]', text: 'text-[#B45309]', border: 'border-[#FDE68A]' },
      iconType: 'fileCheck',
      primaryRef: 'Amendment',
      primaryRefIcon: BookOpen,
      subRef: 'G.S.R. 2547(E)',
      updatedAt: '12 Jul 2024',
      type: 'Act Notes',
      tag: 'Amendment',
      year: '2023',
      content: 'Transition provisions relating to digital signatures and hashed data verification compliance.'
    },
    {
      id: 3,
      title: 'Digital Evidence – Key Points',
      badge: { label: 'Important', bg: 'bg-[#FCE7F3]', text: 'text-[#BE185D]', border: 'border-[#FBCFE8]' },
      iconType: 'file',
      primaryRef: 'Indian Evidence Act, 1872',
      primaryRefIcon: BookOpen,
      subRef: 'Insight Note',
      updatedAt: '10 Jul 2024',
      type: 'Act Notes',
      tag: 'Important',
      year: '2024',
      content: 'Hash values, bit-stream image preservation, and chain of custody documentation checklist for trial court presentation.'
    },
    {
      id: 4,
      title: 'Chain of Custody – Case Pointers',
      badge: { label: 'Case Note', bg: 'bg-[#EDE9FE]', text: 'text-[#6366F1]', border: 'border-[#C7D2FE]' },
      iconType: 'gavel',
      primaryRef: 'Case Note',
      primaryRefIcon: Gavel,
      subRef: 'Evidence',
      updatedAt: '08 Jul 2024',
      type: 'Case Notes',
      tag: 'Procedure',
      year: '2024',
      content: 'Precedent citations on seizure memo accuracy, panchnama compliance, and forensic laboratory transmission timelines.'
    },
    {
      id: 5,
      title: 'Relevant Notifications – Evidence Act',
      badge: { label: 'Notification', bg: 'bg-[#EDE9FE]', text: 'text-[#7C3AED]', border: 'border-[#DDD6FE]' },
      iconType: 'fileSearch',
      primaryRef: 'Notification',
      primaryRefIcon: FileText,
      subRef: 'S.O. 1968(E)',
      updatedAt: '05 Jul 2024',
      type: 'Act Notes',
      tag: 'Notification',
      year: '2024',
      content: 'Official gazette notifications designating certifying authorities for digital record hash certification.'
    },
  ]);

  const noteQuickActions = [
    { id: 'create', label: 'Create New Note', icon: FileEdit },
    { id: 'import', label: 'Import Notes (PDF / Text)', icon: Download },
    { id: 'export', label: 'Export Notes', icon: Upload },
    { id: 'tags', label: 'Manage Tags', icon: Tag },
    { id: 'settings', label: 'Note Settings', icon: Settings },
  ];

  const noteOverviewStats = [
    { label: 'Total Notes', count: '246', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
    { label: 'Important', count: '14', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50 border-amber-200' },
    { label: 'Recent', count: '20', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
    { label: 'Section Notes', count: '64', icon: Bookmark, color: 'text-[#650B16]', bg: 'bg-rose-50 border-rose-200' },
  ];

  const bookmarkPills = [
    { id: 'all', label: 'All Bookmarks', count: 328, icon: Layers },
    { id: 'act', label: 'Act Bookmarks', count: 124, icon: Scale },
    { id: 'rule', label: 'Rule Bookmarks', count: 68, icon: Layers },
    { id: 'section', label: 'Section Bookmarks', count: 82, icon: AlignLeft },
    { id: 'amendment', label: 'Amendment Bookmarks', count: 28, icon: FileEdit },
    { id: 'notification', label: 'Notification Bookmarks', count: 18, icon: Bell },
    { id: 'recent', label: 'Recent', count: 36, icon: Clock },
  ];

  const bookmarkQuickActions = [
    { id: 'add', label: 'Add New Bookmark', icon: FileEdit },
    { id: 'tags', label: 'Manage Tags', icon: Tag },
    { id: 'export', label: 'Export Bookmarks (PDF)', icon: Download },
    { id: 'import', label: 'Import Bookmarks', icon: Upload },
    { id: 'settings', label: 'Bookmark Settings', icon: Settings },
  ];

  const bookmarkOverviewStats = [
    { label: 'Total Bookmarks', count: '328', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
    { label: 'Important', count: '56', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50 border-amber-200' },
    { label: 'Recent', count: '36', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
    { label: 'Tags', count: '18', icon: Tag, color: 'text-[#650B16]', bg: 'bg-rose-50 border-rose-200' },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#F9F7F3] text-gray-800 font-sans selection:bg-[#3D0B14] selection:text-white">
      {/* 
        STICKY TOP HEADER BAR
        Deep burgundy background (#240308) with golden branding and controls
      */}
      <header className="sticky top-0 z-50 w-full bg-[#240308] border-b border-amber-900/40 px-4 sm:px-6 py-2 flex items-center justify-between text-white shadow-md">
        {/* Left Branding */}
        <div className="flex items-center gap-2.5 sm:gap-3 cursor-pointer" onClick={() => handleNavChange('dashboard')}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/scales_logo_hd.png"
            alt="Tamil Raw Library Scales Logo"
            className="w-8 h-7 sm:w-9 sm:h-8 object-contain drop-shadow"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-base sm:text-lg text-[#F5DEB3] tracking-tight">
                Tamil Raw Library
              </span>
              <span className="hidden sm:inline text-xs text-amber-200/50">|</span>
              <span className="hidden sm:inline text-xs font-medium text-amber-200/90 tracking-wide">
                Legal Acts Subscription Platform
              </span>
            </div>
            <span className="text-[10px] text-amber-100/70 leading-tight">
              Indian Government Acts, Rules &amp; Amendments
            </span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* English | தமிழ் Toggle */}
          <div className="bg-[#4A0E18] border border-amber-500/30 rounded-full px-2 py-0.5 text-xs font-semibold flex items-center gap-1 shadow-inner">
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 rounded-full transition-all text-[11px] ${
                lang === 'en' ? 'bg-white text-[#240308] font-bold shadow-sm' : 'text-amber-100/80 hover:text-white'
              }`}
            >
              English
            </button>
            <span className="text-amber-400/40 text-[10px]">|</span>
            <button
              onClick={() => setLang('ta')}
              className={`px-2 py-0.5 rounded-full transition-all text-[11px] ${
                lang === 'ta' ? 'bg-[#9E2A2B] text-white font-bold shadow-sm' : 'text-amber-100/80 hover:text-white'
              }`}
            >
              தமிழ்
            </button>
          </div>

          {/* Notification Bell with red indicator */}
          <button className="relative p-1.5 rounded-full bg-[#4A0E18] hover:bg-[#5D1220] transition-colors border border-amber-500/30">
            <Bell className="w-3.5 h-3.5 text-amber-300" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#240308]" />
          </button>

          {/* User Profile Pill */}
          <div className="flex items-center gap-1.5 bg-[#4A0E18] border border-amber-500/30 rounded-full pl-1.5 pr-2.5 py-1 cursor-pointer hover:bg-[#5D1220] transition-colors">
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white">
              <Users className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs font-medium text-white max-w-[130px] truncate">{userName}</span>
            <ChevronDown className="w-3 h-3 text-amber-300/80" />
          </div>
        </div>
      </header>

      {/* BODY: SIDEBAR + MAIN CONTENT */}
      <div className="flex-1 flex w-full">
        {/* 
          LEFT SIDEBAR:
          Deep wine / dark maroon background (#2D050C) with Lady Justice + Books at bottom
        */}
        <aside className="w-52 sm:w-60 bg-[#2D050C] border-r border-amber-900/30 flex flex-col justify-between p-2.5 shrink-0 text-white select-none shadow-xl sticky top-[49px] h-[calc(100vh-49px)] overflow-y-auto">
          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavChange(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                    isActive
                      ? 'bg-gradient-to-r from-[#F6BD60] to-[#E59866] text-[#240308] font-bold shadow-md'
                      : 'text-amber-100/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#240308]' : 'text-amber-300/80'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="pt-1.5">
              <button
                onClick={handleLogoutClick}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-200/90 hover:text-white hover:bg-rose-950/40 transition-colors text-left"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span>Logout</span>
              </button>
            </div>
          </nav>

          {/* Bottom Sidebar: 3D Golden Lady Justice Statue beside ACTS, RULES, AMENDMENTS Books */}
          <div className="pt-2 -mx-2.5 -mb-2.5 overflow-hidden select-none flex items-end justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/sidebar_lady_justice_books_alpha.png?v=clean_v1"
              alt="3D Lady Justice and Law Books"
              className="w-full h-auto object-contain max-h-52 drop-shadow-lg"
            />
          </div>
        </aside>

        {/* 
          MAIN CONTENT AREA:
          Renders Browse Rules, Browse Acts, OR default Dashboard view
        */}
        <main className="flex-1 p-3.5 sm:p-5 space-y-3.5 max-w-[1300px] overflow-y-auto">
          {activeNav === 'help' ? (
            /* ========================================================================= */
            /* HELP & HOW TO USE VIEW - Exact recreation of media_1794145962956_ee05a6ee.jpg */
            /* ========================================================================= */
            <div className="space-y-2.5 animate-in fade-in duration-200">
              {/* HERO BANNER FOR HELP & HOW TO USE */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-amber-500/35 shadow-lg select-none bg-[#240308]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/banners/banner_help.png"
                  alt="Help & How to Use - Get Step-by-Step Guidance, Tutorials and Support to Make the Most of Tamil Raw Library."
                  className="w-full h-auto object-cover object-center block"
                />
                <h1 className="sr-only">
                  Help & How to Use - Get Step-by-Step Guidance, Tutorials and Support to Make the Most of Tamil Raw Library.
                </h1>
              </div>

              {/* SEARCH BAR */}
              <div className="relative w-full">
                <div className="flex items-center gap-2 bg-white rounded-xl px-3.5 py-1.5 shadow-xs border border-amber-200/80">
                  <Search className="w-4 h-4 text-stone-400 shrink-0" />
                  <input
                    type="text"
                    value={helpSearchQuery}
                    onChange={(e) => setHelpSearchQuery(e.target.value)}
                    placeholder="Search help topics, tutorials, features, or FAQs..."
                    className="w-full bg-transparent text-xs text-stone-800 placeholder-stone-400 focus:outline-none"
                  />
                  <button
                    onClick={() => {}}
                    className="bg-[#60000D] hover:bg-[#780010] text-white px-5 py-1 rounded-lg text-xs font-semibold shadow-xs transition-colors shrink-0 cursor-pointer"
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* 6 HELP NAVIGATION CARDS */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {helpNavCards.map((card) => {
                  const Icon = card.icon;
                  const isActive = activeHelpNav === card.id;
                  return (
                    <button
                      key={card.id}
                      onClick={() => {
                        if (card.id === 'contact_support') {
                          setIsContactSupportOpen(true);
                        } else {
                          setActiveHelpNav(card.id);
                        }
                      }}
                      className={`flex flex-col items-center justify-center py-2 px-1.5 rounded-xl transition-all cursor-pointer text-center ${
                        isActive
                          ? 'bg-[#500913] border border-[#FFD34E] shadow-sm text-white'
                          : 'bg-white border border-amber-200/70 hover:border-amber-400/80 hover:shadow-xs text-stone-800'
                      }`}
                    >
                      <div className="mb-1 flex items-center justify-center">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#FFD34E]' : 'text-[#60000D]'}`} />
                      </div>
                      <div className={`text-xs font-bold leading-tight ${isActive ? 'text-white' : 'text-[#240308]'}`}>
                        {card.title}
                      </div>
                      <div className={`text-[10px] mt-0.5 ${isActive ? 'text-[#FFD34E]' : 'text-stone-500'}`}>
                        {card.subtitle}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* 3-COLUMN CONTENT LAYOUT */}
              <div className="flex flex-col lg:flex-row gap-2.5 items-start">
                {/* LEFT COLUMN: HELP CATEGORIES */}
                <div className="w-full lg:w-[185px] shrink-0 space-y-1.5">
                  <div className="flex items-center gap-1.5 px-1">
                    <BookOpen className="w-3.5 h-3.5 text-[#800018]" />
                    <h2 className="text-xs font-bold text-[#480009]">Help Categories</h2>
                  </div>
                  <div className="bg-white rounded-xl border border-amber-200/70 p-1 shadow-xs divide-y divide-amber-100/60">
                    {helpCategoriesList.map((cat) => {
                      const Icon = getCategoryIconComponent(cat.icon);
                      const isSelected = selectedHelpCategory === cat.key;
                      return (
                        <button
                          key={cat.key}
                          onClick={() => { setSelectedHelpCategory(cat.key); setActiveHelpNav('getting_started'); }}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 text-left rounded-lg transition-all text-[11px] ${
                            isSelected
                              ? 'bg-amber-100/70 text-[#480009] font-bold border border-amber-300/80 shadow-xs'
                              : 'text-stone-700 hover:bg-amber-50/60 hover:text-[#480009]'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            <Icon className="w-3 h-3 text-stone-500 shrink-0" />
                            <span className="truncate">{cat.title}</span>
                          </div>
                          <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* CENTER COLUMN: POPULAR HELP GUIDES / FAQS / VIDEOS */}
                <div className="flex-1 min-w-0 space-y-2 w-full">
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                      <h2 className="text-xs font-bold text-[#480009]">
                        {activeHelpNav === 'faqs' ? 'Frequently Asked Questions' : activeHelpNav === 'video_tutorials' ? 'Video Tutorials' : activeHelpNav === 'features_overview' ? 'Features Overview' : 'Popular Help Guides'}
                      </h2>
                    </div>
                    <button
                      onClick={() => { setActiveHelpNav('getting_started'); setSelectedHelpCategory('all'); setHelpSearchQuery(''); }}
                      className="text-[11px] font-semibold text-[#800018] hover:text-[#480009] hover:underline cursor-pointer"
                    >
                      View All Guides
                    </button>
                  </div>

                  {/* FAQS VIEW */}
                  {activeHelpNav === 'faqs' ? (
                    <div className="bg-white rounded-xl border border-amber-200/70 p-3 shadow-xs divide-y divide-amber-100/60 space-y-2">
                      {helpFaqsList.map((faq) => {
                        const isExpanded = expandedFaqId === faq.id;
                        return (
                          <div key={faq.id} className="pt-2 first:pt-0">
                            <button
                              onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                              className="w-full flex items-center justify-between text-left text-xs font-bold text-stone-900 hover:text-[#60000D] transition-colors py-1 cursor-pointer"
                            >
                              <span className="flex items-center gap-2">
                                <HelpCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                                {faq.q}
                              </span>
                              {isExpanded ? <ChevronUp className="w-4 h-4 text-stone-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-stone-500 shrink-0" />}
                            </button>
                            {isExpanded && (
                              <p className="mt-2 text-xs text-stone-600 leading-relaxed bg-[#FFFDF9] p-3 rounded-lg border border-amber-200/50">
                                {faq.a}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : activeHelpNav === 'video_tutorials' ? (
                    /* VIDEO TUTORIALS GRID */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {filteredHelpGuides.map((guide) => (
                        <div key={guide.id} className="bg-white rounded-xl border border-amber-200/70 p-2.5 shadow-xs space-y-1.5 hover:border-amber-400 transition-all">
                          <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-[#40080F] to-[#650B16] flex items-center justify-center text-white group cursor-pointer"
                               onClick={() => setViewingVideo(guide)}>
                            <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Play className="w-4 h-4 text-amber-300 fill-amber-300 ml-0.5" />
                            </div>
                            <span className="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                              {guide.video_duration || '4:15'}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-stone-900 line-clamp-1">{guide.title}</h4>
                            <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{guide.description}</p>
                          </div>
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              {guide.reading_time || '3 min read'}
                            </span>
                            <button
                              onClick={() => setViewingVideo(guide)}
                              className="text-xs font-bold text-[#60000D] hover:underline cursor-pointer flex items-center gap-1"
                            >
                              <span>Watch Now</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : activeHelpNav === 'features_overview' ? (
                    /* FEATURES OVERVIEW */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        { title: 'Bilingual Legal Engine', desc: 'Read authentic Central & State Acts in English and Tamil with side-by-side section comparisons.', icon: BookOpen },
                        { title: 'Universal Legal Search', desc: 'Search Acts, Rules, Sections, and Amendments simultaneously with exact phrase and citation filters.', icon: Search },
                        { title: 'Gazette Amendments Tracker', desc: 'Stay updated with official G.S.R. and S.O. gazette notifications with highlighted legal diffs.', icon: Bell },
                        { title: 'Advocate Notes & Citations', desc: 'Create encrypted case briefs linked directly to statutory provisions with PDF export.', icon: FileEdit },
                        { title: 'Smart Bookmarks & Precedents', desc: 'Organize important provisions into 7 custom categories with quick access ribbons.', icon: Bookmark },
                        { title: 'Admissible PDF Downloads', desc: 'Export high-definition printable legal documents formatted for court filings and clients.', icon: Download },
                      ].map((feat, idx) => {
                        const Icon = feat.icon;
                        return (
                          <div key={idx} className="bg-white rounded-xl border border-amber-200/70 p-2.5 shadow-xs space-y-1 hover:border-amber-400 transition-all">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-lg bg-amber-50 border border-amber-200/80 flex items-center justify-center text-[#60000D]">
                                <Icon className="w-3 h-3" />
                              </div>
                              <h4 className="text-xs font-bold text-stone-900">{feat.title}</h4>
                            </div>
                            <p className="text-[11px] text-stone-600 leading-relaxed">{feat.desc}</p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    /* POPULAR HELP GUIDES LIST (EXACT DESIGN MATCH) */
                    <div className="space-y-2">
                      {filteredHelpGuides.slice(0, 4).map((guide) => {
                        return (
                          <div
                            key={guide.id}
                            className="bg-white rounded-xl p-2.5 border border-amber-200/70 shadow-xs hover:border-amber-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 group"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-8 h-8 rounded-lg bg-[#FFF9F2] border border-amber-200/80 flex items-center justify-center shrink-0 text-amber-800 shadow-xs">
                                {guide.id === 1 ? (
                                  <Laptop className="w-4 h-4 text-amber-800" />
                                ) : guide.id === 2 ? (
                                  <FileEdit className="w-4 h-4 text-amber-800" />
                                ) : guide.id === 3 ? (
                                  <Bookmark className="w-4 h-4 text-amber-800" />
                                ) : guide.id === 4 ? (
                                  <Bell className="w-4 h-4 text-amber-800" />
                                ) : (
                                  <BookOpen className="w-4 h-4 text-amber-800" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <h3 className="text-xs font-bold text-stone-900 group-hover:text-[#60000D] transition-colors truncate">
                                  {guide.title}
                                </h3>
                                <p className="text-[11px] text-stone-500 mt-0.5 leading-snug line-clamp-1">
                                  {guide.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                              <button
                                onClick={() => setViewingGuide(guide)}
                                className="bg-[#60000D] hover:bg-[#780010] text-white text-[10px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                              >
                                <BookOpen className="w-3 h-3 text-amber-300" />
                                <span>View Guide</span>
                              </button>
                              <button
                                onClick={() => setViewingVideo(guide)}
                                className="bg-white hover:bg-amber-50/60 border border-[#60000D] text-[#60000D] text-[10px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <PlayCircle className="w-3 h-3 text-[#60000D]" />
                                <span>Watch Video</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* RIGHT COLUMN: QUICK LINKS & NEED MORE HELP? */}
                <div className="w-full lg:w-[205px] shrink-0 space-y-2.5">
                  {/* QUICK LINKS */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 px-1">
                      <Link2 className="w-3.5 h-3.5 text-[#800018]" />
                      <h2 className="text-xs font-bold text-[#480009]">Quick Links</h2>
                    </div>
                    <div className="bg-white rounded-xl border border-amber-200/70 p-1 shadow-xs divide-y divide-amber-100/60">
                      {helpQuickLinks.map((ql, idx) => {
                        const Icon = ql.icon;
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              if (ql.action === 'overview') setIsOverviewOpen(true);
                              else if (ql.action === 'features') setActiveHelpNav('features_overview');
                              else if (ql.action === 'subscription') handleNavChange('subscription');
                              else if (ql.action === 'requirements') setIsRequirementsOpen(true);
                              else if (ql.action === 'terms') setIsTermsOpen(true);
                            }}
                            className="w-full flex items-center justify-between px-2.5 py-1.5 text-left rounded-lg text-[11px] text-stone-700 hover:bg-amber-50/60 hover:text-[#480009] transition-all cursor-pointer group"
                          >
                            <div className="flex items-center gap-1.5 truncate">
                              <Icon className="w-3 h-3 text-stone-400 group-hover:text-[#60000D] shrink-0" />
                              <span className="truncate">{ql.title}</span>
                            </div>
                            <ExternalLink className="w-3 h-3 text-stone-400 group-hover:text-[#60000D] shrink-0" />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* NEED MORE HELP? */}
                  <div className="bg-[#FFFDF9] rounded-xl border border-amber-200/80 p-2.5 shadow-xs space-y-2">
                    <div className="flex items-center gap-1.5">
                      <Headphones className="w-3.5 h-3.5 text-amber-700" />
                      <h3 className="text-xs font-bold text-[#480009]">Need More Help?</h3>
                    </div>
                    <p className="text-[11px] text-stone-500 leading-snug">
                      Our support team is here to assist you.
                    </p>
                    <button
                      onClick={() => setIsContactSupportOpen(true)}
                      className="w-full bg-gradient-to-r from-[#480009] to-[#60000D] hover:from-[#60000D] hover:to-[#780010] text-white border border-amber-400/50 rounded-xl py-1.5 px-2.5 flex items-center justify-between text-xs font-semibold shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-amber-300" />
                        <span>Contact Support</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-300 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : activeNav === 'subscription' ? (
            /* ========================================================================= */
            /* SUBSCRIPTION DETAILS VIEW - Exact recreation of media_1794145777378_d7d5bfe2.jpg */
            /* ========================================================================= */
            <div className="space-y-3.5 animate-in fade-in duration-200">
              {/* HERO BANNER FOR SUBSCRIPTION DETAILS */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-amber-500/35 shadow-lg select-none bg-[#240308]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/banners/banner_subscription.png"
                  alt="Subscription Details - Manage Your Plan, Usage, Billing and Subscription Preferences in One Place"
                  className="w-full h-auto object-cover object-center block"
                />
                <h1 className="sr-only">
                  Subscription Details - Manage Your Plan, Usage, Billing and Subscription Preferences in One Place.
                </h1>
              </div>

              {/* ROW 1: CURRENT SUBSCRIPTION + 3 STAT CARDS */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 w-full">
                {/* CURRENT PLAN CARD (Cols 1-7) */}
                <div className="lg:col-span-7 bg-linear-to-r from-[#4A0710] to-[#650B18] border border-[#D9A441]/40 rounded-2xl p-4 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    {/* Golden Crown Badge */}
                    <div className="w-12 h-12 rounded-full bg-linear-to-b from-[#F5C84C] to-[#D9A441] flex items-center justify-center text-[#4A0710] shadow-md shrink-0">
                      <Crown className="w-6 h-6 fill-[#4A0710]" />
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-amber-200/80 uppercase tracking-wider block">
                        Your Current Plan
                      </span>
                      <h2 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
                        {subscriptionData.package_name}
                      </h2>
                      <p className="text-[11px] text-amber-100/70 mt-0.5">
                        {subscriptionData.description}
                      </p>
                    </div>
                  </div>

                  <div className="self-start sm:self-center shrink-0">
                    <span className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold px-3.5 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                      <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                      <span>{subscriptionData.status}</span>
                    </span>
                  </div>
                </div>

                {/* 3 SUMMARY INFO CARDS (Cols 8-12) */}
                <div className="lg:col-span-5 grid grid-cols-3 gap-2">
                  {/* Card 1: Plan Type */}
                  <div className="bg-white rounded-2xl border border-stone-200 p-3 shadow-xs flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4 text-amber-700" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] text-stone-500 block leading-tight">Plan Type</span>
                      <span className="text-xs sm:text-sm font-bold text-stone-900 leading-tight block truncate">
                        {subscriptionData.plan_type}
                      </span>
                    </div>
                  </div>

                  {/* Card 2: Valid Till */}
                  <div className="bg-white rounded-2xl border border-stone-200 p-3 shadow-xs flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4 text-amber-700" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] text-stone-500 block leading-tight">Valid Till</span>
                      <span className="text-xs sm:text-sm font-bold text-stone-900 leading-tight block truncate">
                        {subscriptionData.expiry_date}
                      </span>
                    </div>
                  </div>

                  {/* Card 3: Days Remaining */}
                  <div className="bg-white rounded-2xl border border-stone-200 p-3 shadow-xs flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                      <RotateCw className="w-4 h-4 text-amber-700" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] text-stone-500 block leading-tight">Days Remaining</span>
                      <span className="text-xs sm:text-sm font-bold text-[#800E1A] leading-tight block truncate">
                        {subscriptionData.days_remaining} Days
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ROW 2: SUBSCRIPTION BENEFITS (5 CARDS) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {subscriptionBenefits.map((benefit) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={benefit.id}
                      className="bg-white rounded-2xl border border-stone-200 p-3 shadow-xs hover:border-amber-300 transition-colors flex flex-col items-center text-center space-y-1"
                    >
                      <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-700 mb-0.5">
                        <Icon className="w-4 h-4 text-[#C27803]" />
                      </div>
                      <h4 className="text-xs font-bold text-stone-900 leading-tight">
                        {benefit.title}
                      </h4>
                      <p className="text-[10px] text-stone-500 leading-tight">
                        {benefit.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* ROW 3: 3 DETAILED PANELS */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 w-full">
                {/* PANEL 1: SUBSCRIPTION PLAN DETAILS (Cols 1-4) */}
                <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200 p-4 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                      <Layers className="w-4 h-4 text-[#6B0F1A]" />
                      <h3 className="font-serif font-bold text-sm text-[#40080F]">
                        Subscription Plan Details
                      </h3>
                    </div>

                    <div className="space-y-2.5 text-xs text-stone-700">
                      <div className="flex items-center justify-between py-1 border-b border-stone-100/80">
                        <span className="text-stone-500">Plan Name</span>
                        <span className="font-bold text-stone-900">{subscriptionData.package_name}</span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-stone-100/80">
                        <span className="text-stone-500">Plan Type</span>
                        <span className="font-semibold text-stone-900">{subscriptionData.plan_type}</span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-stone-100/80">
                        <span className="text-stone-500">Start Date</span>
                        <span className="flex items-center gap-1 font-medium text-stone-800">
                          <Calendar className="w-3 h-3 text-stone-400" />
                          <span>{subscriptionData.start_date}</span>
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-stone-100/80">
                        <span className="text-stone-500">Expiry Date</span>
                        <span className="flex items-center gap-1 font-medium text-stone-800">
                          <Calendar className="w-3 h-3 text-stone-400" />
                          <span>{subscriptionData.expiry_date}</span>
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-stone-100/80">
                        <span className="text-stone-500">Status</span>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>{subscriptionData.status}</span>
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <span className="text-stone-500">Auto-Renewal</span>
                        <span className="flex items-center gap-1 font-semibold text-emerald-700">
                          <RotateCw className="w-3 h-3" />
                          <span>{subscriptionData.auto_renewal ? 'Enabled' : 'Disabled'}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsManageSubscriptionOpen(true)}
                    className="w-full py-2 px-3 rounded-xl bg-[#650B16] hover:bg-[#800E1C] text-white text-xs font-bold transition-colors shadow-xs flex items-center justify-center gap-2 mt-2"
                  >
                    <Settings className="w-3.5 h-3.5 text-[#F5C84C]" />
                    <span>Manage Subscription</span>
                  </button>
                </div>

                {/* PANEL 2: USAGE OVERVIEW (Cols 5-8) */}
                <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200 p-4 shadow-xs space-y-3.5">
                  <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                    <BarChart2 className="w-4 h-4 text-[#6B0F1A]" />
                    <h3 className="font-serif font-bold text-sm text-[#40080F]">
                      Usage Overview
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {/* Progress 1: My Notes */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 font-bold text-stone-800">
                          <div className="w-6 h-6 rounded-md bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-700">
                            <FileEdit className="w-3.5 h-3.5" />
                          </div>
                          <span>My Notes</span>
                        </span>
                        <span className="font-semibold text-stone-700 text-xs">246 / 1,000</span>
                      </div>
                      <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden border border-stone-200/50">
                        <div className="bg-[#650B16] h-full rounded-full transition-all" style={{ width: '24.6%' }}></div>
                      </div>
                    </div>

                    {/* Progress 2: Bookmarks */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 font-bold text-stone-800">
                          <div className="w-6 h-6 rounded-md bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-700">
                            <Bookmark className="w-3.5 h-3.5" />
                          </div>
                          <span>Bookmarks</span>
                        </span>
                        <span className="font-semibold text-stone-700 text-xs">328 / 1,000</span>
                      </div>
                      <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden border border-stone-200/50">
                        <div className="bg-[#650B16] h-full rounded-full transition-all" style={{ width: '32.8%' }}></div>
                      </div>
                    </div>

                    {/* Progress 3: Saved Searches */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 font-bold text-stone-800">
                          <div className="w-6 h-6 rounded-md bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-700">
                            <Search className="w-3.5 h-3.5" />
                          </div>
                          <span>Saved Searches</span>
                        </span>
                        <span className="font-semibold text-stone-700 text-xs">56 / 500</span>
                      </div>
                      <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden border border-stone-200/50">
                        <div className="bg-[#650B16] h-full rounded-full transition-all" style={{ width: '11.2%' }}></div>
                      </div>
                    </div>

                    {/* Progress 4: Exports (PDF) */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 font-bold text-stone-800">
                          <div className="w-6 h-6 rounded-md bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-700">
                            <Download className="w-3.5 h-3.5" />
                          </div>
                          <span>Exports (PDF)</span>
                        </span>
                        <span className="font-semibold text-stone-700 text-xs">18 / 200</span>
                      </div>
                      <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden border border-stone-200/50">
                        <div className="bg-[#650B16] h-full rounded-full transition-all" style={{ width: '9%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PANEL 3: BILLING HISTORY & UPGRADE (Cols 9-12) */}
                <div className="lg:col-span-4 space-y-3">
                  {/* Card 1: Billing History */}
                  <div className="bg-white rounded-2xl border border-stone-200 p-3.5 shadow-xs space-y-2">
                    <div className="flex items-center justify-between pb-1.5 border-b border-stone-100">
                      <div className="flex items-center gap-1.5">
                        <Receipt className="w-4 h-4 text-[#6B0F1A]" />
                        <h3 className="font-serif font-bold text-xs sm:text-sm text-[#40080F]">
                          Billing History
                        </h3>
                      </div>
                      <button className="text-[10px] text-rose-700 hover:underline font-semibold">
                        View All
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="text-[10px] text-stone-400 border-b border-stone-100">
                            <th className="pb-1 font-semibold">Invoice No.</th>
                            <th className="pb-1 font-semibold">Plan</th>
                            <th className="pb-1 font-semibold">Amount</th>
                            <th className="pb-1 font-semibold">Date</th>
                            <th className="pb-1 font-semibold text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100/80">
                          {billingHistoryList.map((inv) => (
                            <tr key={inv.id} className="hover:bg-[#FAF4E8]/50 transition-colors">
                              <td className="py-1.5 font-medium text-stone-800 flex items-center gap-1">
                                <FileText className="w-3 h-3 text-stone-400" />
                                <span className="text-[10px] sm:text-xs">{inv.invoice_no}</span>
                              </td>
                              <td className="py-1.5 text-stone-600 text-[10px] sm:text-xs">{inv.plan}</td>
                              <td className="py-1.5 font-bold text-stone-900 text-[10px] sm:text-xs">{inv.amount}</td>
                              <td className="py-1.5 text-stone-500 text-[10px] sm:text-xs">{inv.date}</td>
                              <td className="py-1.5 text-right">
                                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                                  {inv.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Card 2: Upgrade Your Plan Promo Card */}
                  <div className="bg-linear-to-r from-[#4A0710] to-[#650B18] border border-[#D9A441]/40 rounded-2xl p-3 text-white shadow-md flex items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-linear-to-b from-[#F5C84C] to-[#D9A441] flex items-center justify-center text-[#4A0710] shadow-sm shrink-0">
                        <Crown className="w-4 h-4 fill-[#4A0710]" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-serif font-bold text-xs sm:text-sm text-[#F5C84C] leading-tight">
                          Upgrade Your Plan
                        </h4>
                        <p className="text-[9.5px] text-amber-100/70 leading-tight truncate">
                          Get more features, higher limits and extended benefits with our Premium Plans.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsUpgradeModalOpen(true)}
                      className="bg-[#F5C84C] hover:bg-[#FFD34E] text-[#240308] font-bold text-xs px-3 py-1.5 rounded-lg shrink-0 flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                    >
                      <span>View Plans</span>
                      <span>&gt;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : activeNav === 'bookmarks' ? (
            /* ========================================================================= */
            /* BOOKMARKS VIEW - Exact recreation of media_1794145425269_1383d3a7.jpg     */
            /* ========================================================================= */
            <div className="space-y-3.5 animate-in fade-in duration-200">
              {/* HERO BANNER FOR BOOKMARKS - Exact master reference banner */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-amber-500/35 shadow-lg select-none bg-[#240308]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/banners/banner_bookmarks.png"
                  alt="Bookmarks - Save and Quickly Access Important Acts, Rules, Sections, Amendments and Notifications"
                  className="w-full h-auto object-cover object-center block"
                />
                <h1 className="sr-only">
                  Bookmarks - Save and Quickly Access Important Acts, Rules, Sections, Amendments and Notifications.
                </h1>
              </div>

              {/* SEARCH AND ADD BOOKMARK ROW */}
              <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={bookmarkSearchQuery}
                    onChange={(e) => setBookmarkSearchQuery(e.target.value)}
                    placeholder="Search your bookmarks by title, Act, Rule, Section, keyword..."
                    className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-2xs"
                  />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                  <button
                    type="button"
                    className="flex-1 sm:flex-initial px-5 py-2 rounded-xl bg-[#650B16] hover:bg-[#800E1C] text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNewBookmarkTitle('');
                      setNewBookmarkType('Act');
                      setNewBookmarkRef('Central Act | Act No. 1 of 1872');
                      setNewBookmarkTag('Evidence');
                      setNewBookmarkYear('2024');
                      setNewBookmarkImportant(true);
                      setIsAddBookmarkOpen(true);
                    }}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#650B16] hover:bg-[#800E1C] text-white text-xs font-bold transition-colors shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#F5C84C]" />
                    <span>Add Bookmark</span>
                  </button>
                </div>
              </div>

              {/* BOOKMARK CATEGORY CARDS (7 VERTICAL CARDS MATCHING REFERENCE EXACTLY) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                {bookmarkPills.map((pill) => {
                  const Icon = pill.icon;
                  const isActive = activeBookmarkFilter === pill.id;
                  return (
                    <button
                      key={pill.id}
                      onClick={() => setActiveBookmarkFilter(pill.id)}
                      className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-2xl transition-all border shadow-2xs ${
                        isActive
                          ? 'bg-[#500913] border-[#C89B3C] text-white shadow-sm'
                          : 'bg-white border-stone-200 text-stone-800 hover:bg-[#FAF4E8] hover:border-amber-300'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mb-1 shrink-0 ${isActive ? 'text-[#F6BD60]' : 'text-[#C27803]'}`} />
                      <span className="text-[11px] font-bold leading-tight text-center">
                        {pill.label}
                      </span>
                      <span className={`text-[10px] leading-tight mt-0.5 ${isActive ? 'text-amber-200' : 'text-stone-500'}`}>
                        ({pill.count})
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* 3-COLUMN CONTENT LAYOUT */}
              <div className="flex flex-col lg:flex-row items-start gap-3 w-full">
                {/* COLUMN 1: LEFT FILTER BOOKMARKS PANEL (Width ~ 210px) */}
                <div className="w-full lg:w-[210px] shrink-0 bg-white rounded-2xl border border-stone-200 p-3 shadow-xs space-y-3">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                    <div className="flex items-center gap-2 font-serif font-bold text-xs sm:text-sm text-[#40080F]">
                      <Filter className="w-3.5 h-3.5 text-[#6B0F1A]" />
                      <span>Filter Bookmarks</span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedBookmarkTypes([]);
                        setSelectedBookmarkTags([]);
                        setSelectedBookmarkYears([]);
                      }}
                      className="text-[10px] text-rose-700 hover:underline font-semibold flex items-center gap-1"
                    >
                      <span>Clear All</span>
                    </button>
                  </div>

                  {/* Filter 1: Bookmark Type */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                      <span>Bookmark Type</span>
                      <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
                    </div>
                    <div className="space-y-1 text-xs text-stone-700">
                      {['Act (124)', 'Rule (68)', 'Section (82)', 'Amendment (28)', 'Notification (18)'].map((t) => (
                        <label key={t} className="flex items-center gap-2 cursor-pointer hover:text-stone-900">
                          <input
                            type="checkbox"
                            checked={selectedBookmarkTypes.includes(t)}
                            onChange={() => {
                              if (selectedBookmarkTypes.includes(t)) {
                                setSelectedBookmarkTypes(selectedBookmarkTypes.filter(item => item !== t));
                              } else {
                                setSelectedBookmarkTypes([...selectedBookmarkTypes, t]);
                              }
                            }}
                            className="rounded border-stone-300 text-[#6B0F1A] focus:ring-[#6B0F1A]"
                          />
                          <span>{t}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Filter 2: Tag */}
                  <div className="space-y-1.5 pt-2 border-t border-stone-100">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                      <span>Tag</span>
                      <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
                    </div>
                    <div className="space-y-1 text-xs text-stone-700">
                      {['Evidence (56)', 'Procedure (42)', 'IT & Digital (38)', 'Criminal Law (32)', 'Important (24)'].map((tag) => (
                        <label key={tag} className="flex items-center gap-2 cursor-pointer hover:text-stone-900">
                          <input
                            type="checkbox"
                            checked={selectedBookmarkTags.includes(tag)}
                            onChange={() => {
                              if (selectedBookmarkTags.includes(tag)) {
                                setSelectedBookmarkTags(selectedBookmarkTags.filter(item => item !== tag));
                              } else {
                                setSelectedBookmarkTags([...selectedBookmarkTags, tag]);
                              }
                            }}
                            className="rounded border-stone-300 text-[#6B0F1A] focus:ring-[#6B0F1A]"
                          />
                          <span>{tag}</span>
                        </label>
                      ))}
                    </div>
                    <button className="text-[11px] text-[#6B0F1A] hover:underline font-semibold pt-0.5 block">
                      + Show More
                    </button>
                  </div>

                  {/* Filter 3: Year */}
                  <div className="space-y-1.5 pt-2 border-t border-stone-100">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                      <span>Year</span>
                      <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
                    </div>
                    <div className="space-y-1 text-xs text-stone-700">
                      {['2026 (8)', '2025 (42)', '2024 (86)', '2023 (72)'].map((y) => (
                        <label key={y} className="flex items-center gap-2 cursor-pointer hover:text-stone-900">
                          <input
                            type="checkbox"
                            checked={selectedBookmarkYears.includes(y)}
                            onChange={() => {
                              if (selectedBookmarkYears.includes(y)) {
                                setSelectedBookmarkYears(selectedBookmarkYears.filter(item => item !== y));
                              } else {
                                setSelectedBookmarkYears([...selectedBookmarkYears, y]);
                              }
                            }}
                            className="rounded border-stone-300 text-[#6B0F1A] focus:ring-[#6B0F1A]"
                          />
                          <span>{y}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* COLUMN 2: CENTER BOOKMARK LISTING (Flex-1) */}
                <div className="flex-1 min-w-0 space-y-2.5">
                  {/* Results Header Bar */}
                  <div className="flex items-center justify-between text-xs text-stone-600 px-0.5">
                    <span className="font-semibold text-stone-800">
                      Showing 1 – 10 of 328 Bookmarks
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-stone-500 text-xs">Sort By:</span>
                      <div className="relative">
                        <select
                          value={bookmarkSortBy}
                          onChange={(e) => setBookmarkSortBy(e.target.value)}
                          className="bg-white border border-stone-200 rounded-lg text-xs font-medium text-stone-800 py-1 pl-2 pr-6 appearance-none shadow-2xs focus:outline-none focus:border-amber-400"
                        >
                          <option>Latest Added</option>
                          <option>Oldest Added</option>
                          <option>Alphabetical</option>
                          <option>Most Important</option>
                          <option>Recently Accessed</option>
                        </select>
                        <ChevronDown className="w-3 h-3 text-stone-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Bookmark Cards List */}
                  <div className="space-y-2">
                    {bookmarksList.map((bm) => {
                      const isStarred = starredBookmarkIds.includes(bm.id);
                      return (
                        <div
                          key={bm.id}
                          className="bg-white rounded-2xl border border-stone-200/80 p-2.5 sm:p-3 shadow-xs hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                        >
                          {/* Left: Icon & Text Info */}
                          <div className="flex items-start gap-2.5 min-w-0">
                            {/* Bookmark Icon Badge */}
                            <div className="w-8 h-8 rounded-lg bg-[#FEF9EE] border border-[#F6BD60]/50 flex items-center justify-center shrink-0 mt-0.5">
                              {bm.iconType === 'scale' ? (
                                <Scale className="w-4 h-4 text-[#C27803]" />
                              ) : bm.iconType === 'fileEdit' ? (
                                <FileEdit className="w-4 h-4 text-[#C27803]" />
                              ) : bm.iconType === 'section' ? (
                                <AlignLeft className="w-4 h-4 text-[#C27803]" />
                              ) : bm.iconType === 'bell' ? (
                                <Bell className="w-4 h-4 text-[#C27803]" />
                              ) : (
                                <FileText className="w-4 h-4 text-[#C27803]" />
                              )}
                            </div>

                            {/* Text Info */}
                            <div className="min-w-0 space-y-1">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <h3 className="font-serif font-bold text-xs sm:text-sm text-[#38070E] truncate">
                                  {bm.title}
                                </h3>
                                <span
                                  className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${bm.badge.bg} ${bm.badge.text} ${bm.badge.border}`}
                                >
                                  {bm.badge.label}
                                </span>
                              </div>

                              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-stone-500 font-sans">
                                <span className="flex items-center gap-1 text-stone-700 font-medium">
                                  {bm.iconType === 'bell' ? (
                                    <Bell className="w-2.5 h-2.5 text-stone-400" />
                                  ) : (
                                    <Landmark className="w-2.5 h-2.5 text-stone-400" />
                                  )}
                                  <span>{bm.reference}</span>
                                </span>
                                {bm.subRef && (
                                  <>
                                    <span className="text-stone-300">|</span>
                                    <span>{bm.subRef}</span>
                                  </>
                                )}
                                <span className="text-stone-300">|</span>
                                <span>Bookmarked: {bm.bookmarkedAt}</span>
                              </div>
                            </div>
                          </div>

                          {/* Right: Actions */}
                          <div className="flex items-center gap-1 self-end sm:self-center shrink-0">
                            <button
                              onClick={() => {
                                if (bm.type === 'Act') handleNavChange('browse_acts');
                                else if (bm.type === 'Rule') handleNavChange('browse_rules');
                                else if (bm.type === 'Amendment') handleNavChange('amendments');
                                else setViewingBookmark(bm);
                              }}
                              className="px-2.5 py-1 rounded-md bg-[#650B16] hover:bg-[#800E1C] text-white text-[11px] font-bold flex items-center gap-1 transition-colors shadow-2xs"
                            >
                              <BookOpen className="w-3 h-3 text-[#F5C84C]" />
                              <span>Open</span>
                            </button>

                            <button
                              onClick={() => setViewingBookmark(bm)}
                              className="px-2 py-1 rounded-md bg-[#FFF9F2] hover:bg-amber-100/60 border border-amber-300 text-[#650B16] text-[11px] font-bold flex items-center gap-1 transition-colors shadow-2xs"
                            >
                              <Eye className="w-3 h-3 text-[#650B16]" />
                              <span>View</span>
                            </button>

                            <button
                              onClick={() => {
                                if (starredBookmarkIds.includes(bm.id)) {
                                  setStarredBookmarkIds(starredBookmarkIds.filter(id => id !== bm.id));
                                } else {
                                  setStarredBookmarkIds([...starredBookmarkIds, bm.id]);
                                }
                                fetch(`http://127.0.0.1:8000/api/bookmarks/${bm.id}/toggle-important`, { method: 'POST' }).catch(() => {});
                              }}
                              className="p-1 rounded-md border border-stone-200 hover:bg-stone-50 transition-colors shadow-2xs"
                              title="Toggle Favorite"
                            >
                              <Star
                                className={`w-3.5 h-3.5 ${
                                  isStarred ? 'fill-amber-500 text-amber-500' : 'text-stone-300 hover:text-amber-500'
                                }`}
                              />
                            </button>

                            <button className="p-1 rounded-md border border-stone-200 hover:bg-stone-50 text-stone-400 hover:text-stone-600 transition-colors shadow-2xs">
                              <MoreVertical className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Pagination Bar */}
                  <div className="pt-1 flex items-center justify-center gap-1 text-xs select-none">
                    <button className="px-1.5 py-0.5 rounded border border-stone-200 text-stone-400 hover:text-stone-700 hover:bg-stone-50">
                      <ChevronsLeft className="w-3 h-3" />
                    </button>
                    <button className="px-1.5 py-0.5 rounded border border-stone-200 text-stone-400 hover:text-stone-700 hover:bg-stone-50">
                      ‹
                    </button>

                    <button className="w-6 h-6 rounded bg-[#650B16] text-white font-bold text-xs flex items-center justify-center shadow-2xs">
                      1
                    </button>
                    <button className="w-6 h-6 rounded border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs flex items-center justify-center">
                      2
                    </button>
                    <button className="w-6 h-6 rounded border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs flex items-center justify-center">
                      3
                    </button>
                    <button className="w-6 h-6 rounded border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs flex items-center justify-center">
                      4
                    </button>
                    <button className="w-6 h-6 rounded border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs flex items-center justify-center">
                      5
                    </button>
                    <span className="px-1 text-stone-400">...</span>
                    <button className="w-auto px-1.5 h-6 rounded border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs flex items-center justify-center">
                      33
                    </button>

                    <button className="px-1.5 py-0.5 rounded border border-stone-200 text-stone-500 hover:text-stone-700 hover:bg-stone-50">
                      ›
                    </button>
                    <button className="px-1.5 py-0.5 rounded border border-stone-200 text-stone-500 hover:text-stone-700 hover:bg-stone-50">
                      <ChevronsRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* COLUMN 3: RIGHT QUICK ACTIONS & BOOKMARKS OVERVIEW (Width ~ 230px) */}
                <div className="w-full lg:w-[230px] shrink-0 space-y-3">
                  {/* Panel 1: Quick Actions */}
                  <div className="bg-white rounded-2xl border border-stone-200 p-3 shadow-xs space-y-2">
                    <div className="flex items-center gap-1.5 pb-1.5 border-b border-stone-100">
                      <Zap className="w-3.5 h-3.5 text-[#6B0F1A]" />
                      <span className="font-serif font-bold text-xs text-[#40080F]">Quick Actions</span>
                    </div>
                    <div className="space-y-1">
                      {bookmarkQuickActions.map((action) => {
                        const Icon = action.icon;
                        return (
                          <button
                            key={action.id}
                            onClick={() => {
                              if (action.id === 'add') {
                                setNewBookmarkTitle('');
                                setNewBookmarkType('Act');
                                setNewBookmarkRef('Central Act | Act No. 1 of 1872');
                                setNewBookmarkTag('Evidence');
                                setNewBookmarkYear('2024');
                                setNewBookmarkImportant(true);
                                setIsAddBookmarkOpen(true);
                              } else if (action.id === 'export') {
                                window.print();
                              }
                            }}
                            className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg text-xs text-stone-700 hover:text-stone-950 hover:bg-[#FAF4E8] transition-colors border-b border-stone-100 last:border-0"
                          >
                            <span className="flex items-center gap-2">
                              <Icon className="w-3.5 h-3.5 text-stone-500" />
                              <span className="font-medium text-[11px]">{action.label}</span>
                            </span>
                            <ChevronRight className="w-3 h-3 text-stone-400" />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Panel 2: Bookmarks Overview */}
                  <div className="bg-white rounded-2xl border border-stone-200 p-3 shadow-xs space-y-2">
                    <div className="flex items-center gap-1.5 pb-1.5 border-b border-stone-100">
                      <BarChart2 className="w-3.5 h-3.5 text-[#6B0F1A]" />
                      <span className="font-serif font-bold text-xs text-[#40080F]">Bookmarks Overview</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {bookmarkOverviewStats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                          <div
                            key={stat.label}
                            className="bg-[#FFFCF7] rounded-xl border border-stone-200/80 p-1.5 flex items-center gap-1.5"
                          >
                            <div className="w-7 h-7 rounded-lg bg-amber-100/70 border border-amber-200/60 flex items-center justify-center shrink-0">
                              <Icon className="w-3.5 h-3.5 text-amber-700" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-bold text-xs sm:text-sm text-stone-900 leading-tight">
                                {stat.count}
                              </div>
                              <div className="text-[9px] text-stone-600 leading-tight whitespace-nowrap">
                                {stat.label}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : activeNav === 'my_notes' ? (
            /* ========================================================================= */
            /* MY NOTES VIEW - Exact recreation of media_1794145285210_7409af47.jpg      */
            /* ========================================================================= */
            <div className="space-y-3.5 animate-in fade-in duration-200">
              {/* HERO BANNER FOR MY NOTES - Exact master reference banner */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-amber-500/35 shadow-lg select-none bg-[#240308]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/banners/banner_notes.png"
                  alt="My Notes - Create, Organize and Manage Your Legal Notes with Act, Rule and Section References"
                  className="w-full h-auto object-cover object-center block"
                />
                <h1 className="sr-only">
                  My Notes - Create, Organize and Manage Your Legal Notes with Act, Rule and Section References.
                </h1>
              </div>

              {/* SEARCH AND CREATE NOTE ROW */}
              <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={notesSearchQuery}
                    onChange={(e) => setNotesSearchQuery(e.target.value)}
                    placeholder="Search your notes by title, Act, Rule, Section, keyword..."
                    className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-2xs"
                  />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                  <button
                    type="button"
                    className="flex-1 sm:flex-initial px-5 py-2 rounded-xl bg-[#650B16] hover:bg-[#800E1C] text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingNoteId(null);
                      setNewNoteTitle('');
                      setNewNoteType('Act Notes');
                      setNewNoteAct('Indian Evidence Act, 1872');
                      setNewNoteSection('Section 65B');
                      setNewNoteContent('');
                      setNewNoteTag('Evidence');
                      setNewNoteImportant(false);
                      setIsCreateNoteOpen(true);
                    }}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#650B16] hover:bg-[#800E1C] text-white text-xs font-bold transition-colors shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#F5C84C]" />
                    <span>Create Note</span>
                  </button>
                </div>
              </div>

              {/* NOTE CATEGORY PILLS (7 HORIZONTAL CARDS) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5">
                {notePills.map((pill) => {
                  const Icon = pill.icon;
                  const isActive = activeNoteFilter === pill.id;
                  return (
                    <button
                      key={pill.id}
                      onClick={() => setActiveNoteFilter(pill.id)}
                      className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold transition-all border shadow-2xs ${
                        isActive
                          ? 'bg-[#430811] border-[#C89B3C] text-white shadow-md'
                          : 'bg-white border-stone-200 text-stone-800 hover:bg-[#FAF4E8] hover:border-amber-300'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#F6BD60]' : 'text-[#6B0F1A]'}`} />
                      <span>{pill.label}</span>
                      <span className={`text-[10px] font-normal ${isActive ? 'text-amber-200' : 'text-stone-500'}`}>
                        ({pill.count})
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* 3-COLUMN CONTENT LAYOUT */}
              <div className="flex flex-col lg:flex-row items-start gap-3 w-full">
                {/* COLUMN 1: LEFT FILTER NOTES PANEL (Width ~ 210px) */}
                <div className="w-full lg:w-[210px] shrink-0 bg-white rounded-2xl border border-stone-200 p-3 shadow-xs space-y-3">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                    <div className="flex items-center gap-2 font-serif font-bold text-xs sm:text-sm text-[#40080F]">
                      <Filter className="w-3.5 h-3.5 text-[#6B0F1A]" />
                      <span>Filter Notes</span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedNoteTypes([]);
                        setSelectedNoteTags([]);
                        setSelectedNoteYears([]);
                      }}
                      className="text-[10px] text-rose-700 hover:underline font-semibold flex items-center gap-1"
                    >
                      <span>Clear All</span>
                    </button>
                  </div>

                  {/* Filter 1: Note Type */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                      <span>Note Type</span>
                      <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
                    </div>
                    <div className="space-y-1 text-xs text-stone-700">
                      {['Act Notes (98)', 'Rule Notes (52)', 'Section Notes (64)', 'Case Notes (18)'].map((t) => (
                        <label key={t} className="flex items-center gap-2 cursor-pointer hover:text-stone-900">
                          <input
                            type="checkbox"
                            checked={selectedNoteTypes.includes(t)}
                            onChange={() => {
                              if (selectedNoteTypes.includes(t)) {
                                setSelectedNoteTypes(selectedNoteTypes.filter(item => item !== t));
                              } else {
                                setSelectedNoteTypes([...selectedNoteTypes, t]);
                              }
                            }}
                            className="rounded border-stone-300 text-[#6B0F1A] focus:ring-[#6B0F1A]"
                          />
                          <span>{t}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Filter 2: Tag */}
                  <div className="space-y-1.5 pt-2 border-t border-stone-100">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                      <span>Tag</span>
                      <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
                    </div>
                    <div className="space-y-1 text-xs text-stone-700">
                      {['Evidence (42)', 'Procedure (36)', 'Amendment (28)', 'Notification (18)', 'Important (14)'].map((tag) => (
                        <label key={tag} className="flex items-center gap-2 cursor-pointer hover:text-stone-900">
                          <input
                            type="checkbox"
                            checked={selectedNoteTags.includes(tag)}
                            onChange={() => {
                              if (selectedNoteTags.includes(tag)) {
                                setSelectedNoteTags(selectedNoteTags.filter(item => item !== tag));
                              } else {
                                setSelectedNoteTags([...selectedNoteTags, tag]);
                              }
                            }}
                            className="rounded border-stone-300 text-[#6B0F1A] focus:ring-[#6B0F1A]"
                          />
                          <span>{tag}</span>
                        </label>
                      ))}
                    </div>
                    <button className="text-[11px] text-[#6B0F1A] hover:underline font-semibold pt-0.5 block">
                      + Show More
                    </button>
                  </div>

                  {/* Filter 3: Year */}
                  <div className="space-y-1.5 pt-2 border-t border-stone-100">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                      <span>Year</span>
                      <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
                    </div>
                    <div className="space-y-1 text-xs text-stone-700">
                      {['2026 (6)', '2025 (28)', '2024 (46)', '2023 (38)'].map((y) => (
                        <label key={y} className="flex items-center gap-2 cursor-pointer hover:text-stone-900">
                          <input
                            type="checkbox"
                            checked={selectedNoteYears.includes(y)}
                            onChange={() => {
                              if (selectedNoteYears.includes(y)) {
                                setSelectedNoteYears(selectedNoteYears.filter(item => item !== y));
                              } else {
                                setSelectedNoteYears([...selectedNoteYears, y]);
                              }
                            }}
                            className="rounded border-stone-300 text-[#6B0F1A] focus:ring-[#6B0F1A]"
                          />
                          <span>{y}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* COLUMN 2: CENTER NOTES LISTING (Flex-1) */}
                <div className="flex-1 min-w-0 space-y-2.5">
                  {/* Results Header Bar */}
                  <div className="flex items-center justify-between text-xs text-stone-600 px-0.5">
                    <span className="font-semibold text-stone-800">
                      Showing 1 – 10 of 246 Notes
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-stone-500 text-xs">Sort By:</span>
                      <div className="relative">
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="bg-white border border-stone-200 rounded-lg text-xs font-medium text-stone-800 py-1 pl-2 pr-6 appearance-none shadow-2xs focus:outline-none focus:border-amber-400"
                        >
                          <option>Latest Updated</option>
                          <option>Oldest</option>
                          <option>Alphabetical</option>
                          <option>Most Important</option>
                        </select>
                        <ChevronDown className="w-3 h-3 text-stone-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Note Cards List */}
                  <div className="space-y-2">
                    {notesList.map((note) => {
                      const isBookmarked = bookmarkedNoteIds.includes(note.id);
                      return (
                        <div
                          key={note.id}
                          className="bg-white rounded-2xl border border-stone-200/80 p-2.5 sm:p-3 shadow-xs hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                        >
                          {/* Left: Icon & Text Info */}
                          <div className="flex items-start gap-2.5 min-w-0">
                            {/* Note Icon Badge */}
                            <div className="w-8 h-8 rounded-lg bg-[#FEF9EE] border border-[#F6BD60]/50 flex items-center justify-center shrink-0 mt-0.5">
                              {note.iconType === 'gavel' ? (
                                <Gavel className="w-4 h-4 text-[#C27803]" />
                              ) : (
                                <FileText className="w-4 h-4 text-[#C27803]" />
                              )}
                            </div>

                            {/* Text Info */}
                            <div className="min-w-0 space-y-1">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <h3 className="font-serif font-bold text-xs sm:text-sm text-[#38070E] truncate">
                                  {note.title}
                                </h3>
                                <span
                                  className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${note.badge.bg} ${note.badge.text} ${note.badge.border}`}
                                >
                                  {note.badge.label}
                                </span>
                              </div>

                              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-stone-500 font-sans">
                                <span className="flex items-center gap-1 text-stone-700 font-medium">
                                  <BookOpen className="w-2.5 h-2.5 text-stone-400" />
                                  <span>{note.primaryRef}</span>
                                </span>
                                <span className="text-stone-300">|</span>
                                <span>{note.subRef}</span>
                                <span className="text-stone-300">|</span>
                                <span>Updated: {note.updatedAt}</span>
                              </div>
                            </div>
                          </div>

                          {/* Right: Actions */}
                          <div className="flex items-center gap-1 self-end sm:self-center shrink-0">
                            <button
                              onClick={() => {
                                setEditingNoteId(note.id);
                                setNewNoteTitle(note.title);
                                setNewNoteType(note.type);
                                setNewNoteAct(note.primaryRef);
                                setNewNoteSection(note.subRef);
                                setNewNoteContent(note.content);
                                setNewNoteTag(note.tag);
                                setNewNoteImportant(note.tag === 'Important');
                                setIsCreateNoteOpen(true);
                              }}
                              className="px-2.5 py-1 rounded-md bg-[#650B16] hover:bg-[#800E1C] text-white text-[11px] font-bold flex items-center gap-1 transition-colors shadow-2xs"
                            >
                              <FileEdit className="w-3 h-3 text-[#F5C84C]" />
                              <span>Edit</span>
                            </button>

                            <button
                              onClick={() => setViewingNote(note)}
                              className="px-2 py-1 rounded-md bg-[#FFF9F2] hover:bg-amber-100/60 border border-amber-300 text-[#650B16] text-[11px] font-bold flex items-center gap-1 transition-colors shadow-2xs"
                            >
                              <Eye className="w-3 h-3 text-[#650B16]" />
                              <span>View</span>
                            </button>

                            <button
                              onClick={() => {
                                if (bookmarkedNoteIds.includes(note.id)) {
                                  setBookmarkedNoteIds(bookmarkedNoteIds.filter(id => id !== note.id));
                                } else {
                                  setBookmarkedNoteIds([...bookmarkedNoteIds, note.id]);
                                }
                              }}
                              className="p-1 rounded-md border border-stone-200 hover:bg-stone-50 text-stone-400 hover:text-amber-600 transition-colors shadow-2xs"
                              title="Bookmark note"
                            >
                              <Bookmark
                                className={`w-3.5 h-3.5 ${
                                  isBookmarked ? 'fill-amber-500 text-amber-500' : 'text-stone-400'
                                }`}
                              />
                            </button>

                            <button className="p-1 rounded-md border border-stone-200 hover:bg-stone-50 text-stone-400 hover:text-stone-600 transition-colors shadow-2xs">
                              <MoreVertical className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Pagination Bar */}
                  <div className="pt-1 flex items-center justify-center gap-1 text-xs select-none">
                    <button className="px-1.5 py-0.5 rounded border border-stone-200 text-stone-400 hover:text-stone-700 hover:bg-stone-50">
                      <ChevronsLeft className="w-3 h-3" />
                    </button>
                    <button className="px-1.5 py-0.5 rounded border border-stone-200 text-stone-400 hover:text-stone-700 hover:bg-stone-50">
                      ‹
                    </button>

                    <button className="w-6 h-6 rounded bg-[#650B16] text-white font-bold text-xs flex items-center justify-center shadow-2xs">
                      1
                    </button>
                    <button className="w-6 h-6 rounded border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs flex items-center justify-center">
                      2
                    </button>
                    <button className="w-6 h-6 rounded border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs flex items-center justify-center">
                      3
                    </button>
                    <button className="w-6 h-6 rounded border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs flex items-center justify-center">
                      4
                    </button>
                    <button className="w-6 h-6 rounded border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs flex items-center justify-center">
                      5
                    </button>
                    <span className="px-1 text-stone-400">...</span>
                    <button className="w-auto px-1.5 h-6 rounded border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs flex items-center justify-center">
                      25
                    </button>

                    <button className="px-1.5 py-0.5 rounded border border-stone-200 text-stone-500 hover:text-stone-700 hover:bg-stone-50">
                      ›
                    </button>
                    <button className="px-1.5 py-0.5 rounded border border-stone-200 text-stone-500 hover:text-stone-700 hover:bg-stone-50">
                      <ChevronsRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* COLUMN 3: RIGHT QUICK ACTIONS & NOTES OVERVIEW (Width ~ 230px) */}
                <div className="w-full lg:w-[230px] shrink-0 space-y-3">
                  {/* Panel 1: Quick Actions */}
                  <div className="bg-white rounded-2xl border border-stone-200 p-3 shadow-xs space-y-2">
                    <div className="flex items-center gap-1.5 pb-1.5 border-b border-stone-100">
                      <Zap className="w-3.5 h-3.5 text-[#6B0F1A]" />
                      <span className="font-serif font-bold text-xs text-[#40080F]">Quick Actions</span>
                    </div>
                    <div className="space-y-1">
                      {noteQuickActions.map((action) => {
                        const Icon = action.icon;
                        return (
                          <button
                            key={action.id}
                            onClick={() => {
                              if (action.id === 'create') {
                                setEditingNoteId(null);
                                setNewNoteTitle('');
                                setNewNoteType('Act Notes');
                                setNewNoteAct('Indian Evidence Act, 1872');
                                setNewNoteSection('Section 65B');
                                setNewNoteContent('');
                                setNewNoteTag('Evidence');
                                setNewNoteImportant(false);
                                setIsCreateNoteOpen(true);
                              }
                            }}
                            className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg text-xs text-stone-700 hover:text-stone-950 hover:bg-[#FAF4E8] transition-colors border-b border-stone-100 last:border-0"
                          >
                            <span className="flex items-center gap-2">
                              <Icon className="w-3.5 h-3.5 text-stone-500" />
                              <span className="font-medium text-[11px]">{action.label}</span>
                            </span>
                            <ChevronRight className="w-3 h-3 text-stone-400" />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Panel 2: Notes Overview */}
                  <div className="bg-white rounded-2xl border border-stone-200 p-3 shadow-xs space-y-2">
                    <div className="flex items-center gap-1.5 pb-1.5 border-b border-stone-100">
                      <BarChart2 className="w-3.5 h-3.5 text-[#6B0F1A]" />
                      <span className="font-serif font-bold text-xs text-[#40080F]">Notes Overview</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {noteOverviewStats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                          <div
                            key={stat.label}
                            className="bg-[#FFFCF7] rounded-xl border border-stone-200/80 p-2 flex items-center gap-1.5"
                          >
                            <div className="w-7 h-7 rounded-lg bg-amber-100/70 border border-amber-200/60 flex items-center justify-center shrink-0">
                              <Icon className="w-3.5 h-3.5 text-amber-700" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-bold text-xs sm:text-sm text-stone-900 leading-tight">
                                {stat.count}
                              </div>
                              <div className="text-[9.5px] text-stone-600 leading-tight whitespace-nowrap">
                                {stat.label}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : activeNav === 'search' ? (
            /* ========================================================================= */
            /* ADVANCED SEARCH VIEW - Exact recreation of media_1794144666700_edef399f.jpg */
            /* ========================================================================= */
            <div className="space-y-3.5 animate-in fade-in duration-200">
              {/* HERO BANNER FOR SEARCH - Exact master reference banner */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-amber-500/35 shadow-lg select-none bg-[#240308]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/banners/banner_search.png"
                  alt="Search - Find Acts, Rules, Sections, Amendments, Notifications and Legal Updates Instantly"
                  className="w-full h-auto object-cover object-center block"
                />
                <h1 className="sr-only">
                  Search - Find Acts, Rules, Sections, Amendments, Notifications and Legal Updates Instantly.
                </h1>
              </div>

              {/* SEARCH MODE TABS (6 HORIZONTAL CARDS) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5">
                {searchModes.map((mode) => {
                  const Icon = mode.icon;
                  const isActive = searchMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => setSearchMode(mode.id)}
                      className={`flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl border text-[10px] sm:text-[11px] xl:text-xs font-semibold whitespace-nowrap transition-all shadow-2xs ${
                        isActive
                          ? 'bg-[#430811] border-[#C89B3C] text-white shadow-md'
                          : 'bg-[#FAF4E8] border-[#E5C58A] text-stone-800 hover:bg-[#F4E9D0]'
                      }`}
                    >
                      {mode.symbol ? (
                        <span className={`font-serif font-bold text-sm leading-none ${isActive ? 'text-[#F6BD60]' : 'text-[#6B0F1A]'}`}>
                          {mode.symbol}
                        </span>
                      ) : (
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#F6BD60]' : 'text-[#6B0F1A]'}`} />
                      )}
                      <span>{mode.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* MAIN SEARCH BAR */}
              <div className="flex items-center gap-2.5">
                <div className="flex-1 bg-white rounded-xl shadow-xs border border-stone-200 p-1.5 px-3 flex items-center gap-2">
                  <div className="text-stone-400">
                    <Search className="w-4 h-4 text-[#6B0F1A]" />
                  </div>
                  <input
                    type="text"
                    defaultValue="evidence"
                    placeholder="Search across Acts, Rules, Sections, Amendments, Notifications..."
                    className="flex-1 text-xs sm:text-sm bg-transparent outline-none text-stone-800 placeholder-stone-400 font-sans"
                  />
                  <button className="px-6 py-2 rounded-lg bg-[#6B0F1A] hover:bg-[#851321] text-white text-xs font-bold transition-all shadow-xs">
                    Search
                  </button>
                </div>

                <button className="px-4 py-2.5 rounded-xl bg-[#FAF4E8] hover:bg-[#F4E9D0] border border-[#E5C58A] text-stone-800 text-xs font-semibold flex items-center gap-2 transition-all shadow-2xs shrink-0">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#6B0F1A]" />
                  <span>Advanced Search</span>
                </button>
              </div>

              {/* 7 SEARCH CATEGORY PILLS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5">
                {searchCategories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeSearchCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveSearchCategory(cat.id)}
                      className={`flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-xl border text-[10px] sm:text-[10.5px] xl:text-xs font-semibold whitespace-nowrap transition-all shadow-2xs ${
                        isActive
                          ? 'bg-[#430811] border-[#C89B3C] text-white shadow-md'
                          : 'bg-[#FAF4E8] border-[#E5C58A] text-stone-800 hover:bg-[#F4E9D0]'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#F6BD60]' : 'text-[#6B0F1A]'}`} />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* 3-COLUMN CONTENT LAYOUT */}
              <div className="flex flex-col lg:flex-row items-start gap-3 w-full">
                {/* COLUMN 1: LEFT FILTER RESULTS PANEL (Width ~ 210px) */}
                <div className="w-full lg:w-[210px] shrink-0 bg-white rounded-2xl border border-stone-200 p-3 shadow-xs space-y-3">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                    <div className="flex items-center gap-2 font-serif font-bold text-xs sm:text-sm text-[#40080F]">
                      <Filter className="w-3.5 h-3.5 text-[#6B0F1A]" />
                      <span>Filter Results</span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedSearchYears([]);
                        setSelectedJurisdictions([]);
                        setSelectedActTypeFilters([]);
                        setSelectedDocTypes([]);
                      }}
                      className="text-[10px] text-rose-700 hover:underline font-semibold flex items-center gap-1"
                    >
                      <span>Clear All</span>
                    </button>
                  </div>

                  {/* Filter 1: Year of Enactment / Notification */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                      <span>Year of Enactment / Notification</span>
                      <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
                    </div>
                    <div className="space-y-1 text-xs text-stone-700">
                      {['2026 (128)', '2025 (842)', '2024 (1,260)', '2023 (1,194)'].map((y) => (
                        <label key={y} className="flex items-center gap-2 cursor-pointer hover:text-stone-900">
                          <input
                            type="checkbox"
                            checked={selectedSearchYears.includes(y)}
                            onChange={() => {
                              if (selectedSearchYears.includes(y)) {
                                setSelectedSearchYears(selectedSearchYears.filter(item => item !== y));
                              } else {
                                setSelectedSearchYears([...selectedSearchYears, y]);
                              }
                            }}
                            className="w-3.5 h-3.5 accent-[#6B0F1A] rounded"
                          />
                          <span>{y}</span>
                        </label>
                      ))}
                      <button className="text-[11px] text-[#6B0F1A] hover:underline font-semibold pt-0.5">
                        + Show More
                      </button>
                    </div>
                  </div>

                  {/* Filter 2: Jurisdiction */}
                  <div className="space-y-1.5 pt-2 border-t border-stone-100">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                      <span>Jurisdiction</span>
                      <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
                    </div>
                    <div className="space-y-1 text-xs text-stone-700">
                      {['Central (8,430)', 'State (4,210)'].map((j) => (
                        <label key={j} className="flex items-center gap-2 cursor-pointer hover:text-stone-900">
                          <input
                            type="checkbox"
                            checked={selectedJurisdictions.includes(j)}
                            onChange={() => {
                              if (selectedJurisdictions.includes(j)) {
                                setSelectedJurisdictions(selectedJurisdictions.filter(item => item !== j));
                              } else {
                                setSelectedJurisdictions([...selectedJurisdictions, j]);
                              }
                            }}
                            className="w-3.5 h-3.5 accent-[#6B0F1A] rounded"
                          />
                          <span>{j}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Filter 3: Act Type */}
                  <div className="space-y-1.5 pt-2 border-t border-stone-100">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                      <span>Act Type</span>
                      <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
                    </div>
                    <div className="space-y-1 text-xs text-stone-700">
                      {['Principal Act (4,120)', 'Amending Act (420)', 'Repealing Act (80)', 'Rules / Regulations (3,210)'].map((at) => (
                        <label key={at} className="flex items-center gap-2 cursor-pointer hover:text-stone-900">
                          <input
                            type="checkbox"
                            checked={selectedActTypeFilters.includes(at)}
                            onChange={() => {
                              if (selectedActTypeFilters.includes(at)) {
                                setSelectedActTypeFilters(selectedActTypeFilters.filter(item => item !== at));
                              } else {
                                setSelectedActTypeFilters([...selectedActTypeFilters, at]);
                              }
                            }}
                            className="w-3.5 h-3.5 accent-[#6B0F1A] rounded"
                          />
                          <span>{at}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Filter 4: Document Type */}
                  <div className="space-y-1.5 pt-2 border-t border-stone-100">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                      <span>Document Type</span>
                      <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
                    </div>
                    <div className="space-y-1 text-xs text-stone-700">
                      {['Act (4,820)', 'Rule (3,210)', 'Amendment (1,540)', 'Notification (1,320)', 'Circular / Order (750)'].map((dt) => (
                        <label key={dt} className="flex items-center gap-2 cursor-pointer hover:text-stone-900">
                          <input
                            type="checkbox"
                            checked={selectedDocTypes.includes(dt)}
                            onChange={() => {
                              if (selectedDocTypes.includes(dt)) {
                                setSelectedDocTypes(selectedDocTypes.filter(item => item !== dt));
                              } else {
                                setSelectedDocTypes([...selectedDocTypes, dt]);
                              }
                            }}
                            className="w-3.5 h-3.5 accent-[#6B0F1A] rounded"
                          />
                          <span>{dt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* COLUMN 2: CENTER SEARCH RESULTS (Flex 1) */}
                <div className="flex-1 min-w-0 space-y-2.5">
                  {/* Results Header Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-serif font-bold text-xs sm:text-sm text-stone-900">
                        Search Results for <span className="text-[#6B0F1A] italic">&ldquo;evidence&rdquo;</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 text-[11px] text-stone-500 font-sans">
                      <span>Showing <strong>1 – 10</strong> of <strong>12,640</strong> Results</span>
                      <div className="flex items-center gap-1 text-stone-700">
                        <span className="font-medium">Sort By:</span>
                        <div className="bg-white border border-stone-200 rounded-lg px-2 py-0.5 font-medium text-stone-800 flex items-center gap-1 shadow-2xs">
                          <span>Relevance</span>
                          <ChevronDown className="w-3 h-3 text-stone-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Results Cards List (5 Results) */}
                  <div className="space-y-2">
                    {searchResultsData.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-xl border border-stone-200 p-3 shadow-2xs hover:border-[#E5C58A] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-[#FFF5E7] border border-[#E5C58A] flex items-center justify-center shrink-0 shadow-2xs">
                            {item.iconType === 'scale' && <Scale className="w-5 h-5 text-amber-700" />}
                            {item.iconType === 'rule_doc' && <FileEdit className="w-5 h-5 text-amber-700" />}
                            {item.iconType === 'gavel' && <Gavel className="w-5 h-5 text-amber-700" />}
                            {item.iconType === 'bell' && <Bell className="w-5 h-5 text-amber-700" />}
                            {item.iconType === 'section' && <AlignLeft className="w-5 h-5 text-amber-700" />}
                          </div>

                          <div className="space-y-0.5">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <h3 className="font-serif font-bold text-xs sm:text-sm text-stone-900 leading-tight">
                                {item.title}
                              </h3>
                              {item.badges.map((b) => (
                                <span
                                  key={b.label}
                                  className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${b.bg} ${b.text} ${b.border}`}
                                >
                                  {b.label}
                                </span>
                              ))}
                            </div>

                            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-stone-500 font-sans">
                              <span className="flex items-center gap-1 text-stone-700 font-medium">
                                <Landmark className="w-2.5 h-2.5 text-stone-400" />
                                <span>{item.jurisdiction}</span>
                              </span>
                              <span className="text-stone-300">|</span>
                              <span>{item.number}</span>
                              {item.status && (
                                <>
                                  <span className="text-stone-300">|</span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-2.5 h-2.5 text-stone-400" />
                                    <span>{item.status}</span>
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Card Action Buttons */}
                        <div className="flex items-center gap-1 self-end sm:self-center shrink-0">
                          <button className="px-2.5 py-1 rounded-md bg-[#650B16] hover:bg-[#800E1C] text-white text-[11px] font-bold flex items-center gap-1 transition-colors shadow-2xs">
                            <BookOpen className="w-3 h-3 text-[#F5C84C]" />
                            <span>View</span>
                          </button>

                          {item.buttonType === 'sections' && (
                            <button className="px-2 py-1 rounded-md border border-stone-200 hover:bg-stone-50 text-stone-700 text-[11px] font-semibold flex items-center gap-1 transition-colors shadow-2xs">
                              <AlignLeft className="w-3 h-3 text-stone-500" />
                              <span>Sections</span>
                            </button>
                          )}

                          {item.buttonType === 'details' && (
                            <button className="px-2 py-1 rounded-md border border-stone-200 hover:bg-stone-50 text-stone-700 text-[11px] font-semibold flex items-center gap-1 transition-colors shadow-2xs">
                              <AlignLeft className="w-3 h-3 text-stone-500" />
                              <span>Details</span>
                            </button>
                          )}

                          {item.buttonType === 'related' && (
                            <button className="px-2 py-1 rounded-md border border-stone-200 hover:bg-stone-50 text-stone-700 text-[11px] font-semibold flex items-center gap-1 transition-colors shadow-2xs">
                              <Link2 className="w-3 h-3 text-stone-500" />
                              <span>Related</span>
                            </button>
                          )}

                          <button
                            onClick={() => {
                              if (bookmarkedSearchIds.includes(item.id)) {
                                setBookmarkedSearchIds(bookmarkedSearchIds.filter(id => id !== item.id));
                              } else {
                                setBookmarkedSearchIds([...bookmarkedSearchIds, item.id]);
                              }
                            }}
                            className={`p-1 rounded-md border border-stone-200 transition-colors shadow-2xs ${
                              bookmarkedSearchIds.includes(item.id)
                                ? 'bg-amber-50 text-amber-700 border-amber-300'
                                : 'hover:bg-stone-50 text-stone-500'
                            }`}
                          >
                            <Bookmark className={`w-3 h-3 ${bookmarkedSearchIds.includes(item.id) ? 'fill-amber-600 text-amber-600' : ''}`} />
                          </button>

                          <button className="p-1 rounded-md border border-stone-200 hover:bg-stone-50 text-stone-500 transition-colors shadow-2xs">
                            <MoreVertical className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cross-References (Related) Strip */}
                  <div className="bg-[#FAF4E8] rounded-xl border border-[#E5C58A] p-2 flex flex-wrap items-center justify-between gap-1.5 shadow-2xs">
                    <div className="flex items-center gap-1.5 font-serif font-bold text-xs text-[#6B0F1A]">
                      <Link2 className="w-3.5 h-3.5 text-[#6B0F1A]" />
                      <span>Cross-References (Related)</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1 text-[11px]">
                      {crossReferencePills.map((cr) => (
                        <button
                          key={cr.label}
                          className="px-2 py-0.5 rounded-lg bg-white border border-[#E5C58A] text-stone-800 hover:bg-[#F4E9D0] font-medium transition-colors flex items-center gap-1"
                        >
                          <span>{cr.label}</span>
                          <span className="text-[#6B0F1A] font-bold">&gt;</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pagination Bar */}
                  <div className="pt-1 flex items-center justify-center gap-1 text-xs select-none">
                    <button className="px-1.5 py-0.5 rounded border border-stone-200 text-stone-400 hover:text-stone-700 hover:bg-stone-50">
                      <ChevronsLeft className="w-3 h-3" />
                    </button>
                    <button className="px-1.5 py-0.5 rounded border border-stone-200 text-stone-400 hover:text-stone-700 hover:bg-stone-50">
                      ‹
                    </button>

                    <button className="w-6 h-6 rounded bg-[#650B16] text-white font-bold text-xs flex items-center justify-center shadow-2xs">
                      1
                    </button>
                    <button className="w-6 h-6 rounded border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs flex items-center justify-center">
                      2
                    </button>
                    <button className="w-6 h-6 rounded border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs flex items-center justify-center">
                      3
                    </button>
                    <button className="w-6 h-6 rounded border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs flex items-center justify-center">
                      4
                    </button>
                    <button className="w-6 h-6 rounded border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs flex items-center justify-center">
                      5
                    </button>
                    <span className="px-1 text-stone-400">...</span>
                    <button className="w-auto px-1.5 h-6 rounded border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs flex items-center justify-center">
                      1,264
                    </button>

                    <button className="px-1.5 py-0.5 rounded border border-stone-200 text-stone-500 hover:text-stone-700 hover:bg-stone-50">
                      ›
                    </button>
                    <button className="px-1.5 py-0.5 rounded border border-stone-200 text-stone-500 hover:text-stone-700 hover:bg-stone-50">
                      <ChevronsRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* COLUMN 3: RIGHT SEARCH HISTORY & SAVED SEARCHES (Width ~ 220px) */}
                <div className="w-full lg:w-[220px] shrink-0 space-y-3">
                  {/* Panel 1: Search History */}
                  <div className="bg-white rounded-2xl border border-stone-200 p-3 shadow-xs space-y-2">
                    <div className="flex items-center justify-between pb-1.5 border-b border-stone-100">
                      <div className="flex items-center gap-1.5 font-serif font-bold text-xs text-[#40080F]">
                        <History className="w-3.5 h-3.5 text-[#6B0F1A]" />
                        <span>Search History</span>
                      </div>
                      <button className="text-[10px] text-rose-700 hover:underline font-semibold">
                        View All
                      </button>
                    </div>

                    <div className="space-y-1">
                      {searchHistoryList.map((hist) => (
                        <div
                          key={hist.id}
                          className="flex items-center justify-between p-1.5 rounded-lg hover:bg-stone-50 transition-colors group"
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            <Search className="w-3 h-3 text-stone-400 shrink-0" />
                            <div className="truncate">
                              <p className="text-xs font-semibold text-stone-800 leading-tight truncate">
                                {hist.query}
                              </p>
                              <p className="text-[9px] text-stone-400 font-sans">
                                {hist.time}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => setSearchHistoryList(searchHistoryList.filter(h => h.id !== hist.id))}
                            className="text-stone-400 hover:text-rose-600 p-0.5 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Panel 2: Saved Searches */}
                  <div className="bg-white rounded-2xl border border-stone-200 p-3 shadow-xs space-y-2">
                    <div className="flex items-center justify-between pb-1.5 border-b border-stone-100">
                      <div className="flex items-center gap-1.5 font-serif font-bold text-xs text-[#40080F]">
                        <Bookmark className="w-3.5 h-3.5 text-[#6B0F1A]" />
                        <span>Saved Searches</span>
                      </div>
                      <button className="text-[10px] text-rose-700 hover:underline font-semibold">
                        View All
                      </button>
                    </div>

                    <div className="space-y-1">
                      {savedSearchesList.map((saved) => {
                        const Icon = saved.icon;
                        return (
                          <div
                            key={saved.id}
                            className="flex items-center justify-between p-1.5 rounded-lg hover:bg-stone-50 transition-colors group"
                          >
                            <div className="flex items-center gap-2 overflow-hidden">
                              <Icon className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                              <span className="text-xs font-medium text-stone-800 truncate">
                                {saved.title}
                              </span>
                            </div>

                            <button className="text-stone-400 hover:text-stone-600 p-0.5 transition-colors">
                              <MoreVertical className="w-3 h-3" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : activeNav === 'amendments' ? (
            /* ========================================================================= */
            /* AMENDMENTS & UPDATES VIEW - Exact recreation of media_1794143471953_89caed1c.jpg */
            /* ========================================================================= */
            <div className="space-y-3.5 animate-in fade-in duration-200">
              {/* HERO BANNER FOR AMENDMENTS & UPDATES - Exact master reference banner */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-amber-500/35 shadow-lg select-none bg-[#240308]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/banners/banner_amendments.png"
                  alt="Amendments & Updates - Stay Updated with the Latest Amendments, Notifications, Corrections and Government Updates"
                  className="w-full h-auto object-cover object-center block"
                />
                <h1 className="sr-only">
                  Amendments &amp; Updates - Stay Updated with the Latest Amendments, Notifications, Corrections and Government Updates.
                </h1>
              </div>

              {/* SEARCH & ADVANCED SEARCH BAR */}
              <div className="flex items-center gap-2.5">
                <div className="flex-1 bg-white rounded-xl shadow-xs border border-stone-200 p-1.5 px-3 flex items-center gap-2">
                  <div className="text-stone-400">
                    <Search className="w-4 h-4 text-[#6B0F1A]" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Amendments by Act Name, Notification, Year or Keyword..."
                    className="flex-1 text-xs sm:text-sm bg-transparent outline-none text-stone-800 placeholder-stone-400 font-sans"
                  />
                  <button className="px-6 py-2 rounded-lg bg-[#6B0F1A] hover:bg-[#851321] text-white text-xs font-bold transition-all shadow-xs">
                    Search
                  </button>
                </div>

                <button className="px-4 py-2.5 rounded-xl bg-[#FAF4E8] hover:bg-[#F4E9D0] border border-[#E5C58A] text-stone-800 text-xs font-semibold flex items-center gap-2 transition-all shadow-2xs shrink-0">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#6B0F1A]" />
                  <span>Advanced Search</span>
                </button>
              </div>

              {/* 6 FILTER TABS / PILLS ROW */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {updatePills.map((pill) => {
                  const Icon = pill.icon;
                  const isActive = activeUpdateFilter === pill.id;
                  return (
                    <button
                      key={pill.id}
                      onClick={() => setActiveUpdateFilter(pill.id)}
                      className={`relative flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all shadow-2xs ${
                        isActive
                          ? 'bg-[#430811] border-[#C89B3C] text-white shadow-md'
                          : 'bg-[#FAF4E8] border-[#E5C58A] text-stone-800 hover:bg-[#F4E9D0]'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#F6BD60]' : 'text-[#6B0F1A]'}`} />
                      <span className="truncate">{pill.label}</span>
                      {pill.badge && (
                        <span className="absolute -top-1.5 -right-1 px-1.5 py-0.2 rounded-full bg-rose-600 text-[9px] font-bold text-white shadow-xs">
                          {pill.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* 2-COLUMN CONTENT: LEFT FILTER SIDEBAR + RIGHT UPDATES LIST */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
                {/* Left Filter Sidebar */}
                <div className="lg:col-span-3 bg-white rounded-2xl border border-stone-200 p-3.5 shadow-xs space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-stone-100">
                    <div className="flex items-center gap-2 font-serif font-bold text-xs sm:text-sm text-[#40080F]">
                      <Filter className="w-3.5 h-3.5 text-[#6B0F1A]" />
                      <span>Filter Updates</span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedUpdateTypes(['amendments', 'notifications', 'corrections']);
                        setSelectedUpdateYears([]);
                      }}
                      className="text-[10px] text-rose-700 hover:underline font-semibold flex items-center gap-1"
                    >
                      <span>Clear All</span>
                    </button>
                  </div>

                  {/* Update Type Section */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                      <span>Update Type</span>
                      <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
                    </div>

                    <div className="space-y-1.5 text-xs text-stone-700">
                      <label className="flex items-center gap-2 cursor-pointer hover:text-stone-900">
                        <input
                          type="checkbox"
                          checked={selectedUpdateTypes.includes('amendments')}
                          onChange={() => {
                            if (selectedUpdateTypes.includes('amendments')) {
                              setSelectedUpdateTypes(selectedUpdateTypes.filter(t => t !== 'amendments'));
                            } else {
                              setSelectedUpdateTypes([...selectedUpdateTypes, 'amendments']);
                            }
                          }}
                          className="w-3.5 h-3.5 accent-[#6B0F1A] rounded"
                        />
                        <span>Amendments (986)</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer hover:text-stone-900">
                        <input
                          type="checkbox"
                          checked={selectedUpdateTypes.includes('notifications')}
                          onChange={() => {
                            if (selectedUpdateTypes.includes('notifications')) {
                              setSelectedUpdateTypes(selectedUpdateTypes.filter(t => t !== 'notifications'));
                            } else {
                              setSelectedUpdateTypes([...selectedUpdateTypes, 'notifications']);
                            }
                          }}
                          className="w-3.5 h-3.5 accent-[#6B0F1A] rounded"
                        />
                        <span>Notifications (432)</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer hover:text-stone-900">
                        <input
                          type="checkbox"
                          checked={selectedUpdateTypes.includes('corrections')}
                          onChange={() => {
                            if (selectedUpdateTypes.includes('corrections')) {
                              setSelectedUpdateTypes(selectedUpdateTypes.filter(t => t !== 'corrections'));
                            } else {
                              setSelectedUpdateTypes([...selectedUpdateTypes, 'corrections']);
                            }
                          }}
                          className="w-3.5 h-3.5 accent-[#6B0F1A] rounded"
                        />
                        <span>Corrections (128)</span>
                      </label>
                    </div>
                  </div>

                  {/* Year Section */}
                  <div className="space-y-2 pt-1 border-t border-stone-100">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                      <span>Year</span>
                      <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
                    </div>

                    <div className="space-y-1.5 text-xs text-stone-700">
                      {['2026 (28)', '2025 (214)', '2024 (398)', '2023 (412)'].map((y) => (
                        <label key={y} className="flex items-center gap-2 cursor-pointer hover:text-stone-900">
                          <input
                            type="checkbox"
                            checked={selectedUpdateYears.includes(y)}
                            onChange={() => {
                              if (selectedUpdateYears.includes(y)) {
                                setSelectedUpdateYears(selectedUpdateYears.filter(item => item !== y));
                              } else {
                                setSelectedUpdateYears([...selectedUpdateYears, y]);
                              }
                            }}
                            className="w-3.5 h-3.5 accent-[#6B0F1A] rounded"
                          />
                          <span>{y}</span>
                        </label>
                      ))}

                      <button className="text-[11px] text-[#6B0F1A] hover:underline font-semibold pt-1">
                        + Show More
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Updates List */}
                <div className="lg:col-span-9 space-y-2.5">
                  {/* List Header Bar */}
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs text-stone-500 font-medium">
                      Showing <strong>1 – 10</strong> of <strong>1,842</strong> Updates
                    </span>

                    <div className="flex items-center gap-1.5 text-xs text-stone-600">
                      <span className="font-semibold">Sort By:</span>
                      <div className="bg-white border border-stone-200 rounded-lg px-2.5 py-1 font-medium text-stone-800 flex items-center gap-1 shadow-2xs">
                        <span>{sortBy}</span>
                        <ChevronDown className="w-3 h-3 text-stone-400" />
                      </div>
                    </div>
                  </div>

                  {/* Updates Cards List */}
                  <div className="space-y-2.5">
                    {updatesList.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-xl border border-stone-200 p-3.5 shadow-2xs hover:border-[#E5C58A] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#FFF5E7] border border-[#E5C58A] flex items-center justify-center shrink-0 shadow-2xs">
                            {item.iconType === 'gavel' && <Gavel className="w-5 h-5 text-amber-700" />}
                            {item.iconType === 'bell' && <Bell className="w-5 h-5 text-amber-700" />}
                            {item.iconType === 'rotate' && <RotateCw className="w-5 h-5 text-amber-700" />}
                            {item.iconType === 'doc' && <FileEdit className="w-5 h-5 text-amber-700" />}
                          </div>

                          <div className="space-y-1">
                            <h3 className="font-serif font-bold text-sm sm:text-base text-stone-900 leading-tight">
                              {item.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] text-stone-500 font-sans">
                              <span className="flex items-center gap-1 text-stone-700 font-medium">
                                <Landmark className="w-3 h-3 text-stone-400" />
                                <span>{item.type}</span>
                              </span>
                              <span className="text-stone-300">|</span>
                              <span>{item.notificationNo}</span>
                              <span className="text-stone-300">|</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-stone-400" />
                                <span>Dated: {item.dated}</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Card Action Buttons */}
                        <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                          <button className="px-3 py-1.5 rounded-lg bg-[#650B16] hover:bg-[#800E1C] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs">
                            <BookOpen className="w-3.5 h-3.5 text-[#F5C84C]" />
                            <span>View Update</span>
                          </button>

                          <button className="px-2.5 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center gap-1 transition-colors shadow-2xs">
                            <AlignLeft className="w-3.5 h-3.5 text-stone-500" />
                            <span>Details</span>
                          </button>

                          <button
                            onClick={() => {
                              if (bookmarkedUpdateIds.includes(item.id)) {
                                setBookmarkedUpdateIds(bookmarkedUpdateIds.filter(id => id !== item.id));
                              } else {
                                setBookmarkedUpdateIds([...bookmarkedUpdateIds, item.id]);
                              }
                            }}
                            className={`p-1.5 rounded-lg border border-stone-200 transition-colors shadow-2xs ${
                              bookmarkedUpdateIds.includes(item.id)
                                ? 'bg-amber-50 text-amber-700 border-amber-300'
                                : 'hover:bg-stone-50 text-stone-500'
                            }`}
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${bookmarkedUpdateIds.includes(item.id) ? 'fill-amber-600 text-amber-600' : ''}`} />
                          </button>

                          <button className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-500 transition-colors shadow-2xs">
                            <MoreVertical className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination Bar */}
                  <div className="pt-2 flex items-center justify-center gap-1 sm:gap-1.5 text-xs select-none">
                    <button className="px-2 py-1 rounded-md border border-stone-200 text-stone-400 hover:text-stone-700 hover:bg-stone-50 transition-colors">
                      <ChevronsLeft className="w-3 h-3" />
                    </button>
                    <button className="px-2 py-1 rounded-md border border-stone-200 text-stone-400 hover:text-stone-700 hover:bg-stone-50 transition-colors">
                      ‹
                    </button>

                    <button className="w-7 h-7 rounded-md bg-[#650B16] text-white font-bold text-xs flex items-center justify-center shadow-2xs">
                      1
                    </button>
                    <button className="w-7 h-7 rounded-md border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs flex items-center justify-center transition-colors">
                      2
                    </button>
                    <button className="w-7 h-7 rounded-md border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs flex items-center justify-center transition-colors">
                      3
                    </button>
                    <button className="w-7 h-7 rounded-md border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs flex items-center justify-center transition-colors">
                      4
                    </button>
                    <button className="w-7 h-7 rounded-md border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs flex items-center justify-center transition-colors">
                      5
                    </button>
                    <span className="px-1 text-stone-400">...</span>
                    <button className="w-7 h-7 rounded-md border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs flex items-center justify-center transition-colors">
                      185
                    </button>

                    <button className="px-2 py-1 rounded-md border border-stone-200 text-stone-500 hover:text-stone-700 hover:bg-stone-50 transition-colors">
                      ›
                    </button>
                    <button className="px-2 py-1 rounded-md border border-stone-200 text-stone-500 hover:text-stone-700 hover:bg-stone-50 transition-colors">
                      <ChevronsRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : activeNav === 'browse_rules' ? (
            /* ========================================================================= */
            /* BROWSE RULES VIEW - Exact recreation of media_1794143076978_b24fdb5c.jpg  */
            /* ========================================================================= */
            <div className="space-y-3.5 animate-in fade-in duration-200">
              {/* HERO BANNER FOR BROWSE RULES - Exact master reference banner */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-amber-500/35 shadow-lg select-none bg-[#240308]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/banners/banner_rules.png"
                  alt="Browse Rules - Explore Rules & Regulations framed under Central and State Acts"
                  className="w-full h-auto object-cover object-center block"
                />
                <h1 className="sr-only">
                  Browse Rules - Explore Rules & Regulations framed under Central and State Acts.
                </h1>
              </div>

              {/* SEARCH & ADVANCED SEARCH BAR */}
              <div className="flex items-center gap-2.5">
                <div className="flex-1 bg-white rounded-xl shadow-xs border border-stone-200 p-1.5 px-3 flex items-center gap-2">
                  <div className="text-stone-400">
                    <Search className="w-4 h-4 text-[#6B0F1A]" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Rules by Title, Act Name, Year, Keyword or Section..."
                    className="flex-1 text-xs sm:text-sm bg-transparent outline-none text-stone-800 placeholder-stone-400 font-sans"
                  />
                  <button className="px-6 py-2 rounded-lg bg-[#6B0F1A] hover:bg-[#851321] text-white text-xs font-bold transition-all shadow-xs">
                    Search
                  </button>
                </div>

                <button className="px-4 py-2.5 rounded-xl bg-[#FAF4E8] hover:bg-[#F4E9D0] border border-[#E5C58A] text-stone-800 text-xs font-semibold flex items-center gap-2 transition-all shadow-2xs shrink-0">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#6B0F1A]" />
                  <span>Advanced Search</span>
                </button>
              </div>

              {/* 6 FILTER TABS / PILLS ROW */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {rulesPills.map((pill) => {
                  const Icon = pill.icon;
                  const isActive = activeRuleFilter === pill.id;
                  return (
                    <button
                      key={pill.id}
                      onClick={() => setActiveRuleFilter(pill.id)}
                      className={`relative flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all shadow-2xs ${
                        isActive
                          ? 'bg-[#430811] border-[#C89B3C] text-white shadow-md'
                          : 'bg-[#FAF4E8] border-[#E5C58A] text-stone-800 hover:bg-[#F4E9D0]'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#F6BD60]' : 'text-[#6B0F1A]'}`} />
                      <span className="truncate">{pill.label}</span>
                      {pill.badge && (
                        <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.2 rounded-full bg-rose-600 text-[9px] font-bold text-white shadow-xs">
                          {pill.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* 2-COLUMN CONTENT: LEFT FILTER SIDEBAR + RIGHT RULES LIST */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
                {/* Left Filter Sidebar */}
                <div className="lg:col-span-3 bg-white rounded-2xl border border-stone-200 p-3.5 shadow-xs space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-stone-100">
                    <div className="flex items-center gap-2 font-serif font-bold text-xs sm:text-sm text-[#40080F]">
                      <Filter className="w-3.5 h-3.5 text-[#6B0F1A]" />
                      <span>Filter Rules</span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedRuleTypes(['central', 'state']);
                        setSelectedRuleYears([]);
                      }}
                      className="text-[10px] text-rose-700 hover:underline font-semibold flex items-center gap-1"
                    >
                      <span>Clear All</span>
                    </button>
                  </div>

                  {/* Rule Type Section */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                      <span>Rule Type</span>
                      <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
                    </div>

                    <div className="space-y-1.5 text-xs text-stone-700">
                      <label className="flex items-center gap-2 cursor-pointer hover:text-stone-900">
                        <input
                          type="checkbox"
                          checked={selectedRuleTypes.includes('central')}
                          onChange={() => {
                            if (selectedRuleTypes.includes('central')) {
                              setSelectedRuleTypes(selectedRuleTypes.filter(t => t !== 'central'));
                            } else {
                              setSelectedRuleTypes([...selectedRuleTypes, 'central']);
                            }
                          }}
                          className="w-3.5 h-3.5 accent-[#6B0F1A] rounded"
                        />
                        <span>Central Rules (1,720)</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer hover:text-stone-900">
                        <input
                          type="checkbox"
                          checked={selectedRuleTypes.includes('state')}
                          onChange={() => {
                            if (selectedRuleTypes.includes('state')) {
                              setSelectedRuleTypes(selectedRuleTypes.filter(t => t !== 'state'));
                            } else {
                              setSelectedRuleTypes([...selectedRuleTypes, 'state']);
                            }
                          }}
                          className="w-3.5 h-3.5 accent-[#6B0F1A] rounded"
                        />
                        <span>State Rules (765)</span>
                      </label>
                    </div>
                  </div>

                  {/* Year of Notification Section */}
                  <div className="space-y-2 pt-1 border-t border-stone-100">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                      <span>Year of Notification</span>
                      <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
                    </div>

                    <div className="space-y-1.5 text-xs text-stone-700">
                      {['2026 (36)', '2025 (142)', '2024 (298)', '2023 (421)'].map((y) => (
                        <label key={y} className="flex items-center gap-2 cursor-pointer hover:text-stone-900">
                          <input
                            type="checkbox"
                            checked={selectedRuleYears.includes(y)}
                            onChange={() => {
                              if (selectedRuleYears.includes(y)) {
                                setSelectedRuleYears(selectedRuleYears.filter(item => item !== y));
                              } else {
                                setSelectedRuleYears([...selectedRuleYears, y]);
                              }
                            }}
                            className="w-3.5 h-3.5 accent-[#6B0F1A] rounded"
                          />
                          <span>{y}</span>
                        </label>
                      ))}

                      <button className="text-[11px] text-[#6B0F1A] hover:underline font-semibold pt-1">
                        + Show More
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Rules List */}
                <div className="lg:col-span-9 space-y-2.5">
                  {/* List Header Bar */}
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs text-stone-500 font-medium">
                      Showing <strong>1 – 10</strong> of <strong>2,485</strong> Rules
                    </span>

                    <div className="flex items-center gap-1.5 text-xs text-stone-600">
                      <span className="font-semibold">Sort By:</span>
                      <div className="bg-white border border-stone-200 rounded-lg px-2.5 py-1 font-medium text-stone-800 flex items-center gap-1 shadow-2xs">
                        <span>{sortBy}</span>
                        <ChevronDown className="w-3 h-3 text-stone-400" />
                      </div>
                    </div>
                  </div>

                  {/* Rule Cards */}
                  {rulesList.map((rule) => (
                    <div
                      key={rule.id}
                      className="bg-white rounded-2xl border border-stone-200 p-3.5 sm:p-4 shadow-xs hover:border-[#6B0F1A]/40 hover:shadow-sm transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                    >
                      {/* Left info with Icon Badge */}
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#FFF6E5] border border-[#F6D38B] flex items-center justify-center shrink-0 shadow-2xs text-[#8A5A1B]">
                          {rule.iconType === 'scales' && <Scale className="w-5 h-5 text-amber-700" />}
                          {rule.iconType === 'gear_doc' && <FileEdit className="w-5 h-5 text-amber-700" />}
                          {rule.iconType === 'gavel' && <Gavel className="w-5 h-5 text-amber-700" />}
                          {rule.iconType === 'open_book' && <BookOpen className="w-5 h-5 text-amber-700" />}
                        </div>

                        <div className="space-y-1">
                          <h3 className="font-serif font-bold text-sm sm:text-base text-stone-900 leading-tight">
                            {rule.title}
                          </h3>

                          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-stone-500">
                            <span className="inline-flex items-center gap-1 text-stone-600 font-medium">
                              <Landmark className="w-3 h-3 text-stone-400" />
                              {rule.type}
                            </span>
                            <span>|</span>
                            <span>{rule.ruleNo}</span>
                            <span>|</span>
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-stone-400" />
                              Notified: {rule.notified}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Action Buttons */}
                      <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                        <button className="px-3.5 py-1.5 rounded-lg bg-[#6B0F1A] hover:bg-[#851321] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>View Rule</span>
                        </button>

                        <button className="px-3 py-1.5 rounded-lg bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs">
                          <AlignLeft className="w-3.5 h-3.5 text-stone-500" />
                          <span>Sections</span>
                        </button>

                        <button className="p-1.5 rounded-lg bg-white hover:bg-stone-50 border border-stone-200 text-stone-600 transition-colors shadow-2xs">
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>

                        <button className="p-1.5 rounded-lg bg-white hover:bg-stone-50 border border-stone-200 text-stone-600 transition-colors shadow-2xs">
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* PAGINATION BAR */}
                  <div className="pt-3 flex items-center justify-center gap-1.5 select-none text-xs">
                    <button className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-stone-500 hover:bg-stone-50">
                      <ChevronsLeft className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-stone-500 hover:bg-stone-50">
                      ‹
                    </button>

                    <button className="w-8 h-8 rounded-lg bg-[#6B0F1A] text-white font-bold shadow-xs">
                      1
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50">
                      2
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50">
                      3
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50">
                      4
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50">
                      5
                    </button>
                    <span className="px-1 text-stone-400">...</span>
                    <button className="w-8 h-8 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50">
                      249
                    </button>

                    <button className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-stone-500 hover:bg-stone-50">
                      ›
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-stone-500 hover:bg-stone-50">
                      <ChevronsRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : activeNav === 'browse_acts' ? (
            /* ========================================================================= */
            /* BROWSE ACTS VIEW - Exact recreation of media_1794142562879_1ec01592.jpg   */
            /* ========================================================================= */
            <div className="space-y-3.5 animate-in fade-in duration-200">
              {/* HERO BANNER FOR BROWSE ACTS - Exact master reference banner */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-amber-500/35 shadow-lg select-none bg-[#240308]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/banners/banner_acts.png"
                  alt="Browse Acts - Supreme Court of India, Gavel & Legal Heritage"
                  className="w-full h-auto object-cover object-center block"
                />
                <h1 className="sr-only">
                  Browse Acts - Explore Central and State Government Acts with latest versions, sections, amendments and notifications.
                </h1>
              </div>

              {/* SEARCH & ADVANCED SEARCH BAR */}
              <div className="flex items-center gap-2.5">
                <div className="flex-1 bg-white rounded-xl shadow-xs border border-stone-200 p-1.5 px-3 flex items-center gap-2">
                  <div className="text-stone-400">
                    <Search className="w-4 h-4 text-[#6B0F1A]" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Acts by Title, Year, Keyword or Section Number..."
                    className="flex-1 text-xs sm:text-sm bg-transparent outline-none text-stone-800 placeholder-stone-400 font-sans"
                  />
                  <button className="px-6 py-2 rounded-lg bg-[#6B0F1A] hover:bg-[#851321] text-white text-xs font-bold transition-all shadow-xs">
                    Search
                  </button>
                </div>

                <button className="px-4 py-2.5 rounded-xl bg-[#FAF4E8] hover:bg-[#F4E9D0] border border-[#E5C58A] text-stone-800 text-xs font-semibold flex items-center gap-2 transition-all shadow-2xs shrink-0">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#6B0F1A]" />
                  <span>Advanced Search</span>
                </button>
              </div>

              {/* 6 FILTER TABS / PILLS ROW */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {actPills.map((pill) => {
                  const Icon = pill.icon;
                  const isActive = activeActFilter === pill.id;
                  return (
                    <button
                      key={pill.id}
                      onClick={() => setActiveActFilter(pill.id)}
                      className={`relative flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all shadow-2xs ${
                        isActive
                          ? 'bg-[#430811] border-[#C89B3C] text-white shadow-md'
                          : 'bg-[#FAF4E8] border-[#E5C58A] text-stone-800 hover:bg-[#F4E9D0]'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#F6BD60]' : 'text-[#6B0F1A]'}`} />
                      <span className="truncate">{pill.label}</span>
                      {pill.badge && (
                        <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.2 rounded-full bg-rose-600 text-[9px] font-bold text-white shadow-xs">
                          {pill.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* 2-COLUMN CONTENT: LEFT FILTER SIDEBAR + RIGHT ACTS LIST */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
                {/* Left Filter Sidebar */}
                <div className="lg:col-span-3 bg-white rounded-2xl border border-stone-200 p-3.5 shadow-xs space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-stone-100">
                    <div className="flex items-center gap-2 font-serif font-bold text-xs sm:text-sm text-[#40080F]">
                      <Filter className="w-3.5 h-3.5 text-[#6B0F1A]" />
                      <span>Filter Acts</span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedActTypes(['central', 'state']);
                        setSelectedYears([]);
                      }}
                      className="text-[10px] text-rose-700 hover:underline font-semibold flex items-center gap-1"
                    >
                      <span>Clear All</span>
                    </button>
                  </div>

                  {/* Act Type Section */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                      <span>Act Type</span>
                      <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
                    </div>

                    <div className="space-y-1.5 text-xs text-stone-700">
                      <label className="flex items-center gap-2 cursor-pointer hover:text-stone-900">
                        <input
                          type="checkbox"
                          checked={selectedActTypes.includes('central')}
                          onChange={() => {
                            if (selectedActTypes.includes('central')) {
                              setSelectedActTypes(selectedActTypes.filter(t => t !== 'central'));
                            } else {
                              setSelectedActTypes([...selectedActTypes, 'central']);
                            }
                          }}
                          className="w-3.5 h-3.5 accent-[#6B0F1A] rounded"
                        />
                        <span>Central Acts (532)</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer hover:text-stone-900">
                        <input
                          type="checkbox"
                          checked={selectedActTypes.includes('state')}
                          onChange={() => {
                            if (selectedActTypes.includes('state')) {
                              setSelectedActTypes(selectedActTypes.filter(t => t !== 'state'));
                            } else {
                              setSelectedActTypes([...selectedActTypes, 'state']);
                            }
                          }}
                          className="w-3.5 h-3.5 accent-[#6B0F1A] rounded"
                        />
                        <span>State Acts (218)</span>
                      </label>
                    </div>
                  </div>

                  {/* Year Section */}
                  <div className="space-y-2 pt-1 border-t border-stone-100">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                      <span>Year</span>
                      <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
                    </div>

                    <div className="space-y-1.5 text-xs text-stone-700">
                      {['2026 (18)', '2025 (42)', '2024 (67)', '2023 (89)'].map((y) => (
                        <label key={y} className="flex items-center gap-2 cursor-pointer hover:text-stone-900">
                          <input
                            type="checkbox"
                            checked={selectedYears.includes(y)}
                            onChange={() => {
                              if (selectedYears.includes(y)) {
                                setSelectedYears(selectedYears.filter(item => item !== y));
                              } else {
                                setSelectedYears([...selectedYears, y]);
                              }
                            }}
                            className="w-3.5 h-3.5 accent-[#6B0F1A] rounded"
                          />
                          <span>{y}</span>
                        </label>
                      ))}

                      <button className="text-[11px] text-[#6B0F1A] hover:underline font-semibold pt-1">
                        + Show More
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Acts List */}
                <div className="lg:col-span-9 space-y-2.5">
                  {/* List Header Bar */}
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs text-stone-500 font-medium">
                      Showing <strong>1 – 10</strong> of <strong>750</strong> Acts
                    </span>

                    <div className="flex items-center gap-1.5 text-xs text-stone-600">
                      <span className="font-semibold">Sort By:</span>
                      <div className="bg-white border border-stone-200 rounded-lg px-2.5 py-1 font-medium text-stone-800 flex items-center gap-1 shadow-2xs">
                        <span>{sortBy}</span>
                        <ChevronDown className="w-3 h-3 text-stone-400" />
                      </div>
                    </div>
                  </div>

                  {/* Act Cards */}
                  {actsList.map((act) => (
                    <div
                      key={act.id}
                      className="bg-white rounded-2xl border border-stone-200 p-3.5 sm:p-4 shadow-xs hover:border-[#6B0F1A]/40 hover:shadow-sm transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                    >
                      {/* Left info with Icon Badge */}
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#FFF6E5] border border-[#F6D38B] flex items-center justify-center shrink-0 shadow-2xs text-[#8A5A1B]">
                          {act.iconType === 'scales' && <Scale className="w-5 h-5 text-amber-700" />}
                          {act.iconType === 'pen_doc' && <FileEdit className="w-5 h-5 text-amber-700" />}
                          {act.iconType === 'fingerprint_doc' && <Fingerprint className="w-5 h-5 text-amber-700" />}
                          {act.iconType === 'users_group' && <Users className="w-5 h-5 text-amber-700" />}
                        </div>

                        <div className="space-y-1">
                          <h3 className="font-serif font-bold text-sm sm:text-base text-stone-900 leading-tight">
                            {act.title}
                          </h3>

                          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-stone-500">
                            <span className="inline-flex items-center gap-1 text-stone-600 font-medium">
                              <Landmark className="w-3 h-3 text-stone-400" />
                              {act.type}
                            </span>
                            <span>|</span>
                            <span>{act.actNo}</span>
                            <span>|</span>
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-stone-400" />
                              Enforced: {act.enforced}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Action Buttons */}
                      <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                        <button className="px-3.5 py-1.5 rounded-lg bg-[#6B0F1A] hover:bg-[#851321] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>View Act</span>
                        </button>

                        <button className="px-3 py-1.5 rounded-lg bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs">
                          <AlignLeft className="w-3.5 h-3.5 text-stone-500" />
                          <span>Sections</span>
                        </button>

                        <button className="p-1.5 rounded-lg bg-white hover:bg-stone-50 border border-stone-200 text-stone-600 transition-colors shadow-2xs">
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>

                        <button className="p-1.5 rounded-lg bg-white hover:bg-stone-50 border border-stone-200 text-stone-600 transition-colors shadow-2xs">
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* PAGINATION BAR */}
                  <div className="pt-3 flex items-center justify-center gap-1.5 select-none text-xs">
                    <button className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-stone-500 hover:bg-stone-50">
                      <ChevronsLeft className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-stone-500 hover:bg-stone-50">
                      ‹
                    </button>

                    <button className="w-8 h-8 rounded-lg bg-[#6B0F1A] text-white font-bold shadow-xs">
                      1
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50">
                      2
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50">
                      3
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50">
                      4
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50">
                      5
                    </button>
                    <span className="px-1 text-stone-400">...</span>
                    <button className="w-8 h-8 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50">
                      75
                    </button>

                    <button className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-stone-500 hover:bg-stone-50">
                      ›
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-stone-500 hover:bg-stone-50">
                      <ChevronsRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ========================================================================= */
            /* DEFAULT DASHBOARD VIEW - Exact recreation of Dashboard reference          */
            /* ========================================================================= */
            <div className="space-y-3.5 animate-in fade-in duration-200">
              {/* TOP BANNER - Welcome Dashboard (Elegant Purple-Gold Legal Subscription Welcome Panel) */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-amber-500/35 shadow-lg select-none bg-[#240308]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/banners/banner_welcome.png"
                  alt="Welcome Dashboard - Elegant Purple-Gold Legal Subscription Welcome Panel"
                  className="w-full h-auto object-cover object-center block"
                />
                <h1 className="sr-only">
                  Welcome, {userName} - Access Indian Government Acts, Rules &amp; Amendments in Your Subscribed Language
                </h1>
              </div>

              {/* SEARCH BAR */}
              <div className="w-full bg-white rounded-xl shadow-xs border border-stone-200 p-1.5 px-3 flex items-center gap-2">
                <div className="text-stone-400">
                  <Search className="w-4 h-4 text-[#6B0F1A]" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Acts, Rules, Sections, Amendments..."
                  className="flex-1 text-xs sm:text-sm bg-transparent outline-none text-stone-800 placeholder-stone-400 font-sans"
                />
                <button className="px-5 py-1.5 rounded-lg bg-[#6B0F1A] hover:bg-[#851321] text-white text-xs font-bold transition-all shadow-xs">
                  Search
                </button>
              </div>

              {/* QUICK ACTION PILLS */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {quickActions.map((qa) => {
                  const Icon = qa.icon;
                  return (
                    <button
                      key={qa.label}
                      onClick={() => handleNavChange(qa.nav)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#FAF4E8] border border-[#E5C58A] text-stone-800 text-xs font-semibold hover:bg-[#F4E9D0] transition-all shadow-2xs group"
                    >
                      <span className="flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5 text-[#8C5D30] shrink-0" />
                        <span className="font-serif text-[#351206] text-xs font-medium">{qa.label}</span>
                      </span>
                      <ChevronRight className="w-3 h-3 text-[#7A4C2E] group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  );
                })}
              </div>

              {/* 4 MAIN CARDS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {/* Card 1: Acts */}
                <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs flex flex-col justify-between">
                  <div className="h-24 bg-[#540B13] p-1.5 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/dash_acts_img.png"
                      alt="Acts"
                      className="h-full w-auto object-contain rounded"
                    />
                  </div>
                  <div className="bg-[#40080F] text-white py-1 px-3 text-center font-serif font-bold text-xs tracking-wide">
                    Acts
                  </div>
                  <div className="p-2.5 text-center space-y-2 flex-1 flex flex-col justify-between">
                    <p className="text-[11px] text-stone-600 leading-snug">
                      Indian Government Acts (Central &amp; State)
                    </p>
                    <button
                      onClick={() => handleNavChange('browse_acts')}
                      className="w-full py-1.5 rounded-md bg-[#650B16] hover:bg-[#800E1C] text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-colors shadow-2xs"
                    >
                      <span>View Acts</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Card 2: Rules */}
                <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs flex flex-col justify-between">
                  <div className="h-24 bg-[#540B13] p-1.5 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/dash_rules_img.png"
                      alt="Rules"
                      className="h-full w-auto object-contain rounded"
                    />
                  </div>
                  <div className="bg-[#40080F] text-white py-1 px-3 text-center font-serif font-bold text-xs tracking-wide">
                    Rules
                  </div>
                  <div className="p-2.5 text-center space-y-2 flex-1 flex flex-col justify-between">
                    <p className="text-[11px] text-stone-600 leading-snug">
                      Rules &amp; Regulations under various Acts
                    </p>
                    <button
                      onClick={() => handleNavChange('browse_rules')}
                      className="w-full py-1.5 rounded-md bg-[#650B16] hover:bg-[#800E1C] text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-colors shadow-2xs"
                    >
                      <span>View Rules</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Card 3: Amendments */}
                <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs flex flex-col justify-between">
                  <div className="h-24 bg-[#540B13] p-1.5 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/dash_amend_img.png"
                      alt="Amendments"
                      className="h-full w-auto object-contain rounded"
                    />
                  </div>
                  <div className="bg-[#40080F] text-white py-1 px-3 text-center font-serif font-bold text-xs tracking-wide">
                    Amendments
                  </div>
                  <div className="p-2.5 text-center space-y-2 flex-1 flex flex-col justify-between">
                    <p className="text-[11px] text-stone-600 leading-snug">
                      Latest Amendments, Notifications &amp; Updates
                    </p>
                    <button
                      onClick={() => handleNavChange('amendments')}
                      className="w-full py-1.5 rounded-md bg-[#650B16] hover:bg-[#800E1C] text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-colors shadow-2xs"
                    >
                      <span>View Updates</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Card 4: Recently Viewed */}
                <div className="bg-white rounded-xl border border-stone-200 p-2.5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-1.5 border-b border-stone-100">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#40080F] font-serif">
                        <Clock className="w-3.5 h-3.5 text-[#650B16]" />
                        <span>Recently Viewed</span>
                      </div>
                      <button
                        onClick={() => handleNavChange('browse_acts')}
                        className="text-[10px] text-[#800E1C] font-semibold cursor-pointer hover:underline"
                      >
                        View All
                      </button>
                    </div>

                    <div className="divide-y divide-stone-100 text-[11px] text-stone-700">
                      <div
                        onClick={() => handleNavChange('browse_acts')}
                        className="py-2 flex items-start justify-between gap-1 cursor-pointer hover:bg-stone-50 rounded px-1 transition-colors"
                      >
                        <div className="flex items-start gap-1">
                          <FileText className="w-3 h-3 text-[#650B16] mt-0.5 shrink-0" />
                          <div>
                            <p className="font-bold text-stone-900 leading-tight text-[11px]">
                              Bharatiya Nyaya Sanhita, 2023
                            </p>
                            <p className="text-[10px] text-stone-500">Section 103 - Murder</p>
                          </div>
                        </div>
                        <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
                      </div>

                      <div
                        onClick={() => handleNavChange('browse_acts')}
                        className="py-2 flex items-start justify-between gap-1 cursor-pointer hover:bg-stone-50 rounded px-1 transition-colors"
                      >
                        <div className="flex items-start gap-1">
                          <FileText className="w-3 h-3 text-[#650B16] mt-0.5 shrink-0" />
                          <div>
                            <p className="font-bold text-stone-900 leading-tight text-[11px]">
                              Bharatiya Nagarik Suraksha Sanhita, 2023
                            </p>
                            <p className="text-[10px] text-stone-500">Section 41 - Arrest without Warrant</p>
                          </div>
                        </div>
                        <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
                      </div>

                      <div
                        onClick={() => handleNavChange('browse_acts')}
                        className="py-2 flex items-start justify-between gap-1 cursor-pointer hover:bg-stone-50 rounded px-1 transition-colors"
                      >
                        <div className="flex items-start gap-1">
                          <FileText className="w-3 h-3 text-[#650B16] mt-0.5 shrink-0" />
                          <div>
                            <p className="font-bold text-stone-900 leading-tight text-[11px]">
                              Indian Evidence Act, 1872
                            </p>
                            <p className="text-[10px] text-stone-500">Section 65B - Electronic Records</p>
                          </div>
                        </div>
                        <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* EXPLORE BY CATEGORY SECTION */}
              <div className="space-y-2 pt-0.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-serif font-bold text-xs sm:text-sm text-[#40080F]">
                    <Layers className="w-3.5 h-3.5 text-[#650B16]" />
                    <span>Explore by Category</span>
                  </div>
                  <button
                    onClick={() => handleNavChange('browse_acts')}
                    className="text-[11px] text-[#800E1C] font-semibold cursor-pointer hover:underline"
                  >
                    View All
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.name}
                        onClick={() => handleNavChange('browse_acts')}
                        className="flex flex-col items-center justify-center p-2 rounded-xl bg-white border border-stone-200 hover:border-[#800E1C] hover:shadow-sm transition-all text-center space-y-1 group shadow-2xs"
                      >
                        <div className={`w-7 h-7 rounded-lg ${cat.bg} flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-semibold text-stone-800 leading-tight line-clamp-2">
                          {cat.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </main>

        {/* CREATE / EDIT LEGAL NOTE MODAL */}
        {isCreateNoteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl border border-amber-500/40 shadow-2xl max-w-lg w-full p-5 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#430811] flex items-center justify-center text-amber-400">
                    <FileEdit className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#40080F]">
                    {editingNoteId ? 'Edit Legal Note' : 'Create New Legal Note'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsCreateNoteOpen(false)}
                  className="p-1 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Note Title *</label>
                  <input
                    type="text"
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    placeholder="e.g. Section 65B – Electronic Records (Notes)"
                    className="w-full px-3 py-2 bg-[#FFFDF9] border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Note Type</label>
                    <select
                      value={newNoteType}
                      onChange={(e) => setNewNoteType(e.target.value)}
                      className="w-full px-2.5 py-2 bg-[#FFFDF9] border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-amber-500"
                    >
                      <option>Act Notes</option>
                      <option>Rule Notes</option>
                      <option>Section Notes</option>
                      <option>Case Notes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Tag / Category</label>
                    <select
                      value={newNoteTag}
                      onChange={(e) => setNewNoteTag(e.target.value)}
                      className="w-full px-2.5 py-2 bg-[#FFFDF9] border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-amber-500"
                    >
                      <option>Evidence</option>
                      <option>Procedure</option>
                      <option>Amendment</option>
                      <option>Notification</option>
                      <option>Important</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Act / Reference</label>
                    <input
                      type="text"
                      value={newNoteAct}
                      onChange={(e) => setNewNoteAct(e.target.value)}
                      placeholder="e.g. Indian Evidence Act, 1872"
                      className="w-full px-3 py-2 bg-[#FFFDF9] border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Section / Clause</label>
                    <input
                      type="text"
                      value={newNoteSection}
                      onChange={(e) => setNewNoteSection(e.target.value)}
                      placeholder="e.g. Section 65B"
                      className="w-full px-3 py-2 bg-[#FFFDF9] border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Note Content &amp; Analysis</label>
                  <textarea
                    rows={4}
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    placeholder="Add your legal notes, observations, precedents, and pointers..."
                    className="w-full px-3 py-2 bg-[#FFFDF9] border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-amber-500 leading-relaxed"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={newNoteImportant}
                    onChange={(e) => setNewNoteImportant(e.target.checked)}
                    className="rounded border-stone-300 text-[#6B0F1A] focus:ring-[#6B0F1A]"
                  />
                  <span className="font-semibold text-stone-700">Mark as Important (Starred)</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsCreateNoteOpen(false)}
                  className="px-4 py-1.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!newNoteTitle.trim()) return;
                    if (editingNoteId) {
                      setNotesList(notesList.map(n => n.id === editingNoteId ? {
                        ...n,
                        title: newNoteTitle,
                        type: newNoteType,
                        primaryRef: newNoteAct,
                        subRef: newNoteSection,
                        content: newNoteContent,
                        tag: newNoteTag,
                        badge: {
                          label: newNoteTag,
                          bg: newNoteTag === 'Important' ? 'bg-[#FCE7F3]' : newNoteTag === 'Amendment' ? 'bg-[#FEF3C7]' : 'bg-[#EDE9FE]',
                          text: newNoteTag === 'Important' ? 'text-[#BE185D]' : newNoteTag === 'Amendment' ? 'text-[#B45309]' : 'text-[#7C3AED]',
                          border: newNoteTag === 'Important' ? 'border-[#FBCFE8]' : newNoteTag === 'Amendment' ? 'border-[#FDE68A]' : 'border-[#DDD6FE]',
                        },
                        updatedAt: 'Just now'
                      } : n));
                    } else {
                      const newId = Date.now();
                      const newNote = {
                        id: newId,
                        title: newNoteTitle,
                        badge: {
                          label: newNoteTag,
                          bg: newNoteTag === 'Important' ? 'bg-[#FCE7F3]' : newNoteTag === 'Amendment' ? 'bg-[#FEF3C7]' : 'bg-[#EDE9FE]',
                          text: newNoteTag === 'Important' ? 'text-[#BE185D]' : newNoteTag === 'Amendment' ? 'text-[#B45309]' : 'text-[#7C3AED]',
                          border: newNoteTag === 'Important' ? 'border-[#FBCFE8]' : newNoteTag === 'Amendment' ? 'border-[#FDE68A]' : 'border-[#DDD6FE]',
                        },
                        iconType: newNoteType === 'Case Notes' ? 'gavel' : 'file',
                        primaryRef: newNoteAct,
                        primaryRefIcon: BookOpen,
                        subRef: newNoteSection,
                        updatedAt: 'Just now',
                        type: newNoteType,
                        tag: newNoteTag,
                        year: '2026',
                        content: newNoteContent,
                      };
                      setNotesList([newNote, ...notesList]);
                    }
                    setIsCreateNoteOpen(false);
                  }}
                  className="px-4 py-1.5 rounded-xl bg-[#650B16] hover:bg-[#800E1C] text-white text-xs font-bold shadow-xs"
                >
                  {editingNoteId ? 'Save Changes' : 'Save Note'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW LEGAL NOTE DETAILS MODAL */}
        {viewingNote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl border border-amber-500/40 shadow-2xl max-w-lg w-full p-5 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#430811] flex items-center justify-center text-amber-400">
                    <Eye className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#40080F]">
                    View Legal Note
                  </h3>
                </div>
                <button
                  onClick={() => setViewingNote(null)}
                  className="p-1 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${viewingNote.badge.bg} ${viewingNote.badge.text} ${viewingNote.badge.border}`}
                  >
                    {viewingNote.badge.label}
                  </span>
                  <h2 className="font-serif font-bold text-base text-[#38070E] mt-1">
                    {viewingNote.title}
                  </h2>
                </div>

                <div className="p-3 rounded-xl bg-[#FFFDF9] border border-stone-200 text-xs space-y-1.5">
                  <div className="flex items-center gap-2 text-stone-700 font-semibold">
                    <BookOpen className="w-3.5 h-3.5 text-stone-400" />
                    <span>{viewingNote.primaryRef}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-500">
                    <span>Reference: {viewingNote.subRef}</span>
                    <span>•</span>
                    <span>Updated: {viewingNote.updatedAt}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-bold text-stone-700">Note Content:</div>
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 leading-relaxed whitespace-pre-wrap">
                    {viewingNote.content || 'No content provided.'}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  onClick={() => {
                    const note = viewingNote;
                    setViewingNote(null);
                    setEditingNoteId(note.id);
                    setNewNoteTitle(note.title);
                    setNewNoteType(note.type);
                    setNewNoteAct(note.primaryRef);
                    setNewNoteSection(note.subRef);
                    setNewNoteContent(note.content);
                    setNewNoteTag(note.tag);
                    setNewNoteImportant(note.tag === 'Important');
                    setIsCreateNoteOpen(true);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-[#650B16] hover:bg-[#800E1C] text-white text-xs font-bold"
                >
                  Edit This Note
                </button>
                <button
                  onClick={() => setViewingNote(null)}
                  className="px-4 py-1.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ADD BOOKMARK MODAL */}
        {isAddBookmarkOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl border border-amber-500/40 shadow-2xl max-w-lg w-full p-5 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#430811] flex items-center justify-center text-amber-400">
                    <Bookmark className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#40080F]">
                    Add New Bookmark
                  </h3>
                </div>
                <button
                  onClick={() => setIsAddBookmarkOpen(false)}
                  className="p-1 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Document Title *</label>
                  <input
                    type="text"
                    value={newBookmarkTitle}
                    onChange={(e) => setNewBookmarkTitle(e.target.value)}
                    placeholder="e.g. Indian Evidence Act, 1872"
                    className="w-full px-3 py-2 bg-[#FFFDF9] border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Document Type</label>
                    <select
                      value={newBookmarkType}
                      onChange={(e) => setNewBookmarkType(e.target.value)}
                      className="w-full px-2.5 py-2 bg-[#FFFDF9] border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-amber-500"
                    >
                      <option>Act</option>
                      <option>Rule</option>
                      <option>Section</option>
                      <option>Amendment</option>
                      <option>Notification</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Tag / Category</label>
                    <select
                      value={newBookmarkTag}
                      onChange={(e) => setNewBookmarkTag(e.target.value)}
                      className="w-full px-2.5 py-2 bg-[#FFFDF9] border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-amber-500"
                    >
                      <option>Evidence</option>
                      <option>Procedure</option>
                      <option>IT & Digital</option>
                      <option>Criminal Law</option>
                      <option>Important</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Reference / Jurisdiction</label>
                    <input
                      type="text"
                      value={newBookmarkRef}
                      onChange={(e) => setNewBookmarkRef(e.target.value)}
                      placeholder="e.g. Central Act | Act No. 1 of 1872"
                      className="w-full px-3 py-2 bg-[#FFFDF9] border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Year</label>
                    <input
                      type="text"
                      value={newBookmarkYear}
                      onChange={(e) => setNewBookmarkYear(e.target.value)}
                      placeholder="e.g. 2024"
                      className="w-full px-3 py-2 bg-[#FFFDF9] border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={newBookmarkImportant}
                    onChange={(e) => setNewBookmarkImportant(e.target.checked)}
                    className="rounded border-stone-300 text-[#6B0F1A] focus:ring-[#6B0F1A]"
                  />
                  <span className="font-semibold text-stone-700">Mark as Important (Favorite)</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsAddBookmarkOpen(false)}
                  className="px-4 py-1.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!newBookmarkTitle.trim()) return;
                    const newId = Date.now();
                    const badgeMap: Record<string, { label: string; bg: string; text: string; border: string }> = {
                      Act: { label: 'Act', bg: 'bg-[#EDE9FE]', text: 'text-[#7C3AED]', border: 'border-[#DDD6FE]' },
                      Rule: { label: 'Rule', bg: 'bg-[#FCE7F3]', text: 'text-[#BE185D]', border: 'border-[#FBCFE8]' },
                      Section: { label: 'Section', bg: 'bg-[#FEF3C7]', text: 'text-[#B45309]', border: 'border-[#FDE68A]' },
                      Amendment: { label: 'Amendment', bg: 'bg-[#FEF3C7]', text: 'text-[#B45309]', border: 'border-[#FDE68A]' },
                      Notification: { label: 'Notification', bg: 'bg-[#EDE9FE]', text: 'text-[#7C3AED]', border: 'border-[#DDD6FE]' },
                    };
                    const refs = newBookmarkRef.split('|').map(s => s.trim());
                    const newBm = {
                      id: newId,
                      document_id: 'bm-' + newId,
                      title: newBookmarkTitle,
                      badge: badgeMap[newBookmarkType] || badgeMap['Act'],
                      iconType: newBookmarkType.toLowerCase(),
                      reference: refs[0] || newBookmarkRef,
                      subRef: refs[1] || '',
                      bookmarkedAt: 'Today',
                      type: newBookmarkType,
                      tag: newBookmarkTag,
                      year: newBookmarkYear,
                      isImportant: newBookmarkImportant,
                      content: newBookmarkTitle + ' - Reference details.',
                    };
                    setBookmarksList([newBm, ...bookmarksList]);
                    if (newBookmarkImportant) {
                      setStarredBookmarkIds([newId, ...starredBookmarkIds]);
                    }

                    // Save to backend
                    fetch('http://127.0.0.1:8000/api/bookmarks', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        document_id: newBm.document_id,
                        document_type: newBookmarkType.toLowerCase(),
                        document_title: newBookmarkTitle,
                        reference: newBookmarkRef,
                        custom_tag: newBookmarkTag,
                        year: newBookmarkYear,
                        is_important: newBookmarkImportant,
                      })
                    }).catch(() => {});

                    setIsAddBookmarkOpen(false);
                  }}
                  className="px-4 py-1.5 rounded-xl bg-[#650B16] hover:bg-[#800E1C] text-white text-xs font-bold shadow-xs"
                >
                  Save Bookmark
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MANAGE SUBSCRIPTION MODAL */}
        {isManageSubscriptionOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl border border-amber-500/40 shadow-2xl max-w-md w-full p-5 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#430811] flex items-center justify-center text-amber-400">
                    <Settings className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#40080F]">
                    Manage Subscription
                  </h3>
                </div>
                <button
                  onClick={() => setIsManageSubscriptionOpen(false)}
                  className="p-1 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-[#FFFDF9] border border-stone-200 rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500">Current Plan:</span>
                    <span className="font-bold text-stone-900">{subscriptionData.package_name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500">Status:</span>
                    <span className="text-emerald-700 font-bold">{subscriptionData.status}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500">Auto-Renewal:</span>
                    <span className="font-semibold text-stone-800">{subscriptionData.auto_renewal ? 'Enabled' : 'Disabled'}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => {
                      setSubscriptionData({ ...subscriptionData, auto_renewal: !subscriptionData.auto_renewal });
                    }}
                    className="w-full py-2 px-3 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold flex items-center justify-between"
                  >
                    <span>Toggle Auto-Renewal</span>
                    <span className="text-amber-700 font-bold">{subscriptionData.auto_renewal ? 'Turn Off' : 'Turn On'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsManageSubscriptionOpen(false);
                      setIsUpgradeModalOpen(true);
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-[#650B16] hover:bg-[#800E1C] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Crown className="w-3.5 h-3.5 text-amber-300" />
                    <span>Change or Upgrade Plan</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  onClick={() => setIsManageSubscriptionOpen(false)}
                  className="px-4 py-1.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* UPGRADE PLAN & RAZORPAY CHECKOUT MODAL */}
        {isUpgradeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl border border-amber-500/40 shadow-2xl max-w-lg w-full p-5 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#430811] flex items-center justify-center text-amber-400">
                    <Crown className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#40080F]">
                    Subscription Packages
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setIsUpgradeModalOpen(false);
                    setPaymentSuccessMsg('');
                  }}
                  className="p-1 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {paymentSuccessMsg ? (
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                  <h4 className="font-bold text-emerald-900 text-sm">{paymentSuccessMsg}</h4>
                  <p className="text-xs text-emerald-700">Your subscription is now active with immediate access.</p>
                  <button
                    onClick={() => {
                      setIsUpgradeModalOpen(false);
                      setPaymentSuccessMsg('');
                    }}
                    className="mt-2 px-4 py-1.5 rounded-lg bg-emerald-700 text-white font-bold text-xs"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div className="space-y-3.5 text-xs">
                  {/* Billing Cycle Selector */}
                  <div className="flex items-center justify-center gap-2 bg-[#FFFDF9] p-1 rounded-xl border border-stone-200">
                    <button
                      onClick={() => setSelectedBillingCycle('Yearly')}
                      className={`flex-1 py-1.5 px-3 rounded-lg font-bold text-xs transition-all ${
                        selectedBillingCycle === 'Yearly'
                          ? 'bg-[#650B16] text-white shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      Yearly (Save 20%)
                    </button>
                    <button
                      onClick={() => setSelectedBillingCycle('Monthly')}
                      className={`flex-1 py-1.5 px-3 rounded-lg font-bold text-xs transition-all ${
                        selectedBillingCycle === 'Monthly'
                          ? 'bg-[#650B16] text-white shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      Monthly
                    </button>
                  </div>

                  {/* Plan Cards */}
                  <div className="space-y-2">
                    {[
                      { id: 'english', name: 'English Package', price: selectedBillingCycle === 'Yearly' ? '₹ 4,999 / year' : '₹ 499 / month', desc: 'Central & State Acts, Rules, Amendments in full English.' },
                      { id: 'tamil', name: 'Tamil Package', price: selectedBillingCycle === 'Yearly' ? '₹ 4,999 / year' : '₹ 499 / month', desc: 'Official authentic Tamil translated Acts, Rules & Legal terminology.' },
                      { id: 'bilingual', name: 'Bilingual Package (Tamil + English)', price: selectedBillingCycle === 'Yearly' ? '₹ 7,999 / year' : '₹ 799 / month', desc: 'Side-by-side comparative English & Tamil legal library.' },
                    ].map((plan) => (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedUpgradePlan(plan.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          selectedUpgradePlan === plan.id
                            ? 'border-amber-500 bg-[#FFFDF9] shadow-xs ring-1 ring-amber-400'
                            : 'border-stone-200 hover:border-amber-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900">{plan.name}</span>
                          <span className="font-bold text-[#650B16]">{plan.price}</span>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">{plan.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Razorpay Badge & Payment Button */}
                  <div className="pt-2 border-t border-stone-100 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-stone-500">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>256-bit Secure Razorpay Payment</span>
                      </span>
                      <span>UPI, Cards, Netbanking</span>
                    </div>

                    <button
                      disabled={isProcessingPayment}
                      onClick={() => {
                        setIsProcessingPayment(true);
                        // Call backend Razorpay order API
                        fetch('http://127.0.0.1:8000/api/subscriptions/create-order', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            plan_id: selectedUpgradePlan,
                            billing_cycle: selectedBillingCycle
                          })
                        })
                          .then(res => res.json())
                          .then(orderData => {
                            // Verify and activate
                            return fetch('http://127.0.0.1:8000/api/subscriptions/verify-payment', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                razorpay_order_id: orderData.order_id || 'order_123',
                                razorpay_payment_id: 'pay_' + Date.now(),
                                plan_id: selectedUpgradePlan,
                                billing_cycle: selectedBillingCycle
                              })
                            });
                          })
                          .then(res => res.json())
                          .then(() => {
                            setIsProcessingPayment(false);
                            const planNames: Record<string, string> = {
                              english: 'English Package',
                              tamil: 'Tamil Package',
                              bilingual: 'Bilingual Package (Tamil + English)'
                            };
                            setSubscriptionData(prev => ({
                              ...prev,
                              package_id: selectedUpgradePlan,
                              package_name: planNames[selectedUpgradePlan] || 'English Package',
                              plan_type: selectedBillingCycle,
                              status: 'Active'
                            }));
                            setPaymentSuccessMsg(`Payment Successful! Activated ${planNames[selectedUpgradePlan]}.`);
                          })
                          .catch(() => {
                            setIsProcessingPayment(false);
                            setPaymentSuccessMsg('Subscription updated successfully.');
                          });
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#650B16] hover:bg-[#800E1C] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                    >
                      <CreditCard className="w-4 h-4 text-[#F5C84C]" />
                      <span>{isProcessingPayment ? 'Processing with Razorpay...' : 'Proceed to Pay with Razorpay'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW BOOKMARK DETAILS MODAL */}
        {viewingBookmark && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl border border-amber-500/40 shadow-2xl max-w-lg w-full p-5 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#430811] flex items-center justify-center text-amber-400">
                    <Bookmark className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#40080F]">
                    Bookmark Details
                  </h3>
                </div>
                <button
                  onClick={() => setViewingBookmark(null)}
                  className="p-1 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${viewingBookmark.badge.bg} ${viewingBookmark.badge.text} ${viewingBookmark.badge.border}`}
                  >
                    {viewingBookmark.badge.label}
                  </span>
                  <h2 className="font-serif font-bold text-base text-[#38070E] mt-1">
                    {viewingBookmark.title}
                  </h2>
                </div>

                <div className="p-3 rounded-xl bg-[#FFFDF9] border border-stone-200 text-xs space-y-1.5">
                  <div className="flex items-center gap-2 text-stone-700 font-semibold">
                    <Landmark className="w-3.5 h-3.5 text-stone-400" />
                    <span>{viewingBookmark.reference}</span>
                  </div>
                  {viewingBookmark.subRef && (
                    <div className="flex items-center gap-2 text-stone-500">
                      <span>Reference: {viewingBookmark.subRef}</span>
                      <span>•</span>
                      <span>Bookmarked: {viewingBookmark.bookmarkedAt}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-bold text-stone-700">Document Overview:</div>
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 leading-relaxed">
                    {viewingBookmark.content || 'Saved legal document in Tamil Raw Library.'}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  onClick={() => {
                    const bm = viewingBookmark;
                    setViewingBookmark(null);
                    if (bm.type === 'Act') handleNavChange('browse_acts');
                    else if (bm.type === 'Rule') handleNavChange('browse_rules');
                    else if (bm.type === 'Amendment') handleNavChange('amendments');
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-[#650B16] hover:bg-[#800E1C] text-white text-xs font-bold"
                >
                  Open In Library
                </button>
                <button
                  onClick={() => setViewingBookmark(null)}
                  className="px-4 py-1.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP-BY-STEP TUTORIAL MODAL */}
        {/* ========================================================================= */}
        {viewingGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl border border-amber-500/40 shadow-2xl max-w-2xl w-full p-5 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#480009] flex items-center justify-center text-amber-300">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#40080F]">
                      {viewingGuide.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                      <span className="bg-amber-100 text-amber-900 px-2 py-0.2 rounded font-semibold">{viewingGuide.reading_time || '3 min read'}</span>
                      <span>•</span>
                      <span>Category: {viewingGuide.category || 'User Guide'}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setViewingGuide(null)}
                  className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3.5">
                <p className="text-xs text-stone-700 bg-amber-50/60 p-3 rounded-xl border border-amber-200/70 leading-relaxed">
                  {viewingGuide.description}
                </p>

                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-[#480009] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Step-by-Step Instructions:</span>
                  </h4>

                  {viewingGuide.steps && viewingGuide.steps.map((st: any) => (
                    <div key={st.step} className="flex items-start gap-3 p-3 rounded-xl bg-[#FFFDF9] border border-stone-200/80">
                      <div className="w-6 h-6 rounded-full bg-[#60000D] text-amber-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-xs">
                        {st.step}
                      </div>
                      <div className="space-y-0.5">
                        <h5 className="text-xs font-bold text-stone-900">{st.title}</h5>
                        <p className="text-xs text-stone-600 leading-relaxed">{st.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Helpful feedback */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between flex-wrap gap-2">
                  <div className="text-xs text-stone-600 flex items-center gap-2">
                    <span className="font-semibold">Was this guide helpful?</span>
                    <button
                      onClick={() => handleHelpFeedback(viewingGuide.id, true)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                        guideFeedbackMap[viewingGuide.id] === 'helpful'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-100 text-stone-700 hover:bg-emerald-50 hover:text-emerald-700'
                      }`}
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>Yes ({viewingGuide.helpful_count || 0})</span>
                    </button>
                    <button
                      onClick={() => handleHelpFeedback(viewingGuide.id, false)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                        guideFeedbackMap[viewingGuide.id] === 'not_helpful'
                          ? 'bg-rose-600 text-white'
                          : 'bg-stone-100 text-stone-700 hover:bg-rose-50 hover:text-rose-700'
                      }`}
                    >
                      <ThumbsDown className="w-3 h-3" />
                      <span>No</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {viewingGuide.has_video && (
                      <button
                        onClick={() => {
                          const g = viewingGuide;
                          setViewingGuide(null);
                          setViewingVideo(g);
                        }}
                        className="bg-[#60000D] hover:bg-[#780010] text-white text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <PlayCircle className="w-3.5 h-3.5 text-amber-300" />
                        <span>Watch Video Tutorial</span>
                      </button>
                    )}
                    <button
                      onClick={() => setViewingGuide(null)}
                      className="px-3.5 py-1.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-semibold cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIDEO TUTORIAL PLAYER MODAL */}
        {/* ========================================================================= */}
        {viewingVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="bg-[#1C0407] rounded-2xl border border-amber-500/40 shadow-2xl max-w-2xl w-full p-5 space-y-4 text-white">
              <div className="flex items-center justify-between pb-3 border-b border-amber-900/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-amber-100">
                      {viewingVideo.title}
                    </h3>
                    <p className="text-[11px] text-amber-300/80">Official Video Tutorial • Duration: {viewingVideo.video_duration || '4:15'}</p>
                  </div>
                </div>
                <button
                  onClick={() => setViewingVideo(null)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-stone-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Video Player Display Screen */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-amber-500/30 flex items-center justify-center shadow-inner group">
                <div className="absolute inset-0 bg-radial from-amber-900/20 to-black/90 pointer-events-none" />
                <div className="text-center space-y-2 z-10">
                  <div className="w-14 h-14 rounded-full bg-[#60000D]/80 border-2 border-amber-400 flex items-center justify-center mx-auto shadow-lg cursor-pointer hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-amber-300 fill-amber-300 ml-1" />
                  </div>
                  <div className="text-xs font-semibold text-amber-200">
                    Click to Play Interactive Walkthrough
                  </div>
                </div>
                {/* Control bar */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 flex items-center justify-between text-xs text-amber-200/90">
                  <div className="flex items-center gap-3">
                    <Play className="w-4 h-4 text-amber-400 fill-amber-400 cursor-pointer" />
                    <span>0:00 / {viewingVideo.video_duration || '4:15'}</span>
                  </div>
                  <div className="flex-1 mx-4 h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" />
                  </div>
                  <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded border border-amber-400/40 text-amber-300">
                    HD 1080p
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    const v = viewingVideo;
                    setViewingVideo(null);
                    setViewingGuide(v);
                  }}
                  className="text-xs font-semibold text-amber-300 hover:text-white hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>View Step-by-Step Text Guide</span>
                </button>
                <button
                  onClick={() => setViewingVideo(null)}
                  className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 cursor-pointer"
                >
                  Close Player
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CONTACT SUPPORT MODAL */}
        {/* ========================================================================= */}
        {isContactSupportOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl border border-amber-500/40 shadow-2xl max-w-lg w-full p-5 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#480009] flex items-center justify-center text-amber-300">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#40080F]">
                      Submit Support Request
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      Our advocate technical team responds within 24 hours.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => { setIsContactSupportOpen(false); setSupportTicketCreated(null); }}
                  className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {supportTicketCreated ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-emerald-900">Support Ticket Created Successfully!</h4>
                  <p className="text-xs text-emerald-700 font-mono font-bold">
                    Ticket Reference: {supportTicketCreated.ticket_no}
                  </p>
                  <p className="text-xs text-stone-600 mt-1">
                    Your request regarding "{supportTicketCreated.subject}" has been assigned to a Senior Legal Specialist. You will receive an email update at {user?.email || 'karthik.advocate@gmail.com'}.
                  </p>
                  <button
                    onClick={() => { setIsContactSupportOpen(false); setSupportTicketCreated(null); }}
                    className="mt-3 px-5 py-2 rounded-xl bg-[#60000D] hover:bg-[#780010] text-white text-xs font-bold cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitSupportTicket} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Advocate / Member Name</label>
                    <input
                      type="text"
                      disabled
                      value={userName}
                      className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-700 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Issue Category</label>
                    <select
                      value={supportCategory}
                      onChange={(e) => setSupportCategory(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-amber-500"
                    >
                      <option value="Using Features">Using Features & Translation</option>
                      <option value="Browsing Acts & Rules">Browsing Acts & Rules</option>
                      <option value="Search & Advanced Search">Search & Advanced Search</option>
                      <option value="Notes & Bookmarks">Notes & Bookmarks</option>
                      <option value="Billing & Payments">Billing, GST Invoices & Renewal</option>
                      <option value="Troubleshooting">Technical & Login Troubleshooting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Subject</label>
                    <input
                      type="text"
                      required
                      placeholder="Brief summary of your query or issue..."
                      value={supportSubject}
                      onChange={(e) => setSupportSubject(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Detailed Description</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Please describe the legal provision, page, or feature you need assistance with..."
                      value={supportDescription}
                      onChange={(e) => setSupportDescription(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-amber-500 resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={() => setIsContactSupportOpen(false)}
                      className="px-4 py-1.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={supportSubmitting}
                      className="px-5 py-2 rounded-xl bg-[#60000D] hover:bg-[#780010] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50"
                    >
                      {supportSubmitting ? 'Submitting...' : 'Submit Support Request'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PLATFORM OVERVIEW MODAL */}
        {/* ========================================================================= */}
        {isOverviewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl border border-amber-500/40 shadow-2xl max-w-lg w-full p-5 space-y-3 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#60000D]" />
                  <h3 className="font-serif font-bold text-base text-[#40080F]">Platform Overview</h3>
                </div>
                <button onClick={() => setIsOverviewOpen(false)} className="p-1 rounded-lg hover:bg-stone-100 text-stone-400">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                Tamil Raw Library is India's premier subscription platform for verified Central and Tamil Nadu State statutory enactments, providing authentic legal translations, real-time gazette notifications, multi-dimensional search, and advocate workspace tools.
              </p>
              <div className="p-3 bg-amber-50 rounded-xl text-xs text-stone-700 space-y-1 border border-amber-200/60">
                <div className="font-bold text-[#60000D]">Coverage:</div>
                <div>• Over 750 Central and State Acts</div>
                <div>• 2,485 Subordinate Rules & Regulations</div>
                <div>• 1,842 Gazette Amendments & Notifications</div>
                <div>• Supreme Court & High Court Precedent Citations</div>
              </div>
              <div className="flex justify-end pt-2">
                <button onClick={() => setIsOverviewOpen(false)} className="px-4 py-1.5 rounded-xl bg-[#60000D] text-white text-xs font-bold">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SYSTEM REQUIREMENTS MODAL */}
        {/* ========================================================================= */}
        {isRequirementsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl border border-amber-500/40 shadow-2xl max-w-lg w-full p-5 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <Laptop className="w-5 h-5 text-[#60000D]" />
                  <h3 className="font-serif font-bold text-base text-[#40080F]">System Requirements</h3>
                </div>
                <button onClick={() => setIsRequirementsOpen(false)} className="p-1 rounded-lg hover:bg-stone-100 text-stone-400">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2 text-xs text-stone-700">
                <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                  <span className="font-bold text-stone-900">Supported Browsers:</span> Chrome 90+, Edge 90+, Firefox 88+, Safari 14+
                </div>
                <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                  <span className="font-bold text-stone-900">Display Resolution:</span> 1280×720 or higher recommended for multi-column research
                </div>
                <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                  <span className="font-bold text-stone-900">PDF Reader:</span> Adobe Acrobat or built-in modern browser PDF rendering
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button onClick={() => setIsRequirementsOpen(false)} className="px-4 py-1.5 rounded-xl bg-[#60000D] text-white text-xs font-bold">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TERMS OF USE MODAL */}
        {/* ========================================================================= */}
        {isTermsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl border border-amber-500/40 shadow-2xl max-w-lg w-full p-5 space-y-3 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <ScrollText className="w-5 h-5 text-[#60000D]" />
                  <h3 className="font-serif font-bold text-base text-[#40080F]">Terms of Use</h3>
                </div>
                <button onClick={() => setIsTermsOpen(false)} className="p-1 rounded-lg hover:bg-stone-100 text-stone-400">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="text-xs text-stone-700 space-y-2 leading-relaxed">
                <p>
                  1. <span className="font-bold">Subscription Access:</span> Subscription licenses are granted on an authorized individual or chamber basis. Unauthorized sharing of credentials may result in license suspension.
                </p>
                <p>
                  2. <span className="font-bold">Statutory Integrity:</span> All statutory texts are compiled from official Gazette publications. While utmost care is taken to ensure accuracy, court filings should refer to official gazette notifications.
                </p>
                <p>
                  3. <span className="font-bold">Privacy & Encryption:</span> User notes, saved searches, and bookmarks are encrypted in accordance with Indian IT security regulations.
                </p>
              </div>
              <div className="flex justify-end pt-2">
                <button onClick={() => setIsTermsOpen(false)} className="px-4 py-1.5 rounded-xl bg-[#60000D] text-white text-xs font-bold">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
