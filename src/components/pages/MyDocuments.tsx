import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { 
  FileText, 
  Image, 
  File, 
  Eye, 
  Download, 
  Trash2,
  MoreHorizontal,
  Search,
  Filter,
  Grid3X3,
  List
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";

const allDocuments = [
  {
    id: 1,
    name: "Transcript_Fall_2024.pdf",
    type: "PDF",
    size: "2.3 MB",
    uploadDate: "2024-01-15",
    category: "Academic",
    icon: FileText,
    color: "text-red-600"
  },
  {
    id: 2,
    name: "Student_ID_Card.jpg",
    type: "Image",
    size: "1.8 MB",
    uploadDate: "2024-01-14",
    category: "Government ID",
    icon: Image,
    color: "text-green-600"
  },
  {
    id: 3,
    name: "Scholarship_Certificate.pdf",
    type: "PDF",
    size: "945 KB",
    uploadDate: "2024-01-12",
    category: "Certificates",
    icon: FileText,
    color: "text-red-600"
  },
  {
    id: 4,
    name: "Course_Registration.docx",
    type: "Document",
    size: "1.2 MB",
    uploadDate: "2024-01-10",
    category: "Academic",
    icon: File,
    color: "text-blue-600"
  },
  {
    id: 5,
    name: "Birth_Certificate.pdf",
    type: "PDF",
    size: "756 KB",
    uploadDate: "2024-01-08",
    category: "Government ID",
    icon: FileText,
    color: "text-red-600"
  },
  {
    id: 6,
    name: "Internship_Offer.pdf",
    type: "PDF",
    size: "1.5 MB",
    uploadDate: "2024-01-07",
    category: "Others",
    icon: FileText,
    color: "text-red-600"
  },
  {
    id: 7,
    name: "GPA_Report_2023.pdf",
    type: "PDF",
    size: "890 KB",
    uploadDate: "2024-01-05",
    category: "Academic",
    icon: FileText,
    color: "text-red-600"
  },
  {
    id: 8,
    name: "Passport_Copy.jpg",
    type: "Image",
    size: "2.1 MB",
    uploadDate: "2024-01-03",
    category: "Government ID",
    icon: Image,
    color: "text-green-600"
  }
];

export function MyDocuments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = ["All", "Academic", "Certificates", "Government ID", "Others"];

  const filteredDocuments = allDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold mb-2">My Documents</h1>
        <p className="text-muted-foreground">
          Manage and organize all your uploaded documents
        </p>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Category Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="w-4 h-4" />
                    {selectedCategory}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* View Mode Toggle */}
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Display */}
      <Card>
        <CardHeader>
          <CardTitle>
            Documents ({filteredDocuments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocuments.map((doc) => (
                <div key={doc.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <doc.icon className={`w-6 h-6 ${doc.color}`} />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="w-8 h-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <h3 className="font-medium mb-2 truncate">{doc.name}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{doc.size}</span>
                      <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {doc.category}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <doc.icon className={`w-5 h-5 ${doc.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{doc.name}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{doc.size}</span>
                      <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
                      <Badge variant="secondary" className="text-xs">
                        {doc.category}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="w-8 h-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          )}

          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No documents found</h3>
              <p className="text-sm text-muted-foreground">
                {searchTerm || selectedCategory !== "All" 
                  ? "Try adjusting your search or filter criteria"
                  : "Upload your first document to get started"
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}