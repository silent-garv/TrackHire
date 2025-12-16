/**
 * Not Found Page
 * Displays a user-friendly message when a requested resource doesn't exist
 */

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Job Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          We couldn't find the job application you're looking for. It may have
          been removed or the ID might be incorrect.
        </p>
        <Link
          href="/jobs"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          View All Jobs
        </Link>
      </div>
    </div>
  );
}
