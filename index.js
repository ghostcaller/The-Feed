
console.clear = function(){console.log('\033[2J');};

console.clear();

/*----------------------------------------*/

//opening art

console.log(`\x1b[32m\x1b[40m  _______ _            ______            _
 |__   __| |          |  ____|          | |
    | |  | |__   ___  | |__ ___  ___  __| |
    | |  | '_ \\ / _ \\ |  __/ _ \\/ _ \\/ _\` |
    | |  | | | |  __/ | | |  __/  __/ (_| |
    |_|  |_| |_|\\___| |_|  \\___|\\___|\\__,_|
                                           
                                           \x1b[0m`);


/*----------------------------------------*/

console.log("Initialising DB...");

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

console.log("Initialising WebServer...");

const app = require('express')();
const http = require('http').Server(app);

const fs = require('fs');

const website = require('./website.js')(db);

/*----------------------------------------*/



/*----------------------------------------*/

var noFileNoSpam; //prevents spamming of non-existant file dialog

app.get('/eat', function(req, res){
  res.sendFile(__dirname + '/www/eat/index.html');
});

app.get('/post/*/json', function(req, res){
  try {
    var id = parseInt(req.path.slice(6,-5));
    res.status(200);
    res.send(JSON.stringify({user:"sprinkleton",text:"Hello Everyone!"}));
  } catch (e) {
    
  }
});

app.get('/post/script.js', function(req, res){
  res.sendFile(__dirname + '/www/post/script.js');
});

app.get('/post/*', function(req, res){
  res.sendFile(__dirname + '/www/post/index.html');
});

app.get('*', function(req, res){
    if (fs.existsSync(__dirname + '/www'+req.url)) {
      res.sendFile(__dirname + '/www'+req.url);
    } else {
      var string = "A user tried to access non-existant file '"+req.url+"'";
      if (noFileNoSpam!=string){
        noFileNoSpam = string;
        console.log(string);
      }
      res.status(404);
      res.send("No File: '"+req.url+"'");
    }
});

http.listen(80, function(){
  console.log('listening on *:80');
});