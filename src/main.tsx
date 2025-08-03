import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dasboard from './pages/Dasboard';
import AdminList from './pages/AdminList';
import './index.css';
import AdminPost from './pages/AdminPost';
import AdminEdit from './pages/AdminEdit';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dasboard />} />
        <Route path="/admin" element={<AdminList />} />
        <Route path="/admin/create-blog" element={<AdminPost />} />
        <Route path="/admin/edit-blog" element={<AdminEdit />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);