import React, { Component, Fragment, useEffect, useState } from "react";
import classNames from "classnames";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";
const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

const Pagination = ({ pageCount = 1, pageNumber = 1, pageNeighbours = 2, setPageNumber = (f) => f, ...rest }) => {
  const [currentPageNumer, setCurrentPageNumber] = useState(1);
  useEffect(() => {
    // pageNeighbours can be: 0, 1 or 2
    pageNeighbours = typeof pageNeighbours === "number" ? Math.max(0, Math.min(pageNeighbours, 2)) : 0;
  }, [pageCount, pageNeighbours]);

  useEffect(() => {
    goToPage(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    setPageNumber(currentPageNumer);
  }, [currentPageNumer]);

  const goToPage = (page) => {
    // debugger;
    const _pageNumber = Math.max(0, Math.min(page, pageCount));
    setCurrentPageNumber(_pageNumber);
  };

  const handleClick = (page) => (evt) => {
    evt.preventDefault();
    goToPage(page);
  };

  const handleMoveLeft = (evt) => {
    evt.preventDefault();
    goToPage(currentPageNumer - pageNeighbours * 2 - 1);
  };

  const handleMoveRight = (evt) => {
    evt.preventDefault();
    goToPage(currentPageNumer + pageNeighbours * 2 + 1);
  };

  /**
   * Let's say we have 10 pages and we set pageNeighbours to 2
   * Given that the current page is 6
   * The pagination control will look like the following:
   *
   * (1) < {4 5} [6] {7 8} > (10)
   *
   * (x) => terminal pages: first and last page(always visible)
   * [x] => represents current page
   * {...x} => represents page neighbours
   */
  const fetchPageNumbers = () => {
    const totalPages = pageCount;
    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPageNumer - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPageNumer + pageNeighbours);
      let pages = range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  if (pageCount === 1) return null;
  const pages = fetchPageNumbers();

  return (
    <Fragment>
      <div className="paginations">
        <ul>
          {pages.map((page, index) => {
            if (page === LEFT_PAGE)
              return (
                <li key={index}>
                  <span className="page-link" aria-label="Previous" onClick={handleMoveLeft}>
                    &laquo;
                  </span>
                </li>
              );

            if (page === RIGHT_PAGE)
              return (
                <li key={index}>
                  <span className="page-link" aria-label="Next" onClick={handleMoveRight}>
                    &raquo;
                  </span>
                </li>
              );

            return (
              <li key={index} className={`${currentPageNumer === page ? " current" : ""}`}>
                <span onClick={handleClick(page)}>{page}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </Fragment>
  );
};

// Pagination.propTypes = {
//   pageNeighbours: PropTypes.number,
//   onPageChanged: PropTypes.func,
// };

export default Pagination;

// export default ({ pageCount, pageNumber, setPageNumber, ...props }) => {
//   return (
//     <div className="paginations">
//       <ul>
//         {new Array(pageCount).fill().map((_, i) => {
//           return (
//             <li
//               key={i}
//               className={classNames({ current: pageNumber == i + 1 })}
//             >
//               <span onClick={() => setPageNumber(i + 1)}>{i + 1}</span>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };
