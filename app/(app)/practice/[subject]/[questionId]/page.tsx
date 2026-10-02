import { questionsOf } from "@/lib/data/questions";
import { PracticeClient } from "./PracticeClient";

// Static export: only these params are emitted as HTML.
export const dynamicParams = false;

export function generateStaticParams(): { subject: string; questionId: string }[] {
  const params: { subject: string; questionId: string }[] = [];
  for (const q of questionsOf("HISTORY_GEOGRAPHY")) {
    // In-app links address questions by index ("/practice/<subject>/3"),
    // but accept the canonical id too.
    params.push({ subject: q.subject, questionId: String(q.index) });
    params.push({ subject: q.subject, questionId: q.id });
  }
  return params;
}

export default async function PracticePage({
  params,
}: {
  params: Promise<{ subject: string; questionId: string }>;
}) {
  const { subject, questionId } = await params;
  return <PracticeClient subject={subject} questionId={questionId} />;
}
