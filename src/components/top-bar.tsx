import { Search, Bell, Moon, Sun, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "./ui/dropdown-menu";
import { StudentInfo } from './types';

interface TopBarProps {
  onMenuClick?: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  notificationCount?: number;
  student?: StudentInfo;
}

export function TopBar({ 
  onMenuClick, 
  isDarkMode = false, 
  onToggleDarkMode,
  notificationCount = 0,
  student
}: TopBarProps) {

  const defaultStudent: StudentInfo = {
    name: "Sarah Johnson",
    enrollmentId: "CS-2024-001",
    course: "Computer Science Engineering",
    year: "3rd Year",
    email: "sarah.j@university.edu",
    phone: "+1 (555) 123-4567"
  };

  const studentInfo = student || defaultStudent;

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        {onMenuClick && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-4 w-4" />
          </Button>
        )}

        {/* Search Bar */}
        <div className="w-full max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search documents..." 
              className="pl-10 bg-input-background border-0 focus:ring-2 focus:ring-ring"
              aria-label="Search documents"
            />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 lg:gap-4">
        {/* Dark Mode Toggle */}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onToggleDarkMode}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-4 w-4" />
          {notificationCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center"
            >
              {notificationCount > 9 ? '9+' : notificationCount}
            </Badge>
          )}
        </Button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 px-2 lg:px-3" aria-label="Profile menu">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium truncate max-w-[120px]">{studentInfo.name}</p>
                <p className="text-xs text-muted-foreground">{studentInfo.enrollmentId}</p>
              </div>
              <Avatar className="h-8 w-8">
                <AvatarImage src={studentInfo.avatar} alt={studentInfo.name} />
                <AvatarFallback>
                  {studentInfo.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{studentInfo.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{studentInfo.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuItem>Help & Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}