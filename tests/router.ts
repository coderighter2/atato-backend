import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../'
import { DefaultCondition } from '../src/boat'

chai.use(chaiHttp)
chai.should()

describe('Router Test', () => {
  // maxium amount of delivered stones is 58 in default condition
  it("should return maxium amount of delivered stones for correct query params", (done) => {
    const queryString = new URLSearchParams({
      totalTime: DefaultCondition.totalTime.toString(),
      loadTime: DefaultCondition.loadTime.toString(),
      unloadTime: DefaultCondition.unloadTime.toString(),
      boatsCount: DefaultCondition.boatsCount.toString(),
      locationTime: DefaultCondition.locationTime.toString(),
    }).toString();
    chai.request(app)
        .get(`/stones-amount?${queryString}`)
        .end((err, res) => {
          chai.expect(res.body.success).to.be.equal(true)
          chai.expect(res.body.amount).to.be.equal(58)
          done()
        })
  })

  it("should return 500 code for wrong query params", (done) => {
    chai.request(app)
        .get(`/stones-amount`)
        .end((err, res) => {
            res.should.have.status(500)
            done()
         })
  })
})