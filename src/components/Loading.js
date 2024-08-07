import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

const Loading = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ProgressSpinner />
    </div>
  );
};

export default Loading;