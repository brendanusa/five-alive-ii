var pg = require('pg');
var conString = "postgres://bbansavage:@localhost:5432/five_alive";

var client = new pg.Client(conString);
client.connect();

module.exports.client = client;