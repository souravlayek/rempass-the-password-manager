import RNSimpleCrypto from 'react-native-simple-crypto';
const toHex = RNSimpleCrypto.utils.convertArrayBufferToHex;
const toUtf8 = RNSimpleCrypto.utils.convertArrayBufferToUtf8;
const toArrayBuffer = RNSimpleCrypto.utils.convertUtf8ToArrayBuffer;

const hexToBuffer = RNSimpleCrypto.utils.convertHexToArrayBuffer;

// -- AES ------------------------------------------------------------- //
// const message = 'data to encrypt';
export const performEncription = async message => {
  const messageArrayBuffer = toArrayBuffer(message);
  const keyArrayBuffer = await RNSimpleCrypto.utils.randomBytes(32);

  const ivArrayBuffer = await RNSimpleCrypto.utils.randomBytes(16);

  const cipherTextArrayBuffer = await RNSimpleCrypto.AES.encrypt(
    messageArrayBuffer,
    keyArrayBuffer,
    ivArrayBuffer,
  );
  const encriptedmessage =
    toHex(keyArrayBuffer) + toHex(ivArrayBuffer) + toHex(cipherTextArrayBuffer);
  return encriptedmessage;
};

export const performDecription = async encriptedmessage => {
  const keyArrayBuffer = hexToBuffer(encriptedmessage.slice(0, 64));
  const ivArrayBuffer = hexToBuffer(encriptedmessage.slice(64, 96));
  const cipherTextArrayBuffer = hexToBuffer(
    encriptedmessage.slice(96, encriptedmessage.length),
  );
  const decryptedArrayBuffer = await RNSimpleCrypto.AES.decrypt(
    cipherTextArrayBuffer,
    keyArrayBuffer,
    ivArrayBuffer,
  );
  // if (toUtf8(decryptedArrayBuffer) !== message) {
  //   console.error('AES decrypt returned unexpected results');
  // }
  const message = toUtf8(decryptedArrayBuffer);
  return message;
};

export const generateId = async () => {
  const id = await RNSimpleCrypto.utils.randomBytes(16);
  return toHex(id);
};

export const generatePassword = () => {
  const length = 9,
    charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$';
  let retVal = '';
  for (let i = 0, n = charset.length; i < length - 1; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  retVal += '@';
  return retVal;
};

export const setCredentials = async data => {
  const id = await generateId();
  const details = await performEncription(JSON.stringify(data));
  return {
    id: id,
    value: details,
  };
};
