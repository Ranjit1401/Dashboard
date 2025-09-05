import { AlertCircle, Clock, CheckCircle, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Notification } from './types';
import { memo } from 'react';

interface NotificationsSectionProps {
  notifications?: Notification[];
  onMarkAsRead?: (id: number) => void;
}

const defaultNotifications: Notification[] = [
  {
    id: 1,
    type: "warning",
    title: "ID Card Expiring Soon",
    message: "Your student ID card expires on March 15, 2025",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "info", 
    title: "New Certificate Added",
    message: "Your Web Development Certificate has been verified",
    time: "1 day ago",
    read: false,
  },
  {
    id: 3,
    type: "info",
    title: "Storage Reminder",
    message: "You've used 10% of your 2GB storage limit",
    time: "3 days ago",
    read: true,
  },
];

function getNotificationIcon(type: Notification['type']) {
  switch (type) {
    case "warning":
      return AlertCircle;
    case "success":
      return CheckCircle;
    default:
      return Info;
  }
}

function getNotificationStyle(type: Notification['type']) {
  switch (type) {
    case "warning":
      return {
        iconColor: "text-yellow-600 dark:text-yellow-400",
        badgeVariant: "destructive" as const,
      };
    case "success":
      return {
        iconColor: "text-green-600 dark:text-green-400", 
        badgeVariant: "default" as const,
      };
    default:
      return {
        iconColor: "text-blue-600 dark:text-blue-400",
        badgeVariant: "secondary" as const,
      };
  }
}

export const NotificationsSection = memo(function NotificationsSection({ 
  notifications = defaultNotifications,
  onMarkAsRead
}: NotificationsSectionProps) {
  const unreadCount = notifications.filter(n => !n.read).length;
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Notifications</CardTitle>
          {unreadCount > 0 && (
            <Badge variant="secondary">{unreadCount} new</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type);
            const style = getNotificationStyle(notification.type);
            
            return (
              <div 
                key={notification.id} 
                className={`flex gap-3 p-3 rounded-lg border transition-colors group cursor-pointer ${
                  notification.read 
                    ? 'bg-card hover:bg-accent/50' 
                    : 'bg-accent/30 hover:bg-accent/50 border-primary/20'
                }`}
                onClick={() => !notification.read && onMarkAsRead?.(notification.id)}
              >
                <Icon className={`h-5 w-5 ${style.iconColor} flex-shrink-0 mt-0.5`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <p className={`text-sm ${notification.read ? 'font-normal' : 'font-medium'}`}>
                      {notification.title}
                    </p>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1"></div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    {!notification.read && onMarkAsRead && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-6 px-2 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          onMarkAsRead(notification.id);
                        }}
                      >
                        Mark as read
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
});