// @flow

import React, { Component } from 'react'
import type { Node } from 'react'
import { Icon } from 'antd'


type Props = {}

export default class Speaker extends Component<Props> {
  render(): Node {
    return (
      <div className="Speaker">
        placeholder: スピーカー&nbsp;&nbsp;
        <Icon type="sound" />
      </div>
    )
  }
}