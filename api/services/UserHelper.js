/**
 * UserHelper
 *
 * @description :: Bunch of function to help user model with boards
 *
 */

module.exports = {
  getUserBoards: function(user,organizations,cb){
    var organizationsIDs = organizations.map(function(o){
      return o.id;
    });
    Board.find({ or:[
                    {owner:user.id},
                    {organization:organizationsIDs}
                    ]}
    ).populateAll().exec(function(err,boards) {
        if (!err && boards){
          boards = boards.filter(function(board){
            return !BoardHelper.isStarredBoard(user,board);
          }).map(function(board){
            board.url = BoardHelper.getBoardURL(board.id,board.title);
            return board;
          });
          return cb(boards);
        }
        else
          console.log(err);
      });
  },
  getUserStarredBoards: function(user, cb) {
    User.findOne({id:user.id}).populateAll().exec(function(err,starred) {
      if (!err && starred){
        var result = starred.starredBoards;
        result = result.map(function(board){
          board.url = BoardHelper.getBoardURL(board.id,board.title);
          return board;
        });
        return cb(result);
      }
      else
        console.log(err);
    });
  },
  getUserOrganizations: function(user, cb) {
    User.findOne({id:user.id}).populateAll().exec(function(err,userOrganizarions) {
      if (!err && userOrganizarions){
        return cb(userOrganizarions.organizations);
      }
      else
        console.log(err);
    });
  }
};
