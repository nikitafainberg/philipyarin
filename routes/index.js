var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/', function(req, res) {
    fs.createReadStream(__dirname + '/../public/Phillip.html').pipe(res);
});

module.exports = router;