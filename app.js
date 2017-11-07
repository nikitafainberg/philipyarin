var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var index = require('./routes/index');
var gallery = require('./routes/gallery');
var multer = require('multer');
var app = express();

var fileUrl;

var data = JSON.parse(fs.readFileSync(__dirname + '/public/data.json', 'utf8'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        switch (req.url){
            case '/upload/triangle':
                fileUrl = 'images/paint/';
                cb(null, 'public/' +fileUrl);
                break;
            case '/upload/telaviv':
                fileUrl = 'images/draw/';
                cb(null, 'public/' +fileUrl);
                break;
            case '/upload/blackAndWhite':
                fileUrl = 'images/blackAndWhite/';
                cb(null, 'public/' +fileUrl);
                break;
        }
    },
    filename: function (req, file, cb) {
        fileUrl += file.originalname;
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage});

app.get('/admin', function (req, res) {
    res.render('admin');
});

app.post('/admin', function (req, res) {
    var dataFile = JSON.parse(fs.readFileSync(__dirname + '/data/admin.json', 'utf8'));

    if (req.body.login === dataFile.login && req.body.password === dataFile.password){
        res.render('gallery', {data: data});
    }else {
        console.log('ligin or password is wrong');
        res.render('admin');
    }
});



app.post('/upload/:type', upload.any(), function (req, res) {
    var type = req.params.type;

    var newJsonObject = {
        "url": fileUrl,
        "title" : req.body.title,
        "size": req.body.size,
        "material" : req.body.material,
        "year" : req.body.year
    };

    switch (type){
        case 'triangle':
            data.triangle.push(newJsonObject);
            break;
        case 'telaviv':
            data.telaviv.push(newJsonObject);
            break;
        case 'blackAndWhite':
            data.blackAndWhite.push(newJsonObject);

            break;
    }

    fs.writeFileSync('public/data.json', JSON.stringify(data, null, 2));

    res.render('admin');
});

app.delete('/admin/:type/:images/:folder/:filename', function (req, res) {
    var url = req.params.images + "/" + req.params.folder + "/" + req.params.filename;
    var object;
    switch (req.params.type){
        case 'triangle':
            object = data.triangle.filter(function (item) {
                if (item.url === url) {
                    return item;
                }
            });

            data.triangle = data.triangle.filter(function (item) {
                return item !== object[0];
            });

            break;
        case 'telaviv':
            object = data.telaviv.filter(function (item) {
                if (item.url === url) {
                    return item;
                }
            });

            data.telaviv = data.telaviv.filter(function (item) {
                return item !== object[0];
            });
            break;
        case 'blackAndWhite':
            object = data.blackAndWhite.filter(function (item) {
                if (item.url === url) {
                    return item;
                }
            });

            data.blackAndWhite = data.blackAndWhite.filter(function (item) {
                return item !== object[0];
            });
            break;
    }

    fs.unlink(__dirname + '/public/' + object[0].url, function (err) {
        if (err) throw err;
    });
    fs.writeFileSync('public/data.json', JSON.stringify(data, null, 2));

    res.render('gallery', {data: data})
});

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;