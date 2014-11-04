/**
* List.js
*
* @description :: List contains tasks
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: "string"
    },
    board: {
      model: "board"
    }
  }
};

