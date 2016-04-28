var express = require('express');
var router = express.Router();

var timer;

// do something here
var action = function () {
    console.log("doing something ... ");
}

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});



/* START cron job. */
router.post('/start', function (req, res, next) {

    var interval = req.body.interval;
    var duration = interval * 1000;
    timer = setInterval(action, duration);

    res.json({
        "status": 100,
        "on": true,
        "msg": "created cron job",
        "interval": interval
    });
});


/* STOP cron job */
router.post('/stop', function (req, res, next) {

    clearInterval(timer);
    timer = false;
    res.json({
        "status": 100,
        "on": false,
        "msg": "stopped cron job"
    });
});

/* GET STATUS, is cron job running? */
router.post('/status', function (req, res, next) {
    var on = true;
    if (!timer) {
        on = false;
    }

    res.json({
        "status": 100,
        "on": on
    });
});

module.exports = router;