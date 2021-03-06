// @flow

import { connect } from 'react-redux'
import Generate from '../routes/generate'
import {
  changeStatusReady,
  changeStatusGenerating,
  changeStatusGenerated,
  setChannelId,
  setChannelList
} from '../states/generate-store'
import {
  setRedirectFlag
} from '../states/global-store'

const api = 'https://3ultgd8q23.execute-api.ap-northeast-1.amazonaws.com/dev'
const mangaManager = 'https://manga-manager.m-pipe.net/channels'
// const mangaManager = 'http://localhost:3001/channels'

const mapStateToProps = ( state: Object, ownProps: Object): Object => {
  return Object.assign({}, state.generate, {
    isRedirect: state.global.isRedirect
  })
}

const mapDispatchToProps = ( dispatch: function): Object => {
  return {
    changeStatusReady: () => {
      dispatch( changeStatusReady() )
    },
    generateChannelId: async () => {
      dispatch( changeStatusGenerating() )

      const url = `${api}/push2talk/channel`
      const obj = await fetch(url, {method: 'POST'})
        .then( res => res.json())

      dispatch( changeStatusGenerated() )
      dispatch( setChannelId( obj.channelId) )
      dispatch( setRedirectFlag() )
    },
    getChannelList: async _ => {
      const list = await fetch( mangaManager ).then( res => res.json() )
      dispatch( setChannelList( list ))
    }
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(Generate)