import { Server } from 'socket.io'

const handler = async function handler(req: Request, res: any) {
  if (res.socket.server.io) {
    res.end()
    return
  }

  const io = new Server(res.socket.server)

  res.socket.server.io = io

  const onConnection = (socket: any) => {
    socket.on('createdMessage', () => {
      socket.emit('newIncomingMessage', 'Message from WebSockets')
    })
  }

  io.on('connection', onConnection)

  res.end()
}

export default handler
