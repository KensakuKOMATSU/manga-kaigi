import { connect } from 'react-redux'
import Channel from '../routes/channel'

import {
  changeStatusTalking,
  setLocalStream,
  setRemoteStream,
  removeRemoteStream,
  setChannelId,
  setPeerObj,
  setLocalId,
  setRoomObj,
  setStatusError
} from '../states/app-store'

import Manga from '../libs/Manga'

import {
  getLocalStream,
} from '../libs/audio-manager'

import {
  connectSkyWay,
  joinMeshRoom,
} from '../libs/skyway-manager'

const api = 'https://3ultgd8q23.execute-api.ap-northeast-1.amazonaws.com/dev'
const apikey = 'fac69356-9c3d-45d4-9a10-2b4bcdaca3b3'

// fixme
type DispatchProps = {
  changeStatusTalking: () => {},
  changeStatusTalking: () => {}
}

/**
 * map state to props
 * todo - define type of object which will be returned
 * 
 * @param {object} state 
 * @param {object} ownProps 
 */
const mapStateToProps = ( state: Object, ownProps: Object ): Object => {
  return Object.assign({}, state.app, {
    isRedirect: state.global.isRedirect
  })
}

/**
 * map dispatch to props
 * 
 * @param {function} dispatch 
 */
const mapDispatchToProps = (dispatch: function): DispatchProps => {
  return {
    validateChannelId: async (channelId:string):Promise<Object> => {
      const url = `${api}/push2talk/channel/${channelId}`
      const res = await fetch(url)
        .then( res => res.json())
        .catch( err => {
          return {
            response: 'ng',
            reason: err.message
          }
        })

      return res
    },
    setupMediaConnection: async (channelId:string):Promise<void> => {
      dispatch( setChannelId( channelId ))

      const { peer, peerid } = await connectSkyWay(apikey, 0) 
      dispatch( setPeerObj( peer ))
      dispatch( setLocalId( peerid ))

      // todo - mute処理
      const stream = await getLocalStream()
      const manga = new Manga()
      await manga.start( stream )
      dispatch( setLocalStream( manga.stream ) )

      const room = joinMeshRoom(peer, channelId, manga.stream) 
      dispatch( setRoomObj( room ))

      room.on('open', () => {
        console.log('room opened')
      })

      room.on('stream', stream => {
        console.log( stream, 'added')
        dispatch( setRemoteStream(stream) )
      })

      room.on('peerLeave', id => {
        console.log(`${id} left this room`)
        dispatch( removeRemoteStream(id) )
      })
    },
    changeStatusTalking: async _ => {
      dispatch( changeStatusTalking() )
    },
    setStatusError: (message: string):void => {
      dispatch( setStatusError(message) )
    }
  }
}

/////////////////////
// bind react and redux
export default connect( mapStateToProps, mapDispatchToProps )(Channel)