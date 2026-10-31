export type AnnouncementCategory =
  | 'Hackathons'
  | 'Workshops'
  | 'Internships'
  | 'Placements'
  | 'Cultural Events'
  | 'Academic Notices'
  | 'Scholarships'
  | 'Competitions'
  | 'Sports'
  | 'Club Activities'
  | 'General Announcements';

export type PriorityLevel = 'Urgent' | 'Important' | 'Upcoming' | 'Normal' | 'Expired';

export type SourceType =
  | 'WhatsApp Message'
  | 'Official Portal'
  | 'Department Email'
  | 'Student Council'
  | 'Club Poster'
  | 'Admin Notice';

export type VerificationStatus = 'Verified' | 'Pending Review' | 'Community Submitted';

export interface Announcement {
  id: string;
  title: string;
  description: string;
  category: AnnouncementCategory;
  eventDate: string; // YYYY-MM-DD
  startTime?: string;
  endTime?: string;
  venue: string;
  organizer: string;
  organizerAvatar?: string;
  registrationUrl?: string;
  eligibility?: string;
  deadline?: string; // YYYY-MM-DD or ISO string
  priority: PriorityLevel;
  source: string;
  sourceType: SourceType;
  verificationStatus: VerificationStatus;
  tags: string[];
  posterUrl?: string;
  isBookmarked?: boolean;
  participantCount?: number;
  registered?: boolean;
  notes?: string;
  createdAt: string;
  createdBy?: string;
  reportsCount?: number;
  isDemoData?: boolean;
  rawSourceText?: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  college: string;
  department: string;
  year: string; // e.g., '3rd Year'
  rollNumber: string;
  avatar: string;
  interests: string[];
  savedAnnouncementIds: string[];
  registeredAnnouncementIds: string[];
  role: 'student' | 'admin';
  notificationPreferences: {
    urgentDeadlines: boolean;
    weeklyBriefing: boolean;
    hackathonsAndWorkshops: boolean;
    placementAlerts: boolean;
  };
}

export interface ExtractedNotice {
  title: string;
  description: string;
  category: AnnouncementCategory;
  eventDate: string;
  startTime: string;
  endTime: string;
  venue: string;
  organizer: string;
  registrationUrl: string;
  eligibility: string;
  deadline: string;
  priority: PriorityLevel;
  sourceType: SourceType;
  confidenceScore: number;
  missingFields: string[];
  duplicateWarning?: {
    isDuplicate: boolean;
    existingNoticeTitle?: string;
    similarityPercent?: number;
  };
}

export interface WeeklyBriefing {
  id: string;
  generatedAt: string;
  headline: string;
  summary: string;
  urgentDeadlines: {
    id: string;
    title: string;
    date: string;
    category: AnnouncementCategory;
    action: string;
  }[];
  topPicks: {
    id: string;
    title: string;
    category: AnnouncementCategory;
    reason: string;
  }[];
  actionChecklist: string[];
}

export interface ReportItem {
  id: string;
  announcementId: string;
  announcementTitle: string;
  reportedBy: string;
  reason: string;
  timestamp: string;
  status: 'Pending' | 'Resolved' | 'Dismissed';
}
