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

const sidebarNav = [
    { name: "Home", icon: Home , link : "/"},
    { name: "Blogs", icon: FileText , link : "/admin"},
    { name: "Settings", icon: Settings },
    { name: "Website", icon: Globe },
    { name: "Extensions", icon: FileArchive },
    { name: "Templates", icon: LayoutDashboard },
    { name: "Statistics", icon: BarChart2 },
    { name: "Admin Users", icon: User },
];

import LawuDigital from "../assets/Lawu_Digital__2.ico"

const Leftbar = () => {
    return (
        <aside className="w-64 bg-gray-900 text-gray-200 p-4 flex flex-col justify-between">
            <div>
                <div className="flex items-center space-x-3 mb-8">
                    <div className="p-2 bg-gray-700 rounded-md">
                        <img src={LawuDigital} alt="logo" className="rounded-full"/>
                    </div>
                    <div className="text-sm font-semibold tracking-wide">Admin</div>
                </div>
                <nav>
                    <ul>
                        {sidebarNav.map((item, index) => (
                            <li key={index} className="mb-2">
                                <a href={item.link} className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${item.name === "Home" ? "bg-blue-500 text-white" : "hover:bg-gray-800"}`}>
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default Leftbar