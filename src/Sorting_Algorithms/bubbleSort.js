function bubbleSort(numberList) {
  //returns an array containing all the swaps that occur between array elements when the passed-in array is bubble sorted
  var swapAnimations = []; // our array that will contain the swaps to be made to achieve the sorted array
  let numberListCopy = [...numberList]; // copy the array, so we don't make any changes to the original on the screen
  for (let i = 0; i < numberListCopy.length; i++) {
    for (let j = 0; j < numberListCopy.length - i - 1; j++) {
      if (Math.ceil(numberListCopy[j]) > Math.ceil(numberListCopy[j + 1])) {
        //if element j>j+1 then swap the elements
        swapAnimations.push([j, j + 1]); //add these to the swaps array
        [numberListCopy[j], numberListCopy[j + 1]] = [
          numberListCopy[j + 1],
          numberListCopy[j],
        ];
      }
    }
  }
  return swapAnimations; //return the swaps array
}

export default bubbleSort;
