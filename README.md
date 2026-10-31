# ⚡ Campus Pulse AI
> **Your Campus. One Intelligent Pulse.**  
> *Built for Google Developers Hackathon*

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Gemini](https://img.shields.io/badge/Google%20Gemini-2.5%20Flash-4285F4?logo=google&logoColor=white)](https://aistudio.google.com/)

---

## 🎯 1. The Core Problem We Solve
Every year, thousands of college students miss career-defining opportunities:
- **WhatsApp Fatigue**: Critical hackathon registrations and placement assessments get buried beneath hundreds of casual class messages and memes.
- **Fragmented Channels**: Information is scattered across emails, torn physical notice boards, Instagram posters, and department circulars.
- **Expired Deadlines**: Students discover notices after registration links have already closed.
- **Zero Personalization**: A 3rd-year CS student is flooded with 1st-year lab notices while missing Goldman Sachs or Google Cloud internship drives.

---

## 💡 2. The Solution: Campus Pulse AI
**Campus Pulse AI** is an AI-powered campus intelligence platform that ingests unstructured notices, emails, and WhatsApp forwards and converts them into **structured, actionable, personalized intelligence**:

- 🧠 **AI Notice Intelligence Center**: Paste messy WhatsApp forwards or informal poster captions. Google Gemini extracts event title, category, date, timing, venue, registration URL, eligibility, and deadline with duplicate detection and missing information warnings.
- 📊 **Smart Student Dashboard**: Today's Focus alert, real-time deadline countdowns, student statistics, and personalized recommendations tailored to department and academic year.
- 📡 **Campus Feed & Discovery**: Filter across 11 campus categories (*Hackathons, Workshops, Internships, Placements, Cultural Events, Academic Notices, Scholarships, Competitions, Sports, Club Activities, General Announcements*) with priority tags and full-text search.
- 📅 **Interactive Campus Calendar**: Monthly and daily agenda views, category color coding, Google Calendar 1-click sync, and direct `.ics` calendar export.
- 🧭 **AI Weekly Briefing ("What do I need to know this week?")**: Synthesizes the week's strict deadlines and top career picks into an executive summary and actionable checklist.
- 🛡️ **Admin Governance & Trust Layer**: Verified organizer status, moderation approval queues, crowdsourced error reporting, and official notice broadcast.

---

## 🏗️ 3. Architecture & Tech Stack

```
Campus Pulse AI Architecture
├── Presentation Layer (Tailwind CSS v4, Lucide Icons, Glassmorphic Design System)
├── Application Logic & Views (React 19 + TypeScript)
│   ├── Public Landing Page (Value proposition, problem breakdown, before/after demo)
│   ├── Student Dashboard & Campus Feed (Personalized recommendations, search, filters)
│   ├── AI Notice Parser (Gemini Cloud API + Heuristic Fallback Engine)
│   ├── Smart Calendar (Month grid, day agenda, .ics / Google Cal integration)
│   ├── Weekly Briefing (AI executive summary & action checklist)
│   └── Admin Console (Moderation queue, verified organizers, error reports)
├── Services Layer
│   ├── geminiService.ts (Gemini REST API + intelligent heuristic fallback)
│   ├── announcementService.ts (LocalStorage persistence & CRUD operations)
│   └── notificationService.ts (Deadline reminders & toast alerts)
└── Data Layer
    ├── 16 Realistic Preloaded Campus Announcements across all 11 categories
    └── Preloaded 1-Click Judging Test Cases (Chaotic WhatsApp, Placement Email, Cultural Poster)
```

---

## 🚀 4. Quick Start & Setup

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/YOUR_USERNAME/campus-pulse-ai.git
cd campus-pulse-ai
npm install
```

### 2. Configure Environment (Optional)
```bash
cp .env.example .env
```
> **Note**: Campus Pulse AI contains a **Zero-Config Live Heuristic AI Engine**. You can run and test the complete app immediately **without** any API keys! To connect Google Gemini cloud endpoints, simply provide `VITE_GEMINI_API_KEY` or paste it in the in-app Key settings modal.

### 3. Run Locally
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 🎬 5. Hackathon Presentation & Live Demo Script (2 Minutes)

1. **The Hook (Landing Page)**: Open `http://localhost:5173`. Show the hero headline *"Your Campus. One Intelligent Pulse."* and the live Before/After comparison demonstrating how messy WhatsApp forwards become structured cards.
2. **Student Dashboard**: Click **"Explore Campus Feed"**. Show the personalized greeting for *Aarav Sharma (3rd Year CSE)*, the **Today's Focus** urgent deadline banner, and the **AI Personalized Recommendations**.
3. **The Signature AI Demo (Notice Parser)**:
   - Click **"AI Notice Parser"** in the top navigation.
   - Click **"🔥 Chaotic WhatsApp Forward"** to populate real messy text.
   - Click **"Extract Notice with Gemini AI"**. Watch the animated scanner extract 14 structured fields, detect missing fields, and run duplicate detection.
   - Click **"Confirm & Publish to Campus Feed"** (enjoy the confetti celebration!).
4. **Campus Feed & Calendar**:
   - Notice appears instantly in the feed.
   - Click **"Smart Calendar"** to show the event auto-synced to the monthly grid.
   - Click the event to show **Google Calendar** and **Export .ICS** buttons.
5. **AI Weekly Briefing**: Click **"Weekly Briefing"** to demonstrate *"What do I need to know this week?"* with automated action checklist.
6. **Admin Governance**: Click **"Student View / Admin Mode"** in the top bar to show the Moderator Approval Queue and error reporting resolution.

---

## 📦 6. Pushing to GitHub

```bash
# 1. Initialize git (if not already done)
git init

# 2. Add all files
git add .

# 3. Commit
git commit -m "feat: complete Campus Pulse AI hackathon submission with premium UI and Gemini intelligence"

# 4. Set branch to main
git branch -M main

# 5. Add your remote repository
git remote add origin https://github.com/YOUR_USERNAME/campus-pulse-ai.git

# 6. Push
git push -u origin main
```

---

## 🏆 Hackathon Submission Checklist
- [x] Complete, responsive, premium UI (Midnight navy, glassmorphism, glowing accents)
- [x] AI Notice Intelligence with structured JSON schema
- [x] Duplicate detection & missing information detection
- [x] 11 Campus categories with realistic preloaded dataset
- [x] Interactive Calendar with month and day agenda views
- [x] Weekly Briefing AI synthesis and action checklist
- [x] Role switcher (Student View vs. Admin Console)
- [x] Zero-config fallback demo mode (never fails if API credentials are absent)
- [x] Verified production build (`npm run build` succeeds in 1s)

---
*Created with passion for the Google Developers Hackathon.*
