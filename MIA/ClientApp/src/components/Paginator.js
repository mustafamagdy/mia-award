import React from "react";
import classNames from "classnames";

export default ({ pageCount, pageNumber, setPageNumber, ...props }) => {
  return (
    <div className="paginations">
      <ul>
        {new Array(pageCount).fill().map((_, i) => {
          return (
            <li key={i} className={classNames({ current: pageNumber == i + 1 })}>
              <span onClick={() => setPageNumber(i + 1)}>{i + 1}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
