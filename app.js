const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const session = require('express-session');
const passport = require('passport')
const profileRoutes = require('./routes/profile-routes')
const cookieSession = require('cookie-session');


const app = express();

// setup view engine
app.set('view engine' , 'ejs');



app.use(session({
    name: 'yousef',
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'development'
        , maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());


// connect to mongodb
mongoose.connect(keys.mongodb.dbURI)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log(err));


// setup routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes)

// create home route
app.get('/', (req, res) => {
    res.render('home',{user:req.user})
}) 


app.listen(3000,() =>{
    console.log("app now listening of requests on port 3000")
})