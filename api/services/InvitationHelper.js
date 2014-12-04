/**
 * InvitationHelper
 *
 * @description :: Server-side logic for helping with invitations
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {

  handleRecipientRequest: function(recipient,invitation,cb){
    Invitation.findOne({id: invitation}).populateAll().exec(function(err,inv){
      Organization.findOne({id:inv.to.id}).exec(function(err,org){
        if(err || !inv || !org) throw err;
        if(inv.recipient.id === recipient.id){
          cb(inv,org);
        }
      });
    });
  }
};
