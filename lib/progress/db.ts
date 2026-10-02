import Dexie, { type Table } from "dexie";

export interface SubmissionRecord {
  id?: number;
  questionId: string;
  subject: string;
  answer: string;
  awarded: number;
  maxScore: number;
  createdAt: number;
}

export interface LessonRecord {
  lessonId: string;
  doneAt: number;
}

export interface ProfileRecord {
  id: string;
  name: string;
  targetDate: string;
  dailyMinutes: number;
}

class BACDatabase extends Dexie {
  submissions!: Table<SubmissionRecord, number>;
  lessons!: Table<LessonRecord, string>;
  profile!: Table<ProfileRecord, string>;

  constructor() {
    super("bac-mentor-ai");
    this.version(1).stores({
      submissions: "++id,subject,questionId,createdAt",
      lessons: "lessonId",
      profile: "id",
    });
  }
}

export const db = new BACDatabase();

export async function getProfile(): Promise<ProfileRecord> {
  const existing = await db.profile.get("me");
  if (existing) return existing;
  const fresh: ProfileRecord = {
    id: "me",
    name: "",
    targetDate: "2026-06-14",
    dailyMinutes: 60,
  };
  await db.profile.put(fresh);
  return fresh;
}
