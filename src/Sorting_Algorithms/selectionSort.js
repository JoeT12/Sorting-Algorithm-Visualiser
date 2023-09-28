function selectionSort(numberList) {
  //performs a selection sort on a given array of numbers, and returns an array of animations to achieve the same result
  let numberListCopy = [...numberList]; //create a copy of the array (don't want to effect the array on the screen)
  let swapAnimations = []; //create an array to hold our animations
  let minumumIndex; //variable to hold the minimum index of a given iteration of the sort
  for (let x = 0; x < numberListCopy.length - 1; x++) {
    minumumIndex = x; //set the index of the minimum value to the index we are starting from
    swapAnimations.push([minumumIndex, "HMV"]); //highlight the current minimum value (HMV = HIGHLIGHT MINIMUM VALUE)
    for (let y = x + 1; y < numberListCopy.length; y++) {
      swapAnimations.push([y, "HCCV"]); //highlight value that we are comparing the minimum index to (HCV = HIGHLIGHT CURRENT COMPARISON VALUE)

      if (numberListCopy[y] < numberListCopy[minumumIndex]) {
        //new minimum value found
        minumumIndex = y;
        swapAnimations.push([minumumIndex, "HMV"]); //highlight the NEW current minimum value (HMV = HIGHLIGHT MINIMUM VALUE)
      }
      swapAnimations.push([y, "UOCV"]); //unhighlight the value that we are comparing the minimum value to (UOCV = UNHIGHLIGHT OLD COMPARISON VALUE)
    }
    [numberListCopy[x], numberListCopy[minumumIndex]] = [
      numberListCopy[minumumIndex],
      numberListCopy[x],
    ]; //swap the first value with the minimum value (this is now sorted)
    //push this swap twice => one time to highlight it, second time to unhighlight it
    swapAnimations.push([x, minumumIndex]);
    swapAnimations.push([x, minumumIndex]);
  }
  return swapAnimations; //return the swapAnimations array
}

export default selectionSort;
