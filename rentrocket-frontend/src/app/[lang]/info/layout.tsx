
import { ReactNode } from "react";

export default function InfoLayout({ children }: { children: ReactNode}) {
  return (
    <>
      <div className="max-w-[1000px] mx-auto px-[30px] min-h-screen ">
        {children}
      </div>
    </>
  );
}