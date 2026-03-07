export interface AspectRatioPreset {
  label: string;
  value: string; // CSS class or "free"
  ratio: number | null; // width/height ratio, null for free
}

export const ASPECT_RATIO_PRESETS: AspectRatioPreset[] = [
  { label: "Free", value: "free", ratio: null },
  { label: "16:9", value: "16:9", ratio: 16 / 9 },
  { label: "4:3", value: "4:3", ratio: 4 / 3 },
  { label: "1:1", value: "1:1", ratio: 1 },
  { label: "3:2", value: "3:2", ratio: 3 / 2 },
  { label: "9:16", value: "9:16", ratio: 9 / 16 },
  { label: "4:5", value: "4:5", ratio: 4 / 5 },
];
