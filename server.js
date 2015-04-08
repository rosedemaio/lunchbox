var express = require('express');
var app = express();

var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var bodyParser = require('body-parser');
var multer     = require('multer');

var cookieParser = require('cookie-parser');
var session      = require('express-session');

var mongoose = require('mongoose');

app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'this is the secret' }));
app.use(multer());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/lunchbox');

// User Schema and Model ----------------------------------
var UserSchema = new mongoose.Schema({
	username: String,
	password: String
});
var User = mongoose.model('User', UserSchema);
var conn = mongoose.connection;

// Login  ----------------------------------
passport.use(new LocalStrategy(
function (username, password, done) {
	User.findOne({username: username, password: password}, function (err,docs) {
		if (err) {
			return done(null, false, {errorMessage: 'Username or password is invalid'});
		} else {
			return done(null, docs);
		}
	});
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

var auth = function (req, res, next) {
    if (!req.isAuthenticated())
        res.send(401);
    else
        next();
};

app.get('/users', auth, function (req, res) {
	var users = User.find(function (err,docs) {
		res.json(docs);
	});
});

app.get('/loggedin', function( req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});
    
app.post('/login', passport.authenticate('local'), function (req, res) {
    res.send(req.user);
});

app.post('/logout', function (req, res) {
    req.logOut();
    res.send(200);
}); 

app.post('/register', function(req, res){
	var newuser = req.body;
	User.findOne({username: newuser.username}, function (err,docs) {
		// first check to see if user already has that username (in which case docs would be non-null)
		if (err || docs) {
			// if so, return error and error message saying to pick new username
			res.status(401).send('Username ' + newuser.username + ' already taken. Choose a new username.');
		} else {
			// otherwise insert and log in new user
			insertNewUser(req, res, newuser);
		}
	});
});

function insertNewUser(req, res, newuser)  {
	conn.collection('users').insert(newuser, function (err,docs) {
		if (err) {
			res.status(401).send('Error in registration');
		} else {
			passport.authenticate('local')(req, res, function () {
                res.send(req.user);
            })
		}
	});
}        

// Look for openshift port and ip first, if not, host locally
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ip);