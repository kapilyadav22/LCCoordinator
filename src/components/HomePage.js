import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../layout/CustomButton";
import { BookOpen, Code2, LineChart, Layers, TerminalSquare, Zap } from "lucide-react";

const HomePage = () => {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-cyan-500" />,
      title: "Structured Roadmaps",
      description: "Follow clear, step-by-step paths designed to take you from beginner to advanced without the guesswork."
    },
    {
      icon: <TerminalSquare className="w-8 h-8 text-teal-500" />,
      title: "Interactive Coding",
      description: "Practice directly with our curated lists of LeetCode problems categorized by patterns and difficulty."
    },
    {
      icon: <LineChart className="w-8 h-8 text-yellow-500" />,
      title: "Visual Learning",
      description: "Understand complex algorithms through intuitive visualizers that show exactly how data changes over time."
    }
  ];

  const tracks = [
    { title: "Data Structures", desc: "Arrays, Trees, Graphs & more", color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20" },
    { title: "Algorithms", desc: "Sorting, DP, Backtracking", color: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20" },
    { title: "System Design", desc: "Scalability & Architecture", color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20" },
    { title: "Core CS", desc: "OS, Databases, Networks", color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20" },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center px-4 overflow-hidden border-b border-gray-200/50 dark:border-gray-800/50">

        <div
          className={`max-w-4xl text-center transition-all duration-1000 ease-out transform ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="mb-6 inline-block px-4 py-1.5 rounded-full border border-title-main/30 bg-title-main/5 text-title-main text-sm font-semibold tracking-wide uppercase">
            Empower Your Mind
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-title-main mb-6 leading-tight tracking-tight">
            Master Algorithms & <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-yellow-500">
              Data Structures
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
            A comprehensive platform to redefine the way we learn. 
            Dive into curated roadmaps, visualizers, and guides designed to crack top tech interviews.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CustomButton
              onClick={() => navigate("/prepare")}
              className="px-8 py-4 text-lg bg-title-main text-white hover:bg-title-main/90 transform hover:scale-105 transition-all shadow-lg hover:shadow-title-main/30 rounded-xl"
            >
              Start Preparing Now
            </CustomButton>
            
            <button
              onClick={() => navigate("/articles")}
              className="px-8 py-4 text-lg font-medium text-title-main bg-transparent border-2 border-title-main/20 hover:border-title-main/50 rounded-xl transition-all hover:bg-title-main/5"
            >
              Explore Articles
            </button>
          </div>
        </div>
      </section>

      {/* 2. FEATURES SECTION */}
      <section className="w-full py-20 px-4 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-title-main mb-4">Why Learn With Us?</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">We provide the tools you need to build a strong foundation in computer science and software engineering.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="mb-6 p-4 inline-block bg-gray-50 dark:bg-gray-900 rounded-xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. LEARNING TRACKS TEASER */}
      <section className="w-full py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-title-main mb-4">Popular Tracks</h2>
              <p className="text-text-secondary text-lg max-w-2xl">Jump straight into our most popular study materials.</p>
            </div>
            <button 
              onClick={() => navigate("/prepare")}
              className="text-title-main font-medium hover:underline flex items-center gap-1"
            >
              View all tracks <Zap className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tracks.map((track, idx) => (
              <div 
                key={idx} 
                onClick={() => navigate("/prepare")}
                className={`p-6 rounded-2xl border cursor-pointer hover:-translate-y-1 transition-transform duration-300 ${track.color}`}
              >
                <Layers className="w-8 h-8 mb-4 opacity-80" />
                <h3 className="text-lg font-bold mb-2">{track.title}</h3>
                <p className="text-sm opacity-90">{track.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <section className="w-full py-24 px-4 bg-title-main/5 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-title-main mb-6">Ready to crush your next interview?</h2>
          <p className="text-xl text-text-secondary mb-10">Join our community and start tracking your progress today.</p>
          <CustomButton
            onClick={() => navigate("/signup")}
            className="px-10 py-4 text-xl bg-title-main text-white hover:bg-title-main/90 shadow-lg rounded-xl"
          >
            Create a Free Account
          </CustomButton>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
