import { HardDrive } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";

export function StorageUsage() {
  const usedStorage = 200; // MB
  const totalStorage = 2048; // MB (2GB)
  const usagePercentage = (usedStorage / totalStorage) * 100;

  const formatStorage = (mb: number) => {
    if (mb >= 1024) {
      return `${(mb / 1024).toFixed(1)} GB`;
    }
    return `${mb} MB`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HardDrive className="h-5 w-5" />
          Storage Usage
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{formatStorage(usedStorage)} used</span>
            <span>{formatStorage(totalStorage)} total</span>
          </div>
          <Progress value={usagePercentage} className="h-2" />
          <p className="text-xs text-muted-foreground text-center">
            {usagePercentage.toFixed(1)}% of storage used
          </p>
        </div>
        
        <div className="space-y-2 pt-2 border-t">
          <div className="flex justify-between items-center text-sm">
            <span>Documents</span>
            <span className="text-muted-foreground">150 MB</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Images</span>
            <span className="text-muted-foreground">35 MB</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Other files</span>
            <span className="text-muted-foreground">15 MB</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}