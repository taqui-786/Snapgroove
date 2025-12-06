import type { FrameProps } from './types'

export const Frame = ({ type, borderRadius, backgroundColor, children }: FrameProps) => {
  if (type === 'arc') {
    return (
      <div className="relative pointer-events-none">
        <div
          style={{
            borderRadius: borderRadius + 7,
            boxShadow:
              'rgba(0, 0, 0, 0.22) 0px 18px 88px -4px, rgba(0, 0, 0, 0.22) 0px 8px 28px -6px',
            backgroundColor: 'rgba(255, 255, 255, 0.314)',
            zIndex: 2,
            border: '1px solid rgba(255, 255, 255, 0.376)',
            padding: '7px',
          }}
        >
          {children}
        </div>
      </div>
    )
  }

  if (type === 'stack') {
    return (
      <div className="relative pointer-events-none">
        <div className="absolute inset-0">
          {Array.from({ length: 3 }).map((_, index) => {
            const reverseIndex = 3 - index - 1
            const translateY = reverseIndex * -10
            const scale = 1 - reverseIndex * 0.06
            const opacity = Math.pow(0.7, reverseIndex)

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
                  transformOrigin: 'top center',
                  opacity,
                  clipPath: 'inset(0 0 calc(100% - 10px) 0)', // Only show the top 10px
                }}
              />
            )
          })}
        </div>
        <div className="relative z-10">{children}</div>
      </div>
    )
  }

  return children
}
