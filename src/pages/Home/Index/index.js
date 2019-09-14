import React from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Flex } from 'antd-mobile'
import axios from 'axios'
import './index.scss'

import Nav1 from '../../../assets/images/nav-1.png'
import Nav2 from '../../../assets/images/nav-2.png'
import Nav3 from '../../../assets/images/nav-3.png'
import Nav4 from '../../../assets/images/nav-4.png'
class House extends React.Component {
  state = {
    data: ['1', '2', '3'],
    imgHeight: 176,
    swiperData: false
  }
  componentDidMount() {
    // simulate img loading
    this.getSwiper()
  }
  renderSwiper() {
    console.log(this.swiperData)

    if (this.state.swiperData) {
      return (
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
      )
    }
  }
  async getSwiper() {
    const { data } = await axios.get('http://localhost:8080/home/swiper')

    console.log(data)
    this.setState({
      data: data.body,
      swiperData: true
    })
  }
  render() {
    console.log(1)
    return (
      <div className="aaaaaa">
        {this.renderSwiper()}
        <div className="flex-container nav">
          <Flex>
            <Flex.Item>
              <Link to="/home/house">
                <img src={Nav1} alt="" />
                <p>整租</p>
              </Link>
            </Flex.Item>
            <Flex.Item>
              <Link to="/home/house">
                <img src={Nav2} alt="" />
                <p>合租</p>
              </Link>
            </Flex.Item>
            <Flex.Item>
              <Link to="map">
                <img src={Nav3} alt="" />
                <p>地图找房</p>
              </Link>
            </Flex.Item>
            <Flex.Item>
              <Link to="">
                <img src={Nav4} alt="" />
                <p>去出租</p>
              </Link>
            </Flex.Item>
          </Flex>
        </div>
      </div>
    )
  }
}

export default House
