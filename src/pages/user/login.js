
import styles from './login.css';
import { Input, Button, Form, message} from 'antd';
import 'antd/dist/antd.css';
import {loginRequest} from '../../request/request';
import { Component } from 'react';
import router from 'umi/router';
import logoUrl from '../../assets/logo.png';


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
  const res = await loginRequest(params);
  if(res.code !== 0){
    message.success(res.message);
  } else {
    router.push('/room/list');
  }
}

export default class Login extends Component {

  render(){
    return (
      <div className={styles.total}>
        <div className={styles.normal}>
          <div>
            <img src={logoUrl} alt='logo' className={styles.logo}></img>
          </div>
          <div className={styles.text}>
            账号登录
          </div>
          <Form>
            <Form.Item>
              <Input size="large" placeholder="用户名" className={styles.name} onChange={onNameChange} />
            </Form.Item>
            <Form.Item>
              <Input.Password size="large"  placeholder="密码"   onChange={onPasswordChange} />
            </Form.Item>
            <Form.Item>
              <Button block type="primary" className={styles.submit} size="large" onClick={submitForm}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
