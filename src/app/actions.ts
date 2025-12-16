/**
 * Server action to add a new job
 * This action is called from the client form and handles creating a new job
 * It uses revalidatePath to refresh the data after mutation
 */

"use server";

import { revalidatePath } from "next/cache";
import { createJob } from "@/lib/db";
import { CreateJobInput } from "@/types/job";

export async function addJobAction(input: CreateJobInput) {
  try {
    // Create the job
    const newJob = createJob(input);

    // Revalidate the pages that display jobs to refresh the data
    revalidatePath("/");
    revalidatePath("/jobs");

    return {
      success: true,
      job: newJob,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to add job",
    };
  }
}
