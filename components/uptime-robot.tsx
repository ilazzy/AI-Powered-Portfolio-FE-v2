import { LuSquareActivity } from "react-icons/lu";
import Link from "next/link";

export default function UptimeRobot() {
  return (
    <Link
      href={process.env.NEXT_PUBLIC_UPTIME_ROBOT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-3 right-3 z-50 w-10 h-10 bg-white text-gray-700 flex items-center justify-center rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-95 hover:text-gray-950 transition border border-black/10 dark:bg-white/10 dark:text-white/70"
      aria-label="Server Status"
      title="Server Status"
    >
      <LuSquareActivity className="text-lg" />
    </Link>
  );
}
