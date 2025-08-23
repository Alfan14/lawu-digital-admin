
import { useState } from "react";

const AccountDetails = () => {
    const [activeTab, setActiveTab] = useState('PRODUCT');

    return (
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 min-h-full">
            <h1 className="text-xl md:text-3xl font-semibold text-gray-800 mb-6">Basic Details</h1>
            
            <div className="flex border-b border-gray-200 mb-6">
                <button
                    onClick={() => setActiveTab('BANK_DETAILS')}
                    className={`py-2 px-4 font-semibold ${activeTab === 'BANK_DETAILS' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    BANK DETAILS
                </button>
                <button
                    onClick={() => setActiveTab('PRODUCT')}
                    className={`py-2 px-4 font-semibold ${activeTab === 'PRODUCT' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    PRODUCT
                </button>
            </div>

            {activeTab === 'BANK_DETAILS' && (
                <div className="p-4 text-gray-600">
                    <p>Bank details information goes here.</p>
                </div>
            )}

            {activeTab === 'PRODUCT' && (
                <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Product</h2>
                    <p className="text-sm text-gray-500 mb-6">Information on fees and charges</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <span className="block text-gray-900 font-medium">PIX Sending</span>
                            <span className="block text-green-600 font-semibold mt-1">Free</span>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <span className="block text-gray-900 font-medium">PIX Receiving</span>
                            <span className="block text-green-600 font-semibold mt-1">Free</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountDetails;