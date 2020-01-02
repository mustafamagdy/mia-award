import React from "react";

const Loading = props => {
  return (
    <div>
      Error! <button onClick={props.retry}>Retry</button>
    </div>
  );
};

export default Loading;
