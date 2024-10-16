import { IExtractor } from '../types';

export class OSExtractor implements IExtractor<string> {
  constructor(private userAgent: string) {}

  public extract(): string {
    return this.getOSFromUserAgent(this.userAgent);
  }

  private getOSFromUserAgent(userAgent: string): string {
    if (userAgent.includes('Mac OS X')) {
      return this.extractMacosVersion(userAgent);
    }

    if (userAgent.includes('Windows NT')) {
      return this.extractWindowsVersion(userAgent);
    }

    if (userAgent.includes('Linux')) {
      return 'Linux';
    }

    if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
      return this.extractIphoneVersion(userAgent);
    }

    if (userAgent.includes('Android')) {
      return this.extractAndroidVersion(userAgent);
    }

    return 'Unknown OS';
  }

  private extractMacosVersion(userAgent: string): string {
    const macVersion = userAgent.match(/Mac OS X (\d+[_\.]\d+[_\.]?\d*)/);
    return macVersion ? `Mac OS X ${macVersion[1].replace(/_/g, '.')}` : 'Mac OS X';
  }

  private extractWindowsVersion(userAgent: string): string {
    const windowsVersion = userAgent.match(/Windows NT (\d+\.\d+)/);
    if (windowsVersion) {
      switch (windowsVersion[1]) {
        case '10.0':
          return 'Windows 10';
        case '6.3':
          return 'Windows 8.1';
        case '6.2':
          return 'Windows 8';
        case '6.1':
          return 'Windows 7';
        case '6.0':
          return 'Windows Vista';
        case '5.1':
          return 'Windows XP';
        default:
          return `Windows NT ${windowsVersion[1]}`;
      }
    }

    return 'Windows';
  }

  private extractIphoneVersion(userAgent: string): string {
    const iosVersion = userAgent.match(/OS (\d+[_\.]\d+[_\.]?\d*) like Mac OS X/);
    return iosVersion ? `iOS ${iosVersion[1].replace(/_/g, '.')}` : 'iOS';
  }

  private extractAndroidVersion(userAgent: string): string {
    const androidVersion = userAgent.match(/Android (\d+[_\.]?\d*)/);
    return androidVersion ? `Android ${androidVersion[1]}` : 'Android';
  }
}
