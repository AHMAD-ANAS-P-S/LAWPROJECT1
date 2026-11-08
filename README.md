# Tamil Raw Library (tamilrawlibrary.com)
### Indian Government Acts, Rules, Amendments & Legal Reference Platform

A full-stack, enterprise-grade Indian legal information and subscription management portal featuring a luxurious burgundy, dark maroon, gold, and cream legal aesthetic.

---

## 🌟 Platform Overview & All Pages

1. **Authentication:**
   - **Login Page (`/login`):** Photorealistic framed wooden gavel & vintage law book card, credentials login, Google authentication, session persistence, automatic demo fallback.
   - **Sign Up Page (`/signup`):** 3 language packages (English, Tamil, Bilingual), Indian mobile validation, Terms & Privacy modal.
2. **Dashboard (`/dashboard`):**
   - Active subscription welcome banner, 6 quick metrics, quick-action portals, recently viewed documents, category exploration.
3. **Browse Acts (`/acts`):**
   - Central & State Acts catalog (750+ Acts), real-time status filtering (Enforced, In Force), BNS, BNSS, IEA, CrPC cards, section viewers.
4. **Browse Rules (`/rules`):**
   - High-resolution Supreme Court dome & gavel banner, 2,485 rules, notification year & jurisdiction filters, 249 pagination pages.
5. **Amendments & Updates (`/amendments`):**
   - Gazette notification badges, Parliament dome banner, 1,842 amendment records, official notification numbers.
6. **Advanced Search (`/search`):**
   - 6 Search modes (Universal, Exact Phrase, Section, Cross-Reference, Saved Searches, Search History), multi-facet jurisdiction & document filters, cross-reference pills.
7. **My Notes (`/notes`):**
   - Legal notepad & fountain pen banner, quick note creation, rich tag management, Act/Rule/Section cross-linking.
8. **Bookmarks (`/bookmarks`):**
   - Ribbon star bookmark banner, instant toggle bookmarking, categorization by Act, Rule, Section, or Notification.
9. **Subscription Details (`/subscription`):**
   - Active package overview (Tamil + English Package, 672 days remaining), usage progress quotas, full billing history & PDF invoices, plan upgrades.
10. **Help & How to Use (`/help`):**
    - Video guides, 6 help categories, interactive FAQ accordions, customer support ticketing modal.

---

## 🚀 Local Development Setup

### 1. Prerequisites
- **Node.js** v18+ & **npm**
- **Python** 3.10+ (for FastAPI backend)

### 2. Frontend (Next.js 16 + React 19 + Tailwind CSS)
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Or build for production
npm run build
npm start
```
Frontend runs at: `http://localhost:3000`

### 3. Backend (FastAPI + SQLAlchemy)
```bash
# Create and activate virtual environment
python -m venv venv
# On Windows PowerShell:
.\venv\Scripts\Activate.ps1
# On Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r backend/requirements.txt

# Run FastAPI backend
python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload
```
Swagger API docs available at: `http://localhost:8000/docs`

---

## ☁️ Deploy to Vercel

The project includes pre-configured `vercel.json` and root `package.json` configurations for instant, zero-config Vercel deployment.

### Option 1: Via Vercel Web Dashboard (Recommended)
1. Push this repository to GitHub: `https://github.com/AHMAD-ANAS-P-S/LAWPROJECT1`
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import `AHMAD-ANAS-P-S/LAWPROJECT1`.
4. Vercel automatically detects the Next.js framework:
   - **Framework Preset:** `Next.js`
   - **Root Directory:** `./` (or `frontend`)
   - **Build Command:** `cd frontend && npm run build` (automatic via `vercel.json`)
   - **Output Directory:** `frontend/.next` (automatic via `vercel.json`)
5. Click **"Deploy"**!

### Option 2: Via Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Environment Variables on Vercel (Optional)
If deploying the backend to Railway, Render, or Fly.io:
- `NEXT_PUBLIC_API_URL`: Your hosted FastAPI backend URL (e.g., `https://api.tamillawlibrary.com`).
*(If left unset, the frontend automatically falls back to client demo mock mode so all pages, authentication, and features remain 100% interactive!)*

---

## 🔒 License
© 2026 TAMIL LAW LIBRARY (tamillawlibrary.com). All Rights Reserved.
