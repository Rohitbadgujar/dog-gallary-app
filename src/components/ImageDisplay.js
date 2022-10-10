import React from "react";
import "./ImageDisplay.css";

const ImageDisplay = (props) => {
  return (
    <div>
      <img
        className="singleImage"
        src={props.imageUrl}
        alt="dog images"
      />
    </div>
  );
};

export default ImageDisplay;
