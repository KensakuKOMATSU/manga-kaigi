// @flow

import React, { Component } from 'react'
import { Icon } from 'antd'

import { STATUS} from '../states/app-store'

import './audio-btn.css'

type callableObj = {
  (): void
}

type Props = {
  status: String,
  onClick: callableObj
}



export default class AudioBtn extends Component<Props> {
  audioBtn: Object

  componentDidUpdate() {
    const btnColor = this.props.status === STATUS.TALKING ? '#f00' : '#00f'
    this.audioBtn.style.backgroundColor = btnColor
  }

  render() {
    return (
      <div 
        className="audio-btn"
        ref={elem => this.audioBtn = elem}
        onClick={this.props.onClick}
      >
        <Icon type="audio" />
      </div>
    )
  }
}