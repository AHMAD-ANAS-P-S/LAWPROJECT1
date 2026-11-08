from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
import datetime
import json
import random

from ..database import get_db
from ..models import HelpCategory, HelpGuide, HelpFAQ, SupportTicket

router = APIRouter(prefix="/api/help", tags=["Help & How to Use"])

# Pydantic Schemas
class GuideResponse(BaseModel):
    id: int
    title: str = ""
    category_key: str
    description: str
    reading_time: str
    has_video: bool
    video_duration: str
    is_popular: bool
    steps: list = []
    helpful_count: int
    not_helpful_count: int

    class Config:
        from_attributes = True

class SupportTicketCreate(BaseModel):
    subject: str
    category: str
    description: str
    user_name: Optional[str] = "Adv. R. Karthik"
    user_email: Optional[str] = "karthik.advocate@gmail.com"

class SupportTicketResponse(BaseModel):
    id: int
    ticket_no: str
    subject: str
    category: str
    description: str
    status: str
    created_at: datetime.datetime

    class Config:
        from_attributes = True

# Seed Data Initialization helper
def seed_help_data_if_empty(db: Session):
    if db.query(HelpCategory).first():
        return

    categories = [
        {"key": "account_subscription", "title": "Account & Subscription", "icon": "User", "article_count": 8, "order": 1},
        {"key": "browsing_acts_rules", "title": "Browsing Acts & Rules", "icon": "BookOpen", "article_count": 12, "order": 2},
        {"key": "search_advanced", "title": "Search & Advanced Search", "icon": "Search", "article_count": 10, "order": 3},
        {"key": "notes_bookmarks", "title": "Notes & Bookmarks", "icon": "Bookmark", "article_count": 9, "order": 4},
        {"key": "amendments_notifications", "title": "Amendments & Notifications", "icon": "Bell", "article_count": 7, "order": 5},
        {"key": "using_features", "title": "Using Features", "icon": "Star", "article_count": 11, "order": 6},
        {"key": "billing_payments", "title": "Billing & Payments", "icon": "CreditCard", "article_count": 6, "order": 7},
        {"key": "troubleshooting", "title": "Troubleshooting", "icon": "Wrench", "article_count": 8, "order": 8},
    ]

    for cat in categories:
        db.add(HelpCategory(**cat))

    # Seed Popular & Standard Guides
    guides_data = [
        {
            "title": "How to Search Acts, Rules and Sections",
            "category_key": "search_advanced",
            "description": "Learn to use the search and advanced search features effectively.",
            "reading_time": "3 min read",
            "has_video": True,
            "video_duration": "4:15",
            "is_popular": True,
            "helpful_count": 342,
            "not_helpful_count": 5,
            "steps_json": json.dumps([
                {"step": 1, "title": "Open Browse Acts or Search", "desc": "Navigate to Browse Acts or click the top search bar anytime across the platform."},
                {"step": 2, "title": "Enter Legal Keywords or Citations", "desc": "Type Act names (e.g., 'Bharatiya Nyaya Sanhita'), section numbers, or legal topics in the query field."},
                {"step": 3, "title": "Apply Multi-Dimensional Filters", "desc": "Filter by Act Type (Central or State) and Enactment Year (e.g. 2023, 2024, 2026) to refine search matches."},
                {"step": 4, "title": "Instant Results & Relevance Sorting", "desc": "Review live highlighted hits sorted by legal relevance, gazette date, or title alphabetical order."},
                {"step": 5, "title": "Open Document & Section Breakdown", "desc": "Click 'View Act' or 'Sections' to jump directly into the full verified statutory legal provisions."},
                {"step": 6, "title": "Cross-Reference Related Rules", "desc": "Follow hyperlinked cross-references to view statutory rules and amendments framed under each section."}
            ])
        },
        {
            "title": "How to Create and Manage Notes",
            "category_key": "notes_bookmarks",
            "description": "Create, edit, tag and organize your legal notes.",
            "reading_time": "4 min read",
            "has_video": True,
            "video_duration": "3:40",
            "is_popular": True,
            "helpful_count": 289,
            "not_helpful_count": 4,
            "steps_json": json.dumps([
                {"step": 1, "title": "Access My Notes Dashboard", "desc": "Click 'My Notes' from the left burgundy navigation sidebar."},
                {"step": 2, "title": "Click '+ Create Note'", "desc": "Launch the dedicated legal notes authoring modal with category tagging."},
                {"step": 3, "title": "Select Document Type & Section", "desc": "Tag the note under Act, Rule, Section, or Case Pointer with exact citation references."},
                {"step": 4, "title": "Assign Custom Tags", "desc": "Add tags like 'Evidence', 'Procedure', 'Important', or 'Commercial Law' for instant filtering."},
                {"step": 5, "title": "Write & Save Securely", "desc": "Save your rich-text observations with automatic cloud timestamp synchronization."},
                {"step": 6, "title": "Export Notes Collection", "desc": "Export organized briefs in PDF or clean text format for court filings and hearings."}
            ])
        },
        {
            "title": "How to Add and Use Bookmarks",
            "category_key": "notes_bookmarks",
            "description": "Save important Acts, Sections and Notifications for quick access.",
            "reading_time": "2 min read",
            "has_video": True,
            "video_duration": "2:50",
            "is_popular": True,
            "helpful_count": 412,
            "not_helpful_count": 7,
            "steps_json": json.dumps([
                {"step": 1, "title": "Locate Bookmark Icon", "desc": "Every statutory Act, Rule, Section, and Amendment card features a gold bookmark ribbon."},
                {"step": 2, "title": "Click Bookmark to Save", "desc": "Click the ribbon to instantly save the document into your legal repository."},
                {"step": 3, "title": "Organize by Category", "desc": "Access items organized into 7 distinct bookmark categories: Act, Rule, Section, Amendment, Notification, Recent, and Important."},
                {"step": 4, "title": "Mark as Important", "desc": "Star critical precedents and sections to highlight them at the top of your workspace."},
                {"step": 5, "title": "One-Click Quick Access", "desc": "Click 'Open' on any bookmark to immediately return to the exact section with highlights intact."}
            ])
        },
        {
            "title": "How to Track Amendments & Updates",
            "category_key": "amendments_notifications",
            "description": "Stay updated with the latest amendments, rules and notifications.",
            "reading_time": "3 min read",
            "has_video": True,
            "video_duration": "5:10",
            "is_popular": True,
            "helpful_count": 275,
            "not_helpful_count": 2,
            "steps_json": json.dumps([
                {"step": 1, "title": "Open Amendments & Updates", "desc": "Select 'Amendments & Updates' from the main navigation menu."},
                {"step": 2, "title": "Explore Gazette Feeds", "desc": "Browse Central and State Government notifications, G.S.R. numbers, and enforcement dates."},
                {"step": 3, "title": "Inspect Side-by-Side Diffs", "desc": "Compare original statutory text with modified clauses highlighted in green and red."},
                {"step": 4, "title": "Filter by Amendment Type", "desc": "Toggle between Amendments, Gazette Notifications, and Official Corrigenda."},
                {"step": 5, "title": "Configure Real-time Alerts", "desc": "Receive notification badges whenever new amendments affecting your bookmarked Acts are gazetted."}
            ])
        },
        {
            "title": "How to Use Advanced Legal Search",
            "category_key": "search_advanced",
            "description": "Master exact phrase queries, cross-references, and Boolean search filters.",
            "reading_time": "5 min read",
            "has_video": True,
            "video_duration": "6:20",
            "is_popular": False,
            "helpful_count": 198,
            "not_helpful_count": 3,
            "steps_json": json.dumps([
                {"step": 1, "title": "Navigate to Search", "desc": "Open the Advanced Search view from the sidebar or the banner search bar."},
                {"step": 2, "title": "Choose Search Mode", "desc": "Switch between Universal Search, Exact Phrase, Section Search, and Cross-Reference Search."},
                {"step": 3, "title": "Enter Exact Quotations", "desc": "Use double quotes for precise statutory phrases such as \"electronic records\"."},
                {"step": 4, "title": "Filter by Jurisdiction", "desc": "Refine by Central Government or specific State legislature acts."},
                {"step": 5, "title": "Save Search Queries", "desc": "Bookmark frequent complex queries for one-click re-execution in future sessions."}
            ])
        },
        {
            "title": "How to Change Tamil and English Languages",
            "category_key": "using_features",
            "description": "Switch platform language, bilingual views, and translated Acts seamlessly.",
            "reading_time": "2 min read",
            "has_video": True,
            "video_duration": "3:05",
            "is_popular": False,
            "helpful_count": 310,
            "not_helpful_count": 6,
            "steps_json": json.dumps([
                {"step": 1, "title": "Top Bar Language Switcher", "desc": "Locate the pill switcher labeled 'English | தமிழ்' in the top right header."},
                {"step": 2, "title": "One-Click Switch", "desc": "Click 'தமிழ்' to translate statutory headings, acts index, and interface controls into Tamil."},
                {"step": 3, "title": "Bilingual Mode", "desc": "Subscribers with Bilingual package can view dual-column English and Tamil text simultaneously."}
            ])
        },
        {
            "title": "How to Manage Your Subscription",
            "category_key": "billing_payments",
            "description": "Check plan validity, upgrade package, and download GST tax invoices.",
            "reading_time": "3 min read",
            "has_video": True,
            "video_duration": "4:00",
            "is_popular": False,
            "helpful_count": 224,
            "not_helpful_count": 2,
            "steps_json": json.dumps([
                {"step": 1, "title": "Open Subscription Details", "desc": "Navigate to 'Subscription Details' in the sidebar."},
                {"step": 2, "title": "View Active Package", "desc": "Check your current package (English Package), yearly validity date, and remaining days."},
                {"step": 3, "title": "Monitor Usage Metrics", "desc": "Review real-time usage meters for Notes (246/1000), Bookmarks (328/1000), and PDF exports."},
                {"step": 4, "title": "Download Invoices", "desc": "Click invoice numbers (e.g. TRL-INV-0045) to view and print official GST payment receipts."}
            ])
        },
        {
            "title": "How to Download Legal Documents",
            "category_key": "using_features",
            "description": "Export Acts, Rules, and Notifications in high-resolution court-admissible PDF.",
            "reading_time": "2 min read",
            "has_video": True,
            "video_duration": "2:30",
            "is_popular": False,
            "helpful_count": 185,
            "not_helpful_count": 1,
            "steps_json": json.dumps([
                {"step": 1, "title": "Select Document", "desc": "Open any Act, Section, or Gazette update."},
                {"step": 2, "title": "Click PDF Export", "desc": "Click the Export button to open the document generation options."},
                {"step": 3, "title": "Choose Format", "desc": "Select Full Act with Amendments, Section-only, or Summary brief."},
                {"step": 4, "title": "Download Clean Copy", "desc": "Save the watermark-free PDF ready for legal research and court submissions."}
            ])
        }
    ]

    for g in guides_data:
        db.add(HelpGuide(**g))

    # Seed FAQs
    faqs_data = [
        {"question": "How do I create an account?", "answer": "You can register an advocate or legal researcher account directly from the Login page by clicking 'Create Account'. Provide your full name, email, bar registration number, and preferred language to get started.", "category_key": "account_subscription", "order": 1},
        {"question": "How do I purchase a subscription?", "answer": "Navigate to Subscription Details and click 'Upgrade Your Plan' or 'View Plans'. Choose between English, Tamil, or Bilingual All-Access yearly plans and complete the secure payment via UPI, NetBanking, or Credit/Debit Card.", "category_key": "billing_payments", "order": 2},
        {"question": "How can I access Tamil legal documents?", "answer": "Use the language switcher pill at the top header to toggle to 'தமிழ்'. Tamil translations of Central Acts, Madras High Court rules, and Tamil Nadu State Acts will be immediately displayed.", "category_key": "using_features", "order": 3},
        {"question": "How can I search for a specific section?", "answer": "Use either the top search bar with 'Section [number] [Act name]' or switch to the Advanced Search tab and select 'Section Search'. Enter section number (e.g., '65B') to jump straight to the statutory text.", "category_key": "search_advanced", "order": 4},
        {"question": "How do I save bookmarks?", "answer": "Click the gold bookmark ribbon icon on any Act, Rule, or Section card. You can view, filter, and organize all saved bookmarks inside the 'Bookmarks' menu.", "category_key": "notes_bookmarks", "order": 5},
        {"question": "How do I create legal notes?", "answer": "Go to 'My Notes' and click '+ Create Note'. You can link your thoughts directly to an Act, Rule, or Section citation, assign custom tags, and export them as formatted PDF briefs.", "category_key": "notes_bookmarks", "order": 6},
        {"question": "How can I download documents?", "answer": "Click the 'Export' or PDF icon located on the document view action bar to download clean, printable legal documents with full statutory citations.", "category_key": "using_features", "order": 7},
        {"question": "How do I renew my subscription?", "answer": "In 'Subscription Details', click 'Manage Subscription' or 'Renew Plan'. If Auto-Renewal is enabled, your subscription will automatically renew upon expiry without interruption.", "category_key": "billing_payments", "order": 8},
        {"question": "How can I change my password?", "answer": "Click on your user profile 'Adv. R. Karthik' at the top right, select 'Profile Settings', and update your password securely under the Security & Credentials tab.", "category_key": "account_subscription", "order": 9},
        {"question": "How do I contact customer support?", "answer": "Click the 'Contact Support' button in the Help & How to Use center or bottom right card. Fill out the support request form and our dedicated legal support team will respond within 24 hours.", "category_key": "troubleshooting", "order": 10},
    ]

    for faq in faqs_data:
        db.add(HelpFAQ(**faq))

    # Seed an initial support ticket for realistic view
    db.add(SupportTicket(
        ticket_no="TRL-TKT-2026-0042",
        user_name="Adv. R. Karthik",
        user_email="karthik.advocate@gmail.com",
        subject="Bilingual view query for Bharatiya Nyaya Sanhita",
        category="Using Features",
        description="Requesting guidance on viewing side-by-side Tamil legal vocabulary next to English provisions in BNS 2023.",
        status="Resolved"
    ))

    db.commit()

@router.get("/categories")
def get_categories(db: Session = Depends(get_db)):
    seed_help_data_if_empty(db)
    return db.query(HelpCategory).order_by(HelpCategory.order).all()

@router.get("/guides")
def get_guides(
    category: Optional[str] = None,
    q: Optional[str] = None,
    popular_only: Optional[bool] = False,
    db: Session = Depends(get_db)
):
    seed_help_data_if_empty(db)
    query = db.query(HelpGuide)
    if category:
        query = query.filter(HelpGuide.category_key == category)
    if popular_only:
        query = query.filter(HelpGuide.is_popular == True)
    if q:
        query = query.filter(
            (HelpGuide.title.ilike(f"%{q}%")) | 
            (HelpGuide.description.ilike(f"%{q}%"))
        )
    
    results = query.all()
    out = []
    for g in results:
        steps_list = []
        if g.steps_json:
            try:
                steps_list = json.loads(g.steps_json)
            except:
                steps_list = []
        out.append({
            "id": g.id,
            "title": g.title,
            "category_key": g.category_key,
            "description": g.description,
            "reading_time": g.reading_time,
            "has_video": g.has_video,
            "video_duration": g.video_duration,
            "is_popular": g.is_popular,
            "steps": steps_list,
            "helpful_count": g.helpful_count,
            "not_helpful_count": g.not_helpful_count
        })
    return out

@router.get("/faqs")
def get_faqs(category: Optional[str] = None, q: Optional[str] = None, db: Session = Depends(get_db)):
    seed_help_data_if_empty(db)
    query = db.query(HelpFAQ)
    if category:
        query = query.filter(HelpFAQ.category_key == category)
    if q:
        query = query.filter(
            (HelpFAQ.question.ilike(f"%{q}%")) |
            (HelpFAQ.answer.ilike(f"%{q}%"))
        )
    return query.order_by(HelpFAQ.order).all()

@router.post("/feedback")
def submit_feedback(guide_id: int, helpful: bool, db: Session = Depends(get_db)):
    guide = db.query(HelpGuide).filter(HelpGuide.id == guide_id).first()
    if not guide:
        raise HTTPException(status_code=404, detail="Guide not found")
    if helpful:
        guide.helpful_count += 1
    else:
        guide.not_helpful_count += 1
    db.commit()
    return {"status": "success", "helpful_count": guide.helpful_count, "not_helpful_count": guide.not_helpful_count}

@router.get("/tickets")
def get_tickets(db: Session = Depends(get_db)):
    seed_help_data_if_empty(db)
    return db.query(SupportTicket).order_by(SupportTicket.created_at.desc()).all()

@router.post("/tickets")
def create_ticket(ticket: SupportTicketCreate, db: Session = Depends(get_db)):
    seed_help_data_if_empty(db)
    rand_no = random.randint(1000, 9999)
    ticket_no = f"TRL-TKT-2026-{rand_no}"
    new_ticket = SupportTicket(
        ticket_no=ticket_no,
        user_name=ticket.user_name or "Adv. R. Karthik",
        user_email=ticket.user_email or "karthik.advocate@gmail.com",
        subject=ticket.subject,
        category=ticket.category,
        description=ticket.description,
        status="Open"
    )
    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)
    return new_ticket
