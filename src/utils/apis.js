import instance from '../utils/instance';
// import MockAdapter from 'axios-mock-adapter';
// // 设置模拟调试器实例 
// const mock = new MockAdapter(instance);
// // 模拟任意GET请求到 /users 
// //reply的参数为 (status, data, headers) 
// // ----------------------- 登录 --------------------------------------------
// const LoginUsers = [
//   { username: 'admin', password: 'admin' },
//   { username: 'root', password: 'root' }
// ];
// mock.onPost('/user/login').reply(config => {
//   let { username, password } = JSON.parse(config.data);
//   return new Promise((resolve, reject) => {
//     let user = null;
//     setTimeout(() => {
//       if (!(username && password)) {
//         resolve([400, { code: 400, msg: '请求参数错误' }])
//       }
//       let hasUser = LoginUsers.some(u => {
//         if (u.username === username && u.password === password) {
//           user = JSON.parse(JSON.stringify(u));
//           user.password = undefined;
//           return true;
//         }
//       });
//       if (hasUser) {
//         resolve([200, { code: 200, msg: '请求成功', data: user }]);
//       } else {
//         resolve([500, { code: 500, msg: '账号或密码错误' }]);
//       }
//     }, 200);
//   });
// });

// // ----------------------- 注册 --------------------------------------------
// mock.onPost('/user/insert').reply(config => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve([200, { code: 200, msg: '请求成功', data: { username: 'admin' } }]);
//     }, 200);
//   });
// });

// // ----------------------- 获取手机验证码 --------------------------------------------
// mock.onPost('/mobile/verification').reply(config => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve([200, {
//         code: 200,
//         msg: '请求成功'
//       }]);
//     }, 200);
//   });
// });

// // ----------------------- 手机号验证 --------------------------------------------
// mock.onPost('/user/validate/mobile').reply(config => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve([200, {
//         code: 200,
//         msg: '请求成功',
//         data: {
//           "mobile": "xxx",
//           "result": false // false(已存在)，true(可用)
//         }
//       }]);
//     }, 200);
//   });
// });
// // ----------------------- 用户名验证 --------------------------------------------
// mock.onPost('/user/validate/username').reply(config => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve([200, {
//         code: 200,
//         msg: '请求成功',
//         data: {
//           "username": "admin",
//           "result": false // false(已存在)，true(可用)
//         }
//       }]);
//     }, 200);
//   });
// });
// // ----------------------- 重置密码 --------------------------------------------
// mock.onPost('/user/reset/password').reply(config => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve([200, {
//         code: 200,
//         msg: '请求成功'
//       }]);
//     }, 200);
//   });
// });

const loginAPIs = {
  // 登录接口
  LOGIN: (params) => {
    return instance.post('/user/login', params);
  },
  // 注册商户接口
  INSERT: (params) => {
    return instance.post('/user/insert', params);
  },
  // 获取登录手机验证码接口
  GETMOBILECODE: (params) => {
    return instance.post('/mobile/verification', params);
  },
  // 获取忘记密码的验证码接口
  GETFORGOTCODE: (params) => {
    return instance.post('/mobile/forget', params);
  },
  // 验证手机号是否使用接口
  VALIDATEMOBILE: (params) => {
    return instance.post('/user/validate/mobile', params);
  },
  // 验证用户名是否使用接口 暂时没用
  VALIDATEUSERNAME: (params) => {
    return instance.post('/user/validate/username', JSON.stringify(params));
  },
  // 重置密码接口
  RESETPASSWORD: (params) => {
    return instance.post('/user/reset/password', params);
  },
  // 修改密码接口
  UPDATEPASSWORD: (params) => {
    return instance.post('/user/update/password', params);
  },
};

const userAPIs = {
  // 获取用户列表接口
  USERLIST: (params) => {
    return instance.post('/user/listUser', params);
  },
  // 根据条件获取用户列表接口
  USERLISTBYCOND: (params) => {
    return instance.post('/user/listUserByCondition', params);
  },
  // 获取某个用户的信息接口
  GETUSER: (params) => {
    return instance.post('/user/getUser', params);
  },
  // 禁用用户接口
  FORBIDUSER: (params) => {
    return instance.post('/user/invalidate', params);
  },
  // 恢复用户接口
  ALLOWUSER: (params) => {
    return instance.post('/user/recovery', params);
  },
}

const shopAPIs = {
  // 根据商户号获取店铺列表接口 【弃用】
  BRANCHLISTBYSTORENO: (params) => {
    return instance.post('/user/insert/assistant/store', params);
  },
  // 获取店铺及营业员列表接口
  GETASSISTANTLIST: (params) => {
    return instance.post('/store/list/storeAssistant', params);
  },
  // 店员注册接口
  INSERTASSISTANT: (params) => {
    return instance.post('/user/insert/assistant', params);
  },
  // 删除店员接口
  DELETEASSISTANT: (params) => {
    return instance.post('/user/delete/assistant', params);
  },
  // 店员登录
  ASSISTANTLOGIN: (params) => {
    return instance.post('/user/login/assistant', params);
  },
  // 营业员用户名校验接口
  VALIDATEASSISTANT: (params) => {
    return instance.post('/user/validate/assistant/username', params);
  },
  // 获取分店列表接口
  GETBRANCHLIST: (params) => {
    return instance.post('/store/list', params);
  },
  // 新增分店接口
  INSERTBRANCH: (params) => {
    return instance.post('/store/insert', params);
  },
  // 删除分店接口
  DELETEBRANCH: (params) => {
    return instance.post('/store/delete', params);
  },
  // 分店重名验证接口
  VALIDATEBRANCH: (params) => {
    return instance.post('/store/validate/name', params);
  },
}

const deviceAPIs = {
  // 获取店铺及其设备列表接口
  GETDEVICELIST: (params) => {
    return instance.post('/store/list/storeDevice', params);
  },
  // 绑定设备接口
  BINDDEVICE: (params) => {
    return instance.post('/device/bind', params);
  },
  // 解绑设备手机验证码获取接口
  GETUNBINDCODE: (params) => {
    return instance.post('/mobile/unbind', params);
  },
  // 解绑设备接口
  UNBINDDEVICE: (params) => {
    return instance.post('/device/unbind', params);
  },
  // 获取wifi接口
  GETTINGWIFI: (params) => {
    return instance.post('/device/get/wifi', params);
  },
  // 设置wifi接口
  SETTINGWIFI: (params) => {
    return instance.post('/device/set/wifi', params);
  },
}

const goodsAPIs = {
  // 根据设备码获取商品列表
  GETGOODSBYCODE: (params) => {
    return instance.post('/goods/list/byDeviceCode', params);
  },
  // 获取计价模式列表
  GETMODELLIST: (params) => {
    return instance.post('/goods/list/model', params);
  },
  // 新增商品
  INSERTGOODS: (params) => {
    return instance.post('/goods/insert', params);
  },
  // 修改商品
  UPDATEGOODS: (params) => {
    return instance.post('/goods/update', params);
  },
  // 删除商品
  DELETEGOODS: (params) => {
    return instance.post('/goods/delete', params);
  },
  // 批量删除商品
  BATCHDELETEGOODS: (params) => {
    return instance.post('/goods/delete/ids', params);
  },
  // 设备复制商品接口
  COPYGOODS: (params) => {
    return instance.post('/goods/copy', params);
  },
}

const businessAPIs = {
  // 获取最近收银记录
  GETRECENTRECORD: (params) => {
    return instance.post('/business/listRecentRecord', params);
  },
  // 扫描获取订单信息
  GETRECORDBYNO: (params) => {
    return instance.post('/business/query/byOrderNo', params);
  },
}

const statisticsAPIs = {
  // 按商品统计接口
  GETSTATISTICSBYGOODS: (params) => {
    return instance.post('/statistics/goods', params);
  },
  // 按营业员统计接口
  GETSTATISTICSBYSTAFF: (params) => {
    return instance.post('/statistics/staff', params);
  },
  // 按店铺统计接口
  GETSTATISTICSBYSTORE: (params) => {
    return instance.post('/statistics/store', params);
  },
  // 按支付类型统计
  GETSTATISTICSBYPAYTYPE: (params) => {
    return instance.post('/statistics/pay', params);
  },
  // 销售统计详细
  GETSTATISTICSDETAIL: (params) => {
    return instance.post('/statistics/detail', params);
  },
}

const accountAPIs = {
  // 更新商户信息
  UPDATE: (params) => {
    return instance.post('/user/update/currentUser', params);
  },
  // 获取当前用户信息接口
  GETCURRENTUSER: (params) => {
    return instance.post('/user/get/currentUser', params);
  },
  // 修改用户信息验证码
  GETINFOUPDATEMOBILECODE: (params) => {
    return instance.post('/mobile/update/userInfo', params);
  },
}

const advertAPIs = {
  // 获取顶部广告列表
  LISTBANNER: (params) => {
    return instance.post('/adv/list/head', params);
  },
}

const signAPIs = {
  // 获取员工签到记录
  GETSIGNRECORDINFO: (params) => {
    return instance.post('/sign/list/records', params);
  },
  // 签到接口
  SIGNRECORDIN: (params) => {
    return instance.post('/sign/assistant/in', params);
  },
  // 签退接口
  SIGNRECORDOUT: (params) => {
    return instance.post('/sign/assistant/out', params);
  },
  // 获取签到状态 (仅营业员有此接口权限)
  GETSIGNSTATUS: (params) => {
    return instance.post('/sign/assistant/status', params);
  },
  // 商户强制签退接口
  MASTERHELPOUT: (params) => {
    return instance.post('/sign/merchant/help/out', params);
  },
  // 获取店铺签到情况接口
  MASTERGETSTORESIGN: (params) => {
    return instance.post('/sign/merchant/sign/status', params);
  },
}

export {
  loginAPIs,
  userAPIs,
  shopAPIs,
  deviceAPIs,
  goodsAPIs,
  businessAPIs,
  statisticsAPIs,
  accountAPIs,
  advertAPIs,
  signAPIs,
};
