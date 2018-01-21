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
    constructor() {
        super()
        this._state = 'unknown'
        this._element = document.createElement('td')
        this._element.addEventListener('click', () => this.setState('miss'))
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
    constructor() {
        super()
        this._element = document.createElement('table')
        for (let i = 0; i < 10; i++) {
            this._element.appendChild(this._createRow())
        }
    }

    _createRow() {
            const row = document.createElement('tr');
            for (let i = 0; i < 10; i++) {
                const cell = new GameCell();
                row.appendChild(cell.getElement())
            }
        return row
    }
}

const gameElement = document.getElementById('game')
const gameBoard = new GameBoard();
gameElement.appendChild(gameBoard.getElement())
