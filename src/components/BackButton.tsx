import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft,
} from 'lucide-react';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button  className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200" onClick={() => navigate(-1)}>
        <ChevronLeft className="h-5 w-5 text-gray-600" />
    </button>
  );
};

export default BackButton;