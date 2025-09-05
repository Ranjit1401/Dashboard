import { FileText, Award, Upload, HardDrive } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { OverviewStats } from './types';
import { memo } from 'react';

interface OverviewCardsProps {
  stats?: OverviewStats;
}

const defaultStats: OverviewStats = {
  totalDocuments: 24,
  certificates: 8,
  recentUploads: 5,
  storageUsed: {
    used: 200,
    total: 2048,
    unit: 'MB'
  }
};

const overviewData = [
];

function getOverviewData(stats: OverviewStats) {
  const storagePercent = Math.round((stats.storageUsed.used / stats.storageUsed.total) * 100);
  
  return [
    {
      title: "Total Documents",
      value: stats.totalDocuments.toString(),
      icon: FileText,
      change: "+3 this week",
      changeType: "positive" as const,
    },
    {
      title: "Certificates",
      value: stats.certificates.toString(),
      icon: Award,
      change: "+1 this month",
      changeType: "positive" as const,
    },
    {
      title: "Recent Uploads",
      value: stats.recentUploads.toString(),
      icon: Upload,
      change: "Last 7 days",
      changeType: "neutral" as const,
    },
    {
      title: "Storage Used",
      value: `${stats.storageUsed.used}${stats.storageUsed.unit}`,
      subtitle: `of ${Math.floor(stats.storageUsed.total / (stats.storageUsed.unit === 'MB' ? 1024 : 1))}GB`,
      icon: HardDrive,
      change: `${storagePercent}% used`,
      changeType: "neutral" as const,
    },
  ];
}

export const OverviewCards = memo(function OverviewCards({ stats = defaultStats }: OverviewCardsProps) {
  const overviewData = getOverviewData(stats);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {overviewData.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {item.value}
                {item.subtitle && (
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    {item.subtitle}
                  </span>
                )}
              </div>
              <p className={`text-xs ${
                item.changeType === 'positive' 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-muted-foreground'
              }`}>
                {item.change}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
});