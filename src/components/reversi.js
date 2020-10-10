export default class Reversi {
	constructor(boardPattern) {
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
			}, // 左
		]
	}

	get getBoard(){
		return this.board
	}

	startBoard() {
		const halfBoard = this.board.length / 2
		this.board[halfBoard - 1][halfBoard - 1] = 1
		this.board[halfBoard][halfBoard] = 1
		this.board[halfBoard - 1][halfBoard] = 2
		this.board[halfBoard][halfBoard - 1] = 2
		return this.board
	}

	putStone(y, x, state, i) {
		const playerState = state + 1
		this.board[y][x] = playerState //put
		let moveX = x + this.movingCollection[i].x
		let moveY = y + this.movingCollection[i].y
		// eslint-disable-next-line no-constant-condition
		while (true) {
			if (this.board[moveY][moveX] == playerState) break
			this.board[moveY][moveX] = playerState
			moveX += this.movingCollection[i].x
			moveY += this.movingCollection[i].y
		}
	}

	canPutStone(y, x, state) {
		let returnFlag = false;
		if (this.board[y][x] == 0) {
			for (let i = 0; i < this.movingCollection.length; i++) {
				const cpssFlag = this.canPutStoneSearch(x, y, state, i)
				if (cpssFlag) {
					returnFlag=true
					this.putStone(y, x, state, i)
				}
			}
		}
		return returnFlag
	}

	canPutStoneSearch(x, y, state, i) {
		let moveX = x + this.movingCollection[i].x
		let moveY = y + this.movingCollection[i].y
		const playerState = state + 1
		const enemyState = (playerState == 1) ? 2 : 1
		let flag = false
		let returnFlag = false;
		// eslint-disable-next-line no-constant-condition
		while (true) {
			if (moveX < 0 || moveX == this.board.length || moveY < 0 || moveY == this.board.length || this.board[moveY][moveX] == 9) {
				break
			}
			if (this.board[moveY][moveX] == playerState) {
				console.log(this.board[moveY][moveX],enemyState,flag)
				if (flag) returnFlag = true
				break
			}
			if (this.board[moveY][moveX] == enemyState) {
				flag = true
			}
			moveX += this.movingCollection[i].x
			moveY += this.movingCollection[i].y
		}

		return returnFlag
	}
}