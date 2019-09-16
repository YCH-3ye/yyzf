import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import './index.scss'
import { Switch, Route } from 'react-router-dom'
import Index from './Index/index'
import My from './My'
import House from './House'
import News from './News'
const itemList = [
  { title: '首页', icon: 'icon-ind', path: '/home' },
  { title: '找房', icon: 'icon-findHouse', path: '/home/house' },
  { title: '资讯', icon: 'icon-infom', path: '/home/news' },
  { title: '我的', icon: 'icon-my', path: '/home/my' }
]
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: props.location.pathname
    }
  }

  renderContent(pageText) {
    return (
      <div
        style={{
          backgroundColor: 'white',
          height: '100%',
          textAlign: 'center'
        }}
      ></div>
    )
  }
  renderItem(list) {
    return list.map(value => {
      return (
        <TabBar.Item
          title={value.title}
          key={value.title}
          icon={<i className={`iconfont ${value.icon}`}></i>}
          selectedIcon={<i className={`iconfont ${value.icon}`}></i>}
          selected={this.state.selectedTab === value.path}
          onPress={() => {
            this.props.history.push(value.path)
            this.setState({
              selectedTab: value.path
            })
          }}
        ></TabBar.Item>
      )
    })
  }

  render() {
    return (
      <div className="home">
        <Switch>
          <Route exact path="/home" component={Index}></Route>
          <Route path="/home/house" component={House}></Route>
          <Route path="/home/news" component={News}></Route>
          <Route path="/home/my" component={My}></Route>
        </Switch>
        <TabBar
          // 选中的颜色
          tintColor="#21b97a"
        >
          {this.renderItem(itemList)}
        </TabBar>
      </div>
    )
  }
}

export default Home
