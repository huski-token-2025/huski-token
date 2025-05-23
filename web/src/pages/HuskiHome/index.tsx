import globalImage from '@/image';
import { Button } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useState } from 'react';

const HuskiHomeFinal: React.FC = () => {
  const [backgroundImage, setBackgroundImage] = useState(`url(${globalImage.HomeLogoImage})`);
  const handleRocketClick = () => {
    setBackgroundImage(`url(${globalImage.YellowLogoImage})`);
  };
  const handleMoonClick = () => {
    setBackgroundImage(`url(${globalImage.SmokeLogoImage})`);
  };

  const handleBuyClick = () => {
    window.open('https://hop.ag/swap/SUI-HUSKI', '_blank');
  };

  return (
    <Content
      style={{
        width: '100%',
        height: '725px',
        marginTop: '25px',
        backgroundImage: `url(${globalImage.HomeNewImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: '1654px',
          height: '44px',
          backgroundColor: '#868281',
          margin: '12px auto 0',
          fontFamily: 'BodoniBT-Bold',
          fontSize: '30px',
          fontWeight: 'bold',
          fontStretch: 'normal',
          letterSpacing: '2px',
          paddingLeft: '50px',
          lineHeight: '44px',
          color: '#000',
        }}
      >
        Most Popular Meme Coin
      </div>
      <div
        style={{
          width: '900px',
          height: '416px',
          backgroundImage: `url(${globalImage.TextImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          left: '133px',
          top: '30px',
          position: 'relative',
        }}
      >
        <Button
          style={{
            width: '58px',
            height: '55px',
            border: 'none',
            backgroundColor: 'transparent',
            backgroundImage: `url(${globalImage.RocketImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
            position: 'absolute',
            top: '40px',
            left: '730px',
          }}
          onClick={handleRocketClick}
        ></Button>
        <Button
          style={{
            width: '69px',
            height: '69px',
            border: 'none',
            backgroundColor: 'transparent',
            backgroundImage: `url(${globalImage.MoonImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
            position: 'absolute',
            left: '830px',
          }}
          onClick={handleMoonClick}
        ></Button>
        <Button
          style={{
            width: '480px',
            height: '80px',
            border: 'none',
            marginLeft: '20px',
            backgroundColor: 'transparent',
            backgroundImage: `url(${globalImage.ButtonImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '1',
            position: 'absolute',
            top: '390px',
            left: '540px',
          }}
          onClick={handleBuyClick}
        >
          <div
            style={{
              fontFamily: 'BodoniBT-Bold',
              fontSize: '40px',
              fontWeight: 'bold',
              fontStretch: 'normal',
              color: '#000000',
              paddingBottom: '10px',
            }}
          >
            Buy Huski
          </div>
        </Button>
      </div>
      <div
        style={{
          width: '670px',
          height: '615px',
          position: 'absolute',
          right: '133px',
          bottom: '-10px',
          backgroundImage: backgroundImage,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
        }}
      ></div>
      <div
        style={{
          width: '983px',
          height: '120px',
          position: 'absolute',
          left: '900px',
          bottom: '1px',
          backgroundImage: `url(${globalImage.BgCloudImage})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
    </Content>
  );
};

export default HuskiHomeFinal;
