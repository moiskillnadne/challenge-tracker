import { useCallback } from 'react';
import { BrowserExtractor, FingerprintService, OSExtractor } from '../../../shared/lib';

export const useDeviceMeta = () => {
  const process = useCallback(async () => {
    const fingerprintService = new FingerprintService();
    const fingerprint = await fingerprintService.getFingerprint();

    const osExtractorService = new OSExtractor(fingerprint.userAgent);
    const os = osExtractorService.extract();

    const browserExtractorService = new BrowserExtractor(fingerprint.userAgent);
    const browser = browserExtractorService.extract();

    return {
      os,
      browser,
      fingerprint,
      screen: {
        resolution: `${fingerprint.width}x${fingerprint.height}`,
        pixelRatio: fingerprint.pixelRatio,
        width: fingerprint.width,
        height: fingerprint.height,
        maxTouchPoints: fingerprint.maxTouchPoints,
        isTouchScreen: Number(fingerprint.maxTouchPoints) > 0,
        colorDepth: fingerprint.colorDepth,
        pixelDepth: fingerprint.pixelDepth,
      },
    };
  }, []);

  return {
    process,
  };
};
