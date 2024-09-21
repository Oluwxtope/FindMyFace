import React from 'react';
import logo from './../assets/images/logo.png'; // Ensure you have the correct path to the logo

const NotFound: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">FaceBlock</h1>
        <img
          alt="FaceBlock Logo"
          src={logo}
          className="w-32 h-32"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          404 - Page Not Found
        </h2>
        <p className="mt-4 text-center text-sm text-gray-600">
          Sorry, the page you are looking for does not exist.
        </p>
        <a
          href="/"
          className="mt-6 text-indigo-600 hover:text-indigo-500 font-semibold text-sm"
        >
          Go back to the homepage
        </a>
      </div>
    </div>
  );
};

export default NotFound;
