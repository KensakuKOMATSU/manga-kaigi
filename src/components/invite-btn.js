// @flow

import React, { Component } from 'react'
import type { Node } from 'react'
import { Button, Icon } from 'antd'


type Props = {}

export default class InviteBtn extends Component<Props> {
  handleClick = ():void => {
    console.log('invite button is clicked')
  }
  render(): Node {
    return (
      <div className="InviteBtn">
        <Button type="primary" onClick={this.handleClick}>
          <Icon type="user-add" />
          招待する
        </Button>
      </div>
    )
  }
}