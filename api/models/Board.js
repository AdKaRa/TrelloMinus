/**
* Board.js
*
* @description :: Board is the place where you can manage your lists
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    title:{
      type: "string",
      required: true
    },
    owner: {
      model: "user",
      required: true
    },
    lists: {
      collection: "list",
      via: "board"
    },
    type: {
      type: "string",
      enum: ["public", "shared", "private"],
      defaultsTo: "private"
    },
    starredBy: {
      collection: 'user',
      via: 'starredBoards'
    }
  }
};

