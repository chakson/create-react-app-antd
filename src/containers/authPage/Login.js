import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Row, Form, Input } from 'antd';
// import { userAPIs } from '../../utils/apis';
// import dateFormat from '../../utils/dateFormat';
const FormItem = Form.Item;

class LoginPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      
    };
  }
  componentWillMount() {

  }
  handleOk = () => {
    console.log('a');
    const formValue = this.props.form.getFieldsValue();
    if (formValue.username === 'admin' && formValue.password === 'admin') {
      this.props.dispatch(push('/homepage'));
    }
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
