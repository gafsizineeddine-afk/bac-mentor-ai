import { gradeAnswer, type GradeBreakdown } from "./engines";
import { findQuestionById, getQuestion, type BankQuestion } from "@/lib/data/questions";

/**
 * Client-side replacement for the former POST /api/grade route.
 *
 * The ONEC grading engine is fully deterministic and offline, so the API route
 * was pure pass-through. Running it in-process lets the app ship as a static
 * export (GitHub Pages) with zero server runtime.
 */
export interface LocalGradeResult {
  awarded: number;
  maxScore: number;
  feedback: string;
  correction: string;
  deductionReason: string | null;
  breakdown: GradeBreakdown;
  questionId: string | null;
}

function resolveQuestion(subject: string | undefined, questionId: string | undefined): BankQuestion | undefined {
  if (questionId) {
    const byId = findQuestionById(questionId);
    if (byId) return byId;
  }
  const s = subject ?? "HISTORY_GEOGRAPHY";
  return getQuestion(s, questionId ?? "1").question;
}

export function gradeLocally(input: {
  submittedAnswer: string;
  subject?: string;
  questionId?: string;
}): LocalGradeResult {
  const question = resolveQuestion(input.subject, input.questionId);
  const grade = gradeAnswer(
    input.submittedAnswer,
    question,
    input.subject ?? question?.subject ?? "HISTORY_GEOGRAPHY"
  );

  return {
    awarded: grade.awarded,
    maxScore: grade.maxScore,
    feedback: grade.feedback,
    correction:
      question?.officialCorrection ??
      "زعيم وطني جزائري، مؤسس حزب الشعب الجزائري (1937)، رائد الحركة الوطنية.",
    deductionReason: grade.deductionReason,
    breakdown: grade.breakdown,
    questionId: question?.id ?? null,
  };
}
