export class BrowserExtractor {
  constructor(private userAgent: string) {}

  public extract(): string {
    return this.getBrowserFromUserAgent(this.userAgent);
  }

  private getBrowserFromUserAgent(userAgent: string): string {
    if (userAgent.includes('Chrome') && !userAgent.includes('Chromium')) {
      return this.extractChromeVersion(userAgent);
    }

    if (userAgent.includes('Firefox')) {
      return this.extractFirefoxVersion(userAgent);
    }

    if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
      return this.extractSafariVersion(userAgent);
    }

    if (userAgent.includes('Edg')) {
      return this.extractEdgeVersion(userAgent);
    }

    if (userAgent.includes('OPR') || userAgent.includes('Opera')) {
      return this.extractOperaVersion(userAgent);
    }

    return 'Unknown Browser';
  }

  private extractChromeVersion(userAgent: string): string {
    const chromeVersion = userAgent.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/);
    return chromeVersion ? `Chrome ${chromeVersion[1]}` : 'Chrome';
  }

  private extractFirefoxVersion(userAgent: string): string {
    const firefoxVersion = userAgent.match(/Firefox\/(\d+\.\d+)/);
    return firefoxVersion ? `Firefox ${firefoxVersion[1]}` : 'Firefox';
  }

  private extractSafariVersion(userAgent: string): string {
    const safariVersion = userAgent.match(/Version\/(\d+\.\d+)/);
    return safariVersion ? `Safari ${safariVersion[1]}` : 'Safari';
  }

  private extractEdgeVersion(userAgent: string): string {
    const edgeVersion = userAgent.match(/Edg\/(\d+\.\d+)/);
    return edgeVersion ? `Edge ${edgeVersion[1]}` : 'Edge';
  }

  private extractOperaVersion(userAgent: string): string {
    const operaVersion = userAgent.match(/OPR\/(\d+\.\d+)/);
    return operaVersion ? `Opera ${operaVersion[1]}` : 'Opera';
  }
}
