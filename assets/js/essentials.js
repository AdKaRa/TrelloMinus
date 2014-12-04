/* STARRING */

function toggleStar(elem) {
  var starSpan = elem.childNodes[0];
  if(starSpan.className.contains("empty")){
    starSpan.className = "glyphicon glyphicon-star";
  }
  else {
    starSpan.className = "glyphicon glyphicon-star-empty";
  }
}

function toggleStareBoard(elem) {
  var boardHash = elem.dataset["hash"];
  io.socket.get(boardHash+'/stare',
    function(res,jres){
      if(jres.statusCode === 200) {
        toggleStar(elem);
      }
    });
}

function acceptInvitation(id,elem) {
  io.socket.post('/invitation/accept',{invitation:id},function(res,jres){
    if(res.message) {
      alert(res.message);
    }
    if(jres.statusCode === 200) {
      location.reload();
    }
  });
}

function refuseInvitation(id,elem) {
  io.socket.post('/invitation/decline',{invitation:id},function(res,jres){
    if(res.message) {
      alert(res.message);
    }
    if(jres.statusCode === 200) {
      $(elem).parent().parent().remove();
      if($("#invitation-list").children().length === 0) {
        $("#invitation-pending").remove();
      }
    }
  });
}

$('.dropdown-toggle').dropdown();
