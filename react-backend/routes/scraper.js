var express = require('express');
var router = express.Router();
var scrape = require('../scraper');
var Bluebird = require('bluebird');

console.log('5 scrape.scrape?', typeof scrape.scrape)

// var asyncScrape = () => {
//   Promise.all([scrape.scrape])
// }

// var asyncScrape = Bluebird.promisify(scrape.scrape)

router.get('/', (req, res, next) => {

  scrape.scrape();

  return res.json([{
    id: 1,
    username: 'nine'
  }, {
    id: 2,
    username: "numbrtwo"
  }]);

})

module.exports = router;