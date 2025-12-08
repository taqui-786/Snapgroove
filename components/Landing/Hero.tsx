"use client";

import { motion } from "motion/react";
import React from "react";
import ExpandableScreenDailog from "@/components/ImageEditor/EditorDailog";
import Image from "next/image";
import { Navbar } from "./Navbar";

export const Hero = () => {
  return (
    <div className="relative min-h-dvh w-full flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 flex flex-col items-center pt-32 pb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center space-y-6 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
            Make your screenshots <br />
            less ugly.
          </h1>

          <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto font-medium">
            Stop sharing basic screenshots. Add a background, some padding, and
            pretend you're a designer. It takes like 2 seconds.
          </p>

          <div className="pt-4 flex h-fit justify-center items-center">
            <ExpandableScreenDailog />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4, type: "spring" }}
          className="mt-20 w-full max-w-5xl mx-auto relative group"
        >
          <div className="bg-primary/5 mx-auto aspect-video w-full max-w-screen-xl rounded-lg border p-1.5 sm:p-2.5 sm:shadow-lg">
            <div className="relative h-full w-full rounded-md border overflow-hidden">
              <Image
                src="/hero-showcase-img.png"
                alt="Snapgroove Demo"
                fill
                className="object-cover object-top scale-100"
                priority
              />
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};
