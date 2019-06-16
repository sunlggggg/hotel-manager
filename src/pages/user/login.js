
import styles from './login.css';
import { Input, Button, Tooltip} from 'antd';
import 'antd/dist/antd.css';
import login from '../../request/request'
import fetch from 'node-fetch';
import { Component } from 'react';


const params = {
  managerName: "",
  password: ""
}
const onNameChange = (e) => {
  params.managerName = e.target.value;
  console.log(params)
}
const onPasswordChange = function (e) {
  params.password = e.target.value;
  console.log(params)
}
const submitForm = async function () {
  const res = await fetch('/api/common/login', { method: 'POST', body: JSON.stringify(params)});
  const result = await res.json();
  return  (
    <Tooltip placement="topLeft" title="Prompt Text" arrowPointAtCenter>
      <Button>{result.message}</Button>
    </Tooltip>
  )
}

export default class Login extends Component {
  return (
    <div className={styles.total}>
      <div className={styles.normal}>
        <div className={styles.text}>
          账号登录
        </div>
        <Input size="large" placeholder="用户名" className={styles.name} onChange={onNameChange} />
        <Input.Password size="large"  placeholder="密码"   className={styles.password} onChange={onPasswordChange} />
        <Button block type="primary" className={styles.submit} size="large" onClick={submitForm}>
          登录
        </Button>
      </div>
    </div>
  );
}
