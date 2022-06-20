import Web3 from "web3";
import * as abiJSON from './abi.json';

const web3 = new Web3(
  new Web3.providers.HttpProvider("https://rinkeby.infura.io/")
)
const nftContract = new web3.eth.Contract(
  abiJSON,
  web3.utils.toChecksumAddress('0x7cE722b16E9F79ac5eFBd0CBf2cc54eDdB783E12')
);

export async function nftMint() {
  return true
}

export async function getNfts() {
  return true
}

export async function getNftById(id: string) {

  return true
}


