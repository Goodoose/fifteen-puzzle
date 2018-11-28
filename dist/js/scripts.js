(() => {
  const container = document.getElementById('app');
  container.classList.add('container');

  const cells = [];
  const cellQuantity = 16;

  const createCells = function createCells() {
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
  };
  const swap = function swap(item1, item2) {
    const temp = cells[item1];
    cells[item1] = cells[item2];
    cells[item2] = temp;
  };

  const renderCells = function renderCell() {
    container.innerHTML = '';
    for (let i = 0; i < cells.length; i++) {
      const cellPazzle = document.createElement('div');
      cellPazzle.textContent = cells[i].name;
      cellPazzle.classList = `cellClass${i}`;
      container.appendChild(cellPazzle);
    }
  };

  const shaflCells = function shafl() {
    for (let i = 0; i < cellQuantity; i++) {
      const item1 = Math.round(Math.random() * (cellQuantity - 1));
      const item2 = Math.round(Math.random() * (cellQuantity - 1));
      swap(item1, item2);
    }
    renderCells();
  };

  const isEmptyCell = function isEmptyCell() {
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].empty === true) {
        return i;
      }
    }
  };

  const vinnerCombination = function vinnerCombination() {
    for (let i = 0; i < cellQuantity - 1; i++) {
      if (i !== cells[i].id) {
        return;
      }
    }
    alert('You Vinner!!!');
  };

  createCells();
  renderCells();

  document.addEventListener('keydown', (e) => {
    const tempNum = isEmptyCell();
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
    setTimeout(vinnerCombination(), 1000);
  });

  const buttonShafl = document.createElement('button');
  buttonShafl.classList.add('buttonShafl');
  buttonShafl.textContent = 'Shafl';
  document.body.appendChild(buttonShafl);
  buttonShafl.addEventListener('click', () => {
    shaflCells();
  });
})();
