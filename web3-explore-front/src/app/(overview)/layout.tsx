"use client";
import TopNav from "@/app/ui/topnav";
import { createContext, useState, Dispatch, SetStateAction } from "react";

// export type WalletContextType = string;
export interface WalletContextType {
  currentAddress: string | null;
  setCurrentAddress: Dispatch<SetStateAction<string>>;
}
export const WalletContext = createContext<WalletContextType>({
  currentAddress: "",
  setCurrentAddress: () => {},
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const [currentAddress, setCurrentAddress] = useState("");

  return (
    <WalletContext.Provider value={{ currentAddress, setCurrentAddress }}>
      <div className="flex flex-col h-screen md:overflow-hidden">
        <div className="flex-none">
          <TopNav />
        </div>
        <div className="flex-grow p-6 pt-20 md:pt-20 md:overflow-y-auto md:p-12">
          {children}
        </div>
      </div>
    </WalletContext.Provider>
  );
}
