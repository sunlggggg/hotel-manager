import styles from './index.css';
import logoUrl from '../assets/logo.png';
import { Icon } from 'antd'
import router from 'umi/router';
import Slider from '../components/Slider/Slider'
function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src={logoUrl} alt="logo" className={styles.logo}></img>
        </div>
        <div className={styles.black}>
        </div>
        <div className={styles.signOut}>
          <Icon type="logout" onClick={() => router.push('/')} />
        </div>
      </div>
      <div className={styles.content}>
        <Slider className={styles.slider} />
        <div className={styles.main}>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default BasicLayout;
