import {ChatServer} from "../../main/app";
import {Server} from 'socket.io';

export default class ChatController {

    public static chat(io: Server) {

        io.on('connect', (socket: any) => {
            console.log('Connected socket client on port %s.', ChatServer.PORT);

            socket.on('SEND_MESSAGE', function (data: { user: string; message: string; }) {
                console.log("ID: " + socket.id + " Name: " + data.user, " Message: " + data.message);
                socket.broadcast.emit('SEND_MESSAGE', (data))
            });
            socket.on('CREATED', (data: any) => {
                console.log(data)
                socket.broadcast.emit('CREATED', data)
            });
            socket.on('CHAT_MESSAGE', (data: any) => {
                socket.broadcast.emit('CHAT_MESSAGE', data)
            });
            socket.on('TYPING', (data: any) => {
                socket.broadcast.emit('TYPING', data)
            });
            socket.on('TYPING_STOPPED', (data: any) => {
                socket.broadcast.emit('TYPING_STOPPED', data)
            });
            socket.on('disconnect', () => {
                console.log('disconnected')
            })
        });
    }

}
