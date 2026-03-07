import { create } from "zustand";
import type {
  Options,
  ScreenshotBlob,
  TextOverlay,
  Annotation,
  ImageFilters,
  PerspectiveSettings,
  AdvancedShadow,
  ExportFormat,
  ExportScale,
  BackgroundMode,
} from "@/components/ImageEditor/types";
import { DEFAULT_OPTIONS } from "@/components/ImageEditor/types";

interface EditorState {
  // Image state
  blob: ScreenshotBlob;
  setBlob: (blob: ScreenshotBlob) => void;

  // Canvas dimensions
  canvasWidth: number;
  canvasHeight: number;
  setCanvasWidth: (w: number) => void;
  setCanvasHeight: (h: number) => void;

  // Outline
  outlineSize: number;
  outlineColor: string;
  setOutlineSize: (size: number) => void;
  setOutlineColor: (color: string) => void;

  // Options
  options: Options;
  setOptions: (options: Options) => void;
  updateOptions: (partial: Partial<Options>) => void;
  updateFilters: (filters: Partial<ImageFilters>) => void;
  updatePerspective: (perspective: Partial<PerspectiveSettings>) => void;
  updateAdvancedShadow: (shadow: Partial<AdvancedShadow>) => void;

  // UI state
  userResized: boolean;
  isDragging: boolean;
  isResizing: boolean;
  resizeStart: { x: number; y: number; w: number; h: number } | null;
  setUserResized: (v: boolean) => void;
  setIsDragging: (v: boolean) => void;
  setIsResizing: (v: boolean) => void;
  setResizeStart: (
    v: { x: number; y: number; w: number; h: number } | null,
  ) => void;

  // Download dialog state
  downloadDialogOpen: boolean;
  downloadStatus: "loading" | "success" | "idle";
  downloadedBlobUrl: string | null;
  downloadedFileSize: string;
  setDownloadDialogOpen: (v: boolean) => void;
  setDownloadStatus: (v: "loading" | "success" | "idle") => void;
  setDownloadedBlobUrl: (v: string | null) => void;
  setDownloadedFileSize: (v: string) => void;

  // Export settings
  exportFormat: ExportFormat;
  exportScale: ExportScale;
  setExportFormat: (f: ExportFormat) => void;
  setExportScale: (s: ExportScale) => void;

  // Text overlays
  textOverlays: TextOverlay[];
  addTextOverlay: (overlay: TextOverlay) => void;
  updateTextOverlay: (id: string, update: Partial<TextOverlay>) => void;
  removeTextOverlay: (id: string) => void;

  // Annotations
  annotations: Annotation[];
  addAnnotation: (annotation: Annotation) => void;
  updateAnnotation: (id: string, update: Partial<Annotation>) => void;
  removeAnnotation: (id: string) => void;

  // Persistence
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  // Image state
  blob: { src: "" },
  setBlob: (blob) => set({ blob }),

  // Canvas dimensions
  canvasWidth: 600,
  canvasHeight: 400,
  setCanvasWidth: (canvasWidth) => set({ canvasWidth }),
  setCanvasHeight: (canvasHeight) => set({ canvasHeight }),

  // Outline
  outlineSize: 0,
  outlineColor: "#292524",
  setOutlineSize: (outlineSize) => set({ outlineSize }),
  setOutlineColor: (outlineColor) => set({ outlineColor }),

  // Options
  options: { ...DEFAULT_OPTIONS },
  setOptions: (options) => set({ options }),
  updateOptions: (partial) =>
    set((state) => ({ options: { ...state.options, ...partial } })),
  updateFilters: (filters) =>
    set((state) => ({
      options: {
        ...state.options,
        filters: { ...state.options.filters, ...filters },
      },
    })),
  updatePerspective: (perspective) =>
    set((state) => ({
      options: {
        ...state.options,
        perspective: { ...state.options.perspective, ...perspective },
      },
    })),
  updateAdvancedShadow: (shadow) =>
    set((state) => ({
      options: {
        ...state.options,
        advancedShadow: { ...state.options.advancedShadow, ...shadow },
      },
    })),

  // UI state
  userResized: false,
  isDragging: false,
  isResizing: false,
  resizeStart: null,
  setUserResized: (userResized) => set({ userResized }),
  setIsDragging: (isDragging) => set({ isDragging }),
  setIsResizing: (isResizing) => set({ isResizing }),
  setResizeStart: (resizeStart) => set({ resizeStart }),

  // Download dialog
  downloadDialogOpen: false,
  downloadStatus: "idle",
  downloadedBlobUrl: null,
  downloadedFileSize: "",
  setDownloadDialogOpen: (downloadDialogOpen) => set({ downloadDialogOpen }),
  setDownloadStatus: (downloadStatus) => set({ downloadStatus }),
  setDownloadedBlobUrl: (downloadedBlobUrl) => set({ downloadedBlobUrl }),
  setDownloadedFileSize: (downloadedFileSize) => set({ downloadedFileSize }),

  // Export settings
  exportFormat: "png",
  exportScale: 2,
  setExportFormat: (exportFormat) => set({ exportFormat }),
  setExportScale: (exportScale) => set({ exportScale }),

  // Text overlays
  textOverlays: [],
  addTextOverlay: (overlay) =>
    set((state) => ({ textOverlays: [...state.textOverlays, overlay] })),
  updateTextOverlay: (id, update) =>
    set((state) => ({
      textOverlays: state.textOverlays.map((t) =>
        t.id === id ? { ...t, ...update } : t,
      ),
    })),
  removeTextOverlay: (id) =>
    set((state) => ({
      textOverlays: state.textOverlays.filter((t) => t.id !== id),
    })),

  // Annotations
  annotations: [],
  addAnnotation: (annotation) =>
    set((state) => ({ annotations: [...state.annotations, annotation] })),
  updateAnnotation: (id, update) =>
    set((state) => ({
      annotations: state.annotations.map((a) =>
        a.id === id ? { ...a, ...update } : a,
      ),
    })),
  removeAnnotation: (id) =>
    set((state) => ({
      annotations: state.annotations.filter((a) => a.id !== id),
    })),

  // Persistence
  saveToLocalStorage: () => {
    const state = get();
    localStorage.setItem("snapgroove-options", JSON.stringify(state.options));
  },
  loadFromLocalStorage: () => {
    try {
      const saved = localStorage.getItem("snapgroove-options");
      if (saved) {
        const parsed = JSON.parse(saved);
        set({ options: { ...DEFAULT_OPTIONS, ...parsed } });
      }
    } catch {
      // ignore parse errors
    }
  },
}));

export const initializeStore = (initialState?: {
  blob?: ScreenshotBlob;
  canvasWidth?: number;
  canvasHeight?: number;
  outlineSize?: number;
  outlineColor?: string;
  options?: Options;
}) => {
  if (!initialState) return;
  const store = useEditorStore.getState();
  if (initialState.blob) store.setBlob(initialState.blob);
  if (initialState.canvasWidth) store.setCanvasWidth(initialState.canvasWidth);
  if (initialState.canvasHeight)
    store.setCanvasHeight(initialState.canvasHeight);
  if (initialState.outlineSize !== undefined)
    store.setOutlineSize(initialState.outlineSize);
  if (initialState.outlineColor)
    store.setOutlineColor(initialState.outlineColor);
  if (initialState.options)
    store.setOptions({ ...DEFAULT_OPTIONS, ...initialState.options });
};
