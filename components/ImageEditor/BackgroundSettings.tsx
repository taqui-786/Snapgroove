import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

import { EnhancedSlider } from "../EnchancedSidebar";
import type { Options, ScreenshotBlob } from "./types";
import { BackgroundIcon, ImageDownloadIcon } from "../CustomIcons";

interface BackgroundSettingsProps {
  options: Options;
  setOptions: (options: Options) => void;
  saveImage: (scale?: number) => void;
  blob: ScreenshotBlob;
}

export const BackgroundSettings = ({
  options,
  setOptions,
  saveImage,
  blob,
}: BackgroundSettingsProps) => {
  return (
    <div
      className={cn(
        "bg-light-gray w-[19rem] rounded-lg min-h-full max-h-[80vh] flex flex-col",
        {
          hidden: !Boolean(blob.src),
        }
      )}
    >
      <div className="flex-1 overflow-y-auto p-6">
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
                        className={cn("size-7 rounded-sm", options.theme)}
                        style={{
                          background: options.theme.includes("gradient")
                            ? undefined
                            : options.theme,
                          backgroundImage: options.theme.includes("gradient")
                            ? undefined
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
                    <span className="block font-medium text-sm text-gray-900 mb-2">
                      Background Presets
                    </span>
                    <div className="grid grid-cols-5 gap-2">
                      {[
                        "bg-gradient-to-br from-primary to-chart-1",
                        "bg-gradient-to-br from-cyan-300 to-sky-400",
                        "bg-gradient-to-br from-emerald-300 to-teal-400",
                        "bg-gradient-to-br from-indigo-300 to-violet-400",
                        "bg-gradient-to-br from-rose-300 to-pink-400",
                        "bg-gradient-to-br from-orange-300 to-red-400",
                        "bg-gradient-to-br from-purple-300 to-fuchsia-400",
                        "bg-gradient-to-br from-blue-300 to-cyan-400",
                        "bg-gradient-to-br from-yellow-300 to-orange-400",
                        "bg-gradient-to-br from-indigo-300 to-purple-400",
                        "bg-gradient-to-br from-stone-900 to-stone-950",
                        "bg-gradient-to-br from-stone-50 to-stone-100",
                      ].map((theme) => (
                        <div
                          key={theme}
                          className={cn(
                            "cursor-pointer w-full h-8 rounded-md border",
                            theme,
                            theme === options.theme && "ring-2 ring-blue-400"
                          )}
                          onClick={() => {
                            setOptions({
                              ...options,
                              theme: theme,
                              customTheme: {
                                colorStart: "#f3f4f6",
                                colorEnd: "#e5e7eb",
                              },
                            });
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

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
                        "cursor-pointer flex flex-col items-center gap-1.5"
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
                          }
                        )}
                      >
                        {pattern.type !== "none" ? (
                          <div
                            className="w-full h-full relative"
                            style={{
                              backgroundImage: `url("/pattern/${pattern.type}.svg")`,
                              backgroundRepeat: "repeat",
                              backgroundSize: ["stripes", "zigzag"].includes(
                                pattern.type
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

      <div className="p-6 pt-6 border-t border-gray-200">
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
