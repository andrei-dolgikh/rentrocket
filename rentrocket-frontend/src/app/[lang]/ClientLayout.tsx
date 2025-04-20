
import { ReactNode } from "react";

export default function ClientLayout({ children, lang, dictionary }: { children: ReactNode, lang: string, dictionary: Record<string, any> }) {
  return (
    <>
      <div className="pb-[30px]">
        {children}
      </div>
    </>
  );
}