const router = require('express').Router();
const passport = require('passport');

router.route('/pelda').get((req, res) => {
    return res.status(200).send('igen, ez egy pelda');
}).post((req, res) => {
    console.log(req.ertelmetlen);
    return res.status(200).send(req.ertelmetlen);
}).delete((req, res, next) => {
    next();
});

module.exports = router;