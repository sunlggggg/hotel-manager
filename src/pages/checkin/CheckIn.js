import React from 'react'
import styles from './CheckIn.css'
import TopBur from '../../components/topbur/TopBur'
import { connect } from 'react-redux'
import { Form, Input, Button, LocaleProvider, DatePicker, message } from 'antd';
import { checkInRequest } from '../../request/request'
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import router from 'umi/router'
moment.locale('zh-cn');


const {  RangePicker } = DatePicker;
const rangeConfig = {
  rules: [{ type: 'array', required: true, message: '请选择时间' }],
};

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit =  e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      console.log(values.dates[0].format('X'))
      if (!err) {
        const res = await checkInRequest({
          roomNo:this.props.checkInRoomNo,
          customerName:values.name,
          customerIdCard:values.idCard,
          checkInTime:values.dates[0].format('X'),
          checkOutIime:values.dates[1].format('X')
        });
        console.log(res)
        if(res.code !== 0){
          message.error(res.message)
        } else {
          message.success("入住成功")
          router.push('/room/list')
        }
        console.log('Received values of form: ', values);
      }
    });
    
    
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  validateName = (rule, value, callback) => {
    console.log(rule);
    if (value.length < 3) {
      callback('至少三个字符');
    } else {
      callback();
    }
  };

  validateIdCard = (rule, value, callback) => {
    var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    if(!idcardReg.test(value)) {
      callback("身份证号非法");
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24},
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 1,
        },
        sm: {
          span: 17,
          offset: 1,
        },
      },
    };
   
    return (
      <div>
         {TopBur("入住登记")}
         <div className={styles.container}>
      <LocaleProvider locale={zh_CN}>
        <Form {...formItemLayout} className={styles.fromTable} onSubmit={this.handleSubmit}>
        <Form.Item label="房间编号" hasFeedback>
            <Input disabled value={this.props.checkInRoomNo}/>
          </Form.Item>
          <Form.Item label="住客姓名" hasFeedback>
            {getFieldDecorator('name', {
              rules: [
                {
                  type: 'string',
                  message: '请输入合规姓名',
                },
                {
                  required: true,
                  message: '请输入姓名',
                },
                {
                  validator: this.validateName,
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="身份证号" hasFeedback>
            {getFieldDecorator('idCard', {
              rules: [
                {
                  type: 'string',
                  message: '身份证号错误',
                },
                {
                  required: true,
                  message: '请输入身份证号',
                },
                {
                  validator: this.validateIdCard,
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item className={styles.items} label="入住和离店时间">
            {getFieldDecorator('dates', rangeConfig)(
              <RangePicker showTime format="YYYY-MM-DD HH:mm:ss"
              placeholder={['入住时间', '退房时间']} />,
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              登记
            </Button>
          </Form.Item>
        </Form>
        </LocaleProvider>
        </div>
        </div>
    );
  }
}
const mapStateToProps = state => ({
  checkInRoomNo: state.checkIn.checkInRoomNo,
})
export default connect(mapStateToProps)(Form.create({ name: 'register' })(RegistrationForm));
