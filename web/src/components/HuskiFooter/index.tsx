import globalImage from '@/image';
import Icon from '@ant-design/icons';
import React from 'react';

const linkStyle: React.CSSProperties = {
  height: '40px',
  fontFamily: 'SourceHanSansCN-Regular',
  fontSize: '20px',
  fontWeight: 'bold',
  lineHeight: '40px',
  color: '#000000',
  padding: '0 10px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: '30px',
};
const iconStyle: React.CSSProperties = {
  width: '25px',
  height: '25px',
  marginRight: '10px',
};

const HuskiFooter: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '0px',
        border: 'solid 0px #868281',
        backgroundImage: `url(${globalImage.FooterBgc})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
      }}
    >
      <div
        style={{
          width: '1344px',
          height: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* <a
          href="https://x.com/Huski2024"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
        >
          <Icon
            component={() => <img src={globalImage.TwitterImage} alt="icon" />}
            style={iconStyle}
          />
          <span>Twitter</span>
        </a>
        <a
          href="https://t.me/huskitoken2024"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
        >
          <Icon
            component={() => <img src={globalImage.TelegramImage} alt="icon" />}
            style={iconStyle}
          />
          <span>Telegram</span>
        </a>
        <a
          href="https://www.youtube.com/@Huski2024"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
        >
          <Icon
            component={() => <img src={globalImage.YoutobeImage} alt="icon" />}
            style={iconStyle}
          />
          <span>Youtube</span>
        </a> */}
      </div>
    </div>
  );
};

export default HuskiFooter;
