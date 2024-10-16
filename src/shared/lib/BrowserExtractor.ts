import { IExtractor } from '../types';

export interface BrowserMeta {
  browser: string;
  version: string;
}

export class BrowserExtractor implements IExtractor<BrowserMeta> {
  constructor(private userAgent: string) {}

  public extract(): BrowserMeta {
    return this.getBrowserFromUserAgent(this.userAgent);
  }

  private getBrowserFromUserAgent(userAgent: string): BrowserMeta {
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

    return {
      browser: 'Unknown Browser',
      version: 'N/A',
    };
  }

  private extractChromeVersion(userAgent: string): BrowserMeta {
    const chromeVersion = userAgent.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/);

    return {
      browser: 'Chrome',
      version: chromeVersion ? chromeVersion[1] : 'N/A',
    };
  }

  private extractFirefoxVersion(userAgent: string): BrowserMeta {
    const firefoxVersion = userAgent.match(/Firefox\/(\d+\.\d+)/);

    return {
      browser: 'Firefox',
      version: firefoxVersion ? firefoxVersion[1] : 'N/A',
    };
  }

  private extractSafariVersion(userAgent: string): BrowserMeta {
    const safariVersion = userAgent.match(/Version\/(\d+\.\d+)/);

    return {
      browser: 'Safari',
      version: safariVersion ? safariVersion[1] : 'N/A',
    };
  }

  private extractEdgeVersion(userAgent: string): BrowserMeta {
    const edgeVersion = userAgent.match(/Edg\/(\d+\.\d+)/);

    return {
      browser: 'Edge',
      version: edgeVersion ? edgeVersion[1] : 'N/A',
    };
  }

  private extractOperaVersion(userAgent: string): BrowserMeta {
    const operaVersion = userAgent.match(/OPR\/(\d+\.\d+)/);

    return {
      browser: 'Opera',
      version: operaVersion ? operaVersion[1] : 'N/A',
    };
  }
}
