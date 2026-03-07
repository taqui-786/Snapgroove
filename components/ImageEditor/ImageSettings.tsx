import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ASPECT_RATIO_PRESETS } from "@/lib/constants/aspect-ratio";
import { EnhancedSlider } from "../ui/EnchancedSidebar";
import { Toggle } from "@/components/ui/toggle";
import type { Options, ScreenshotBlob, FrameType } from "./types";
import {
  DEFAULT_FILTERS,
  DEFAULT_PERSPECTIVE,
  DEFAULT_ADVANCED_SHADOW,
} from "./types";
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

const FRAME_OPTIONS: { type: FrameType; label: string }[] = [
  { type: "none", label: "None" },
  { type: "arc", label: "Arc" },
  { type: "stack", label: "Stack" },
  { type: "mac-light", label: "Mac Light" },
  { type: "mac-dark", label: "Mac Dark" },
  { type: "chrome", label: "Chrome" },
  { type: "windows-light", label: "Win Light" },
  { type: "windows-dark", label: "Win Dark" },
  { type: "photograph", label: "Photo" },
];

export const ImageSettings = ({
  options,
  setOptions,
  outlineSize,
  setOutlineSize,
  outlineColor,
  setOutlineColor,
  blob,
}: ImageSettingsProps) => {
  const renderFramePreview = (frameType: FrameType) => {
    switch (frameType) {
      case "none":
        return (
          <div className="w-10 h-8 bg-white border border-gray-300 rounded-sm" />
        );
      case "arc":
        return (
          <div
            className="w-10 h-8 bg-white border border-gray-300"
            style={{
              borderRadius: "5px",
              boxShadow: "rgba(0, 0, 0, 0.15) 0px 4px 12px -2px",
              backgroundColor: "rgba(255, 255, 255, 0.314)",
              border: "1px solid rgba(255, 255, 255, 0.376)",
              padding: "2px",
            }}
          >
            <div className="w-full h-full bg-white rounded-[3px]" />
          </div>
        );
      case "stack":
        return (
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
        );
      case "mac-light":
        return (
          <div className="w-10 h-8 bg-white border border-gray-300 rounded-sm overflow-hidden flex flex-col">
            <div className="h-2 bg-gray-100 border-b border-gray-200 flex items-center px-1 gap-0.5">
              <div className="w-1 h-1 rounded-full bg-red-400" />
              <div className="w-1 h-1 rounded-full bg-yellow-400" />
              <div className="w-1 h-1 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 bg-white" />
          </div>
        );
      case "mac-dark":
        return (
          <div className="w-10 h-8 bg-[#1e1e1e] border border-gray-600 rounded-sm overflow-hidden flex flex-col">
            <div className="h-2 bg-[#2d2d2d] border-b border-gray-700 flex items-center px-1 gap-0.5">
              <div className="w-1 h-1 rounded-full bg-red-400" />
              <div className="w-1 h-1 rounded-full bg-yellow-400" />
              <div className="w-1 h-1 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 bg-[#1e1e1e]" />
          </div>
        );
      case "chrome":
        return (
          <div className="w-10 h-8 bg-white border border-gray-300 rounded-sm overflow-hidden flex flex-col">
            <div className="h-2 bg-gray-100 border-b border-gray-200 flex items-end px-1 gap-0.5 pb-0">
              <div className="w-1 h-1 rounded-full bg-gray-300 mb-0.5" />
              <div className="w-1 h-1 rounded-full bg-gray-300 mb-0.5" />
              <div className="bg-white rounded-t-[2px] h-1.5 w-4 shadow-sm relative top-px" />
            </div>
            <div className="flex-1 bg-white relative z-10 border-t border-gray-50" />
          </div>
        );
      case "windows-light":
        return (
          <div className="w-10 h-8 bg-white border border-gray-300 rounded-sm overflow-hidden flex flex-col">
            <div className="h-2 bg-[#f3f3f3] border-b border-gray-200 flex items-center justify-end px-0.5 gap-0.5">
              <div className="w-1 h-0.5 bg-gray-400" />
              <div className="w-1 h-1 border border-gray-400 rounded-[0.5px]" />
              <div className="w-1 h-1 text-gray-400 flex items-center justify-center text-[4px]">
                ×
              </div>
            </div>
            <div className="flex-1 bg-white" />
          </div>
        );
      case "windows-dark":
        return (
          <div className="w-10 h-8 bg-[#1e1e1e] border border-gray-600 rounded-sm overflow-hidden flex flex-col">
            <div className="h-2 bg-[#202020] border-b border-gray-700 flex items-center justify-end px-0.5 gap-0.5">
              <div className="w-1 h-0.5 bg-gray-500" />
              <div className="w-1 h-1 border border-gray-500 rounded-[0.5px]" />
              <div className="w-1 h-1 text-gray-500 flex items-center justify-center text-[4px]">
                ×
              </div>
            </div>
            <div className="flex-1 bg-[#1e1e1e]" />
          </div>
        );
      case "photograph":
        return (
          <div className="w-10 h-8 bg-white border border-gray-300 rounded-sm overflow-hidden flex flex-col">
            <div className="flex-1 bg-gray-100 m-0.5 mb-0 rounded-t-sm" />
            <div className="h-2 bg-white" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "bg-light-gray xl:w-[19rem] w-full rounded-lg min-h-full max-h-[80vh] flex flex-col xl:order-1 order-2",
        {
          hidden: !Boolean(blob.src),
        },
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
                      {renderFramePreview(options.frame)}
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
                    {FRAME_OPTIONS.map((frame) => (
                      <div
                        key={frame.type}
                        className={cn(
                          "cursor-pointer flex flex-col items-center gap-1.5",
                        )}
                        onClick={() => {
                          setOptions({ ...options, frame: frame.type });
                        }}
                      >
                        <div
                          className={cn(
                            "w-full h-14 rounded-md border border-gray-200 flex items-center justify-center bg-gradient-to-br from-primary/80 to-primary/70 overflow-hidden",
                            {
                              "ring-2 ring-primary/80":
                                frame.type === options.frame,
                            },
                          )}
                        >
                          {renderFramePreview(frame.type)}
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

            {/* Aspect Ratio */}
            <div className="space-y-2">
              <span className="block text-xs font-medium text-gray-700">
                Aspect Ratio
              </span>
              <div className="flex flex-wrap gap-1.5">
                {ASPECT_RATIO_PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    className={cn(
                      "px-2.5 py-1 text-xs font-medium rounded-md border transition-all duration-200",
                      options.aspectRatio === preset.value
                        ? "bg-primary text-white border-primary shadow-sm"
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50",
                    )}
                    onClick={() =>
                      setOptions({ ...options, aspectRatio: preset.value })
                    }
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

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
              value={options.padding}
              onChange={(value) => setOptions({ ...options, padding: value })}
              min={0}
              max={100}
              step={1}
              defaultValue={0}
              label="Padding"
              unit="px"
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

            {/* Image Filters */}
            <div className="space-y-3 border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <span className="block text-xs font-medium text-gray-700">
                  Image Filters
                </span>
                <button
                  className="text-[10px] text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() =>
                    setOptions({
                      ...options,
                      filters: { ...DEFAULT_FILTERS },
                    })
                  }
                >
                  Reset
                </button>
              </div>
              <EnhancedSlider
                value={options.filters.brightness}
                onChange={(v) =>
                  setOptions({
                    ...options,
                    filters: { ...options.filters, brightness: v },
                  })
                }
                min={0}
                max={200}
                step={1}
                defaultValue={100}
                label="Brightness"
                unit="%"
              />
              <EnhancedSlider
                value={options.filters.contrast}
                onChange={(v) =>
                  setOptions({
                    ...options,
                    filters: { ...options.filters, contrast: v },
                  })
                }
                min={0}
                max={200}
                step={1}
                defaultValue={100}
                label="Contrast"
                unit="%"
              />
              <EnhancedSlider
                value={options.filters.saturation}
                onChange={(v) =>
                  setOptions({
                    ...options,
                    filters: { ...options.filters, saturation: v },
                  })
                }
                min={0}
                max={200}
                step={1}
                defaultValue={100}
                label="Saturation"
                unit="%"
              />
              <EnhancedSlider
                value={options.filters.blur}
                onChange={(v) =>
                  setOptions({
                    ...options,
                    filters: { ...options.filters, blur: v },
                  })
                }
                min={0}
                max={20}
                step={0.5}
                defaultValue={0}
                label="Blur"
                unit="px"
              />
              <EnhancedSlider
                value={options.filters.grayscale}
                onChange={(v) =>
                  setOptions({
                    ...options,
                    filters: { ...options.filters, grayscale: v },
                  })
                }
                min={0}
                max={100}
                step={1}
                defaultValue={0}
                label="Grayscale"
                unit="%"
              />
              <EnhancedSlider
                value={options.filters.sepia}
                onChange={(v) =>
                  setOptions({
                    ...options,
                    filters: { ...options.filters, sepia: v },
                  })
                }
                min={0}
                max={100}
                step={1}
                defaultValue={0}
                label="Sepia"
                unit="%"
              />
              <EnhancedSlider
                value={options.filters.hueRotate}
                onChange={(v) =>
                  setOptions({
                    ...options,
                    filters: { ...options.filters, hueRotate: v },
                  })
                }
                min={0}
                max={360}
                step={1}
                defaultValue={0}
                label="Hue Rotate"
                unit="°"
              />
              <EnhancedSlider
                value={options.filters.invert}
                onChange={(v) =>
                  setOptions({
                    ...options,
                    filters: { ...options.filters, invert: v },
                  })
                }
                min={0}
                max={100}
                step={1}
                defaultValue={0}
                label="Invert"
                unit="%"
              />
            </div>

            {/* 3D Perspective */}
            <div className="space-y-3 border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <span className="block text-xs font-medium text-gray-700">
                  3D Perspective
                </span>
                <button
                  className="text-[10px] text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() =>
                    setOptions({
                      ...options,
                      perspective: { ...DEFAULT_PERSPECTIVE },
                    })
                  }
                >
                  Reset
                </button>
              </div>
              <EnhancedSlider
                value={options.perspective.rotateX}
                onChange={(v) =>
                  setOptions({
                    ...options,
                    perspective: { ...options.perspective, rotateX: v },
                  })
                }
                min={-45}
                max={45}
                step={1}
                defaultValue={0}
                label="Rotate X"
                unit="°"
              />
              <EnhancedSlider
                value={options.perspective.rotateY}
                onChange={(v) =>
                  setOptions({
                    ...options,
                    perspective: { ...options.perspective, rotateY: v },
                  })
                }
                min={-45}
                max={45}
                step={1}
                defaultValue={0}
                label="Rotate Y"
                unit="°"
              />
              <EnhancedSlider
                value={options.perspective.rotateZ}
                onChange={(v) =>
                  setOptions({
                    ...options,
                    perspective: { ...options.perspective, rotateZ: v },
                  })
                }
                min={-180}
                max={180}
                step={1}
                defaultValue={0}
                label="Rotate Z"
                unit="°"
              />
              <EnhancedSlider
                value={options.perspective.perspective}
                onChange={(v) =>
                  setOptions({
                    ...options,
                    perspective: { ...options.perspective, perspective: v },
                  })
                }
                min={200}
                max={2000}
                step={10}
                defaultValue={1000}
                label="Depth"
                unit="px"
              />
              <EnhancedSlider
                value={options.perspective.scale}
                onChange={(v) =>
                  setOptions({
                    ...options,
                    perspective: { ...options.perspective, scale: v },
                  })
                }
                min={0.5}
                max={2}
                step={0.01}
                defaultValue={1}
                label="Scale"
                unit="x"
              />
            </div>

            {/* Advanced Shadow */}
            <div className="space-y-3 border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <span className="block text-xs font-medium text-gray-700">
                  Advanced Shadow
                </span>
                <button
                  className="text-[10px] text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() =>
                    setOptions({
                      ...options,
                      advancedShadow: { ...DEFAULT_ADVANCED_SHADOW },
                    })
                  }
                >
                  Reset
                </button>
              </div>

              <Toggle
                checked={options.advancedShadow.enabled}
                label="Enable"
                onCheckedChange={(checked) =>
                  setOptions({
                    ...options,
                    advancedShadow: {
                      ...options.advancedShadow,
                      enabled: checked,
                    },
                  })
                }
              />

              {options.advancedShadow.enabled && (
                <>
                  <EnhancedSlider
                    value={options.advancedShadow.blur}
                    onChange={(v) =>
                      setOptions({
                        ...options,
                        advancedShadow: {
                          ...options.advancedShadow,
                          blur: v,
                        },
                      })
                    }
                    min={0}
                    max={100}
                    step={1}
                    defaultValue={20}
                    label="Blur"
                    unit="px"
                  />
                  <EnhancedSlider
                    value={options.advancedShadow.spread}
                    onChange={(v) =>
                      setOptions({
                        ...options,
                        advancedShadow: {
                          ...options.advancedShadow,
                          spread: v,
                        },
                      })
                    }
                    min={-50}
                    max={50}
                    step={1}
                    defaultValue={0}
                    label="Spread"
                    unit="px"
                  />
                  <EnhancedSlider
                    value={options.advancedShadow.offsetX}
                    onChange={(v) =>
                      setOptions({
                        ...options,
                        advancedShadow: {
                          ...options.advancedShadow,
                          offsetX: v,
                        },
                      })
                    }
                    min={-50}
                    max={50}
                    step={1}
                    defaultValue={0}
                    label="Offset X"
                    unit="px"
                  />
                  <EnhancedSlider
                    value={options.advancedShadow.offsetY}
                    onChange={(v) =>
                      setOptions({
                        ...options,
                        advancedShadow: {
                          ...options.advancedShadow,
                          offsetY: v,
                        },
                      })
                    }
                    min={-50}
                    max={50}
                    step={1}
                    defaultValue={10}
                    label="Offset Y"
                    unit="px"
                  />
                  <EnhancedSlider
                    value={options.advancedShadow.opacity}
                    onChange={(v) =>
                      setOptions({
                        ...options,
                        advancedShadow: {
                          ...options.advancedShadow,
                          opacity: v,
                        },
                      })
                    }
                    min={0}
                    max={100}
                    step={1}
                    defaultValue={25}
                    label="Opacity"
                    unit="%"
                  />
                  <div className="flex items-center justify-between w-full">
                    <span className="block text-xs font-medium text-gray-700">
                      Shadow Color
                    </span>
                    <input
                      type="color"
                      value={options.advancedShadow.color}
                      onChange={(e) =>
                        setOptions({
                          ...options,
                          advancedShadow: {
                            ...options.advancedShadow,
                            color: e.target.value,
                          },
                        })
                      }
                      className="w-8 h-8 rounded-md border border-gray-300 cursor-pointer transition-all shadow-sm hover:shadow-md"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
