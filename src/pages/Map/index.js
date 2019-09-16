import React, { Component } from 'react'
import './index.scss'
const BMap = window.BMap
function getPosition() {
  if (navigator.geolocation) {
    //navigator.geolocation.getCurrentPosition这个方法里面有三个参数
    //这个会在界面拉出一个消息框，让用户确认是否允许获取位置,不过pc端我试了都是err，
    //参1，成功后执行的函数
    //参2，失败时执行的函数
    //参3，选项配置，下面是在6000毫秒内结束请求
    navigator.geolocation.getCurrentPosition(
      function(position) {
        console.log(12)
        var latitude = position.coords.latitude
        var longitude = position.coords.longitude
        console.log('Latitude : ' + latitude + ' Longitude: ' + longitude)
        console.log(position)
      },
      function(err) {
        console.log(err)
        console.log('您的浏览器不支持此项技术')
      }
      // { timeout: 12000 }
    )
  }
}

class Map extends Component {
  componentDidMount() {
    // getPosition()

    var map = new BMap.Map('container')
    var point = new BMap.Point(121.61893324731646, 31.04054438062165)
    map.centerAndZoom(point, 18)
    var marker = new BMap.Marker(point) // 创建标注
    map.addOverlay(marker) // 将标注添加到地图中
  }

  render() {
    return (
      <div className="map">
        <div id="container"></div>
      </div>
    )
  }
}

export default Map
