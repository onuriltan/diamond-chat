import { Server, Socket } from 'socket.io';

export class ChatController {

    private rooms: Object = {};    // map socket.id => room
    private names: Object = {};    // map socket.id => name
    private queue: Array<Socket> = [];

    public chat(io: Server) {
        let onConnect = (socket: Socket) => {
            socket.on('SEND_MESSAGE', function (data: { user: string; message: string; }) {
                socket.broadcast.emit('SEND_MESSAGE', (data))
            });
            socket.on('LOGIN', (data: any) => {
                console.log('Login requested from ' + data, socket.id);
                socket.emit('LOGIN_RESPONSE', {message: "Please wait for a random stranger", type: 0});
                this.findPeerForLoneSocket(socket);
            });
            socket.on('CHAT_MESSAGE', (data: any) => {
                socket.broadcast.to(data.room).emit('CHAT_MESSAGE', data.message)
            });
            socket.on('TYPING', (data: any) => {
                socket.broadcast.to(data.room).emit('TYPING', data)
            });
            socket.on('TYPING_STOPPED', (data: any) => {
                socket.broadcast.to(data.room).emit('TYPING_STOPPED', data)
            });
            socket.on('DISCONNECT', () => {
                // @ts-ignore
                let room = this.rooms[socket.id];
                socket.leave(room);
                console.log("disconnect");
                socket.broadcast.to(room).emit('CHAT_END');
                console.log('Chat ended')
                const index = this.queue.indexOf(socket, 0);
                if (index > -1) {
                    this.queue.splice(index, 1);
                }
            });
            socket.on('disconnect', () => {
                // @ts-ignore
                let room = this.rooms[socket.id];
                console.log("disconnect");
                socket.broadcast.to(room).emit('CHAT_END');
                console.log('Chat ended')
            })
        };
        io.on('connect', onConnect);
    }

    private findPeerForLoneSocket(socket: Socket) {

        if (this.queue.length > 0) {
            // somebody is in queue, pair them!
            let samePerson = false;
            for (let oneOfPeer of this.queue) {
                if (oneOfPeer.id === socket.id) {
                    samePerson = true;
                }
            }
            if (!samePerson) {
                let peer: any = this.queue.pop();
                let room = socket.id + '#' + peer.id;
                // join them both
                peer.join(room);
                socket.join(room);
                // register rooms to their names
                // @ts-ignore
                this.rooms[peer.id] = room;
                // @ts-ignore
                this.rooms[socket.id] = room;
                // exchange names between the two of them and start the chat
                // @ts-ignore
                peer.emit('CHAT_START', {'name': this.names[socket.id], 'room': room});
                // @ts-ignore
                socket.emit('CHAT_START', {'name': this.names[peer.id], 'room': room});
                console.log("Chat is in room " + room);

            }
        }else {
            // queue is empty, add our lone socket
            this.queue.push(socket)
        }
    }

}
