"use client";

import { Code, Github, Twitter, Linkedin } from "lucide-react";
import NavbarPage from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { useRouter } from "next/navigation";

const CheatDevLanding = () => {
  const router = useRouter();

  const navItems = [
    {
      name: "Languages",
      link: "#languages",
    },
    {
      name: "CheatSheets",
      link: "#cheatSheets",
    },
    {
      name: "Favorites",
      link: "#favorites",
    },
    {
      name: "Profile",
      link: "#profile",
    },
  ];

  const featuredCheatSheets = [
    {
      title: "Python Basics",
      description: "Essential syntax and functions",
      language: "Python",
      favorites: 1240,
    },
    {
      title: "JavaScript Essentials",
      description: "Modern JS and async patterns",
      language: "JavaScript",
      favorites: 890,
    },
    {
      title: "SQL Queries",
      description: "Database operations and joins",
      language: "SQL",
      favorites: 675,
    },
    {
      title: "Git Commands",
      description: "Version control workflows",
      language: "Git",
      favorites: 1100,
    },
    {
      title: "React Hooks",
      description: "Complete hooks reference",
      language: "React",
      favorites: 950,
    },
    {
      title: "CSS Grid",
      description: "Modern layout techniques",
      language: "CSS",
      favorites: 720,
    },
  ];

  const languages = [
    { name: "Python", count: "240+" },
    { name: "JavaScript", count: "180+" },
    { name: "HTML", count: "120+" },
    { name: "SQL", count: "95+" },
    { name: "Git", count: "85+" },
    { name: "React", count: "150+" },
    { name: "Node.js", count: "110+" },
    { name: "TypeScript", count: "90+" },
  ];

  const login = () => {
    router.push("/login");
  };

  const signUp = () => {
    router.push("/signup");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <NavbarPage navItems={navItems} onLogin={login} onSignUp={signUp} />

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Cheat Sheets */}
      <section id="cheatsheets" className="py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-black mb-4">
              Popular Cheat Sheets
            </h2>
            <p className="text-gray-600">Most loved by the community</p>
          </div>

          <HoverEffect items={featuredCheatSheets} />
        </div>
      </section>

      {/* Explore by Language */}
      <section id="languages" className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">
              Explore by Language
            </h2>
            <p className="text-gray-600">Find cheat sheets for your stack</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {languages.map((lang, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 p-6 rounded-lg hover:border-gray-300 transition-colors cursor-pointer text-center"
              >
                <h3 className="font-semibold text-black mb-1">{lang.name}</h3>
                <p className="text-sm text-gray-500">{lang.count} sheets</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">How It Works</h2>
            <p className="text-gray-600">Three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold text-black mb-3">Browse</h3>
              <p className="text-gray-600 text-sm">
                Find cheat sheets by language or topic
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold text-black mb-3">Save</h3>
              <p className="text-gray-600 text-sm">
                Mark favorites for quick access
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold text-black mb-3">Create</h3>
              <p className="text-gray-600 text-sm">Share your own snippets</p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Our Community
          </h2>
          <p className="text-gray-400 mb-8">
            Thousands of developers sharing knowledge
          </p>

          <button className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            Sign Up Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo and Description */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <Code className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-semibold text-black">
                  CheatDev
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                The platform for developer cheat sheets
              </p>
            </div>

            {/* Links */}
            <div>
              <div className="space-y-2">
                <a
                  href="#about"
                  className="block text-gray-600 hover:text-black transition-colors text-sm"
                >
                  About
                </a>
                <a
                  href="#privacy"
                  className="block text-gray-600 hover:text-black transition-colors text-sm"
                >
                  Privacy
                </a>
                <a
                  href="#terms"
                  className="block text-gray-600 hover:text-black transition-colors text-sm"
                >
                  Terms
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="md:text-right">
              <div className="flex space-x-4 md:justify-end">
                <a
                  href="#"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-8 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2025 CheatDev. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CheatDevLanding;
