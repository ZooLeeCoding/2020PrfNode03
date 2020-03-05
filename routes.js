const router = require('express').Router();
const passport = require('passport');

router.route('/pelda').get((req, res) => {
    if(req.isAuthenticated()) {
        return res.status(200).send('igen, ez egy pelda');
    } else {
        return res.status(403).send('jelentkezz be előbb');
    }
}).post((req, res) => {
    return res.status(500).send('Ezt még nem implementáltuk');
}).delete((req, res) => {
    return res.status(404).send('Még nincs mit törölni');
});

router.route('/login').post((req, res) => {
    if(req.body.username && req.body.password) {
        // itt az (error, user) metódus lesz a done paraméter
        passport.authenticate('local', (error, user) => {
            if(error) {
                return res.status(403).send(error);
            } else {
                // ez hívja meg a serializeUser-t és hozza létre a sessiont
                req.logIn(user, (error) => {
                    if(error) return res.status(500).send(error);
                    return res.status(200).send("A bejelentkezés sikeres");
                });
            }
        })(req, res);
    } else {
        res.status(400).send("Hiányzó usernév vagy jelszó");
    }
});

router.route('/logout').post((req, res) => {
    console.log(req.session.passport.user);
    if(req.isAuthenticated()) {
        req.logout();
        res.status(200).send("Kijelentkezés sikeres");
    } else {
        res.status(403).send("Jelentkezz előbb be, hogy kijelentkezhess")
    }
});

module.exports = router;