/**
 * Jobs List Page
 * Displays all job applications in a list view
 * Protected route - requires authentication
 */

"use client";

import { Suspense } from "react";
import { JobsList } from "../components/jobs-list";
import Loading from "../loading";
import { ProtectedPage } from "@/lib/protected-page";

function JobsContent() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          All Job Applications
        </h1>
        <p className="text-gray-600">
          Complete list of all your job applications
        </p>
      </div>

      <Suspense fallback={<Loading />}>
        <JobsList />
      </Suspense>
    </div>
  );
}

export default function JobsPage() {
  return (
    <ProtectedPage>
      <JobsContent />
    </ProtectedPage>
  );
}
