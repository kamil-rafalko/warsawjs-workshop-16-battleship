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

    constructor(model) {
        this._model = model
    }

    handleCellClick(row, column) {
        this._model.fireAt(row, column)
    }
}

class GameModel {

    constructor() {
        this._state = {}
        this._observers = []

        for(let rowIndex = 0; rowIndex < 10; rowIndex++) {
            for (let columnIndex = 0; columnIndex < 10; columnIndex++) {
                const hasShip = (Math.random() >= 0.8)
                this._state[this.createCoordinatesKey(rowIndex, columnIndex)] = {
                    hasShip: hasShip,
                    firedAt: false
                }
            }
        }
    }

    createCoordinatesKey(row, column) {
        return row + 'x' + column
    }

    fireAt(row, column) {
        const targetCell = this._state[this.createCoordinatesKey(row, column)];

        if (targetCell.firedAt) {
            return
        }

        targetCell.firedAt = true
        const result = targetCell.hasShip ? 'hit' : 'miss'
        this._observers.forEach(observer => observer('firedAt', { result, row, column }))
    }

    addObserver(observerFunction) {
        this._observers.push(observerFunction)
    }
}

const gameElement = document.getElementById('game')
let controller;

function handleCellClick(row, column) {
    controller.handleCellClick(row, column)
}

const board = new GameBoard(handleCellClick);
let model = new GameModel();
model.addObserver((type, params) => {
    switch (type) {
        case 'firedAt':
            board.setStateAt(params.row, params.column, params.result)
            break;
    }
})
controller = new GameController(model);

gameElement.appendChild(board.getElement())

