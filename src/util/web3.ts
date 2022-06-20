import Web3 from "web3";
import * as abi from "../abi.json";
import { AbiItem } from 'web3-utils'
import { HttpProviderOptions } from 'web3-core-helpers'

import dotenv from "dotenv"

dotenv.config()

export const httpProvider = new Web3.providers.HttpProvider(process.env.RINKEBY_RPC_URL, { timeout: 10000 } as HttpProviderOptions)
export const web3 = new Web3(httpProvider)
export const nftContract = new web3.eth.Contract(
  (abi as unknown) as AbiItem,
  web3.utils.toChecksumAddress(process.env.NFT_CONTRACT_ADDRESS)
);

