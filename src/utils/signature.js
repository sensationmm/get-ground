
export const splitSignatureData = signatureUrl => {
  const contentType = signatureUrl.split(';')[0].split(':')[1];
  const signatureData = signatureUrl.split(';')[1].split(',')[1];

  return signatureUtils.convertFileToBlob(signatureData, contentType);
};

/**
 * convertFileToBlob
  * @param {string} signatureData - encoded signature string
  * @param {string} contentType - content type
  * @return {void}
  */
export const convertFileToBlob = (signatureData, contentType) => {
  const sliceSize = 512;
  const byteCharacters = atob(signatureData);
  const byteArrays = [];

  contentType = contentType || '';

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, {type: contentType});
}

const signatureUtils = {
  splitSignatureData,
  convertFileToBlob,
};

export default signatureUtils;
