import { DashboardOverview } from "../DashboardOverview";
import { UploadSection } from "../UploadSection";
import { RecentDocuments } from "../RecentDocuments";
import { CategoryCards } from "../CategoryCards";
import { StudentProfile } from "../StudentProfile";

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Welcome back, Sarah!</h1>
        <p className="text-muted-foreground">
          Manage your academic documents securely in one place.
        </p>
      </div>

      {/* Overview Cards */}
      <DashboardOverview />

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
    </div>
  );
}