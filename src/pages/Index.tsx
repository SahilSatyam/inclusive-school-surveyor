
import { useState } from "react";
import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";
import SurveyResults from "@/components/SurveyResults";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

// Mock data for demonstration
const MOCK_RESULTS = {
  overallScore: 72,
  categories: [
    { name: "Physical Accessibility", score: 85, color: "#3B82F6" },
    { name: "Staff Training", score: 62, color: "#8B5CF6" },
    { name: "Curriculum Adaptation", score: 78, color: "#10B981" },
    { name: "Support Services", score: 65, color: "#F59E0B" },
  ],
  recommendations: [
    "Improve wheelchair accessibility at all entrances to meet ADA standards",
    "Implement regular inclusivity training sessions for all staff members",
    "Develop more adaptive learning materials for various learning styles",
    "Establish a dedicated resource room with assistive technologies",
    "Create a peer buddy system to support inclusion during social activities"
  ]
};

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<typeof MOCK_RESULTS | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    // Reset results when a new file is uploaded
    setResults(null);
  };

  const processFile = () => {
    if (!file) return;
    
    setIsProcessing(true);
    
    // Simulate backend processing
    // In a real implementation, you would send the file to your backend
    setTimeout(() => {
      setResults(MOCK_RESULTS);
      setIsProcessing(false);
      toast({
        title: "Survey Processed",
        description: "Your survey file has been analyzed successfully.",
      });
    }, 3000);
  };

  const resetSurvey = () => {
    setFile(null);
    setResults(null);
    setIsProcessing(false);
  };

  const handleExportToPdf = () => {
    // In a real implementation, this would generate a PDF of the results
    // For now, we'll just show a toast message
    toast({
      title: "Export Started",
      description: "Your survey results are being exported to PDF.",
    });
    
    // Simulate PDF generation delay
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Survey results have been exported to PDF successfully.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight">School Inclusion Survey Tool</h2>
          <p className="mt-4 text-lg text-gray-600">
            Upload your school survey to assess inclusivity readiness and receive tailored recommendations
          </p>
        </div>
        
        {!results && !isProcessing && (
          <FileUpload onFileUpload={handleFileUpload} />
        )}
        
        {file && !results && !isProcessing && (
          <div className="w-full max-w-3xl mx-auto mt-4 flex justify-center">
            <Button 
              onClick={processFile} 
              disabled={isProcessing}
              className="px-8"
            >
              {isProcessing ? "Processing..." : "Process Survey"}
            </Button>
          </div>
        )}
        
        {isProcessing && (
          <SurveyResults results={null} isLoading={true} onExportPdf={handleExportToPdf} />
        )}
        
        {results && (
          <>
            <Separator className="my-8" />
            <SurveyResults results={results} isLoading={false} onExportPdf={handleExportToPdf} />
            <div className="w-full max-w-3xl mx-auto mt-6 flex justify-center">
              <Button 
                variant="outline" 
                onClick={resetSurvey}
                className="px-8"
              >
                Analyze Another Survey
              </Button>
            </div>
          </>
        )}
        
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <h3 className="text-xl font-medium mb-4">About Inclusive School Surveys</h3>
          <p className="text-gray-600">
            Our assessment tool helps schools evaluate their readiness to support both typically 
            developing students and those with special needs. By analyzing your survey data, 
            we provide targeted recommendations to enhance inclusion across your school environment.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
