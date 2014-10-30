/**
 * UserBoardsHelper
 *
 * @description :: Bunch of function to help user model with boards
 *
 */
var BoardHelper = require("./BoardHelper");

module.exports = {
  returnViewWithUserBoards: function(view,res,user){
    Board.find({owner:user.id}).exec(function(err,boards) {
      if (!err && boards){
        boards = boards.map(function(board){
          board.url = BoardHelper.getBoardURL(board.id,board.title);
          return board;
        });
        return res.view(view, {user: user, boards: boards});
      }
      else
        console.log(err);
    });
  }
};
