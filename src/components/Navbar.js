import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Home, FileText, Briefcase, Building, User, ChevronLeft, ChevronRight, Zap, Moon, BarChart, ClipboardList } from 'lucide-react'; // Added BarChart and ClipboardList
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

const Navbar = ({ isSidebarOpen, toggleSidebar }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    applyDarkMode(savedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    applyDarkMode(newDarkMode);
  };

  const applyDarkMode = (isDark) => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  return (
    <nav className={`bg-gray-900 text-white h-screen fixed top-0 left-0 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col justify-between`}>
      <div>
        <button onClick={toggleSidebar} className="p-4 w-full flex justify-end">
          {isSidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>

        {/* Navigation Links */}
        <NavItem icon={<Home size={24} />} text="Dashboard" to="/dashboard" isOpen={isSidebarOpen} />
        <NavItem icon={<BarChart size={24} />} text="Resume Analysis" to="/resume-analysis" isOpen={isSidebarOpen} />
        <NavItem icon={<FileText size={24} />} text="Resume QA" to="/resume-qa" isOpen={isSidebarOpen} />
        <NavItem icon={<Briefcase size={24} />} text="Role QA" to="/role-qa" isOpen={isSidebarOpen} />
        <NavItem icon={<Building size={24} />} text="Company QA" to="/company-qa" isOpen={isSidebarOpen} />
        <NavItem icon={<ClipboardList size={24} />} text="Quiz" to="/quiz" isOpen={isSidebarOpen} />
        <NavItem icon={<User size={24} />} text="Edit Profile" to="/profile" isOpen={isSidebarOpen} />
        
      </div>

      <div className="mt-auto">
        <button onClick={toggleDarkMode} className="p-4 w-full flex items-center">
          <Moon size={24} />
          {isSidebarOpen && <span className="ml-4">Dark Mode</span>}
        </button>

        <div className="p-4">
          {isSidebarOpen ? (
            <Link to="/upgrade" className="inline-flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-2 rounded-md hover:opacity-90">
              Upgrade <Zap size={16} className="ml-2" />
            </Link>
          ) : (
            <Link to="/upgrade" className="inline-flex items-center justify-center text-white hover:opacity-90">
              <Zap size={18} />
            </Link>
          )}
        </div>

        <div className="p-4">
          <SignedIn>
            <div className="flex">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
          <SignedOut>
            <div className="flex justify-center">
              <Link to="/sign-in" className="text-white">Sign In</Link>
            </div>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

// Navigation item component
const NavItem = ({ icon, text, to, isOpen }) => (
  <Link to={to} className="flex items-center p-4 hover:bg-gray-800">
    {icon}
    {isOpen && <span className="ml-4">{text}</span>}
  </Link>
);

export default Navbar;
