export default function hexToRGBA(hex: string, opacity: number): string {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b) || opacity < 0 || opacity > 1) {
    throw new Error("Invalid color or opacity value");
  }

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
