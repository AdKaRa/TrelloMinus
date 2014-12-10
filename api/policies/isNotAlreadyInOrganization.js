module.exports = function(req,res,next) {
  var recipient = req.body.recipient;
  var to = req.param("organization");
  if(_.where(recipient.organizations,{id: _.parseInt(to)}) === 0) {
    return next();
  }
  res.status(400);
  return res.json({message:'User is already in this organization'});
};
