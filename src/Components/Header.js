import { useState } from "react";
import classNames from "classnames";

function Header({ setSort, setSpeed, enableButtons }) {
  //holds the navigation elements to be displayed on the navbars (sorting algorithms)
  let [navigation, setNavigation] = useState([
    {
      name: "Bubble Sort",
      href: "#",
      current: true,
      onClick: () => {
        //set active sort bubble
        setSort("bubble");
        changeCurrent(0);
      },
    },
    {
      name: "Insertion Sort",
      href: "#",
      current: false,
      onClick: () => {
        //set active sort insertion sort
        setSort("insert");
        changeCurrent(1);
      },
    },
    {
      name: "Selection Sort",
      href: "#",
      current: false,
      onClick: () => {
        //set active sort quick sort
        setSort("selection");
        changeCurrent(2);
      },
    },
    {
      name: "Quick Sort",
      href: "#",
      current: false,
      onClick: () => {
        //set active sort quick sort
        setSort("quick");
        changeCurrent(3);
      },
    },
    {
      name: "Merge Sort",
      href: "#",
      current: false,
      onClick: () => {
        //set active sort quick sort
        setSort("merge");
        changeCurrent(4);
      },
    },
    {
      name: "Heap Sort",
      href: "#",
      current: false,
      onClick: () => {
        //set active sort quick sort
        setSort("heap");
        changeCurrent(5);
      },
    },
  ]);

  const changeCurrent = (val) => {
    //used to change the current "active" sorting algorithm on the navbar (the one that is highlighted)
    let newNav = [...navigation]; //create a copy of the navigation array
    for (let x = 0; x < newNav.length; x++) {
      newNav[x].current = false; //set the status of all sorting algorithms to "false"
    }
    newNav[val].current = true; //set the status of the val (sorting algorithm name passed in) to current
    setNavigation(newNav); //display these changes in the navbar
  };

  //navbar design used from: https://tailwind-elements.com/docs/standard/navigation/navbar/
  //range slider design from: https://tailwind-elements.com/docs/standard/forms/range/
  return (
    <>
      <nav
        className="relative flex w-full flex-nowrap items-center justify-between bg-[#FBFBFB] py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-black lg:flex-wrap lg:justify-start lg:py-4"
        data-te-navbar-ref
      >
        <div className="flex w-full flex-wrap items-center justify-between px-3 ">
          <div className="ml-2"></div>

          <button
            className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
            type="button"
            data-te-collapse-init
            data-te-target="#navbarSupportedContent3"
            aria-controls="navbarSupportedContent3"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="[&>svg]:w-7">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-7 w-7"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>

          <div
            className="!visible mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto"
            id="navbarSupportedContent3"
            data-te-collapse-item
          >
            <ul
              className="list-style-none mr-auto flex flex-col pl-0 lg:mt-1 lg:flex-row"
              data-te-navbar-nav-ref
            >
              <li
                className="my-4 pl-2 lg:my-0 lg:pl-2 lg:pr-1"
                data-te-nav-item-ref
              >
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    as="a"
                    href={item.href}
                    onClick={enableButtons ? item.onClick : null}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "px-3 py-2 rounded-md text-sm font-small"
                    )}
                    aria-current={item.current ? "page" : undefined}
                    data-te-nav-link-ref
                  >
                    {item.name}
                  </a>
                ))}
              </li>
            </ul>
            <span className="mr-8">
              <label
                htmlFor="customRange1"
                className="mb-2 m-0 inline-block text-neutral-700 dark:text-neutral-200"
              >
                Animation Speed
              </label>
              <input
                defaultValue={20}
                type="range"
                className="m-0 reverse transparent h-[4px] w-full cursor-pointer appearance-none border-transparent bg-neutral-200 dark:bg-slate-50"
                id="customRange1"
                min="5"
                max="1000"
                onChange={() => {
                  setSpeed(document.getElementById("customRange1").value);
                }}
              />
            </span>
            <span className="ml-2 mr-2 text-xl text-neutral-800 dark:text-neutral-200">
              Sorting Algorithm Visualiser
            </span>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
