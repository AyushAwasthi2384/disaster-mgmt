import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 select-none">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg max-w-md w-full">
        <h1 className="text-9xl font-extrabold text-gray-800">404</h1>
        <p className="text-2xl text-gray-600 mt-4">Oops! Page not found.</p>
        <p className="text-lg text-gray-500 mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <button
            onClick={handleGoHome}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
