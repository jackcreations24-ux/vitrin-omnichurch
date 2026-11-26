/**
 * Google Authenticator TOTP (Time-based One-Time Password) 2FA Implementation
 * Compatible with Google Authenticator, Authy, Microsoft Authenticator, etc.
 */

const SECRET_STORAGE_KEY = 'oc_dev_2fa_secret';
const ENABLED_STORAGE_KEY = 'oc_dev_2fa_enabled';
const BACKUP_CODE_KEY = 'oc_dev_2fa_backup_code';

export function getDev2FAEnabled(): boolean {
  try {
    return localStorage.getItem(ENABLED_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setDev2FAEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(ENABLED_STORAGE_KEY, enabled ? 'true' : 'false');
  } catch {}
}

export function getDev2FASecret(): string {
  try {
    let secret = localStorage.getItem(SECRET_STORAGE_KEY);
    if (!secret || /[0189]/.test(secret) || secret.length < 16) {
      secret = 'OMNICHRUCHDEVSECRETKEYABCDEFGHIJ';
      localStorage.setItem(SECRET_STORAGE_KEY, secret);
    }
    return secret;
  } catch {
    return 'OMNICHRUCHDEVSECRETKEYABCDEFGHIJ';
  }
}

export function getDevBackupCode(): string {
  try {
    let code = localStorage.getItem(BACKUP_CODE_KEY);
    if (!code) {
      code = 'OMNI-9999-2026';
      localStorage.setItem(BACKUP_CODE_KEY, code);
    }
    return code;
  } catch {
    return 'OMNI-9999-2026';
  }
}

export function getOtpAuthUrl(email = 'jackson318638@gmail.com'): string {
  const secret = getDev2FASecret();
  const issuer = 'OmniChurch';
  const label = encodeURIComponent(`${issuer}:${email}`);
  return `otpauth://totp/${label}?secret=${secret}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=6&period=30`;
}

export function getQrCodeImageUrl(email = 'jackson318638@gmail.com'): string {
  const otpUrl = getOtpAuthUrl(email);
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(otpUrl)}`;
}

// Simple Base32 Decoder for TOTP validation in browser
function base32ToBytes(base32: string): Uint8Array {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let cleaned = base32.replace(/=+$/, '').toUpperCase();
  let bits = 0;
  let value = 0;
  let output = [];

  for (let i = 0; i < cleaned.length; i++) {
    let idx = alphabet.indexOf(cleaned[i]);
    if (idx === -1) continue;
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      output.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }
  return new Uint8Array(output);
}

// HMAC-SHA1 using Web Crypto API
async function hmacSha1(keyBytes: Uint8Array, messageBytes: Uint8Array): Promise<ArrayBuffer> {
  const cryptoKey = await window.crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'HMAC', hash: { name: 'SHA-1' } },
    false,
    ['sign']
  );
  return await window.crypto.subtle.sign('HMAC', cryptoKey, messageBytes);
}

// Generate TOTP code for a given timestamp
async function generateTotpCode(secretBase32: string, timeEpochSeconds: number): Promise<string> {
  const keyBytes = base32ToBytes(secretBase32);
  const counter = Math.floor(timeEpochSeconds / 30);
  
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setUint32(4, counter, false); // Big endian

  const hmacResult = await hmacSha1(keyBytes, new Uint8Array(buffer));
  const hmacBytes = new Uint8Array(hmacResult);

  const offset = hmacBytes[hmacBytes.length - 1] & 0xf;
  const binary =
    ((hmacBytes[offset] & 0x7f) << 24) |
    ((hmacBytes[offset + 1] & 0xff) << 16) |
    ((hmacBytes[offset + 2] & 0xff) << 8) |
    (hmacBytes[offset + 3] & 0xff);

  const otp = binary % 1000000;
  return otp.toString().padStart(6, '0');
}

// Verify TOTP code with time window tolerance (±1 step = 30s)
export async function verifyTotpCode(token: string): Promise<boolean> {
  const cleanedToken = token.trim();
  if (cleanedToken === getDevBackupCode()) {
    return true; // Backup code valid
  }

  if (!/^\d{6}$/.test(cleanedToken)) {
    return false;
  }

  const secret = getDev2FASecret();
  const nowSecs = Math.floor(Date.now() / 1000);

  // Check current time and ±1 step (30s past and future)
  for (const timeOffset of [0, -30, 30]) {
    const expected = await generateTotpCode(secret, nowSecs + timeOffset);
    if (expected === cleanedToken) {
      return true;
    }
  }

  return false;
}
