import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  GraduationCap, 
  Award, 
  CreditCard, 
  FolderOpen,
  FileText,
  Plus,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const categories = [
  {
    id: 1,
    title: "Academic Documents",
    count: 28,
    icon: GraduationCap,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
    description: "Transcripts, certificates, course materials",
    recentFiles: [
      "Transcript_Fall_2024.pdf",
      "Course_Registration.docx",
      "GPA_Report_2023.pdf"
    ],
    size: "45.2 MB"
  },
  {
    id: 2,
    title: "Certificates",
    count: 12,
    icon: Award,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950",
    description: "Achievement certificates, awards",
    recentFiles: [
      "Scholarship_Certificate.pdf",
      "Dean_List_Recognition.pdf",
      "Excellence_Award.pdf"
    ],
    size: "23.8 MB"
  },
  {
    id: 3,
    title: "Government IDs",
    count: 5,
    icon: CreditCard,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950",
    description: "ID cards, passports, licenses",
    recentFiles: [
      "Student_ID_Card.jpg",
      "Birth_Certificate.pdf",
      "Passport_Copy.jpg"
    ],
    size: "12.4 MB"
  },
  {
    id: 4,
    title: "Others",
    count: 2,
    icon: FolderOpen,
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950",
    description: "Miscellaneous documents",
    recentFiles: [
      "Internship_Offer.pdf",
      "Recommendation_Letter.pdf"
    ],
    size: "3.1 MB"
  }
];

interface CategoryPageProps {
  onNavigateToDocuments: () => void;
}

export function Categories({ onNavigateToDocuments }: CategoryPageProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Categories</h1>
          <p className="text-muted-foreground">
            Organize your documents by category for easy access
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create Category
        </Button>
      </div>

      {/* Category Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${category.bgColor}`}>
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={onNavigateToDocuments}>
                      View Documents
                    </DropdownMenuItem>
                    <DropdownMenuItem>Edit Category</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Delete Category
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <h3 className="font-semibold mb-2">{category.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
              <div className="flex items-center justify-between text-sm">
                <Badge variant="secondary">{category.count} files</Badge>
                <span className="text-muted-foreground">{category.size}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Category Cards */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Category Details</h2>
        
        {categories.map((category) => (
          <Card key={`detail-${category.id}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${category.bgColor}`}>
                    <category.icon className={`w-5 h-5 ${category.color}`} />
                  </div>
                  <div>
                    <CardTitle>{category.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{category.count} files</Badge>
                  <Badge variant="outline">{category.size}</Badge>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={onNavigateToDocuments}
                  >
                    View All
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <h4 className="font-medium mb-3">Recent Files</h4>
                <div className="space-y-2">
                  {category.recentFiles.map((fileName, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm flex-1">{fileName}</span>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
                {category.count > 3 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-2"
                    onClick={onNavigateToDocuments}
                  >
                    Show {category.count - 3} more files
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Storage Usage Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Storage Usage by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.map((category) => {
              const percentage = parseFloat(category.size) / 84.5 * 100; // Total is sum of all sizes
              return (
                <div key={`storage-${category.id}`} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded ${category.bgColor.replace('50', '200').replace('950', '800')}`} />
                      <span>{category.title}</span>
                    </div>
                    <span>{category.size}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
            <div className="flex justify-between text-sm font-medium pt-2 border-t">
              <span>Total Used</span>
              <span>84.5 MB of 2 GB</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}