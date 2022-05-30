import { BigNumber, Contract, ethers } from 'ethers';
import ABI from '../common/contract-abi.json';
import CollectionABI from '../common/collection-abi.json';
import { COLLECTION_ADDRESS, MANAGER_PROXY_ADDRESS } from './constant';
import getUnixTime from 'date-fns/getUnixTime';

export const connectMetamask = async () => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  await provider.send('eth_requestAccounts', []);
  const signer = provider.getSigner();
  return new ethers.Contract(MANAGER_PROXY_ADDRESS, ABI, signer);
};

export const bscTestnetProvider = new ethers.providers.JsonRpcProvider(
  'https://data-seed-prebsc-1-s1.binance.org:8545/'
);
export const collectionContract = new ethers.Contract(
  COLLECTION_ADDRESS,
  CollectionABI,
  bscTestnetProvider
);

export const createNFT = async (
  contract: Contract,
  studentId: string,
  dipId: number,
  tokenCid: string
): Promise<BigNumber> => {
  const tx = await contract.createNFT(COLLECTION_ADDRESS, studentId, dipId, tokenCid);
  const wait = await tx.wait();
  const { events } = wait;
  const event = events.find((e: any) => e.event === 'CreateNFTEvent');
  return event.args.tokenId;
};

export const removeNFT = async (
  contract: Contract,
  tokenId: BigNumber,
  studentId: string,
  dipId: number,
  tokenCid: string
): Promise<void> => {
  const tx = await contract.removeNFT(tokenId, COLLECTION_ADDRESS, studentId, dipId, tokenCid);
  await tx.wait();
}

export const findOneByCid = async (contract: Contract, cid: string): Promise<BigNumber> => {
  return await contract.searchWithCID(cid);
};

export const findManyByIdNum = async (
  contract: Contract,
  idNumber: string
): Promise<BigNumber[]> => {
  return await contract.searchIdentification(idNumber);
};

export const getUriById = async (tokenId: string) => collectionContract.tokenURI(tokenId);
