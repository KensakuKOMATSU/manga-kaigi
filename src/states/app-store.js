export const STATUS = {
  INIT:    'INIT',
  READY:   'READY',
  TALKING: 'TALKING',
  ERROR:   'ERROR'
}

const TYPES = {
  CHANGE_STATUS:    'APP_CHANGE_STATUS',
  SET_ERROR:        'APP_SET_ERROR',
  SET_LOCAL_STREAM: 'APP_SET_LOCAL_STREAM',
  SET_REMOTE_STREAM: 'APP_SET_REMOTE_STREAM',
  REMOVE_REMOTE_STREAM: 'APP_REMOVE_REMOTE_STREAM',
  SET_DUMMY_STREAM: 'APP_SET_DUMMY_STREAM',
  SET_CHANNEL_ID:   'APP_SET_CHANNEL_ID',
  SET_PEER_OBJ:     'APP_SET_PEER_OBJ',
  SET_LOCAL_ID:     'APP_SET_LOCAL_ID',
  SET_ROOM_OBJ:     'APP_SET_ROOM_OBJ',
}

const initState = {
  status: STATUS.INIT,
  errMessage: '',
  localStream: null,
  dummyStream: null,
  remoteStreams: [],
  channelId: '',
  peerObj: null,
  localId: '',
  roomObj: null
}

type Action = {
  type: string,
  payload: any
}

type Peer = {}
type MeshRoom = {}

////////////////////////////////////////////////////////////////////
// Definitions of Action
////////////////////////////////////////////////////////////////////
export const changeStatusReady = (): Action => {
  return {
    type: TYPES.CHANGE_STATUS,
    payload: STATUS.READY
  }
}

export const changeStatusTalking = (): Action => {
  return {
    type: TYPES.CHANGE_STATUS,
    payload: STATUS.TALKING
  }
}

export const setStatusError = (message:string):Action => {
  return {
    type: TYPES.SET_ERROR,
    payload: message
  }
}

export const setLocalStream = (stream:MediaStream):Action => {
  return {
    type: TYPES.SET_LOCAL_STREAM,
    payload: stream
  }
}

export const setRemoteStream = (stream:MediaStream):Action => {
  return {
    type: TYPES.SET_REMOTE_STREAM,
    payload: stream
  }
}

export const removeRemoteStream = (peerId:String):Action => {
  return {
    type: TYPES.REMOVE_REMOTE_STREAM,
    payload: peerId
  }
}



export const setDummyStream = (stream:MediaStream):Action => {
  return {
    type: TYPES.SET_DUMMY_STREAM,
    payload: stream
  }
}

export const setChannelId = (channelId:string):Action => {
  return {
    type: TYPES.SET_CHANNEL_ID,
    payload: channelId
  }
}

export const setPeerObj = (peer:Peer):Action => {
  return {
    type: TYPES.SET_PEER_OBJ,
    payload: peer
  }
}

export const setLocalId = (peerid:string):Action => {
  return {
    type: TYPES.SET_LOCAL_ID,
    payload: peerid
  }
}

export const setRoomObj = (room:MeshRoom):Action => {
  return {
    type: TYPES.SET_ROOM_OBJ,
    payload: room
  }
}

////////////////////////////////////////////////////////////////////
// Reducer
////////////////////////////////////////////////////////////////////
export default ( state: Object = initState, action: Object ): Object => {
  switch( action.type ) {
  case TYPES.CHANGE_STATUS:
    return Object.assign( {}, state, { status: action.payload })
  case TYPES.SET_LOCAL_STREAM:
    return Object.assign( {}, state, { localStream: action.payload } )
  case TYPES.SET_REMOTE_STREAM:
    state.remoteStreams.push( action.payload )
    return Object.assign({}, state, {
      remoteStreams: state.remoteStreams.concat()
    })
  case TYPES.REMOVE_REMOTE_STREAM:
    return Object.assign({}, state, {
      remoteStreams: state.remoteStreams
        .filter(s => s.peerId !== action.payload)
    })
  case TYPES.SET_DUMMY_STREAM:
    return Object.assign( {}, state, { dummyStream: action.payload } )
  case TYPES.SET_CHANNEL_ID:
    return Object.assign( {}, state, { channelId: action.payload } )
  case TYPES.SET_PEER_OBJ:
    return Object.assign( {}, state, { peerObj: action.payload } )
  case TYPES.SET_LOCAL_ID:
    return Object.assign( {}, state, { localId: action.payload } )
  case TYPES.SET_ROOM_OBJ:
    return Object.assign( {}, state, { roomObj: action.payload } )
  case TYPES.SET_ERROR:
    return Object.assign( {}, state, { status: STATUS.ERROR, errMessage: action.payload })
  default:
    return state
  }
}