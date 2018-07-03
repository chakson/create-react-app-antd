import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Divider, message, Form, Input, Select, Button } from 'antd';
import { userAPIs } from '../../utils/apis';
import dateFormat from '../../utils/dateFormat';
const FormItem = Form.Item;
const Option = Select.Option;

class UserManage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userList: [],
      userListPages: 0,
      userListTotal: 0,
      pNum: 1,
      pSize: 5,
      staticConfData: {},
    };
  }
  componentWillMount() {
    const { pNum } = this.state;
    this.onListUser(pNum);
  }
  onListUser = (current, changeConf) => {
    const { pSize, staticConfData } = this.state;
    const formValue = this.props.form.getFieldsValue();
    // 点击查询按钮后，保存查询条件的信息 changeConf为真，表示是点了查询按钮
    const params = changeConf ? {
      mobile: formValue.mobile ? formValue.mobile : '',
      idCard: formValue.idCard ? formValue.idCard : '',
      username: formValue.username ? formValue.username : '',
      realname: formValue.realname ? formValue.realname : '',
      status: formValue.status,
    } : staticConfData;
    userAPIs.USERLISTBYCOND({
      page: {
        pageNum: changeConf ? 1 : current,
        pageSize: pSize
      },
      param: params,
    }).then((res) => {
      this.setState({
        userList: res.data.results,
        userListPages: res.data.pages,
        userListTotal: res.data.total,
        staticConfData: params,
        pNum: changeConf ? 1 : current,
      });
    }).catch((error) => {
      console.log(error)
      message.error(error.msg);
    });
  }
  onForbidUser = (id) => {
    userAPIs.FORBIDUSER({
      id
    }).then((res) => {
      const { pNum } = this.state;
      this.onListUser(pNum);
    }).catch((error) => {
      console.log(error)
      message.error(error.msg);
    });
  }
  onAllowUser = (id) => {
    userAPIs.ALLOWUSER({
      id
    }).then((res) => {
      const { pNum } = this.state;
      this.onListUser(pNum);
    }).catch((error) => {
      console.log(error)
      message.error(error.msg);
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { userList, userListTotal, pNum, pSize } = this.state;
    const userColumns = [{
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '银行卡',
      dataIndex: 'account',
      key: 'account',
    }, {
      title: '电子邮箱',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: '身份证',
      dataIndex: 'idCard',
      key: 'idCard',
    }, {
      title: '真实姓名',
      dataIndex: 'realname',
      key: 'realname',
    }, {
      title: '商家名称',
      dataIndex: 'storeName',
      key: 'storeName',
    }, {
      title: '商户号',
      dataIndex: 'storeNo',
      key: 'storeNo',
    }, {
      title: '商家地址',
      dataIndex: 'storeAddress',
      key: 'storeAddress',
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text, record) => (
        <span>{dateFormat(text)}</span>
      ),
    }, {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (text, record) => (
        <span>{dateFormat(text)}</span>
      ),
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <span>{text ? '正常' : '禁用'}</span>
      ),
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a disabled={record.status === 1} onClick={() => this.onAllowUser(record.id)}>启用</a>
          <Divider type="vertical" />
          <a disabled={record.status === 0} onClick={() => this.onForbidUser(record.id)}>禁用</a>
        </span>
      ),
    }];
    const userPagination = {
      pageSize: pSize,
      total: userListTotal,
      current: pNum,
      showTotal: (total) => <span>共 {total} 条</span>,
      onChange: (current) => {
        this.setState({
          pNum: current,
        });
        this.onListUser(current);
      }
    };
    return (
      <div>
        <div style={{ paddingBottom: '10px' }}>
          <Form layout="inline">
            <FormItem label="手机号">
              {getFieldDecorator('mobile')(
                <Input placeholder="请输入手机号" />
              )}
            </FormItem>
            <FormItem label="身份证">
              {getFieldDecorator('idCard')(
                <Input placeholder="请输入身份证" />
              )}
            </FormItem>
            <FormItem label="用户名">
              {getFieldDecorator('username')(
                <Input placeholder="请输入用户名" />
              )}
            </FormItem>
            <FormItem label="真实姓名">
              {getFieldDecorator('realname')(
                <Input placeholder="请输入真实姓名" />
              )}
            </FormItem>
            <FormItem label="状态">
              {getFieldDecorator('status', { initialValue: -1 })(
                <Select placeholder="请选择状态" style={{ minWidth: '120px' }}>
                  <Option value={-1}>全部</Option>
                  <Option value={1}>正常</Option>
                  <Option value={0}>禁用</Option>
                </Select>
              )}
            </FormItem>
            <div style={{ display: 'inline-block', marginTop: '2px' }}>
              <Button type="primary" onClick={() => this.onListUser(pNum, true)}>搜索</Button>
              <Button style={{ marginLeft: 8 }} onClick={() => this.props.form.resetFields()}>重置</Button>
            </div>
          </Form>
        </div>
        <Table rowKey="id" columns={userColumns} dataSource={userList} pagination={userPagination} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    
  };
}

UserManage = Form.create()(UserManage);
export default connect(mapStateToProps)(UserManage);
