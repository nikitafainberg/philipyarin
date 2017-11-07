var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/', function(req, res) {
    // res.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream(__dirname + '/../public/Phillip.html').pipe(res);
});

module.exports = router;