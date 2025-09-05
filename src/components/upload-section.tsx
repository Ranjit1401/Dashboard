import { Plus, Upload, FileText } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useState, useCallback, memo } from "react";
import React from "react";


interface UploadSectionProps {
  onUpload?: (files: FileList) => void;
  maxFileSize?: number; // in MB
  maxFiles?: number;
  acceptedTypes?: string[];
}

export const UploadSection = memo(function UploadSection({ 
  onUpload,
  maxFileSize = 10,
  maxFiles = 5,
  acceptedTypes = ['.pdf', '.doc', '.docx', '.jpg', '.png']
}: UploadSectionProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files && onUpload) {
      onUpload(files);
    }
  }, [onUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && onUpload) {
      onUpload(files);
    }
  }, [onUpload]);
  return (
    <Card 
      className={`border-2 border-dashed transition-all duration-200 ${
        isDragOver 
          ? 'border-primary bg-primary/5 scale-[1.01]' 
          : 'border-muted-foreground/25 hover:border-muted-foreground/50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className={`rounded-full p-4 mb-4 transition-colors ${
          isDragOver ? 'bg-primary/10' : 'bg-muted'
        }`}>
          <Upload className={`h-8 w-8 ${
            isDragOver ? 'text-primary' : 'text-muted-foreground'
          }`} />
        </div>
        
        <h3 className="font-semibold mb-2">Upload New Document</h3>
        <p className="text-muted-foreground text-center mb-6 max-w-sm">
          Drag and drop your files here or click to browse. Supported formats: {acceptedTypes.join(', ').toUpperCase()}
        </p>
        
        <div className="relative">
          <input
            type="file"
            multiple
            accept={acceptedTypes.join(',')}
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Choose files to upload"
          />
          <Button size="lg" className="gap-2 pointer-events-none">
            <Plus className="h-4 w-4" />
            Choose Files
          </Button>
        </div>
        
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <FileText className="h-3 w-3" />
            <span>Max {maxFileSize}MB per file</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground"></div>
          <span>Up to {maxFiles} files at once</span>
        </div>
      </CardContent>
    </Card>
  );
});