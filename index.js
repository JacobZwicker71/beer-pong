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

app.get('/')

app.get('/login', (req, res) => {
  console.log('1')
	var name = req.url.split('?')[1].split('+')[0]
	var password = req.url.split('+')[1]
	fs.readFile("userData/" + name + '.txt', (err, data) => {
    console.log('2')
		data = data + ''
		if (err) {// maybe i fixed it
      //console.log(err + '')\
      console.log('2a')
			fs.writeFile("userData/" + name + '.txt', `password: ${password}`, (err, data) => {
        
				if (err) { console.log('New bottle err: ' + err) }//my bad
        res.send('')
			})
		}
		else if (password == data.split('password: ')[1].split('\n')[0]) {
      console.log('2b')
      data = data.split('\n')
      data.shift()
			res.send(data.join('\n'))//what happened? | ? | my bad, one should never return an Error object
			console.log('blah')//only one problem now, i fixed the others
      //you were right, i don't think err is returning what i thought it was
		}
	})
})

app.listen(1080);