
import { ReactNode } from "react";

export default function ClientLayout({ children, lang, dictionary }: { children: ReactNode, lang: string, dictionary: Record<string, any> }) {
  return (
    <>
      <div className="mx-[30px] max-w-[1000px] lg:mx-auto lg:px-[30px] pb-[30px]">
        {children}
      </div>
    </>
  );
}