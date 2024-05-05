"use client";
import React from "react";
import TokenForm from "@/app/ui/tokens/tokenForm";

export default function Page() {
  return (
    <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <div className="flex flex-col items-center justify-center"></div>
      <TokenForm />
    </div>
  );
}
