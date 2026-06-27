"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ASPECT_RATIO_PRESETS,
  type AspectRatioPreset,
} from "@/lib/constants/aspect-ratio";
import { cn } from "@/lib/utils";

interface AspectRatioDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const POPULAR_RATIOS = ["1_1", "16_9", "9_16", "4_5", "3_2"];

function getPreviewSize(preset: AspectRatioPreset, maxW: number = 20) {
  if (!preset.ratio) return { w: 16, h: 16 };
  let w = maxW;
  let h = maxW / preset.ratio;
  if (h > 16) {
    h = 16;
    w = 16 * preset.ratio;
  }
  return { w: Math.max(w, 10), h: Math.max(h, 10) };
}

export const AspectRatioDropdown = ({
  value,
  onChange,
}: AspectRatioDropdownProps) => {
  const [open, setOpen] = React.useState(false);
  const current =
    ASPECT_RATIO_PRESETS.find((p) => p.id === value) ||
    ASPECT_RATIO_PRESETS[0];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="flex items-center gap-2">
        <PopoverTrigger asChild>
          <button
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-all",
              "text-foreground bg-accent/50 hover:bg-accent border border-border/50",
            )}
          >
            <div
              className="rounded-sm bg-primary/70 border border-primary/30 shrink-0"
              style={{
                width: getPreviewSize(current).w,
                height: getPreviewSize(current).h,
              }}
            />
            <span className="hidden sm:inline">{current.label}</span>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </PopoverTrigger>

        <div className="hidden lg:flex items-center gap-1">
          {POPULAR_RATIOS.map((id) => {
            const preset = ASPECT_RATIO_PRESETS.find((p) => p.id === id);
            if (!preset || !preset.ratio) return null;
            const { w, h } = getPreviewSize(preset, 22);
            return (
              <button
                key={id}
                onClick={() => onChange(id)}
                className={cn(
                  "rounded-md border transition-all flex items-center justify-center",
                  value === id
                    ? "border-primary bg-primary/10"
                    : "border-border/50 hover:border-border hover:bg-accent/50",
                )}
                style={{ width: w + 4, height: h + 4 }}
                title={preset.label}
              >
                <div
                  className={cn(
                    "rounded-[1px]",
                    value === id ? "bg-primary" : "bg-muted-foreground/40",
                  )}
                  style={{ width: w, height: h }}
                />
              </button>
            );
          })}
        </div>
      </div>
      <PopoverContent
        className="p-0 w-[320px]"
        align="center"
        sideOffset={8}
      >
        <div className="p-3 max-h-[420px] overflow-y-auto">
          <div className="grid grid-cols-5 gap-1.5">
            {ASPECT_RATIO_PRESETS.map((preset) => {
              const isSelected = value === preset.id;
              const { w, h } = getPreviewSize(preset, 32);
              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    onChange(preset.id);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex flex-col items-center gap-1 p-2 rounded-lg transition-all",
                    isSelected
                      ? "bg-primary/10 ring-2 ring-primary"
                      : "hover:bg-accent/50",
                  )}
                >
                  <div className="flex items-center justify-center h-[36px]">
                    <div
                      className={cn(
                        "rounded-sm border-2 transition-colors",
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-muted-foreground/30",
                      )}
                      style={{ width: w, height: h }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground text-center leading-tight">
                    {preset.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
