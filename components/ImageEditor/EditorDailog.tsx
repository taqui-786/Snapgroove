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
      <div className="flex min-h-screen items-center justify-center">
        <ExpandableScreenTrigger>
          <button className="bg-primary px-6 py-3 text-primary-foreground">
            Open Screen
          </button>
        </ExpandableScreenTrigger>
      </div>

      <ExpandableScreenContent className="relative  backdrop-blur-lg border border-white/20  bg-primary-50/50 ring-2 ring-black-500 ring-offset-2 "
>
        <div className="flex h-full w-full items-center justify-center p-8 ">
          <ImageTool />
        </div>
      </ExpandableScreenContent>
    </ExpandableScreen>
  );
}
