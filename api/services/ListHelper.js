module.exports = {

  getListByBoard : function(board,cb) {
    List.find({board:board.id}).populate('cards').exec(function(err,lists){
      if(!err && lists){
        return cb(lists);
      }
      else {
        console.log(err);
      }
    });
  }

};
