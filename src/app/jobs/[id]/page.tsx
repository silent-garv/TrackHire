/**
 * Job Detail Page
 * Displays detailed information about a specific job application
 * Uses dynamic route segment [id] to fetch the job by ID
 */

import { notFound } from "next/navigation";
import Link from "next/link";
import { getJobById } from "@/lib/db";
import { StatusBadge } from "@/app/components/status-badge";
import type { Metadata } from "next";

interface JobDetailPageProps {
  params: {
    id: string;
  };
}

/**
 * Generate metadata dynamically for this page
 * Shows the job title and company in the page title
 */
export async function generateMetadata(
  { params }: JobDetailPageProps
): Promise<Metadata> {
  const { id } = await params;
  const job = getJobById(id);

  if (!job) {
    return {
      title: "Job Not Found",
    };
  }

  return {
    title: `${job.role} at ${job.companyName} - Smart Job Tracker`,
    description: `Job application details for ${job.role} position at ${job.companyName}`,
  };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  // Fetch the job from in-memory storage
  const { id } = await params;
  const job = getJobById(id);

  // Show 404 page if job not found
  if (!job) {
    notFound();
  }

  // Calculate days since applied
  const appliedDate = new Date(job.appliedAt);
  const today = new Date();
  const daysSinceApplied = Math.floor(
    (today.getTime() - appliedDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div>
      {/* Back Button */}
      <Link
        href="/jobs"
        className="inline-block mb-6 text-blue-600 hover:text-blue-800 font-medium"
      >
        ← Back to All Jobs
      </Link>

      {/* Job Details Card */}
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {job.role}
            </h1>
            <h2 className="text-2xl text-gray-600">{job.companyName}</h2>
          </div>
          <StatusBadge status={job.status} />
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Application Status
              </label>
              <p className="text-lg text-gray-900">{job.status}</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Applied Date
              </label>
              <p className="text-lg text-gray-900">{job.appliedAt}</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Last Updated
              </label>
              <p className="text-lg text-gray-900">{job.updatedAt}</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Days Since Applied
              </label>
              <p className="text-lg text-gray-900">
                {daysSinceApplied} day{daysSinceApplied !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>

        {/* Status Info Box */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>Tip:</strong> Keep track of follow-ups and interviews.
            Reach out to the company after 1-2 weeks if you haven't heard back
            for positions you're interested in.
          </p>
        </div>

        {/* Job ID for reference */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">Job ID: {job.id}</p>
        </div>
      </div>
    </div>
  );
}
