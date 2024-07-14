export function getContrastColor(hex: string): string {
  // Convert hex to RGB
  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const bigint = parseInt(hex.slice(1), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  // Calculate the relative luminance
  const rgb = hexToRgb(hex);
  const lum = luminance(rgb);

  // Determine contrast color
  const contrastColor =
    lum > 0.179 ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 };

  // Slightly saturate the original color with the contrast color
  const saturationRatio = 0.9; // Adjust this ratio to control the level of saturation
  const saturatedColor = blendColors(rgb, contrastColor, saturationRatio);

  return rgbToHex(saturatedColor);
}

const luminance = ({
  r,
  g,
  b,
}: {
  r: number;
  g: number;
  b: number;
}): number => {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

// Blend two RGB colors
const blendColors = (
  rgb1: { r: number; g: number; b: number },
  rgb2: { r: number; g: number; b: number },
  ratio: number
): { r: number; g: number; b: number } => {
  return {
    r: Math.round(rgb1.r * (1 - ratio) + rgb2.r * ratio),
    g: Math.round(rgb1.g * (1 - ratio) + rgb2.g * ratio),
    b: Math.round(rgb1.b * (1 - ratio) + rgb2.b * ratio),
  };
};

// Convert RGB to hex
const rgbToHex = ({ r, g, b }: { r: number; g: number; b: number }): string => {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
};
