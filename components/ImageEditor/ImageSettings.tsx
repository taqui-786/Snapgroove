import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Grip } from "lucide-react";
import { EnhancedSlider } from "../EnchancedSidebar";
import type { Options, ScreenshotBlob } from "./types";
import { ImageIcon } from "../CustomIcons";

interface ImageSettingsProps {
  options: Options;
  setOptions: (options: Options) => void;
  outlineSize: number;
  setOutlineSize: (size: number) => void;
  outlineColor: string;
  setOutlineColor: (color: string) => void;
  blob: ScreenshotBlob;
}

export const ImageSettings = ({
  options,
  setOptions,
  outlineSize,
  setOutlineSize,
  outlineColor,
  setOutlineColor,
  blob,
}: ImageSettingsProps) => {
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
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <ImageIcon size="16" />
                <span className="block font-medium text-xs text-stone-700">
                  Image Settings
                </span>
              </div>
            </div>

            {/* Frame Popover */}
            <Popover>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-1">
                  <span className="block text-xs font-medium text-gray-700">
                    Frame
                  </span>
                </div>
                <PopoverTrigger asChild>
                  <button
                    aria-label="Edit frame"
                    className="w-20 h-14 rounded-md border border-gray-300 flex items-center justify-center transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    <div className="w-full h-full rounded-sm relative overflow-hidden bg-gradient-to-br from-primary/90 to-primary/70 flex items-center justify-center">
                      {options.frame === "none" && (
                        <div className="w-10 h-8 bg-white border border-gray-300 rounded-sm" />
                      )}
                      {options.frame === "arc" && (
                        <div className="relative">
                          <div
                            className="w-10 h-8 bg-white border border-gray-300"
                            style={{
                              borderRadius: "5px",
                              boxShadow:
                                "rgba(0, 0, 0, 0.15) 0px 4px 12px -2px",
                              backgroundColor: "rgba(255, 255, 255, 0.314)",
                              border: "1px solid rgba(255, 255, 255, 0.376)",
                              padding: "2px",
                            }}
                          >
                            <div className="w-full h-full bg-white rounded-[3px]" />
                          </div>
                        </div>
                      )}
                      {options.frame === "stack" && (
                        <div className="relative">
                          <div className="absolute">
                            {Array.from({ length: 3 }).map((_, index) => {
                              const reverseIndex = 3 - index - 1;
                              const translateY = reverseIndex * -2.5;
                              const scale = 1 - reverseIndex * 0.06;
                              const opacity = Math.pow(0.7, reverseIndex);

                              return (
                                <div
                                  key={index}
                                  className="absolute w-10"
                                  style={{
                                    height: "5px",
                                    borderTopLeftRadius: "5px",
                                    borderTopRightRadius: "5px",
                                    backgroundColor: "#e5e7eb",
                                    transform: `translateY(${translateY}px) scaleX(${scale})`,
                                    transformOrigin: "top center",
                                    opacity,
                                    clipPath: "inset(0 0 calc(100% - 5px) 0)",
                                  }}
                                />
                              );
                            })}
                          </div>
                          <div className="relative z-10">
                            <div className="w-10 h-8 bg-white border border-gray-300 rounded-sm" />
                          </div>
                        </div>
                      )}
                    </div>
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
                    Frame Style
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { type: "none" as const, label: "None" },
                      { type: "arc" as const, label: "Arc" },
                      { type: "stack" as const, label: "Stack" },
                    ].map((frame) => (
                      <div
                        key={frame.type}
                        className={cn(
                          "cursor-pointer flex flex-col items-center gap-1.5"
                        )}
                        onClick={() => {
                          setOptions({
                            ...options,
                            frame: frame.type,
                          });
                        }}
                      >
                        <div
                          className={cn(
                            "w-full h-14 rounded-md border border-gray-200 flex items-center justify-center bg-gradient-to-br from-primary/80 to-primary/70 overflow-hidden",
                            {
                              "ring-2 ring-primary/80":
                                frame.type === options.frame,
                            }
                          )}
                        >
                          {frame.type === "none" && (
                            <div className="w-10 h-8 bg-white border border-gray-300 rounded-sm" />
                          )}
                          {frame.type === "arc" && (
                            <div className="relative">
                              <div
                                className="w-10 h-8 bg-white border border-gray-300"
                                style={{
                                  borderRadius: "5px",
                                  boxShadow:
                                    "rgba(0, 0, 0, 0.15) 0px 4px 12px -2px",
                                  backgroundColor: "rgba(255, 255, 255, 0.314)",
                                  border:
                                    "1px solid rgba(255, 255, 255, 0.376)",
                                  padding: "2px",
                                }}
                              >
                                <div className="w-full h-full bg-white rounded-[3px]" />
                              </div>
                            </div>
                          )}
                          {frame.type === "stack" && (
                            <div className="relative">
                              <div className="absolute">
                                {Array.from({ length: 3 }).map((_, index) => {
                                  const reverseIndex = 3 - index - 1;
                                  const translateY = reverseIndex * -2.5;
                                  const scale = 1 - reverseIndex * 0.06;
                                  const opacity = Math.pow(0.7, reverseIndex);

                                  return (
                                    <div
                                      key={index}
                                      className="absolute w-10"
                                      style={{
                                        height: "5px",
                                        borderTopLeftRadius: "5px",
                                        borderTopRightRadius: "5px",
                                        backgroundColor: "#e5e7eb",
                                        transform: `translateY(${translateY}px) scaleX(${scale})`,
                                        transformOrigin: "top center",
                                        opacity,
                                        clipPath:
                                          "inset(0 0 calc(100% - 5px) 0)",
                                      }}
                                    />
                                  );
                                })}
                              </div>
                              <div className="relative z-10">
                                <div className="w-10 h-8 bg-white border border-gray-300 rounded-sm" />
                              </div>
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-gray-600">
                          {frame.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <EnhancedSlider
              value={options.screenshotScale}
              onChange={(value) =>
                setOptions({ ...options, screenshotScale: value })
              }
              min={0.5}
              max={1.5}
              step={0.01}
              defaultValue={0.9}
              label="Size"
              unit="x"
            />
            <EnhancedSlider
              value={options.rotation}
              onChange={(value) => setOptions({ ...options, rotation: value })}
              min={0}
              max={360}
              step={1}
              defaultValue={0}
              label="Rotation"
              unit="°"
            />

            <EnhancedSlider
              value={options.rounded}
              onChange={(value) => setOptions({ ...options, rounded: value })}
              min={0}
              max={32}
              step={1}
              defaultValue={12}
              label="Roundness"
              unit="px"
            />

            <EnhancedSlider
              value={options.shadow}
              onChange={(value) => setOptions({ ...options, shadow: value })}
              min={0}
              max={4}
              step={1}
              label="Shadow"
            />

            <EnhancedSlider
              value={outlineSize}
              onChange={setOutlineSize}
              min={0}
              max={100}
              step={1}
              label="Inset"
            />

            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1">
                <span className="block text-xs font-medium text-gray-700">
                  Inset color
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={outlineColor}
                  onChange={(e) => setOutlineColor(e.target.value)}
                  className="w-8 h-8 rounded-md border border-gray-300 cursor-pointer transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
