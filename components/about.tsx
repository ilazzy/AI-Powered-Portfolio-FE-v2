// client-side component
"use client";

// Import necessary dependencies and components.
import { useSectionInView } from "@/lib/hooks";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";

// Define the About component.
const About = () => {
  // Use the useSectionInView custom hook to track when the "About" section is in view.
  const { ref } = useSectionInView("About");

  // Return the About section, which uses framer-motion for animations.
  return (
    <motion.section
      ref={ref}
      id="about"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
    >
      {/* Display the section heading for "About me." */}
      <SectionHeading>About me</SectionHeading>

      {/* Display a paragraph with information about the user's background and interests. */}
      <p className="mb-3">
        After completing my college education, I began my professional journey
        by earning a certification in Python. Shortly after, I received an
        opportunity to work as a <b className="font-high">Backend Developer</b>{" "}
        using Node.js, where I’ve since gained{" "}
        <b className="font-high">three years of hands-on experience</b> building
        and maintaining server-side applications. Alongside my development work,
        I’ve developed a strong interest in cybersecurity—particularly in{" "}
        <b className="font-high">API Penetration and Black-box testing</b>. I
        regularly conduct black-box testing and responsibly report my findings,
        which has led to recognition and appreciation from relevant teams and
        organizations. Currently, I’m focused on sharpening my{" "}
        <b className="font-high">Data Structures and Algorithms (DSA) skills</b>{" "}
        and <b className="font-high">learning React</b> to broaden my skillset.
        I’m also actively looking to grow my professional network and explore
        new opportunities that align with my passion for backend development,
        security, and continuous learning.
      </p>
    </motion.section>
  );
};

// Export the About component.
export default About;
