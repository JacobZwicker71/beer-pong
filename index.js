var express = require('express');
var app = express();
var fs = require('fs');//i might have fixed it
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on('connection', socket => {
	console.log('New socket')
})

io.on('chat', data => {
	console.log('Message sent in ' + data.name + ' bottle.')
	fs.appendFile('userData/' + data.name + '.txt', '\n' + data.uname + ': ' + data.str, () => { })
})

httpServer.listen(3000);


//hi yo
//FUCK ME why
//click ctrl shift i what? k lol 404 not found
//see the XHR GET errors?
//are you on firefox?
//yeah ESR where would it be located
//when do you get these errors? yeah do u see them?
//i tried implementing socket.io. it's long polling and every fucking time it gets a 404 error
//are you trying to access a file?
//no
//hmmmmm so what did you add that wasn't there before the error?

//is io build into node? or is it an import
//I am not familiar with imports in js so can you tell me if you need an explicit import sstatement?
//that's one way to do it; you can also use require
// the latter
//i found the import thing online
//can you try writing out an import to see  if that changes anything?
//for starters, i forgot how and I don't think it would change much. there aren't any errors on the backend, so i don't think that that specifically is the problem
//feel free to try if you want, i think it's almost the same as java

//I see that in the console it keeps spitting out the error, but is there a specific thing that causes these errors to apper or are they random?

//in theory socket.io is built off of websockets \, but in reality, it just infrequently polls the server, and that's were all the errors happen

//what server? like the replit or an external server

//oh one of the servers in the replit

//do you have the ip?

//no, but im not sure how that would help

//you could try pinging it to see if it responds/ is online

//good idea

//fuck ctrl shift v doesn't work in the shell

// type it manually//

//ok: 172.31.128.254
//we have a bigger problem (i think)
//check out index.html

//check discord



app.get('/', (req, res) => {
	res.sendFile('index.html', { root: '.' })

})//did you change this? ^^^ no


//ok cool
app.get('/style.css', (req, res) => {
	fs.readFile('style.css', (err, data) => {
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
			let username = req.url.split('?')[1]
			let isUnique = !(data + '').includes(username)
			console.log('Unique? ' + isUnique)
			fs.appendFile('userData/usernames.md', (isUnique ? (username + '\n') : (uniquify(username) + '\n')), (err, data) => {
				if (err) {
					console.log('Username c: error')
				}
				else {
					res.send(username)
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

function uniquify(uname) {
	var unique = false
	uname += '_' + alphanum(random(36)) + alphanum(random(36)) + alphanum(random(36)) + alphanum(random(36)) + alphanum(random(36));
	return uname;
}

function alphanum(num) {
	var anum = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'y', 'x', 'z']
	return anum[num - 1]
}

function random(num) {
	return Math.round(Math.random() * num)
}



//io.listen(3000)