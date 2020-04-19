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
  changeStatusReady: () => {},
  generateChannelId: () => {}
}

export default class Generate extends Component<Props> {
  componentDidMount() {
    this.props.changeStatusReady()
  }

  handleClick = async () => {
    await this.props.generateChannelId()
  }

  render() {
    const redirectPath = `/channels/${this.props.channelId}`
    return (
      <div className="Generate">
        { this.props.channelId.length > 0 ? <Redirect push to={redirectPath} />: '' }
        <Title level={1}>Generate</Title>
        <div>
          <Button type="primary" onClick={this.handleClick}>トランシーバーグループを作る</Button>
        </div>
        <div>STATUS: {this.props.status}</div>
        <div>channelId: {this.props.channelId}</div>
      </div>
    )
  }
}