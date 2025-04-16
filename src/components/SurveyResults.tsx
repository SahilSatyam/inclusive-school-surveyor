
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, FilePdf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type SurveyResultsProps = {
  results: SurveyResultData | null;
  isLoading: boolean;
  onExportPdf: () => void;
};

// This would be replaced with actual types from your backend API
type SurveyResultData = {
  overallScore: number;
  categories: {
    name: string;
    score: number;
    color: string;
  }[];
  recommendations: string[];
};

const SurveyResults = ({ results, isLoading, onExportPdf }: SurveyResultsProps) => {
  const { toast } = useToast();

  if (isLoading) {
    return (
      <Card className="w-full max-w-3xl mx-auto p-6 mt-8">
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="h-24 bg-gray-200 rounded"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (!results) {
    return null;
  }

  return (
    <Card className="w-full max-w-3xl mx-auto p-6 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Survey Results</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onExportPdf}
          className="flex items-center gap-2"
        >
          <FilePdf className="h-4 w-4" />
          Export to PDF
        </Button>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-6 mb-4">
              <span className="text-4xl font-bold text-primary">
                {results.overallScore}%
              </span>
            </div>
            <h3 className="text-xl font-medium">Inclusivity Readiness Score</h3>
            <p className="text-gray-500 mt-2">
              Overall readiness assessment based on survey responses
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            {results.categories.map((category, index) => (
              <div 
                key={index}
                className="flex flex-col items-center p-4 rounded-lg"
                style={{ backgroundColor: `${category.color}10` }}
              >
                <span 
                  className="text-xl font-bold"
                  style={{ color: category.color }}
                >
                  {category.score}%
                </span>
                <span className="text-sm text-center">{category.name}</span>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="categories" className="mt-4">
          <div className="space-y-4">
            {results.categories.map((category, index) => (
              <div key={index} className="p-4 rounded-lg border">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{category.name}</h4>
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: `${category.color}20`,
                      color: category.color
                    }}
                  >
                    {category.score}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full"
                    style={{ 
                      width: `${category.score}%`,
                      backgroundColor: category.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="recommendations" className="mt-4">
          <div className="space-y-4">
            {results.recommendations.length > 0 ? (
              results.recommendations.map((recommendation, index) => (
                <div key={index} className="p-4 rounded-lg border">
                  <div className="flex items-start">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold mr-3">
                      {index + 1}
                    </span>
                    <p>{recommendation}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center p-8 text-center text-gray-500">
                <div>
                  <AlertCircle className="mx-auto h-10 w-10 text-gray-400 mb-4" />
                  <p>No recommendations available</p>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default SurveyResults;
