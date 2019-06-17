import styles from './TopBur.css'
import {PageHeader} from 'antd'

export default (name) => {
   return ( <div><PageHeader className={styles.header} subTitle={name}  /> </div> )
}