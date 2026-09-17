// Minimal typing for the vanta.net UMD bundle. The npm package ships no types.
declare module "vanta/dist/vanta.net.min" {
  export interface VantaNetEffect {
    destroy: () => void;
  }
  export interface VantaNetOptions {
    el: HTMLElement;
    THREE?: unknown;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number;
    backgroundColor?: number;
    points?: number;
    maxDistance?: number;
    spacing?: number;
    showDots?: boolean;
  }
  const NET: (options: VantaNetOptions) => VantaNetEffect;
  export default NET;
}