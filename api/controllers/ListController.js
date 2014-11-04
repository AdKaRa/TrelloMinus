/**
 * ListController
 *
 * @description :: Server-side logic for managing lists
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var BoardHelper = require("../services/BoardHelper");
module.exports = {
  add: function (req, res) {
    var user = req.session.user;
    var boardHash = req.param("board");
    var name = req.param("name");
    if(!boardHash) {
      res.status(400);
      return res.json({message:'No board to add'});
    }
    if(user) {
      var boardId = BoardHelper.decodeBoardHash(boardHash);
      List.create({name: name, board: boardId}).exec(function(err,list){
        if(list){
          return res.json({message:"List "+name+" has been created"});
        }
        if(error || !list) {
          res.status(400);
          return res.json({message:"Something went wrong"});
        }
      });
    }
    else {
      res.status(400);
      return res.json({message:"You have to be logged to add a list"});
    }
  }
};

