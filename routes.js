const router = require('express').Router();
const passport = require('passport');
const fs = require('fs');

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

router.route('/register').post((req, res) => {
    if(req.body.username && req.body.password) {
        const users = require('./users.json');
        if(!users.users[req.body.username]) {
            users.users[req.body.username] = {
                password: req.body.password,
                role: 'user'
            }
            fs.writeFileSync('./users.json', JSON.stringify(users));
            return res.status(200).send("Regisztráció sikeres");
        }
        return res.status(400).send("Már van ilyen felhasználónév!");
    }
    return res.status(400).send("Hiányzik a felhasználónév vagy a jelszó");
});

module.exports = router;