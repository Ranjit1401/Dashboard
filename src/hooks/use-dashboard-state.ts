import { useState, useCallback, useEffect } from 'react';
import { Document, Notification } from '../components/types';

// Mock data for demonstration
const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Academic_Transcript_2024.pdf',
    type: 'pdf',
    size: '2.3 MB',
    uploadDate: '2 days ago',
    category: 'Academic',
  },
  {
    id: '2',
    name: 'Student_ID_Card.jpg',
    type: 'image',
    size: '1.8 MB',
    uploadDate: '1 week ago',
    category: 'ID Documents',
  },
  {
    id: '3',
    name: 'Certificate_Web_Development.pdf',
    type: 'pdf',
    size: '1.2 MB',
    uploadDate: '1 week ago',
    category: 'Certificates',
  },
  {
    id: '4',
    name: 'Assignment_Report.docx',
    type: 'doc',
    size: '856 KB',
    uploadDate: '2 weeks ago',
    category: 'Academic',
  },
  {
    id: '5',
    name: 'Internship_Offer_Letter.pdf',
    type: 'pdf',
    size: '534 KB',
    uploadDate: '3 weeks ago',
    category: 'Others',
  },
];

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'warning',
    title: 'ID Card Expiring Soon',
    message: 'Your student ID card expires on March 15, 2025',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    type: 'info',
    title: 'New Certificate Added',
    message: 'Your Web Development Certificate has been verified',
    time: '1 day ago',
    read: false,
  },
  {
    id: 3,
    type: 'info',
    title: 'Storage Reminder',
    message: "You've used 10% of your 2GB storage limit",
    time: '3 days ago',
    read: true,
  },
];

export function useDashboardState() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Auto-close sidebar on mobile when window resizes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => {
      const newMode = !prev;
      document.documentElement.classList.toggle('dark', newMode);
      return newMode;
    });
  }, []);

  const markNotificationAsRead = useCallback((id: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  }, []);

  const deleteDocument = useCallback((id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  }, []);

  const addDocument = useCallback((document: Omit<Document, 'id'>) => {
    const newDocument: Document = {
      ...document,
      id: Date.now().toString(),
    };
    setDocuments(prev => [newDocument, ...prev]);
  }, []);

  const unreadNotifications = notifications.filter(n => !n.read);

  return {
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
  };
}