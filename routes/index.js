var express = require('express');
var router = express.Router();

//Configures sending email to admin
var nodemailer = require('nodemailer');
var config = require('../config.js');
var transporter = nodemailer.createTransport(config.mailer);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'LetsCode | Collaborate & Grow With Your Team' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'LetsCode | Collaborate & Grow With Your Team'});
});

router.route('/contact')
  .get(function(req, res, next) {
    res.render('contact', { title: 'LetsCode | Collaborate & Grow With Your Team' });
  }) 
  .post(function(req, res, next) {
    //Form Validation
    req.checkBody('name', 'Empty name').notEmpty();
    req.checkBody('email', 'Invalid email').isEmail();
    req.checkBody('message', 'Empty message').notEmpty();
    var errors = req.validationErrors();

    if(errors) {
      res.render('contact', {
        title: 'LetsCode | Collaborate & Grow With Your Team',
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        errorMessages: errors
      });
    } else {
      //nodeMailer
      var mailOptions = {
        from: 'LetsCode <no-reply@thubamamba.com>',
        to: 'tsmmamba@gmail.com',
        subject: 'New Message from LetsCode 👨‍💻😛',
        text: req.body.message
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return console.log(error);
        }
        res.render('thanks', { title: 'LetsCode | Collaborate & Grow With Your Team' });
      });
    }
  });

module.exports = router;
