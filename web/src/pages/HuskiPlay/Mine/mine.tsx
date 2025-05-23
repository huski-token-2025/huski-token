import { handleBankInfos, handleGetHousecuts } from '@/api/bank';
import {
  handleGetOdds,
  handleGetRandomNumbers,
  handleGetUnredeemed,
  handleGetUnredeemedList,
  handlePlay,
  handleRedeemAllRewards,
} from '@/api/play';
import {ChangeToBlub, ChangeToHuski, ChangeToSui, handleGetSUIAmount} from '@/api/stake';
import { handleCheckVip, handleGetEventNewVip, handleGetVip, handleRedeemVip } from '@/api/vip';
import Chatroom from '@/components/HuskiChatroom/index';
import { common, contract } from '@/contact/contact';
import globalImage from '@/image';
import { CaretDownOutlined } from '@ant-design/icons';
import { useWallet } from '@suiet/wallet-kit';
import {Button, Dropdown, Input, Menu, Modal, Progress, Slider} from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useRef, useState } from 'react';
import { useModel } from 'umi';
import Box from './box';
import './mine.less';

const divMenuItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};
const spanStyle: React.CSSProperties = {
  fontFamily: 'SourceHanSansCN-Heavy',
  fontSize: '18px',
  marginLeft: '10px',
};
const spanStyle1: React.CSSProperties = {
  fontFamily: 'SourceHanSansCN-Heavy',
  fontSize: '18px',
};

const Mine: React.FC = () => {
  const wallet = useWallet();
  const { balance, fetchBalance } = useModel('balanceModel');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStr, setModalStr] = useState('');
  const [vipButtonShow, setVipButtonShow] = useState(false);
  const [vipInfo, setVipInfo] = useState<any>(null);
  const [currentAmount, setCurrentAmount] = useState('0');
  const [currentAmountToNextLevel, setCurrentAmountToNextLevel] = useState('0');
  const [percent, setPercent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isSubDivHovered, setIsSubDivHovered] = useState(false);
  const handleMouseEnter = () => {
    if (vipButtonShow) {
      setIsHovered(true);
    }
  };
  const handleMouseLeave = () => {
    if (!isSubDivHovered) {
      setIsHovered(false);
    }
  };
  const handleSubDivMouseEnter = () => {
    setIsSubDivHovered(true);
  };
  const handleSubDivMouseLeave = () => {
    setIsHovered(false);
    setIsSubDivHovered(false);
  };

  const [bank, setBank] = useState<any>(null);
  // const [isToggle, setIsToggle] = useState(false);
  // const [topImage, setTopImage] = useState(globalImage.IconImage);
  // const [bottomImage, setBottomImage] = useState(globalImage.SuiLogo);
  // // 0:huski 1:sui
  // const [houseCut, setHouseCut] = useState(['0', '0']);
  // const [bankHouseCutTop, setBankHouseCutTop] = useState('0');
  // const [bankHouseCutBottom, setBankHouseCutBottom] = useState('0');
  const [playSpend, setPlaySpend] = useState(10000);
  const [playUnit, setPlayUnit] = useState('Huski');
  const [gridSize, setGridSize] = useState(4);
  const [odds, setOdds] = useState<string[]>([]);
  const [unredeemed, setUnredeemed] = useState<number | null>(0);

  const [selectedOption, setSelectedOption] = useState('Huski');
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const [bankHouseCutHuski, setBankHouseCutHuski] = useState('0');
  const [bankHouseCutSui, setBankHouseCutSui] = useState('0');
  const [bankHouseCutBlub, setBankHouseCutBlub] = useState('0');

  const [myBalance, setMyBalance] = useState('0');
  const getBalance = async () => {
    const res = await handleGetSUIAmount(wallet);
    setMyBalance(res + '');
  };


  const handleMenuClick = async (e) => {
    setSelectedOption(e.key);
    switch (e.key) {
      case 'Huski':
        await ChangeToHuski();
        setPlaySpend(10000);
        setPlayUnit('Huski');
        break;
      case 'Sui':
        await ChangeToSui();
        setPlaySpend(1);
        setPlayUnit('Sui');
        break;
      case 'Blub':
        await ChangeToBlub();
        setPlaySpend(10000000);
        setPlayUnit('Blub');
        break;
    }
    await getBalance();
    setDropdownVisible(false);
  };

  const modalOwner = useRef<string>('');
  const showModal = (str, owner = '') => {
    modalOwner.current = owner;
    setModalStr(str);
    setIsModalOpen(true);
  };

  useEffect(() => {
    setSelectedOption('Huski');
    setPlaySpend(10000);
    setPlayUnit('Huski');
  }, []);

  useEffect(() => {
    handleCheckVip(wallet).then((vip) => {
      setVipButtonShow(vip);
      if (vip) {
        handleGetEventNewVip(wallet).then((res) => {
          setVipInfo(res);
        });
      }
    });

    // if (playUnit === 'Huski') {
    //   setMyBalance(myBalance.split('.')[0]);
    // }
  }, [myBalance]);

  useEffect(() => {
    handleCheckVip(wallet).then((vip) => {
      setVipButtonShow(vip);
      if (vip) {
        handleGetEventNewVip(wallet).then((res) => {
          setVipInfo(res);
        });
      }
    });

    getBalance().then(() => {});
  }, [balance, contract.ADDRESS]);

  useEffect(() => {
    if (playUnit === 'Huski') {
      const current = (Number(vipInfo?.amount) / common.DECIMALS).toString();
      setCurrentAmount(current);
      const currentToNext = (Number(vipInfo?.amount_to_next_level) / common.DECIMALS).toString();
      setCurrentAmountToNextLevel(currentToNext);
      const total = (Number(currentToNext) + Number(current)).toString();
      const percent = (Number(current) / Number(total)) * 100;
      setPercent(percent);
    } else if(playUnit === 'Sui') {
      const current = (Number(vipInfo?.amount) / common.DECIMALS).toFixed(3);
      setCurrentAmount(current);
      const currentToNext = (Number(vipInfo?.amount_to_next_level) / common.DECIMALS).toFixed(3);
      setCurrentAmountToNextLevel(currentToNext);
      const total = (Number(currentToNext) + Number(current)).toFixed(3);
      const percent = (Number(current) / Number(total)) * 100;
      setPercent(percent);
    } else {
      const current = (Number(vipInfo?.amount) / common.DECIMALS).toFixed(2);
      setCurrentAmount(current);
      const currentToNext = (Number(vipInfo?.amount_to_next_level) / common.DECIMALS).toFixed(2);
      setCurrentAmountToNextLevel(currentToNext);
      const total = (Number(currentToNext) + Number(current)).toFixed(2);
      const percent = (Number(current) / Number(total)) * 100;
      setPercent(percent);
    }
  }, [vipInfo]);

  useEffect(() => {
    handleGetUnredeemed(wallet).then((r) => {
      if (r) {
        setUnredeemed(Number(r?.toFixed(3)));
      } else {
        setUnredeemed(0);
      }
    });
  }, [selectedOption])

  useEffect(() => {
    if (wallet.connected) {
      ChangeToHuski().then(() => {
        getBalance().then(() => {});
      });

      handleGetHousecuts().then((res) => {
        setBankHouseCutHuski(res.housecutHuski);
        setBankHouseCutSui(res.housecutSui);
        setBankHouseCutBlub(res.housecutBlub);
      });

      handleBankInfos().then((res) => {
        setBank(res);
      });

      handleGetOdds(gridSize * gridSize).then((oddsData) => {
        setOdds(oddsData);
      });

      handleGetUnredeemed(wallet).then((r) => {
        if (r) {
          setUnredeemed(Number(r?.toFixed(3)));
        } else {
          setUnredeemed(0);
        }
      });

      handleCheckVip(wallet).then((vip) => {
        setVipButtonShow(vip);
        if (vip) {
          handleGetEventNewVip(wallet).then((res) => {
            setVipInfo(res);
          });
        }
      });
    }
  }, [wallet.connected]);

  const handleBecomeVip = async () => {
    const isOk = await handleGetVip(wallet);
    if (isOk) {
      showModal('Vip collection succeed!');
      setVipButtonShow(true);
      handleGetEventNewVip(wallet).then((res) => {
        setVipInfo(res);
      });
    } else {
      showModal('you already have a vip object');
    }
  };

  const handleCopyCode = () => {
    const codeToCopy = vipInfo?.id.id ?? '';
    const input = document.createElement('input');
    input.setAttribute('value', codeToCopy);
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showModal('Copy to clipboard successful');
  };
  const getPremium = async () => {
    const data = await handleRedeemVip(wallet);
    if (data) {
      if (data === 'zero premium.') {
        showModal(data);
      } else {
        showModal('success');
      }
    } else {
      showModal('fail');
    }
  };
  const handleClaim = () => {
    setIsHovered(false);
    getPremium().then(() => {
      fetchBalance(wallet?.address);
    });
  };


  const [selectedButton, setSelectedButton] = useState(1);
  const getButtonStyle = (index) => {
    const baseStyle = {
      width: '250px',
      height: '60px',
      backgroundColor: '#dcd4d3',
      borderTop: 'solid 4px #000000',
      borderBottom: 'solid 4px #000000',
      borderLeft: index === 1 ? 'solid 4px #000000' : 'solid 2px #000000',
      borderRight: index === 3 ? 'solid 4px #000000' : 'solid 2px #000000',
      fontFamily: 'SourceHanSansCN-Heavy',
      fontWeight: 'bold',
      fontSize: '24px',
      color: '#000',
    };
    if (selectedButton === index) {
      return { ...baseStyle, backgroundColor: '#b7b0af' };
    }
    return baseStyle;
  };

  const [rightValue, setRightValue] = useState(15);
  const [leftvalue, setLeftValue] = useState(gridSize * gridSize - rightValue);
  const handleSliderChange = (newValue) => {
    setLeftValue(newValue);
    setRightValue(gridSize * gridSize - newValue);
  };
  const handleButtonClick = (size, index) => {
    setGridSize(size);
    setSelectedButton(index);
    setLeftValue(1);
    setRightValue(size * size - 1);
    handleGetOdds(size * size).then((oddsData) => {
      setOdds(oddsData);
    });
  };

  const [promoCode, setpromoCode] = useState('');
  const handleCodeInputChange = (e) => {
    const value = e.target.value;
    setpromoCode(value);
  };

  const [thresholds, setThresholds] = useState([0, 0]);
  const [isPlaying, setIsPlaying] = useState(false);


  const handleGameEnd = async (status) => {
    if (status === 'win') {
      showModal('You Win!', 'game');
      const res = await handleGetUnredeemed(wallet);
      if (res) {
        setUnredeemed(Number(res?.toFixed(3)));
      } else {
        setUnredeemed(0);
      }
    } else {
      showModal('Game Over!', 'game');
    }
  };

  const startGame = () => {
    setIsPlaying(true);
  };
  const handlePlayx1 = async () => {
    try {
      const res = await handlePlay(
        wallet,
        (gridSize * gridSize).toString(),
        playSpend * common.DECIMALS,
        leftvalue,
        promoCode,
      );
      if (res) {
        getBalance().then(() => {});
        setUnredeemed(0);
        setTimeout(async () => {
          const randomNumbers = await handleGetRandomNumbers(wallet);
          if (randomNumbers) {
            setThresholds([randomNumbers[0], randomNumbers[1]]);
            startGame();
            fetchBalance(wallet?.address);
          }
        }, 1000);
      }
    } catch (error) {
      console.error('Error in handlePlayx1:', error);
    }
  };
  const handlePlayx10 = async () => {
    try {
      const res = await handlePlay(
        wallet,
        (gridSize * gridSize).toString() + 'x10',
        10 * playSpend * common.DECIMALS,
        leftvalue,
        promoCode,
      );

      if (res) {
        setUnredeemed(0);

        getBalance().then(() => {});
        setTimeout(async () => {
          let list = await handleGetUnredeemedList(wallet);

          // console.log(list);
          if (list && list.length > 0) {
            let winList: any[] = [];
            list.forEach((item) => {
              if (Number(item.win) > 0) {
                winList.push(item);
              }
            });

            if (winList && winList.length > 0) {
              showModal('win:' + winList.length + '-----lose:' + (list?.length - winList.length));

              const res = await handleGetUnredeemed(wallet);
              if (res) {
                setUnredeemed(Number(res?.toFixed(3)));
              } else {
                setUnredeemed(0);
              }
            } else {
              showModal('all lose');
            }

            fetchBalance(wallet?.address);
          }
        }, 1000);
      }
    } catch (error) {
      console.error('Error in handlePlayx10:', error);
    }
  };

  const handleRedeem = async () => {
    const res = await handleRedeemAllRewards(wallet);
    if (res) {
      showModal('Redemption successful!\nCongratulations on winning the ' + unredeemed + ' award.');
      fetchBalance(wallet?.address);
      getBalance().then(() => {});
      setUnredeemed(0);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
    if (modalOwner.current === 'game') {
      setIsPlaying(false);
      // setGameStatus(status);
      setLeftValue(1);
      setRightValue(gridSize * gridSize - 1);
      fetchBalance(wallet?.address);
    }
  };

  const [chatRight, setChatRight] = useState(0);

  const handlePageClick = () => {
    if (chatRight === 0) {
      setChatRight(-625);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const menu = (
    <Menu className="custom-menu" onClick={handleMenuClick}>
      {selectedOption !== 'Huski' &&
        <Menu.Item key="Huski">
          <div style={divMenuItemStyle}>
            <div style={{width: '50px', height: '50px', backgroundImage: `url(${globalImage.IconImage})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat'}}></div>
            <span style={spanStyle}>{bankHouseCutHuski}%</span>
          </div>
        </Menu.Item>
      }
      {selectedOption !== 'Sui' &&
        <Menu.Item key="Sui">
          <div style={divMenuItemStyle}>
            <div style={{width: '50px', height: '50px', backgroundImage: `url(${globalImage.SuiLogo})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat'}}></div>
            <span style={spanStyle}>{bankHouseCutSui}%</span>
          </div>
        </Menu.Item>
      }
      {/* {selectedOption !== 'Blub' &&
        <Menu.Item key="Blub">
          <div style={divMenuItemStyle}>
            <div style={{width: '50px', height: '50px', backgroundImage: `url(${globalImage.BlubLogo})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat'}}></div>
            <span style={spanStyle}>{bankHouseCutBlub}%</span>
          </div>
        </Menu.Item>
      } */}
    </Menu>
  );

  return (
    <>
      <Content
        style={{
          width: '1556px',
          height: '650px',
          margin: '10px auto 0',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '1556px',
            height: '650px',
            border: 'solid 4px #000000',
          }}
          className={`${!wallet.connected ? 'blurred' : ''}`}
          onClick={handlePageClick}
        >
          <div
            style={{
              width: '1548px',
              height: '642px',
              padding: '17px 35px 0',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                width: '750px',
                height: '625px',
                fontFamily: 'BodoniBT-Bold',
                color: '#000',
              }}
            >
              <div
                style={{
                  width: '750px',
                  height: '228px',
                }}
              >
                <div
                  style={{
                    width: '750px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      width: '220px',
                      fontSize: '36px',
                    }}
                  >
                    Bet Amount
                  </span>
                  <div
                    style={{
                      width: '300px',
                      height: '40px',
                      marginLeft: '30px',
                      border: 'solid 2px #000000',
                      borderRight: 'none',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '20px',
                        letterSpacing: '-1px',
                      }}
                    >
                      {/*BALANCE: {myBalance} {playUnit}*/}
                      BALANCE:
                      {playUnit === 'Huski' ? myBalance : (playUnit === 'Sui' ? Number(myBalance).toFixed(3) : Number(myBalance).toFixed(2))} {playUnit}
                    </span>
                  </div>
                  <div
                    style={{
                      width: '200px',
                      height: '40px',
                      border: 'solid 2px #000000',
                      display: 'flex',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      position: 'relative',
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {vipButtonShow ? (
                      <div
                        style={{
                          width: '150px',
                          height: '30px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: '28px',
                            height: '25px',
                            backgroundImage: `url(${globalImage.VipBtn})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '100% 100%',
                          }}
                        />
                        <span
                          style={{
                            fontSize: '24px',
                            fontFamily: 'AdobeHeitiStd-Regular',
                            letterSpacing: '-1px',
                            marginLeft: '8px',
                          }}
                        >
                          : {vipInfo?.level} level
                        </span>
                        <div
                          style={{
                            width: '21px',
                            height: '21px',
                            marginLeft: '15px',
                            backgroundImage: `url(${globalImage.QuestionBtn})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '100% 100%',
                          }}
                        ></div>
                      </div>
                    ) : (
                      <Button
                        style={{
                          width: '150px',
                          height: '30px',
                          backgroundColor: 'transparent',
                          backgroundImage: `url(${globalImage.ReceiveVipBtn})`,
                          backgroundSize: '100% 100%',
                          border: 'none',
                          fontWeight: 'bold',
                          color: '#000',
                        }}
                        // onClick={() => handleGetVip(wallet)}
                        onClick={handleBecomeVip}
                      >
                        RECEIVE VIP
                      </Button>
                    )}
                    {isHovered && vipButtonShow && (
                      <div
                        style={{
                          width: '460px',
                          zIndex: '1112',
                          position: 'absolute',
                          top: '100%',
                          left: '-260px',
                          background: 'rgba(0, 0, 0, 0.6)',
                          border: '2px solid #000',
                          padding: '15px',
                        }}
                        onMouseEnter={handleSubDivMouseEnter}
                        onMouseLeave={handleSubDivMouseLeave}
                      >
                        <div
                          style={{
                            height: '45px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div
                            style={{
                              height: '45px',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <div
                              style={{
                                width: '28px',
                                height: '25px',
                                backgroundImage: `url(${globalImage.VipBtn})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: '100% 100%',
                              }}
                            />
                            <span
                              style={{
                                fontSize: '24px',
                                fontFamily: 'AdobeHeitiStd-Regular',
                                letterSpacing: '-1px',
                                color: '#fff',
                                marginLeft: '10px',
                              }}
                            >
                              : {vipInfo?.level} level
                            </span>
                            <span
                              style={{
                                fontSize: '18px',
                                fontFamily: 'SourceHanSansCN-Heavy',
                                color: '#fff',
                                marginLeft: '20px',
                              }}
                            >
                              {bank?.premium_rate}%
                            </span>
                          </div>
                          <div
                            style={{
                              width: '210px',
                              height: '45px',
                              background: 'rgba(183, 176, 175, 0.5)',
                              border: 'solid 3px rgba(255, 255, 255 , 0.5)',
                              fontFamily: 'SourceHanSansCN-Heavy',
                              fontWeight: 'bold',
                              fontSize: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                            }}
                            onClick={handleCopyCode}
                          >
                            Copy Promo Code
                          </div>
                        </div>
                        <div
                          style={{
                            marginTop: '5px',
                            fontFamily: 'SourceHanSansCN-Heavy',
                            fontWeight: 'bold',
                            fontSize: '18px',
                            color: '#fff',
                          }}
                        >
                          <div style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>
                            The current{' '}
                            <span style={{ fontSize: '36px', color: '#d6ab56', margin: '0 5px' }}>
                              {currentAmount}
                            </span>{' '}
                            needs {currentAmountToNextLevel} from the next level.
                          </div>
                        </div>
                        <Progress percent={percent} className="custom-progress" showInfo={false} />
                        <div
                          style={{
                            width: '100%',
                            marginTop: '10px',
                            fontFamily: 'SourceHanSansCN-Heavy',
                            fontWeight: 'bold',
                            fontSize: '18px',
                            color: '#fff',
                            lineHeight: '26px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                          }}
                        >
                          <div style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>
                            Users can get
                            <span
                              style={{
                                fontSize: '20px',
                                color: '#d6ab56',
                                margin: '0 5px',
                              }}
                            >
                              {vipInfo?.level + '%'}
                            </span>
                            reward once they succeed in Promo Code.
                          </div>
                        </div>
                        <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                        >
                            <div>
                              <span style={{fontSize: '22px', fontFamily: 'AdobeHeitiStd-Regular', color: '#fff'}}>
                              PROMO REWARDS:
                            </span>
                              <span style={{fontSize: '24px', fontFamily: 'SourceHanSansCN-Heavy', fontWeight: 'bold', color: '#fff', marginLeft: '5px',}}>
                              {/*{(Number(vipInfo?.premium) / common.DECIMALS).toFixed(3)}*/}
                                {/*{playUnit === 'Huski'*/}
                                {/*  ? (Number(vipInfo?.premium) / common.DECIMALS).toString()*/}
                                {/*  : (Number(vipInfo?.premium) / common.DECIMALS).toFixed(3)}*/}
                                {playUnit === 'Sui'
                                  ? (Number(vipInfo?.premium) / common.DECIMALS).toFixed(3)
                                  : (playUnit === 'Huski' ? (Number(vipInfo?.premium) / common.DECIMALS).toString() : (Number(vipInfo?.premium) / common.DECIMALS).toFixed(2))}
                            </span>
                            </div>
                            <div
                              style={{
                                width: '100px',
                                height: '45px',
                                background: 'rgba(183, 176, 175, 0.5)',
                                border: 'solid 3px rgba(255, 255, 255 , 0.5)',
                                fontFamily: 'SourceHanSansCN-Heavy',
                                fontWeight: 'bold',
                                fontSize: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                              }}
                              onClick={handleClaim}
                            >
                              Claim
                            </div>
                          </div>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    width: '750px',
                    height: '60px',
                    display: 'flex',
                    backgroundImage: `url(${globalImage.PlayInput})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%',
                  }}
                >
                  <div
                    style={{
                      width: '150px',
                      height: '60px',
                      zIndex: '500',
                    }}
                  >
                    <Dropdown overlay={menu} visible={isDropdownVisible} onVisibleChange={setDropdownVisible} trigger={['click']}>
                      <Button onClick={toggleDropdown} style={{width: '150px', height: '60px', background: 'transparent', color: '#000', fontSize: '18px', border: 'solid 3px #000000', borderRadius: '0', display: 'flex', alignItems: 'center'}}>
                        <div style={{width: '50px', height: '50px', backgroundImage: `url(${selectedOption === 'Huski' ? globalImage.IconImage : (selectedOption === 'Sui' ? globalImage.SuiLogo : globalImage.BlubLogo)})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%',}}></div>
                        <span style={spanStyle1}>{selectedOption === 'Huski' ? bankHouseCutHuski : (selectedOption === 'Sui' ? bankHouseCutSui : bankHouseCutBlub)}%</span>
                        <CaretDownOutlined style={{fontSize: '18px'}}/>
                      </Button>
                    </Dropdown>
                  </div>
                  <div
                    style={{
                      width: '600px',
                      height: '60px',
                      fontSize: '28px',
                      fontFamily: 'SourceHanSansCN-Heavy',
                      padding: '0 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>{playSpend}</span>
                    <span>{playUnit}</span>
                  </div>
                </div>
                <div
                  style={{
                    width: '750px',
                    height: '50px',
                    fontSize: '36px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  GridSize
                </div>
                <div
                  style={{
                    width: '750px',
                    height: '60px',
                  }}
                >
                  <Button.Group>
                    <Button style={getButtonStyle(1)} onClick={() => handleButtonClick(4, 1)}>
                      16
                    </Button>
                    <Button style={getButtonStyle(2)} onClick={() => handleButtonClick(5, 2)}>
                      25
                    </Button>
                    <Button style={getButtonStyle(3)} onClick={() => handleButtonClick(6, 3)}>
                      36
                    </Button>
                  </Button.Group>
                </div>
              </div>
              <div
                style={{
                  width: '750px',
                  height: '397px',
                  display: 'flex',
                }}
              >
                <div
                  style={{
                    width: '825px',
                    height: '397px',
                    marginLeft: '-75px',
                    marginTop: '6px',
                    backgroundImage: `url(${globalImage.DogBgc})`,
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <div
                    style={{
                      width: '505px',
                      height: '395px',
                    }}
                  >
                    <div
                      style={{
                        width: '505px',
                        height: '55px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '36px',
                        }}
                      >
                        Gem/Bomb Count
                      </span>
                      <span
                        style={{
                          fontFamily: 'AdobeHeitiStd-Regular',
                          fontSize: '24px',
                        }}
                      >
                        Odds:{odds[leftvalue - 1]}
                      </span>
                    </div>
                    <div
                      style={{
                        width: '505px',
                        height: '60px',
                        background: '#dcd4d3',
                        border: 'solid 4px #000',
                        paddingRight: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div
                        style={{
                          width: '50px',
                          height: '50px',
                          margin: '2px 10px',
                          backgroundImage: `url(${globalImage.CoinImage})`,
                          backgroundSize: '100% 100%',
                          backgroundRepeat: 'no-repeat',
                        }}
                      />
                      <div
                        style={{
                          width: '400px',
                          height: '52px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: '40px',
                            textAlign: 'center',
                            fontFamily: 'SourceHanSansCN-Heavy',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#000000',
                          }}
                        >
                          {leftvalue}
                        </div>
                        <Slider
                          className={'custom-slider'}
                          value={leftvalue}
                          onChange={handleSliderChange}
                          tooltip={{ open: false }}
                          min={1}
                          max={gridSize * gridSize - 1}
                        />
                        <div
                          style={{
                            width: '40px',
                            textAlign: 'center',
                            fontFamily: 'SourceHanSansCN-Heavy',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#000000',
                          }}
                        >
                          {rightValue}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        width: '505px',
                        height: '55px',
                        fontSize: '36px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      Promo Code
                    </div>
                    <div
                      style={{
                        width: '505px',
                        height: '60px',
                        display: 'flex',
                        backgroundImage: `url(${globalImage.PlayInput})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '100% 100%',
                      }}
                    >
                      <Input
                        className="codeInputNumber"
                        value={promoCode}
                        onChange={handleCodeInputChange}
                      />
                    </div>
                    <div
                      style={{
                        width: '330px',
                        height: '130px',
                        marginLeft: '175px',
                        marginTop: '15px',
                      }}
                    >
                      <div
                        style={{
                          height: '60px',
                          display: 'flex',
                        }}
                      >
                        <Button
                          style={{
                            width: '110px',
                            height: '60px',
                            backgroundColor: 'transparent',
                            backgroundImage: `url(${globalImage.PlayBtnShort})`,
                            backgroundSize: '100% 100%',
                            border: 'none',
                            fontFamily: 'SourceHanSansCN-Heavy',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#000',
                            paddingLeft: '5px',
                            paddingBottom: '15px',
                          }}
                          onClick={handlePlayx1}
                        >
                          <span style={{marginTop: '4px'}}>Play</span>
                        </Button>
                        <Button
                          style={{
                            width: '160px',
                            height: '60px',
                            marginLeft: '60px',
                            background: 'transparent',
                            backgroundImage: `url(${globalImage.PinkBtn})`,
                            backgroundSize: '100% 100%',
                            border: 'none',
                            fontFamily: 'SourceHanSansCN-Heavy',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            lineHeight: '20px',
                            color: '#000',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                          onClick={handlePlayx10}
                        >
                          <span style={{marginTop: '-10px'}}>Play x10</span>
                          <span style={{marginTop: '-10px'}}>(Quick Mode)</span>
                        </Button>
                      </div>
                      <div
                        style={{
                          width: '350px',
                          height: '60px',
                          marginTop: '10px',
                          marginLeft: '-20px',
                          display: 'flex',
                        }}
                      >
                        <div
                          style={{
                            width: '200px',
                            height: '60px',
                            border: '3px solid #000',
                            borderRight: 'none',
                            background: '#dcd4d3',
                            fontFamily: 'BodoniBT-Bold',
                            color: '#000',
                            fontSize: '18px',
                            cursor: 'pointer',
                            paddingLeft: '8px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                          }}
                        >
                          <span>Unredeemed Prize</span>
                          <div>
                            Amount:
                            <span
                              style={{
                                fontFamily: 'SourceHanSansCN-Heavy',
                                fontSize: '14px',
                              }}
                            >
                              {unredeemed}
                              {playUnit}
                            </span>
                          </div>
                        </div>
                        <Button
                          style={{
                            width: '150px',
                            height: '60px',
                            backgroundColor: 'transparent',
                            backgroundImage: `url(${globalImage.RedeemBtn})`,
                            backgroundSize: '100% 100%',
                            border: 'none',
                            fontFamily: 'SourceHanSansCN-Heavy',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: '#000',
                            lineHeight: '22px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          onClick={handleRedeem}
                        >
                          <span style={{marginTop: '2px'}}>Redeem All</span>
                          <span style={{marginTop: '-10px'}}>Rewards</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                width: '630px',
                height: '620px',
                border: 'solid 4px #000',
              }}
            >
              <Box
                gridSize={gridSize}
                leftValue={leftvalue}
                thresholds={thresholds}
                isPlaying={isPlaying}
                onGameEnd={handleGameEnd}
              ></Box>
            </div>
          </div>
        </div>
        {!wallet.connected && (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              position: 'absolute',
              top: '0',
              left: '0',
            }}
          >
            <div
              style={{
                width: '1500px',
                height: '600px',
                backgroundImage: `url(${globalImage.ConnectWallet})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>
          </div>
        )}
      </Content>
      <Modal
        open={isModalOpen}
        centered
        closable={false}
        destroyOnClose
        mask={false}
        maskClosable={true}
        zIndex={1300}
        onCancel={handleOk}
        modalRender={() => (
          <div
            style={{
              border: '3px solid #000',
              boxShadow: 'inset 0 0 12px rgba(0, 0, 0, 0.6)',
              padding: '40px 30px 20px 30px',
              backgroundColor: '#dcd4d3',
              boxSizing: 'border-box',
              wordBreak: 'break-all',
              wordWrap: 'break-word',
              maxWidth: '500px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '26px', fontWeight: 'bold' }}>{modalStr}</div>
            <div
              style={{
                width: '110px',
                height: '55px',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#9c9796',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                fontWeight: 'bold',
                marginTop: '20px',
                pointerEvents: 'auto',
                cursor: 'pointer',
              }}
              onClick={handleOk}
            >
              YSE
            </div>
          </div>
        )}
      ></Modal>
      <Chatroom height={650} right={chatRight} setChatRight={setChatRight}></Chatroom>
    </>
  );
};

export default Mine;
