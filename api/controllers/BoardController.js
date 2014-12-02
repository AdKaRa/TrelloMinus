/**
 * BoardController
 *
 * @description :: Server-side logic for managing boards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  main: function (req, res) {
    var user = req.session.user;
    var board = req.body.board;
    ListHelper.getListByBoard(board,function(lists){
      return res.view('board',{user:user,board:board,lists:lists});
    });
  },
  add: function (req, res) {
    var user = req.session.user;
    var boardTitle = req.param("title");
    var boardType = req.param("type");
    var organization = req.param("organization");
    if(boardType === "shared" && (organization === "" || organization === undefined)) {
      res.status(400);
      return res.json({message:"To create shared board you must be in organization and select it"});
    }

    Board.create({title: boardTitle, owner: user.id, type: boardType, organization:organization}).exec(function(err,board){
      if(board){
        return res.json({message:"Board "+boardTitle+" has been created"});
      }
      if(err || !board) {
        res.status(400);
        return res.json({message:"Something went wrong"});
      }
    });
  },
  stare: function(req,res) {
    var user = req.session.user;
    var board = req.body.board;

    if(board.starred){
      board.starredBy.remove(user.id);
    }
    else {
      board.starredBy.add(user);
    }
    board.save(function(err){
      if(err) throw err;
    });
    res.json(board);

  }
};

