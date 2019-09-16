import React from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Flex, Grid, WingBlank } from 'antd-mobile'
import axios from 'axios'
import './index.scss'

import Nav1 from '../../../assets/images/nav-1.png'
import Nav2 from '../../../assets/images/nav-2.png'
import Nav3 from '../../../assets/images/nav-3.png'
import Nav4 from '../../../assets/images/nav-4.png'
let navList = [
  { path: '/home/house', img: Nav1, title: '整租' },
  { path: '/home/house', img: Nav2, title: '合租' },
  { path: '/map', img: Nav3, title: '地图找房' },
  { path: '/hh', img: Nav4, title: '去出租' }
]

class House extends React.Component {
  state = {
    data: ['1', '2', '3'],
    imgHeight: 176,
    swiperData: false,
    lease: [],
    dataNew: [],
    cityName: ''
  }
  componentDidMount() {
    this.getSwiper()
    this.getLease()
    this.getNews()
    // 百度地图获取城市信息

    var myCity = new window.BMap.LocalCity()
    myCity.get(async res => {
      let city = res.name
      let { data } = await axios.get(
        `http://localhost:8080/area/info?name=${city}`
      )
      console.log(data)
      let cityValue = data.body
      if (data.status === 200) {
        // 存到localstrage里面
        localStorage.setItem('current_city', JSON.stringify(cityValue))
        this.setState({
          cityName: cityValue.label
        })
      }
    })
  }

  // 搜索
  renderSearch() {
    return (
      <div className="search">
        <Flex>
          <Flex className="search-style">
            <span
              onClick={() => {
                this.props.history.push('/city')
              }}
            >
              上海<i className="iconfont icon-arrow"></i>
            </span>
            <div
              className="input"
              onClick={() => {
                this.props.history.push('/search')
              }}
            >
              <i className="iconfont icon-seach"></i>请输入小区或地址
            </div>
          </Flex>
          <span
            className="map iconfont icon-map"
            onClick={() => {
              this.props.history.push('/map')
            }}
          ></span>
        </Flex>
      </div>
    )
  }
  // 获取new数据
  async getNews() {
    let { data } = await axios('http://localhost:8080/home/news', {
      params: {
        area: 'AREA%7C88cff55c-aaa4-e2e0'
      }
    })
    let { body } = data
    this.setState({
      dataNew: body
    })
  }
  // 最新资讯
  renderNew() {
    return (
      <>
        <div className="title">最新资讯</div>
        {this.state.dataNew.map(v => (
          <Flex key={v.id} justify="between" className="container">
            <div className="container-left">
              <img src={`http://localhost:8080${v.imgSrc}`} alt="" />
            </div>
            <Flex.Item className="container-right">
              <Flex className="content" direction="column" justify="between">
                <Flex.Item flex="0">
                  <h4>{v.title}</h4>
                </Flex.Item>
                <div flex="0" className="content-button">
                  <Flex justify="between">
                    <div className="from">{v.from}</div>
                    <div className="date">{v.date}</div>
                  </Flex>
                </div>
              </Flex>
            </Flex.Item>
          </Flex>
        ))}
      </>
    )
  }

  // 获取租房小组的数据
  async getLease() {
    let { data } = await axios.get('http://localhost:8080/home/groups', {
      params: {
        area: 'AREA%7C88cff55c-aaa4-e2e0'
      }
    })
    const { body } = data
    this.setState({
      lease: body
    })
  }
  // 租房
  renderLease() {
    return (
      <>
        <div className="title">
          <h3>租房小组</h3> <span>更多</span>
        </div>
        <Grid
          columnNum="2"
          hasLine={false}
          square={false}
          activeClassName="active"
          data={this.state.lease}
          activeStyle={{
            backgroundColor: '#ccc'
          }}
          renderItem={(el, index) => (
            <WingBlank size="md">
              <div className="desc">
                <h4>{el.title}</h4>
                <p>{el.desc}</p>
              </div>
              <img src={`http://localhost:8080${el.imgSrc}`} alt="" />
            </WingBlank>
          )}
        />
      </>
    )
  }

  // 渲染轮播图
  // 渲染nav
  renderNav() {
    return (
      <Flex>
        {navList.map(v => (
          <Flex.Item key={v.title}>
            <Link to={v.path}>
              <img src={v.img} alt="" />
              <p>{v.title}</p>
            </Link>
          </Flex.Item>
        ))}
      </Flex>
    )
  }
  renderSwiper() {
    if (this.state.swiperData) {
      return (
        <>
          {this.renderSearch()}
          <Carousel autoplay infinite>
            {this.state.data.map(val => (
              <a
                key={val}
                href="http://www.alipay.com"
                style={{
                  display: 'inline-block',
                  width: '100%',
                  height: this.state.imgHeight
                }}
              >
                <img
                  src={`http://localhost:8080${val.imgSrc}`}
                  alt={val.alt}
                  style={{ width: '100%', verticalAlign: 'top' }}
                  onLoad={() => {
                    window.dispatchEvent(new Event('resize'))
                    this.setState({ imgHeight: 'auto' })
                  }}
                />
              </a>
            ))}
          </Carousel>
        </>
      )
    }
  }
  async getSwiper() {
    const { data } = await axios.get('http://localhost:8080/home/swiper')

    this.setState({
      data: data.body,
      swiperData: true
    })
  }

  render() {
    return (
      <>
        {/* 轮播图 */}
        <div className="swipe">{this.renderSwiper()}</div>
        <div className="flex-container nav">
          {/* nav */}
          {this.renderNav()}
        </div>
        {/* 租房小组 */}
        <div className="lease">{this.renderLease()}</div>
        {/* 最新资讯 */}
        <div className="new">{this.renderNew()}</div>
      </>
    )
  }
}

export default House
