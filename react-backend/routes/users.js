var express = require('express');
var router = express.Router();
var db = require('../db.js');

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

  db.client.query("SELECT * FROM test;")
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
