import { Menu, Icon } from 'antd';
import React from 'react';
import styles from './Slider.css'
import router from 'umi/router';
const { SubMenu }  = Menu;

export default class Slider extends React.Component {
  handleClick = e => {
    console.log('click ', e);
    let path ="/";
    e.keyPath.reverse().map(p=>{
      return path+=p+"/";
    })
    console.log(path)
    router.push(path)
  };

  render() {
    return (
      <div>
        <Menu
          onClick={this.handleClick}
          style={{ width: 180 }}
          defaultSelectedKeys={['list']}
          defaultOpenKeys={['room']}
          mode="inline"
          className={styles.menu}
        >
          <SubMenu
            key="room"
            title={
              <span>
                <Icon type="home" />
                <span>房间管理</span>
              </span>
            }
          >
            <Menu.Item selectable={true} key="list">房间列表</Menu.Item>
            <Menu.Item key="checkIn">入住登记</Menu.Item>
          </SubMenu>
          </Menu>
        </div>
    );
  }
}