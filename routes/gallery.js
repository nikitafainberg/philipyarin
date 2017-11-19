var express = require('express');
var router = express.Router();
var fs = require('fs');

router.post('/admin', function (req, res) {
    var dataFile = JSON.parse(fs.readFileSync(__dirname + '/../data/data.json', 'utf8'));
    res.render('gallery', {data: dataFile});
});

module.exports = router;