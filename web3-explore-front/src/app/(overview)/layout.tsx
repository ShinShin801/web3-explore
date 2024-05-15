"use client";
import TopNav from "@/app/ui/topnav";
import { RecoilRoot } from "recoil";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <div className="flex flex-col h-screen md:overflow-hidden">
        <div className="flex-none">
          <TopNav />
        </div>
        <div className="flex-grow p-6 pt-20 md:pt-20 md:overflow-y-auto md:p-12">
          {children}
        </div>
      </div>
    </RecoilRoot>
  );
}
