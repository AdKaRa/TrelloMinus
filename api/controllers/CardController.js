/**
 * CardController
 *
 * @description :: Server-side logic for managing Cards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	edit: function(req,res) {
		var id = req.param("id");
		var title = req.param("title");
		var desc = req.param("description");
		Card.update({id:id},{title:title,description:desc}).exec(function(err,updated){
			var result = {};
			if(err) result = err;
			else result = updated;
			return res.json(result);
		});
	},
	get: function(req,res) {
		var id = req.param("id");
		Card.findOne({id:id}).exec(function(err,card){
			if(err || !card) console.log(err,"nope");
			else
				CommentHelper.getCommentsByCard(card,function(comments){
					return res.json({card:card, comments:comments});
				});
		});
	}
};