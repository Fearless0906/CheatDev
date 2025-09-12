import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
        <a
          href="#"
          className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
        >
          Privacy Policy
        </a>
        <a
          href="#"
          className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
        >
          Terms of Service
        </a>
        <a
          href="#"
          className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
        >
          About
        </a>
      </div>
    </footer>
  );
};

export default Footer;
