/**
 * Firestore Service
 * Handles all Firebase Firestore database operations for jobs
 */

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
  QueryConstraint,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";
import { db } from "./firebase";
import { Job, JobStatus } from "@/types/job";

const JOBS_COLLECTION = "jobs";

interface JobData {
  companyName: string;
  role: string;
  status: JobStatus;
  userId: string;
  userEmail: string;
  userName: string;
  appliedAt: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * Add a new job to Firestore
 */
export async function addJobToFirestore(
  userId: string,
  jobData: Omit<Job, "id">
): Promise<string> {
  try {
    // Check for duplicate first
    const isDuplicate = await checkDuplicateJob(userId, jobData.companyName, jobData.role);
    if (isDuplicate) {
      throw new Error("This job application already exists. Please edit the existing entry instead.");
    }

    const docRef = await addDoc(collection(db, JOBS_COLLECTION), {
      companyName: jobData.companyName,
      role: jobData.role,
      status: jobData.status,
      userId: userId,
      userEmail: jobData.userEmail,
      userName: jobData.userName,
      appliedAt: Timestamp.now(),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    } as JobData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding job:", error);
    throw error instanceof Error ? error : new Error("Failed to add job to database");
  }
}

/**
 * Check if a job application already exists for this user
 */
export async function checkDuplicateJob(
  userId: string,
  companyName: string,
  role: string
): Promise<boolean> {
  try {
    const q = query(
      collection(db, JOBS_COLLECTION),
      where("userId", "==", userId),
      where("companyName", "==", companyName),
      where("role", "==", role)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.size > 0;
  } catch (error) {
    console.error("Error checking duplicate:", error);
    return false;
  }
}

/**
 * Get all jobs for a specific user
 */
export async function getUserJobs(userId: string): Promise<Job[]> {
  try {
    const q = query(
      collection(db, JOBS_COLLECTION),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data() as JobData;
      return {
        id: doc.id,
        companyName: data.companyName,
        role: data.role,
        status: data.status,
        appliedAt: data.appliedAt.toDate().toISOString().split("T")[0],
        updatedAt: data.updatedAt.toDate().toISOString().split("T")[0],
        userId: data.userId,
        userEmail: data.userEmail,
        userName: data.userName,
      };
    });
  } catch (error) {
    console.error("Error getting jobs:", error);
    throw new Error("Failed to fetch jobs from database");
  }
}

/**
 * Listen to real-time updates for jobs of a specific user
 * Returns an unsubscribe function to stop listening
 */
export function onUserJobsSnapshot(
  userId: string,
  onUpdate: (jobs: Job[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  try {
    const q = query(
      collection(db, JOBS_COLLECTION),
      where("userId", "==", userId)
    );

    return onSnapshot(
      q,
      (querySnapshot) => {
        const jobs = querySnapshot.docs.map((doc) => {
          const data = doc.data() as JobData;
          return {
            id: doc.id,
            companyName: data.companyName,
            role: data.role,
            status: data.status,
            appliedAt: data.appliedAt.toDate().toISOString().split("T")[0],
            updatedAt: data.updatedAt.toDate().toISOString().split("T")[0],
            userId: data.userId,
            userEmail: data.userEmail,
            userName: data.userName,
          };
        });
        onUpdate(jobs);
      },
      (error) => {
        console.error("Error listening to jobs:", error);
        if (onError) {
          onError(new Error("Failed to listen to jobs updates"));
        }
      }
    );
  } catch (error) {
    console.error("Error setting up jobs listener:", error);
    if (onError) {
      onError(error instanceof Error ? error : new Error("Failed to set up listener"));
    }
    return () => {}; // Return empty unsubscribe function
  }
}

/**
 * Get a single job by ID
 */
export async function getJobById(jobId: string): Promise<Job | null> {
  try {
    const docRef = doc(db, JOBS_COLLECTION, jobId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as JobData;
      return {
        id: docSnap.id,
        companyName: data.companyName,
        role: data.role,
        status: data.status,
        appliedAt: data.appliedAt.toDate().toISOString().split("T")[0],
        updatedAt: data.updatedAt.toDate().toISOString().split("T")[0],
        userId: data.userId,
        userEmail: data.userEmail,
        userName: data.userName,
      };
    }
    return null;
  } catch (error) {
    console.error("Error getting job:", error);
    throw new Error("Failed to fetch job from database");
  }
}

/**
 * Update a job
 */
export async function updateJobInFirestore(
  jobId: string,
  updates: Partial<Omit<Job, "id" | "appliedAt">>
): Promise<void> {
  try {
    const docRef = doc(db, JOBS_COLLECTION, jobId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating job:", error);
    throw new Error("Failed to update job in database");
  }
}

/**
 * Delete a job
 */
export async function deleteJobFromFirestore(jobId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, JOBS_COLLECTION, jobId));
  } catch (error) {
    console.error("Error deleting job:", error);
    throw new Error("Failed to delete job from database");
  }
}

/**
 * Get job statistics for a user
 */
export async function getJobStats(userId: string): Promise<{
  total: number;
  applied: number;
  interview: number;
  rejected: number;
}> {
  try {
    const jobs = await getUserJobs(userId);
    return {
      total: jobs.length,
      applied: jobs.filter((j) => j.status === "Applied").length,
      interview: jobs.filter((j) => j.status === "Interview").length,
      rejected: jobs.filter((j) => j.status === "Rejected").length,
    };
  } catch (error) {
    console.error("Error getting job stats:", error);
    throw new Error("Failed to fetch job statistics");
  }
}

/**
 * Subscribe to real-time job statistics for a user
 */
export interface JobStats {
  total: number;
  inProgress: number;
  interviewed: number;
  successRate: number;
}

export function onJobStatsSnapshot(
  userId: string,
  onUpdate: (stats: JobStats) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  try {
    const q = query(
      collection(db, JOBS_COLLECTION),
      where("userId", "==", userId)
    );

    return onSnapshot(
      q,
      (snapshot) => {
        const jobs = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            companyName: data.companyName || "",
            role: data.role || "",
            status: data.status as JobStatus,
            appliedAt: data.appliedAt?.toDate?.()?.toISOString()?.split("T")[0] || "",
            updatedAt: data.updatedAt?.toDate?.()?.toISOString()?.split("T")[0] || "",
            userId: data.userId || "",
            userEmail: data.userEmail || "",
            userName: data.userName || "",
          };
        });

        const total = jobs.length;
        const inProgress = jobs.filter((j) => j.status === "Interview").length;
        const interviewed = jobs.filter((j) => j.status === "Interview").length;
        const successRate = total > 0 ? Math.round((interviewed / total) * 100) : 0;

        onUpdate({
          total,
          inProgress,
          interviewed,
          successRate,
        });
      },
      (error) => {
        console.error("Error fetching job stats:", error);
        if (onError) {
          onError(new Error("Failed to fetch job statistics"));
        }
      }
    );
  } catch (error) {
    console.error("Error setting up stats listener:", error);
    if (onError) {
      onError(new Error("Failed to set up statistics listener"));
    }
    return () => {}; // Return empty unsubscribe function
  }
}
