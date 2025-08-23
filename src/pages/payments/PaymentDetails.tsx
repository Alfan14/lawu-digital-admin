"use client"

import { useState } from "react";
import { ChevronDown, ChevronLeft, RefreshCw } from "lucide-react";

const PaymentDetails = () => {
    const payment = {
        id: '4ac77cf7-c238-4eac-b16b-12250bb3f1da',
        status: 'PAID',
        date: '12/12/2023 - 15:02',
        payer: 'PABLO BENTEZ POMBO DA SILVA',
        value: '$ 1,200.00',
        qrCode: 'N3PYZ5KDVJP7Z13RRVW906LM1X',
        splitDetails: [
            { receiver: 'João Tavares Silva', value: '$ 200.00', id: 'bp_uio43871aa' },
            { receiver: 'Aline Souza Filho', value: '$ 200.00', id: 'bp_jrz67100mq' },
            { receiver: 'Comercial Lopez', value: '$ 200.00', id: 'bp_gbn11830nj' },
            { receiver: 'Gustavo Pires', value: '$ 200.00', id: 'bp_onb54781vl' },
            { receiver: 'ZM Norte Transportadora', value: '$ 200.00', id: 'bp_juh32309jk' },
            { receiver: 'Carolina M. Cunha', value: '$ 200.00', id: 'bp_hbz62209bn' },
        ],
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'PAID':
                return 'bg-green-100 text-green-800';
            case 'REFUNDED':
                return 'bg-red-100 text-red-800';
            case 'PARTIALLY REFUNDED':
                return 'bg-yellow-100 text-yellow-800';
            case 'CANCELLED':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const [activeTab, setActiveTab] = useState('DETAILS');

    return (
        <div className="bg-gray-100 min-h-screen p-4 md:p-8">
            {/* Simple Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center text-gray-700 mb-6 space-y-2 md:space-y-0">
                <div className="flex items-center space-x-4">
                    <span className="text-2xl font-semibold">Hello, Ricardo Oliveira</span>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-blue-600 font-medium cursor-pointer">Account 11030-6 (PRINCIPAL)</span>
                    <ChevronDown size={16} className="text-blue-600" />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        Logout
                    </button>
                </div>
            </header>

            {/* Back button */}
            <a href="./">
                <button className="flex items-center text-orange-600 font-semibold mb-6 hover:underline">
                    <ChevronLeft size={20} />
                    <span className="ml-1">Back</span>
                </button>
            </a>

            {/* Main Details Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {payment.id}
                    </h2>
                    <button className="bg-white text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm transition duration-300 hover:bg-gray-50 flex items-center space-x-2">
                        <RefreshCw size={16} />
                        <span>Refund</span>
                    </button>
                </div>

                {/* Main Transaction Info Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div>
                        <span className="block text-sm font-medium text-gray-500 uppercase">Status</span>
                        <span className={`mt-1 inline-flex text-sm leading-5 font-semibold rounded-full px-2 py-1 ${getStatusStyles(payment.status)}`}>
                            {payment.status}
                        </span>
                    </div>
                    <div>
                        <span className="block text-sm font-medium text-gray-500 uppercase">Transaction Date</span>
                        <span className="block mt-1 text-gray-900 font-medium">{payment.date}</span>
                    </div>
                    <div>
                        <span className="block text-sm font-medium text-gray-500 uppercase">Payer</span>
                        <span className="block mt-1 text-gray-900 font-medium">{payment.payer}</span>
                    </div>
                    <div>
                        <span className="block text-sm font-medium text-gray-500 uppercase">Value</span>
                        <span className="block mt-1 text-gray-900 font-medium">{payment.value}</span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-6">
                    <button
                        onClick={() => setActiveTab('SUMMARY')}
                        className={`py-2 px-4 font-semibold ${activeTab === 'SUMMARY' ? 'border-b-2 border-orange-600 text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        SUMMARY
                    </button>
                    <button
                        onClick={() => setActiveTab('DETAILS')}
                        className={`py-2 px-4 font-semibold ${activeTab === 'DETAILS' ? 'border-b-2 border-orange-600 text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        DETAILS
                    </button>
                </div>

                {/* Tab Content */}
                <div>
                    {activeTab === 'SUMMARY' && (
                        <div className="p-4 text-gray-600">
                            <p>Summary information goes here.</p>
                        </div>
                    )}

                    {activeTab === 'DETAILS' && (
                        <div className="p-4">
                            {/* QR Code Section */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">ID QR Code</h3>
                                <p className="text-gray-600 font-mono bg-gray-50 p-3 rounded-md border border-gray-200">{payment.qrCode}</p>
                            </div>

                            {/* Payment Split Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Split</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Receiver's Name
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Value
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    ID
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {payment.splitDetails.map((split, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{split.receiver}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{split.value}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{split.id}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentDetails;