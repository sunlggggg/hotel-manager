import { Component } from 'react'
import { Select, message } from 'antd';
import styles from './RoomList.css';
import 'antd/dist/antd.css';
import { RoomStatus } from '../../common/enum'
import TopBur from '../../components/TopBur/TopBur'
import RoomTable from '../../components/Table/Table'
import { roomListRequst } from '../../request/request'

const { Option } = Select;

export default class RoomList extends Component {

    state = {
        roomStatus: RoomStatus.ALL,
        roomList: [],
        pageNo: 1,
        total: 1,
        pageSize: 7
    }

    handleChange = (roomStatus) => {
        this.queryRoomList(roomStatus, 1, this.state.pageSize)
        this.setState({ roomStatus: roomStatus });
    }

    pageChangeCallback = (newPageNo, newPageSize) => {
        console.log("pageChangeCallback", newPageNo)
        this.setState({ pageNo: newPageNo, pageSize: newPageSize })
        this.queryRoomList(this.state.roomStatus, newPageNo, newPageSize);
    }

    queryRoomList = async (roomStatus, pageNo, pageSize) => {
        const res = await roomListRequst({ pageNo: pageNo, pageSize: pageSize, roomStatus: roomStatus })
        if (res.code !== 0) {
            message.error(res.message)
        }
        res.data.roomInfos.map(e => {
            return e.operate = e.tags[0] === '空房' ? '入住' : '退房';
        })
        this.setState({ roomList: res.data.roomInfos, pageNo: res.data.pageNo, total: res.data.total })
    }

    componentDidMount() {
        this.queryRoomList(this.state.roomStatus, this.state.pageNo, this.state.pageSize)
    }

    render() {
        return (
            <div >
                {TopBur("房间列表")}
                <div className={styles.container}>
                    <div className={styles.searchBur}>
                        <div className={styles.select}>
                            <div className={styles.name} >
                                <Select placeholder="查询类型" defaultValue={RoomStatus.ALL} style={{ width: 120 }} onChange={this.handleChange}>
                                    <Option value={RoomStatus.ALL}>全部</Option>
                                    <Option value={RoomStatus.SELL}>已入住</Option>
                                    <Option value={RoomStatus.KEEP}>未入住</Option>
                                </Select>
                            </div>
                        </div>
                        <div className={styles.black}></div>
                    </div>
                    <div className={styles.roomlist}>
                        <RoomTable roomList={this.state.roomList} pageNo={this.state.pageNo}
                            pageSize={this.state.pageSize} total={this.state.total}
                            callback={this.pageChangeCallback}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
