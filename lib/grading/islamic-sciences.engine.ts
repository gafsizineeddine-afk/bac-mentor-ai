import { z } from "zod";
export const RulingKeywords = ["وجوب","تحريم","استحباب","كراهة","جواز","إباحة"] as const;
export const BenefitPrefixes = ["الحث على","الدعوة إلى","بيان","التذكير ب","التحذير من"] as const;

export const IslamicGradingSchema = z.object({
  awarded: z.number().min(0).max(1),
  isRulingValid: z.boolean(),
  isBenefitValid: z.boolean(),
  feedback: z.string(),
  correction: z.string(),
  deductionReason: z.string().nullable()
});
export type IslamicGrading = z.infer<typeof IslamicGradingSchema>;

export function validateRulingVsBenefit(answer: string): { isRuling: boolean; isBenefit: boolean } {
  const normalized = answer.trim();
  const isRuling = RulingKeywords.some(k => normalized.startsWith(k));
  const isBenefit = BenefitPrefixes.some(p => normalized.startsWith(p)) && !RulingKeywords.some(k => normalized.includes(k));
  return { isRuling, isBenefit };
}
export const ISLAMIC_SYSTEM_PROMPT = `أنت مصحح وزاري علوم إسلامية ONEC. الحكم يبدأ بوجوب/تحريم/استحباب/كراهة/جواز وإلا 0. الفائدة تبدأ بالحث على/الدعوة إلى/بيان ولا تحتوي لفظ حكم.`;
