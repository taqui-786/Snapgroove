export interface GradientPreset {
  name: string;
  from: string;
  to: string;
  direction?: string;
}

export const GRADIENT_PRESETS: GradientPreset[] = [
  // Blues & Cyans
  { name: "Ocean", from: "#667eea", to: "#764ba2" },
  { name: "Sky", from: "#a1c4fd", to: "#c2e9fb" },
  { name: "Deep Sea", from: "#0052D4", to: "#6FB1FC" },
  { name: "Royal Blue", from: "#536976", to: "#292E49" },
  { name: "Aqua", from: "#00d2ff", to: "#3a7bd5" },
  { name: "Pacific", from: "#34e89e", to: "#0f3443" },
  { name: "Frost", from: "#000428", to: "#004e92" },
  { name: "Electric Blue", from: "#4776E6", to: "#8E54E9" },
  { name: "Sapphire", from: "#0F2027", to: "#2C5364" },
  { name: "Azure", from: "#ECE9E6", to: "#FFFFFF" },
  { name: "Steel Blue", from: "#485563", to: "#29323c" },
  { name: "Ice", from: "#C9D6FF", to: "#E2E2E2" },

  // Purples & Violets
  { name: "Purple Haze", from: "#7303c0", to: "#ec38bc" },
  { name: "Lavender", from: "#ee9ca7", to: "#ffdde1" },
  { name: "Ultraviolet", from: "#654ea3", to: "#eaafc8" },
  { name: "Amethyst", from: "#9D50BB", to: "#6E48AA" },
  { name: "Plum", from: "#360033", to: "#0b8793" },
  { name: "Grape", from: "#B24592", to: "#F15F79" },
  { name: "Orchid", from: "#DA22FF", to: "#9733EE" },
  { name: "Twilight", from: "#0F0C29", to: "#302B63" },
  { name: "Mystique", from: "#6a3093", to: "#a044ff" },
  { name: "Royal", from: "#141E30", to: "#243B55" },

  // Pinks & Reds
  { name: "Sunset", from: "#ff6a00", to: "#ee0979" },
  { name: "Pink Dream", from: "#ff758c", to: "#ff7eb3" },
  { name: "Rose", from: "#f5576c", to: "#ff6b95" },
  { name: "Coral", from: "#ff9a9e", to: "#fecfef" },
  { name: "Flamingo", from: "#f78ca0", to: "#f9748f" },
  { name: "Cherry", from: "#EB3349", to: "#F45C43" },
  { name: "Crimson", from: "#ED213A", to: "#93291E" },
  { name: "Ruby", from: "#fc5c7d", to: "#6a82fb" },
  { name: "Blush", from: "#ffecd2", to: "#fcb69f" },
  { name: "Valentine", from: "#e8198b", to: "#c7eafd" },
  { name: "Hot Pink", from: "#F953C6", to: "#B91D73" },
  { name: "Magenta", from: "#c31432", to: "#240b36" },

  // Oranges & Yellows
  { name: "Sunrise", from: "#f83600", to: "#f9d423" },
  { name: "Amber", from: "#f7971e", to: "#ffd200" },
  { name: "Peach", from: "#ffecd2", to: "#fcb69f" },
  { name: "Mango", from: "#ffe259", to: "#ffa751" },
  { name: "Gold", from: "#F7971E", to: "#FFD200" },
  { name: "Tangerine", from: "#f46b45", to: "#eea849" },
  { name: "Honey", from: "#F09819", to: "#EDDE5D" },
  { name: "Citrus", from: "#f9d423", to: "#ff4e50" },
  { name: "Warm Flame", from: "#ff9a9e", to: "#fad0c4" },
  { name: "Desert", from: "#E6DADA", to: "#274046" },

  // Greens
  { name: "Forest", from: "#134E5E", to: "#71B280" },
  { name: "Emerald", from: "#43cea2", to: "#185a9d" },
  { name: "Mint", from: "#00b09b", to: "#96c93d" },
  { name: "Jade", from: "#1D976C", to: "#93F9B9" },
  { name: "Spring", from: "#00d2ff", to: "#928DAB" },
  { name: "Sage", from: "#8e9eab", to: "#eef2f3" },
  { name: "Teal", from: "#11998e", to: "#38ef7d" },
  { name: "Lime", from: "#a8e063", to: "#56ab2f" },
  { name: "Olive", from: "#B4B4B4", to: "#2C3E50" },
  { name: "Moss", from: "#134E5E", to: "#71B280" },
  { name: "Grass", from: "#56ab2f", to: "#a8e063" },
  { name: "Seafoam", from: "#43e97b", to: "#38f9d7" },

  // Neutrals & Darks
  { name: "Midnight", from: "#232526", to: "#414345" },
  { name: "Charcoal", from: "#373B44", to: "#4286f4" },
  { name: "Obsidian", from: "#000000", to: "#434343" },
  { name: "Slate", from: "#bdc3c7", to: "#2c3e50" },
  { name: "Storm", from: "#0f0c29", to: "#24243e" },
  { name: "Noir", from: "#000000", to: "#0f0f0f" },
  { name: "Silver", from: "#C0C0C0", to: "#F5F5F5" },
  { name: "Ash", from: "#606c88", to: "#3f4c6b" },
  { name: "Graphite", from: "#333333", to: "#666666" },
  { name: "Smoke", from: "#D7DDE8", to: "#757F9A" },

  // Multi-tone & Vibrant
  { name: "Rainbow", from: "#f12711", to: "#f5af19" },
  { name: "Neon", from: "#00f260", to: "#0575e6" },
  { name: "Aurora", from: "#EECDA3", to: "#EF629F" },
  { name: "Northern Light", from: "#22c1c3", to: "#fdbb2d" },
  { name: "Cosmic", from: "#ff00cc", to: "#333399" },
  { name: "Galaxy", from: "#E8CBC0", to: "#636FA4" },
  { name: "Nebula", from: "#3A1C71", to: "#FFAF7B" },
  { name: "Prism", from: "#f5f7fa", to: "#c3cfe2" },
  { name: "Spectrum", from: "#cc2b5e", to: "#753a88" },
  { name: "Vivid", from: "#fcb045", to: "#fd1d1d" },
  { name: "Lush", from: "#56ab2f", to: "#a8e063" },
  { name: "Electric", from: "#fc00ff", to: "#00dbde" },

  // Pastels
  { name: "Cotton Candy", from: "#fbc2eb", to: "#a6c1ee" },
  { name: "Baby Blue", from: "#e0c3fc", to: "#8ec5fc" },
  { name: "Peach Cream", from: "#ffecd2", to: "#fcb69f" },
  { name: "Lilac", from: "#a18cd1", to: "#fbc2eb" },
  { name: "Butter", from: "#f6d365", to: "#fda085" },
  { name: "Cloud", from: "#fdfbfb", to: "#ebedee" },
  { name: "Serenity", from: "#89f7fe", to: "#66a6ff" },
  { name: "Soft Pink", from: "#f093fb", to: "#f5576c" },
  { name: "Vanilla", from: "#F3E7E9", to: "#E3EEFF" },
  { name: "Marshmallow", from: "#fdfcfb", to: "#e2d1c3" },

  // Earthy
  { name: "Sandstone", from: "#b79891", to: "#94716b" },
  { name: "Clay", from: "#C06C84", to: "#6C5B7B" },
  { name: "Dusk", from: "#2C3E50", to: "#FD746C" },
  { name: "Mahogany", from: "#4e0000", to: "#900C3F" },
  { name: "Terracotta", from: "#c94b4b", to: "#4b134f" },
  { name: "Sienna", from: "#A73737", to: "#7A2828" },
  { name: "Umber", from: "#403B4A", to: "#E7E9BB" },
  { name: "Bronze", from: "#BA8B02", to: "#181818" },

  // Tech/Modern
  { name: "GitHub Dark", from: "#0d1117", to: "#161b22" },
  { name: "VS Code", from: "#1e1e1e", to: "#252526" },
  { name: "Discord", from: "#5865F2", to: "#EB459E" },
  { name: "Figma", from: "#F24E1E", to: "#A259FF" },
  { name: "Linear", from: "#5B63D3", to: "#C084FC" },
  { name: "Vercel", from: "#000000", to: "#333333" },
  { name: "Stripe", from: "#635bff", to: "#80e9ff" },
  { name: "Notion", from: "#f7f6f3", to: "#e8e5df" },
  { name: "Twitter Blue", from: "#1DA1F2", to: "#0D8ECF" },
  { name: "Spotify Green", from: "#1DB954", to: "#191414" },
];
