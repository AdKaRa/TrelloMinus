module.exports = {

  returnViewWithUserBoardLists : function(view,res,user,board) {
    List.find({board:board.id}).exec(function(err,lists){
      if(!err && lists){
        return res.view(view,{user:user,board:board,lists:lists});
      }
      else {
        console.log(err);
      }
    });
  }

};
