let express = require('express');
let uuid = require('uuid');
let router = express.Router();

let mongodb = require("../mongo");

let collection = "posts";


//routings
router.get('/login', function(req, res, next) {
    res.render('accounts/login');
});

router.get('/signup', function(req, res, next) {
    res.render('accounts/signup');
});

router.post('/signup', function(req, res, next) {
    res.redirect('/');
});




module.exports = router;
