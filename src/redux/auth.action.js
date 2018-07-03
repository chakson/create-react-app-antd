import instance from '../utils/instance';

//这个叫做action，用于更新reduer中的state
const loginAction = (result) => ({
  type: 'LOGIN_SUCCESS',
  data: result
})

//获取服务器的参数，并且返回一个异步的dispatch，dispatch的对象是自己定义的action
export const login = (params) => async (dispatch) => {
  try {
    let response = await instance.post('/user/login', params)
    await dispatch(loginAction(response.data))
  } catch (error) {
    console.log('error: ', error)
  }
}
