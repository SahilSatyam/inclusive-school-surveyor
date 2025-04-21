import { useState } from "react";
import { UploadCloud, File, AlertCircle, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";

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
    <Card className="w-full max-w-3xl mx-auto p-6 border-2 border-dashed bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <AnimatePresence mode="wait">
        {uploadStatus === "idle" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`flex flex-col items-center justify-center h-72 transition-all duration-300 ${
              isDragging ? "bg-primary/5 border-primary scale-105" : "bg-gray-50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <motion.div
              animate={{ scale: isDragging ? 1.1 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <UploadCloud className="h-20 w-20 text-primary mb-6" />
            </motion.div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Upload Survey File</h3>
            <p className="text-sm text-gray-500 mb-6 text-center max-w-md">
              Drag and drop your PDF or Excel file here, or click to browse
            </p>
            <div className="flex flex-col items-center">
              <label htmlFor="file-upload">
                <Button 
                  variant="default" 
                  className="cursor-pointer px-8 py-6 text-lg shadow-md hover:shadow-lg transition-all duration-200"
                  asChild
                >
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
              <p className="text-xs text-gray-400 mt-3">
                Supported formats: PDF, Excel
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center h-72"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <File className="h-10 w-10 text-primary" />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-primary text-white rounded-full p-1"
                >
                  <X className="h-3 w-3" />
                </motion.div>
              </div>
              <div className="text-left">
                <p className="font-medium truncate w-64 text-gray-800">{file?.name}</p>
                <p className="text-sm text-gray-500">
                  {file?.size ? (file.size / 1024).toFixed(2) + " KB" : ""}
                </p>
              </div>
            </div>

            {uploadStatus === "uploading" && (
              <div className="w-full max-w-sm mb-6">
                <Progress value={uploadProgress} className="h-2" />
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-center mt-2 text-gray-600"
                >
                  Uploading... {uploadProgress}%
                </motion.p>
              </div>
            )}

            {uploadStatus === "success" && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center text-success mb-6"
              >
                <CheckCircle2 className="mr-2 h-6 w-6" />
                <span className="text-lg font-medium">Upload complete</span>
              </motion.div>
            )}

            {uploadStatus === "error" && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center text-destructive mb-6"
              >
                <AlertCircle className="mr-2 h-6 w-6" />
                <span className="text-lg font-medium">Upload failed</span>
              </motion.div>
            )}

            <div className="flex space-x-3 mt-2">
              {uploadStatus === "success" ? (
                <Button 
                  variant="outline" 
                  onClick={resetUpload}
                  className="px-6 py-5 text-base hover:bg-gray-100"
                >
                  Upload Another File
                </Button>
              ) : (
                <Button 
                  variant="destructive" 
                  onClick={resetUpload}
                  className="px-6 py-5 text-base"
                >
                  Cancel
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default FileUpload;
