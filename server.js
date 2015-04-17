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
    password: String,
    following: [String],
    favorites: [String]
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

// check authentication before proceeding
var auth = function (req, res, next) {
    if (!req.isAuthenticated())
        res.send(401);
    else
        next();
};

// get all users in collection
app.get('/users', auth, function (req, res) {
    User.find(function (err,docs) {
        res.json(docs);
    });
});

// get user doc by username
app.get('/user/:username', function (req, res) {
    var username = req.params.username;
    User.findOne({username: username}, function (err,docs) {
        if (err) {
            res.status(401).send('User ' + username + ' was not found');
        } else {
            res.json(docs);
        }
    });
});

// check if user is logged in
app.get('/loggedin', function (req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});

// authenticate user
app.post('/login', passport.authenticate('local'), function (req, res) {
    res.send(req.user);
});

// logout user
app.post('/logout', function (req, res) {
    req.logOut();
    res.send(200);
}); 

// register a new user in the user collection
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

// helper to actually insert the new user
function insertNewUser(req, res, newuser)  {
    newuser["following"] = [];
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

// follow a user
// put userToFollow in this user's "Following" array
app.put('/follow', function (req, res) {
    var userToFollow = req.body;
    User.findOne({username: req.user.username}, function (err, doc){
        var following = doc.following;
        following.push(userToFollow.username);
        User.update({username: req.user.username}, {"following": following}, function (err, updatedDoc) {
            req.user.following = following;
            res.send(req.user);
        });
    });
});

// unfollow a user
// remove userToUnfollow from this user's "Following" array
app.put('/unfollow', function (req, res) {
    var userToUnfollow = req.body;
    User.findOne({username: req.user.username}, function (err, doc){
        var following = doc.following;
        var index = following.indexOf(userToUnfollow);
        following.splice(index, 1);
        User.update({username: req.user.username}, {"following": following}, function (err, updatedDoc) {
            req.user.following = following;
            res.send(req.user);
        });
    });
});

// Review Schema and Model ----------------------------------
var ReviewSchema = new mongoose.Schema({
    text: String,
    username: String,
    recipeId: String,
    recipeName: String,
    dateCreated: Date
});

var Review = mongoose.model('Review', ReviewSchema);

// get all reviews
app.get('/reviews', function (req, res) {
    Review.find(function (err,docs) {
        res.json(docs);
    });
});

// get all reviews by recipeId (for details pages)
app.get('/reviewsByRecipe/:recipeId', function (req, res) {
    var recipeId = req.params.recipeId;
    Review.find({recipeId: recipeId}, function (err,docs) {
        res.json(docs);
    }).sort({dateCreated:-1});
});

// get all reviews by username (for profile pages)
app.get('/reviewsByUser/:username', function (req, res) {
    var username = req.params.username;
    Review.find({username: username}, function (err,docs) {
        res.json(docs);
    }).sort({dateCreated: -1});
});

// save a review from the details page
app.post('/review', function(req, res){
    var review = req.body;
    review["dateCreated"] = new Date();
    conn.collection('reviews').insert(review, function (err,docs) {
        if (err) {
            res.status(401).send('Problem saving review');
        } else {
            res.json(docs);
        }
    });
});

// Favorite RecipeSchema and Model ----------------------------------
var RecipeSchema = new mongoose.Schema({
    image: String,
    ingredients: [String],
    recipeId: String,
    recipeName: String,
    rating: Number,
    timeInSeconds: Number,
    sourceUrl: String
});

var Recipe = mongoose.model('Recipe', RecipeSchema);

// get favorite recipes for a user
app.get('/recipes', function (req, res) {
    var favorites = req.user.favorites;
    var recipes = [];
    $.each(favorites, function (i, favorite) {
        Recipe.findOne({recipeId: favorite.recipeId}, function (err, doc){
            recipes.push(doc)
        });
    });
    res.json(recipes)
})

// favorite a recipe
// put recipeId in this user's "favorites" array and save recipe if needed
// add the recipe to the recipe collection if it's not already there
app.put('/favorite', function (req, res) {
    var recipeToFavorite = req.body;
    // find the user and add the recipe
    User.findOne({username: req.user.username}, function (err, doc){
        var favorites = doc.favorites;
        favorites.push(recipeToFavorite.recipeId);
        // update the user with new favorites array
        User.update({username: req.user.username}, {"favorites": favorites}, function (err, updatedDoc) {
            req.user.favorites = favorites;
            res.send(req.user);
        });
    });
    // we also need to add the recipe to the recipe collection
    Recipe.findOne({recipeId: recipeToFavorite.recipeId}, function (err, doc){
        // if there is an error, return error code
        // if docs exist, that means the recipe already exists in the collection so we don't add it again 
        if (err || docs) {
            if (err) {
                res.status(401).send('There was a problem fetching the recipe:' + recipeToFavorite.recipeName);
            }
        } else { // otherwise we want to add it
            insertNewRecipe(recipeToFavorite);
        }
    });
});

// helper to insert new recipe
function insertNewRecipe(req, res, recipeToFavorite)  {
    conn.collection('recipes').insert(recipeToFavorite, function (err,docs) {
        if (err) {
            res.status(401).send('Error saving recipe:' + recipeToFavorite.recipeName);
        } else {
            res.json(docs);
        }
    });
}

// unfavorite a recipe
// remove recipeToUnfavorite from this user's "Favorites" array
// don't remove recipe from the recipe collection
app.put('/unfavorite', function (req, res) {
    var recipeIdToUnfavorite = req.body;
    // find the user and remove the recipe
    User.findOne({username: req.user.username}, function (err, doc){
        var favorites = doc.favorites;
        var index = favorites.indexOf(recipeIdToUnfavorite);
        favorites.splice(index, 1);
        // update user with new favorites array
        User.update({username: req.user.username}, {"favorites": favorites}, function (err, updatedDoc) {
            req.user.favorites = favorites;
            res.send(req.user);
        });
    });
});

// Look for openshift port and ip first, if not, host locally
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ip);