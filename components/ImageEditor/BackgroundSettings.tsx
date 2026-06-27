import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { GRADIENT_PRESETS } from "@/lib/constants/gradient-colors";
import { SOLID_COLOR_PRESETS } from "@/lib/constants/solid-colors";
import { useState } from "react";

import { EnhancedSlider } from "../ui/EnchancedSidebar";
import type { Options, ScreenshotBlob, BackgroundMode } from "./types";
import { BackgroundIcon, ImageDownloadIcon } from "../CustomIcons";

interface BackgroundSettingsProps {
  options: Options;
  setOptions: (options: Options) => void;
  saveImage: (scale?: number) => void;
  blob: ScreenshotBlob;
}

type BackgroundTab = "gradients" | "solids" | "custom";

export const BackgroundSettings = ({
  options,
  setOptions,
  saveImage,
  blob,
}: BackgroundSettingsProps) => {
  const [bgTab, setBgTab] = useState<BackgroundTab>("gradients");

  const handleGradientSelect = (from: string, to: string) => {
    setOptions({
      ...options,
      backgroundMode: "custom",
      theme: "",
      customTheme: {
        colorStart: from,
        colorEnd: to,
        direction: options.customTheme.direction || "to bottom right",
      },
    });
  };

  const handleSolidSelect = (color: string) => {
    setOptions({
      ...options,
      backgroundMode: "solid",
      theme: "",
      customTheme: {
        ...options.customTheme,
        colorStart: color,
        colorEnd: color,
      },
    });
  };

  return (
    <div
      className={cn(
        "bg-light-gray w-full xl:w-72 h-full flex flex-col order-3",
      )}
    >
      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="flex flex-col gap-6 items-center justify-between">
              <div className="w-full flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <BackgroundIcon size="16" />
                  <span className="block font-medium text-xs text-stone-700">
                    Background Settings
                  </span>
                </div>
              </div>

              <Toggle
                checked={options.noise}
                label="Grain"
                onCheckedChange={(checked) =>
                  setOptions({ ...options, noise: checked })
                }
              />

              <Toggle
                checked={options.reflection}
                label="Reflection"
                onCheckedChange={(checked) =>
                  setOptions({ ...options, reflection: checked })
                }
              />

              {/* Background Popover */}
              <Popover>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-1">
                    <span className="block text-xs font-medium text-gray-700">
                      Background
                    </span>
                  </div>
                  <PopoverTrigger asChild>
                    <button
                      aria-label="Edit background"
                      className="size-8 rounded-md border border-gray-300 flex items-center justify-center transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                      <div
                        className={cn(
                          "size-7 rounded-sm",
                          options.backgroundMode === "gradient"
                            ? options.theme
                            : "",
                        )}
                        style={{
                          background:
                            options.backgroundMode === "solid"
                              ? options.customTheme.colorStart
                              : options.backgroundMode === "custom" ||
                                  (options.backgroundMode === "gradient" &&
                                    !options.theme)
                                ? `linear-gradient(${options.customTheme.direction}, ${options.customTheme.colorStart}, ${options.customTheme.colorEnd})`
                                : undefined,
                        }}
                      />
                    </button>
                  </PopoverTrigger>
                </div>
                <PopoverContent
                  align="end"
                  className="relative z-[9999] w-80 pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  onMouseUp={(e) => e.stopPropagation()}
                  onPointerDown={(e) => e.stopPropagation()}
                  onPointerUp={(e) => e.stopPropagation()}
                >
                  <div
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    onMouseUp={(e) => e.stopPropagation()}
                    className="pointer-events-auto"
                  >
                    {/* Tabs */}
                    <div className="flex gap-1 mb-3 bg-gray-100 rounded-lg p-0.5">
                      {(
                        [
                          { key: "gradients", label: "Gradients" },
                          { key: "solids", label: "Solids" },
                          { key: "custom", label: "Custom" },
                        ] as { key: BackgroundTab; label: string }[]
                      ).map((tab) => (
                        <button
                          key={tab.key}
                          className={cn(
                            "flex-1 text-xs font-medium py-1.5 px-2 rounded-md transition-all duration-200",
                            bgTab === tab.key
                              ? "bg-white text-gray-900 shadow-sm"
                              : "text-gray-500 hover:text-gray-700",
                          )}
                          onClick={() => setBgTab(tab.key)}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Gradients Tab */}
                    {bgTab === "gradients" && (
                      <div className="max-h-[280px] overflow-y-auto pr-1 -mr-1">
                        <div className="grid grid-cols-5 gap-1.5">
                          {GRADIENT_PRESETS.map((preset) => (
                            <div
                              key={preset.name}
                              className={cn(
                                "cursor-pointer w-full h-8 rounded-md border border-gray-200 transition-all hover:scale-105 hover:shadow-md",
                                options.customTheme.colorStart ===
                                  preset.from &&
                                  options.customTheme.colorEnd === preset.to &&
                                  options.backgroundMode !== "solid"
                                  ? "ring-2 ring-primary/80 ring-offset-1"
                                  : "",
                              )}
                              style={{
                                background: `linear-gradient(to bottom right, ${preset.from}, ${preset.to})`,
                              }}
                              title={preset.name}
                              onClick={() =>
                                handleGradientSelect(preset.from, preset.to)
                              }
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Solids Tab */}
                    {bgTab === "solids" && (
                      <div className="max-h-[280px] overflow-y-auto pr-1 -mr-1">
                        <div className="grid grid-cols-6 gap-1.5">
                          {SOLID_COLOR_PRESETS.map((preset) => (
                            <div
                              key={preset.name}
                              className={cn(
                                "cursor-pointer w-full h-8 rounded-md border border-gray-200 transition-all hover:scale-105 hover:shadow-md",
                                options.customTheme.colorStart ===
                                  preset.color &&
                                  options.backgroundMode === "solid"
                                  ? "ring-2 ring-primary/80 ring-offset-1"
                                  : "",
                              )}
                              style={{ background: preset.color }}
                              title={preset.name}
                              onClick={() => handleSolidSelect(preset.color)}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Custom Tab */}
                    {bgTab === "custom" && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 space-y-1">
                            <span className="text-xs text-gray-500">Start</span>
                            <input
                              type="color"
                              value={options.customTheme.colorStart}
                              onChange={(e) =>
                                setOptions({
                                  ...options,
                                  backgroundMode: "custom",
                                  theme: "",
                                  customTheme: {
                                    ...options.customTheme,
                                    colorStart: e.target.value,
                                  },
                                })
                              }
                              className="w-full h-8 rounded-md border border-gray-300 cursor-pointer"
                            />
                          </div>
                          <div className="flex-1 space-y-1">
                            <span className="text-xs text-gray-500">End</span>
                            <input
                              type="color"
                              value={options.customTheme.colorEnd}
                              onChange={(e) =>
                                setOptions({
                                  ...options,
                                  backgroundMode: "custom",
                                  theme: "",
                                  customTheme: {
                                    ...options.customTheme,
                                    colorEnd: e.target.value,
                                  },
                                })
                              }
                              className="w-full h-8 rounded-md border border-gray-300 cursor-pointer"
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs text-gray-500">
                            Direction
                          </span>
                          <div className="grid grid-cols-4 gap-1">
                            {[
                              { label: "↘", value: "to bottom right" },
                              { label: "→", value: "to right" },
                              { label: "↓", value: "to bottom" },
                              { label: "↗", value: "to top right" },
                            ].map((dir) => (
                              <button
                                key={dir.value}
                                className={cn(
                                  "text-sm py-1 rounded-md border transition-all",
                                  options.customTheme.direction === dir.value
                                    ? "bg-primary text-white border-primary"
                                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300",
                                )}
                                onClick={() =>
                                  setOptions({
                                    ...options,
                                    backgroundMode: "custom",
                                    theme: "",
                                    customTheme: {
                                      ...options.customTheme,
                                      direction: dir.value,
                                    },
                                  })
                                }
                              >
                                {dir.label}
                              </button>
                            ))}
                          </div>
                        </div>
                        {/* Preview */}
                        <div
                          className="w-full h-12 rounded-lg border border-gray-200"
                          style={{
                            background: `linear-gradient(${options.customTheme.direction}, ${options.customTheme.colorStart}, ${options.customTheme.colorEnd})`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>

              {/* Background Opacity */}
              <EnhancedSlider
                value={options.backgroundOpacity}
                onChange={(value) =>
                  setOptions({ ...options, backgroundOpacity: value })
                }
                min={10}
                max={100}
                step={1}
                defaultValue={100}
                label="BG Opacity"
                unit="%"
              />

              {/* Pattern Settings */}
              <div className="space-y-3 w-full">
                <div className="flex items-center gap-1">
                  <span className="block text-xs font-medium text-gray-700">
                    Pattern
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { type: "none", label: "None" },
                    { type: "waves", label: "Waves" },
                    { type: "dots", label: "Dots" },
                    { type: "stripes", label: "Stripes" },
                    { type: "zigzag", label: "Zigzag" },
                    { type: "graphpaper", label: "Graph Paper" },
                  ].map((pattern) => (
                    <div
                      key={pattern.type}
                      className={cn(
                        "cursor-pointer flex flex-col items-center gap-1.5",
                      )}
                      onClick={() => {
                        setOptions({
                          ...options,
                          pattern: {
                            ...options.pattern,
                            type: pattern.type as any,
                            enabled: pattern.type !== "none",
                          },
                        });
                      }}
                    >
                      <div
                        className={cn(
                          "w-full h-14 rounded-md border border-gray-200 flex items-center justify-center bg-white overflow-hidden",
                          {
                            "ring-2 ring-primary/80":
                              pattern.type === options.pattern.type,
                          },
                        )}
                      >
                        {pattern.type !== "none" ? (
                          <div
                            className="w-full h-full relative"
                            style={{
                              backgroundImage: `url("/pattern/${pattern.type}.svg")`,
                              backgroundRepeat: "repeat",
                              backgroundSize: ["stripes", "zigzag"].includes(
                                pattern.type,
                              )
                                ? "25%"
                                : "85%",
                              opacity: 0.3,
                              transform: "rotate(45deg) scale(2)",
                              imageRendering: "crisp-edges",
                              WebkitBackfaceVisibility: "hidden",
                              backfaceVisibility: "hidden",
                              WebkitTransform: "translateZ(0)",
                              WebkitFontSmoothing: "antialiased",
                              MozOsxFontSmoothing: "grayscale",
                            }}
                          />
                        ) : null}
                      </div>
                      <span className="text-xs text-gray-600">
                        {pattern.label}
                      </span>
                    </div>
                  ))}
                </div>

                {options.pattern.enabled && (
                  <div className="space-y-3 pt-1">
                    <EnhancedSlider
                      disabled={options.pattern.type === "none"}
                      value={options.pattern.intensity}
                      onChange={(value) =>
                        setOptions({
                          ...options,
                          pattern: {
                            ...options.pattern,
                            intensity: value,
                          },
                        })
                      }
                      min={1}
                      defaultValue={15}
                      max={100}
                      step={1}
                      label="Size"
                    />
                    <EnhancedSlider
                      disabled={options.pattern.type === "none"}
                      value={options.pattern.rotation}
                      onChange={(value) =>
                        setOptions({
                          ...options,
                          pattern: {
                            ...options.pattern,
                            rotation: value,
                          },
                        })
                      }
                      min={0}
                      max={360}
                      step={1}
                      label="Rotation"
                      unit="°"
                    />
                    <EnhancedSlider
                      disabled={options.pattern.type === "none"}
                      value={options.pattern.opacity}
                      onChange={(value) =>
                        setOptions({
                          ...options,
                          pattern: {
                            ...options.pattern,
                            opacity: value,
                          },
                        })
                      }
                      min={0}
                      defaultValue={6}
                      max={35}
                      step={1}
                      label="Opacity"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 border-t border-gray-200">
        <div className="flex gap-3">
          <Button
            className="flex-1 gap-2 h-11"
            size="lg"
            onClick={() => saveImage(2)}
            disabled={!blob?.src}
          >
            Download image <ImageDownloadIcon size={"28"} />
          </Button>
        </div>
      </div>
    </div>
  );
};
