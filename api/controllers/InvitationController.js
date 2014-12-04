/**
 * InvitationController
 *
 * @description :: Server-side logic for managing invitations
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  accept: function(req,res){
    InvitationHelper.handleRecipientRequest(req.session.user,req.param('invitation'),function(invitation,organization){
      organization.users.add(req.session.user.id);
      organization.save(function(err,result){
        if(err) throw err;
        Invitation.destroy({id:invitation.id}).exec(console.log);
        return res.json(result);
      });
    });
  },
  decline: function(req,res) {
    InvitationHelper.handleRecipientRequest(req.session.user, req.param('invitation'), function (invitation) {
      Invitation.destroy({id: invitation.id}).exec(function (err, result) {
        return res.json(result);
      });
    });
  },
  send: function(req,res){
    var sender = req.session.user;
    var recip = req.param("recipient");
    var to = req.param("organization");
    User.findOne({name:recip}).exec(function(err,recipient){
      if(err||!recipient) {
        res.status(400);
        return res.json({message: "There is no user with this username"});
      }
      Invitation.create({sender:sender.id, recipient:recipient.id,to:to}).exec(function(err,invitation){
        if(err || !invitation) {
          res.status(400);
          return res.json({message: "Could not create invitation"});
        }
        return res.json({message: "Invitation for "+recipient.name+" was sent"});
      });
    });
  }
};
