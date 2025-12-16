/**
 * API route handler for job operations
 * GET /api/jobs - returns all jobs
 * POST /api/jobs - creates a new job
 */

import { NextRequest, NextResponse } from "next/server";
import { getAllJobs, createJob } from "@/lib/db";
import { CreateJobInput } from "@/types/job";

/**
 * GET /api/jobs
 * Returns all job applications
 */
export async function GET() {
  try {
    const jobs = getAllJobs();
    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/jobs
 * Creates a new job application
 */
export async function POST(request: NextRequest) {
  try {
    const body: CreateJobInput = await request.json();

    // Validate input
    if (!body.companyName || !body.role || !body.status) {
      return NextResponse.json(
        { error: "Missing required fields: companyName, role, status" },
        { status: 400 }
      );
    }

    // Valid statuses
    if (!["Applied", "Interview", "Rejected"].includes(body.status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be: Applied, Interview, or Rejected" },
        { status: 400 }
      );
    }

    const newJob = createJob(body);

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}
