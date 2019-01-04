
var id = window.location.pathname.split("/")[2];

var xhttp = new XMLHttpRequest();

var elements = {
  username: document.getElementById("username"),
  text: document.getElementById("text"),
  link: document.getElementById("link")
};

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       var json = JSON.parse(xhttp.responseText);
       document.title = json.user + ": " +  json.text;
       elements.username.innerText = json.user;
       elements.text.innerText = json.text;
       if (json.link) {
         elements.link.href = json.link;
         elements.link.innerText = json.link;
       } else {
         elements.link.remove();
       }
       
    }
};

xhttp.open("GET", id+"/json", true);
xhttp.send();
