/**
 * BoardHelper
 *
 * @description :: Bunch of function to help with boards
 *
 */

HASHID_SALT = "this is not funny anymore";
BOARD_URL_PREFIX = '/b/';

var Hashids = require("hashids");
var hashId = new Hashids(HASHID_SALT);


module.exports = {

  TYPES: {
    PRIVATE_BOARD: "private",
    PUBLIC_BOARD: "public",
    SHARED_BOARD: "shared"
  },
  encodeBoardHash : function(id){
    return hashId.encode(id);
  },

  decodeBoardHash : function(hash) {
    return hashId.decode(hash);
  },

  getBoardURL : function(id,title) {
    var cleanTitle = title.replace(/[^A-Za-z0-9 ]/g,'').replace(/\s/g, "-").toLowerCase();
    var hash = this.encodeBoardHash(id);
    return BOARD_URL_PREFIX+hash+'/'+cleanTitle;
  },

  getBoardByHashedId: function(hash,cb) {
    var boardId = this.decodeBoardHash(hash);
    Board.findOne({id: boardId}).populateAll().exec(function(err,board){
      if(err) throw err;
      return cb(board);
    });
  },
  isStarredBoard: function(user,board) {
    return (_.where(board.starredBy,{id:user.id})).length !== 0;
  }

};
