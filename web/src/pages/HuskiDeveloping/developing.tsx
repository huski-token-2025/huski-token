import globalImage from '@/image';
import { Content } from 'antd/es/layout/layout';
import React from 'react';

const Developing: React.FC = () => {
  return (
    <Content
      style={{
        width: '1556px',
        height: '685px',
        margin: '0 auto',
        backgroundImage: `url(${globalImage.DevelopingGif})`,
        zIndex: '1',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        paddingTop: '380px',
        paddingLeft: '164px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/*<span*/}
      {/*  style={{*/}
      {/*    color: '#000',*/}
      {/*    fontWeight: 'bold',*/}
      {/*    letterSpacing: '3px',*/}
      {/*    fontFamily: 'BodoniBT-Bold',*/}
      {/*    fontSize: '30px',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  Recruitment for TESTNET Test Members*/}
      {/*</span>*/}
      {/*<Button*/}
      {/*  style={{*/}
      {/*    width: '390px',*/}
      {/*    height: '50px',*/}
      {/*    marginLeft: '128px',*/}
      {/*    marginTop: '35px',*/}
      {/*    border: 'none',*/}
      {/*    backgroundColor: 'transparent',*/}
      {/*    backgroundImage: `url(${globalImage.ButtonImage})`,*/}
      {/*    backgroundRepeat: 'no-repeat',*/}
      {/*    backgroundSize: '100% 100%',*/}
      {/*    display: 'flex',*/}
      {/*    justifyContent: 'center',*/}
      {/*    alignItems: 'center',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <a*/}
      {/*    href="https://docs.google.com/forms/d/e/1FAIpQLSezzbn2rCeYobFcjbxP_NEWzQ-h1ro6kwM7UdsQ3AR_dt0rgA/viewform"*/}
      {/*    target="_blank"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*    style={{*/}
      {/*      fontFamily: 'BodoniBT-Bold',*/}
      {/*      fontSize: '30px',*/}
      {/*      fontWeight: 'bold',*/}
      {/*      fontStretch: 'normal',*/}
      {/*      color: '#000',*/}
      {/*      letterSpacing: '1px',*/}
      {/*      paddingBottom: '10px',*/}
      {/*      paddingRight: '5px',*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    Fill the Form to Join Test*/}
      {/*  </a>*/}
      {/*</Button>*/}
      {/*<div*/}
      {/*  style={{*/}
      {/*    width: '55px',*/}
      {/*    height: '65px',*/}
      {/*    marginLeft: '316px',*/}
      {/*    marginTop: '-15px',*/}
      {/*    backgroundImage: `url(${globalImage.finger})`,*/}
      {/*    backgroundRepeat: 'no-repeat',*/}
      {/*    backgroundSize: '100% 100%',*/}
      {/*    zIndex: '1',*/}
      {/*  }}*/}
      {/*></div>*/}
    </Content>
  );
};

export default Developing;
