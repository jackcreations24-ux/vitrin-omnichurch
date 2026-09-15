export interface DeviceDetectionResult {
  isWindows: boolean;
  isMac: boolean;
  isAndroid: boolean;
  isIOS: boolean;
  isLinux: boolean;
  is64Bit: boolean;
  bitness: '64' | '32';
  osName: string;
  cpuArch: string;
  recommendedWindowsDownload: '64' | '32';
  summaryBadge: string;
}

export function detectDevice(): DeviceDetectionResult {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return {
      isWindows: true,
      isMac: false,
      isAndroid: false,
      isIOS: false,
      isLinux: false,
      is64Bit: true,
      bitness: '64',
      osName: 'Windows',
      cpuArch: 'x64',
      recommendedWindowsDownload: '64',
      summaryBadge: 'Windows 64-bit',
    };
  }

  const ua = navigator.userAgent || '';
  const platform = (navigator as any).platform || '';

  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua) || (platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isMac = !isIOS && (/Macintosh|Mac OS X/i.test(ua) || /MacIntel/i.test(platform));
  const isWindows = /Windows|Win32|Win64|WOW64/i.test(ua) || /Win/i.test(platform);
  const isLinux = !isAndroid && /Linux/i.test(ua);

  // 64-bit vs 32-bit detection
  // Win64, WOW64, x86_64, x64, AMD64, arm64, aarch64 indicate a 64-bit OS
  const has64BitSignature =
    /WOW64|Win64|x86_64|x86-64|x64;|AMD64|arm64|aarch64|x64/i.test(ua) ||
    /x86_64|Win64|x64/i.test(platform);

  // If user explicitly has 32-bit without 64-bit tokens (rare on modern systems, but important for older PCs)
  const isExplicitly32Bit =
    !has64BitSignature &&
    (/i686|i386|x86|Win32/i.test(ua) || /Win32|i686|i386/i.test(platform));

  const is64Bit = !isExplicitly32Bit;
  const bitness: '64' | '32' = is64Bit ? '64' : '32';
  const cpuArch = is64Bit ? 'x64' : 'x86';

  let osName = 'Aparèy Ou';
  if (isWindows) {
    if (/Windows NT 10.0/i.test(ua)) osName = 'Windows 10/11';
    else if (/Windows NT 6.3/i.test(ua)) osName = 'Windows 8.1';
    else if (/Windows NT 6.1/i.test(ua)) osName = 'Windows 7';
    else osName = 'Windows';
  } else if (isMac) {
    osName = 'macOS (Apple Mac)';
  } else if (isAndroid) {
    osName = 'Android';
  } else if (isIOS) {
    osName = 'Apple iOS (iPhone/iPad)';
  } else if (isLinux) {
    osName = 'Linux';
  }

  let summaryBadge = '';
  if (isWindows) {
    summaryBadge = `Detekte: ${osName} (${bitness}-bit ${cpuArch}) • Rekòmande pou PC sa a`;
  } else if (isAndroid) {
    summaryBadge = `Detekte: Android • Telechajman APK rekòmande`;
  } else if (isIOS) {
    summaryBadge = `Detekte: Apple iOS • Ap vini talè`;
  } else if (isMac) {
    summaryBadge = `Detekte: macOS • Ap vini talè`;
  } else {
    summaryBadge = `Detekte: Sistèm ${bitness}-bit`;
  }

  return {
    isWindows,
    isMac,
    isAndroid,
    isIOS,
    isLinux,
    is64Bit,
    bitness,
    osName,
    cpuArch,
    recommendedWindowsDownload: bitness,
    summaryBadge,
  };
}

/**
 * Detects the user's OS architecture (64-bit vs 32-bit) via navigator.platform or navigator.userAgent.
 */
export function detectArchitecture(): '64' | '32' {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return '64';
  }
  const ua = navigator.userAgent || '';
  const platform = (navigator as any).platform || '';

  const has64Bit =
    /WOW64|Win64|x86_64|x86-64|x64;|AMD64|arm64|aarch64|x64/i.test(ua) ||
    /x86_64|Win64|x64/i.test(platform);

  const has32Bit =
    !has64Bit &&
    (/i686|i386|x86|Win32/i.test(ua) || /Win32|i686|i386/i.test(platform));

  return has32Bit ? '32' : '64';
}

