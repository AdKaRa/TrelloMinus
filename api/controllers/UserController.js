/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	login: function(req, res) {
        if(req.session.user) {
            console.log(req.session.autenticated);
            return res.json({redirect: '/profile/'+req.session.user.name})
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
                        return res.json({redirect:'/profile/'+user.name});
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
            if(req.session.user)
                return res.redirect('/profile/'+req.session.user.name);
            else {
                // search for profile or something
                return res.send('Not yet implemented');
            }
        }
        if(req.session.user) {
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
