import React from 'react';

const ProgressBar = ({ step }) => {
  const getPercentage = (step) => {
    switch (step) {
      case 'basic':
        return 0;
      case 'birth':
        return 33;
      case 'other':
        return 67;
      case 'complete':
        return 100;
      default:
        return 0;
    }
  };

  const percentage = getPercentage(step);

  return (
    <div>
      <p>Progress: {percentage}%</p>
      <div style={{ border: '1px solid black', width: '90%' }}>
        <div
          style={{
            backgroundColor: 'lightblue',
            width: `${percentage}%`,
            height: '20px',
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;