import { FileText, File, Image, Download, Eye, Trash2, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "./ui/dropdown-menu";
import { Document } from './types';
import { memo } from 'react';

interface RecentDocumentsProps {
  documents?: Document[];
  onDelete?: (id: string) => void;
  onView?: (document: Document) => void;
  onDownload?: (document: Document) => void;
}

const defaultDocuments: Document[] = [
  {
    id: "1",
    name: "Academic_Transcript_2024.pdf",
    type: "pdf",
    size: "2.3 MB",
    uploadDate: "2 days ago",
    category: "Academic",
  },
  {
    id: "2",
    name: "Student_ID_Card.jpg",
    type: "image",
    size: "1.8 MB", 
    uploadDate: "1 week ago",
    category: "ID Documents",
  },
  {
    id: "3",
    name: "Certificate_Web_Development.pdf",
    type: "pdf",
    size: "1.2 MB",
    uploadDate: "1 week ago", 
    category: "Certificates",
  },
  {
    id: "4",
    name: "Assignment_Report.docx",
    type: "doc",
    size: "856 KB",
    uploadDate: "2 weeks ago",
    category: "Academic",
  },
  {
    id: "5",
    name: "Internship_Offer_Letter.pdf",
    type: "pdf", 
    size: "534 KB",
    uploadDate: "3 weeks ago",
    category: "Others",
  },
];

function getFileIcon(type: Document['type']) {
  switch (type) {
    case "pdf":
      return <FileText className="h-5 w-5 text-red-500" />;
    case "doc":
      return <File className="h-5 w-5 text-blue-500" />;
    case "image":
      return <Image className="h-5 w-5 text-green-500" />;
    default:
      return <FileText className="h-5 w-5 text-gray-500" />;
  }
}

function getCategoryColor(category: Document['category']) {
  switch (category) {
    case "Academic":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "Certificates":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "ID Documents":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
}

export const RecentDocuments = memo(function RecentDocuments({ 
  documents = defaultDocuments,
  onDelete,
  onView,
  onDownload
}: RecentDocumentsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Documents</CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors group">
              <div className="flex items-center gap-3">
                {getFileIcon(doc.type)}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{doc.name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{doc.size}</span>
                    <span>•</span>
                    <span>{doc.uploadDate}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getCategoryColor(doc.category)}>
                  {doc.category}
                </Badge>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onView?.(doc)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDownload?.(doc)}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive"
                      onClick={() => onDelete?.(doc.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});