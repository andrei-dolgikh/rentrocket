
'use client'
import { Header } from "@/components/header/Header";
import { ReactNode } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="mx-[30px] max-w-[1000px] lg:mx-auto lg:px-[30px] pb-[30px]">
        {children}
      </div>
    </>
  );
}