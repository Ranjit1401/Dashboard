import { 
  Home, 
  FileText, 
  Upload, 
  Award, 
  FolderOpen, 
  User, 
  Settings, 
  LogOut,
  GraduationCap
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "./ui/utils";

interface NavigationItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
}

const navigationItems: NavigationItem[] = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: FileText, label: "My Documents" },
  { icon: Upload, label: "Upload" },
  { icon: Award, label: "Certificates" },
  { icon: FolderOpen, label: "Categories" },
  { icon: User, label: "Profile" },
  { icon: Settings, label: "Settings" },
];

interface DashboardSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

export function DashboardSidebar({ 
  isOpen = true, 
  onClose, 
  className 
}: DashboardSidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && onClose && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "flex h-full w-64 flex-col bg-sidebar border-sidebar-border border-r transition-transform duration-300 ease-in-out",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "fixed lg:static inset-y-0 left-0 z-50",
          className
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
              <GraduationCap className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <span className="font-semibold text-sidebar-foreground">DocLocker</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4" role="navigation">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.label}
                variant={item.active ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-11 text-sidebar-foreground",
                  item.active 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                    : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
                aria-current={item.active ? "page" : undefined}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-sidebar-border">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 h-11 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}