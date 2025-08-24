import React, { useState } from 'react';
import { LayoutDashboard, BarChart, WalletCards , Settings, LogOut, User2, Newspaper,X, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
interface LeftbarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

// Leftbar component
const Leftbar: React.FC<LeftbarProps> = ({ isOpen, toggleSidebar }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const currentPath = window.location.pathname;

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/admin/dashboard' },
    { name: 'Blog Posts', icon: <Newspaper size={20} />, href: '/admin/list-blog' },
    { name: 'Analytics', icon: <BarChart size={20} />, href: '/admin/analytics' },
    { name: 'Payments', icon: <WalletCards size={20} />, href: '/admin/payments' },
    { name: 'Account Details', icon: <FileText size={20} />, href: '/admin/account-details' },
  ];

  const bottomItems = [
    { name: 'Settings', icon: <Settings size={20} />, href: '/admin/settings' },
    { name: 'Profile', icon: <User2 size={20} />, href: '/admin/profile' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      ></div>

      {/* Sidebar component with dynamic width */}
      <aside className={`fixed top-0 left-0 h-full bg-white shadow-lg flex flex-col justify-between py-6 overflow-y-auto z-50 transform transition-all duration-300 md:relative md:translate-x-0
        ${isOpen ? 'w-64' : 'w-0'} ${isCollapsed ? 'md:w-16' : 'md:w-64'}
      `}>
        {/* Close button for mobile */}
        <div className="flex justify-end pr-4 md:hidden">
            <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer">
                <X size={24} />
            </button>
        </div>

        {/* Leftbar chevron button for desktop */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex absolute top-4 -right-3 p-1 rounded-full bg-orange-600 text-white shadow-md z-50 transform transition-transform duration-300 hover:scale-110 cursor-pointer"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        <nav className={`flex-1 px-4 space-y-2 mt-4 md:mt-0 overflow-hidden transition-all duration-300`}>
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 p-3 rounded-lg font-medium transition-colors duration-200 cursor-pointer
                ${isCollapsed ? 'justify-center' : ''}
                ${currentPath === item.href
                  ? 'bg-orange-100 text-orange-600'
                  : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              {item.icon}
              <span className={`${isCollapsed ? 'hidden' : 'block'}`}>{item.name}</span>
            </a>
          ))}
        </nav>

        <hr className="my-4 mx-4 border-gray-200" />

        {/* Bottom User/Settings Links */}
        <nav className={`px-4 space-y-2 mt-auto overflow-hidden transition-all duration-300`}>
          {bottomItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 p-3 rounded-lg font-medium transition-colors duration-200 cursor-pointer
                ${isCollapsed ? 'justify-center' : ''}
                ${currentPath === item.href
                  ? 'bg-orange-100 text-orange-600'
                  : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              {item.icon}
              <span className={`${isCollapsed ? 'hidden' : 'block'}`}>{item.name}</span>
            </a>
          ))}
          <a
            href="/logout"
            className={`flex items-center space-x-3 p-3 rounded-lg text-red-600 font-medium hover:bg-red-50 transition-colors duration-200 cursor-pointer
              ${isCollapsed ? 'justify-center' : ''}
            `}
          >
            <LogOut size={20} />
            <span className={`${isCollapsed ? 'hidden' : 'block'}`}>Log out</span>
          </a>
        </nav>
      </aside>
    </>
  );
};

export default Leftbar;
