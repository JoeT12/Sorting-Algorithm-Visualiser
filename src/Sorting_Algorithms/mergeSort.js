function callMergeSort(numberList) {
  //creates all arrays required to generate the animations needed to sort the array, calls mergeSort, then returns the animations
  let numberListCopy = [...numberList]; // copy the array, so we don't make any changes to the original on the screen
  let sortingArray = [...numberList]; //array used to sort the array (we are not creating new arrays and merging in this version of merge sort)
  let swapAnimations = []; // our array that will contain the swaps to be made to achieve the sorted array
  mergeSort(
    numberListCopy,
    swapAnimations,
    sortingArray,
    0,
    numberListCopy.length - 1
  ); // call merge sort with our new arrays
  return swapAnimations; //return the swap animations
}

function mergeSort(
  numberList,
  swapAnimations,
  sortingArray,
  startIndex,
  endIndex
) {
  //driver merge sort function
  if (startIndex === endIndex) return; //base case
  let middleIndex = Math.floor((startIndex + endIndex) / 2); //calculate the index where we are going to split the array "in half"

  //call merge sort recursivley on 2 "halfs" of array => stored in the sortingArray (using indexes as pointers to keep track of this)
  mergeSort(sortingArray, swapAnimations, numberList, startIndex, middleIndex);
  mergeSort(
    sortingArray,
    swapAnimations,
    numberList,
    middleIndex + 1,
    endIndex
  );

  //merge 2 "halfs" of the array together (passing in indexes to indicate where we are going to merge from/to)
  merge(
    numberList,
    swapAnimations,
    sortingArray,
    startIndex,
    middleIndex,
    endIndex
  );
}

function merge(numberList, swapAnimations, sortingArray, start, middle, end) {
  //function used to merge two "halfs" of the array together
  swapAnimations.push([start, end, "CNP"]); //highlight the section of the array we are merging (CNP = COLOR NEW PARTITION)
  let i = start,
    l = start,
    r = middle + 1; //variables used to help compare values from 2 "halfs" of array that we are merging
  while (l <= middle && r <= end) {
    //MERGE 2 halfs of the array together
    swapAnimations.push([l, r, "CB"]); //change the color of the bars that we are comparing (CB = CHANGE COLOR OF BARS)
    swapAnimations.push([l, r, "RCB"]); //revert the colors of the bar we are comparing (RCB = REVERT COLOR OF BARS)
    //compare 2 "halfs of array", merging them together in order
    if (sortingArray[l] < sortingArray[r]) {
      numberList[i] = sortingArray[l];
      swapAnimations.push([i, sortingArray[l]]);
      i++;
      l++;
    } else {
      numberList[i] = sortingArray[r];
      swapAnimations.push([i, sortingArray[r]]);
      i++;
      r++;
    }
  }
  //deal with any uncompared left over values
  while (l <= middle) {
    numberList[i] = sortingArray[l];
    swapAnimations.push([i, sortingArray[l]]);
    i++;
    l++;
  }
  while (r <= end) {
    numberList[i] = sortingArray[r];
    swapAnimations.push([i, sortingArray[r]]);
    i++;
    r++;
  }
  swapAnimations.push([start, end, "RCP"]); //Unhighlight the section of the array we are merging (RCP = REVERT COLOR OF PARTITION)
}

export default callMergeSort;
