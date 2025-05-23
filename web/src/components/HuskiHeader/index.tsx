import HuskiMenu from '@/components/HuskiMenu';
import globalImage from '@/image';

import { ConnectModal, useWallet } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import { Button } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { history, useModel } from 'umi';

const borderStyle: React.CSSProperties = {
  // width: 'calc(100% - 260px)',
  width: '1654px',
  height: '5px',
  background: '#000',
  margin: '15px auto 0',
};

interface HeaderProps {
  handleMenuClick: (key: string) => void;
}

const HuskiHeader: React.FC<HeaderProps> = ({ handleMenuClick }) => {
  const [showModal, setShowModal] = useState(false);
  const { balance, fetchBalance } = useModel('balanceModel');
  const { setHome } = useModel('menuModel');
  const wallet = useWallet();
  useEffect(() => {
    fetchBalance(wallet?.address);
  }, [wallet?.address]);

  const success = () => {
    setShowModal(false);
  };
  const error = () => {
    setShowModal(false);
  };

  const [isHovered, setIsHovered] = useState(false);
  const [disConnectShow, setDisConnectShow] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    history.push('/publicFrame/Home');
  };

  return (
    <Content>
      <div style={borderStyle} />
      <div
        style={{
          width: '1556px',
          height: '181px',
          fontFamily: 'BodoniBT-Bold',
          margin: '20px auto',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '858px',
            height: '100%',
            cursor: isHovered ? 'pointer' : 'auto',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          <div
            style={{
              width: '181px',
              height: '181px',
              backgroundImage: `url(${globalImage.IconImage})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%',
            }}
            onClick={() => {
              setHome(true);
              history.push('/publicFrame/Home');
            }}
          ></div>
          <div
            style={{
              width: '647px',
              height: '137px',
              fontSize: '200px',
              fontWeight: 'bold',
              fontStretch: 'normal',
              color: '#000000',
              lineHeight: '137px',
              marginLeft: '30px',
            }}
          >
            HUSKI
          </div>
        </div>
        <div
          style={{
            width: 'calc(100% - 908px)',
            height: '150px',
            marginLeft: '50px',
            fontSize: '64px',
            fontWeight: 'bold',
            fontStretch: 'normal',
            color: '#000000',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '50px',
              lineHeight: '50px',
              fontSize: '70px',
            }}
          >
            BUY, HOLD, RICH!
          </div>
          <div
            style={{
              width: '100%',
              height: '80px',
              marginTop: '20px',
              display: 'flex',
              position: 'relative',
            }}
          >
            {!wallet.connected ? (
              <ConnectModal
                onConnectError={error}
                onConnectSuccess={success}
                open={showModal}
                onOpenChange={(open) => {
                  setShowModal(open);
                }}
              >
                <Button
                  style={{
                    width: '500px',
                    height: '80px',
                    backgroundColor: 'transparent',
                    border: 'solid 4px #000000',
                  }}
                >
                  <span
                    style={{
                      width: '100%',
                      height: '100%',
                      fontSize: '72px',
                      lineHeight: '56px',
                      fontWeight: 'bold',
                      fontStretch: 'normal',
                      color: '#000000',
                    }}
                  >
                    CONNECT
                  </span>
                </Button>
              </ConnectModal>
            ) : (
              <div
                style={{
                  position: 'absolute',
                  zIndex: '1000',
                }}
              >
                <div
                  style={{
                    width: '500px',
                    height: '80px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '30px',
                    backgroundColor: 'transparent',
                    border: 'solid 4px #000000',
                  }}
                  onClick={() => {
                    setDisConnectShow(!disConnectShow);
                  }}
                >
                  {balance +
                    ' SUI | ' +
                    wallet.address?.substr(0, 6) +
                    '.....' +
                    wallet.address?.substr(-6)}
                </div>
                {disConnectShow && (
                  <div
                    style={{
                      width: '500px',
                      height: '100px',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '30px',
                      backgroundColor: '#dcd4d3',
                      borderLeft: 'solid 4px #000000',
                      borderRight: 'solid 4px #000000',
                      borderBottom: 'solid 4px #000000',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '292px',
                        height: '60px',
                        fontSize: '33px',
                        fontFamily: 'SourceHanSansCN-Heavy',
                        backgroundImage: `url(${globalImage.ICON_DISCONNECT})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '100% 100%',
                      }}
                      onClick={() => {
                        wallet.disconnect();
                        setDisConnectShow(false);
                      }}
                    >
                      Disconnect
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        )
      </div>
      <div>
        <HuskiMenu handleMenuClick={handleMenuClick} />
      </div>
      <div style={borderStyle} />
    </Content>
  );
};

export default HuskiHeader;
