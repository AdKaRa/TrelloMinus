/**
 * OrganizationController
 *
 * @description :: Server-side logic for managing Organizations
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	add: function(req,res) {
    var name = req.param("name");
    var user = req.session.user;
    Organization.create({name:name, users:[user]}).exec(function(err,organization) {
      var result = {};
      if (err) {
        res.status(400);
        result = err;
      }
      else
        result = organization;
      return res.json(result);
    });
  }
};

