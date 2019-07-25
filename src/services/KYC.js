import { dataURLToBlob } from 'blob-util'
import BaseService from './BaseService';
import store from 'src/state/store';

/**
 * KYCService
 * @param {Image} passport - Image of passport
 * @param {Image} address - Image of address
 * @param {Blob} selfie - Blob of selfie
 * @return {Object} KYCService
 */
class KYCService extends BaseService {
  makeCheck = (passport, address, selfie) => {
    const blobPassport = passport !== '' ? dataURLToBlob(passport) : null
    const blobAddress = address !== '' ? dataURLToBlob(address) : null;
    const blobSelfie = selfie !== '' ? dataURLToBlob(selfie) : null;

    const fd = new FormData();
    const passportFile = blobPassport !== null ? new File( [blobPassport], 'passport.jpg', { type: 'image/jpeg' } ) : null;
    const addressFile = blobAddress !== null ? new File( [blobAddress], 'passport.jpg', { type: 'image/jpeg' } ) : null;
    const selfieFile = blobSelfie !== null ? new File( [blobSelfie], 'passport.jpg', { type: 'image/jpeg' } ) : null;

    fd.append('file_passport', passportFile)
    fd.append('file_selfie', selfieFile)
    fd.append('file_proof_of_address', addressFile)

    const encodedSelfie = btoa(selfie)
    const encodedAddress = btoa(address)
    const encodedPassport = btoa(passport)

   const base64ToByteArray = (base64String)  => {
      try {
          const sliceSize = 1024;
          const byteCharacters = atob(base64String);
          const bytesLength = byteCharacters.length;
          const slicesCount = Math.ceil(bytesLength / sliceSize);
          const byteArrays = new Array(slicesCount);

          for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
              const begin = sliceIndex * sliceSize;
              const end = Math.min(begin + sliceSize, bytesLength);

              const bytes = new Array(end - begin);
              for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
                  bytes[i] = byteCharacters[offset].charCodeAt(0);
              }
              byteArrays[sliceIndex] = new Uint8Array(bytes);
          }
          return byteArrays;
      } catch (e) {
          console.log("Couldn't convert to byte array: " + e);
          return undefined;
      }
  }
  // let bits = Buffer.from(b64Encoded, 'base64').toString();
    const newID = JSON.stringify({
      'file_selfie': Buffer.from(encodedSelfie, 'base64').toString(),
      'file_passport': Buffer.from(encodedPassport, 'base64').toString(),
      'file_proof_of_address': Buffer.from(encodedAddress, 'base64').toString()
    })

    const config = {
      url: `v2/users/${store.getState().user.id}/kyc/files`,
      method: 'post',
      data: newID,
    };

    return this.doRequest(config);
  }
}

export default KYCService;
