var express = require('express');
var router = express.Router();
var passport = require('passport');

router.route('/login')
    .get(function(req, res, next) {
        res.render('login', { title: 'Login to your account'});
  })
  //Redirects on failure of authenticating
  .post(passport.authenticate('local', {
      failureRedirect: '/login'
  }), function (req, res) {
      res.redirect('/');
  });
  
  router.route('/register')
    .get(function(req, res, next) {
        res.render('register', { title: 'Register A New Account'});
    })
    .post(function(req, res, next) {
        //Check for validity
        req.checkBody('name', 'Invalid Name').notEmpty();
        req.checkBody('email', 'Invalid Email').isEmail();
        req.checkBody('password', 'Invalid Password').notEmpty();
        req.checkBody('password', 'Passwords do not match').equals(req.body.confirmPassword).notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            res.render('register', {
                name: req.body.name,
                email: req.body.email,
                errorMessages: errors
            });
        } else {
            var user = new User();
            user.name = req.body.name;
            user.email = req.body.email;
            user.setPassword(req.body.password);
            user.save(function (err) {
                if (err) {
                    res.render('register', {errorMessages: err});
                } else {
                    res.redirect('/login');
                }
            })
        }
    });

    //Logout route
    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    //Facebook routing
    router.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

    router.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/'
    }));

    module.exports = router;