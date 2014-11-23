/**
 * CommentController
 *
 * @description :: Server-side logic for managing Comments
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	add: function(req,res) {
		var user = req.session.user;
	    var content = req.param("content");
	    var cardId = req.param("card");
	    Comment.create({username: user.name, user: user.id, content: content, card: cardId}).exec(function(err,card){
	     	var result = {};
			if(err) {
				res.status(400);
				result = err;
			}
			else result = card;
			return res.json(result);
	    });
	}
};