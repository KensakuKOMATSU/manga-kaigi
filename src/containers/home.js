import React from 'react'
import { Link } from 'react-router-dom'

import { 
  Skeleton,
  Typography 
} from 'antd'
const { Title } = Typography

const Home = _ => {
  return (
    <div className="Home">
      <Title level={2}>Home</Title>
      <Skeleton />
      <ul>
        <li><Link to="/channels">チャネルリストを見る＆グループチャネルを作る</Link></li>
        <li><Link to="/channels/testid">グループチャネル（id: `testid`) (開発用）</Link></li>
      </ul>
    </div>
  )
}

export default Home