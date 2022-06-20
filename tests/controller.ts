import chai from 'chai'
import * as Controller from '../src/controller'

describe('Controller Test', () => {
  // maxium amount of delivered stones is 58 in default condition
  it('should return maxium amount of delivered stones for default condition', (done) => {
    const amount = Controller.maxStonesAmount()
    chai.expect(amount).to.be.equal(58)
    done()
  })
})