import {
    ChevronRight,
    MessageCircle,
    ChevronDown,
    User,
} from 'lucide-react';

import LawuDigital from "../assets/Lawu_Digital_5.ico";
import BackButton from './BackButton';
import NextButton from './NextButton';

const Navbar = () => {
    return (
        <header className="bg-white shadow-sm p-4 flex items-center justify-between z-10">
            <div className="flex items-center space-x-4">
                <img src={LawuDigital} alt="Logo" className="rounded-full" />
                <h1 className="text-xl font-bold text-gray-800">Lawu Digital</h1>
                <div className="flex items-center space-x-2 ml-10">
                    <BackButton>
                    </BackButton>
                    <NextButton>
                    </NextButton>
                </div>
            </div>

            <nav className="flex-1 hidden md:flex items-center justify-center space-x-6 text-gray-600">
                <a href="#" className="font-semibold text-blue-500 border-b-2 border-blue-500 pb-1">Dashboard</a>
                <a href="#" className="hover:text-gray-800 transition-colors duration-200">Messages</a>
            </nav>

            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-600">
                    <a href="#" className="flex items-center space-x-1 hover:text-gray-800 transition-colors duration-200">
                        <MessageCircle className="h-5 w-5" />
                        <span>Messages</span>
                    </a>
                </div>
                <div className="relative flex items-center space-x-1 p-2 rounded-full hover:bg-gray-100 cursor-pointer">
                    <User className="h-5 w-5" />
                    <span className="font-semibold text-sm text-gray-800">administrator</span>
                    <ChevronDown className="h-4 w-4" />
                </div>
            </div>
        </header>
    )
}

export default Navbar