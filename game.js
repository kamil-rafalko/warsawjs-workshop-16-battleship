class GameCell {
    constructor() {
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

    getElement() {
        return this._element
    }
}




const gameElement = document.getElementById('game')
const row = document.createElement('tr')
gameElement.appendChild(row)
const cell1 = new GameCell()
row.appendChild(cell1.getElement())
