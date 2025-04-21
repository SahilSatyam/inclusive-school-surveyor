import { useState } from "react";
import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";
import SurveyResults from "@/components/SurveyResults";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

// Mock data for demonstration
const MOCK_RESULTS = {
  overallScore: 72,
  categories: [
    { name: "Identification and Screening", score: 85, color: "#3B82F6" },
    { name: "Remedial Support and Accomodations", score: 62, color: "#8B5CF6" },
    { name: "Inclusive Teaching", score: 78, color: "#10B981" },
    { name: "Inclusive Assessments", score: 65, color: "#F59E0B" },
    { name: "Leveraging Technology", score: 70, color: "#EC4899" },
  ],
  recommendations: [
    "Implement systematic screening processes to identify students with learning needs early",
    "Develop personalized support plans for students requiring accommodations",
    "Train teachers in differentiated instruction techniques for diverse learners",
    "Create assessment methods that accommodate various learning styles and abilities",
    "Integrate assistive technologies into the classroom environment",
    "Establish a peer support system for students with special needs",
    "Conduct regular progress monitoring for students with identified needs",
    "Provide professional development on inclusive teaching strategies",
    "Use technology to create accessible learning materials for all students"
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-20">
            School Inclusion Survey Tool
          </h1>
          <p className="mt-6 text-xl text-gray-600 leading-relaxed">
            Upload your school survey to assess inclusivity readiness and receive tailored recommendations
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Quick Analysis</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Instant Results</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>PDF Export</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {!results && !isProcessing && (
            <FileUpload onFileUpload={handleFileUpload} />
          )}
          
          {file && !results && !isProcessing && (
            <div className="w-full max-w-3xl mx-auto mt-8 flex justify-center">
              <Button 
                onClick={processFile} 
                disabled={isProcessing}
                className="px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isProcessing ? "Processing..." : "Process Survey"}
              </Button>
            </div>
          )}
          
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-3xl mx-auto"
            >
              <SurveyResults results={null} isLoading={true} onExportPdf={handleExportToPdf} />
            </motion.div>
          )}
          
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Separator className="my-12" />
              <SurveyResults results={results} isLoading={false} onExportPdf={handleExportToPdf} />
              <div className="w-full max-w-3xl mx-auto mt-8 flex justify-center gap-4">
                <Button 
                  variant="outline" 
                  onClick={resetSurvey}
                  className="px-8 py-6 text-lg"
                >
                  Analyze Another Survey
                </Button>
                <Button 
                  onClick={handleExportToPdf}
                  className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Export to PDF
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-3xl mx-auto mt-16 text-center bg-gray-50 p-8 rounded-xl shadow-sm"
        >
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">About Inclusive School Surveys</h3>
          <p className="text-gray-600 leading-relaxed">
            Our assessment tool helps schools evaluate their readiness to support both typically 
            developing students and those with special needs. By analyzing your survey data, 
            we provide targeted recommendations to enhance inclusion across your school environment.
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
