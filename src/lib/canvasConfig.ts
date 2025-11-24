export type CanvasBlob = {
  x: number; // relative 0..1
  y: number; // relative 0..1
  r: number; // relative (radius as fraction of min(width,height))
  vx: number; // velocity multiplier x
  vy: number; // velocity multiplier y
  hue: number; // base hue
};

export type CanvasConfig = {
  blobs: CanvasBlob[];
  background?: string;
};

export const defaultCanvasConfig: CanvasConfig = {
  background: "rgba(10,11,13,0.45)",
  blobs: [
    { x: 0.2, y: 0.3, r: 0.3, vx: 0.0008, vy: 0.0006, hue: 260 },
    { x: 0.7, y: 0.4, r: 0.25, vx: -0.0006, vy: 0.0009, hue: 200 },
    { x: 0.5, y: 0.75, r: 0.35, vx: 0.0004, vy: -0.0005, hue: 300 },
  ],
};

export default defaultCanvasConfig;
