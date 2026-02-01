"use client";

import Image from "next/image";

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ 
  message = "Loading .." 
}: LoadingScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-6 w-full h-screen overflow-hidden bg-white gap-4 sm:gap-6">
      {/* Message */}
      <p className="font-inter font-semibold text-lg md:text-xl leading-7 text-[#242529] text-center whitespace-nowrap">
        "{message}"
      </p>

      {/* Loading Icon */}
      <div className="w-8 h-8 sm:w-10 sm:h-10 relative animate-spin">
        <Image
          src="/Loading.png"
          alt="Loading"
          fill
          sizes="(max-width: 640px) 32px, 40px"
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
