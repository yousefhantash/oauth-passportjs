const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys')
const User = require('../models/user-modle')



passport.serializeUser((user, done) => {
    done(null, user.id); // Save the user's ID in the session
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err);
        });
});


passport.use(new GoogleStrategy({
    // options for google strategy
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret

    }, (accessToken, refreshToken, profile,done) => {
    // passport callback function
    // check if user alredey exists in our db
    User.findOne({googleid: profile.id}).then((currentUser) => {
        console.log(profile)
        if(currentUser){
            // alredey exists
            console.log('user is' + currentUser)
            done(null, currentUser);
            

        }else {
            // if not exist
            new User ({
            username: profile.displayName,
            googleid: profile.id,
            thumbnail: profile._json.picture
            
            }).save().then((newUser) => {
            console.log('new user created' + newUser)
            done(null, newUser);
            })
        }
    });


})

)
