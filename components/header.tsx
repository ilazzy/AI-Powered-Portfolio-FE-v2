"use client";

import { useActiveSectionContext } from "@/context/active-section-context";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LINKS } from "@/constants";
import Link from "next/link";
import clsx from "clsx";

const Header = () => {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/chat") {
    return null;
  }

  return (
    <header className="z-[999] relative">
      <motion.div
        initial={{ y: 100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        className="fixed bottom-0 left-1/2 h-[4.5rem] w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:bottom-6 sm:h-[3.25rem] sm:w-[37rem] sm:rounded-full dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-75"
      />

      <nav className="flex fixed bottom-[0.15rem] left-1/2 h-12 -translate-x-1/2 py-2 sm:bottom-[1.7rem] sm:h-[initial] sm:py-0">
        <ul className="flex flex-wrap w-[22rem] items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:w-[initial] sm:flex-nowrap sm:gap-5">
          {LINKS.map((link) => (
            <motion.li
              className="h-3/4 flex items-center justify-center relative"
              key={link.hash}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {link.name === "Amicia" ? (
                <button
                  className={clsx(
                    "flex w-full items-center justify-center px-3 py-3 transition hover:text-gray-950 dark:hover:text-gray-200",
                    {
                      "glow-text": activeSection !== link.name,
                    }
                  )}
                  onClick={() => {
                    setActiveSection(link.name);
                    setTimeOfLastClick(Date.now());
                    router.push("/chat");
                  }}
                >
                  <img
                    src="/sparkle.svg"
                    alt="Sparkle"
                    className="mr-2 h-5 w-5"
                  />
                  {link.name}
                </button>
              ) : (
                <Link
                  className={clsx(
                    "flex w-full items-center justify-center px-3 py-3 hover:text-gray-950 transition dark:text-gray-400 dark:hover:text-gray-200",
                    {
                      "!text-gray-950 font-medium dark:!text-gray-100":
                        activeSection === link.name,
                      "text-gray-500 dark:text-gray-400":
                        activeSection !== link.name,
                    }
                  )}
                  href={link.hash}
                  onClick={() => {
                    setActiveSection(link.name);
                    setTimeOfLastClick(Date.now());
                  }}
                >
                  {link.name}

                  {link.name === activeSection && (
                    <motion.span
                      layoutId="activeSection"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      className="bg-gray-200/50 rounded-full absolute inset-0 -z-10 dark:bg-gray-800"
                    />
                  )}
                </Link>
              )}
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Add custom styles for mobile view */}
      <style jsx>{`
        @media (max-width: 640px) {
          .fixed {
            bottom: 1.3rem; /* Move up header slightly for mobile */
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
