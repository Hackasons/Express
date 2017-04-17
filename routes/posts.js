let express = require('express');
let uuid = require('uuid');
let router = express.Router();

let mongodb = require("../mongo");

let collection = "posts";


//routings
router.get('/', function(req, res, next) {
    mongodb(collection).find().toArray(function(err, results){
        res.render('posts/index', { posts : results });
    });
});

router.get('/create', function(req, res, next) {
    res.render('posts/create',{users : "docs" });
});

router.post('/create', function(req, res, next) {
    req.body.postId = uuid.v4().replace(/-/g, '');
    mongodb(collection).insertOne( req.body ).then(function(results) {
        res.redirect('/posts');
    });
});

router.get('/edit/:postId', function(req, res, next) {
    mongodb(collection).findOne( { postId: req.params.postId }, function(err, results){
        res.render('posts/edit',{ post : results });
    });
});

router.get('/:postId', function(req, res, next) {
    mongodb(collection).findOne( { postId: req.params.postId }, function(err, results){
        res.render('posts/detail',{ post : results });
    });
});

router.put('/:id', function(req, res, next) {
    res.render('posts/index',{users : "docs" });
});

router.delete('/:id', function(req, res, next) {
    res.render('posts/index',{users : "docs" });
});


module.exports = router;
