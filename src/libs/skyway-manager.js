// @flow

import Peer from 'skyway-js'

// to avoid flow error
type MeshRoom = {}

type ConnectRes = {
  peer: Peer,
  peerid: string
}

export const connectSkyWay = ( apikey:string, logLevel:number = 1 ): Promise<ConnectRes> => {
  return new Promise( (resolve: function, reject: function) => {
    const peer = new Peer( {key: apikey, debug: logLevel} )

    peer.once('open', (id:string):void => {
      resolve( { peer, peerid: id } )
    })

    peer.once('error', (err:Error):void => {
      reject( err )
    })
  })
}

export const joinMeshRoom = ( 
  peer:Peer, 
  roomName:string, 
  stream:MediaStream 
):MeshRoom => {
  const room = peer.joinRoom( roomName, {
    mode: 'mesh',
    stream
  })
  // todo - set event handler of `room`

  return room
}