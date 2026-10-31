import React, { useState, useEffect } from 'react';
import { Announcement, StudentProfile, ReportItem } from './types';
import { AnnouncementService } from './services/announcementService';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { CampusFeedPage } from './pages/CampusFeedPage';
import { AIParserPage } from './pages/AIParserPage';
import { CalendarPage } from './pages/CalendarPage';
import { WeeklyBriefingPage } from './pages/WeeklyBriefingPage';
import { SavedEventsPage } from './pages/SavedEventsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminPage } from './pages/AdminPage';
import { EventModal } from './components/shared/EventModal';
import { ShareModal } from './components/shared/ShareModal';
import { ReportModal } from './components/shared/ReportModal';

export const App: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [student, setStudent] = useState<StudentProfile>(AnnouncementService.getStudentProfile());
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Modals state
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [shareTarget, setShareTarget] = useState<Announcement | null>(null);
  const [reportTarget, setReportTarget] = useState<Announcement | null>(null);

  // Load initial state
  useEffect(() => {
    const list = AnnouncementService.getAnnouncements();
    setAnnouncements(list);
    setStudent(AnnouncementService.getStudentProfile());
    setReports(AnnouncementService.getReports());
  }, []);

  // Compute urgent count for notifications and badges
  const urgentCount = announcements.filter((a) => a.priority === 'Urgent').length;
  const savedCount = announcements.filter((a) => a.isBookmarked).length;

  const handleSelectAnnouncement = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
  };

  const handleToggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    AnnouncementService.toggleBookmark(id);
    const updated = AnnouncementService.getAnnouncements();
    setAnnouncements(updated);
    setStudent(AnnouncementService.getStudentProfile());

    if (selectedAnnouncement && selectedAnnouncement.id === id) {
      setSelectedAnnouncement({
        ...selectedAnnouncement,
        isBookmarked: !selectedAnnouncement.isBookmarked,
      });
    }
  };

  const handleRegister = (id: string) => {
    AnnouncementService.registerForEvent(id);
    const updated = AnnouncementService.getAnnouncements();
    setAnnouncements(updated);
    setStudent(AnnouncementService.getStudentProfile());

    if (selectedAnnouncement && selectedAnnouncement.id === id) {
      setSelectedAnnouncement({
        ...selectedAnnouncement,
        registered: true,
        participantCount: (selectedAnnouncement.participantCount || 0) + 1,
      });
    }
  };

  const handleShare = (announcement: Announcement, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setShareTarget(announcement);
  };

  const handleOpenReport = (announcement: Announcement) => {
    setReportTarget(announcement);
  };

  const handleSubmitReport = (announcementId: string, reason: string) => {
    AnnouncementService.reportAnnouncement(announcementId, reason, student.name);
    setReports(AnnouncementService.getReports());
    setAnnouncements(AnnouncementService.getAnnouncements());
  };

  const handlePublishAnnouncement = (data: Omit<Announcement, 'id' | 'createdAt'>) => {
    AnnouncementService.addAnnouncement(data);
    const updated = AnnouncementService.getAnnouncements();
    setAnnouncements(updated);
  };

  const handleApproveNotice = (id: string) => {
    AnnouncementService.updateAnnouncement(id, { verificationStatus: 'Verified' });
    setAnnouncements(AnnouncementService.getAnnouncements());
  };

  const handleDeleteNotice = (id: string) => {
    AnnouncementService.deleteAnnouncement(id);
    setAnnouncements(AnnouncementService.getAnnouncements());
  };

  const handleResolveReport = (reportId: string, status: 'Resolved' | 'Dismissed') => {
    AnnouncementService.resolveReport(reportId, status);
    setReports(AnnouncementService.getReports());
  };

  const handleUpdateProfile = (updated: StudentProfile) => {
    setStudent(updated);
    AnnouncementService.saveStudentProfile(updated);
  };

  const handleResetDemoData = () => {
    AnnouncementService.resetToDemoData();
    setAnnouncements(AnnouncementService.getAnnouncements());
    setStudent(AnnouncementService.getStudentProfile());
    setReports([]);
  };

  const handleUpdateRole = (role: 'student' | 'admin') => {
    const updated = { ...student, role };
    handleUpdateProfile(updated);
    if (role === 'admin') {
      setActiveTab('admin');
    } else if (activeTab === 'admin') {
      setActiveTab('dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#080C15] text-slate-100 flex flex-col">
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        student={student}
        onUpdateRole={handleUpdateRole}
        onOpenAIParser={() => setActiveTab('parser')}
        urgentCount={urgentCount}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main Body Layout */}
      {activeTab === 'landing' ? (
        <main className="flex-1">
          <LandingPage
            onExplore={() => setActiveTab('dashboard')}
            onOpenAIParser={() => setActiveTab('parser')}
            featuredAnnouncements={announcements}
            onSelectAnnouncement={handleSelectAnnouncement}
          />
        </main>
      ) : (
        <div className="flex-1 flex max-w-7xl w-full mx-auto">
          {/* Collapsible Left Sidebar */}
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            student={student}
            savedCount={savedCount}
            urgentCount={urgentCount}
          />

          {/* Core Content Area */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
            {activeTab === 'dashboard' && (
              <DashboardPage
                student={student}
                announcements={announcements}
                onSelectAnnouncement={handleSelectAnnouncement}
                onToggleBookmark={handleToggleBookmark}
                onShare={handleShare}
                onNavigateTab={setActiveTab}
              />
            )}

            {activeTab === 'feed' && (
              <CampusFeedPage
                announcements={announcements}
                onSelectAnnouncement={handleSelectAnnouncement}
                onToggleBookmark={handleToggleBookmark}
                onShare={handleShare}
                onRegisterQuick={(id) => handleRegister(id)}
              />
            )}

            {activeTab === 'parser' && (
              <AIParserPage
                existingAnnouncements={announcements}
                onPublishAnnouncement={handlePublishAnnouncement}
                onNavigateTab={setActiveTab}
              />
            )}

            {activeTab === 'calendar' && (
              <CalendarPage
                announcements={announcements}
                onSelectAnnouncement={handleSelectAnnouncement}
              />
            )}

            {activeTab === 'briefing' && (
              <WeeklyBriefingPage
                student={student}
                announcements={announcements}
                onSelectAnnouncement={handleSelectAnnouncement}
              />
            )}

            {activeTab === 'saved' && (
              <SavedEventsPage
                announcements={announcements}
                onSelectAnnouncement={handleSelectAnnouncement}
                onToggleBookmark={handleToggleBookmark}
                onShare={handleShare}
                onNavigateTab={setActiveTab}
              />
            )}

            {activeTab === 'profile' && (
              <ProfilePage
                student={student}
                onUpdateProfile={handleUpdateProfile}
                onResetDemoData={handleResetDemoData}
              />
            )}

            {activeTab === 'admin' && (
              <AdminPage
                announcements={announcements}
                reports={reports}
                onApproveNotice={handleApproveNotice}
                onDeleteNotice={handleDeleteNotice}
                onResolveReport={handleResolveReport}
                onCreateOfficialAnnouncement={handlePublishAnnouncement}
              />
            )}
          </main>
        </div>
      )}

      {/* Global Modals */}
      <EventModal
        announcement={selectedAnnouncement}
        onClose={() => setSelectedAnnouncement(null)}
        onToggleBookmark={handleToggleBookmark}
        onRegister={handleRegister}
        onOpenReport={handleOpenReport}
        onShare={(ann) => setShareTarget(ann)}
      />

      <ShareModal
        announcement={shareTarget}
        onClose={() => setShareTarget(null)}
      />

      <ReportModal
        announcement={reportTarget}
        onClose={() => setReportTarget(null)}
        onSubmitReport={handleSubmitReport}
      />
    </div>
  );
};

export default App;
