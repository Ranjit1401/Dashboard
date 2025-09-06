import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { DashboardOverview } from "./components/DashboardOverview";
import { UploadSection } from "./components/UploadSection";
import { RecentDocuments } from "./components/RecentDocuments";
import { CategoryCards } from "./components/CategoryCards";
import { StudentProfile } from "./components/StudentProfile";
import { Route,Routes } from 'react-router-dom';
import { ProfilePage } from "./components/ProfilePage";
import React from "react";

export default function App() {
  return (
    
    <div className="flex h-screen ">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col ">
        {/* Header */}
        <Header />
        
        {/* Dashboard Content */}
        <main className="flex-1 p-6 space-y-6 overflow-auto">
        <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path='/profile' element={<ProfilePage/>}/>
          </Routes>
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold mb-2">Welcome back, Sarah!</h1>
            <p className="text-muted-foreground">
              Manage your academic documents securely in one place.
            </p>
          </div>

          {/* Overview Cards */}
          {/* <DashboardOverview /> */}

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="xl:col-span-2 space-y-6">
              {/* Upload Section */}
              <UploadSection />
              
              {/* Recent Documents */}
              <RecentDocuments />
            </div>

            {/* Right Column - Sidebar Content */}
            <div className="space-y-6">
              {/* Student Profile */}
              <StudentProfile />
            </div>
          </div>

          {/* Category Cards */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Browse by Category</h2>
            <CategoryCards />
          </div>
          
        </main>
      </div>
      
    </div>
  );
}