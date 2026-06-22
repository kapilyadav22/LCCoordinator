import { motion } from "framer-motion";
import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext.js";

const AboutPage = () => {
  const { mode } = useContext(ThemeContext);
  const ProfilePic = new URL("../assets/icons/about.png", import.meta.url).href;

  return (
    <div
      className={`
        w-full max-w-7xl mx-auto min-h-[550px] py-8 sm:py-12 px-4 sm:px-8 
        rounded-2xl shadow-lg mt-8
        ${mode === "light" ? "bg-white" : "bg-gray-900 border border-gray-800"}
      `}
    >
      <div className="mt-8 mb-8 sm:mb-12">
        <div className="flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
          {/* Left Content Section */}
          <div className="w-full md:w-2/3">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-3xl sm:text-4xl font-bold font-sans tracking-wide text-text-primary mb-4">
                About Me
              </h1>
              <div className="h-px bg-purple-200 mb-6 sm:mb-8 w-full"></div>

              <div className="mb-6 sm:mb-8 text-base sm:text-lg text-text-primary font-sans leading-relaxed">
                <p>
                  I’m Kapil Kumar Yadav, a software engineer with 2.5+ years of
                  experience building scalable web applications.
                </p>
              </div>

              <div className="mb-6 sm:mb-8 text-base sm:text-lg text-text-primary font-sans leading-relaxed">
                <p>
                  I also hold an M.Tech degree from Delhi Technological
                  University.
                </p>
              </div>

              <div className="mb-6 sm:mb-8 text-base sm:text-lg text-text-primary font-sans leading-relaxed">
                <p>
                  I work across the stack using Java & Spring Boot on the
                  backend and React / Next.js on the frontend, with a strong
                  focus on problem solving and system design.
                </p>
              </div>

              <div className="mb-8 text-base sm:text-lg text-text-primary font-sans leading-relaxed">
                <p>
                  I enjoy building clean, reliable systems and turning complex
                  requirements into practical, maintainable solutions.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="w-full md:w-1/3 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <img
                alt="Profile photo of Kapil Kumar Yadav"
                src={ProfilePic}
                className="
                  w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[300px] md:h-[300px] lg:w-[320px] lg:h-[320px]
                  rounded-full shadow-lg object-cover transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl
                "
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
