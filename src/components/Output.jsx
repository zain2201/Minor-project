import React from "react";

const Output = ({ output }) => {
  return (
    <div>
      <textarea className="output">{output}</textarea>
    </div>
  );
};

export default Output;
