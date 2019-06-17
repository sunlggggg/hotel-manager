import {Component} from 'react'
import { Select,Button } from 'antd';
import styles from './RoomList.css';
import 'antd/dist/antd.css';
import {RoomStatus} from '../../common/enum'
import TopBur from '../../components/TopBur/TopBur'

const { Option } = Select;


export default class Login extends Component {

    state = {
        RoomStatus:RoomStatus.SELL
    }

    handleChange= (value)=>{
        this.setState({RoomStatus:value},()=> console.log(this.state.RoomStatus));
    }

    render(){
      return (
        <div >
           {TopBur("房间列表")}
           <div className={styles.container}>
                <div className={styles.searchBur}>
                    <div className={styles.select}>
                        <div className={styles.name} >
                            <Select  placeholder="查询类型" defaultValue="SELL"  style={{ width: 120 }} onChange={this.handleChange}>
                                <Option value={RoomStatus.SELL}>已入住</Option>
                                <Option value={RoomStatus.KEEP}>未入住</Option>
                            </Select>
                        </div>
                    </div>
                    <div className={styles.searchButton}>
                        <Button type="primary">查询</Button>
                    </div>
                    <div className={styles.black}></div>
                </div>
            </div>
        </div>
      );
    }
  }
  