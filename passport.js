//Uses Passport module
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

//Finds out if we have the User Id
passport.deserializeUser(function (id, done) {
    User.findOne({_id: id}, function (err, user) {
        done(err, user);
    })
});

passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    function (username, password, done) {
        User.findOne({email: username}, function (err, user) {
            if (err) return done(err);
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username or password. Try again.'
                });
            }
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect username or password. Try again.'
                });
            }
            return done(null, user);
        })
    }
));


passport.use(new FacebookStrategy({
        clientID: '596622934193520',
        clientSecret: '4ab33b9e92bac74c19cd8322c208df15',
        callbackURL: 'http://localhost:3000/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'email']
    }, 
    function(token, refreshToken, profile, done) {
        User.findOne({'facebookId': profile.id}, function(err, user) {
            if (err) return done (err);

            if (user) {
                return done (null, user);
            } else {
                User.findOne({email: profile.emails[0].value}, function (err, user) {
                    if (user) {
                        user.facebookId = profile.id
                        return user.save(function (err) {
                            if (err) return done (null, false, { message: 'Cannot save user info'});
                            return done(null, user);
                        })
                    }
                    var user = new User();
                    user.name = profile.displayName;
                    user.email = profile.emails[0].value;
                    user.facebookId = profile.id
                    user.save(function (err){
                        if (err) return done (null, false, { message: 'Cannot save user info'});
                        return done(null, user);
                    })
                });
            }

        });
    }
));