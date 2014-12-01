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
