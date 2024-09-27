import crypto from 'crypto';
import baseX from 'base-x';

const base62 = baseX('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');

function generateRandomKeyData(length = 15) {
  let keyData = '';
  for (let i = 0; i < length; i++) {
    keyData += base62.encode(crypto.randomBytes(1)).charAt(0);
  }
  return keyData;
}

function calculateChecksum(keyData) {
  let weightedSum = 0;
  for (let i = 0; i < keyData.length; i++) {
    weightedSum += (i + 1) * keyData.charCodeAt(i);
  }
  return base62.encode(Buffer.from([weightedSum % 62]))[0];
}

function generateSubscriptionKey(encryptionKey) {
  const keyData = generateRandomKeyData();
  const checksum = calculateChecksum(keyData);
  const unencryptedKey = keyData + checksum;
  const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, Buffer.alloc(16, 0));
  const encryptedKey = Buffer.concat([cipher.update(unencryptedKey, 'utf8'), cipher.final()]);
  return base62.encode(encryptedKey);
}

function validateSubscriptionKey(encryptedSubscriptionKey, encryptionKey) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, Buffer.alloc(16, 0));
  const decryptedKeyBuffer = Buffer.concat([
    decipher.update(base62.decode(encryptedSubscriptionKey)),
    decipher.final(),
  ]);
  const decryptedKey = decryptedKeyBuffer.toString('utf8');
  const keyData = decryptedKey.slice(0, -1);
  const providedChecksum = decryptedKey.slice(-1);
  const expectedChecksum = calculateChecksum(keyData);
  return providedChecksum === expectedChecksum;
}

function generateEncryptionKey(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
}

// Example usage
const password = 'some_password';
const salt = crypto.randomBytes(16);
const encryptionKey = generateEncryptionKey(password, salt);

const subscriptionKey = generateSubscriptionKey(encryptionKey);
console.log('Generated encrypted key:', subscriptionKey);
console.log('Is key valid?', validateSubscriptionKey(subscriptionKey, encryptionKey));

const keyData = generateRandomKeyData();
const checksum = calculateChecksum(keyData);
console.log('Generated checksum:', checksum);
console.log('Generate keydata:', keyData);





