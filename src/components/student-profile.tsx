import { User, Mail, Phone, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

export function StudentProfile() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="" />
            <AvatarFallback className="text-lg">SJ</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">Sarah Johnson</h3>
            <p className="text-sm text-muted-foreground">CS-2024-001</p>
            <Badge variant="secondary" className="mt-1">
              Active
            </Badge>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>Computer Science Engineering</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>3rd Year • 2024-2025</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>sarah.j@university.edu</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>+1 (555) 123-4567</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}