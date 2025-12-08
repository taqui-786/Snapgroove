"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Github } from "lucide-react";

export const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 relative">
          <Image
            src="/logo.png"
            alt="Snapgroove Logo"
            fill
            className="object-contain"
          />
        </div>
        <span className="font-bold text-xl tracking-tight text-gray-900">
          Snapgroove
        </span>
      </div>

      <div className="flex items-center gap-6">
        <Link
          href="https://x.com/Taquiimam14"
          target="_blank"
          className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
        >
          Twitter
        </Link>
        <Link
          href="https://github.com/taqui-786/Snapgroove"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
        >
          <Github className="w-4 h-4" />
          <span>Github</span>
        </Link>
      </div>
    </motion.nav>
  );
};
