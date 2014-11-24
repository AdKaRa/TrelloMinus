/**
 * UserHelper
 *
 * @description :: Bunch of function to help user model with boards
 *
 */
var BoardHelper = require("./BoardHelper");

module.exports = {
  getUserBoards: function(user,cb){
    Board.find({owner:user.id}).exec(function(err,boards) {
      if (!err && boards){
        boards = boards.map(function(board){
          board.url = BoardHelper.getBoardURL(board.id,board.title);
          return board;
        });
        return cb(boards);
      }
      else
        console.log(err);
    });
  }
};
