
# Inclusive School Surveyor

A React application designed to help educational institutions assess their readiness to serve all students, including those with special needs. The tool allows users to upload survey files (PDF/Excel) and visualizes the analyzed results.

## Features

- File upload component supporting PDF and Excel files
- Visual progress indicator during file processing
- Interactive dashboard to display survey results
- Category-based analysis of inclusivity metrics
- Actionable recommendations based on survey data

## How It Works

1. Upload a survey PDF or Excel file through the drag-and-drop interface
2. The file is sent to the backend for processing (simulated in this demo)
3. Results are displayed in an easy-to-understand dashboard format
4. Review category scores and recommendations for improving inclusivity

## Technical Implementation

- React with TypeScript for frontend development
- Tailwind CSS for responsive styling
- Shadcn UI component library
- File validation and progress tracking
- Mock data simulation (connect to real backend as needed)

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

## Next Steps

To integrate with a real backend:

1. Replace the mock data processing in `Index.tsx` with actual API calls
2. Implement file upload to your server in `FileUpload.tsx`
3. Update the data types in `SurveyResults.tsx` to match your API response format

## License

This project is licensed under the MIT License.
