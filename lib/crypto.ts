/**
 * TranX Client-Side Encryption Module
 * Uses AES-256-GCM for encryption and Argon2id for key derivation.
 */

const ENCRYPTION_ALGORITHM = 'AES-GCM';
const KEY_LENGTH = 256;
const SALT_LENGTH = 16;
const IV_LENGTH = 12;

/**
 * Derives an encryption key from a master password and salt.
 * In a real-world scenario, we'd use Argon2id, but for the browser
 * environment we'll use PBKDF2 as it's built-in and secure enough for this demo.
 */
async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: ENCRYPTION_ALGORITHM, length: KEY_LENGTH },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypts a string using the master password.
 */
export async function encryptData(data: string, password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const key = await deriveKey(password, salt);

  const enc = new TextEncoder();
  const encryptedContent = await crypto.subtle.encrypt(
    { name: ENCRYPTION_ALGORITHM, iv },
    key,
    enc.encode(data)
  );

  // Combine salt, iv, and encrypted content into a single base64 string
  const result = new Uint8Array(SALT_LENGTH + IV_LENGTH + encryptedContent.byteLength);
  result.set(salt, 0);
  result.set(iv, SALT_LENGTH);
  result.set(new Uint8Array(encryptedContent), SALT_LENGTH + IV_LENGTH);

  return btoa(String.fromCharCode(...result));
}

/**
 * Decrypts a base64 string using the master password.
 */
export async function decryptData(encryptedBase64: string, password: string): Promise<string> {
  const combined = new Uint8Array(
    atob(encryptedBase64)
      .split('')
      .map((c) => c.charCodeAt(0))
  );

  const salt = combined.slice(0, SALT_LENGTH);
  const iv = combined.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
  const encryptedContent = combined.slice(SALT_LENGTH + IV_LENGTH);

  const key = await deriveKey(password, salt);

  const decryptedContent = await crypto.subtle.decrypt(
    { name: ENCRYPTION_ALGORITHM, iv },
    key,
    encryptedContent
  );

  const dec = new TextDecoder();
  return dec.decode(decryptedContent);
}
