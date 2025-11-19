"use client";
import React, { useState, useEffect } from "react";
import {
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import localFont from "next/font/local";
const ClashDisplay = localFont({
  src: "../fonts/ClashDisplay_Complete/Fonts/WEB/fonts/ClashDisplay-Variable.woff2",
});

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [floatingElements, setFloatingElements] = useState<
    Array<{ id: number; x: number; y: number; delay: number }>
  >([]);

  useEffect(() => {
    setIsVisible(true);

    // Generate floating elements for ambient animation
    const elements = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
    }));
    setFloatingElements(elements);
  }, []);

  return (
    <div
      className={` selection:bg-teal-200 selection:text-teal-950 min-h-screen bg-gradient-to-br from-slate-800 via-teal-900 to-slate-900 relative overflow-hidden ${ClashDisplay.className}`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute w-2 h-2 bg-teal-300 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-teal-500 rounded-full opacity-10 blur-3xl animate-pulse animation-duration-[10s]" />
      <div
        className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-400 rounded-full opacity-10 blur-3xl animate-pulse animation-duration-[10s]"
        style={{ animationDelay: "5s" }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-6 text-center pt-20">
        {/* Logo */}
        <div
          className={`absolute top-0 left-0 flex flex-col md:flex-row items-center justify-between md:justify-center px-5 gap-2 mb-12 py-4 w-full transition-all duration-1000 z-50 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <h1 className="text-xl md:text-2xl font-regular text-white text-center w-full md:w-auto mt-2 md:mt-0">
            🍀TATA Power
          </h1>
          <div className="relative md:absolute md:left-auto md:right-4 md:top-1/2 flex gap-3 items-center justify-center transform md:-translate-y-1/2 mt-4 md:mt-0">
            <Link href="/dashboard">
              <button className="group px-6 py-2 bg-[#00FF8C] cursor-pointer rounded-full text-slate-800 font-semibold text-md overflow-hidden hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25">
                <span className="relative flex items-center gap-2">
                  Try Now <ExternalLink size={18}></ExternalLink>
                </span>
              </button>
            </Link>
          </div>
        </div>

        {/* Main Heading */}
        <div
          className={`w-full px-2 md:px-[10vw] mb-10 md:mb-16 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-6xl lg:text-7xl font-semibold text-[#B2DFC8] leading-tight mb-4 flex flex-col items-center justify-center w-full mt-16 md:mt-10">
            <div className="w-full text-center md:text-left">TATA Power’s Safety Bot is designed to protect workers,</div>
            <div className="text-[#B2DFC8] w-full text-center md:text-right mt-2 md:mt-0">
              {"improve well-being, "}
              <span className="text-[#00FF8C]">and ensure safer operations across all sites.</span>
            </div>
          </h2>
        </div>

        {/* Central Illustration with Features */}
        <div
          className={`relative mb-10 md:mb-16 transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <img
            src="\Ratan (2).png"
            alt="Meditation illustration"
            className="hidden md:block mx-auto w-[80%] pointer-events-none select-none"
          />
          {/* Image hidden on mobile to save space, or you can enable it by removing 'hidden md:block' and adding 'w-full' */}
        </div>

        {/* CTA Button */}
        <div
          className={`transition-all duration-1000 delay-900 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link href="/dashboard">
            <button className="group relative px-8 md:px-12 py-3 md:py-4 bg-[#00FF8C] cursor-pointer rounded-full text-slate-800 font-semibold text-lg md:text-xl overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25">
              <span className="relative flex items-center gap-2">
                Try Now <ExternalLink></ExternalLink>
              </span>
            </button>
          </Link>
          <div className="text-sm text-white mt-2">🔴 Beta Release</div>
        </div>
      </div>

      {/* Bottom ambient glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-32 bg-gradient-to-t from-emerald-500/10 to-transparent" />
      
      <div className="w-full pb-20 md:pb-[10em] px-4 md:px-10">
        <h1 className="mx-auto text-white text-2xl md:text-3xl text-center mt-20 md:mt-[7em] mb-10">
          {` Enhancing safety at TATA Power sites through AI-driven worker health monitoring.`}
        </h1>
        <div className="flex flex-wrap flex-row items-center justify-center gap-4">
          <div className="text-white w-full sm:w-[300px] h-auto min-h-[300px] py-10 px-3 flex items-center justify-center flex-col rounded-lg border-white/20 border-2 mt-4 md:mt-10 bg-slate-800/50 backdrop-blur-sm">
            <img
              src="/confidential.gif"
              alt="confidential"
              className="h-[100px] w-[100px] mb-10"
            />
            <h1 className="text-2xl text-center font-semibold text-[#00FF8C]">
              Confidential
            </h1>
            <p className="text-center mt-2">
              All your data is completely encrypted for your privacy.
            </p>
          </div>
          <div className="text-white w-full sm:w-[300px] h-auto min-h-[300px] py-10 px-3 flex items-center justify-center flex-col rounded-lg border-white/20 border-2 mt-4 md:mt-10 bg-slate-800/50 backdrop-blur-sm">
            <img src="/ai.gif" alt="ai" className="h-[100px] w-[100px] mb-10" />
            <h1 className="text-2xl text-center font-semibold text-[#00FF8C]">
              Smart
            </h1>
            <p className="text-center mt-2">
              AI-powered safety checks ensure accurate health monitoring and better workplace allocation.
            </p>
          </div>
          <div className="text-white w-full sm:w-[300px] h-auto min-h-[300px] py-10 px-3 flex items-center justify-center flex-col rounded-lg border-white/20 border-2 mt-4 md:mt-10 bg-slate-800/50 backdrop-blur-sm">
            <img
              src="/doctor_2.gif"
              alt="doctor"
              className="h-[100px] w-[100px] mb-10"
            />
            <h1 className="text-2xl text-center font-semibold text-[#00FF8C]">
              Personalized
            </h1>
            <p className="text-center mt-2">
              Your AI health companion, ensuring you’re ready for work each day.
            </p>
          </div>
        </div>
      </div>

      <div className="w-[90%] max-w-[1440px] min-h-[400px] md:min-h-[600px] bg-slate-900 mx-auto rounded-xl flex items-center justify-center flex-col relative mt-10 px-5 py-10 md:px-30">
        <h1 className="relative flex items-center justify-center text-white text-3xl md:text-5xl text-center ">
          <div className="text-white h-32 w-32 md:h-50 md:w-50 absolute left-1/2 -top-20 md:left-0 md:bottom-[100%] transform -translate-x-1/2 md:translate-x-0 opacity-8">
            <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" viewBox="0 0 310 310">
              <path
                d="M79 144.11c-6 0-11.37.28-16.19.8 8.02-32.82 27.27-48.06 55.31-60.35L103.1 50.31C75.18 62.56 56.9 76.59 43.81 95.82c-15.2 22.35-22.6 51.72-22.6 89.81v16.46c0 31.83.11 57.6 57.79 57.6 57.79 0 57.79-25.87 57.79-57.79 0-31.91.37-57.79-57.79-57.79zm152 0c-6 0-11.37.28-16.19.8 8.02-32.82 27.27-48.06 55.31-60.35L255.1 50.31c-27.92 12.25-46.2 26.28-59.29 45.51-15.2 22.35-22.6 51.72-22.6 89.81v16.46c0 31.83.11 57.6 57.79 57.6 57.79 0 57.79-25.87 57.79-57.79 0-31.91.37-57.79-57.79-57.79z"
                fill="#FFF"
              ></path>
            </svg>
          </div>
          {
            "A trusted companion for monitoring worker wellbeing and ensuring safer job assignments."
          }
        </h1>
        <p className="w-full flex flex-col text-white text-lg mt-8 md:mt-4 text-center md:text-right">
          <span className="text-xl text-[#00FF8C]">Tata Power Safety Department</span>
        </p>
      </div>

      <div className="relative w-full flex flex-wrap items-center justify-center text-center py-20 gap-5">
        <div
          className={`transition-all duration-1000 delay-90 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link href="/dashboard">
            <button className="group relative px-12 py-4 bg-[#00FF8C] cursor-pointer rounded-full text-slate-800 font-semibold text-xl overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25">
              <span className="relative flex items-center gap-2">
                Try Now <ExternalLink></ExternalLink>
              </span>
            </button>
          </Link>
        </div>
      </div>
      <div className="footer relative bg-teal-900/20 pt-10 flex items-center justify-center flex-col">
        <h1 className="text-2xl font-regular text-white text-center mb-5">
          🍀TATA POWER
        </h1>
        <Link
          href="mailto:ytbhemant@gmail.com"
          target="_blank"
          className="text-blue-100/80 text-xl my-2 mb-10 text-center w-full"
        >
          Contact Us
        </Link>
        <div className="border-t-white/50 border-t-[1px] flex text center items-center justify-center text-white/50 text-sm w-full py-2 bottom-0">
          © 2025 TATA POWER. All rights reserved.
        </div>
      </div>
    </div>
  );
};

const SoulScriptLanding: React.FC = () => {
  return (
    <>
      <HeroSection></HeroSection>
    </>
  );
};

export default SoulScriptLanding;