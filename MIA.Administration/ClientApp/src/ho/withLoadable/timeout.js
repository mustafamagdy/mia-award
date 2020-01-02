import React from "react";

const Loading = props => {
  return (
    <div>
      Taking a long time... <button onClick={props.retry}>Retry</button>
    </div>
  );
};

export default Loading;
