const router = require('express').Router();
const passport = require('passport');



// auth login
router.get('/login', (req, res) => {
    res.render('login');
});


// auth logout
router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) {
            return next(err); // Handle error if there's an issue during logout
        }
        res.redirect('/'); // Redirect to the homepage or login page
    });
});


// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));


// Callback route for Google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // Redirect to profile page
    res.redirect('/profile');
});

module.exports = router;