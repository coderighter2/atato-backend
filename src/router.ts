import { Router } from 'express'
import * as Controller from './controller'
import { IPFS } from "./util"

import { IncomingForm } from 'formidable'
import * as fs from 'fs'
import * as path from 'path'

export class Routes {

  router: Router

  constructor() {
    this.router = Router()
    this.router.post('/nftmint', async (req, res) => {
      const data = req.body.data as {
        assetFile: string,
        assetType: IPFS.NFTAssetType,
        previewFile?: string,
        externalLink?: string,
        description?: string,
        attributes?: any
      }
      const success = await Controller.nftMint(
        data.assetFile,
        data.assetType,
        data.previewFile,
        data.externalLink,
        data.description,
        data.attributes
      )
      res.status(200).send({ success })
    })

    this.router.get('/nftmint', async (req, res) => {
      const nfts = await Controller.getNfts()
      res.status(200).send({ nfts })
    })
    this.router.get('/nftmint/:id', async (req, res) => {
      const nft = await Controller.getNftById(req.params.id)
      res.status(200).send({ nft })
    })

    this.router.post('/upload', async(req, res) => {
      const form = new IncomingForm({ multiples: true, uploadDir: '/tmp' })
      form.on('file', async (field, file: any) => {
        const uploadPath = Date.now() + '-' + 'atato'
        fs.rename(file.path, path.join( '/tmp', file.name), () => {
          res.status(200).send(uploadPath)
        });
      })
      form.on('error', err => {
        res.status(500).send({ err })
      })
      form.on('end', () => {
        res.end('success')
      })
      form.parse(req);
     });
  }
}
export default new Routes().router
