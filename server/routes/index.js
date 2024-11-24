var express = require('express');
var router = express.Router();
const passport = require('passport');
const DB = require('../config/db');
let userModel = require('../model/User');
let User = userModel.User;

// GET index page
router.get('/', function(req, res, next) {
  res.render('pages/index', { 
    title: 'The Happy Farm',
    displayName: req.user ? req.user.displayName : '' 
  });
});

// GET home page
router.get('/home', function(req, res, next) {
  res.render('pages/index', { 
    title: 'The Happy Farm', 
    displayName: req.user ? req.user.displayName : '' 
  });
});

// GET About Us page
router.get('/aboutus', function(req, res, next) {
  res.render('fruit/about', { 
    title: 'About Us',
    displayName: req.user ? req.user.displayName : '' 
  });
});

// GET Product page
router.get('/product', function(req, res, next) {
  res.render('fruit/products', { 
    title: 'Product', 
    displayName: req.user ? req.user.displayName : '' 
  });
});

// GET Services page
router.get('/service', function(req, res, next) {
  res.render('fruit/services', { 
    title: 'Service',
    displayName: req.user ? req.user.displayName : '' 
  });
});

// GET Contact Us page
router.get('/contactus', function(req, res, next) {
  res.render('fruit/contact', { 
    title: 'Contact Us',
    displayName: req.user ? req.user.displayName : '' 
  });
});

// GET Login page
router.get('/login', function(req, res, next) {
  if (!req.user) {
    res.render('Auth/login', {
      title: 'Login',
      displayName: req.user ? req.user.displayName : '',
      message: req.flash('loginMessage')
    });
  } else {
    return res.redirect('/');
  }
});

// POST Login page
router.post('/login', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('loginMessage', 'Authentication Error');
      return res.redirect('/login');
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/fruitslist');
    });
  })(req, res, next);
});

// GET Register page
router.get('/register', function(req, res, next) {
  if (!req.user) {
    res.render('Auth/register', {
      title: 'Register',
      displayName: req.user ? req.user.displayName : '',
      message: req.flash('registerMessage')
    });
  } else {
    return res.redirect('/');
  }
});

// POST Register page
router.post('/register', function(req, res, next) {
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    displayName: req.body.displayName
  });

  User.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log("Error: Inserting the new User");
      if (err.name === "UserExistError") {
        req.flash('registerMessage', 'Registration Error: User already exists');
      }
      return res.render('Auth/register', {
        title: 'Register',
        displayName: req.user ? req.user.displayName : '',
        message: req.flash('registerMessage')
      });
    } else {
      return passport.authenticate('local')(req, res, () => {
        res.redirect('/fruitslist');
      });
    }
  });
});

// GET Logout page
router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
  });
  res.redirect('/');
});

module.exports = router;