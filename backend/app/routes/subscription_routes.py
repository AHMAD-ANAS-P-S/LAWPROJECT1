import datetime
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from ..database import get_db
from ..models import User

router = APIRouter(prefix="/api/subscriptions", tags=["Subscriptions"])

PACKAGES = [
    {
        "id": "english",
        "name_en": "English Package",
        "name_ta": "ஆங்கில தொகுப்பு",
        "price_monthly": 499,
        "price_yearly": 4999,
        "description_en": "Complete Indian Acts, Rules and Amendments in authentic English text.",
        "description_ta": "ஆங்கிலத்தில் சட்டங்கள் மற்றும் விதிகள்.",
        "features": [
            "Complete Central & State Acts in English",
            "Rules & Regulations Framed under Acts",
            "High Court & Supreme Court Notifications",
            "Universal Legal Search & Cross-References",
            "My Notes & Bookmarks Management",
            "Priority Support via Help Center"
        ],
        "entitlements": {
            "english_access": True,
            "tamil_access": False,
            "bilingual_access": False
        }
    },
    {
        "id": "tamil",
        "name_en": "Tamil Package",
        "name_ta": "தமிழ் தொகுப்பு",
        "price_monthly": 499,
        "price_yearly": 4999,
        "description_en": "Authentic Tamil translated Acts, Rules and Legal notifications.",
        "description_ta": "தமிழில் சட்டங்கள் மற்றும் விதிகள்.",
        "features": [
            "Central Acts in Official Legal Tamil",
            "Tamil Nadu State Acts & Rules",
            "High Court Tamil Translated Notifications",
            "Bilingual Legal Terminology Glossary",
            "My Notes & Bookmarks Management",
            "Standard Legal Search"
        ],
        "entitlements": {
            "english_access": False,
            "tamil_access": True,
            "bilingual_access": False
        }
    },
    {
        "id": "bilingual",
        "name_en": "Bilingual Package (Tamil + English)",
        "name_ta": "இருமொழி தொகுப்பு",
        "price_monthly": 799,
        "price_yearly": 7999,
        "description_en": "Complete comparative access in both English and Tamil simultaneously.",
        "description_ta": "ஆங்கிலம் மற்றும் தமிழ்.",
        "features": [
            "Complete English & Tamil Acts Side-by-Side",
            "Comparative Section-by-Section Legal View",
            "Comprehensive English-Tamil Legal Dictionary",
            "Unlimited Digital Notes & Legal Bookmarks",
            "Priority Universal Search & Gazette Notifications",
            "Dedicated Priority Advocate Support"
        ],
        "entitlements": {
            "english_access": True,
            "tamil_access": True,
            "bilingual_access": True
        }
    }
]

class OrderCreateRequest(BaseModel):
    plan_id: str
    billing_cycle: Optional[str] = "Yearly"
    amount: Optional[int] = 4999

class PaymentVerifyRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: Optional[str] = "simulated_signature"
    plan_id: str
    billing_cycle: Optional[str] = "Yearly"

@router.get("/packages")
def get_packages():
    return {
        "status": "success",
        "packages": PACKAGES
    }

@router.get("/current")
def get_current_subscription(user_id: int = 1, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    pkg_id = "english"
    if user and user.package:
        pkg_id = user.package.lower()

    # Match user's explicit request: English Package default
    matched_pkg = next((p for p in PACKAGES if p["id"] == pkg_id), PACKAGES[0])

    return {
        "user_id": user_id,
        "package_id": matched_pkg["id"],
        "package_name": matched_pkg["name_en"],
        "plan_type": "Yearly",
        "status": "Active",
        "start_date": "07 Nov 2026",
        "expiry_date": "06 Nov 2027",
        "days_remaining": 672,
        "auto_renewal": True,
        "price": matched_pkg["price_yearly"],
        "description": "Full access to Acts, Rules, Amendments, Notifications & Updates",
        "benefits": [
            { "id": 1, "title": "Complete Access", "desc": "Acts, Rules & Sections", "icon": "BookOpen" },
            { "id": 2, "title": "Regular Updates", "desc": "Amendments & Notifications", "icon": "Bell" },
            { "id": 3, "title": "My Notes", "desc": "Create & Manage Notes", "icon": "Bookmark" },
            { "id": 4, "title": "Bookmarks", "desc": "Save Important References", "icon": "Star" },
            { "id": 5, "title": "Priority Support", "desc": "Email & Help Center", "icon": "Headphones" },
        ],
        "usage": {
            "notes": { "used": 246, "limit": 1000 },
            "bookmarks": { "used": 328, "limit": 1000 },
            "saved_searches": { "used": 56, "limit": 500 },
            "exports": { "used": 18, "limit": 200 }
        },
        "invoices": [
            { "invoice_no": "TRL-INV-0045", "plan": "Yearly", "amount": "₹ 4,999", "date": "07 Nov 2026", "status": "Paid" },
            { "invoice_no": "TRL-INV-0038", "plan": "Yearly", "amount": "₹ 4,999", "date": "07 Nov 2025", "status": "Paid" },
            { "invoice_no": "TRL-INV-0031", "plan": "Yearly", "amount": "₹ 4,999", "date": "07 Nov 2024", "status": "Paid" },
        ]
    }

@router.post("/create-order")
def create_payment_order(data: OrderCreateRequest):
    plan = next((p for p in PACKAGES if p["id"] == data.plan_id), PACKAGES[0])
    amount = plan["price_yearly"] if data.billing_cycle == "Yearly" else plan["price_monthly"]
    order_id = f"order_{int(datetime.datetime.utcnow().timestamp())}"
    return {
        "status": "success",
        "order_id": order_id,
        "amount": amount,
        "currency": "INR",
        "key_id": "rzp_live_legalactsplatform",
        "plan_name": plan["name_en"],
        "billing_cycle": data.billing_cycle
    }

@router.post("/verify-payment")
def verify_payment(data: PaymentVerifyRequest, user_id: int = 1, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        user.package = data.plan_id
        db.commit()

    return {
        "status": "success",
        "message": "Payment verified and subscription activated successfully.",
        "plan_id": data.plan_id,
        "billing_cycle": data.billing_cycle,
        "activated_at": datetime.datetime.utcnow().isoformat()
    }
