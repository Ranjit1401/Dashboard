// Shared TypeScript interfaces for the dashboard
import React from "react";


export interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'image' | 'other';
  size: string;
  uploadDate: string;
  category: 'Academic' | 'Certificates' | 'ID Documents' | 'Others';
}

export interface Notification {
  id: number;
  type: 'warning' | 'info' | 'success';
  title: string;
  message: string;
  time: string;
  read?: boolean;
}

export interface OverviewStats {
  totalDocuments: number;
  certificates: number;
  recentUploads: number;
  storageUsed: {
    used: number;
    total: number;
    unit: 'MB' | 'GB';
  };
}

export interface StudentInfo {
  name: string;
  enrollmentId: string;
  course: string;
  year: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface CategoryInfo {
  name: string;
  count: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  iconColor: string;
}