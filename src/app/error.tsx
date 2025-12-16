/**
 * Error Component
 * Displays error state and provides recovery options
 * Handles errors thrown in child components
 */

"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error for debugging
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Something went wrong!
          </h1>
          <p className="text-gray-600 mb-6">
            An error occurred while loading the page. Please try again.
          </p>

          <div className="bg-red-50 border border-red-200 rounded p-4 mb-6 text-left">
            <p className="text-sm text-red-800 font-mono break-words">
              {error.message || "Unknown error"}
            </p>
          </div>

          <button
            onClick={reset}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
