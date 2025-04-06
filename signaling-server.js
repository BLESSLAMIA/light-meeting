const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const rooms = {}; // 存储房间内的用户

wss.on('connection', socket => {
    socket.on('message', message => {
        const data = JSON.parse(message);

        switch (data.type) {
            case 'join':
                const room = data.room;
                if (!rooms[room]) rooms[room] = [];
                rooms[room].push(socket);
                socket.room = room;

                if (rooms[room].length === 2) {
                    rooms[room].forEach(s => s.send(JSON.stringify({ type: 'ready' })));
                }
                break;

            case 'signal':
                const peers = rooms[socket.room];
                if (peers) {
                    peers.forEach(s => {
                        if (s !== socket) {
                            s.send(JSON.stringify({
                                type: 'signal',
                                data: data.data
                            }));
                        }
                    });
                }
                break;

            case 'chat':
                const roomChat = rooms[socket.room];
                if (roomChat) {
                    roomChat.forEach(s => {
                        if (s !== socket) {
                            s.send(JSON.stringify({ type: 'chat', text: data.text }));
                        }
                    });
                }
                break;
        }
    });

    socket.on('close', () => {
        const room = socket.room;
        if (room && rooms[room]) {
            rooms[room] = rooms[room].filter(s => s !== socket);
            if (rooms[room].length === 0) delete rooms[room];
        }
    });
});

console.log('🔌 Signaling server running at ws://localhost:8080');
