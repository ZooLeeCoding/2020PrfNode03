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
    if(username === 'gipszjakab' && password === '12345') {
        return done(null, {username: username, role: 'user'});
    } else {
        return done("Hibás felhasználónév vagy jelszó", undefined);
    }
}));

app.use(expressSession({secret: 'ezegyujabbprfgyakorlatmarnemtudokujsecretetkitalalni'}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes'));

app.listen(3000, () => {
    console.log('the server is running');
});

// node index.js futtatja