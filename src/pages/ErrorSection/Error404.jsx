import React from "react";

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">

      {/* Image */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 mb-5 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl sm:text-4xl font-bold">
        404
      </div>

      {/* Error Text */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-800">Error 404</h1>
      <p className="text-gray-600 mb-6 max-w-md">The page you are looking for does not exist.</p>

      {/* Go Home Button */}
      <a
        href="/"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
      >
        Go Home
      </a>
    </div>
  );
};

export default Error404;
