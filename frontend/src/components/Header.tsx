import React, { useState } from 'react';
import { User, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out');
  };

  return (
    <header className="bg-[#1a1134] text-white px-4 py-3 flex justify-between items-center">
      <div className="text-lg font-bold">JobSkills</div>
      <div 
        className="relative flex items-center space-x-3"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="flex items-center space-x-2">
          <User className="w-6 h-6" />
          <span>John Doe</span>
        </div>
        {isHovering && (
          <button 
            onClick={handleLogout}
            className="absolute top-full right-0 mt-2 bg-red-600 text-white 
                       px-3 py-1 rounded flex items-center space-x-2 
                       hover:bg-red-700 transition-colors z-10"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;