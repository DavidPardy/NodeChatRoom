window.onload = function() {
  var messages = [];
  var socket = io.connect('http://safe-forest-9485.herokuapp.com');
  var field = document.getElementById("field");
  var sendButton = document.getElementById("send");
  var content = document.getElementById("content");
  var name = document.getElementById("name");

  socket.on('message', function (data) {
    if(data.message) {
      messages.push(data);
      var html = '';
      for(var i=0; i<messages.length; i++) {
        html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
        html += messages[i].message + '<br />';
      }
      content.innerHTML = html;
    }
    else {
      console.log("There is a problem: ", data);
    }
  });

  $("#name").focus();

  sendButton.onclick = function() {
    if(name.value == "") {
      //do nothing
    }
    else {
      var text = field.value;
      socket.emit('send', { message: text, username: name.value });
    }
  };

  $("#field").keyup(function(e) {
    if(e.keyCode == 13) {
      var text = field.value;
      socket.emit('send', { message: text, username: name.value });
      $('#field').val('');
    }
    else {
      //do nothing
    }
  });
  var objDiv = document.getElementById("content");
  objDiv.scrollTop = objDiv.scrollHeight;
}

