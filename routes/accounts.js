let express = require('express');
let uuid = require('uuid');
let router = express.Router();
let crypto = require("crypto");

let mongodb = require("../mongo");

let collection = "accounts";

let algorithm = 'aes-256-ctr';
let passphrase = "sueken456765fghjhgh";

let encrypt = (text) => {
    let cipher = crypto.createCipher(algorithm,passphrase)
    let crypted = cipher.update(text,'utf8','base64')
    crypted += cipher.final('base64');
    return crypted;
}

let decrypt = (text) => {
    let decipher = crypto.createDecipher(algorithm,passphrase)
    let dec = decipher.update(text,'base64','utf8')
    dec += decipher.final('utf8');
    return dec;
}

//routings
router.get('/login', function(req, res, next) {
    res.render('accounts/login');
});

router.post('/login', function(req, res, next) {
    mongodb(collection).findOne( { email: req.body.email }, function(err, results){
        if (req.body.password === decrypt(results.password)) {
            res.redirect('/');
        } else {
            res.send("error")
        }
    });
});


router.get('/signup', function(req, res, next) {
    res.render('accounts/signup');
});

router.post('/signup', function(req, res, next) {
    req.body.password = encrypt(req.body.password)
    req.body.accountId = uuid.v4().replace(/-/g, '');
    mongodb(collection).insertOne( req.body ).then(function(results) {
        res.redirect('/');
    });
});

    res.redirect('/');
});




module.exports = router;
