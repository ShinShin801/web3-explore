"use client";
import { createContext, Dispatch, SetStateAction } from "react";

interface WalletContextType {
  address: string | null;
  setAddress: Dispatch<SetStateAction<string>>;
}

export const CurrentWalletContext = createContext<WalletContextType | null>(
  null
);
