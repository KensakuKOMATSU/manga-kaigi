// @flow

import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { 
  Alert,
  Button,
  Modal,
  Typography,
  Row,
  Col,
  Card
} from 'antd'
import MyVideo from '../components/myVideo'

// import AudioBtn from '../components/audio-btn'
// import Speaker from '../components/speaker'
// import HandsFreeSwitch from '../components/hands-free-switch'
// import InviteBtn from '../components/invite-btn'
// import ExitBtn from '../components/exit-btn'

const { Title } = Typography
const { confirm } = Modal
const { Meta } = Card

type Props = {
  changeShowImage: () => void,
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
    this.props.changeShowImage()
  }

  render() {
    const channelId = this.props.match.params.channelId
    const num = this.props.remoteStreams.length + 1

    return (
      <div className="Channel">
        { this.state.isCanceled ? <Redirect to="/"/>:'' }
        <Title level={2}>channel: 
          <a href={`/channels/${channelId}`} 
            target="_blank" 
            rel="noopener noreferrer">
              {channelId}
          </a>
        </Title>
        { this.props.errMessage
        ? <Alert message={this.props.errMessage} type="error" />
        : ''}
        <Row>
          {/* todo - component化 */}
       { this.props.localStream ? 
          (
            <Col span={24 / num}>
              <Card
                style={{ width: "100%" }}
                hoverable
                cover={<MyVideo stream={this.props.localStream} />}
              >
                <Meta title="foo" description="bar"/>
              </Card>
            </Col>
          )
       :""}
          {/* todo - component化 */}
       { this.props.remoteStreams.map( (stream, idx) => (
           <Col span={24 / num} key={idx}>
             <Card
               style={{ width: "100%" }}
               hoverable
               cover={ <MyVideo stream={stream} /> }
             >
               <Meta title="hoge" description="fuga" />
             </Card>
           </Col>
       ))}
        </Row>
       <Button 
         shape="circle" 
         type="danger" 
         style={{width: 120, height: 120, fontSize: "1.2em"}}
         onClick={this.handleClick}
       >カンパイ！</Button>
       <br />
       
        status: {this.props.status} 
      </div>
    )
  }
}