let express = require('express');
let router = express.Router();

let mongodb = require("../mongo");

let collection = "users";

/* GET home page. */
router.get('/', function(req, res, next) {
    mongodb(collection).find().toArray(function(err, docs){
        console.log(docs);
        res.render('index',{users : docs });
    });
});

module.exports = router;
