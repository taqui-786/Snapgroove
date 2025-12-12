"use client";

import { motion } from "motion/react";
import React from "react";
import ExpandableScreenDailog from "@/components/ImageEditor/EditorDailog";
import Image from "next/image";
import { Navbar } from "./Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative min-h-dvh w-full flex flex-col bg-background overflow-hidden">
        <Navbar />
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 -left-4 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-0 -right-4 w-96 h-96 bg-primary/8 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-8 left-1/2 w-96 h-96 bg-primary/6 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [-50, 50, -50],
            y: [0, -50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Animated grid pattern */}
      <motion.div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(var(--color-primary)/0.08),transparent_50%)] pointer-events-none" />
      
    

      <main className="flex-1 flex flex-col items-center pt-24 md:pt-32 pb-20 px-4 relative ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center space-y-8 max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <Badge 
              variant="outline" 
              className="px-4 py-2 text-sm font-semibold bg-background/80 backdrop-blur-sm border-primary/30 text-primary shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300"
            >
              <Sparkles className="size-3.5" />
              Professional Screenshot Enhancement
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1]"
          >
            <span className="bg-gradient-to-br from-foreground via-foreground/90 to-foreground bg-clip-text text-transparent">
              Beautiful Screenshots
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Made Simple
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed"
          >
            Add backgrounds, padding, and professional styling to your screenshots. 
            Transform plain captures into polished, presentation-ready images instantly.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <ExpandableScreenDailog />
     
          </motion.div>
        </motion.div>

        {/* Demo Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.6, type: "spring", stiffness: 100 }}
          className="mt-20 md:mt-24 w-full max-w-6xl mx-auto relative group"
        >
          {/* Animated glow effect */}
          <motion.div 
            className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Main showcase container */}
          <div className="relative bg-gradient-to-br from-card to-card/50 rounded-2xl border border-border p-2 sm:p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(var(--color-primary)/0.1)] transition-all duration-500">
            {/* Inner border gradient */}
            <motion.div 
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              animate={{
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            <div className="relative aspect-video w-full rounded-xl border border-border/50 overflow-hidden bg-card shadow-inner">
              <Image
                src="/hero-showcase-img.png"
                alt="Snapgroove Professional Screenshot Enhancement Demo"
                fill
                className="object-cover object-top scale-100 group-hover:scale-[1.02] transition-transform duration-700"
                priority
              />
            </div>
          </div>

          {/* Decorative animated elements */}
          <motion.div 
            className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-3xl opacity-60"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div 
            className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-primary/10 to-primary/5 rounded-full blur-3xl opacity-60"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </motion.div>
      </main>
    </div>
  );
};