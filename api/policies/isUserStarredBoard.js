/**
 * isUserStarredBoard
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authorised User to check and mark Board as starred
 *                 It depends on type of the Board or it's ownership
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req,res,next) {
  var user = req.session.user;
  req.body.board.starred = BoardHelper.isStarredBoard(user,req.body.board);
  return next();
};
