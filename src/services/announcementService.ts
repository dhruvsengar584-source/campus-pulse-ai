import { Announcement, StudentProfile, ReportItem } from '../types';
import { INITIAL_ANNOUNCEMENTS, INITIAL_STUDENT_PROFILE } from '../data/mockAnnouncements';

const STORAGE_KEYS = {
  ANNOUNCEMENTS: 'campus_pulse_announcements_v1',
  STUDENT: 'campus_pulse_student_v1',
  REPORTS: 'campus_pulse_reports_v1',
};

export class AnnouncementService {
  public static getAnnouncements(): Announcement[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(INITIAL_ANNOUNCEMENTS));
        return INITIAL_ANNOUNCEMENTS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load announcements from storage', e);
      return INITIAL_ANNOUNCEMENTS;
    }
  }

  public static saveAnnouncements(announcements: Announcement[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
    } catch (e) {
      console.error('Failed to save announcements to storage', e);
    }
  }

  public static addAnnouncement(announcement: Omit<Announcement, 'id' | 'createdAt'>): Announcement {
    const list = this.getAnnouncements();
    const newAnnouncement: Announcement = {
      ...announcement,
      id: `ann-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      participantCount: 1,
    };
    list.unshift(newAnnouncement);
    this.saveAnnouncements(list);
    return newAnnouncement;
  }

  public static updateAnnouncement(id: string, updates: Partial<Announcement>): Announcement | null {
    const list = this.getAnnouncements();
    const idx = list.findIndex((a) => a.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates };
    this.saveAnnouncements(list);
    return list[idx];
  }

  public static deleteAnnouncement(id: string): boolean {
    const list = this.getAnnouncements();
    const filtered = list.filter((a) => a.id !== id);
    if (filtered.length !== list.length) {
      this.saveAnnouncements(filtered);
      return true;
    }
    return false;
  }

  public static toggleBookmark(id: string): boolean {
    const list = this.getAnnouncements();
    const ann = list.find((a) => a.id === id);
    if (!ann) return false;
    ann.isBookmarked = !ann.isBookmarked;
    this.saveAnnouncements(list);

    // Also sync with student profile
    const profile = this.getStudentProfile();
    if (ann.isBookmarked) {
      if (!profile.savedAnnouncementIds.includes(id)) {
        profile.savedAnnouncementIds.push(id);
      }
    } else {
      profile.savedAnnouncementIds = profile.savedAnnouncementIds.filter((item) => item !== id);
    }
    this.saveStudentProfile(profile);

    return ann.isBookmarked;
  }

  public static registerForEvent(id: string): boolean {
    const list = this.getAnnouncements();
    const ann = list.find((a) => a.id === id);
    if (!ann) return false;
    ann.registered = true;
    ann.participantCount = (ann.participantCount || 0) + 1;
    this.saveAnnouncements(list);

    const profile = this.getStudentProfile();
    if (!profile.registeredAnnouncementIds.includes(id)) {
      profile.registeredAnnouncementIds.push(id);
      this.saveStudentProfile(profile);
    }
    return true;
  }

  public static reportAnnouncement(announcementId: string, reason: string, reportedBy: string): void {
    const reports = this.getReports();
    const list = this.getAnnouncements();
    const ann = list.find((a) => a.id === announcementId);

    const newReport: ReportItem = {
      id: `rep-${Date.now()}`,
      announcementId,
      announcementTitle: ann ? ann.title : 'Unknown Notice',
      reportedBy,
      reason,
      timestamp: new Date().toLocaleString(),
      status: 'Pending',
    };

    reports.unshift(newReport);
    try {
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
    } catch (e) {
      console.error(e);
    }

    if (ann) {
      ann.reportsCount = (ann.reportsCount || 0) + 1;
      this.saveAnnouncements(list);
    }
  }

  public static getReports(): ReportItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REPORTS);
      if (!data) return [];
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  public static resolveReport(reportId: string, status: 'Resolved' | 'Dismissed'): void {
    const reports = this.getReports();
    const item = reports.find((r) => r.id === reportId);
    if (item) {
      item.status = status;
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
    }
  }

  public static getStudentProfile(): StudentProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STUDENT);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.STUDENT, JSON.stringify(INITIAL_STUDENT_PROFILE));
        return INITIAL_STUDENT_PROFILE;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_STUDENT_PROFILE;
    }
  }

  public static saveStudentProfile(profile: StudentProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.STUDENT, JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }
  }

  public static resetToDemoData(): void {
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(INITIAL_ANNOUNCEMENTS));
    localStorage.setItem(STORAGE_KEYS.STUDENT, JSON.stringify(INITIAL_STUDENT_PROFILE));
    localStorage.removeItem(STORAGE_KEYS.REPORTS);
  }
}
