var express = require('express');
var router = express.Router();

var pg = require('pg');
var conString = "postgres://bbansavage[password]@localhost:5432/five_alive";

var client = new pg.Client(conString);
client.connect();

let rows;

console.log('clienttype', typeof client)

// client.query("INSERT INTO test(stuff) values('hello');")

// var query = client.query("SELECT * FROM test");

// query.on('row', function(row) {
//     console.log(row);
// });

// query.on('end', function() {
//     client.end();
// });

/* GET users listing. */
router.get('/', function(req, res, next) {

  // res.send('respond with a resource');

  client.query("SELECT * FROM test;")
    .then(values => {
      console.log('done!', values.rows[0].stuff)
      return res.json([{
        id: 1,
        username: values.rows[0].stuff
      }, {
        id: 2,
        username: "D0loresH4ze"
      }]);
    });

});

module.exports = router;
