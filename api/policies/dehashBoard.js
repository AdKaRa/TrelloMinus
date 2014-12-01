/**
 * isUserStarredBoard
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authorised User to check and mark Board as starred
 *                 It depends on type of the Board or it's ownership
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req,res,next){
  req.body = {} || req.body;
  var hash = req.param('hash');
  BoardHelper.getBoardByHashedId(hash,function(board){
    req.body.board = board;
    req.body.board.hash = hash;
    next();
  });
};
