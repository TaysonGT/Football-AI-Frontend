import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'


const socket = io('http://locahost:3000',
    {
        transports: ['websocket'],
        cors: {
            origin: "http://localhost:5173"
        }

    }
)

export default function Test() {
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    socket.on('connect', (data) => {
      console.log(data)
      setIsConnected(true)
    })

    socket.on('disconnect', (data) => {
      console.log(data)
      setIsConnected(false)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <>
      <p>WebSocket: {'' + isConnected.toString()}</p>
    </>
  )
}