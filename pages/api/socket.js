import { Server } from 'socket.io'

const SocketHandler = (req, res) => {
    if (res.socket.server.io) {
        console.log('Socket is already running')
    } else {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server, {
            cors: {
                origin: "*"
            }
        })
        io.listen(5000);
        res.socket.server.io = io

        io.on('connection', socket => {
            console.log('Server: Connection Established')
            socket.on('input-change', msg => {
                console.log('Server: Detected Input Change');
                socket.emit('update-input', msg)
                socket.broadcast.emit('update-input', msg)
            })
        })
    }
    res.end()
}

export default SocketHandler