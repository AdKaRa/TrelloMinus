module.exports = {
	getCommentsByCard: function(card,cb) {
		Comment.find({card:card.id}).exec(function(err,comments){
			if(!err && comments){
		        return cb(comments);
		      }
		      else {
		        console.log(err);
		      }
		});
	}
};