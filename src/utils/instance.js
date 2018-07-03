import axios from 'axios';
import baseConfig from '../config/index';
import { history } from '../index'; // 全局只能有一个history实例。所以从这里导入
//axios 配置
const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? `${baseConfig.java_server}` : `${baseConfig.java_server}`, //设置默认api路径
  // timeout: 5000, //设置超时时间
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    if (res.data && (res.data.code !== 200)) {
      if (res.data.code === 1001) {
        history.push('/'); // 登录超时退回登录页
      }
      return Promise.reject({
        code: res.data.code,
        msg: res.data.msg,
      });
    }
    return res.data;
  },
  error => {
    if (error && error.response) {
      console.log('The request was made and the server responded with a status code that falls out of the range of 2xx', error.response.status);
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      switch (error.response.status) {
        case 400: error.msg = '请求错误'; break;
        case 401: error.msg = '未授权，请登录'; break;
        case 403: error.msg = '拒绝访问'; break;
        case 404: error.msg = `请求地址出错: ${error.response.config.url}`; break;
        case 408: error.msg = '请求超时'; break
        case 500: error.msg = '服务器内部错误'; break;
        case 501: error.msg = '服务未实现'; break;
        case 502: error.msg = '网关错误'; break;
        case 503: error.msg = '服务不可用'; break;
        case 504: error.msg = '网关超时'; break;
        case 505: error.msg = 'HTTP版本不受支持'; break;
        default: error.msg = '请求出错';
      }
    } else if (error && error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log('The request was made but no response was received:', error.request, error.request.ontimeout);
      error.msg = '未响应或请求超时';
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Something happened in setting up the request that triggered an Error:', error.message);
      error.msg = '请求出错';
    }
    return Promise.reject(error);
  }
);

export default instance;