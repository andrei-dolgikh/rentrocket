
import { ReactNode } from "react";

export default function MyspaceLayout({ children }: { children: ReactNode}) {
  return (
    <>
      <div className="max-w-[1000px] mx-auto">
        {children}
      </div>
    </>
  );
}