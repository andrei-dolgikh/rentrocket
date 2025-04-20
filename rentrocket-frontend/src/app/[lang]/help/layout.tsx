
import { ReactNode } from "react";

export default function HelpLayout({ children }: { children: ReactNode}) {
  return (
    <>
      <div className="max-w-[1000px] mx-auto  min-h-screen ">
        {children}
      </div>
    </>
  );
}