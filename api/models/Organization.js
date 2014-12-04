/**
* Organization.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: "string",
      required: true,
      unique: true
    },
    users: {
      collection: 'user',
      via: 'organizations',
      dominant: true
    },
    boards: {
      collection: 'board',
      via: 'organization'
    },
    invitations: {
      collection: 'invitation',
      via: 'to'
    }
  }
};

