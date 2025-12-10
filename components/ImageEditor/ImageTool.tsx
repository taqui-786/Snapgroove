"use client";

import domtoimage from "dom-to-image";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { DownloadDialog } from "./DownloadDialog";
import { BackgroundSettings } from "./BackgroundSettings";
import { Canvas } from "./Canvas";
import { ImageSettings } from "./ImageSettings";
import type { ImageBeautifierProps, Options, ScreenshotBlob } from "./types";
import { dataURLtoFile } from "./utils";

export function ImageTool({
  onClose,
  onSave,
  onUpload,
  initialEditorState,
}: ImageBeautifierProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [blob, setBlob] = useState<ScreenshotBlob>({
    src: initialEditorState?.blob.src || "",
  });
  const [canvasWidth, setCanvasWidth] = useState(
    initialEditorState?.canvasWidth || 600
  );
  const [canvasHeight, setCanvasHeight] = useState(
    initialEditorState?.canvasHeight || 400
  );
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
  } | null>(null);
  const [outlineSize, setOutlineSize] = useState(
    initialEditorState?.outlineSize || 0
  );
  const [outlineColor, setOutlineColor] = useState(
    initialEditorState?.outlineColor || "#292524"
  );
  const [options, setOptions] = useState<Options>(
    initialEditorState?.options || {
      aspectRatio: "aspect-auto",
      theme: "bg-gradient-to-br from-primary to-chart-1",
      customTheme: {
        colorStart: "#f3f4f6",
        colorEnd: "#e5e7eb",
      },
      rounded: 12,
      roundedWrapper: "rounded-xl",
      shadow: 3,
      noise: true,
      reflection: true,
      browserBar: "hidden",
      screenshotScale: 0.9,
      rotation: 0,
      pattern: {
        enabled: true,
        intensity: 15,
        rotation: 0,
        opacity: 6,
        type: "stripes",
      },
      frame: "arc",
      outlineSize: 8,
      outlineColor: "#292524",
    }
  );
  const [userResized, setUserResized] = useState(
    !!initialEditorState?.canvasWidth
  );
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const preset = localStorage.getItem("options");
    if (preset) {
      // @ts-ignore
      // setOptions(JSON.parse(preset))
    }
  }, []);

  useEffect(() => {
    const handleShortcuts = (e: KeyboardEvent) => {
      if ((e.key === "s" && e.ctrlKey) || (e.key === "s" && e.metaKey)) {
        e.preventDefault();
        saveImage();
      }
    };

    document.addEventListener("keydown", handleShortcuts);
    return () => {
      document.removeEventListener("keydown", handleShortcuts);
    };
  }, [blob]);

  useEffect(() => {
    localStorage.setItem("options", JSON.stringify(options));
  }, [options]);

  useEffect(() => {
    function setCanvasToContainer() {
      if (containerRef.current && !userResized && !blob.src) {
        const rect = containerRef.current.getBoundingClientRect();
        setCanvasWidth(Math.max(100, rect.width - outlineSize));
        setCanvasHeight(Math.max(100, rect.height - outlineSize));
      }
    }
    setCanvasToContainer();
    window.addEventListener("resize", setCanvasToContainer);
    return () => window.removeEventListener("resize", setCanvasToContainer);
  }, [userResized, outlineSize, blob.src]);

  useEffect(() => {
    if (!isResizing) return;

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!resizeStart) return;
      let clientX, clientY;
      if (e instanceof TouchEvent) {
        clientX = e.touches[0]!.clientX;
        clientY = e.touches[0]!.clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      const newWidth = Math.max(100, resizeStart.w + (clientX - resizeStart.x));
      const newHeight = Math.max(
        100,
        resizeStart.h + (clientY - resizeStart.y)
      );
      setCanvasWidth(newWidth);
      setCanvasHeight(newHeight);
    };

    const onUp = () => setIsResizing(false);

    window.addEventListener("mousemove", onMove as any);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove as any);
    window.addEventListener("touchend", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove as any);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove as any);
      window.removeEventListener("touchend", onUp);
    };
  }, [isResizing, resizeStart]);

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (!item) continue;

        if (item.kind === "file" && item.type.includes("image")) {
          const file = item.getAsFile();
          if (!file) continue;

          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target && e.target.result) {
              setBlob({ src: e.target.result as string });
            }
          };
          reader.readAsDataURL(file);
          break;
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, []);

  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<
    "loading" | "success" | "idle"
  >("idle");
  const [downloadedBlobUrl, setDownloadedBlobUrl] = useState<string | null>(
    null
  );
  const [downloadedFileSize, setDownloadedFileSize] = useState<string>("");

  const saveImage = async (scale = 1) => {
    try {
      setDownloadDialogOpen(true);
      setDownloadStatus("loading");

      const element = wrapperRef.current;
      if (!element) return;

      // const savingToast = toast.loading("Saving image..."); // Removed toast

      const dragHandle = element.querySelector(
        '[role="slider"]'
      ) as HTMLElement;
      const originalDisplay = dragHandle?.style.display;
      if (dragHandle) {
        dragHandle.style.display = "none";
      }

      // Wait a bit to show loader (for effect, and to let UI update)
      await new Promise((resolve) => setTimeout(resolve, 800));

      const data = await domtoimage.toPng(element, {
        height: element.offsetHeight * scale,
        width: element.offsetWidth * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `${element.offsetWidth}px`,
          height: `${element.offsetHeight}px`,
        },
      });

      if (dragHandle) {
        dragHandle.style.display = originalDisplay || "";
      }

      const link = document.createElement("a");
      link.download = "snapgroove-export.png";
      link.href = data;
      link.click();

      // Calculate size
      const base64str = data.split(",")[1];
      const decoded = atob(base64str);
      const sizeInBytes = decoded.length;
      const sizeInKb = (sizeInBytes / 1024).toFixed(1);

      setDownloadedFileSize(`${sizeInKb} KB`);
      setDownloadedBlobUrl(data);
      setDownloadStatus("success");

      if (onUpload) {
        const file = dataURLtoFile(data, "snapgroove-export.png");
        onUpload(file);
      }

    } catch (error) {
      setDownloadDialogOpen(false);
      setDownloadStatus("idle");
      toast.error("Something went wrong");
    }
  };

  const onPaste = (event: React.ClipboardEvent | React.DragEvent | Event) => {
    let items: DataTransferItemList | FileList | null = null;

    if ((event as React.ClipboardEvent).clipboardData) {
      items = (event as React.ClipboardEvent).clipboardData.items;
    } else if ((event as React.DragEvent).dataTransfer) {
      items = (event as React.DragEvent).dataTransfer.files;
    } else if ((event as any).target && (event as any).target.files) {
      items = (event as any).target.files;
    }

    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (
        (item as DataTransferItem).kind === "file" ||
        ((item as File).type && (item as File).type.includes("image"))
      ) {
        const file = (item as DataTransferItem).kind
          ? (item as DataTransferItem).getAsFile()
          : (item as File);

        if (!file) continue;

        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target && e.target.result) {
            setBlob({ src: e.target.result as string });
          }
        };
        reader.readAsDataURL(file);
        break;
      }
    }
  };

  const handleClickExampleImage = () => {
    setBlob({
      src: "/sample-image.png",
    });
  };

  return (
    <div className="flex flex-col  w-full bg-background p-2 xl:p-4 rounded-lg  " data-vaul-no-drag>
      <div className="relative w-full flex xl:flex-row flex-col justify-center gap-4">
        <ImageSettings
          options={options}
          setOptions={setOptions}
          outlineSize={outlineSize}
          setOutlineSize={setOutlineSize}
          outlineColor={outlineColor}
          setOutlineColor={setOutlineColor}
          blob={blob}
        />
        <Canvas
          blob={blob}
          options={options}
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          outlineSize={outlineSize}
          outlineColor={outlineColor}
          isDragging={isDragging}
          isResizing={isResizing}
          userResized={userResized}
          containerRef={containerRef}
          wrapperRef={wrapperRef}
          fileInputRef={fileInputRef}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!blob.src) {
              setIsDragging(true);
            }
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
            onPaste(e);
          }}
          onPaste={onPaste as any}
          onClickExample={handleClickExampleImage}
          setBlob={setBlob}
          setCanvasWidth={setCanvasWidth}
          setCanvasHeight={setCanvasHeight}
          setUserResized={setUserResized}
          setOutlineColor={setOutlineColor}
          setIsResizing={setIsResizing}
          setResizeStart={setResizeStart}
        />

        <BackgroundSettings
          options={options}
          setOptions={setOptions}
          saveImage={saveImage}
          blob={blob}
        />

        <DownloadDialog
          open={downloadDialogOpen}
          onOpenChange={setDownloadDialogOpen}
          status={downloadStatus}
          blobUrl={downloadedBlobUrl}
          fileSize={downloadedFileSize}
          fileName="image-export.png"
        />
      </div>
    </div>
  );
}
