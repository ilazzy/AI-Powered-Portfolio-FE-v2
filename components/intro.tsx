// Import necessary dependencies and components.
"use client"; // This comment indicates that this code should run on the client side in Next.js.

import { useEffect } from "react";
import { EXTRA_LINKS, OWNER_NAME } from "@/constants";
import { useSectionInView } from "@/lib/hooks";
import { BsLinkedin } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";
import { HiEye } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";

// Define the Intro component.
const Intro = () => {
  // Use the 'useSectionInView' hook to track section visibility.
  const { ref } = useSectionInView("Home", 0.5);

  // Call the /visitor API when the component mounts
  useEffect(() => {
    const callVisitorApi = async () => {
      try {
        await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/visitor", {
          method: "GET",
        });
      } catch (error) {
        console.error("Failed to call /visitor API:", error);
      }
    };
    callVisitorApi();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Use the 'useActiveSectionContext' to manage active sections and clicks.
  // const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem] pt-20 sm:pt-36"
    >
      <div className="flex items-center justify-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "tween",
              duration: 0.2,
            }}
          >
            <Image
              src="/syed-ahamed.png"
              alt={`${OWNER_NAME.split(" ")[0]} portrait`}
              width={192}
              height={192}
              quality={95}
              priority={true}
              className="h-24 w-24 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
            />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 125,
              delay: 0.1,
              duration: 0.7,
            }}
            className="absolute text-2xl bottom-0 right-0"
          >
            👋
          </motion.span>
        </div>
      </div>

      <motion.h1
        className="mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <b className="font-bold">Hi, I&apos;m {OWNER_NAME}.</b> I&apos;m a{" "}
        <b className="font-bold">Backend developer</b> with{" "}
        <b className="font-bold">3+ years</b> of experience.{" "}
        <span className="mt-6 block">
          I love building solid backend systems and breaking others just to see
          how they work{" "}
        </span>
        <span className="mt-6 block">
          My focus is Nodejs (with a growing interest in security and AI
          implementation)
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col gap-y-4 sm:flex-row sm:gap-x-2 justify-center items-center"
      >
        <div className="flex gap-2 flex-col sm:flex-row text-lg font-medium">
          <Link
            href={EXTRA_LINKS.resume}
            target="_blank"
            className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-105 hover:scale-105 active:scale-95 transition borderBlack dark:bg-white/10"
          >
            Resume
            <HiEye />
          </Link>
        </div>
        <div className="flex gap-2 text-lg font-medium">
          <Link
            href={EXTRA_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-4 text-gray-700 flex items-center gap-2 rounded-full outline-none focus:scale-[1.1] hover:scale-[1.1] active:scale-95 hover:text-gray-950 transition borderBlack dark:bg-white/10 dark:text-white/60"
            aria-label="Linkedin"
            title="Linkedin"
          >
            <BsLinkedin />
          </Link>

          <Link
            href={`mailto:${EXTRA_LINKS.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-4 text-gray-700 flex items-center gap-2 rounded-full outline-none focus:scale-[1.1] hover:scale-[1.1] active:scale-95 hover:text-gray-950 transition borderBlack dark:bg-white/10 dark:text-white/60"
            aria-label="Email"
            title="Email"
          >
            <MdEmail />
          </Link>

          <Link
            href={EXTRA_LINKS.whatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-4 text-gray-700 flex items-center gap-2 rounded-full outline-none focus:scale-[1.1] hover:scale-[1.1] active:scale-95 hover:text-gray-950 transition borderBlack dark:bg-white/10 dark:text-white/60"
            aria-label="WhatsApp"
            title="WhatsApp"
          >
            <FaWhatsapp />
          </Link>

          <Link
            href="/chat"
            rel="noopener noreferrer"
            className="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full outline-none focus:scale-[1.1] hover:scale-[1.1] active:scale-95 hover:text-gray-950 transition borderBlack dark:bg-white/10 dark:text-white/60"
            aria-label="Talk To Amicia"
            title="Talk To Amicia"
          >
            <span className="glow-motion-icon w-5 h-5 inline-block"></span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Intro;
