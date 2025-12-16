/**
 * Job application type definition
 * This interface represents a job application in the Smart Job Tracker
 */
export type JobStatus = "Applied" | "Interview" | "Rejected";

export interface Job {
  id: string;
  companyName: string;
  role: string;
  status: JobStatus;
  appliedAt: string; // ISO date string
  updatedAt: string; // ISO date string
  userId: string;
  userEmail: string;
  userName: string;
}

export interface CreateJobInput {
  companyName: string;
  role: string;
  status: JobStatus;
}
