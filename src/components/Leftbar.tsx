import {
    Home,
    FileText,
    Settings,
    Globe,
    FileArchive,
    BarChart2,
    User,
    LayoutDashboard
} from 'lucide-react';

import { Link, useLocation } from 'react-router-dom'; 

const sidebarNav = [
    { name: "Home", icon: Home, link: "/" },
    { name: "Blogs", icon: FileText, link: "/admin/blogs" }, 
    { name: "Settings", icon: Settings, link: "/settings" },
    { name: "Website", icon: Globe, link: "/website" }, 
    { name: "Extensions", icon: FileArchive, link: "/extensions" }, 
    { name: "Templates", icon: LayoutDashboard, link: "/templates" }, 
    { name: "Statistics", icon: BarChart2, link: "/statistics" }, 
    { name: "Admin Users", icon: User, link: "/admin-users" }, 
];

import LawuDigital from "../assets/Lawu_Digital__2.ico";

const Leftbar = () => {
    const location = useLocation(); // Get the current location object

    return (
        <aside className="w-64 bg-gray-900 text-gray-200 p-4 flex flex-col justify-between">
            <div>
                <div className="flex items-center space-x-3 mb-8">
                    <div className="p-2 bg-gray-700 rounded-md">
                        <img src={LawuDigital} alt="logo" className="rounded-full" />
                    </div>
                    <div className="text-sm font-semibold tracking-wide">Admin</div>
                </div>
                <nav>
                    <ul>
                        {sidebarNav.map((item, index) => (
                            <li key={index} className="mb-2">
                                <Link 
                                    to={item.link} 
                                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                                        location.pathname === item.link // Check if the current path matches the item's link
                                            ? "bg-blue-500 text-white" 
                                            : "hover:bg-gray-800"
                                    }`}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Leftbar;