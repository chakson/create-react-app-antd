export const user = {
  state: {
    username: 'admin',
    role: '1',
  }, // initial state
  reducers: {
    // handle state changes with pure functions
    updateUsername(state, payload) {
      console.log(state, payload)
      state.username = payload;
      return state;
    },
    updateRole(state, payload) {
      state.role = payload;
      return state;
    }
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async incrementAsync(payload, rootState) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      dispatch.count.increment(payload)
    }
  })
}