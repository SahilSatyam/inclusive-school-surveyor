
import { useState } from "react";
import { UploadCloud, File, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

type FileUploadProps = {
  onFileUpload: (file: File) => void;
};

const FileUpload = ({ onFileUpload }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const { toast } = useToast();

  const isValidFileType = (file: File) => {
    const validTypes = [
      "application/pdf",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    return validTypes.includes(file.type);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    if (!isValidFileType(selectedFile)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or Excel file",
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);
    simulateUpload(selectedFile);
  };

  const simulateUpload = (file: File) => {
    // In a real implementation, you would replace this with actual API calls
    setUploadStatus("uploading");
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus("success");
          onFileUpload(file);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const resetUpload = () => {
    setFile(null);
    setUploadProgress(0);
    setUploadStatus("idle");
  };

  return (
    <Card className="w-full max-w-3xl mx-auto p-6 border-2 border-dashed bg-white">
      {uploadStatus === "idle" ? (
        <div
          className={`flex flex-col items-center justify-center h-64 transition-all ${
            isDragging ? "bg-primary/10 border-primary" : "bg-gray-50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <UploadCloud className="h-16 w-16 text-primary mb-4" />
          <h3 className="text-lg font-medium mb-2">Upload Survey File</h3>
          <p className="text-sm text-gray-500 mb-4 text-center">
            Drag and drop your PDF or Excel file here, or click to browse
          </p>
          <div className="flex flex-col items-center">
            <label htmlFor="file-upload">
              <Button variant="default" className="cursor-pointer" asChild>
                <span>Choose File</span>
              </Button>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".pdf,.xls,.xlsx"
                onChange={handleFileInput}
              />
            </label>
            <p className="text-xs text-gray-400 mt-2">
              Supported formats: PDF, Excel
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="flex items-center space-x-3 mb-4">
            <File className="h-8 w-8 text-primary" />
            <div className="text-left">
              <p className="font-medium truncate w-56">{file?.name}</p>
              <p className="text-xs text-gray-500">
                {file?.size ? (file.size / 1024).toFixed(2) + " KB" : ""}
              </p>
            </div>
          </div>

          {uploadStatus === "uploading" && (
            <div className="w-full max-w-sm mb-4">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-xs text-center mt-1">
                Uploading... {uploadProgress}%
              </p>
            </div>
          )}

          {uploadStatus === "success" && (
            <div className="flex items-center text-success mb-4">
              <CheckCircle2 className="mr-2 h-5 w-5" />
              <span>Upload complete</span>
            </div>
          )}

          {uploadStatus === "error" && (
            <div className="flex items-center text-destructive mb-4">
              <AlertCircle className="mr-2 h-5 w-5" />
              <span>Upload failed</span>
            </div>
          )}

          <div className="flex space-x-2 mt-2">
            {uploadStatus === "success" ? (
              <Button variant="outline" onClick={resetUpload}>
                Upload Another File
              </Button>
            ) : (
              <Button variant="destructive" onClick={resetUpload}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

export default FileUpload;
