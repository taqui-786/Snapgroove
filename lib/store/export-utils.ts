import { domToPng, domToJpeg, domToBlob } from "modern-screenshot";
import type { ExportFormat, ExportScale } from "@/components/ImageEditor/types";
import { dataURLtoFile } from "@/components/ImageEditor/utils";

interface ExportOptions {
  element: HTMLElement;
  scale: ExportScale;
  format: ExportFormat;
  fileName?: string;
}

function getMimeType(format: ExportFormat): string {
  switch (format) {
    case "jpeg":
      return "image/jpeg";
    case "webp":
      return "image/webp";
    default:
      return "image/png";
  }
}

function getFileExtension(format: ExportFormat): string {
  return format;
}

/**
 * Hide the resize drag handle before export, restore after
 */
function withHiddenDragHandle<T>(
  element: HTMLElement,
  fn: () => Promise<T>,
): Promise<T> {
  const dragHandle = element.querySelector('[role="slider"]') as HTMLElement;
  const originalDisplay = dragHandle?.style.display;
  if (dragHandle) dragHandle.style.display = "none";

  return fn().finally(() => {
    if (dragHandle) dragHandle.style.display = originalDisplay || "";
  });
}

export async function exportToDataURL(
  options: ExportOptions,
): Promise<{ dataUrl: string; sizeKb: string }> {
  const { element, scale, format } = options;
  const width = element.offsetWidth * scale;
  const height = element.offsetHeight * scale;

  const exportOpts = {
    width,
    height,
    style: {
      transform: `scale(${scale})`,
      transformOrigin: "top left",
      width: `${element.offsetWidth}px`,
      height: `${element.offsetHeight}px`,
    },
    quality: format === "jpeg" ? 0.92 : undefined,
  };

  return withHiddenDragHandle(element, async () => {
    let dataUrl: string;

    if (format === "jpeg") {
      dataUrl = await domToJpeg(element, exportOpts);
    } else {
      // PNG and WebP both use domToPng for the initial conversion
      dataUrl = await domToPng(element, exportOpts);
    }

    // Calculate size
    const base64str = dataUrl.split(",")[1] || "";
    const decoded = atob(base64str);
    const sizeInBytes = decoded.length;
    const sizeKb = (sizeInBytes / 1024).toFixed(1);

    return { dataUrl, sizeKb: `${sizeKb} KB` };
  });
}

export async function downloadImage(options: ExportOptions): Promise<{
  dataUrl: string;
  sizeKb: string;
  file: File;
}> {
  const { dataUrl, sizeKb } = await exportToDataURL(options);
  const fileName = `snapgroove-export.${getFileExtension(options.format)}`;

  const link = document.createElement("a");
  link.download = options.fileName || fileName;
  link.href = dataUrl;
  link.click();

  const file = dataURLtoFile(dataUrl, options.fileName || fileName);

  return { dataUrl, sizeKb, file };
}

export async function copyToClipboard(
  element: HTMLElement,
  scale: ExportScale = 2,
): Promise<boolean> {
  try {
    return await withHiddenDragHandle(element, async () => {
      const blob = await domToBlob(element, {
        width: element.offsetWidth * scale,
        height: element.offsetHeight * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `${element.offsetWidth}px`,
          height: `${element.offsetHeight}px`,
        },
      });

      if (!blob) return false;

      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      return true;
    });
  } catch {
    return false;
  }
}
