// @flow

import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { 
  Alert,
  Modal,
  Typography 
} from 'antd'

// import AudioBtn from '../components/audio-btn'
// import Speaker from '../components/speaker'
// import HandsFreeSwitch from '../components/hands-free-switch'
// import InviteBtn from '../components/invite-btn'
// import ExitBtn from '../components/exit-btn'

const { Title } = Typography
const { confirm } = Modal

type Props = {
  changeStatusTalking: () => void,
  setupMediaConnection: (channelId:string) => Promise<void>,
  setStatusError: (message:string) => void,
  validateChannelId: ( channelId: string) => Promise<Object>,
  isRedirect: Boolean,
  match: Object,
  status: String,
  errMessage: String,
  localStream: Object,
  remoteStreams: Array<Object>,
  localVideo: Object
}

type State = {
  isCanceled: boolean,
  isValidChannelId: boolean
}

export default class Channel extends Component<Props, State> {
  state = {
    isCanceled: false,
    isValidChannelId: false
  }

  componentDidMount = async ():Promise<void> => {
    const { channelId } = this.props.match.params
    const res = await this.props.validateChannelId(channelId)

    if( res.response === 'ok' ) {
      this.setState({isValidChannelId: true})

      if( !this.props.isRedirect ) {
        this.showConfirm(channelId)
      } else {
        this.setupGroupTalk(channelId)
      }
    } else {
      this.props.setStatusError( res.reason )
    }
  }

  setupGroupTalk = async (channelId:string):Promise<void> => {
    await this.props.setupMediaConnection( channelId )
    await this.props.changeStatusTalking()
  }

  setSrcObject = (elem: Object): void => {
    if( elem )
      elem.srcObject = this.props.localStream
  }

  setRemoteObject = (elem: Object, stream: Object): void => {
    if( elem )
      elem.srcObject = stream
  }

  showConfirm = (channelId:string): void => {
    confirm({
      title: 'このグループ・トークに参加しますか？',
      okText: '参加する',
      cancelText: '参加しない',
      onOk: ():void => {
        this.setupGroupTalk(channelId)
      },
      onCancel: ():void => {
        this.setState({isCanceled: true})
      }
    })
  }
  
  handleClick = ():void => {
    this.props.changeStatusTalking()
  }

  render() {
    const channelId = this.props.match.params.channelId

    return (
      <div className="Channel">
        { this.state.isCanceled ? <Redirect to="/"/>:'' }
        <Title level={2}>channel: {channelId}</Title>
        { this.props.errMessage
        ? <Alert message={this.props.errMessage} type="error" />
        : ''}
       { this.props.localStream ? 
         (<video ref={this.setSrcObject} autoPlay />)
       :""}
       { this.props.remoteStreams.map( (stream, idx) => (
         <video 
          key={idx} 
          stream={stream}
          ref={ elem => {this.setRemoteObject(elem, stream)}} autoPlay />
       ))}
       
        status: {this.props.status} 
      </div>
    )
  }
}