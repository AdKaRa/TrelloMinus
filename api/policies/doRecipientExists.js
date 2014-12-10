module.exports = function(req,res,next) {
  var recip = req.param('recipient');
  User.findOne({name:recip}).populate('organizations').exec(function(err,recipient) {
    if (err || !recipient) {
      res.status(400);
      return res.json({message: "There is no user with this username"});
    }
    req.body.recipient = recipient;
    return next();
  });
};
