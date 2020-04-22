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
  setMangaObj,
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
const apikey = '18e81fae-027a-4ca9-a9e8-17d348a917f5'
const mangaManager = 'http://localhost:3001/channels'

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

      const url = `${mangaManager}/${channelId}`
      const params = { peerId: peerid }
      
      setInterval( _ => {
        fetch( url, {
          'method': 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify( params )
        }).then( res => res.text())
        .then( txt => console.log( txt ))
      }, 5000 ) // every 5 sec

      // todo - mute処理
      const stream = await getLocalStream()
      const manga = new Manga()

      dispatch( setMangaObj(manga) )
      await manga.start( stream )

      // todo - check kind is `audio`
      const track = stream.getAudioTracks()[0]
      manga.stream.addTrack(track)

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
    changeShowImage: _ => {
      const { app } = window.getState()
      const { mangaObj } = app
      mangaObj.showImage = true
      setTimeout( _ => {
        mangaObj.showImage = false
      }, 1200)
    },
    changeStatusTalking: _ => {
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