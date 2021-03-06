const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const ertelmetlen = (req, res, next) => {
    req.ertelmetlen = 'Ennek nincs sok értelme, de legalább jó példa';
    next(); // a req, res menjen tovább a következő feldolgozó middleware-nek
}

const ennekVanErtelme = (req, res, next) => {
    if(!req.isAuthenticated()) {
        res.status(403).send('Ehhez nincs jogod');
    } else {
        next();
    }
}

app.use(ertelmetlen);

// ezekkel lépteti be a passport sessionbe a usert majd szedi ki onnan
passport.serializeUser((user, done) => {
    if(!user) return done("Hiba - nincs user", undefined);
    console.log("serialize sikeres");
    return done(null, user);
});

passport.deserializeUser((user, done) => {
    console.log("deserialize meghivva");
    if(!user) return done("Hiba - nincs user, akit kileptethetnenk", undefined);
    console.log("deserialize sikeres");
    return done(null, user);
});

passport.use('local', new localStrategy((username, password, done) => {
    const users = require('./users.json').users;
    if(users[username] && users[username].password === password) {
        return done(null, {username: username, role: users[username].role});
    } else {
        return done("Hibás felhasználónév vagy jelszó", undefined);
    }
}));

app.use(expressSession({secret: 'ezegyujabbprfgyakorlatmarnemtudokujsecretetkitalalni'}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes'));

app.use('/inner', ennekVanErtelme);
app.use('/inner', require('./pelda'));

const lastResort = (req, res, next) => {
    res.status(200).send('Nyugi, minden rendben csak nem volt route, ami válaszolt volna');
};

app.use(lastResort);

app.listen(3000, () => {
    console.log('the server is running');
});

// node index.js futtatja