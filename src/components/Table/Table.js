import React, { Component } from 'react';
import {Table, Divider, Tag } from 'antd';
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
  
  const data = [
    {
      key: '1',
      roomNo: '6-001',
      checkInTime: "2018-10-11",
      checkOutTime: "2018-11-12",
      price: 100,
      customerName: '小黄人',
      customerIdCard: '330677199510089814',
      tags: ['空房'],
    }, 
    {
      key: '2',
      checkInTime: "2018-10-11",
      checkOutTime: "2018-11-12",
      price: 100,
      roomNo: '6-002',
      customerName: '康城',
      customerIdCard: '330677199510089815',
      tags: ['空房'],
    },
    {
      key: '3',
      checkInTime: "2018-10-11",
      checkOutTime: "2018-11-12",
      price: 100,
      roomNo: '6-003',
      customerName: '小烟枪',
      customerIdCard: '330677199510089813',
      tags: ['入住'],
    },
  ];
  

export default class RoomTable extends Component {
    render(){
        return(<div>
            <Table dataSource={data} columns={columns} />;
        </div>);
    }
}