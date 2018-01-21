const gameElement = document.getElementById('game')
const row = document.createElement('tr')
const cell1 = document.createElement('td')
const cell2 = document.createElement('td')

gameElement.appendChild(row)
row.appendChild(cell1)
row.appendChild(cell2)


function colorCell(event) {
    event.target.classList.add('clicked')
}

const cells = [cell1, cell2]

cells.forEach(cell => cell.addEventListener('click', colorCell))