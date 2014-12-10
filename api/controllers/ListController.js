/**
 * ListController
 *
 * @description :: Server-side logic for managing lists
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

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
  },
  reorder: function(req,res){
    var cardID = req.param("card");
    var position = req.param("position");
    var listID = req.param("column");
    Card.findOne({id:cardID}).exec(function(err,card){
      List.findOne({id:listID}).populateAll().exec(function(err,list){
        Card.find({list:listID}).sort('position ASC').exec(function(err,cards){
          var index = _.findIndex(cards,{id:card.id});
          var i = 0;
          if(list.id === card.list) {
            cards.splice(index,1);
          }
          else {
            list.cards.add(card);
          }
          cards.splice(position,0,card);
          _.each(cards,function(c){c.position = i++;});
          list.cards = cards;
          list.save(function(){
            res.json({message:'OK'});
          });
        });
      });
    });
  }
};

