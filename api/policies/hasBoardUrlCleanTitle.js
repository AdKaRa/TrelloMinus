module.exports = function(req,res,next) {
    if(!req.param('title')) 
    	return res.redirect(BoardHelper.getBoardURL(boardId,board.title));

    return next();
};