/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var UserSessionHelper = require('../services/UserSessionHelper');
var UserBoardsHelper = require('../services/UserBoardsHelper');
module.exports = {

  login: function (req, res) {
    if (UserSessionHelper.isUserAuthenticated(req)) {
      return res.json({redirect: UserSessionHelper.getUserProfilePath(req)});
    }
    var bcrypt = require('bcrypt');
    var req_username = req.param('name');
    var req_password = req.param('password');
    User.findOneByName(req_username, function (err, user) {
      if (err) {
        res.status(400);
        return res.json({message: 'Error with username (name)'});
      }
      if (user) {
        bcrypt.compare(req_password, user.password, function (err, match) {
          if (err) {
            res.status(400);
            return res.json({message: 'Error with password'});
          }
          if (match) {
            req.session.user = user;
            return res.json({redirect: UserSessionHelper.getUserProfilePath(req)});
          }
          else {
            res.status(400);
            return res.json({message: 'passwords do not match'});
          }
        });
      }
      else {
        res.status(400);
        return res.json({message:'Username does not exist'});
      }
    });
  },
  logout: function (req, res) {
    if (!req.session.user) {
      return res.json({message: 'Not signed in'});
    }
    delete req.session.user;
    return res.json({message: 'Logged out'});
  },
  profile: function (req, res) {
    var req_username = req.param('name');
    if (!req_username) {
      if (UserSessionHelper.isUserAuthenticated(req))
        return res.redirect(UserSessionHelper.getUserProfilePath(req));
      else {
        // search for profile or something
        return res.send('Not yet implemented');
      }
    }
    if (UserSessionHelper.isUserAuthenticated(req)) {
      // logged
      if (req.session.user.name === req_username) {
        return UserBoardsHelper.returnViewWithUserBoards('user_home',res,req.session.user);
        //return res.view('user_home', {user: req.session.user, boards:boards});
      }
      else {
        // stranger
      }
    }
    // guest: login or let them see profile
    return res.redirect('/signin');
  },
  validate : function(req,res) {
    var req_name = req.param('name');
    var req_value = req.param('value');
    var where = {};
    where[req_name] = req_value;
    User.findOne(where,function (err, user) {
      if (err) {
        return res.json({message: 'Error with '+req_name+' ('+req_value+')'});
      }
      if(user) {
        return res.json({message: req_name+' ('+req_value+') is taken'});
      }
      return res.json({message:'OK'});
    });
  },
  register : function(req,res) {

    var req_username = req.param('name');
    var req_password = req.param('password');
    var req_email = req.param('email');
    if(req_username && req_password && req_email) {
      User.create({name:req_username,password:req_password,email:req_email}).exec(function(err,user){
        if(err || !user) {
          res.status(400);
          //TODO: Specify which attribute has been violated
          return res.json({message:'User has not been created. An error with data occurred.'});
        }
        return res.json({message:'User has been created',redirect:'/'});
      });
    }
  }
};
