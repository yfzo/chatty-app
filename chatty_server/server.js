const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4');
const randomColor = require('randomcolor');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

SocketServer.prototype.broadcast = function(msg) {
    this.clients.forEach((client) => {
        if (client.readyState === 1) {
            client.send(JSON.stringify(msg));
        }
    });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
    console.log('Client connected');
    let numOfUsersOn = wss.clients.size;
    wss.broadcast({usersNum: numOfUsersOn});
    
    const userId = uuid();
    const color = randomColor();
    // const smth = 'hi';
    // ws.send(JSON.stringify({id: userId, color: color, smth: smth}));
    // console.log(userId, color);

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => {
        console.log('Client disconnected');
        wss.broadcast({usersNum: wss.clients.size});
    });

    ws.onmessage = evt => {
        const msg = JSON.parse(evt.data);
        console.log(`User ${msg.user} said ${msg.content}`);

        msg.id = uuid();
        msg.color = color;

        switch(msg.type) {
            case 'postMessage':
                msg.type = 'incomingMessage';
                break;
            case 'postNotification':
                msg.type = 'incomingNotification';
                break;
        }
        console.log('msg:', msg)
        // wss.clients.forEach(function each(client) {
        //     if (client.readyState === 1) {
        //         // console.log(msg);
        //         client.send(JSON.stringify(msg));
        //     }
        // })
        wss.broadcast(msg);
    }
});