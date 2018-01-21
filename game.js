'use strict'

class ViewComponent {
    constructor() {
        if (new.target === ViewComponent)
            throw new Error("Abstract class")
    }

    getElement() {
        return this._element
    }
}

class GameCell extends ViewComponent {
    constructor(clickHandler, row, column) {
        super()
        this._state = 'unknown'
        this._element = document.createElement('td')
        this._element.addEventListener('click', () => clickHandler(row, column))
    }

    setState(state) {
        if (state !== 'unknown' && state !== 'miss' && state !== 'hit') {
            throw new Error('Invalid state')
        }
        this._state = state
        this._element.className = 'cell_' + state
    }
}

class GameBoard extends ViewComponent {
    constructor(clickHandler) {
        super()
        this._element = document.createElement('table')
        this._cells = {}
        for (let rowIndex = 0; rowIndex < 10; rowIndex++) {
            const row = document.createElement('tr');
            for (let columnIndex = 0; columnIndex < 10; columnIndex++) {
                const cell = new GameCell(clickHandler, rowIndex, columnIndex);
                this._cells[this.createCoordinatesKey(rowIndex, columnIndex)] = cell
                row.appendChild(cell.getElement())
            }
            this._element.appendChild(row)
        }
    }

    createCoordinatesKey(row, column) {
        return row + 'x' + column
    }

    setStateAt(row, column, state) {
        this._cells[this.createCoordinatesKey(row, column)].setState(state)
    }
}

class GameController {

    constructor(boardView) {
        this._boardView = boardView
    }

    handleCellClick(row, column) {
        this._boardView.setStateAt(row, column, 'miss')
    }
}

const gameElement = document.getElementById('game')
let controller;

function handleCellClick(row, column) {
    controller.handleCellClick(row, column)
}

const board = new GameBoard(handleCellClick);
controller = new GameController(board);

gameElement.appendChild(board.getElement())

