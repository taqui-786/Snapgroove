"use client";
import {
  ExpandableScreen,
  ExpandableScreenContent,
  ExpandableScreenTrigger,
} from "@/components/ui/expandable-screen";
import { ImageTool } from "./ImageTool";

export default function ExpandableScreenDailog() {
  return (
    <ExpandableScreen
      layoutId="cta-card"
      triggerRadius="100px"
      contentRadius="24px"
    >
      <div className="flex  items-center justify-center">
        <ExpandableScreenTrigger>
          <button className="bg-primary px-6 py-3 text-primary-foreground cursor-pointer hover:bg-primary/80 transition-all duration-300">
            Let's Make It Pretty
          </button>
        </ExpandableScreenTrigger>
      </div>

      <ExpandableScreenContent className="relative  backdrop-blur-lg border border-white/20  bg-primary-50/50 ring-2 ring-black-500 ring-offset-2 z-[+999] "
>
        <div className="flex xl:h-full h-auto w-full items-center justify-center xl:p-8 p-2 xl:pt-2 pt-14 z-[+999]">
          <ImageTool />
        </div>
      </ExpandableScreenContent>
    </ExpandableScreen>
  );
}
