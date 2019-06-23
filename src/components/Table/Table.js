import React, { Component } from 'react';
import { Table, Tag, Pagination, Popconfirm, message} from 'antd';
import styles from './Table.css'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import checkInAction from '../../action/checkin'
import router from 'umi/router';
import { OperateType} from '../../common/enum'
import {checkOutRequst} from '../../request/request'


const paginationProps = {
  position: 'none',
};

class RoomTable extends Component {


  columns = [
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
          onConfirm={
            () => this.handleConfirm(record.roomNo, operate)}
          okText="确认"
          cancelText="取消"
        >
          <span><a
            href={operate === '入住' ? '#checkIn' : '#checkOut'}>{operate}</a></span>
        </Popconfirm>
      ),
    }
  ];

  handleConfirm = async (roomNo, operateType) => {
    console.log(roomNo, operateType)
    if(operateType === OperateType.CHECKIN){
      this.props.checkIn(roomNo);
      router.push("/room/checkIn")
    } else {
      const res = await checkOutRequst({ roomNo: roomNo })
      if(res.code !== 0){
        message.error(res.message);
      } else {
        this.handlePageChange(this.props.pageNo, this.props.pageSize);
        message.success("退房成功");
      }
    }
  }

  handlePageChange = (pageNo, pageSize) => {
    this.props.callback(pageNo, pageSize);
  }

  render() {
    return (<div>
      <Table dataSource={this.props.roomList} columns={this.columns}
        pagination={paginationProps}
      />
      <Pagination onChange={this.handlePageChange} defaultCurrent={1} current={this.props.pageNo} pageSize={this.props.pageSize} className={styles.page} total={this.props.total}
      />
    </div>);
  }
}


RoomTable.propTypes = {
  checkIn: PropTypes.func.isRequired,
}
const mapDispatchToProps = {
  checkIn: checkInAction 
}
export default connect(null, mapDispatchToProps)(RoomTable)  