import type { Metadata } from "next";
import { HistoryNav } from "@/components/history/HistoryNav";

export const metadata: Metadata = {
  title: "قسم التاريخ | BAC Mentor AI",
  description:
    "قاعدة بيانات التاريخ الاحترافية لبكالوريا الجزائر: دروس مفصلة، مصطلحات، شخصيات، تواريخ، خرائط، بطاقات مراجعة وأرشيف البكالوريا 2015-2026.",
};

export default function HistoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div dir="rtl" lang="ar" className="min-h-screen bg-[#FBFBFA] dark:bg-[#0F1115]">
      <HistoryNav />
      {children}
    </div>
  );
}
