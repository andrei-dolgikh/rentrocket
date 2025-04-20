
import { ReactNode } from "react";

export default function FlatPageLayout({ children }: { children: ReactNode}) {
  return (
    <>
      <div className="max-w-[1000px] mx-autom px-[30px]  min-h-screen ">
        {children}
      </div>
    </>
  );
}