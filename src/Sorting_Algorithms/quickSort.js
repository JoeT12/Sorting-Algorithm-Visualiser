function callQuickSort(numberList, start, end) {
  //creates all arrays required to generate the animations needed to sort the array, calls quickSort, then returns the animations
  let numberListCopy = [...numberList]; // copy the array, so we don't make any changes to the original on the screen
  let swapAnimations = []; // our array that will contain the swaps to be made to achieve the sorted array
  quickSort(numberListCopy, swapAnimations, start, end); // call quick sort with our new arrays
  return swapAnimations; //return the swap animations
}

function quickSort(numberList, swapAnimations, start, end) {
  // driver quick sort function
  if (end <= start) return; // can't partition the list any further, so return

  let pivot = partitionArray(numberList, swapAnimations, start, end); //return our pivot

  quickSort(numberList, swapAnimations, start, pivot - 1); //call again with chunk of array before the pivot
  quickSort(numberList, swapAnimations, pivot + 1, end); //call again with chunk of array after the pivot
}

function partitionArray(numberList, swapAnimations, start, end) {
  //partitions our array, by providing the new value of our pivot after the current iteration of quick sort has been completed
  let pivot = numberList[end]; //this version of quickSort chooses to use the last value of the array as the pivot to start.
  let i = start - 1; // set our i value
  swapAnimations.push([start, end, "NP"]); //let out animations array know that we have created a new partition (by passing start+end of partition, and "np" to highlight it)

  for (let j = start; j <= end - 1; j++) {
    if (numberList[j] < pivot) {
      // if j value is less than pivot, then...
      i++; //incrament our i value
      [numberList[i], numberList[j]] = [numberList[j], numberList[i]]; //then swap our i and j values
      swapAnimations.push([i, j]); //push these to our animations array
    }
  }

  //we must now place the pivot..
  i++; //incrament the i value
  [numberList[i], numberList[end]] = [numberList[end], numberList[i]]; //swap the pivot with the i
  swapAnimations.push([i, end]); //push to the animations array

  return i; //return the position of the pivot
}

export default callQuickSort;
