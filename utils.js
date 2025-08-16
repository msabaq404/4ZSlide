async function swapCells(cell1, cell2) {
  const rect1 = cell1.getBoundingClientRect();
  const rect2 = cell2.getBoundingClientRect();

  const deltaX = rect2.left - rect1.left;
  const deltaY = rect2.top - rect1.top;

  // Set initial positions
  cell1.style.transition = "none";
  cell2.style.transition = "none";
  cell1.style.transform = "none";
  cell2.style.transform = "none";

  // Trigger reflow
  cell1.offsetHeight;
  cell2.offsetHeight;

  // Add transition and move
  cell1.style.transition = "transform 0.3s ease-in-out";
  cell2.style.transition = "transform 0.3s ease-in-out";
  cell1.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  cell2.style.transform = `translate(${-deltaX}px, ${-deltaY}px)`;

  // After animation, swap DOM positions
  await new Promise((resolve) => {
    setTimeout(() => {
      cell1.style.transition = "none";
      cell2.style.transition = "none";
      cell1.style.transform = "none";
      cell2.style.transform = "none";

      const temp = cell1.nextSibling;
      cell2.parentNode.insertBefore(cell1, cell2.nextSibling);
      cell1.parentNode.insertBefore(cell2, temp);

      resolve();
    }, 300);
  });

}

function findValueIndices(array2D, searchValue) {
  for (let i = 0; i < array2D.length; i++) {
    for (let j = 0; j < array2D[i].length; j++) {
      if (array2D[i][j] == searchValue) {
        return [i, j];
      }
    }
  }
  return null;
}
function findChildByContent(parentElement, searchContent) {
  const children = parentElement.children;
  for (let child of children) {
    if (child.textContent == searchContent) {
      return child;
    }
  }
  return null;
}
function findElementByContent(nodeList, searchValue) {
  for (let node of nodeList) {
    if (node.textContent == searchValue) {
      return node;
    }
  }
  return null;
}

function updateGapSlider(gapInput) {
  const value = gapInput.value;
  const min = gapInput.min || 0;
  const max = gapInput.max || 100;
  const percentage = ((value - min) / (max - min)) * 100;
  gapInput.style.background = `linear-gradient(to right, rebeccapurple ${percentage}%, #ddd ${percentage}%)`;
}

