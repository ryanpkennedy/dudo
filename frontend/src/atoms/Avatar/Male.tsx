import React from 'react';

interface AvatarSVG {
  color?: string;
}

const Male: React.FC<AvatarSVG> = ({ color = '#5690FF' }) => {
  return (
    <svg
      width="138"
      height="138"
      viewBox="0 0 138 138"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.2566 14.2942C40.5385 -13.5881 63.4736 6.85897 69 12.8845C74.5264 6.85897 97.4615 -13.5881 117.743 14.2942C135.83 39.1592 139.638 54.5619 137.44 73L122.868 71.1035C122.956 72.5559 123 74.0219 123 75.5C123 110.018 98.8234 138 69 138C39.1766 138 15 110.018 15 75.5C15 74.0219 15.0443 72.5559 15.1315 71.1035L0.560408 73C-1.63767 54.5619 2.16951 39.1592 20.2566 14.2942Z"
        fill={color}
      />
    </svg>
  );
};

export default Male;
