export const state = () => ({
  boardType: ''
})

export const mutations = {
  set (state, type) {
    state.boardType = type
  }
}
