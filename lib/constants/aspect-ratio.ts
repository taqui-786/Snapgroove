export interface AspectRatioPreset {
  id: string;
  label: string;
  ratio: number | null;
  width: number;
  height: number;
}

export const ASPECT_RATIO_PRESETS: AspectRatioPreset[] = [
  { id: "free", label: "Free", ratio: null, width: 0, height: 0 },
  { id: "1_1", label: "1:1", ratio: 1, width: 1, height: 1 },
  { id: "4_3", label: "4:3", ratio: 4 / 3, width: 4, height: 3 },
  { id: "16_9", label: "16:9", ratio: 16 / 9, width: 16, height: 9 },
  { id: "3_2", label: "3:2", ratio: 3 / 2, width: 3, height: 2 },
  { id: "5_4", label: "5:4", ratio: 5 / 4, width: 5, height: 4 },
  { id: "9_16", label: "9:16", ratio: 9 / 16, width: 9, height: 16 },
  { id: "4_5", label: "4:5", ratio: 4 / 5, width: 4, height: 5 },
  { id: "3_4", label: "3:4", ratio: 3 / 4, width: 3, height: 4 },
  { id: "2_3", label: "2:3", ratio: 2 / 3, width: 2, height: 3 },
];
