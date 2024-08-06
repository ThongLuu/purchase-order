import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

const Loading = () => {
  return (
    <div className="loading-container">
      <ProgressSpinner />
      <p>Loading...</p>
    </div>
  );
};

export default Loading;