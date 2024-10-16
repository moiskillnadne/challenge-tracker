import { IExtractor } from '../types';

export interface OSMeta {
  platform: string;
  version: string;
}

export class OSExtractor implements IExtractor<OSMeta> {
  constructor(private userAgent: string) {}

  public extract(): OSMeta {
    return this.getOSFromUserAgent(this.userAgent);
  }

  private getOSFromUserAgent(userAgent: string): OSMeta {
    if (userAgent.includes('Mac OS X')) {
      return this.extractMacosMeta(userAgent);
    }

    if (userAgent.includes('Windows NT')) {
      return this.extractWindowsVersion(userAgent);
    }

    if (userAgent.includes('Linux')) {
      return {
        platform: 'Linux',
        version: 'N/A',
      };
    }

    if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
      return this.extractIphoneVersion(userAgent);
    }

    if (userAgent.includes('Android')) {
      return this.extractAndroidVersion(userAgent);
    }

    return {
      platform: 'Unknown OS',
      version: 'N/A',
    };
  }

  private extractMacosMeta(userAgent: string): OSMeta {
    const macVersion = userAgent.match(/Mac OS X (\d+[_\.]\d+[_\.]?\d*)/);

    return {
      platform: 'Mac OS X',
      version: macVersion ? macVersion[1].replace(/_/g, '.') : 'N/A',
    };
  }

  private extractWindowsVersion(userAgent: string): OSMeta {
    const windowsVersion = userAgent.match(/Windows NT (\d+\.\d+)/);

    return {
      platform: 'Windows',
      version: windowsVersion ? windowsVersion[1] : 'N/A',
    };
  }

  private extractIphoneVersion(userAgent: string): OSMeta {
    const iosVersion = userAgent.match(/OS (\d+[_\.]\d+[_\.]?\d*) like Mac OS X/);

    return {
      platform: 'iOS',
      version: iosVersion ? iosVersion[1].replace(/_/g, '.') : 'N/A',
    };
  }

  private extractAndroidVersion(userAgent: string): OSMeta {
    const androidVersion = userAgent.match(/Android (\d+[_\.]?\d*)/);

    return {
      platform: 'Android',
      version: androidVersion ? androidVersion[1] : 'N/A',
    };
  }
}
