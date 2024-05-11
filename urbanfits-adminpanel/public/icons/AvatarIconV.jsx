import React from "react";

const AvatarIconV = ({w, h, fill, stroke}) => {
  return (
    <svg
      width={ w || "20"}
      height={ h || "22"}
      viewBox="0 0 20 22"
      fill={ fill || "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.85 5.5C14.85 8.17891 12.6789 10.35 10 10.35C7.32109 10.35 5.15 8.17891 5.15 5.5C5.15 2.82109 7.32109 0.65 10 0.65C12.6789 0.65 14.85 2.82109 14.85 5.5ZM1.025 20.7238C1.025 16.8504 4.16289 13.7125 8.03633 13.7125H11.9637C15.8371 13.7125 18.975 16.8504 18.975 20.7238C18.975 21.0695 18.6945 21.35 18.3488 21.35H1.65117C1.30547 21.35 1.025 21.0695 1.025 20.7238Z"
        stroke={ stroke|| "black"}
        stroke-width="1.3"
      />
    </svg>
  );
};

export default AvatarIconV;
