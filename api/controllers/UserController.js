/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	login: function(req, res) {
		var bcrypt = require('bcrypt');
		var req_username = req.param('name');
		var req_password = req.param('password');
console.log(req_username,req_password);
User.findOneByName(req_username,function(err,user){
			if(err) return res.json({message:'Error with username (name)'});
			console.log(user);
			bcrypt.compare(req_password,user.password,function(err,match){
				if(err) return res.json({message:'Error with password'});
				if(match){
					console.log('match');
					req.session.userid = user.id;
					return res.json({message:'LOGIN OK'});
				}
				else {
					return res.json({message: 'passwords do not match'});
				}
			});	
		});
	},
	logout : function(req,res){
		if(!req.session.userid){
			return res.json({message:'Not signed in'});
		}
		console.log(req.session.userid);
		delete req.session.userid;
		return res.json({message:'Logged out'});
	}	
};

