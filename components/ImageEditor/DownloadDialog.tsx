"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";
import { Check, } from "lucide-react";
import React, { useEffect } from "react";
import Link from "next/link";
import { TwitterIcon, GithubIcon, CheckmarkBadgeIcon } from "../CustomIcons";

interface DownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  status: "loading" | "success" | "idle";
  blobUrl: string | null;
  fileSize?: string;
  fileName?: string;
  blob?: Blob;
}

export const DownloadDialog = ({
  open,
  onOpenChange,
  status,
  blobUrl,
  fileSize,
  fileName,
  blob,
}: DownloadDialogProps) => {
  useEffect(() => {
    if (open && status === "success") {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 9999,
      };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [open, status]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden bg-white border-none shadow-2xl">
        <div className="relative flex flex-col items-center justify-center p-8 min-h-[300px]">
     

          {status === "loading" ? (
            <div className="flex flex-col items-center gap-6 animate-in fade-in duration-300">
              <div className="relative size-20">
                <div className="absolute inset-0 rounded-full border-4 border-indigo-100"></div>
                <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <img src="/logo.png" alt="Logo" className="size-8 object-contain scale-150" />
                </div>
              </div>
              <div className="space-y-1 text-center">
                <h3 className="tex-lg font-semibold text-gray-900">
                  Generating Image
                </h3>
                <p className="text-sm text-gray-500">
                  Please wait while we prepare your download...
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full gap-6 animate-in zoom-in-95 duration-300">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="size-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <CheckmarkBadgeIcon size="24" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Image Exported!
                </h3>
                <p className="text-sm text-gray-500">
                  Your image has been downloaded successfully.
                </p>
              </div>

              {blobUrl && (
                <div className="relative w-full max-w-[240px] aspect-video rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={blobUrl}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {fileName && fileSize && (
                <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                  <span>{fileName}</span>
                  <span>•</span>
                  <span>{fileSize}</span>
                </div>
              )}

              <div className="w-full space-x-3 flex justify-center gap-4 pt-2">
         
            <Link href={'https://github.com/taqui-786/Snapgroove'} target="_blank" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
              <GithubIcon size="20" />
              Star on GitHub
            </Link>
            <Link href={'https://x.com/Taquiimam14'} target="_blank" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
              <TwitterIcon size="20" />
              Follow on X
            </Link>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
