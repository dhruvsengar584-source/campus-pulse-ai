export interface SampleNotice {
  id: string;
  name: string;
  description: string;
  rawText: string;
}

export const SAMPLE_NOTICES: SampleNotice[] = [
  {
    id: 'sample-1',
    name: '🔥 Chaotic WhatsApp Forward: GDG DevFest & Hackathon',
    description: 'Messy text with emojis, shortened URLs, informal dates, and eligibility scattered in paragraphs.',
    rawText: `🚨🚨 ATTENTION TECHIES & CODER GEEKS!! 🚨🚨
GDSC in collaboration with Google Developers Group is thrilled to announce 💥 HACKPULSE 2026 💥
The biggest 36-hr offline hackathon on our university campus! 🚀💻

📍 Venue: Central Audi 2, Academic Block C
🗓️ Date: Nov 15th - 16th, 2026 (Starts 09:00 AM sharp)
🏆 Cash Pool: ₹2.5 Lakhs + Google Cloud Credits + Swag bags for all participants! 🍕 Unlimited pizza & Red Bull provided!

Who can join?
Open to 2nd, 3rd & 4th year B.Tech, BCA & MCA students. Teams of 2 to 4 members. Solo entries not allowed.
Tracks: GenAI Agents, Web3 & FinTech, Smart Campus, HealthTech.

⚠️ IMPORTANT DEADLINE: Registrations close on Nov 5th midnight! No on-spot entries.
Register your squad here: https://hackpulse2026.gdg.in/apply

Forward this to all branch groups! Don't miss out! 🚀🔥
- Student Conveners: Rohan & Priya (GDSC Core Team)`
  },
  {
    id: 'sample-2',
    name: '📄 Placement Cell Email Circular: Deloitte USI',
    description: 'Semi-structured corporate placement broadcast with CGPA cutoffs and test timeframes.',
    rawText: `Dear Students of Final Year (Batch 2026),

Ref: T&P/CIR/2026/NOV/18
Sub: Campus Recruitment Drive for Deloitte USI - Analyst Role

Please be informed that Deloitte USI has scheduled their virtual campus recruitment drive for Software Engineering and Business Technology Analyst profiles.

Key Details:
1. Designation: Analyst (Software Engineering / Advisory)
2. Compensation: CTC INR 9,50,000 per annum
3. Eligibility Criteria: B.Tech (CSE, IT, ECE, EEE) with aggregate 65% or 6.5 CGPA onwards without active backlogs.
4. Date of Pre-Placement Talk: Nov 18, 2026 at 11:00 AM via MS Teams.
5. Online Proctored Assessment: Nov 19, 2026 (02:00 PM - 04:30 PM).

Students must fill out the mandatory registration form before Nov 12, 2026 (05:00 PM):
Registration Link: https://deloitte.campusportal.edu/apply-2026-drive

Late submissions will strictly not be entertained.

Regards,
Prof. S. N. Trivedi
Head, Training & Placement Cell`
  },
  {
    id: 'sample-3',
    name: '🎨 Cultural Club Incomplete Caption (Missing Venue & URL)',
    description: 'Casual Instagram/WhatsApp caption with missing details to showcase Missing Information Detection.',
    rawText: `Hey everyone!! 🎭✨
The Dramatics Society 'Nautanki' is hosting auditions for the annual street play competition 'Awaaz 2026'!

Theme: "Digital Detox & Modern Youth"
Audition Date: Nov 22nd starting 4 PM onwards.
All year students are welcome to show their acting, scriptwriting, and musical skills.
Wear comfortable black clothing.

Come show your talent! DM @nautanki_society on Instagram to confirm your spot.`
  }
];
