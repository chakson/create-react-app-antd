import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Form, Input, message } from 'antd';
import { loginAPIs } from '../../utils/apis';
// import dateFormat from '../../utils/dateFormat';
import { dispatch } from '../../index';

const FormItem = Form.Item;

class LoginPage extends Component {
  constructor(props, context) {
    super(props, context);
  }
  handleOk = () => {
    const { form } = this.props;
    const formValue = form.getFieldsValue();
    const validateData = {
      username: '请输入用户名',
      password: '请输入密码',
    }
    for (let key in validateData) {
      if (!formValue[key]) {
        message.error(validateData[key]);
        return;
      }
    }
    this.onLoginMethodFetch(formValue.username, formValue.password);
  }
  
  onLoginMethodFetch = (name, psd) => {
    const { history } = this.props;
    loginAPIs.LOGIN({
      username: name,
      password: psd
    })
    .then((res) => {
      console.log(res)
      dispatch.user.updateUsername(res.data.username);
      history.push('/homepage');
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-container">
        <div className="login-form">
          <div className="login-logo">
            <span>后台管理系统</span>
          </div>
          <form>
            <FormItem hasFeedback>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input onPressEnter={this.handleOk} placeholder="请输入用户名" />)}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input type="password" onPressEnter={this.handleOk} placeholder="请输入密码" />)}
            </FormItem>
            <Row>
              <Button type="primary" onClick={this.handleOk}>
                登录
              </Button>
              <p>
                <span>Username：admin</span>
                <span>Password：admin</span>
              </p>
            </Row>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {

  };
}

LoginPage = Form.create()(LoginPage);
export default connect(mapStateToProps)(LoginPage);
