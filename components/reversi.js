export default class Reversi {
  constructor (boardPattern) {
    this.board = boardPattern
    this.movingCollection = [{
      x: -1,
      y: -1
    }, // 左上
    {
      x: 0,
      y: -1
    }, // 上
    {
      x: 1,
      y: -1
    }, // 右上
    {
      x: 1,
      y: 0
    }, // 右
    {
      x: 1,
      y: 1
    }, // 右下
    {
      x: 0,
      y: 1
    }, // 下
    {
      x: -1,
      y: 1
    }, // 左下
    {
      x: -1,
      y: 0
    } // 左
    ]
  }

  get getBoard () {
    return this.board
  }

  startBoard () {
    const halfBoard = this.board.length / 2
    this.board[halfBoard - 1][halfBoard - 1] = 1
    this.board[halfBoard][halfBoard] = 1
    this.board[halfBoard - 1][halfBoard] = 2
    this.board[halfBoard][halfBoard - 1] = 2
    return this.board
  }

  putStone (x, y, playerState, i) {
    this.board[y][x] = playerState // put
    let moveX = x + this.movingCollection[i].x
    let moveY = y + this.movingCollection[i].y
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (this.board[moveY][moveX] === playerState) { break }
      this.board[moveY][moveX] = playerState
      moveX += this.movingCollection[i].x
      moveY += this.movingCollection[i].y
    }
  }

  canPutStone (x, y, state) {
    const playerState = state + 1
    const enemyState = (playerState === 1) ? 2 : 1
    let returnFlag = false
    if (this.board[y][x] === 0) {
      for (let i = 0; i < this.movingCollection.length; i++) {
        const cpssFlag = this.canPutStoneSearch(x, y, playerState, enemyState, i)
        if (cpssFlag) {
          returnFlag = true
          this.putStone(x, y, playerState, i)
        }
      }
    }
    return returnFlag
  }

  canPutStoneSearch (xp, yp, playerState, enemyState, i) {
    let moveX = xp + this.movingCollection[i].x
    let moveY = yp + this.movingCollection[i].y
    let flag = false
    let returnFlag = false
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (moveX < 0 || moveX === this.board.length || moveY < 0 || moveY === this.board.length || this.board[moveY][moveX] === -1 || this.board[moveY][moveX] === 0) {
        break
      }
      if (this.board[moveY][moveX] === playerState) {
        if (flag) { returnFlag = true }
        break
      }
      if (this.board[moveY][moveX] === enemyState) {
        flag = true
      }
      moveX += this.movingCollection[i].x
      moveY += this.movingCollection[i].y
    }

    return returnFlag
  }

  finishSerch (state, board) {
    this.board = board
    const playerState = state + 1
    const enemyState = (playerState === 1) ? 2 : 1
    const bwFlag = [false, false]
    let returnFlag = 0 // 0 end, 1 continue ,2 skip
    for (let y = 0; y < this.board.length; y++) {
      for (let x = 0; x < this.board.length; x++) {
        for (let i = 0; i < this.movingCollection.length; i++) {
          if (this.board[y][x] === 0) {
            if (this.canPutStoneSearch(x, y, playerState, enemyState, i)) {
              bwFlag[playerState - 1] = true
            }
            if (this.canPutStoneSearch(x, y, enemyState, playerState, i)) {
              bwFlag[enemyState - 1] = true
            }
          }
        }
      }
    }

    if (!bwFlag[enemyState - 1]) {
      if (bwFlag[playerState - 1]) {
        returnFlag = 2
      }
    } else {
      returnFlag = 1
    }

    return returnFlag
  }
}
