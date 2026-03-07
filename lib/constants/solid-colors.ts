export interface SolidColorPreset {
  name: string;
  color: string;
}

export const SOLID_COLOR_PRESETS: SolidColorPreset[] = [
  // Whites & Lights
  { name: "White", color: "#FFFFFF" },
  { name: "Snow", color: "#FAFAFA" },
  { name: "Ghost White", color: "#F8F8FF" },
  { name: "Ivory", color: "#F5F5F0" },
  { name: "Linen", color: "#FAF0E6" },

  // Grays
  { name: "Light Gray", color: "#E5E7EB" },
  { name: "Gray", color: "#9CA3AF" },
  { name: "Dark Gray", color: "#4B5563" },
  { name: "Charcoal", color: "#374151" },
  { name: "Slate", color: "#1E293B" },

  // Blacks & Darks
  { name: "Black", color: "#000000" },
  { name: "Jet", color: "#0A0A0A" },
  { name: "Obsidian", color: "#1A1A2E" },

  // Blues
  { name: "Sky Blue", color: "#38BDF8" },
  { name: "Blue", color: "#3B82F6" },
  { name: "Indigo", color: "#6366F1" },
  { name: "Navy", color: "#1E3A5F" },

  // Greens
  { name: "Emerald", color: "#10B981" },
  { name: "Green", color: "#22C55E" },
  { name: "Teal", color: "#14B8A6" },
  { name: "Forest", color: "#166534" },

  // Reds & Pinks
  { name: "Red", color: "#EF4444" },
  { name: "Rose", color: "#F43F5E" },
  { name: "Pink", color: "#EC4899" },
  { name: "Crimson", color: "#DC2626" },

  // Purples
  { name: "Purple", color: "#A855F7" },
  { name: "Violet", color: "#8B5CF6" },
  { name: "Fuchsia", color: "#D946EF" },

  // Oranges & Yellows
  { name: "Orange", color: "#F97316" },
  { name: "Amber", color: "#F59E0B" },
  { name: "Yellow", color: "#EAB308" },
  { name: "Gold", color: "#CA8A04" },
];
