import React from 'react';
import './LoadingSpinner.css'; // Asegúrate de crear este archivo

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <div className="loading-text">Cargando...</div>
    </div>
  );
};

export default LoadingSpinner;
