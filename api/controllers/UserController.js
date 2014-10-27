/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var UserSessionHelper = require('../services/UserSessionHelper');
module.exports = {

	login: function(req, res) {
        if(UserSessionHelper.isUserAuthenticated(req)) {
            return res.json({redirect:UserSessionHelper.getUserProfilePath(req)});
        }
		var bcrypt = require('bcrypt');
		var req_username = req.param('name');
		var req_password = req.param('password');
		User.findOneByName(req_username,function(err,user){
			if(err) {
                res.status(400);
                return res.json({message:'Error with username (name)'});
            }
            if(user) {
                bcrypt.compare(req_password, user.password, function (err, match) {
                    if (err) {
                        res.status(400);
                        return res.json({message: 'Error with password'});
                    }
                    if (match) {
                        req.session.user = user;
                        return res.json({redirect:UserSessionHelper.getUserProfilePath(req)});
                    }
                    else {
                        res.status(400);
                        return res.json({message: 'passwords do not match'});
                    }
                });
            }
            else {
                res.status(400);
                return res.json('Username does not exist');
            }
		});
	},
	logout : function(req,res){
		if(!req.session.user){
			return res.json({message:'Not signed in'});
		}
		delete req.session.user;
		return res.json({message:'Logged out'});
	},
    profile : function(req,res){
        var req_username = req.param('name');
        if(!req_username) {
            if(UserSessionHelper.isUserAuthenticated(req))
                return res.redirect(UserSessionHelper.getUserProfilePath(req));
            else {
                // search for profile or something
                return res.send('Not yet implemented');
            }
        }
        if(UserSessionHelper.isUserAuthenticated(req)) {
            // logged
            if(req.session.user.name === req_username) {
                return res.view('user_home',{user:req.session.user});
            }
            else {
                // stranger
            }
        }
        // guest
        return res.send('Not yet implemented');
    }
};
