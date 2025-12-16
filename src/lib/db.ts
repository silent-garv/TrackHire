/**
 * In-memory job database
 * This is a simple in-memory store for job applications
 * In a real application, this would be replaced with a proper database
 */

import { Job, CreateJobInput, JobStatus } from "@/types/job";

// In-memory storage for jobs
let jobs: Job[] = [
  {
    id: "1",
    companyName: "Google",
    role: "Senior Software Engineer",
    status: "Interview",
    appliedAt: "2024-12-01",
    updatedAt: "2024-12-10",
    userId: "demo-user",
    userEmail: "demo@example.com",
    userName: "Demo User",
  },
  {
    id: "2",
    companyName: "Microsoft",
    role: "Full Stack Developer",
    status: "Applied",
    appliedAt: "2024-12-05",
    updatedAt: "2024-12-05",
    userId: "demo-user",
    userEmail: "demo@example.com",
    userName: "Demo User",
  },
  {
    id: "3",
    companyName: "Apple",
    role: "Backend Engineer",
    status: "Rejected",
    appliedAt: "2024-11-20",
    updatedAt: "2024-12-08",
    userId: "demo-user",
    userEmail: "demo@example.com",
    userName: "Demo User",
  },
];

let nextId = 4;

/**
 * Get all jobs
 */
export function getAllJobs(): Job[] {
  return jobs;
}

/**
 * Get a single job by ID
 */
export function getJobById(id: string): Job | undefined {
  return jobs.find((job) => job.id === id);
}

/**
 * Create a new job
 */
export function createJob(
  input: CreateJobInput,
  userId: string = "demo-user",
  userEmail: string = "demo@example.com",
  userName: string = "Demo User"
): Job {
  const newJob: Job = {
    id: String(nextId++),
    ...input,
    userId,
    userEmail,
    userName,
    appliedAt: new Date().toISOString().split("T")[0],
    updatedAt: new Date().toISOString().split("T")[0],
  };

  jobs.push(newJob);
  return newJob;
}

/**
 * Update a job status
 */
export function updateJobStatus(id: string, status: JobStatus): Job | undefined {
  const job = jobs.find((j) => j.id === id);
  if (job) {
    job.status = status;
    job.updatedAt = new Date().toISOString().split("T")[0];
  }
  return job;
}

/**
 * Delete a job
 */
export function deleteJob(id: string): boolean {
  const index = jobs.findIndex((job) => job.id === id);
  if (index > -1) {
    jobs.splice(index, 1);
    return true;
  }
  return false;
}
