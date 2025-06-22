'use strict'

/**
 * Module dependencies.
 */
const express = require('express');
const createError = require('http-errors')
const app = express();

// Faux database

const users = [
  { name: 'tj' }
  , { name: 'tobi' }
  , { name: 'loki' }
  , { name: 'jane' }
  , { name: 'bandit' }
];

// Convert :to and :from to integers

app.param(['to', 'from'], function(req, res, next, num, name){
  req.params[name] = parseInt(num, 10);
  if( isNaN(req.params[name]) ){
    next(createError(400, 'failed to parseInt '+num));
  } else {
    next();
  }
});

// Load user by id
app.param('user', function(req, res, next, id){
  req.user = users[id]
  if (req.user) {
    next();
  } else {
    next(createError(404, 'failed to find user'));
  }
});

/**
 * GET index.
 */

app.get('/', function(req, res){
  res.send('Visit /user/0 or /users/0-2'); //user 0,1,2,3,4 aparece o nome de cada; 0-2 aparece os 3 primeiros nomes
});

/**
 * GET :user.
 */

app.get('/user/:user', function (req, res) {
  res.send('user ' + req.user.name);
});

/**
 * GET users :from - :to.
 */

app.get('/users/:from-:to', function (req, res) {
  const from = req.params.from;
  const to = req.params.to;
  const names = users.map(function(user){ return user.name; });
  res.send('users ' + names.slice(from, to + 1).join(', '));
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}