
import { BookOpen } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white border-b py-4">
      <div className="container mx-auto px-4 flex items-center">
        <div className="flex items-center">
          <BookOpen className="h-8 w-8 text-primary mr-3" />
          <div>
            <h1 className="text-xl font-bold">Inclusive School Surveyor</h1>
            <p className="text-sm text-gray-500">Assessment and Analysis Tool</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
