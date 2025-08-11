import React from "react";

const LoadingBar = () => {
  return (
    <div
      className="relative w-[120px] h-[22px] rounded-[40px] border-2 border-current text-[#514b82] before:content-[''] before:absolute before:m-[2px] before:w-1/4 before:top-0 before:bottom-0 before:left-0 before:rounded-[40px] before:bg-current"
      style={{
        position: "relative",
        color: "#514b82",
      }}
    >
      <style>
        {`
          @keyframes wobble-bar {
            50% {
              left: 100%;
              transform: translateX(calc(-100% - 4px));
            }
          }
        `}
      </style>
      <div
        className="absolute m-[2px] w-1/4 top-0 bottom-0 left-0 rounded-[40px] bg-current"
        style={{
          animation: "wobble-bar 1s infinite linear",
        }}
      ></div>
    </div>
  );
};

export default LoadingBar;
