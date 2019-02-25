(() => {
  const container = document.getElementById('app');
  container.classList.add('container');

  const cells = [];
  const cellQuantity = 16;

  function createCells() {
    for (let i = 0; i < cellQuantity; i++) {
      const newCell = {
        id: i,
        name: i + 1,
        empty: false,
      };
      if (i === cellQuantity - 1) {
        newCell.name = '';
        newCell.empty = true;
      }
      cells.push(newCell);
    }
  }

  function swap(item1, item2) {
    const temp = cells[item1];
    cells[item1] = cells[item2];
    cells[item2] = temp;
  }

  function renderCells() {
    container.innerHTML = '';
    for (let i = 0; i < cells.length; i++) {
      const cellPuzzle = document.createElement('div');
      cellPuzzle.textContent = cells[i].name;
      cellPuzzle.classList = 'cell__container';
      cellPuzzle.dataset.cellNum = cells[i].name;
      container.appendChild(cellPuzzle);
    }
  }

  function shaflCells() {
    for (let i = 0; i < cellQuantity; i++) {
      const item1 = Math.round(Math.random() * (cellQuantity - 1));
      const item2 = Math.round(Math.random() * (cellQuantity - 1));
      swap(item1, item2);
    }
    renderCells();
  }

  function findCell(num) {
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].name === num) {
        return i;
      }
    }
    return 0;
  }

  function winnerCombination() {
    for (let i = 0; i < cellQuantity - 1; i++) {
      if (i !== cells[i].id) {
        return;
      }
    }
    alert('You Won!!!');
  }

  createCells();
  renderCells();
  shaflCells();

  container.addEventListener('click', (e) => {
    const targetNum = +e.target.closest('.cell__container').dataset.cellNum;
    const tempNum = findCell('');
    const clickedNumber = findCell(targetNum);

    const revUp = clickedNumber + 1 !== 4 && clickedNumber + 1 !== 8 && clickedNumber + 1 !== 12;
    const revDown = clickedNumber - 1 !== 3 && clickedNumber - 1 !== 7 && clickedNumber - 1 !== 11;

    if (clickedNumber + 4 === tempNum
      || clickedNumber - 4 === tempNum
      || (clickedNumber + 1 === tempNum && revUp)
      || (clickedNumber - 1 === tempNum && revDown)) {
      swap(clickedNumber, tempNum);
    }
    renderCells();
    setTimeout(winnerCombination, 0);
  });

  document.addEventListener('keydown', (e) => {
    const tempNum = findCell('');
    if (e.keyCode === 39) {
      if (tempNum > 0 && tempNum - 1 !== 3 && tempNum - 1 !== 7 && tempNum - 1 !== 11) {
        swap(tempNum - 1, tempNum);
      }
    }
    if (e.keyCode === 37) {
      if (tempNum < 15 && tempNum + 1 !== 4 && tempNum + 1 !== 8 && tempNum + 1 !== 12) {
        swap(tempNum + 1, tempNum);
      }
    }

    if (e.keyCode === 40) {
      if (tempNum - 4 >= 0) {
        swap(tempNum - 4, tempNum);
      }
    }

    if (e.keyCode === 38) {
      if (tempNum + 4 < 16) {
        swap(tempNum + 4, tempNum);
      }
    }
    renderCells();
    setTimeout(winnerCombination, 0);
  });

  const buttonShafl = document.createElement('button');
  buttonShafl.classList.add('button__shafl');
  buttonShafl.textContent = 'Shafl';
  document.body.appendChild(buttonShafl);
  buttonShafl.addEventListener('click', () => {
    shaflCells();
  });

})();
