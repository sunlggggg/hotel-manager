import React, { Component } from 'react';
import { Table, Tag, Pagination, Popconfirm} from 'antd';
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
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color;
          if (tag === '空房') {
            color = 'volcano';
          } else {
            color = 'geekblue';
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
    dataIndex: 'operate',
    key: 'operate',
    render: (operate, record) => (
      <Popconfirm
        placement="topRight"
        title={'确认' + operate}
        onConfirm={() => handleConfirm(record.roomNo, operate)}
        okText="确认"
        cancelText="取消"
      >
        <span><a
          // onClick={() => showConfirm(operate, recode)} 
          href={operate === '入住' ? '#checkIn' : '#checkOut'}>{operate}</a></span>
      </Popconfirm>
    ),
  }
];

const handleConfirm = (roomNo, operateType) => {
  console.log(roomNo, operateType)
}

// function showConfirm(operate, recode) {
//   console.log(operate, recode)
//   confirm({
//     title: `确认删除`+recode.roomNo+`房间?`,
//     content: 'When clicked the OK button, this dialog will be closed after 1 second',
//     onOk() {
//       return new Promise((resolve, reject) => {
//         setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
//       }).catch(() => console.log('Oops errors!'));
//     },
//     onCancel() { },
//   });
// }



const paginationProps = {
  position: 'none',
};


export default class RoomTable extends Component {


  handlePageChange = (pageNo, pageSize) => {
    console.log(this.props.pageNo, pageNo, this.props.pageSize, pageSize);
    this.props.callback(pageNo, pageSize);
  }

  render() {
    return (<div>
      <Table dataSource={this.props.roomList} columns={columns}
        pagination={paginationProps}
      />
      <Pagination onChange={this.handlePageChange} defaultCurrent={1} current={this.props.pageNo} pageSize={this.props.pageSize} className={styles.page} total={this.props.total}
      />
    </div>);
  }
}