interface Fingerprint {
  userAgent: string;
  maxTouchPoints: string;
  pixelRatio: string;
  screen: string;
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
      screen: this.getScreen(),
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

  private getScreen(): string {
    return `${window.screen.width}x${window.screen.height}`;
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
