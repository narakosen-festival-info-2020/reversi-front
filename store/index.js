export const state = () => ({
  boardType: '',
  height: 0,
  width: 0,
  board: []
})

export const mutations = {
  set (state, type) {
    state.boardType = type
  },
  customSet (state, arr) {
    state.height = arr[0]
    state.width = arr[1]
    state.board = arr[2]
  }
}

export const getters = {
  returnPostData (state) {
    const returnObj = {
      board_type: state.boardType
    }
    if (state.boardType === 'custom') {
      returnObj.height = state.height
      returnObj.width = state.width
      returnObj.board = state.board
    }

    return returnObj
  }
}
