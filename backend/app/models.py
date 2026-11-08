import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum
import enum
from .database import Base

class SubscriptionPackage(str, enum.Enum):
    ENGLISH = "english"
    TAMIL = "tamil"
    BILINGUAL = "bilingual"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(120), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    mobile_number = Column(String(20), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    package = Column(String(50), default="bilingual", nullable=False)
    preferred_language = Column(String(10), default="en", nullable=False)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    last_login = Column(DateTime, nullable=True)
    reset_token = Column(String(255), nullable=True)

    def get_entitlements(self):
        """Returns feature flags and language access permissions based on package"""
        pkg = self.package.lower() if self.package else "english"
        return {
            "package": pkg,
            "access_english_acts": pkg in ["english", "bilingual"],
            "access_tamil_acts": pkg in ["tamil", "bilingual"],
            "access_rules_amendments": True,
            "can_take_notes": True,
            "can_bookmark": True,
            "offline_reading": pkg == "bilingual"
        }

class Bookmark(Base):
    __tablename__ = "bookmarks"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True, nullable=False, default=1)
    document_id = Column(String(100), nullable=False)
    document_type = Column(String(50), nullable=False)  # 'act', 'rule', 'section', 'amendment', 'notification'
    document_title = Column(String(255), nullable=False)
    reference = Column(String(255), nullable=True)  # e.g. "Central Act | Act No. 1 of 1872"
    section_id = Column(String(100), nullable=True)  # e.g. "Section 65B"
    custom_tag = Column(String(50), nullable=True, default="Evidence")
    year = Column(String(10), nullable=True, default="2024")
    is_important = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)



from sqlalchemy import Text

class HelpCategory(Base):
    __tablename__ = 'help_categories'

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String(100), unique=True, index=True, nullable=False)
    title = Column(String(200), nullable=False)
    icon = Column(String(50), default='HelpCircle')
    article_count = Column(Integer, default=5)
    order = Column(Integer, default=0)

class HelpGuide(Base):
    __tablename__ = 'help_guides'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    category_key = Column(String(100), index=True, nullable=False)
    description = Column(Text, nullable=False)
    reading_time = Column(String(50), default='3 min read')
    has_video = Column(Boolean, default=True)
    video_duration = Column(String(20), default='4:15')
    is_popular = Column(Boolean, default=True)
    steps_json = Column(Text, nullable=True)
    helpful_count = Column(Integer, default=142)
    not_helpful_count = Column(Integer, default=3)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class HelpFAQ(Base):
    __tablename__ = 'help_faqs'

    id = Column(Integer, primary_key=True, index=True)
    question = Column(String(255), nullable=False)
    answer = Column(Text, nullable=False)
    category_key = Column(String(100), default='general')
    order = Column(Integer, default=0)

class SupportTicket(Base):
    __tablename__ = 'support_tickets'

    id = Column(Integer, primary_key=True, index=True)
    ticket_no = Column(String(50), unique=True, index=True, nullable=False)
    user_name = Column(String(150), default='Adv. R. Karthik')
    user_email = Column(String(255), default='karthik.advocate@gmail.com')
    subject = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    status = Column(String(50), default='Open')
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
