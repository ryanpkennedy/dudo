import React from 'react';

interface AvatarSVG {
  color?: string;
}

const Female: React.FC<AvatarSVG> = ({ color = '#CB77FF' }) => {
  return (
    <svg
      width="151"
      height="146"
      viewBox="0 0 151 146"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M130.217 14.1963C105.864 -15.8687 78.0516 10.646 75.1765 13.9802C72.3012 10.6459 44.489 -15.8686 20.1358 14.1963C0.13263 38.8911 -1.57795 127.688 0.852997 146L33.2853 121.192C43.1893 135.119 58.1986 144 75 144C91.8718 144 106.936 135.045 116.839 121.017L149.5 146C151.931 127.688 150.22 38.891 130.217 14.1963Z"
        fill={color}
      />
    </svg>
  );
};

export default Female;
