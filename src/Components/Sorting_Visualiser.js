import { useEffect, useState } from "react";
import Header from "./Header";
import bubbleSort from "../Sorting_Algorithms/bubbleSort";
import insertionSort from "../Sorting_Algorithms/insertionSort";
import selectionSort from "../Sorting_Algorithms/selectionSort";
import callQuickSort from "../Sorting_Algorithms/quickSort";
import callMergeSort from "../Sorting_Algorithms/mergeSort";
import callHeapSort from "../Sorting_Algorithms/heapSort";

const NUMBER_ARRAY_VALS = 100;

function Sorting_Visualiser() {
  let [array, setArray] = useState(createArray(NUMBER_ARRAY_VALS));
  let [activeSort, setActiveSort] = useState("bubble");
  let [sortingSpeed, setSortingSpeed] = useState(20);
  let [enableButtons, setEnableButtons] = useState(true);

  useEffect(() => {
    if (!enableButtons) {
      //disable all buttons on the page if a sort is being done
      document.getElementById("sortButton").disabled = true;
      document.getElementById("resetButton").disabled = true;
      document.getElementById("customRange1").disabled = true;
    } else {
      //enable all the buttons on the page after a sort has finished
      document.getElementById("sortButton").disabled = false;
      document.getElementById("resetButton").disabled = false;
      document.getElementById("customRange1").disabled = false;
    }
  }, [enableButtons]);

  useEffect(() => {
    //any time the user changes the sort, reset the array
    setArray(createArray(NUMBER_ARRAY_VALS));
  }, [activeSort]);

  useEffect(() => {
    //any time the array changes, ensure that all the bars are blue (haven't been changed by a sort)
    resetBars(array);
  }, [array]);

  const setSort = (val) => {
    setActiveSort(val);
  };

  const setSpeed = (val) => {
    setSortingSpeed(val);
  };

  const chooseSort = () => {
    //ensures correct sorting method is ran when the sort button is clicked
    setEnableButtons(false); //disables buttons to prevent bugs
    resetBars(array); //reset all the colours of the array
    //then, choose the correct sort
    if (activeSort === "bubble") {
      bubbleSortAnimate();
    } else if (activeSort === "insert") {
      insertionSortAnimate();
    } else if (activeSort === "quick") {
      quickSortAnimate();
    } else if (activeSort === "merge") {
      mergeSortAnimate();
    } else if (activeSort === "heap") {
      heapSortAnimate();
    } else if (activeSort === "selection") {
      selectionSortAnimate();
    }
  };

  const bubbleSortAnimate = () => {
    //function used to animate a bubble sort of the array
    let swapAnimations = bubbleSort(array); //get an array of the animations from the bubbleSort function
    let barsCollection = document.getElementsByClassName("bar"); //get all our bars on the screen, storing them in a html collection
    for (let x = 0; x < swapAnimations.length; x++) {
      const [i, j] = swapAnimations[x]; //i and j are the indexes of the 2 bars we are swapping
      const barOneStyle = barsCollection[i].style;
      const barTwoStyle = barsCollection[j].style;
      setTimeout(() => {
        if (x > 0) {
          //set prev bar colours back to blue (check if x>0 to ensure no memory leaks)
          const lastBarStyle = barsCollection[swapAnimations[x - 1][0]].style;
          const lastBarStyle2 = barsCollection[swapAnimations[x - 1][1]].style;
          lastBarStyle.color = "blue";
          lastBarStyle2.color = "blue";
        }
        //change color of the bars that we are comparing
        barOneStyle.color = "red";
        barTwoStyle.color = "red";
        //swap the heights of the 2 bars
        let barOneHeight = barOneStyle.height;
        barOneStyle.height = `${barTwoStyle.height}`;
        barTwoStyle.height = `${barOneHeight}`;
        if (x === swapAnimations.length - 1) setEnableButtons(true); //enable the buttons again when sorting is finished
      }, x * sortingSpeed);
    }
  };

  const insertionSortAnimate = () => {
    //function used to animate a insertion sort of the array
    let swapAnimations = insertionSort(array); //get an array of the animations from the insertionSort function
    let barsCollection = document.getElementsByClassName("bar"); //get all our bars on the screen, storing them in a html collection
    for (let x = 0; x < swapAnimations.length; x++) {
      let [i, j] = swapAnimations[x]; //i and j are the indexes of the 2 bars we are swapping
      const barOneStyle = barsCollection[i].style;
      const barTwoStyle = barsCollection[j].style;
      setTimeout(() => {
        if (x > 0) {
          //set prev bar colours back to blue (check if x>0 to ensure no memory leaks)
          const lastBarStyle = barsCollection[swapAnimations[x - 1][1]].style;
          lastBarStyle.color = "blue";
        }
        //change color of the bars we are locating to it's new position
        barTwoStyle.color = "red";
        let barOneHeight = barOneStyle.height;
        //swap the heights of the 2 bars
        barOneStyle.height = `${barTwoStyle.height}`;
        barTwoStyle.height = `${barOneHeight}`;
        if (x === swapAnimations.length - 1) setEnableButtons(true); //enable the buttons again when sorting is finished
      }, x * sortingSpeed);
    }
  };

  const selectionSortAnimate = () => {
    //function used to animate a bubble sort of the array
    let swapAnimations = selectionSort(array); //get an array of the animations from the selectionSort function
    let barsCollection = document.getElementsByClassName("bar"); //get all our bars on the screen, storing them in a html collection
    let lastMinIndex = 0; //keeps track of the index of the last minimum value that we have highlighted
    for (let x = 0; x < swapAnimations.length; x++) {
      let [i, j] = swapAnimations[x]; //i and j are either the indexes of the 2 bars we are swapping, or a value and a color code, which will determine the color of the bar
      setTimeout(() => {
        if (j == "HMV") {
          //highlight minimum value (color it red)
          barsCollection[lastMinIndex].style.color = "blue"; //revert color of last minimum value to blue
          lastMinIndex = i; //keep track of index so we can change color of it back to blue when find a new min value
          barsCollection[i].style.color = "red";
        } else if (j == "HCCV") {
          //highlight current comparison value black (value we are comparing to the current minimum value)
          barsCollection[i].style.color = "black";
        } else if (j == "UOCV") {
          //unhighlight old comparison value (i.e., this value is greater than the minimum value)
          if (barsCollection[i].style.color != "red") {
            barsCollection[i].style.color = "blue";
          }
        } else {
          const barOneStyle = barsCollection[i].style;
          const barTwoStyle = barsCollection[j].style;

          if (barOneStyle.color != "red" && barTwoStyle != "red") {
            //change color of the bars we are swapping
            barOneStyle.color = "red";
            barTwoStyle.color = "red";
            let barOneHeight = barOneStyle.height;
            //swap the heights of the 2 bars
            barOneStyle.height = `${barTwoStyle.height}`;
            barTwoStyle.height = `${barOneHeight}`;
          } else {
            //reverting the color of the bars that we have swapped
            barOneStyle.color = "blue";
            barTwoStyle.color = "blue";
          }
          if (x === swapAnimations.length - 1) setEnableButtons(true); //enable the buttons again when sorting is finished
        }
      }, x * sortingSpeed);
    }
  };

  const quickSortAnimate = () => {
    //function used to animate a quick sort of the array
    let swapAnimations = callQuickSort(array, 0, array.length - 1); //get an array of the animations from the callQuickSort function
    let barsCollection = document.getElementsByClassName("bar"); //get all our bars on the screen, storing them in a html collection
    let lastStart = 0; //used to store the starting index of the last array partition, enabling me to change the entire partition back to blue once sorted
    let lastEnd = 0; //used to store the ending index of the last array partition, again enabling me to change the entire partition back to blue once sorted
    for (let x = 0; x < swapAnimations.length; x++) {
      if (swapAnimations[x].length === 3) {
        //if length of sub-array is 3, we are dealing with a new partition
        setTimeout(() => {
          for (let z = lastStart; z <= lastEnd; z++) {
            //set the last partitions colour back to blue
            barsCollection[z].style.color = "blue";
          }
          let [i, j, k] = swapAnimations[x];
          lastStart = i; //store the values of the start+end of the partition, for next iteration
          lastEnd = j;
          for (let y = i; y <= j; y++) {
            //set the colour of the new partition to black
            barsCollection[y].style.color = "black";
          }
        }, x * sortingSpeed);
      } else {
        //else, if not new partition, we are swapping values
        let [i, j] = swapAnimations[x];
        const barOneStyle = barsCollection[i].style;
        const barTwoStyle = barsCollection[j].style;
        setTimeout(() => {
          if (x > 0) {
            //change values of the last 2 bars swapped back to black (if x>0 to prevent memory leak)
            const lastBarStyle = barsCollection[swapAnimations[x - 1][1]].style;
            const lastBarStyle2 =
              barsCollection[swapAnimations[x - 1][0]].style;
            lastBarStyle2.color = "black";
            lastBarStyle.color = "black";
          }
          //set colours of the bars that we are swapping to red
          barOneStyle.color = "red";
          barTwoStyle.color = "red";
          //swap the heights of the bars of the array elements that we are swapping
          let barOneHeight = barOneStyle.height;
          barOneStyle.height = `${barTwoStyle.height}`;
          barTwoStyle.height = `${barOneHeight}`;
          if (x === swapAnimations.length - 1) setEnableButtons(true); //if we are done swapping, enable the buttons again
        }, x * sortingSpeed);
      }
    }
  };

  const mergeSortAnimate = () => {
    //function used to animate the merge sort of an array
    let swapAnimations = callMergeSort(array); //get an array of the animations from the callQuickSort function
    let barsCollection = document.getElementsByClassName("bar"); //get all our bars on the screen, storing them in a html collection
    for (let x = 0; x < swapAnimations.length; x++) {
      if (swapAnimations[x].length == 3) {
        //if length of swapAnimations[x] is 3, we have some bars to color
        const [i, j, colorCode] = swapAnimations[x];
        setTimeout(() => {
          if (colorCode == "CNP") {
            //Color new partition
            for (let y = i; y <= j; y++) {
              barsCollection[y].style.color = "black";
            }
          } else if (colorCode == "RCP") {
            //Revert color of partition
            for (let y = i; y <= j; y++) {
              barsCollection[y].style.color = "blue";
            }
          } else if (colorCode == "CB") {
            //color bars we are comparing
            barsCollection[i].style.color = "red";
            barsCollection[j].style.color = "red";
          } else {
            //reverting color of bars
            barsCollection[i].style.color = "black";
            barsCollection[j].style.color = "black";
          }
          if (x === swapAnimations.length - 1) setEnableButtons(true); //if we are done swapping, enable the buttons again
        }, x * sortingSpeed);
      } else {
        //else we must give a bar a new height value (animating the sort)
        setTimeout(() => {
          let [barIndex, newHeight] = swapAnimations[x];
          barsCollection[barIndex].style.height = `${newHeight}px`;
        }, x * sortingSpeed);
      }
    }
  };

  const heapSortAnimate = () => {
    //function used to animate the heap sort of an array
    let swapAnimations = callHeapSort(array); //get an array of the animations from the callHeapSort function
    let barsCollection = document.getElementsByClassName("bar"); //get all our bars on the screen, storing them in a html collection
    for (let x = 0; x < swapAnimations.length; x++) {
      if (swapAnimations[x].length === 3) {
        // if swapAnimations[x] is of length 3, then we need to change the color of the bars within this sub-array (i+j)
        setTimeout(() => {
          let [i, j, colorCode] = swapAnimations[x];
          if (colorCode == "CC") {
            // color change (these are bars that we are swapping)
            barsCollection[i].style.color = "red";
            barsCollection[j].style.color = "red";
          }
          if (colorCode == "CR") {
            // color revert (change the bars back to there original colours as we are now done with them)
            barsCollection[i].style.color = "blue";
            barsCollection[j].style.color = "blue";
          }
        }, x * sortingSpeed);
      } else {
        // else, just swap the bars
        let [i, j] = swapAnimations[x];
        let barOneStyle = barsCollection[i].style;
        let barTwoStyle = barsCollection[j].style;
        setTimeout(() => {
          let barOneHeight = barOneStyle.height;
          //swap the heights of the 2 bars
          barOneStyle.height = `${barTwoStyle.height}`;
          barTwoStyle.height = `${barOneHeight}`;
          if (x === swapAnimations.length - 1) setEnableButtons(true); //if we are done swapping, enable the buttons again
        }, x * sortingSpeed);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white object-fill">
      <Header
        setSort={setSort}
        setSpeed={setSpeed}
        enableButtons={enableButtons}
      />
      <br />
      <div className="flex justify-center bg-white">
        <ul className="resize-y">
          {array.map((item, index) => (
            <li
              key={index}
              className={"bar m-0 border-white verticalLine justify-center"}
              style={{
                color: "blue",
                height: `${item}px`,
              }}
            ></li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-center bg-white">
        <button
          onClick={() => {
            chooseSort();
          }}
          className="border-2 rounded-md p-2 m-1 border-black bg-zinc-200"
          id="sortButton"
        >
          Sort
        </button>
        <button
          onClick={() => {
            setArray(createArray(NUMBER_ARRAY_VALS));
          }}
          className="border-2 rounded-md p-2 m-1 border-black bg-zinc-200"
          id="resetButton"
        >
          Reset Array
        </button>
      </div>
    </div>
  );
}

function resetBars(array) {
  var bars = document.getElementsByClassName("bar");
  for (let x = 0; x < bars.length; x++) {
    bars[x].style.color = "blue";
    bars[x].style.height = `${array[x]}px`;
  }
}

function createArray(size) {
  //function used to create an array of random numbers of a given size
  let numberList = [];
  for (let i = 0; i < size; i++) {
    let value = Math.floor(Math.random() * (window.screen.height * 0.5));
    while (value === 0) {
      //if value is 0, keep generating numbers until not 0
      value = Math.floor(Math.random() * 50);
    }
    numberList.push(value); //push values onto the numberList array
  }
  return numberList; //return the numberList
}

export default Sorting_Visualiser;
