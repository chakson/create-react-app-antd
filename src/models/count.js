// function to create a one second delay
const delay = (time) => new Promise(resolve => setTimeout(() => resolve(), time));

// count model
export default {
  state: 0,
  reducers: {
    addBy(state, payload) {
      console.log(state, payload, 54545)
      return state + payload
    }
  },
  effects: (dispatch) => ({
    async addByAsync(payload, state) {
      console.log(state, payload, 88888)
      await delay(1000)
      dispatch.count.addBy(1)
    }
  })
};
