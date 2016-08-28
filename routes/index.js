var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {
        user: req.session.user,
        req: req,
        res: res
    });
});

module.exports = router;
