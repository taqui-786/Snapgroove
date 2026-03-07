"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";
import React, { useEffect } from "react";
import Link from "next/link";
import type { ExportFormat, ExportScale } from "./types";
import { TwitterIcon, GithubIcon, CheckmarkBadgeIcon } from "../CustomIcons";

interface DownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  status: "loading" | "success" | "idle";
  blobUrl: string | null;
  fileSize?: string;
  fileName?: string;
  blob?: Blob;
  exportFormat?: ExportFormat;
  exportScale?: ExportScale;
  onExportFormatChange?: (format: ExportFormat) => void;
  onExportScaleChange?: (scale: ExportScale) => void;
  onCopyToClipboard?: () => void;
  onRedownload?: () => void;
}

export const DownloadDialog = ({
  open,
  onOpenChange,
  status,
  blobUrl,
  fileSize,
  fileName,
  blob,
  exportFormat = "png",
  exportScale = 2,
  onExportFormatChange,
  onExportScaleChange,
  onCopyToClipboard,
  onRedownload,
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
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="size-8 object-contain scale-150"
                  />
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

              {/* Export Settings (shown while loading too) */}
              <div className="w-full space-y-3 border-t border-gray-100 pt-4">
                {/* Format Selector */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">
                    Format
                  </span>
                  <div className="flex gap-1">
                    {(["png", "jpeg", "webp"] as ExportFormat[]).map((fmt) => (
                      <button
                        key={fmt}
                        className={cn(
                          "px-2.5 py-1 text-xs font-medium rounded-md border transition-all",
                          exportFormat === fmt
                            ? "bg-primary text-white border-primary"
                            : "bg-white text-gray-500 border-gray-200 hover:border-gray-300",
                        )}
                        onClick={() => onExportFormatChange?.(fmt)}
                      >
                        {fmt.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scale Selector */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">
                    Quality
                  </span>
                  <div className="flex gap-1">
                    {([1, 2, 3] as ExportScale[]).map((s) => (
                      <button
                        key={s}
                        className={cn(
                          "px-2.5 py-1 text-xs font-medium rounded-md border transition-all",
                          exportScale === s
                            ? "bg-primary text-white border-primary"
                            : "bg-white text-gray-500 border-gray-200 hover:border-gray-300",
                        )}
                        onClick={() => onExportScaleChange?.(s)}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                </div>
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

              {/* Action Buttons */}
              <div className="w-full flex gap-2">
                {onCopyToClipboard && (
                  <button
                    className="flex-1 py-2 px-3 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all"
                    onClick={onCopyToClipboard}
                  >
                    📋 Copy to Clipboard
                  </button>
                )}
                {onRedownload && (
                  <button
                    className="flex-1 py-2 px-3 text-xs font-medium rounded-lg border border-primary bg-primary text-white hover:bg-primary/90 transition-all"
                    onClick={() => {
                      onOpenChange(false);
                      setTimeout(() => onRedownload(), 200);
                    }}
                  >
                    ↓ Download Again
                  </button>
                )}
              </div>

              <div className="w-full space-x-3 flex justify-center gap-4 pt-2">
                <Link
                  href={"https://github.com/taqui-786/Snapgroove"}
                  target="_blank"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                >
                  <GithubIcon size="20" />
                  Star on GitHub
                </Link>
                <Link
                  href={"https://x.com/md_taqui_imam"}
                  target="_blank"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                >
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
