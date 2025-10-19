import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg px-4">
      <div className="max-w-lg text-center bg-white p-10 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-center mb-6 text-yellow-500">
          <AlertTriangle size={64} />
        </div>
        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 btn-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          ⬅ Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
