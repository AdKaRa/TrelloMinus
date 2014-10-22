/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
	name : {
		type: 'string',
		unique: true,
		required: true
	},
	email : {
		type: 'string',
		required: false
	},
	password: {
		type: 'string',
		minLength: 6,
		required: true	
	}
  },

  beforeCreate : function(attr, cb) {
  	var bcrypt = require('bcrypt');
	bcrypt.hash(attr.password, 10, function(err, hash){
		if(err) return cb(err);
		attr.password = hash;
		cb(); 
	});
  }
};

