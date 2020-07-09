import React, { Component, Fragment } from "react";
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

class Pagination extends Component {
  constructor(props) {
    super(props);
    const { pageCount = 1, pageNumber = 1, pageNeighbours = 0 } = props;

    // pageNeighbours can be: 0, 1 or 2
    this.pageNeighbours =
      typeof pageNeighbours === "number"
        ? Math.max(0, Math.min(pageNeighbours, 2))
        : 0;

    this.pageCount = pageCount;
    this.state = { pageNumber: pageNumber };
  }

  componentDidMount() {
    this.goToPage(1);
  }

  goToPage = (page) => {
    const { setPageNumber = (f) => f } = this.props;

    const pageNumber = Math.max(0, Math.min(page, this.pageCount));
    this.setState({ pageNumber }, () => setPageNumber(pageNumber));
  };

  handleClick = (page) => (evt) => {
    evt.preventDefault();
    this.goToPage(page);
  };

  handleMoveLeft = (evt) => {
    evt.preventDefault();
    this.goToPage(this.state.pageNumber - this.pageNeighbours * 2 - 1);
  };

  handleMoveRight = (evt) => {
    evt.preventDefault();
    this.goToPage(this.state.pageNumber + this.pageNeighbours * 2 + 1);
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
  fetchPageNumbers = () => {
    const totalPages = this.pageCount;
    const pageNumber = this.state.pageNumber;
    const pageNeighbours = this.pageNeighbours;

    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = this.pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, pageNumber - pageNeighbours);
      const endPage = Math.min(totalPages - 1, pageNumber + pageNeighbours);

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

  render() {
    if (this.pageCount === 1) return null;

    const { pageNumber } = this.state;
    const pages = this.fetchPageNumbers();

    return (
      <Fragment>
        <div className="paginations">
          <ul>
            {pages.map((page, index) => {
              if (page === LEFT_PAGE)
                return (
                  <li key={index}>
                    <span
                      className="page-link"
                      aria-label="Previous"
                      onClick={this.handleMoveLeft}
                    >
                      &laquo;
                    </span>
                  </li>
                );

              if (page === RIGHT_PAGE)
                return (
                  <li key={index}>
                    <span
                      className="page-link"
                      aria-label="Next"
                      onClick={this.handleMoveRight}
                    >
                      &raquo;
                    </span>
                  </li>
                );

              return (
                <li
                  key={index}
                  className={`${pageNumber === page ? " current" : ""}`}
                >
                  <span onClick={this.handleClick(page)}>{page}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </Fragment>
    );
  }
}

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
