let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pricing', { title: 'Express' });
});

router.get('/:hello', function(req, res, next) {
  res.send(req.params.hello);
});

module.exports = router;
