import axios from 'axios';

const IPFS_GATEWAY = 'https://defiforyou.mypinata.cloud/ipfs/';
const IPFS_PIN_HOST = 'https://api.pinata.cloud/pinning/';
const API_KEY = 'ac8828bff3bcd1c1b828';
const API_SECRET = 'cd1b0dc4478a40abd0b80e127e1184697f6d2f23ed3452326fe92ff3e92324df';

export const getIpfsUrl = (hash: string) => {
  return `${IPFS_GATEWAY}${hash}`;
};

export const pinObject = async (object: any) => {
  const url = `${IPFS_PIN_HOST}pinJSONToIPFS`;

  return axios.post(url, JSON.parse(object), {
    headers: {
      pinata_api_key: API_KEY,
      pinata_secret_api_key: API_SECRET
    }
  });
};

export const pinFileToIpfs = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const url = `${IPFS_PIN_HOST}pinFileToIPFS`;

  return axios.post(url, formData, {
    headers: {
      pinata_api_key: API_KEY,
      pinata_secret_api_key: API_SECRET,
      'Content-Type': `multipart/form-data; boundary=${(formData as any)._boundary}`
    }
  });
};
