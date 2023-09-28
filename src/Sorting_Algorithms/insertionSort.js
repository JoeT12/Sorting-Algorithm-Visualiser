function insertionSort(numberList) {
  //returns an array containing all the swaps that occur between array elements when the passed-in array is insertion sorted
  var swapAnimations = []; // our array that will contain the swaps to be made to achieve the sorted array
  var numberListCopy = [...numberList]; // copy the array, so we don't make any changes to the original on the screen
  let positionToInsert; //holds the position we are going to insert the element we are currently sorting
  let valueToInsert; //holds the value that we are sorting (and going to insert into the positionToInsert)
  for (let i = 1; i < numberListCopy.length; i++) {
    //for every element in the array.... (apart from i=0 as it is already sorted)
    valueToInsert = numberListCopy[i]; //set value to insert as current element
    positionToInsert = i; //set position to insert as current index of element

    while (
      positionToInsert > 0 &&
      numberListCopy[positionToInsert - 1] > valueToInsert
    ) {
      //moving backwards from element to be sorted, compare and swap it with other elements until in correct position
      numberListCopy[positionToInsert] = numberListCopy[positionToInsert - 1];
      swapAnimations.push([positionToInsert, positionToInsert - 1]);
      positionToInsert--;
    }

    numberListCopy[positionToInsert] = valueToInsert; //place element in it's sorted position
  }
  return swapAnimations; //return the sorted swaps array
}

export default insertionSort;
