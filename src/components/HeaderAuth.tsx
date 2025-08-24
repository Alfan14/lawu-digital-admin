const Header = () => {
    return (
        <div className="flex flex-col items-center justify-center mb-8">
            <div className="flex items-center space-x-2 mb-8">
                <div className="w-8 h-8 rounded-md bg-gray-200 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-white">
                         <img src="favicon.ico" alt="" />
                    </div>
                </div>
                {/* <span className="text-xl font-semibold text-gray-800">Lawu Digital</span> */}
            </div>
            <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>
        </div>
    );
};

export default Header;