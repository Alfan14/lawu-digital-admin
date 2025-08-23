"use client";

import axios from "axios";
import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import Leftbar from "../components/Leftbar";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBold,
  faItalic,
  faUnderline,
  faStrikethrough,
  faLink,
  faUnlink,
  faImage,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faAlignJustify,
  faListOl,
  faListUl,
  faIndent,
  faOutdent,
  faCode,
  faQuoteRight,
} from '@fortawesome/free-solid-svg-icons';

interface News {
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
}

const AdminPost = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const baseUrl = import.meta.env.VITE_API_URL || "";


  const [formData, setFormData] = useState<News>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image: "",
    author_name: "",
    author_image: "",
    category: "",
    tags: "",
    published_at: new Date().toISOString().split('T')[0],
  });

  const editorRef = useRef<HTMLDivElement>(null);
  const coverImageInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
    setSuccessMessage(null);
  };

  const handleCoverImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setImageError(null);
    const file = e.target.files?.[0];

    if (!file) {
      setImageError("No file selected.");
      setFormData((prev) => ({ ...prev, cover_image: "" }));
      return;
    }

    setImageLoading(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('image', file);

      const apiCloudinaryUrl = `${baseUrl}api/upload`;
      const response = await axios.post(apiCloudinaryUrl, uploadFormData);

      setFormData((prev) => ({ ...prev, cover_image: response.data.url }));
      console.log("Upload successful:", response.data.secure_url);

    } catch (err: any) {
      console.error("Image upload error:", err);
      setImageError(err.response?.data?.error?.message || err.message || "Failed to upload image.");
      setFormData((prev) => ({ ...prev, cover_image: "" }));
    } finally {
      setImageLoading(false);
    }
  };

  const handleFilePictureAuthor = async (e: ChangeEvent<HTMLInputElement>) => {
    setImageError(null);
    const file = e.target.files?.[0];

    if (!file) {
      setImageError("No file selected.");
      setFormData((prev) => ({ ...prev, author_image: "" }));
      return;
    }

    setImageLoading(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('image', file);

      const apiCloudinaryUrl = `${baseUrl}api/upload`;
      const response = await axios.post(apiCloudinaryUrl, uploadFormData);

      setFormData((prev) => ({ ...prev, author_image: response.data.url }));
      console.log("Upload successful:", response.data.url);

    } catch (err: any) {
      console.error("Image upload error:", err);
      setImageError(err.response?.data?.error?.message || err.message || "Failed to upload image.");
      setFormData((prev) => ({ ...prev, author_image: "" }));
    } finally {
      setImageLoading(false);
    }
  };

  const formatDoc = (command: string, value: string | null = null) => {
    if (editorRef.current) {

      document.execCommand(command, false, value ?? '');
      editorRef.current.focus();
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (!formData.cover_image) {
      setError("Please upload a cover image.");
      setLoading(false);
      return;
    }

    if (!formData.author_image) {
      setError("Please upload an author image.");
      setLoading(false);
      return;
    }

    const editorContent = editorRef.current?.innerHTML || "";

    const payload = {
      ...formData,
      content: editorContent,
    };

    console.log("Isi Payload:", payload)

    try {
      const apiNewsUrl = `${baseUrl}admin/post`;
      const response = await axios.post(apiNewsUrl, payload);

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("Blog post submitted successfully! 🎉");
      } else {
        setError(response.data?.message || "Unexpected server response during submission.");
      }
    } catch (err: any) {
      console.error("Post submission error:", err);
      setError(err.response?.data?.message || err.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Leftbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="bg-white rounded-xl shadow-lg w-full p-10 sm:p-12">
              <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-800">
                  <a href="/admin/create-blog">
                    ADD BLOG POST
                  </a>
                </h1>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-10 h-80 border-2 border-dashed border-gray-300">
                    <svg className="w-24 h-24 text-gray-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span className="text-gray-500 text-lg">SELECT IMAGE</span>
                    <input type="file" className="hidden" id="cover_image" name="cover_image" onChange={handleCoverImageChange} ref={coverImageInputRef} />
                    <label htmlFor="cover_image" className="mt-8 bg-orange-500 hover:bg-orange-600 text-white text-lg py-4 px-8 rounded-lg cursor-pointer transition duration-300 ease-in-out">
                      {imageLoading ? "Uploading..." : "Upload Cover Image"}
                    </label>
                    {formData.cover_image && <p className="mt-2 text-green-600 text-sm">Image uploaded successfully!</p>}
                    {imageError && <p className="mt-2 text-red-600 text-sm">{imageError}</p>}

                    {formData.cover_image && (
                      <div className="mt-4">
                        <img
                          src={formData.cover_image}
                          alt="Cover Preview"
                          className="size-full object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-8">
                    <div>
                      <label htmlFor="title" className="block text-base font-medium text-gray-700 mb-3">Blog Title</label>
                      <input type="text" id="title" name="title" placeholder="Enter Blog Title" className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-base" required value={formData.title} onChange={handleInputChange} />
                    </div>

                    <div>
                      <label htmlFor="slug" className="block text-base font-medium text-gray-700 mb-3">Slug</label>
                      <input type="text" id="slug" name="slug" placeholder="Enter Blog Slug" className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-base" required value={formData.slug} onChange={handleInputChange} />
                    </div>

                    <div>
                      <label htmlFor="excerpt" className="block text-base font-medium text-gray-700 mb-3">Excerpt</label>
                      <textarea id="excerpt" name="excerpt" className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-base" placeholder="Enter a short excerpt for the blog post" value={formData.excerpt} onChange={handleInputChange}></textarea>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                      <div>
                        <label htmlFor="author_name" className="block text-base font-medium text-gray-700 mb-3">Author</label>
                        <input type="text" id="author_name" name="author_name" value={formData.author_name} className="w-full px-5 py-4 border border-gray-300 rounded-lg bg-gray-50 text-base" onChange={handleInputChange} />
                      </div>
                      <div>
                        <label htmlFor="published_at" className="block text-base font-medium text-gray-700 mb-3">Publish Date</label>
                        <input type="date" id="published_at" name="published_at" value={formData.published_at} className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-base" onChange={handleInputChange} />
                      </div>
                    </div>

                    <div className="flex items-center mt-6">
                      <input type="checkbox" id="allowComments" name="allow_comments" className="h-6 w-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                      <label htmlFor="allowComments" className="ml-4 block text-lg text-gray-900">Allow Comments</label>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex items-center justify-between border border-gray-300 rounded-t-lg bg-gray-50 p-4">
                    <div className="flex space-x-3 text-gray-600 flex-wrap rich-text-toolbar-buttons">
                      <button type="button" className="p-2 rounded hover:bg-gray-200" title="Bold" onClick={() => formatDoc('bold')}>
                        <FontAwesomeIcon icon={faBold} size="lg" />
                      </button>
                      <button type="button" className="p-2 rounded hover:bg-gray-200" title="Italic" onClick={() => formatDoc('italic')}>
                        <FontAwesomeIcon icon={faItalic} size="lg" />
                      </button>
                      <button type="button" className="p-2 rounded hover:bg-gray-200" title="Underline" onClick={() => formatDoc('underline')}>
                        <FontAwesomeIcon icon={faUnderline} size="lg" />
                      </button>
                      <button type="button" className="p-2 rounded hover:bg-gray-200" title="Strikethrough" onClick={() => formatDoc('strikeThrough')}>
                        <FontAwesomeIcon icon={faStrikethrough} size="lg" />
                      </button>
                      <button type="button" className="p-2 rounded hover:bg-gray-200" title="Link" onClick={() => formatDoc('createLink', prompt('Enter URL:'))}>
                        <FontAwesomeIcon icon={faLink} size="lg" />
                      </button>
                      <button type="button" className="p-2 rounded hover:bg-gray-200" title="Unlink" onClick={() => formatDoc('unlink')}>
                        <FontAwesomeIcon icon={faUnlink} size="lg" />
                      </button>
                      <button type="button" className="p-2 rounded hover:bg-gray-200" title="Insert Image" onClick={() => formatDoc('insertImage', prompt('Enter image URL:'))}>
                        <FontAwesomeIcon icon={faImage} size="lg" />
                      </button>
                      <button type="button" className="p-2 rounded hover:bg-gray-200" title="Align Left" onClick={() => formatDoc('justifyLeft')}>
                        <FontAwesomeIcon icon={faAlignLeft} size="lg" />
                      </button>
                      <button type="button" className="p-2 rounded hover:bg-gray-200" title="Align Center" onClick={() => formatDoc('justifyCenter')}>
                        <FontAwesomeIcon icon={faAlignCenter} size="lg" />
                      </button>
                      <button type="button" className="p-2 rounded hover:bg-gray-200" title="Align Right" onClick={() => formatDoc('justifyRight')}>
                        <FontAwesomeIcon icon={faAlignRight} size="lg" />
                      </button>
                      <button type="button" className="p-2 rounded hover:bg-gray-200" title="Justify" onClick={() => formatDoc('justifyFull')}>
                        <FontAwesomeIcon icon={faAlignJustify} size="lg" />
                      </button>
                      <button type="button" className="p-2 rounded hover:bg-gray-200" title="Ordered List" onClick={() => formatDoc('insertOrderedList')}>
                        <FontAwesomeIcon icon={faListOl} size="lg" />
                      </button>
                      <button type="button" className="p-2 rounded hover:bg-gray-200" title="Unordered List" onClick={() => formatDoc('insertUnorderedList')}>
                        <FontAwesomeIcon icon={faListUl} size="lg" />
                      </button>
                      <button type="button" className="p-2 rounded hover:bg-gray-200" title="Indent" onClick={() => formatDoc('indent')}>
                        <FontAwesomeIcon icon={faIndent} size="lg" />
                      </button>
                      <button type="button" className="p-2 rounded hover:bg-gray-200" title="Outdent" onClick={() => formatDoc('outdent')}>
                        <FontAwesomeIcon icon={faOutdent} size="lg" />
                      </button>
                      <button type="button" className="p-2 rounded hover:bg-gray-200" title="Code" onClick={() => formatDoc('formatBlock', 'pre')}>
                        <FontAwesomeIcon icon={faCode} size="lg" />
                      </button>
                      <button type="button" className="p-2 rounded hover:bg-gray-200" title="Quote" onClick={() => formatDoc('formatBlock', 'blockquote')}>
                        <FontAwesomeIcon icon={faQuoteRight} size="lg" />
                      </button>
                    </div>
                  </div>
                  <div id="contentEditor" contentEditable="true" ref={editorRef} className="rich-text-editor bg-white rounded-b-lg focus:ring-blue-500 focus:border-blue-500 p-4 border border-gray-300 min-h-[300px]"></div>
                </div>

                <div className="mx-5 my-3 w-full">
                  <label className="block mb-2 text-sky-50" htmlFor="profile_picture">Tetapkan Foto </label>
                  <input
                    className="w-full p-2 text-sky-50 outline-none focus:bg-white/10 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 cursor-pointer"
                    type="file"
                    accept="image/*"
                    onChange={handleFilePictureAuthor}
                    disabled={imageLoading}
                  />
                  {imageLoading && <p className="text-blue-300 text-sm mt-2">Uploading image...</p>}
                  {imageError && <p className="text-red-300 text-sm mt-2">{imageError}</p>}
                  {formData.author_image && (
                    <div className="text-green-300 mb-4 text-sm mt-2">
                      <p>Image uploaded successfully!</p>
                      <img src={formData.author_image} alt="Author Preview" className="mt-2 size-40 object-cover rounded-full border-2 border-white" />
                    </div>
                  )}
                </div>

                <div className="mt-8">
                  <label htmlFor="category" className="block text-base font-medium text-gray-700 mb-3">Category</label>
                  <input type="text" id="category" name="category" placeholder="Enter Category" className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-base" required value={formData.category} onChange={handleInputChange} />
                </div>

                <div className="mt-8">
                  <label htmlFor="tags" className="block text-base font-medium text-gray-700 mb-3">Tags</label>
                  <input type="text" id="tags" name="tags" placeholder="Enter Tags Separate with Commas" className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-base" required value={formData.tags} onChange={handleInputChange} />
                </div>

                <div className="mt-12 flex items-center justify-center text-gray-600 text-xl font-medium">
                  <svg className="w-7 h-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>CREATE POST SCHEDULE FOR SOCIAL MEDIA</span>
                </div>

                {loading && <p className="text-blue-500 mt-4 text-center">Submitting post...</p>}
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                {successMessage && <p className="text-green-500 mt-4 text-center">{successMessage}</p>}

                <div className="mt-12 flex justify-center space-x-6">
                  <button type="button" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 px-10 rounded-lg shadow-md transition duration-300 ease-in-out text-lg">
                    CANCEL
                  </button>
                  <button type="submit" className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-4 px-10 rounded-lg shadow-md transition duration-300 ease-in-out text-lg" disabled={loading || imageLoading}>
                    SAVE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminPost;