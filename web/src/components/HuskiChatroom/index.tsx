import { handleGetChatMsg, handleSendMsg } from '@/api/chat';
import globalImage from '@/image';
import { useModel } from '@@/exports';
import { StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';
import { useWallet } from '@suiet/wallet-kit';
import { Button, Input, List } from 'antd';
import VirtualList from 'rc-virtual-list';
import { useEffect, useRef, useState } from 'react';
import './index.less';
const HuskiChatroom = ({ height, right, setChatRight }) => {
  const [borderRight, setBorderRight] = useState<any>('none');
  const wallet = useWallet();
  const { fetchBalance } = useModel('balanceModel');

  const [sendInfo, setSendInfo] = useState('');
  const handleCodeInputChange = (e) => {
    setSendInfo(e.target.value);
  };
  const [messages, setMessages] = useState<string[]>([]);

  const handleSendInfo = () => {
    handleSendMsg(wallet, sendInfo).then((res) => {
      if (res) {
        handleGetChatMsg().then((r) => {
          setMessages(r);
          setSendInfo('');
          fetchBalance(wallet?.address);
        });
      }
    });
  };
  const fetchMessages = async () => {
    handleGetChatMsg().then((r) => {
      setMessages(r);
    });
  };

  useEffect(() => {
    fetchMessages();

    const intervalId = setInterval(() => {
      fetchMessages();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleClick = (e) => {
    e.stopPropagation();
    setChatRight((prevRight) => (prevRight === 0 ? -625 : 0));
  };

  useEffect(() => {
    if (right === 0) {
      setBorderRight('none');
    } else {
      setBorderRight('4px solid #000');
    }
  }, [right]);

  const listRef = useRef<any>(null);

  useEffect(() => {
    if (listRef.current) {
      setTimeout(() => {
        listRef.current.scrollTo({ index: messages.length - 1, align: 'bottom', offset: 0 });
      }, 0);
    }
  }, [messages]);

  return (
    <div
      style={{
        width: '660px',
        height: height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        // top: '351px',
        bottom: '0',
        right: right,
        transition: 'right 0.5s ease',
        zIndex: '2000',
      }}
    >
      <div
        style={{
          width: '35px',
          height: '110px',
          background: 'rgba(220, 212, 211, 0.8)',
          border: 'solid 4px #000000',
          borderRight: borderRight,
          cursor: 'pointer',
          fontSize: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={handleClick}
      >
        {right === 0 ? <StepForwardOutlined /> : <StepBackwardOutlined />}
      </div>
      <div
        style={{
          width: '625px',
          height: height,
          border: 'solid 4px #000000',
          background: 'rgba(220, 212, 211, 0.8)',
          visibility: 'visible',
        }}
      >
        <div
          style={{
            width: '625px',
            height: height - 78,
            overflowY: 'auto',
          }}
        >
          <List itemLayout="horizontal">
            <VirtualList
              ref={listRef}
              data={messages}
              height={height - 78}
              itemHeight={47}
              itemKey={(item) => item}
              // onScroll={async (e) => {
              //   const target = e.target as HTMLElement;
              //   if (target.scrollTop === 0) {
              //     target.scrollTop = 1;
              //   }
              // }}
            >
              {(item) => (
                <List.Item
                  key={item}
                  style={{
                    height: '47px',
                    padding: '0 15px',
                    borderBottom: 'none',
                  }}
                >
                  <List.Item.Meta
                    avatar={
                      <div
                        style={{
                          width: '35px',
                          height: '35px',
                          border: '2px solid #121212',
                          borderRadius: '50%',
                          backgroundImage: `url(${globalImage.SuiLogo})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '100% 100%',
                        }}
                      />
                    }
                    title={
                      <div
                        style={{
                          height: '10px',
                          fontFamily: 'SourceHanSansCN-Regular',
                          fontSize: '10px',
                          color: '#000',
                        }}
                      >
                        {item.split('=')[0]}
                      </div>
                    }
                    description={
                      <div
                        style={{
                          padding: '0 10px',
                          fontFamily: 'SourceHanSansCN-Regular',
                          fontWeight: 'bold',
                          fontSize: '16px',
                          color: '#000',
                          background: 'rgba(18, 18, 18, 0.2)',
                          display: 'inline-flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        {item.split('=')[2] === 'win' && (
                          <div
                            style={{
                              width: '29px',
                              height: '29px',
                              backgroundImage: `url(${globalImage.Congratulation})`,
                              backgroundRepeat: 'no-repeat',
                              backgroundSize: '100% 100%',
                              marginRight: '10px',
                            }}
                          ></div>
                        )}
                        {item.split('=')[2] === 'new_lottery_winner' && (
                          <div
                            style={{
                              width: '29px',
                              height: '29px',
                              backgroundImage: `url(${globalImage.CongratulationPink})`,
                              backgroundRepeat: 'no-repeat',
                              backgroundSize: '100% 100%',
                              marginRight: '10px',
                            }}
                          ></div>
                        )}
                        {item.split('=')[1]}
                      </div>
                    }
                  />
                </List.Item>
              )}
            </VirtualList>
          </List>
        </div>
        <div
          style={{
            width: '617px',
            height: '70px',
            padding: '10px',
            display: 'flex',
          }}
        >
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundImage: `url(${globalImage.AvatarDog})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%',
            }}
          />
          <div
            style={{
              width: '300px',
              marginLeft: '10px',
              backgroundImage: `url(${globalImage.PlayInput})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%',
            }}
          >
            <Input className="sendInput" value={sendInfo} onChange={handleCodeInputChange} />
          </div>
          <Button
            style={{
              width: '190px',
              height: '50px',
              marginLeft: '30px',
              backgroundColor: 'transparent',
              backgroundImage: `url(${globalImage.menuBtnImage})`,
              backgroundSize: '100% 100%',
              border: 'none',
              fontFamily: 'SourceHanSansCN-Heavy',
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#000',
              paddingLeft: '5px',
              paddingBottom: '15px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={handleSendInfo}
          >
            <div
              style={{
                width: '26px',
                height: '22px',
                marginRight: '10px',
                backgroundImage: `url(${globalImage.Send})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
              }}
            ></div>
            send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HuskiChatroom;
