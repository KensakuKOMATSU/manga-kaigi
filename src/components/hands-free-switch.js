// @flow

import React, { Component } from 'react'
import type { Node } from 'react'
import { Switch } from 'antd'


type Props = {}

export default class HandsFreeSwitch extends Component<Props> {
  handleChange = (checked:boolean):void => {
    console.log( "handleChange", checked)
  }

  render(): Node {
    return (
      <div className="HandsFreeSwitch">
        ハンズフリー&nbsp;
        <Switch onChange={this.handleChange} />
      </div>
    )
  }
}