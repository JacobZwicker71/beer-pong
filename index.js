//vars I WILL ADD GOOD DOCUMENTATION IF IT KILLS ME, cool
//don't judge, i just startedish
//dw I got no idea what you are doing
//sick
//want me to explain shit?

var express = require('express');
var app = express();
var fs = require('fs');
var server = require('http');
var { Server } = require('socket.io')
var io = new Server(server)
	
app.get('/', (req, res) => {
  fs.readFile('index.html', (err, data) => {
    if (err) {
      console.log(err + '')
    }
    else {
      res.send(data)
    }
  })
})

app.get('/login', (req, res) => {
  var name = req.url.split('?')[1].split('+')[0]
  var password = req.url.split('+')[1]
  fs.readFile(name + '.txt', (err, data) => {
    data = data + ''
    if (err) {
      fs.writeFile(name + '.txt', `password: ${password}`, (err, data) => {
        if (err) {console.log('New account err: ' + err)}//something's fucked | (eli)borate? ha-lirious | the client doesn't register the creation of a new 'bottle' | is it because you are trying to put it in a txt file with the name of ... "name".txt? should'nt it just be that Rye.txt and then you input name?| mebe | this.responseText is the data inside the "bottle" | where do you declare responseText? (ps we need a better way of communicating) | look in the chat
      })
    }
    else if (password == 'password') {
      res.send(data.substr(data.split('\n')[0].length, data.length))
    }
  })
})

app.listen(1080);
