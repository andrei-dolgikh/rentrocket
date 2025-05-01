
import { ReactNode } from "react";

export default function MyspaceLayout({ children }: { children: ReactNode}) {
  return (
    <>
      <div className="mx-auto max-w-[1200px] px-[30px]">
        {children}
      </div>
    </>
  );
}