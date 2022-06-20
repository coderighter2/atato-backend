import { Router } from 'express'
import * as Controller from './controller'

export class Routes {

  router: Router

  constructor() {
    this.router = Router()
    this.router.post('/nftmint', async (req, res) => {
      const success = await Controller.nftMint()
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
  }
}
export default new Routes().router
