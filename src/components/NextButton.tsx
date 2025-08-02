import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronRight,
} from 'lucide-react';

const NextButton = () => {
  const navigate = useNavigate();

  return (
    <button className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200" onClick={() => navigate(1)}>
        <ChevronRight className="h-5 w-5 text-gray-600" />
    </button>
  );
};

export default NextButton;