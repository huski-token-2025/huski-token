import React from 'react';
const copyrightStyles: React.CSSProperties = {
  // width: '1920px',
  width: '100%',
  height: '40px',
  backgroundColor: '#000',
};
const HuskiCopyright: React.FC = () => {
  return (
    <div style={copyrightStyles}>
      <p
        style={{
          fontSize: '18px',
          fontWeight: 'normal',
          fontFamily: 'PingFang-SC-Regular',
          fontStretch: 'normal',
          lineHeight: '40px',
          textAlign: 'center',
          color: '#c8c8c8',
        }}
      >
        copyright @ Huski 2024
      </p>
    </div>
  );
};

export default HuskiCopyright;
