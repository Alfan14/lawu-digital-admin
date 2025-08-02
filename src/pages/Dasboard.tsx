import {
  FileText,
  Users,
  BarChart,
  PlusCircle,
} from 'lucide-react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

import Navbar from '../components/Navbar';
import Leftbar from '../components/Leftbar';

const data = [
  { name: 'Jan', 'New Users': 4000, 'New Blogs': 2400 },
  { name: 'Feb', 'New Users': 3000, 'New Blogs': 1398 },
  { name: 'Mar', 'New Users': 2000, 'New Blogs': 9800 },
  { name: 'Apr', 'New Users': 2780, 'New Blogs': 3908 },
  { name: 'May', 'New Users': 1890, 'New Blogs': 4800 },
  { name: 'Jun', 'New Users': 2390, 'New Blogs': 3800 },
  { name: 'Jul', 'New Users': 3490, 'New Blogs': 4300 },
];

const dashboardStats = [
  { title: "Site Pages", icon: FileText, color: "text-blue-500", bgColor: "bg-blue-100", value: 6 },
  { title: "Users / Blogs", icon: Users, color: "text-green-500", bgColor: "bg-green-100", value: 5 },
  { title: "Blog Posts", icon: PlusCircle, color: "text-orange-500", bgColor: "bg-orange-100", value: 8 },
  { title: "Website Visits", icon: BarChart, color: "text-red-500", bgColor: "bg-red-100", value: 37 },
];

const recentBlogs = [
  { author: "John Smith", date: "1 day ago" },
  { author: "Celina Parker", date: "6 days ago" },
  { author: "James Johnson", date: "6 days ago" },
  { author: "Mario Martinez", date: "1 month ago" },
  { author: "John Smith", date: "1 month ago" },
];

const Dasboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900 font-sans">
      <Leftbar/>
      <div className="flex-1 flex flex-col">
        <Navbar/>
        <main className="p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between h-40 transform transition-transform duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <span className="text-4xl font-bold text-gray-800">{stat.value}</span>
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-700">{stat.title}</h3>
                  <a href="#" className="text-blue-500 hover:underline text-sm">View Details</a>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">New User Statistics</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="New Users" fill="#60A5FA" name="New Users" radius={[10, 10, 0, 0]} />
                    <Bar dataKey="New Blogs" fill="#FBBF24" name="New Blogs" radius={[10, 10, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">New Blogs</h2>
              <ul>
                {recentBlogs.map((blog, index) => (
                  <li key={index} className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0">
                    <div>
                      <h4 className="font-semibold text-gray-800">{blog.author}</h4>
                      <p className="text-sm text-gray-500">{blog.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-center">
                <a href="#" className="text-blue-500 hover:underline font-semibold">View All</a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dasboard;