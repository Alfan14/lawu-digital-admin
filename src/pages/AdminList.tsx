"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Leftbar from "../components/Leftbar";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faSearch,
  faSlidersH,
  faSave,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

interface News {
  id : string;
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
  const baseUrl = import.meta.env.VITE_API_URL || "";

  useEffect(() => {

    const fetchData = async () => {
      try {
        const apiNewsUrl = `${baseUrl}admin/get`;
        console.log("Isi Payload:",apiNewsUrl)
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
    <div className="flex min-h-screen bg-gray-100 text-gray-900 font-sans">
      <Leftbar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-8">
          <div className="min-h-screen p-4 md:p-8 lg:p-12">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-full p-6 md:p-8 lg:p-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
                <h1 className="text-3xl font-semibold text-gray-800 mb-4 md:mb-0">Blog posts</h1>
                <div className="flex space-x-3 items-center">
                  <button className="bg-orange-100 text-orange-600 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 hover:bg-orange-200">
                    Analyze
                  </button>
                  <button className="bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 hover:bg-orange-700">
                    <a href="/admin/create-blog">Create</a>
                  </button>
                </div>
              </div>

              <div className="border-b border-gray-200 mb-6 pb-6">
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-4">
                  <div className="relative w-full md:w-auto flex-1">
                    <input type="text" placeholder="Search content" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FontAwesomeIcon icon={faSearch} />
                    </div>
                  </div>
                  <button className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-center space-x-2 bg-white text-gray-700 hover:bg-gray-50 transition duration-300">
                    <span>All posts (7)</span>
                    <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
                  </button>
                  <button className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-center space-x-2 bg-white text-gray-700 hover:bg-gray-50 transition duration-300">
                    <span>Blog (1)</span>
                    <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
                  </button>
                  <button className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-center space-x-2 bg-white text-gray-700 hover:bg-gray-50 transition duration-300">
                    <span>Publish status</span>
                    <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
                  </button>
                  <button className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-center space-x-2 bg-white text-gray-700 hover:bg-gray-50 transition duration-300">
                    <span>More filters</span>
                    <FontAwesomeIcon icon={faSlidersH} className="text-xs" />
                  </button>
                  <button className="w-full md:w-auto px-4 py-2 text-blue-600 hover:underline transition duration-300">
                    Clear all
                  </button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <div className="flex items-center flex-wrap gap-2 text-sm text-gray-700 mb-4 md:mb-0">
                  <span className="font-medium">Viewing filters:</span>
                  <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full flex items-center space-x-2">
                    <span>Blog: News</span>
                    <button className="text-gray-500 hover:text-gray-700">
                      <FontAwesomeIcon icon={faTimes} className="text-xs" />
                    </button>
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-700 text-sm">FINISH CMS SETUP 6/8</span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div className="h-full bg-green-500 rounded-full w-[75%]"></div>
                    </div>
                  </div>
                  <button className="text-blue-600 flex items-center space-x-2 font-medium hover:underline transition duration-300">
                    <FontAwesomeIcon icon={faSave} className="text-sm" />
                    <span>Save view</span>
                  </button>
                  <button className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 flex items-center space-x-2 bg-white hover:bg-gray-50 transition duration-300">
                    <span>Actions</span>
                    <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
                  </button>
                </div>
              </div>

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
                              ${    blog.is_published === "false"
                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                                    :blog.is_published === "true"
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                              }`}
                            >
                              {blog.is_published === "true" ? (
                                <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                </svg>
                              ) : (
                                <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z" />
                                </svg>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

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
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminList;