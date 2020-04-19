// @flow

import React from 'react'
import { Typography } from 'antd'

const { Title } = Typography

export default function AppHeader(){
  return (
    <div className="AppHeader">
      <Title level={1}><a href="/channels">Manga kaigi</a></Title>
    </div>
  )
}