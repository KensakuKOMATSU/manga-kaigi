//@flow
import React, { Component } from 'react'
import './myVideo.css'

type Props = {
  stream: MediaSource
}

export default class MyVideo extends Component<Props> { 
  setSrcObject = (elem: Object, stream: Object): void => {
    if( elem ) elem.srcObject = stream
  }

  render(){
    return (
      <div className="MyVideo">
        <video ref={ elem => {this.setSrcObject(elem, this.props.stream)}} autoPlay muted playsInline/>
      </div>
    )
  }
}

