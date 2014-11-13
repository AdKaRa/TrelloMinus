/**
 * BoardController
 *
 * @description :: Server-side logic for managing boards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  main: function (req, res) {
    var boardHash = req.param('hash');
    var boardId = BoardHelper.decodeBoardHash(boardHash);
    var cleanBoardTitle = req.param('title');
    var user = req.session.user;
    if(!user) {
      return res.send('You have to be logged to see it');
    }
    Board.findOne({id: boardId}).exec(function(err,board){
      if(!board || err) {
        res.status(404);
        return res.view('404',{error: err.message});
      }
      if(!cleanBoardTitle)
        return res.redirect(BoardHelper.getBoardURL(boardId,board.title));
      board.hash = boardHash;
      return BoardListsHelper.returnViewWithUserBoardLists('board',res,user,board);
    });
  },
  add: function (req, res) {
    var user = req.session.user;
    var boardTitle = req.param("title");
    var boardType = req.param("type");
    if(user) {
      Board.create({title: boardTitle, owner: user.id, type: boardType}).exec(function(err,board){
        if(board){
          return res.json({message:"Board "+boardTitle+" has been created"});
        }
        if(error || !board) {
          res.status(400);
          return res.json({message:"Something went wrong"});
        }
      });
    }
    else {
      res.status(400);
      return res.json({message:"You have to be logged to add a board"});
    }
  }
};

