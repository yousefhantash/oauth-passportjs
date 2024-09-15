const router = require('express').Router();
const passport = require('passport');

const authCheck = (req, res, next) => {
    if (!req.user) {
        // If user is not logged in, redirect to login
        res.redirect('/auth/login');
    } else {
        // If logged in, proceed to the next middleware
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    // You should now have access to req.user here
    res.render('profile',{user: req.user});
});

module.exports = router;