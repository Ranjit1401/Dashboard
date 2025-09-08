import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { 
  Upload as UploadIcon, 
  Plus, 
  X, 
  FileText, 
  Image, 
  File,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useState } from "react";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  status: 'uploading' | 'success' | 'error';
  progress: number;
}

export function Upload() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");

  const categories = [
    "Academic Documents",
    "Certificates", 
    "Government IDs",
    "Others"
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const fileId = Math.random().toString(36).substr(2, 9);
      const newFile: UploadedFile = {
        id: fileId,
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        type: file.type.includes('image') ? 'image' : file.type.includes('pdf') ? 'pdf' : 'document',
        status: 'uploading',
        progress: 0
      };

      setUploadedFiles(prev => [...prev, newFile]);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadedFiles(prev => prev.map(f => {
          if (f.id === fileId) {
            const newProgress = f.progress + Math.random() * 30;
            if (newProgress >= 100) {
              clearInterval(interval);
              return { ...f, progress: 100, status: 'success' };
            }
            return { ...f, progress: newProgress };
          }
          return f;
        }));
      }, 500);
    });
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="w-5 h-5 text-green-600" />;
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-600" />;
      default:
        return <File className="w-5 h-5 text-blue-600" />;
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Uploading files with category:', selectedCategory, 'and description:', description);
    // Reset form
    setUploadedFiles([]);
    setSelectedCategory("");
    setDescription("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold mb-2">Upload Documents</h1>
        <p className="text-muted-foreground">
          Securely upload your academic documents, certificates, and important files
        </p>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Select Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-primary bg-primary/5' 
                : 'border-muted-foreground/25 hover:border-muted-foreground/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <UploadIcon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {dragActive ? 'Drop files here' : 'Drag and drop your files'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  or click to browse from your device
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports PDF, DOC, DOCX, JPG, PNG up to 10MB each
                </p>
              </div>
              <div>
                <input
                  type="file"
                  multiple
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <label htmlFor="file-upload">
                  <Button className="gap-2" asChild>
                    <span>
                      <Plus className="w-4 h-4" />
                      Choose Files
                    </span>
                  </Button>
                </label>
              </div>
            </div>
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="mt-6 space-y-3">
              <h4 className="font-medium">Uploaded Files ({uploadedFiles.length})</h4>
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="flex-shrink-0">
                    {getFileIcon(file.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-sm text-muted-foreground">{file.size}</p>
                    {file.status === 'uploading' && (
                      <div className="w-full bg-muted rounded-full h-2 mt-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all" 
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {file.status === 'success' && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                    {file.status === 'error' && (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(file.id)}
                      className="w-8 h-8"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Document Details */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Document Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Add a description for these documents..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                onClick={handleSubmit}
                disabled={!selectedCategory || uploadedFiles.some(f => f.status === 'uploading')}
                className="flex-1"
              >
                Upload {uploadedFiles.length} {uploadedFiles.length === 1 ? 'Document' : 'Documents'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setUploadedFiles([]);
                  setSelectedCategory("");
                  setDescription("");
                }}
              >
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Supported File Types</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• PDF documents (.pdf)</li>
                <li>• Microsoft Word (.doc, .docx)</li>
                <li>• Images (.jpg, .jpeg, .png)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">File Requirements</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Maximum file size: 10MB</li>
                <li>• Clear, readable documents</li>
                <li>• No password-protected files</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}