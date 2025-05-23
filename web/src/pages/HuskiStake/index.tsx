import {
  ChangeToBlub,
  ChangeToHuski,
  ChangeToSui,
  getSSHAREAmount,
  handleGetAPY,
  handleGetEventNetValue,
  handleGetSUIAmount,
  handleGetTotalStake,
  handleSharesAmountToGet,
  handleStake,
  handleSuiAmountToGet,
  handleUnstake,
} from '@/api/stake';
import { common } from '@/contact/contact';
import globalImage from '@/image';
import { useWallet } from '@suiet/wallet-kit';
import { Button, Input, Modal } from 'antd';
import { Content } from 'antd/es/layout/layout';
import * as echarts from 'echarts';
import React, { useEffect, useRef, useState } from 'react';
import { useModel } from 'umi';
import './index.less';

const titleStyle: React.CSSProperties = {
  width: '636px',
  fontFamily: 'SourceHanSansCN-Heavy',
  fontWeight: 'bold',
  fontSize: '20px',
  color: '#171717',
  marginTop: '18px',
  marginLeft: '54px',
  marginBottom: '18px',
  display: 'flex',
  justifyContent: 'space-between',
};
const borderStyle: React.CSSProperties = {
  width: '663px',
  height: '2px',
  backgroundColor: '#000',
  marginLeft: '30px',
};
const chartStyle: React.CSSProperties = {
  width: '636px',
  height: '210px',
  marginLeft: '54px',
  marginTop: '10px',
};

interface VolumeDataItem {
  timestamp: string;
  totalStake: number;
}
interface NetValueDataItem {
  timestamp: string;
  netValue: number;
}

const Stake: React.FC = () => {
  const wallet = useWallet();
  const { balance, fetchBalance } = useModel('balanceModel');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStr, setModalStr] = useState('');
  const modalOwner = useRef<string>('');
  const showModal = (str, owner = '') => {
    modalOwner.current = owner;
    setModalStr(str);
    setIsModalOpen(true);
  };

  const [selectLogo, setSelectLogo] = useState('huski');
  const [coinName, setCoinName] = useState('HUSKI');
  const [redeemCoinName, setRedeemCoinName] = useState('HUSKISHARE ');
  const [volume, setVolume] = useState(0);
  const [volumeData, setVolumeData] = useState<VolumeDataItem[]>([]);
  const [netValue, setNetValue] = useState(0);
  const [netValueData, setNetValueData] = useState<NetValueDataItem[]>([]);
  const [APY, setAPY] = useState(0);
  const [suiOrHuski, setSuiOrHuski] = useState('0');
  const [sHARE, setSHARE] = useState('0');
  const [firstInput, setFirstInput] = useState(0);
  const [secondInput, setSecondInput] = useState(0);

  const getParams = () => {
    handleGetTotalStake().then((resVolume) => {
      if (resVolume && resVolume.length > 0) {
        setVolume(resVolume[resVolume.length - 1].totalStake);
        setVolumeData(
          resVolume.map((item) => ({
            timestamp: item.timestamp,
            totalStake: item.totalStake,
          })),
        );
      } else {
        setVolume(0);
        setVolumeData([]);
      }
    });

    handleGetEventNetValue().then((resNetValue) => {
      if (resNetValue && resNetValue.length > 0) {
        setNetValue(Number(resNetValue[resNetValue.length - 1].netValue));
        setNetValueData(
          resNetValue.map((item) => ({
            timestamp: item.timestamp,
            netValue: item.netValue,
          })),
        );
      } else {
        setNetValue(0);
        setNetValueData([]);
      }
    });

    handleGetAPY().then((resAPY) => {
      if (resAPY) {
        setAPY(Number(resAPY));
      } else {
        setAPY(0);
      }
    });

    if (wallet.connected) {
      handleGetSUIAmount(wallet).then((resSuiOrHuski) => {
        setSuiOrHuski(resSuiOrHuski + '');
      });

      getSSHAREAmount(wallet).then((resSHARE) => {
        setSHARE(resSHARE + '');
      });
    } else {
      setSuiOrHuski('0');
      setSHARE('0');
    }
  };

  useEffect(() => {
    switch (selectLogo) {
      case 'huski':
        setVolume(Number(volume + ''));
        setNetValue(Number(netValue + ''));
        setAPY(Number(APY + ''));
        setSuiOrHuski(suiOrHuski + '');
        setSHARE(sHARE + '');
        break;
      case 'sui':
        setVolume(Number(volume.toFixed(3)));
        setNetValue(Number(netValue.toFixed(3)));
        setAPY(Number(APY.toFixed(3)));
        setSuiOrHuski(Number(suiOrHuski).toFixed(3));
        setSHARE(Number(sHARE).toFixed(3));
        break;
      case 'blub':
        setVolume(Number(volume.toFixed(2)));
        setNetValue(Number(netValue.toFixed(2)));
        setAPY(Number(APY.toFixed(2)));
        setSuiOrHuski(Number(suiOrHuski).toFixed(2));
        setSHARE(Number(sHARE).toFixed(2));
        break;
    }
  }, [volume, netValue, APY]);

  const handleSelectCoin = async (coin: string) => {
    switch (coin) {
      case 'huski':
        await ChangeToHuski();
        setSelectLogo('huski');
        setCoinName('HUSKI');
        setRedeemCoinName('HUSKISHARE ');

        setFirstInput(0);
        setSecondInput(0);
        break;
      case 'sui':
        await ChangeToSui();
        setSelectLogo('sui');
        setCoinName('SUI');
        setRedeemCoinName('SUISHARE');

        setFirstInput(0);
        setSecondInput(0);
        break;
      case 'blub':
        await ChangeToBlub();
        setSelectLogo('blub');
        setCoinName('BLUB');
        setRedeemCoinName('BLUBSHARE');

        setFirstInput(0);
        setSecondInput(0);
        break;
    }
    getParams();
  };

  const getDate = (date) => {
    let month = date.split(' ')[0];
    let time = date.split(' ')[1];
    return (
      month.split('-')[1] +
      '.' +
      month.split('-')[2] +
      ' ' +
      time.split(':')[0] +
      ':' +
      time.split(':')[1]
    );
  };
  const barRef = useRef(null);
  useEffect(() => {
    const barInstance = echarts.init(barRef.current);
    const option = {
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        top: 20,
        bottom: 40,
        left: 60,
        right: 20,
      },
      xAxis: {
        // type: 'category',
        data: volumeData.map((item) => getDate(item.timestamp)),
        axisLine: {
          show: true,
          lineStyle: {
            height: '2px',
            color: '#464849',
          },
        },
        axisLabel: {
          color: '#333',
          fontSize: '16px',
          formatter: function (value) {
            return value.split(' ').join('\n');
          },
          fontFamily: 'SourceHanSansCN-Medium',
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#464849',
          },
        },
        nameGap: 50,
        axisLabel: {
          fontSize: '16px',
          fontFamily: 'SourceHanSansCN-Medium',
          formatter: function (value) {
            if (value >= 1000000000) {
              return value / 1000000000 + 'B';
            } else if (value >= 1000000) {
              return value / 1000000 + 'M';
            } else if (value >= 1000) {
              return value / 1000 + 'K';
            } else {
              return value;
            }
          },
          padding: [0, 0, 0, 10],
        },
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          data: volumeData.map((item) => item.totalStake),
          type: 'bar',
          barWidth: '15px',
          itemStyle: {
            color: '#868281',
            border: 'solid 1px #868281',
          },
          label: {
            show: false,
          },
        },
      ],
    };
    barInstance.setOption(option);
    return () => {
      barInstance.dispose();
    };
  }, [volumeData]);
  const lineRef = useRef(null);
  useEffect(() => {
    const lineInstance = echarts.init(lineRef.current);
    const option = {
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        top: 10,
        bottom: 40,
        left: 60,
        right: 20,
      },
      xAxis: {
        // type: 'category',
        data: netValueData.map((item) => getDate(item.timestamp)),
        axisLine: {
          show: true,
          lineStyle: {
            height: '2px',
            color: '#464849',
          },
        },
        axisLabel: {
          color: '#333',
          fontSize: '16px',
          formatter: function (value) {
            return value.split(' ').join('\n');
          },
          fontFamily: 'SourceHanSansCN-Medium',
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#464849',
          },
        },
        axisLabel: {
          color: '#333',
          fontSize: '16px',
          fontFamily: 'SourceHanSansCN-Medium',
        },
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          data: netValueData.map((item) => item.netValue),
          type: 'line',
          itemStyle: {
            color: '#000',
            border: 'solid 1px #868281',
          },
          label: {
            show: false,
          },
        },
      ],
    };
    lineInstance.setOption(option);
    return () => {
      lineInstance.dispose();
    };
  }, [netValueData]);

  useEffect(() => {
    handleSelectCoin('huski').then(() => {});
  }, [wallet.connected]);

  const [selectGetOrRedeem, setGetOrRedeem] = useState('GET');

  const handleGetOrRedeem = (type: string) => {
    setGetOrRedeem(type);
    setFirstInput(0);
    setSecondInput(0);
  };

  useEffect(() => {
    // handleSelectCoin('huski').then(() => {});
    getParams();
  }, [balance]);

  const handleStakeOrRedeem = () => {
    switch (selectGetOrRedeem) {
      case 'GET':
        if (firstInput > Number(suiOrHuski)) {
          showModal('The input value exceeds the current account balance！');
        } else {
          handleStake(wallet, firstInput * common.DECIMALS).then((res) => {
            if (res) {
              // getParams();
              fetchBalance(wallet?.address);
            }
          });
        }
        break;
      case 'REDEEM':
        if (firstInput > Number(sHARE)) {
          showModal('The input value exceeds the current account balance！');
        } else {
          handleUnstake(wallet, firstInput * common.DECIMALS).then((res) => {
            if (res) {
              // getParams();
              fetchBalance(wallet?.address);
            }
          });
        }
        break;
    }
  };

  const handleChangeInput = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setFirstInput(value);
      if (selectGetOrRedeem === 'GET') {
        handleSharesAmountToGet(value).then((res) => {
          setSecondInput(res);
        });
      } else {
        handleSuiAmountToGet(value).then((res) => {
          setSecondInput(res);
        });
      }
    } else {
      showModal('Only numbers or decimals can be entered！');
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Content
        style={{
          width: '1556px',
          height: '640px',
          margin: '25px auto',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '1636px',
            height: '640px',
            marginLeft: '-80px',
            display: 'flex',
          }}
          className={`${!wallet.connected ? 'blurred' : ''}`}
        >
          <div
            style={{
              width: '77px',
              // height: '120px',
              height: '117px',
              // background: 'red',
              borderLeft: 'solid 3px #000000',
              borderTop: 'solid 3px #000000',
              borderBottom: 'solid 3px #000000',
            }}
          >
            <div
              style={{
                width: '74px',
                height: '57px',
                cursor: 'pointer',
                padding: '2px 12px',
                borderBottom: '3px solid #000',
                background: `${selectLogo === 'huski' ? '#aaa' : 'transparent'}`,
              }}
              onClick={() => handleSelectCoin('huski')}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundImage: `url(${globalImage.HuskiImage})`,
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            </div>
            <div
              style={{
                width: '74px',
                height: '54px',
                padding: '2px 12px',
                cursor: 'pointer',
                background: `${selectLogo === 'sui' ? '#aaa' : 'transparent'}`,
              }}
              onClick={() => handleSelectCoin('sui')}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundImage: `url(${globalImage.SuiLogo})`,
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            </div>
            {/* <div
              style={{
                width: '74px',
                height: '60px',
                padding: '4px 12px',
                cursor: 'pointer',
                background: `${selectLogo === 'blub' ? '#aaa' : 'transparent'}`,
              }}
              onClick={() => handleSelectCoin('blub')}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundImage: `url(${globalImage.BlubLogo})`,
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            </div> */}
          </div>
          <div
            style={{
              width: '1556px',
              height: '640px',
              display: 'flex',
            }}
          >
            <div
              style={{
                width: '766px',
                height: '640px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  width: '766px',
                  height: '300px',
                  border: 'solid 4px #000',
                }}
              >
                <div style={titleStyle}>
                  Volume: {volume} {selectLogo === 'huski' ? 'HUSKISHARE' : (selectLogo === 'sui' ? 'SUISHARE': 'BLUBSHARE')}
                </div>
                <div style={borderStyle}></div>
                <div ref={barRef} style={chartStyle} id="bar-container"></div>
              </div>
              <div
                style={{
                  width: '766px',
                  height: '310px',
                  border: 'solid 4px #000',
                }}
              >
                <div style={titleStyle}>
                  <div>Net value: {netValue}</div>
                  <div>APY: {APY}%</div>
                </div>
                <div style={borderStyle}></div>
                <div ref={lineRef} style={chartStyle} id="line-container"></div>
              </div>
            </div>
            <div
              style={{
                width: '765px',
                height: '640px',
                marginLeft: '25px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  width: '765px',
                  height: '250px',
                  border: 'solid 4px #000',
                }}
              >
                <div style={titleStyle}>Balance</div>
                <div style={borderStyle}></div>
                <div
                  style={{
                    width: '650px',
                    height: '126px',
                    marginLeft: '35px',
                    marginTop: '30px',
                    fontFamily: 'BodoniBT-Bold',
                    fontSize: '28px',
                    color: '#000',
                  }}
                >
                  <div
                    style={{
                      width: '650px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>{coinName}</div>
                    <div
                      style={{
                        width: '450px',
                        height: '50px',
                        display: 'flex',
                        backgroundImage: `url(${globalImage.PlayInput})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '100% 100%',
                      }}
                    >
                      <Input className="coinInputNumber" value={suiOrHuski} />
                    </div>
                  </div>
                  <div
                    style={{
                      width: '650px',
                      height: '50px',
                      marginTop: '26px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>{redeemCoinName}</div>
                    <div
                      style={{
                        width: '450px',
                        height: '50px',
                        display: 'flex',
                        backgroundImage: `url(${globalImage.PlayInput})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '100% 100%',
                      }}
                    >
                      <Input className="coinInputNumber" value={sHARE} />
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: '765px',
                  height: '357px',
                  border: 'solid 4px #000',
                }}
              >
                <div
                  style={{
                    // width: '364px',
                    width: '400px',
                    height: '49px',
                    fontFamily: 'SourceHanSansCN-Heavy',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    marginTop: '18px',
                    marginLeft: '30px',
                    display: 'flex',
                  }}
                >
                  <div
                    style={{
                      width: '200px',
                      height: '49px',
                      border: `${
                        selectGetOrRedeem === 'GET' ? 'solid 4px rgba(0, 0, 0, 0.42)' : 'none'
                      }`,
                      backgroundImage: `${
                        selectGetOrRedeem === 'GET' ? '' : `url(${globalImage.TabBtn})`
                      }`,
                      backgroundSize: '100% 100%',
                      backgroundRepeat: 'no-repeat',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleGetOrRedeem('GET')}
                  >
                    GET {redeemCoinName}
                  </div>
                  <div
                    style={{
                      width: '200px',
                      height: '49px',
                      border: `${
                        selectGetOrRedeem === 'REDEEM' ? 'solid 4px rgba(0, 0, 0, 0.42)' : 'none'
                      }`,
                      backgroundImage: `${
                        selectGetOrRedeem === 'REDEEM' ? '' : `url(${globalImage.TabBtn})`
                      }`,
                      backgroundSize: '100% 100%',
                      backgroundRepeat: 'no-repeat',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleGetOrRedeem('REDEEM')}
                  >
                    REDEEM {coinName}
                  </div>
                </div>
                <div style={borderStyle}></div>
                <div
                  style={{
                    width: '670px',
                    height: '245px',
                    marginTop: '20px',
                    marginLeft: '30px',
                    display: 'flex',
                  }}
                >
                  <div
                    style={{
                      width: '530px',
                      height: '225px',
                    }}
                  >
                    <div
                      style={{
                        width: '530px',
                        height: '50px',
                        display: 'flex',
                        backgroundImage: `url(${globalImage.PlayInput})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '100% 100%',
                      }}
                    >
                      <Input
                        className="coinInputNumber"
                        value={firstInput}
                        onChange={handleChangeInput}
                      />
                    </div>
                    <div
                      style={{
                        width: '530px',
                        height: '50px',
                        display: 'flex',
                        marginTop: '30px',
                        backgroundImage: `url(${globalImage.PlayInput})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '100% 100%',
                      }}
                    >
                      <Input className="coinInputNumber" value={secondInput} />
                    </div>
                    <Button
                      style={{
                        width: '220px',
                        height: '60px',
                        marginTop: '35px',
                        backgroundColor: 'transparent',
                        backgroundImage: `url(${globalImage.StakeOrRedeem})`,
                        backgroundSize: '100% 100%',
                        border: 'none',
                        fontFamily: 'SourceHanSansCN-Heavy',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#000',
                        paddingLeft: '5px',
                        paddingBottom: '15px',
                      }}
                      onClick={handleStakeOrRedeem}
                    >
                      {selectGetOrRedeem === 'GET' ? 'Stake' : 'Redeem'}
                    </Button>
                  </div>
                  <div
                    style={{
                      width: '140px',
                      height: '245px',
                      marginTop: '-10px',
                      paddingLeft: '30px',
                    }}
                  >
                    <div
                      style={{
                        width: '110px',
                        height: '110px',
                        backgroundImage: `url(${selectGetOrRedeem === 'GET' ? (selectLogo === 'huski' ? globalImage.HuskiImage : (selectLogo === 'sui' ? globalImage.Sui110Image: globalImage.Blub110Image)) : (selectLogo === 'huski' ? globalImage.HuskiBankImage: (selectLogo === 'sui' ? globalImage.SuiBankImage : globalImage.BlubBankImage))})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                      }}
                    ></div>
                    <div
                      style={{
                        width: '25px',
                        height: '19px',
                        margin: '3px 40px',
                        backgroundImage: `url(${globalImage.ArrowImage})`,
                        backgroundSize: '100% 100%',
                        backgroundRepeat: 'no-repeat',
                      }}
                    ></div>
                    <div
                      style={{
                        width: '110px',
                        height: '110px',
                        backgroundImage: `url(${
                          selectGetOrRedeem === 'GET' ? (selectLogo === 'huski' ? globalImage.HuskiBankImage : (selectLogo === 'sui' ? globalImage.SuiBankImage : globalImage.BlubBankImage)) : (selectLogo === 'huski' ? globalImage.HuskiImage : (selectLogo === 'sui' ? globalImage.Sui110Image : globalImage.Blub110Image))
                        })`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {!wallet.connected && (
          <div
            style={{
              width: '1636px',
              height: '640px',
              marginLeft: '-80px',
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
                marginLeft: '80px',
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
    </>
  );
};

export default Stake;
