let express = require('express');
let router = express.Router();

let array = [
    "sueken",
    "kengo",
    "suenaga"
];
let name = {
    name : "sueken"
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',name);
});

module.exports = router;
