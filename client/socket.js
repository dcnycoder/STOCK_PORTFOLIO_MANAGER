//NOT THE ONE RESPONSIBLE FOR SOCKET LAUNCH
import io from 'socket.io-client'
console.log('Here was supposed to be a socket connection')
const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
