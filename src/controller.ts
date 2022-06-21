import { IPFS, Web3Util } from "./util"

import dotenv from "dotenv"

dotenv.config()

export async function nftMint(
  assetFile: string,
  assetType: IPFS.NFTAssetType,
  previewFile?: string,
  externalLink?: string,
  description?: string,
  attributes?: any
) {
  const uri = IPFS.getMeta(assetFile, assetType, previewFile, externalLink, externalLink, attributes)
  const contract = Web3Util.getContract() as any
  if (assetType === IPFS.NFTAssetType.Text) {
    await contract.safeMintWithText(process.env.Owner, assetFile)
  } else {
    await contract.safeMint(process.env.Owner, uri)
  }
  return true
}

export async function getNfts() {
  const contract = Web3Util.getContract() as any

  const events = await contract.getPastEvents('Transfer', {
    filter: {
        _from: '0x0000000000000000000000000000000000000000'
    },
    fromBlock: 0
  })
  const uris: string[] = []
  for (const event of events) {
    if (event.returnValues && event.returnValues._tokenId) {
      const uri = contract.tokenURI(event.returnValues._tokenId)
      uris.push(uri)
    }
  }
  return uris
}

export async function getNftById(id: string) {
  const contract = Web3Util.getContract() as any
  return contract.tokenURI(id)
}


