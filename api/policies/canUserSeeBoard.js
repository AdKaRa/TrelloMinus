/**
 * canSeeBoard
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authorised User to see Board
 *                 It depends on type of the Board or it's ownership
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req,res,next) {
	var user = req.session.user;
	if((user && user.id === req.body.board.owner.id) || (req.body.board.type === BoardHelper.TYPES.PUBLIC_BOARD)) {
		return next();
	}
	else if(req.body.board.type === BoardHelper.TYPES.SHARED_BOARD) {
    UserHelper.getUserOrganizations(user, function (orgs) {
      var orgsIDs = orgs.map(function (o) {
        return o.id;
      });
      var found = _.contains(orgsIDs, req.body.board.organization.id);
      if(found){
        return next();
      }
      else {
        return res.forbidden('You are not permitted to perform this action.');
      }
    });
  }
  else {
		return res.forbidden('You are not permitted to perform this action.');
	}
};
