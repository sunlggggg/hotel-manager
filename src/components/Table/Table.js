import React, { Component } from 'react';
import {Table, Divider, Tag,Pagination } from 'antd';
import styles from './Table.css'
const columns = [
    {
      title: '房间编号',
      dataIndex: 'roomNo',
      key: 'roomNo',
      render: text => <span>{text}</span>,
    },

    {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        render: text => <span>{text}</span>,
    },
    {
        title: '入住时间',
        dataIndex: 'checkInTime',
        key: 'checkInTime',
        render: text => <span>{text}</span>,
    },

    {
        title: '退房时间',
        dataIndex: 'checkOutTime',
        key: 'checkOutTime',
        render: text => <span>{text}</span>,
    },

    {
      title: '住客姓名',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: '身份证号',
      dataIndex: 'customerIdCard',
      key: 'customerIdCard',
    },
    {
      title: '房间状态',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === '空房') {
              color = 'volcano';
            } 
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;">入住 {record.name}</a>
          <Divider type="vertical" />
          <a href="javascript:;">退房</a>
        </span>
      ),
    },
  ];

  const paginationProps = {
    position: 'none',
  };
export default class RoomTable extends Component {
 state = {
   pageSize : this.props.pageSize,
   total:this.props.total
 } 
  render(){
      return(<div>
          <Table dataSource={this.props.roomList} columns={columns} 
           pagination={ paginationProps }
          />
          <Pagination defaultCurrent={1} className={styles.page} total={50} />
      </div>);
  }
}