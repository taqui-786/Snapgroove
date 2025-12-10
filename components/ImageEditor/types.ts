import type { PropsWithChildren } from "react";

export interface ImageBeautifierProps {
  onClose?: () => void;
  onSave?: (image: {
    src: string;
    width: number;
    height: number;
    editorState: {
      blob: {
        src: string;
        w?: number;
        h?: number;
      };
      canvasWidth: number;
      canvasHeight: number;
      outlineSize: number;
      outlineColor: string;
      options: Options;
    };
  }) => void;
  onUpload?: (file: File) => void;
  initialEditorState?: {
    blob: {
      src: string;
      w?: number;
      h?: number;
    };
    canvasWidth: number;
    canvasHeight: number;
    outlineSize: number;
    outlineColor: string;
    options: Options;
  };
}

export interface ScreenshotBlob {
  src: string;
  w?: number;
  h?: number;
}

export interface Options {
  aspectRatio: string;
  theme: string;
  customTheme: {
    colorStart: string;
    colorEnd: string;
  };
  rounded: number;
  roundedWrapper: string;
  shadow: number;
  noise: boolean;
  reflection: boolean;
  browserBar: string;
  screenshotScale: number;
  rotation: number;
  pattern: {
    enabled: boolean;
    intensity: number;
    rotation: number;
    opacity: number;
    type: "waves" | "dots" | "stripes" | "zigzag" | "graphpaper" | "none";
  };
  frame: "none" | "arc" | "stack" | "mac-light" | "mac-dark" | "chrome";
  outlineSize: number;
  outlineColor: string;
}

export interface FrameProps extends PropsWithChildren {
  type: "none" | "arc" | "stack" | "mac-light" | "mac-dark" | "chrome";
  backgroundColor: string;
  borderRadius: number;
}
