import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, FileText, TrendingUp, BarChart2, Lightbulb, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";

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
      <Card className="w-full max-w-3xl mx-auto p-6 mt-8 shadow-lg">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="animate-pulse flex flex-col items-center w-full space-y-6">
            <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3 mb-6"></div>
            <div className="grid grid-cols-3 gap-4 w-full">
              <div className="h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
              <div className="h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
              <div className="h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-[66%]">
              <div className="h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
              <div className="h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-2 text-primary">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm font-medium">Processing your survey...</span>
          </div>
        </div>
      </Card>
    );
  }

  if (!results) {
    return null;
  }

  return (
    <Card className="w-full max-w-3xl mx-auto p-6 mt-8 shadow-lg">
      <div className="flex justify-center items-center mb-8">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Survey Results
        </h2>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            Categories
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Recommendations
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 p-8 mb-4">
              <motion.span 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
              >
                {results.overallScore}%
              </motion.span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">Inclusivity Readiness Score</h3>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              Overall readiness assessment based on survey responses
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid gap-6 mt-8"
          >
            <div className="grid grid-cols-3 gap-6">
              {results.categories.slice(0, 3).map((category, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex flex-col items-center p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  style={{ backgroundColor: `${category.color}08` }}
                >
                  <span 
                    className="text-3xl font-bold mb-2"
                    style={{ color: category.color }}
                  >
                    {category.score}%
                  </span>
                  <span className="text-sm text-center font-medium text-gray-700">{category.name}</span>
                </motion.div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-6 max-w-[66%] mx-auto">
              {results.categories.slice(3).map((category, index) => (
                <motion.div 
                  key={index + 3}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="flex flex-col items-center p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  style={{ backgroundColor: `${category.color}08` }}
                >
                  <span 
                    className="text-3xl font-bold mb-2"
                    style={{ color: category.color }}
                  >
                    {category.score}%
                  </span>
                  <span className="text-sm text-center font-medium text-gray-700">{category.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="categories" className="mt-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {results.categories.map((category, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-gray-800">{category.name}</h4>
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: `${category.color}15`,
                      color: category.color
                    }}
                  >
                    {category.score}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${category.score}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
        
        <TabsContent value="recommendations" className="mt-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {results.recommendations.length > 0 ? (
              results.recommendations.map((recommendation, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 text-primary text-sm font-bold mr-4">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed">{recommendation}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center p-12 text-center text-gray-500"
              >
                <div>
                  <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg">No recommendations available</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default SurveyResults;
