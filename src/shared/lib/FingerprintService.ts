interface Fingerprint {
  userAgent: string;
  maxTouchPoints: string;
  pixelRatio: string;
  width: string;
  height: string;
  colorDepth: string;
  pixelDepth: string;
  canvasFingerprint: string;
  webGLFingerprint: string;
}

export class FingerprintService {
  constructor() {}

  public async getFingerprint(): Promise<Fingerprint> {
    return {
      userAgent: this.getUserAgent(),
      maxTouchPoints: this.getMaxTouchPoints(),
      pixelRatio: this.getPixelRatio(),
      width: this.getScreenWidth(),
      height: this.getScreenHeight(),
      colorDepth: this.getColorDepth(),
      pixelDepth: this.getPixelDepth(),
      canvasFingerprint: await this.getCanvasFingerprint(),
      webGLFingerprint: await this.getWebGLFingerprint(),
    };
  }

  private getUserAgent(): string {
    return navigator.userAgent;
  }

  private getMaxTouchPoints(): string {
    return navigator.maxTouchPoints.toString();
  }

  private getPixelRatio(): string {
    return window.devicePixelRatio.toString();
  }

  private getScreenHeight(): string {
    return window.screen.height.toString();
  }

  private getScreenWidth(): string {
    return window.screen.width.toString();
  }

  private getColorDepth(): string {
    return window.screen.colorDepth.toString();
  }

  private getPixelDepth(): string {
    return window.screen.pixelDepth.toString();
  }

  private async getCanvasFingerprint(): Promise<string> {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillStyle = '#f60';
      ctx.fillRect(125, 1, 62, 20);
      ctx.fillStyle = '#069';
      ctx.fillText('fingerprint', 2, 15);
    }
    return canvas.toDataURL();
  }

  private async getWebGLFingerprint(): Promise<string> {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl');
    if (!gl) return '';

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = gl.getParameter(debugInfo?.UNMASKED_RENDERER_WEBGL || 0);
    const vendor = gl.getParameter(debugInfo?.UNMASKED_VENDOR_WEBGL || 0);

    return `${renderer}-${vendor}`;
  }
}
