// @flow

import React, { Component } from 'react'
import { 
  Button,
  Typography
} from 'antd'
import { Redirect } from 'react-router-dom'

const { Title } = Typography

type Props = {
  status: string,
  channelId: string,
  channelList: Object,
  changeStatusReady: () => {},
  generateChannelId: () => {},
  getChannelList: () => {}
}

export default class Generate extends Component<Props> {
  componentDidMount() {
    this.props.changeStatusReady()
  }

  handleClick = async () => {
    await this.props.generateChannelId()
  }

  getChannelList = async _ => {
    await this.props.getChannelList()
  }

  render() {
    const redirectPath = `/channels/${this.props.channelId}`
    return (
      <div className="Generate">
        { this.props.channelId.length > 0 ? <Redirect push to={redirectPath} />: '' }
        <Title level={1}>Generate</Title>
        <div>
          <Button type="primary" shape="circle" onClick={this.handleClick}
            style={{width: 80, height: 80, fontSize: "3em"}}>+</Button>
        </div>
        <div>
          <Button type="default" onClick={this.getChannelList}>get Channel List</Button>
        </div>
        <div>STATUS: {this.props.status}</div>
        {/* todo - component 化 */}
        {
          Object.entries(this.props.channelList).map(( [channelId, peers], idx ) => {
            const url = `/channels/${channelId}`
            const _peers = peers.map( item => item.peerId ).join(",")
            return (  <span key={idx}>
              <a href={url}>{channelId}</a>:
              # of particepant: <span>{peers.length}</span>,
              <span>{_peers}</span>
            </span>
            )
          }
        )}
      </div>
    )
  }
}