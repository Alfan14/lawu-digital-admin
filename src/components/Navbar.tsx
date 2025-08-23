import { Menu, Bell, User, Search } from 'lucide-react';

interface NavbarProps {
  toggleSidebar: () => void;
}

// Navbar component
const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-sm border-b border-gray-200">
      <div className="md:hidden">
          <button onClick={toggleSidebar} className="text-gray-700 hover:text-gray-900 focus:outline-none cursor-pointer">
              <Menu size={24} />
          </button>
      </div>
      <div className="relative flex-1 max-w-sm mr-4 hidden md:block">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
        />
        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      <div className="hidden md:flex items-center flex-1 justify-center">
        <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
      </div>

      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-orange-600 transition-colors duration-200 cursor-pointer">
          <Bell size={24} />
        </button>

        {/* User Profile Icon/Dropdown */}
        <button className="text-gray-600 hover:text-orange-600 transition-colors duration-200 cursor-pointer">
          <User size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
