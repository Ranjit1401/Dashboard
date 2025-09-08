import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Dashboard } from "./components/pages/Dashboard";
import { MyDocuments } from "./components/pages/MyDocuments";
import { Upload } from "./components/pages/Upload";
import { Certificates } from "./components/pages/Certificates";
import { Categories } from "./components/pages/Categories";
import { Profile } from "./components/pages/Profile";
import { Settings } from "./components/pages/Settings";

export default function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "documents":
        return <MyDocuments />;
      case "upload":
        return <Upload />;
      case "certificates":
        return <Certificates />;
      case "categories":
        return <Categories onNavigateToDocuments={() => setCurrentPage("documents")} />;
      case "profile":
        return <Profile />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />
        
        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}