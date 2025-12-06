export const shadowMap: Record<number, string> = {
  0: 'none',
  1: 'rgba(0, 0, 0, 0.1) 0px 0px 10px',
  2: 'rgba(0, 0, 0, 0.15) 0px 10px 35px 0px',
  3: 'rgba(0, 0, 0, 0.2) 0px 20px 40px 0px',
  4: 'rgba(0, 0, 0, 0.25) 0px 25px 45px 0px',
}

export const previewSizes = {
  waves: '250%',
  dots: '250%',
  graphpaper: '225%',
}

export const rgbToHex = (rgb: string): string => {
  const result = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(rgb)
  if (!result) return '#e11d48'

  return (
    '#' +
    (
      (1 << 24) +
      (Number.parseInt(result[1]!) << 16) +
      (Number.parseInt(result[2]!) << 8) +
      Number.parseInt(result[3]!)
    )
      .toString(16)
      .slice(1)
  )
}

export const getMostCommonBorderColor = (
  imageSrc: string,
  callback: (color: string) => void,
) => {
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.onload = () => {
    const exec = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx) return

      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      const { width, height } = canvas
      const imageData = ctx.getImageData(0, 0, width, height).data
      const colorCount: Record<string, number> = {}

      const getColorKey = (r: number, g: number, b: number) => `${r},${g},${b}`

      // Sample top and bottom rows
      for (let x = 0; x < width; x++) {
        for (const y of [0, height - 1]) {
          const i = (y * width + x) * 4
          const key = getColorKey(imageData[i]!, imageData[i + 1]!, imageData[i + 2]!)
          colorCount[key] = (colorCount[key] || 0) + 1
        }
      }

      // Sample left and right columns (skip corners)
      for (let y = 1; y < height - 1; y++) {
        for (const x of [0, width - 1]) {
          const i = (y * width + x) * 4
          const key = getColorKey(imageData[i]!, imageData[i + 1]!, imageData[i + 2]!)
          colorCount[key] = (colorCount[key] || 0) + 1
        }
      }

      // Find most common color
      let mostUsed = ['0,0,0', 0]
      for (const [key, count] of Object.entries(colorCount)) {
        // @ts-ignore
        if (count > mostUsed[1]) {
          mostUsed = [key, count]
        }
      }

      callback(`rgb(${mostUsed[0]})`)
    }

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(exec)
    } else {
      setTimeout(exec, 0)
    }
  }

  img.src = imageSrc
}

export const dataURLtoFile = (dataurl: string, filename: string): File => {
  const arr = dataurl.split(',')
  const mime = arr[0]?.match(/:(.*?);/)?.[1] || 'image/png'
  const bstr = atob(arr[1] || '')
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}
