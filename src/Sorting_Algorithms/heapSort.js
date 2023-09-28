function callHeapSort(numberList) {
  //function used to call a heap sort on a given array (numberList)
  let numberListCopy = [...numberList]; //copy the numberList as to not overwrite it when creating animations for the sort
  let swapAnimations = []; // create an empty list to store the swap animations
  let numberListLength = numberListCopy.length; //length of the array

  //build the heap to store our array elements
  for (let i = Math.floor(numberListLength / 2) - 1; i >= 0; i--) {
    heapify(numberListCopy, swapAnimations, numberListLength, i);
  }

  //"traversing" the heap, element by element:
  for (let j = numberListLength - 1; j > 0; j--) {
    //push to swap animations twice: once to change color, other to revert the color
    swapAnimations.push([0, j, "CC"]); //"CC" = color change
    swapAnimations.push([0, j, "CR"]); // "CR" = color revert
    //moving the current root to the end of the heap
    [numberListCopy[0], numberListCopy[j]] = [
      numberListCopy[j],
      numberListCopy[0],
    ];
    swapAnimations.push([0, j]); //push the swap to the swapAnimations array
    heapify(numberListCopy, swapAnimations, j, 0); //call on new, smaller heap
  }

  return swapAnimations; //return our animations
}

function heapify(numberListCopy, swapAnimations, N, i) {
  let largest = i; //root node is largest
  let l = 2 * i + 1; //left
  let r = 2 * i + 2; //right

  //left child > root
  if (l < N && numberListCopy[l] > numberListCopy[largest]) largest = l;

  //right child > root
  if (r < N && numberListCopy[r] > numberListCopy[largest]) largest = r;

  // largest != root
  if (largest != i) {
    //push to swap animations twice: once to change color, other to revert the color
    swapAnimations.push([i, largest, "CC"]); //"CC" = color change
    swapAnimations.push([i, largest, "CR"]); // "CR" = color revert
    [numberListCopy[i], numberListCopy[largest]] = [
      numberListCopy[largest],
      numberListCopy[i],
    ];

    swapAnimations.push([i, largest]); //push swap to the animations array

    heapify(numberListCopy, swapAnimations, N, largest);
  }
}

export default callHeapSort;
