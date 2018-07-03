import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
// import { userAPIs } from '../utils/apis';
import UserManage from './userManage/UserManage';
const { Header, Sider, Content } = Layout;

class HomePage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      collapsed: false,
    };
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    const { match, location, history } = this.props;
    const routeUrls = [
      { key: 'usermanage', name: '用户管理', icon: 'user' },
      { key: 'devicemanage', name: '设备管理', icon: 'tool' },
      { key: 'shopmanage', name: '商品管理', icon: 'shop' }
    ];
    return (
      <Layout className="common-layout">
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            onClick={({ key }) => history.push(key)}
            selectedKeys={[location.pathname]}            
            defaultSelectedKeys={['1']}
          >
            { routeUrls.map(item => (
              <Menu.Item key={`${match.path}/${item.key}`}>
                <Icon type={item.icon} />
                <span>{item.name}</span>
              </Menu.Item>
            )) }
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{ background: '#fff', padding: 0 }}
            className="header-bar"
          >
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: 0,
              padding: '16px 20px',
              background: '#fff',
              minHeight: 280,
              overflow: 'auto'
            }}>
            <Route path={`${match.path}/${routeUrls[0].key}`} component={UserManage} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    
  };
}

// HomePage = Form.create()(HomePage);
export default connect(mapStateToProps)(HomePage);
