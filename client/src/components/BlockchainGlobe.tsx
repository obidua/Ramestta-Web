import React from 'react';

const BlockchainGlobe: React.FC = () => {
  return (
    <div className="blockchain-globe-container">
      <div className="globe-sphere">
        {/* These divs create the grid lines of the globe */}
        <div className="globe-line"></div>
        <div className="globe-line"></div>
        <div className="globe-line"></div>
        <div className="globe-line"></div>
        <div className="globe-line"></div>
        <div className="globe-line"></div>
        <div className="globe-line"></div>
        <div className="globe-line"></div>
        <div className="globe-line"></div>
        <div className="globe-line"></div>
        <div className="globe-line"></div>
        <div className="globe-line"></div>
     
      </div>
      <img 
          src="/rama_logo.png" 
          alt="Ramestta Logo" 
          className="globe-logo"
        />
    </div>
  );
};

export default BlockchainGlobe;