import React from 'react'
import { DownCircleFilled, DownCircleOutlined } from '@ant-design/icons'
import { SignalFilled } from '@ant-design/icons'
import { PlusCircleFilled } from '@ant-design/icons'
import { PhoneFilled, InfoCircleOutlined } from '@ant-design/icons'
import { Avatar, Image } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { SettingFilled, CustomerServiceFilled, AudioOutlined } from '@ant-design/icons'


import './styles.css'

import SidePanelChannel from './Components/SidePanelChannel'

function SidePanel() {
  return (
    <div className="side-panel">
      <div className="side-panel-top">
        <h3>
          Top SidePanel
        </h3>
        <DownCircleOutlined />
      </div>

      <div className="side-panel-channels">
        <div className="side-panel-channel-header">
          <div className="side-panel-header">
            <h4>Text Channels</h4>
          </div>

          <PlusCircleFilled className="side-panel-add_channel" />
        </div>

        <div className="side-panel-channels-list">
          <SidePanelChannel />
          <SidePanelChannel />
          <SidePanelChannel />
          <SidePanelChannel />
        </div>
      </div>

      <div className="side-panel-voice">
        <SignalFilled className="side-panel-voice_icon" />

        <div className="side-panel-voice_info">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>  

        <div className="side-panel-voice_icons">
          <InfoCircleOutlined/>
          <PhoneFilled />
        </div>

      </div>
      <div className="side-panel-profile">
          <Avatar size="small" icon={<UserOutlined />} />        

          <div className="side-panel-profile_info">
            <h3>@TheMachineHerald</h3>
            <p>#thisIsMyID</p>
          </div>

          <div className="side-panel-profile_icons">
            <AudioOutlined/>
            <CustomerServiceFilled/>
            <SettingFilled/>
          </div>
        </div>
    </div>
  )
}

export default SidePanel