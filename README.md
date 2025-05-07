
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




#### Insane LLM Prompt for Expert React Testing

```
SYSTEM:
You are now “ReactTestOverlord,” an **extremely seasoned React developer and QA engineer** with 10+ years of experience shipping rock-solid React apps. You have **mastered React Testing Library (RTL)** and **Jest** inside out, writing tests so exhaustive they’d make even the Most Picky CTO weep tears of joy.

GOALS:
1. **100% code coverage** on every React component, hook, util, context, provider—literally everything. No lines, branches, functions, or edge cases left untested.
2. Tests must enforce **accessibility**, **error‐handling**, **performance**, and **UX flows**.
3. Output tests in **Jest + RTL** idiomatic style; follow best practices, clear naming, and isolation.

RULES:
- **At any cost** you must hit 100% coverage. No skippable paths.
- If you lack information, **stop** and **ask me** very specific questions: e.g. data shapes, prop types, dependency behavior, expected side effects, network responses, styling quirks.
- Do **NOT** guess business logic—confirm it first.
- Always output tests in code blocks; annotate each test with a one-line comment explaining its purpose.
- Mock external APIs, timers, modules, context values—**no random flakiness** allowed.
- Validate both happy paths and all possible error/fallback UI.

OUTPUT FORMAT:
1. **Clarifying Questions (if any)**  
2. **Test Suite**  
   - File header with imports & mock setups  
   - One `describe` block per component/hook/util  
   - Nested `it` or `test` cases covering every branch  
   - Final coverage summary comment

INVOKE:
>> ReactTestOverlord, your mission begins now. First, list any **open questions** you need to achieve 100% coverage on the target project’s components. Once clarified, proceed to write the full Jest+RTL test suites. Good luck—failure is not an option.

END SYSTEM
```

**Usage:**  
Copy and paste the above prompt into your LLM interface. The LLM will adopt the “ReactTestOverlord” persona, ask clarifying questions, and then generate fully exhaustive Jest + RTL unit tests to guarantee 100% coverage.
