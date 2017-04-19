let express = require('express');
let uuid = require('uuid');
let router = express.Router();

let mongodb = require("../mongo");
let collection = "notes";

/* GET home page. */
router.get('/', function(req, res, next) {
  mongodb(collection).find().toArray(function(err, results){
    console.log(results)
    res.render('notes/index', { notes: results });
  });
});

router.get('/create', function(req, res, next) {
  res.render('notes/create', { title: 'Express' });
});

router.post('/create', function(req, res, next) {
  req.body.noteId = uuid.v4().replace(/-/g, '');
console.log(req.body);
  mongodb(collection).insertOne(req.body).then(function(results) {
    res.redirect('/notes');
  });
});

router.get('/edit/:noteId', function(req, res, next) {
  mongodb(collection).findOne( {noteId: req.params.noteId }, function(err, results){
  console.log(req.params.noteId)
  console.log(results)
    res.render('notes/edit', { notes: results });
  });
});

router.get('/:noteId', function(req, res, next) {
  mongodb(collection).findOne( {noteId: req.params.noteId }, function(err, results){
    console.log(req.params.noteId)
    console.log(results)
    res.render('notes/detail', { notes: results });
  });
});

router.put('/edit/:noteId', function(req, res) {
  console.log(req.body)
  mongodb(collection).findOneAndUpdate( {noteId: req.params.noteId }, req.body, {}, function(err, r){
    res.redirect('/notes');
  });
});

router.delete('/delete/:noteId', function(req, res) {
  console.log(req.params)
  mongodb(collection).findOneAndDelete( {noteId: req.params.noteId }, {}, function(err, r){
    res.redirect('/notes');
  });
});

module.exports = router;
