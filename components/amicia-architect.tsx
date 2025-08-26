"use client";

import { usePathname } from "next/navigation";
import { LuBrain } from "react-icons/lu";
import Link from "next/link";

export default function AmiciaArchitect() {
  const pathname = usePathname();

  if (pathname !== "/chat") return null;

  return (
    <Link
      href={process.env.NEXT_PUBLIC_AMICIA_ARCHITECT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-3 right-16 z-50 w-10 h-10 bg-white text-gray-700 flex items-center justify-center rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-95 hover:text-gray-950 transition border border-black/10 dark:bg-white/10 dark:text-white/70"
      aria-label="Amicia Architect"
      title="Amicia Architect"
    >
      <LuBrain />
    </Link>
  );
}
