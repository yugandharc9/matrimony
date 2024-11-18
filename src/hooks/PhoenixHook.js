import React, { createContext, useContext, useEffect,useReducer,useState } from 'react';
import PropTypes from 'prop-types';
import { Socket } from 'phoenix';
import { useAuth } from '../comps/auth/authctx';

const SocketContext = createContext();

//export const useChannel = () => useContext(SocketContext);

export const SocketProvider = ({wsUrl,  children}) => {
  const {token} = useAuth();
  const socket = new Socket(wsUrl, { params: {token: token} })

  useEffect(() => { console.log('useEffect of SocketProvier - '); socket.connect(); }, [token, wsUrl])

  return (
    <SocketContext.Provider value={socket}>
      { children }
    </SocketContext.Provider>
   )
 }

SocketProvider.propTypes = {
  wsUrl: PropTypes.string.isRequired,
}


export const useChannel = (channelTopic, reducer, initialState,token,userId) => {
  const socket = useContext(SocketContext)
  const [state, dispatch] = useReducer(reducer, initialState)
  const [broadcast, setBroadcast] = useState(mustJoinChannelWarning)

  useEffect(() => (
    joinChannel(socket, channelTopic, dispatch, setBroadcast,token,userId)
  ), [channelTopic])

  return [state, broadcast]
}

const joinChannel = (socket, channelTopic, dispatch, setBroadcast,token,userId) => {
  const channel = socket.channel(channelTopic, {client: `browser${userId}`, token: token})

  channel.onMessage = (event, payload) => {
    dispatch({ event, payload })
    return payload
  }

  channel.join()
    .receive("ok", ({messages}) =>  console.log(`Successfully joined channel ${channelTopic}`, messages || ''))
    .receive("error", ({reason}) => console.error(`Failed to join channel ${channelTopic}`, reason))

  setBroadcast(() => channel.push.bind(channel))

  return () => {
    channel.leave()
  }
}

const mustJoinChannelWarning = () => (
  () => console.error(`useChannel broadcast function cannot be invoked before the channel has been joined`)
)
