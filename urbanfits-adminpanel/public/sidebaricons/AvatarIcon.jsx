import React from "react";

export const AvatarIcon = ({fill, stroke}) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="20" fill={fill || "white"} />
      <path
        d="M24.85 14.5C24.85 17.1789 22.6789 19.35 20 19.35C17.3211 19.35 15.15 17.1789 15.15 14.5C15.15 11.8211 17.3211 9.65 20 9.65C22.6789 9.65 24.85 11.8211 24.85 14.5ZM11.025 29.7238C11.025 25.8504 14.1629 22.7125 18.0363 22.7125H21.9637C25.8371 22.7125 28.975 25.8504 28.975 29.7238C28.975 30.0695 28.6945 30.35 28.3488 30.35H11.6512C11.3055 30.35 11.025 30.0695 11.025 29.7238Z"
        stroke={stroke ||"#B9BBC1" }  
        stroke-width="1.3"
      />
    </svg>
  );
};
