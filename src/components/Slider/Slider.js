import { Menu, Icon } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import styles from './Slider.css'
const { SubMenu }  = Menu;

export default class Slider extends React.Component {
  // submenu keys of first level
  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  state = {
    openKeys: ['sub1'],
  };

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render() {
    return (
      <div>
        <Menu
          onClick={this.handleClick}
          style={{ width: 180 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          className={styles.menu}
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="home" />
                <span>房间管理</span>
              </span>
            }
          >
            <Menu.Item key="roomList">房间列表</Menu.Item>
            <Menu.Item key="checkIn">入住登记</Menu.Item>
          </SubMenu>
          </Menu>
        </div>
    );
  }
}