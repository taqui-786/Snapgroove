import { cn } from "@/lib/utils";
import { ImagePlus, MousePointer } from "lucide-react";
import type { RefObject } from "react";
import { Frame } from "./Frame";
import type { Options, ScreenshotBlob } from "./types";
import { getMostCommonBorderColor, rgbToHex, shadowMap } from "./utils";
import { ImageAddIcon, ResizeIcon } from "../CustomIcons";

interface CanvasProps {
  blob: ScreenshotBlob;
  options: Options;
  canvasWidth: number;
  canvasHeight: number;
  outlineSize: number;
  outlineColor: string;
  isDragging: boolean;
  isResizing: boolean;
  userResized: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
  wrapperRef: RefObject<HTMLDivElement | null>;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onPaste: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickExample: () => void;
  setBlob: (blob: ScreenshotBlob) => void;
  setCanvasWidth: (width: number) => void;
  setCanvasHeight: (height: number) => void;
  setUserResized: (resized: boolean) => void;
  setOutlineColor: (color: string) => void;
  setIsResizing: (isResizing: boolean) => void;
  setResizeStart: (start: {
    x: number;
    y: number;
    w: number;
    h: number;
  }) => void;
}

export const Canvas = ({
  blob,
  options,
  canvasWidth,
  canvasHeight,
  outlineSize,
  outlineColor,
  isDragging,
  isResizing,
  userResized,
  containerRef,
  wrapperRef,
  fileInputRef,
  onDragOver,
  onDragLeave,
  onDrop,
  onPaste,
  onClickExample,
  setBlob,
  setCanvasWidth,
  setCanvasHeight,
  setUserResized,
  setOutlineColor,
  setIsResizing,
  setResizeStart,
}: CanvasProps) => {
  const renderBrowserBar = () => {
    switch (options.browserBar) {
      case "light":
        return (
          <div className="flex items-center w-full px-4 py-[10px] rounded-t-lg bg-white/80">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full" />
              <div className="w-3 h-3 bg-yellow-300 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
          </div>
        );
      case "dark":
        return (
          <div className="flex items-center w-full px-4 py-[10px] rounded-t-lg bg-black/40">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full" />
              <div className="w-3 h-3 bg-yellow-300 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "relative w-full flex-1 flex items-start justify-center min-h-[500px] h-full rounded-lg xl:order-2 order-1",
        "bg-light-gray border border-stone-200 bg-[size:10px_10px] bg-fixed transition-all duration-200",
        {
          "items-center h-[80vh]": !Boolean(blob.src),
          "max-w-[calc(72rem-330px)] h-[80vh]": Boolean(blob.src),
          "ring-2 ring-primary ring-offset-2 bg-indigo-50/50":
            isDragging && !blob.src,
          "bg-[image:repeating-linear-gradient(315deg,rgba(209,213,219,0.4)_0,rgba(209,213,219,0.4)_1px,_transparent_0,_transparent_50%)]":
            !isDragging || blob.src,
          "bg-[image:repeating-linear-gradient(315deg,rgba(251,191,36,0.15)_0,rgba(251,191,36,0.15)_1px,_transparent_0,_transparent_50%)]":
            isDragging && !blob.src,
        }
      )}
      ref={containerRef}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => {
        if (!blob.src && fileInputRef.current) {
          fileInputRef.current.click();
        }
      }}
    >
      {blob?.src ? (
        <div
          className={cn("overflow-hidden")}
          style={{
            width: canvasWidth + outlineSize,
            height: canvasHeight + outlineSize,
            minWidth: 100,
            minHeight: 100,
            maxWidth: "100%",
            maxHeight: "80vh",
            // borderRadius: `${options.rounded}px`,
          }}
        >
          <div
            ref={wrapperRef}
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              boxShadow: shadowMap[options.shadow],
              //   borderRadius: `${options.rounded}px`,
            }}
            className={cn(
              "transition-all duration-200 ease-in-out flex items-center justify-center overflow-hidden w-full h-full flex-col",
              [options.theme],
              options.aspectRatio
            )}
          >
            {renderBrowserBar()}
            {options.noise && (
              <div
                style={{
                  backgroundImage: `url("/noise.svg")`,
                  //   borderRadius: `${options.rounded}px`,
                }}
                className={cn(
                  "absolute inset-0 w-full h-full bg-repeat opacity-[0.15]",
                  {
                    "rounded-t-none": options.browserBar !== "hidden",
                  }
                )}
              />
            )}

            {options.pattern.enabled && (
              <div
                className="w-full h-full absolute inset-0 overflow-hidden"
                style={{
                  zIndex: 1,
                  pointerEvents: "none",
                  opacity: options.pattern.opacity / 100,
                  mixBlendMode: "luminosity",
                }}
              >
                <div
                  className="w-full h-full absolute inset-0 object-cover"
                  style={{
                    backgroundImage: `url("/pattern/${options.pattern.type}.svg")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: `${options.pattern.intensity}%`,
                    transform: `rotate(${options.pattern.rotation}deg) scale(2)`,
                  }}
                />
              </div>
            )}

            <div
              className="relative flex items-center justify-center transition-all ease-in-out antialiased"
              style={{
                willChange: "transform",
                borderRadius: `${options.rounded}px`,
                transition: "400ms cubic-bezier(0.03, 0.98, 0.52, 0.99)",
                position: "relative",
                zIndex: 2,
                transform: `scale(${options.screenshotScale}) rotate(${options.rotation}deg)`,
                maxWidth: "100%",
                maxHeight: "100%",
                boxShadow: shadowMap[options.shadow],
              }}
            >
              <div className="relative">
                {options.reflection && (
                  <div className="glass-wrapper absolute inset-0 z-20 pointer-events-none">
                    <svg
                      className="glass-line"
                      viewBox="0 0 1 1"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <clipPath
                          id="diagonal-curve"
                          clipPathUnits="objectBoundingBox"
                        >
                          <path
                            className="outline outline-red-500"
                            d="M 0 0 L 0 1 Q 0.2 1.2, 0.65 0 L 0.65 0 Z"
                          />
                        </clipPath>
                      </defs>
                    </svg>

                    <div
                      className="glass"
                      style={{ clipPath: "url(#diagonal-curve)" }}
                    >
                      <div className="glass-edge"></div>
                    </div>
                  </div>
                )}

                <Frame
                  backgroundColor={outlineColor}
                  borderRadius={options.rounded}
                  type={options.frame}
                >
                  <div
                    className="relative transition-all ease-in-out"
                    style={{
                      overflow: "hidden",
                      borderRadius: `${options.rounded}px`,
                      boxShadow: shadowMap[options.shadow],
                      background: outlineColor,
                      border: `${outlineSize}px solid ${outlineColor}`,
                      transition:
                        "border 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99)",
                    }}
                  >
                    <img
                      src={blob.src || "/placeholder.svg"}
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "block",
                      }}
                      onLoad={(e) => {
                        const target = e.target as HTMLImageElement;
                        const naturalWidth = target.naturalWidth;
                        const naturalHeight = target.naturalHeight;

                        setBlob({
                          ...blob,
                          w: naturalWidth,
                          h: naturalHeight,
                        });

                        if (!userResized && naturalWidth && naturalHeight) {
                          const aspectRatio = naturalHeight / naturalWidth;
                          const maxHeight = window.innerHeight * 0.7;
                          const maxWidth = canvasWidth;

                          let newHeight = canvasWidth * aspectRatio;

                          if (newHeight > maxHeight) {
                            newHeight = maxHeight;
                            const newWidth = newHeight / aspectRatio;
                            setCanvasWidth(Math.min(newWidth, maxWidth));
                          }

                          setCanvasHeight(
                            Math.max(200, Math.min(newHeight, maxHeight))
                          );
                          setUserResized(true);
                        }

                        if (blob.src) {
                          getMostCommonBorderColor(blob.src, (color) => {
                            setOutlineColor(rgbToHex(color));
                          });
                        }
                      }}
               
                      alt="Screenshot preview"
                    />
             
                  </div>
                </Frame>
              </div>
            </div>

            <div
              tabIndex={0}
              role="slider"
              aria-label="Resize canvas"
              className="absolute bottom-1 right-1 size-10 text-white  flex items-center justify-center cursor-nwse-resize z-50  hover:text-primary transition-all duration-300"
              style={{ touchAction: "none", userSelect: "none" }}
              onMouseDown={(e) => {
                e.preventDefault();
                setIsResizing(true);
                setResizeStart({
                  x: e.clientX,
                  y: e.clientY,
                  w: canvasWidth,
                  h: canvasHeight,
                });
                setUserResized(true);
              }}
              onTouchStart={(e) => {
                if (e.touches.length === 1) {
                  setIsResizing(true);
                  setResizeStart({
                    x: e.touches[0]!.clientX,
                    y: e.touches[0]!.clientY,
                    w: canvasWidth,
                    h: canvasHeight,
                  });
                  setUserResized(true);
                }
              }}
            >
              <ResizeIcon size="30" />
            </div>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "flex flex-col items-center justify-center xl:p-12 p-2 border bg-white border-stone-200 rounded-xl cursor-pointer hover:border-stone-300 transition-all duration-300 backdrop-blur-sm"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <label htmlFor="screenshot-upload" className="cursor-pointer w-full">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="relative">
                <ImageAddIcon size="28"
                  className={cn(" text-muted-foreground", {
                    "text-primary": isDragging,
                  })}
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-medium text-stone-800">
                  {isDragging ? "Drop your image here" : "Add an image"}
                </h3>
                <p className="text-sm text-stone-500 max-w-sm">
                  Make your content shine with{" "}
                  <span className="text-primary font-medium">
                    clear, beautiful visuals
                  </span>
                  . <br />
                  Drag & drop, paste, or click to upload.
                </p>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 text-xs text-stone-400">
                  <span className="px-2 py-1 rounded-md bg-light-gray bg-opacity-75">
                    ⌘V
                  </span>
                  <span>to paste</span>
                </div>
                <div className="border-b border-stone-200 w-[300px]"></div>
                <div
                  className="w-[150px] flex flex-col items-center gap-2 text-xs text-stone-400 "
                  onClick={onClickExample}
                >
                  <div className="mt-2 border border-dashed border-stone-300 rounded-full p-3 w-12 h-12 flex items-center justify-center group">
                    <MousePointer className="size-6 text-stone-300 group-hover:scale-125 group-hover:text-primary transition-all duration-100"></MousePointer>
                  </div>
                  <span>Try demo image</span>
                </div>
              </div>
            </div>
            <input
              ref={fileInputRef}
              id="screenshot-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onPaste}
            />
          </label>
        </div>
      )}
    </div>
  );
};
