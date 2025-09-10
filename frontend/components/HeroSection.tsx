import { ArrowRight } from "lucide-react";
import React from "react";
import { BackgroundRippleEffect } from "./ui/background-ripple-effect";
import { Spotlight } from "./ui/Spotlight";
import { Button } from "./ui/moving-border";

const HeroSection = () => {
  return (
    <>
      <BackgroundRippleEffect />
      <section className="py-24 px-6">
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="white"
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 tracking-tight">
            Code Smarter,
            <br />
            Not Harder
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Create, browse, and share cheat sheets across multiple programming
            languages
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                <span>Browse Cheat Sheets</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>

            <Button
              borderRadius="1.75rem"
              className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 px-3"
            >
              Create Your Own
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
