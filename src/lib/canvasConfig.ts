// canvasConfig.ts

export type CanvasBlob = {
  x: number; // relative position 0..1
  y: number; // relative position 0..1
  r: number; // relative radius (fraction of min(width,height))
  vx: number; // velocity per frame in relative units
  vy: number; // velocity per frame in relative units
  hue: number; // base hue for fallback gradient

  // optional image source (public folder path). If omitted, AnimatedCanvas
  // will draw a gradient circle as fallback.
  src?: string;
};

export type CanvasConfig = {
  blobs: CanvasBlob[];
  background?: string;
};

export const defaultCanvasConfig: CanvasConfig = {
  background: "/assets/banner_login.jpg", // màu nền hoặc đường dẫn ảnh nền
  blobs: [
    // LƯU Ý: Đảm bảo các đường dẫn ảnh này nằm trong thư mục PUBLIC/assets
    // { x: 0.2, y: 0.3, r: 0.15, vx: 0.0008, vy: 0.0006, hue: 260, src: "/assets/camera.png" },
    // { x: 0.7, y: 0.4, r: 0.1, vx: -0.0006, vy: 0.0009, hue: 200, src: "/assets/lens.png" },
    // { x: 0.5, y: 0.75, r: 0.18, vx: 0.0005, vy: -0.0007, hue: 100, src: "/assets/frame.png" },
    // { x: 0.5, y: 0.70, r: 0.18, vx: 0.0004, vy: -0.0002, hue: 300, src: "/assets/frame.png" },
    // { x: 0.5, y: 0.5, r: 0.11, vx: 0.0002, vy: -0.0008, hue: 600, src: "/assets/frame.png" },
    // { x: 0.5, y: 0.6, r: 0.10, vx: 0.0009, vy: -0.0005, hue: 300, src: "/assets/frame.png" },
    // { x: 0.5, y: 0.25, r: 0.14, vx: 0.0010, vy: -0.0001, hue: 300, src: "/assets/frame.png" },
  ],
};

export default defaultCanvasConfig;