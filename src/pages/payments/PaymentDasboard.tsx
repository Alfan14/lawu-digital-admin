import { ChevronDown, Download, Filter, Search } from "lucide-react";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Leftbar from "../../components/Leftbar";
import { Link } from "react-router-dom";

interface Payments {
  id: string;
  status: string;
  payer: string;
  value: string;
  split: string;
  date: string;
}

const PaymentsDashboard = () => {
  const [payments, setPayments] = useState<Payments[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const mockPayments = [
      {
        id: '4ac77cf7-c238-4eac-b16b-12250bb3f1da',
        status: 'PAID',
        payer: 'PABLO BENTEZ POMBO DA SILVA',
        value: '$ 24.94',
        split: 'YES',
        date: '12/12/2023 - 15:02',
      },
      {
        id: '33233bd9-c739-4da9-99db-f31d26521a4e',
        status: 'REFUNDED',
        payer: 'PABLO BENTEZ POMBO DA SILVA',
        value: '$ 24.94',
        split: 'YES',
        date: '12/12/2023 - 14:18',
      },
      {
        id: '314406ab-6182-443e-b31f-c8e36072ca58',
        status: 'REFUNDED',
        payer: 'PABLO BENTEZ POMBO DA SILVA',
        value: '$ 24.94',
        split: 'NO',
        date: '12/12/2023 - 12:22',
      },
      {
        id: 'e9277c3b-a2c0-4015-bb6c-09008ba972a9',
        status: 'PAID',
        payer: 'PABLO BENTEZ POMBO DA SILVA',
        value: '$ 24.94',
        split: 'YES',
        date: '12/12/2023 - 12:11',
      },
      {
        id: '1b452f35-b7a6-4ea9-98fe-3d677b97c841',
        status: 'REFUNDED',
        payer: 'PABLO BENTEZ POMBO DA SILVA',
        value: '$ 24.94',
        split: 'NO',
        date: '12/12/2023 - 11:58',
      },
      {
        id: '52fa29c2-d45c-4fee-8532-b7e0ce1e9f7f',
        status: 'REFUNDED',
        payer: 'PABLO BENTEZ POMBO DA SILVA',
        value: '$ 17.35',
        split: 'NO',
        date: '10/12/2023 - 15:13',
      },
      {
        id: '559b8cfe-69e9-4b6d-ab5f-a0f2f59c4fab4',
        status: 'CANCELLED',
        payer: 'PABLO BENTEZ POMBO DA SILVA',
        value: '$ 24.94',
        split: 'YES',
        date: '08/12/2023 - 21:14',
      },
      {
        id: '4e8905e8-df34-4fc2-88fe-506482e5fbfb',
        status: 'REFUNDED',
        payer: 'PABLO BENTEZ POMBO DA SILVA',
        value: '$ 24.94',
        split: 'NO',
        date: '08/12/2023 - 15:44',
      },
      {
        id: 'c1202eab-87e0-4cb4-ba15-a08c89c55746',
        status: 'PARTIALLY REFUNDED',
        payer: 'PABLO BENTEZ POMBO DA SILVA',
        value: '$ 24.94',
        split: 'NO',
        date: '08/12/2023 - 10:38',
      },
      {
        id: 'fcfc3e03-b329-4daa-a766-86e126e671d6',
        status: 'PAID',
        payer: 'PABLO BENTEZ POMBO DA SILVA',
        value: '$ 24.94',
        split: 'NO',
        date: '07/12/2023 - 14:06',
      },
      {
        id: '84a0f6e5-3001-4616-9c09-e2082de030cb',
        status: 'PAID',
        payer: 'PABLO BENTEZ POMBO DA SILVA',
        value: '$ 24.94',
        split: 'NO',
        date: '07/12/2023 - 13:29',
      },
    ];

    setTimeout(() => {
      try {
        setPayments(mockPayments || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError("Failed to fetch payments data.");
        setLoading(false);
      }
    }, 1000);
  }, []);

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

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Leftbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 min-h-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
              <div className="flex flex-col items-start mb-4 md:mb-0">
                <h1 className="text-xl md:text-3xl font-semibold text-gray-800">Transaction</h1>
                <span className="text-sm text-gray-500">
                  {loading ? '...' : `${payments.length} results`}
                </span>
              </div>
              <div className="flex flex-wrap space-x-3 items-center">
                <button className="bg-orange-100 text-orange-600 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 hover:bg-orange-200 flex items-center space-x-2">
                  <span>Analyse</span>
                </button>
                <button className="bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 hover:bg-orange-700 flex items-center space-x-2">
                  <Download size={16} />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="border-b border-gray-200 mb-6 pb-6">
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-4">
                <button className="bg-white text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-md transition duration-300 hover:bg-gray-50 flex items-center space-x-2">
                  <Filter size={16} />
                  <span>Filter</span>
                  <ChevronDown size={16} />
                </button>
                <div className="relative w-full md:flex-1">
                  <input
                    type="text"
                    placeholder="Buscar transações"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Search size={20} />
                  </div>
                </div>
                <button className="bg-white px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v2.172a2 2 0 00.586 1.414L8 12.586V18a2 2 0 002 2h2a2 2 0 002-2v-5.414l5.414-5.414A2 2 0 0018 6.172V4a2 2 0 00-2-2H4zm14 2a1 1 0 011 1v1.172l-4 4V18h2a1 1 0 011 1v1h-1a1 1 0 01-1-1v-2h-2v-2h-2v-2h-2v-2h-2v-2h-2V5a1 1 0 011-1h12z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="bg-white px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.418 0h.582m-19 0a7 7 0 1014 0m-7 0a7 7 0 10-14 0" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Loading and Error states */}
            {loading && (
              <div className="text-center py-10">
                <svg className="animate-spin h-10 w-10 text-gray-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="mt-4 text-gray-500">Loading payments...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-10 text-red-500 font-medium">
                <p>{error}</p>
              </div>
            )}

            {/* Table of payments */}
            {!loading && !error && (
              <div className="overflow-x-auto table-container w-full">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        STATUS
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        USERNAME
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        TOTAL TRANSAKSI
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        SPLIT
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        DATE TRANSACTION
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {payments.map((payment) => (
                      <tr key={payment.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 truncate max-w-xs">
                          <Link to={`/admin/payments/${payment.id}`} className="hover:underline">{payment.id}</Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles(payment.status)}`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {payment.payer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {payment.value}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {payment.split}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {payment.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="mt-8 flex justify-between items-center text-sm text-gray-600">
              <span>{payments.length} results</span>
              <span>1 dari 3</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PaymentsDashboard;