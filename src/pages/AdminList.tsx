"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Leftbar from "../components/Leftbar";
import Navbar from "../components/Navbar";
import { Search, ChevronDown, SlidersHorizontal, X, Save, PenLine, Trash2, Check, Pen } from 'lucide-react';

interface News {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author_name: string;
  author_image: string;
  category: string;
  published_at: string;
  tags: string;
  is_published: 'true' | 'false' | null;
}

const AdminList = () => {
  const [searchParams] = useSearchParams();
  const [newsData, setNewsData] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const baseUrl = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiNewsUrl = `${baseUrl}admin/get`;
        console.log("Isi Payload:", apiNewsUrl);
        const newsRes = await axios.get(apiNewsUrl, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setNewsData(newsRes.data || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError("Failed to fetch news data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [baseUrl, searchParams]);

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Leftbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 min-h-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
              <h1 className="text-xl md:text-3xl font-semibold text-gray-800 mb-4 md:mb-0">Blog posts</h1>
              <div className="flex flex-wrap space-x-3 items-center">
                <button className="bg-orange-100 text-orange-600 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 hover:bg-orange-200">
                  Analyze
                </button>
                <button
                  className="bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 hover:bg-orange-700"
                  onClick={() => window.location.href = '/admin/create-blog'}
                >
                  Create
                </button>
              </div>
            </div>

            <div className="border-b border-gray-200 mb-6 pb-6">
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-4">
                <div className="relative w-full md:flex-1">
                  <input
                    type="text"
                    placeholder="Search content"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Search size={20} />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 w-full md:w-auto md:flex-none">
                  <button className="flex-1 md:flex-none px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-center space-x-2 bg-white text-gray-700 hover:bg-gray-50 transition duration-300">
                    <span>All posts ({newsData.length})</span>
                    <ChevronDown size={16} className="text-xs" />
                  </button>
                  <button className="flex-1 md:flex-none px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-center space-x-2 bg-white text-gray-700 hover:bg-gray-50 transition duration-300">
                    <span>Blog (1)</span>
                    <ChevronDown size={16} className="text-xs" />
                  </button>
                  <button className="flex-1 md:flex-none px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-center space-x-2 bg-white text-gray-700 hover:bg-gray-50 transition duration-300">
                    <span>Publish status</span>
                    <ChevronDown size={16} className="text-xs" />
                  </button>
                  <button className="flex-1 md:flex-none px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-center space-x-2 bg-white text-gray-700 hover:bg-gray-50 transition duration-300">
                    <span>More filters</span>
                    <SlidersHorizontal size={16} className="text-xs" />
                  </button>
                  <button className="flex-1 md:flex-none px-4 py-2 text-blue-600 hover:underline transition duration-300">
                    Clear all
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div className="flex items-center flex-wrap gap-2 text-sm text-gray-700 mb-4 md:mb-0">
                <span className="font-medium">Viewing filters:</span>
                <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full flex items-center space-x-2">
                  <span>Blog: News</span>
                  <button className="text-gray-500 hover:text-gray-700">
                    <X size={12} className="text-xs" />
                  </button>
                </span>
              </div>
              <div className="flex flex-wrap justify-end items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700 text-sm">FINISH CMS SETUP 6/8</span>
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-green-500 rounded-full w-[75%]"></div>
                  </div>
                </div>
                <button className="text-blue-600 flex items-center space-x-2 font-medium hover:underline transition duration-300">
                  <Save size={16} className="text-sm" />
                  <span>Save view</span>
                </button>
                <button className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 flex items-center space-x-2 bg-white hover:bg-gray-50 transition duration-300">
                  <span>Actions</span>
                  <ChevronDown size={16} className="text-xs" />
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
                <p className="mt-4 text-gray-500">Loading blog posts...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-10 text-red-500 font-medium">
                <p>{error}</p>
              </div>
            )}

            {/* Table of blog posts */}
            {!loading && !error && (
              <div className="overflow-x-auto table-container w-full">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name and URL
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Publish Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Blog
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Updated Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Updated By
                      </th>
                      <th scope="col" className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {newsData.map((blog) => (
                      <tr key={blog.slug}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-blue-600">
                            <a href={`/admin/edit-blog?blog_id=${blog.id}`}>
                              {blog.title}
                            </a>
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {blog.excerpt}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                            <dd
                              className={`me-2 mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium
                                ${blog.is_published === "false"
                                  ? 'bg-blue-100 text-blue-800'
                                  : blog.is_published === "true"
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                                }`}
                            >
                              {blog.is_published === "true" ? (
                                <Check size={12} className="me-1" />
                              ) : (
                                <Pen size={12} className="me-1" />
                              )}
                              {blog.is_published === "true" ? "Published" : "Draft"}
                            </dd>
                          </dl>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {blog.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(blog.published_at).toISOString().split('T')[0]}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {blog.author_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href={`/admin/edit-blog?blog_id=${blog.id}`} className="text-indigo-600 hover:text-indigo-900 mx-2">
                            <PenLine size={16} />
                          </a>
                          <button
                            onClick={() => console.log(`Attempt to delete post with ID: ${blog.id}`)}
                            className="text-red-600 hover:text-red-900 mx-2"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4 md:mb-0">
                <span>Prev</span>
                <button className="px-3 py-1 rounded-lg border border-gray-300 text-blue-600 bg-blue-50">
                  1
                </button>
                <span>Next</span>
              </div>
              <div className="text-sm text-gray-600">
                25 per page
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminList;