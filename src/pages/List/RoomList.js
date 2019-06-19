import { Component } from 'react'
import { Select, Button, message } from 'antd';
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
        total: 50,
        pageSize: 4
    }

    handleChange = (roomStatus) => {
        this.queryRoomList(roomStatus)
        this.setState({ roomStatus: roomStatus });
    }

    pageChangeCallback = (newPageNo, newPageSize)=>{
        console.log("call back", this.state.pageNo, newPageNo)
        this.setState({pageNo:newPageNo,pageSize:newPageSize})
    }

    queryRoomList = async (value) => {
        const res = await roomListRequst({pageNo:this.state.pageNo,pageSize:this.state.pageSize,roomStatus:value})
        if(res.code !==0 ){
            message.error(res.message)
        }
        this.setState({roomList:res.data.roomInfos, pageNo:res.data.pageNo,total: res.data.total})
    }

    componentDidMount(){
        this.queryRoomList(this.state.roomStatus)
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
                        pageSize={this.state.pageSize} total = {this.state.total}
                        callback ={this.pageChangeCallback}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
