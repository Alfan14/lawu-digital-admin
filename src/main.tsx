import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dasboard from './pages/Dasboard';
import AdminList from './pages/AdminList';
import AdminPost from './pages/AdminPost';
import AdminEdit from './pages/AdminEdit';
import PaymentSDasboard from './pages/payments/PaymentDasboard';
import './index.css';
import PaymentDetails from './pages/payments/PaymentDetails';
import AccountDetails from './pages/payments/AccountsDetails';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dasboard />} />
        <Route path="/admin/list-blog" element={<AdminList />} />
        <Route path="/admin/create-blog" element={<AdminPost />} />
        <Route path="/admin/edit-blog" element={<AdminEdit />} />
        <Route path="/admin/payments" element={<PaymentSDasboard />} />
        <Route path="/admin/payments/:id" element={<PaymentDetails />} />
        <Route path="/admin/account-details" element={<AccountDetails />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);