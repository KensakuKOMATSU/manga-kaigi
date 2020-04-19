// @flow

import React, { Component } from 'react'
import type { Node } from 'react'
import { Button, Icon } from 'antd'


type Props = {}

export default class ExitBtn extends Component<Props> {
  handleClick = ():void => {
    console.log('exit button is clicked')
  }
  render(): Node {
    return (
      <div className="ExitBtn">
        <Button type="primary" onClick={this.handleClick}>
          <Icon type="poweroff" />
          退室する
        </Button>
      </div>
    )
  }
}