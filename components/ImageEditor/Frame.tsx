import type { FrameProps } from "./types";

export const Frame = ({
  type,
  borderRadius,
  backgroundColor,
  children,
}: FrameProps) => {
  if (type === "arc") {
    return (
      <div className="relative pointer-events-none">
        <div
          style={{
            borderRadius: borderRadius + 7,
            boxShadow:
              "rgba(0, 0, 0, 0.22) 0px 18px 88px -4px, rgba(0, 0, 0, 0.22) 0px 8px 28px -6px",
            backgroundColor: "rgba(255, 255, 255, 0.314)",
            zIndex: 2,
            border: "1px solid rgba(255, 255, 255, 0.376)",
            padding: "7px",
          }}
        >
          {children}
        </div>
      </div>
    );
  }

  if (type === "stack") {
    return (
      <div className="relative pointer-events-none">
        <div className="absolute inset-0">
          {Array.from({ length: 3 }).map((_, index) => {
            const reverseIndex = 3 - index - 1;
            const translateY = reverseIndex * -10;
            const scale = 1 - reverseIndex * 0.06;
            const opacity = Math.pow(0.7, reverseIndex);

            return (
              <div
                key={index}
                className="absolute w-full"
                style={{
                  height: borderRadius, // Make it as tall as the border radius
                  borderTopLeftRadius: borderRadius,
                  borderTopRightRadius: borderRadius,
                  backgroundColor,
                  transform: `translateY(${translateY}px) scaleX(${scale})`,
                  transformOrigin: "top center",
                  opacity,
                  clipPath: "inset(0 0 calc(100% - 10px) 0)", // Only show the top 10px
                }}
              />
            );
          })}
        </div>
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  if (type === "mac-light") {
    return (
      <div
        className="relative overflow-hidden shadow-xl border border-black/10"
        style={{ borderRadius }}
      >
        <div className="bg-[#f3f3f3] px-4 py-3 flex items-center gap-4 w-full border-b border-gray-200/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d89e24]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29]" />
          </div>
          <div className="flex-1 flex justify-center px-4">
            <div className="h-6 w-full max-w-[400px] bg-white border border-gray-200 rounded-md flex items-center justify-center text-[10px] text-gray-400 font-medium shadow-sm">
              snapgroove.com
            </div>
          </div>
        </div>
        <div className="relative z-10 bg-white">{children}</div>
      </div>
    );
  }

  if (type === "mac-dark") {
    return (
      <div
        className="relative overflow-hidden shadow-2xl ring-1 ring-white/10"
        style={{ borderRadius }}
      >
        <div className="bg-[#2d2d2d] px-4 py-3 flex items-center gap-4 w-full border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 flex justify-center px-4">
            <div className="h-6 w-full max-w-[400px] bg-[#1a1a1a] rounded-md flex items-center justify-center text-[10px] text-gray-500 font-medium border border-white/5 shadow-inner">
              snapgroove.com
            </div>
          </div>
        </div>
        <div className="relative z-10 bg-[#1e1e1e]">{children}</div>
      </div>
    );
  }

  if (type === "chrome") {
    return (
      <div
        className="relative overflow-hidden shadow-xl bg-white"
        style={{ borderRadius }}
      >
        <div className="bg-[#dee1e6] px-3 pt-2 pb-0 flex items-end gap-2 w-full border-b border-[#dee1e6]">
          <div className="flex items-center gap-2 mr-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-stone-400/50 hover:bg-stone-400 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-stone-400/50 hover:bg-stone-400 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-stone-400/50 hover:bg-stone-400 transition-colors" />
          </div>
          <div className="bg-white px-4 py-1.5 rounded-t-lg text-xs text-gray-600 flex-1 relative top-px shadow-[0_-1px_2px_rgba(0,0,0,0.05)] flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500/20" />
            <span className="opacity-75">New Tab</span>
          </div>
          <div className="w-8" />
        </div>
        <div className="bg-white border-t border-gray-100 relative z-10">
          {children}
        </div>
      </div>
    );
  }

  return children;
};
