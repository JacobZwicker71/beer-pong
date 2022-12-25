var express = require('express');//hola
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

app.get('/scanUsernames', (req, res) => {
  console.log('A')
  fs.readFile('userData/usernames.md', (err, data) => {
    console.log('B')
    if (err) {
      console.log('uname1 error')
    }
    else {
      console.log('Ca')
      let username = req.url.split('?')[1]
      console.log('Cb')
      let isUnique = !(data + '').includes(username)
      console.log('Cc')
      console.log(isUnique)
      console.log('Cd')
      fs.appendFile('userData/usernames.md', username, (err, data)=>{
        console.log('Ce')
        if (err) {
          console.log('C: error')
        }
        else {
          res.send(isUnique ? username : uniquify(username))
          console.log('C: success')
        }
      })
    }
  })
})

app.get('/login', (req, res) => {
  console.log('1')
	var name = req.url.split('?')[1].split('+')[0]
	var password = req.url.split('+')[1]
	fs.readFile("userData/" + name + '.txt', (err, data) => {
    console.log('2')
		data = data + ''
		if (err) {
      console.log('2a')
			fs.writeFile("userData/" + name + '.txt', `password: ${password}`, (err, data) => {
				if (err) {
          console.log('New bottle err: ' + err)
        }
        res.send('')
			})
		}
		else if (password == data.split('password: ')[1].split('\n')[0]) {
      console.log('2b')
      data = data.split('\n')
      data.shift()
			res.send(data.join('\n'))
		}
	})
})

app.listen(1080);

function uniquify (uname) {
  var unique = false
  var random
  while (!unique) {
    uname += alphanum(random(36)) + alphanum(random(36)) + alphanum(random(36)) + alphanum(random(36)) + alphanum(random(36))
  }

}

function alphanum (num) {
  var anum = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'y', 'x', 'z']
  return anum[num - 1]
}

function random(num) {
  Math.round(Math.random() * num)
}