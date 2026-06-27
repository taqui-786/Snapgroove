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

export type FrameType =
  | "none"
  | "arc"
  | "stack"
  | "mac-light"
  | "mac-dark"
  | "chrome"
  | "windows-light"
  | "windows-dark"
  | "photograph";

export type PatternType =
  | "waves"
  | "dots"
  | "stripes"
  | "zigzag"
  | "graphpaper"
  | "none";

export type BackgroundMode = "gradient" | "solid" | "custom" | "image";

export type ExportFormat = "png" | "jpeg" | "webp";

export type ExportScale = 1 | 2 | 3;

export interface ImageFilters {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  grayscale: number;
  sepia: number;
  hueRotate: number;
  invert: number;
}

export interface PerspectiveSettings {
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  perspective: number;
  scale: number;
}

export interface AdvancedShadow {
  enabled: boolean;
  blur: number;
  spread: number;
  offsetX: number;
  offsetY: number;
  color: string;
  opacity: number;
}

export interface TextOverlay {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontWeight: number;
  color: string;
}

export interface Annotation {
  id: string;
  type: "arrow" | "rectangle" | "circle" | "line";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  strokeWidth: number;
}

export interface Options {
  aspectRatio: string;
  theme: string;
  backgroundMode: BackgroundMode;
  customTheme: {
    colorStart: string;
    colorEnd: string;
    direction: string;
  };
  backgroundImage: string;
  backgroundOpacity: number;
  rounded: number;
  roundedWrapper: string;
  shadow: number;
  noise: boolean;
  reflection: boolean;
  browserBar: string;
  screenshotScale: number;
  rotation: number;
  padding: number;
  pattern: {
    enabled: boolean;
    intensity: number;
    rotation: number;
    opacity: number;
    type: PatternType;
  };
  frame: FrameType;
  outlineSize: number;
  outlineColor: string;
  filters: ImageFilters;
  perspective: PerspectiveSettings;
  advancedShadow: AdvancedShadow;
}

export interface FrameProps extends PropsWithChildren {
  type: FrameType;
  backgroundColor: string;
  borderRadius: number;
}

export const DEFAULT_FILTERS: ImageFilters = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blur: 0,
  grayscale: 0,
  sepia: 0,
  hueRotate: 0,
  invert: 0,
};

export const DEFAULT_PERSPECTIVE: PerspectiveSettings = {
  rotateX: 0,
  rotateY: 0,
  rotateZ: 0,
  perspective: 1000,
  scale: 1,
};

export const DEFAULT_ADVANCED_SHADOW: AdvancedShadow = {
  enabled: false,
  blur: 20,
  spread: 0,
  offsetX: 0,
  offsetY: 10,
  color: "#000000",
  opacity: 25,
};

export const DEFAULT_OPTIONS: Options = {
  aspectRatio: "free",
  theme: "bg-gradient-to-br from-primary to-chart-1",
  backgroundMode: "gradient",
  customTheme: {
    colorStart: "#667eea",
    colorEnd: "#764ba2",
    direction: "to bottom right",
  },
  backgroundImage: "",
  backgroundOpacity: 100,
  rounded: 12,
  roundedWrapper: "rounded-xl",
  shadow: 3,
  noise: true,
  reflection: true,
  browserBar: "hidden",
  screenshotScale: 0.9,
  rotation: 0,
  padding: 0,
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
  filters: { ...DEFAULT_FILTERS },
  perspective: { ...DEFAULT_PERSPECTIVE },
  advancedShadow: { ...DEFAULT_ADVANCED_SHADOW },
};
