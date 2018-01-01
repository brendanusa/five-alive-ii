const cheerio = require('cheerio');
const axios = require('axios');
// const Bluebird = require('bluebird');
var db = require('./db.js');

const scrape = () => {

  url = 'https://www.sports-reference.com/cbb/seasons/2018-ratings.html';
  
  axios.get(url)
    .then(res => {
      let $ = cheerio.load(res.data);
      var data = {};
      $('#ratings tbody').children('tr').not('.over_header thread').not('.thead').each((i, row) => {
        const teamObj = {};
        teamObj.wins = parseInt(row.childNodes[4].children[0].data);
        teamObj.losses = parseInt(row.childNodes[5].children[0].data);
        teamObj.conference = row.childNodes[2].childNodes[0].children[0].data;
        data[row.childNodes[1].childNodes[0].children[0].data] = teamObj;
      })
      db.client.query('DELETE FROM test;');
      db.client.query('ALTER SEQUENCE test_id_seq RESTART;');
      let count = 0;
      for (var key in data) {
        count++
        db.client.query(`INSERT INTO test (school, conference, wins, losses) VALUES ('${ key }', '${ data[key].conference }', '${ data[key].wins }', '${ data[key].losses }');`);
      }
      console.log(count)
    })
    .then(data => {
      console.log('SUCCESS!');
    })
    .catch(err => {
      console.log('there has been an error: ', err)
    });

}

module.exports.scrape = scrape;