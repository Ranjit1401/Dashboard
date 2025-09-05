import { DashboardSidebar } from "./components/dashboard-sidebar";
import { TopBar } from "./components/top-bar";
import { OverviewCards } from "./components/overview-cards";
import { UploadSection } from "./components/upload-section";
import { RecentDocuments } from "./components/recent-documents";
import { CategoryCards } from "./components/category-cards";
import { StudentProfile } from "./components/student-profile";
import { NotificationsSection } from "./components/notifications-section";
import { StorageUsage } from "./components/storage-usage";
import { useDashboardState } from "./hooks/use-dashboard-state";
import { Document, OverviewStats } from "./components/types";
import { useCallback, useMemo } from "react";

export default function App() {
  const {
    documents,
    notifications,
    unreadNotifications,
    sidebarOpen,
    darkMode,
    toggleSidebar,
    toggleDarkMode,
    markNotificationAsRead,
    deleteDocument,
    addDocument,
  } = useDashboardState();

  // Calculate overview stats from documents
  const overviewStats: OverviewStats = useMemo(() => {
    const certificates = documents.filter(doc => doc.category === 'Certificates').length;
    const recentUploads = documents.filter(doc => 
      doc.uploadDate.includes('days ago') || doc.uploadDate.includes('week ago')
    ).length;

    return {
      totalDocuments: documents.length,
      certificates,
      recentUploads,
      storageUsed: {
        used: 200,
        total: 2048,
        unit: 'MB'
      }
    };
  }, [documents]);

  const handleUpload = useCallback((files: FileList) => {
    // Mock file upload - in real app this would upload to server
    Array.from(files).forEach((file) => {
      const document: Omit<Document, 'id'> = {
        name: file.name,
        type: file.type.includes('pdf') ? 'pdf' : 
              file.type.includes('doc') ? 'doc' :
              file.type.includes('image') ? 'image' : 'other',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadDate: 'Just now',
        category: 'Others'
      };
      addDocument(document);
    });
  }, [addDocument]);

  const handleViewDocument = useCallback((document: Document) => {
    // Mock document viewer - in real app this would open document
    console.log('Viewing document:', document.name);
  }, []);

  const handleDownloadDocument = useCallback((document: Document) => {
    // Mock download - in real app this would download the file
    console.log('Downloading document:', document.name);
  }, []);
  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <DashboardSidebar 
        isOpen={sidebarOpen}
        onClose={() => toggleSidebar()}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Top Bar */}
        <TopBar 
          onMenuClick={toggleSidebar}
          isDarkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
          notificationCount={unreadNotifications.length}
        />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 space-y-6">
            {/* Welcome Section */}
            <div className="space-y-1">
              <h1 className="tracking-tight">Welcome back, Sarah!</h1>
              <p className="text-muted-foreground">
                Manage your documents securely and efficiently
              </p>
            </div>

            {/* Overview Cards */}
            <OverviewCards stats={overviewStats} />

            {/* Main Grid Layout */}
            <div className="grid gap-6 xl:grid-cols-3">
              {/* Left Column - Main Content */}
              <div className="xl:col-span-2 space-y-6">
                {/* Upload Section */}
                <UploadSection onUpload={handleUpload} />
                
                {/* Recent Documents */}
                <RecentDocuments 
                  documents={documents.slice(0, 5)}
                  onDelete={deleteDocument}
                  onView={handleViewDocument}
                  onDownload={handleDownloadDocument}
                />
                
                {/* Category Cards */}
                <div className="space-y-4">
                  <h2>Document Categories</h2>
                  <CategoryCards />
                </div>
              </div>

              {/* Right Column - Sidebar Content */}
              <div className="space-y-6">
                {/* Student Profile */}
                <StudentProfile />
                
                {/* Storage Usage */}
                <StorageUsage />
                
                {/* Notifications */}
                <NotificationsSection 
                  notifications={notifications}
                  onMarkAsRead={markNotificationAsRead}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}