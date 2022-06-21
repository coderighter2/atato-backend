import { create as ipfsHttpClient } from 'ipfs-http-client'
import dotenv from "dotenv"
import * as fs from 'fs'

dotenv.config()

export enum NFTAssetType {
  Image = 'image',
  Video = 'video',
  Audio = 'audio',
  Text = 'text'
}

export async function getMeta(assetFile: string, assetType: NFTAssetType, previewFile?: string, externalLink?: string, description?: string, attributes?: any) {
  const ipfsClinet = ipfsHttpClient({url:process.env.IPFS_API_SERVER})
  const added = await ipfsClinet.add(
      {
          path: assetFile,
          content: fs.createReadStream(assetFile)
      }
  )
  const assetUrl = `${process.env.IPFS_API_SERVER}${added.cid.toString()}`
  let imageUrl: string
  let animationUrl: string | null = null
  if (assetType === NFTAssetType.Image) {
      imageUrl = assetUrl
  } else {
      if (!previewFile) {
        return
      }
      const previewAdded = await ipfsClinet.add(
          {
              path: previewFile,
              content: fs.createReadStream(previewFile)
          }
      )
      imageUrl = `${process.env.IPFS_API_SERVER}${previewAdded.cid.toString()}`
      animationUrl = assetUrl
  }
  const metadata: any = {}
  metadata.name = name
  metadata.image = imageUrl
  metadata.properties = {
      type: assetType,
      creator: process.env.ow
  }
  if (attributes && attributes.length > 0) metadata.attributes = attributes
  if (description && description.length > 0) metadata.description = description
  if (externalLink && externalLink.length > 0) metadata.external_url = externalLink
  if (animationUrl && animationUrl.length > 0) metadata.animation_url = animationUrl

  const data = JSON.stringify(metadata)
  const dataAdded = await ipfsClinet.add(data)
  const metaUrl = `${process.env.IPFS_API_SERVER}${dataAdded.path}`
  return metaUrl
}