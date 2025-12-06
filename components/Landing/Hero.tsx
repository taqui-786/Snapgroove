"use client";

import { motion } from "motion/react";
import React from "react";
import { cn } from "@/lib/utils";
import ExpandableScreenDailog from "@/components/ImageEditor/EditorDailog";

export const Hero = () => {
  return (
    <div className="relative min-h-dvh w-full flex flex-col items-center justify-center overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center text-center gap-8 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 max-w-3xl"
        >
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-4">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
            v1.0 Public Beta
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
            Create stunning{" "}
            <span className="bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              image mockups
            </span>{" "}
            in seconds.
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Transform your screenshots into professional visuals. Customize
            backgrounds, frames, and shadows with our beautiful and easy-to-use
            editor.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full flex justify-center mt-4"
        >
          <ExpandableScreenDailog />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-sm text-gray-500"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="text-2xl font-bold text-gray-900">10+</div>
            <div>Backgrounds</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-2xl font-bold text-gray-900">Custom</div>
            <div>Patterns</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-2xl font-bold text-gray-900">Export</div>
            <div>High Quality</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-2xl font-bold text-gray-900">Free</div>
            <div>Forever</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
