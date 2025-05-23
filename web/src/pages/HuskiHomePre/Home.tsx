import HuskiCopyright from '@/components/HuskiCopyright';
import HuskiFooter from '@/components/HuskiFooter';
import HuskiHeader from '@/components/HuskiHeader';
import globalImage from '@/image';
import { history } from '@@/core/history';
import { Button, Layout } from 'antd';
import React, { useState } from 'react';
import './Home.less';

const data = [
  {
    id: 1,
    image: globalImage.VideoImage1,
    timeSpan: '5 min',
    title:
      '🔥 UPCOMING PRESALE ALERT 🔥 HUSKI TOKEN 🔥 The Future of Memecoins on Solana! Get in Early!',
    creator: 'Crypto Infinity',
    link: 'https://www.youtube.com/watch?v=mxtWWpWHeUc',
  },
  {
    id: 2,
    image: globalImage.VideoImage2,
    timeSpan: '6 min',
    title:
      "🔥 THE CUTEST MEMECOIN ON SOLANA 🔥 HUSKI TOKEN 🔥 Solana's Most Lovable Memecoin! 🔥 Don't Miss Out!",
    creator: 'Crypto Vlog',
    link: 'https://www.youtube.com/watch?v=iiqqwqgU1CM',
  },
  {
    id: 3,
    image: globalImage.VideoImage3,
    timeSpan: '6 min',
    title:
      '🔥 FROM PAWS TO PROFIT 🔥 HUSKI TOKEN 🔥 The Ultimate Solana Memecoin with Endless Possibilities!',
    creator: 'Crypto Royal',
    link: 'https://www.youtube.com/watch?v=t36RRiMoWn8',
  },
];

const Home: React.FC = () => {
  const [backgroundImage, setBackgroundImage] = useState(`url(${globalImage.LogoBgImage})`);
  // const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | undefined>(undefined);
  const handleRocketClick = () => {
    setBackgroundImage(`url(${globalImage.LogoYellowBgImage})`);
  };
  const handleMoonClick = () => {
    setBackgroundImage(`url(${globalImage.LogoSmokeBgImage})`);
  };

  const handleBuyClick = () => {
    window.open(
      'https://www.pinksale.finance/solana/launchpad/FxU1dZ3uqfbSaZRJbyVbhf1iRStBT2nnx4hinneknznS',
      '_blank',
    );
  };

  const handleJoinClick = () => {
    window.open('https://t.me/huskitoken2024', '_blank');
  };

  const handlePinkSaleClick = () => {
    window.open('https://www.pinksale.finance', '_blank');
  };

  const handleDexviewClick = () => {
    window.open('https://www.dexview.com', '_blank');
  };

  const handleMenuClick = (key: string) => {
    switch (key) {
      case 'Home':
        history.push('/home');
        break;
      case 'Battle':
        history.push('/outPage/Battle');
        break;
      case 'Dice':
        history.push('/outPage/Dice');
        break;
      case 'Mine':
        history.push('/outPage/Mine');
        break;
      case 'Lottery':
        history.push('/outPage/Lottery');
        break;
      case 'Stake':
        history.push('/outPage/Stake');
        break;
    }
  };

  const handleVideoClick = (value: string) => {
    window.open(value, '_blank');
  };

  return (
    <Layout
      style={{
        width: '1920px',
        // height: '4146px',
        height: '4784px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          width: '1920px',
          height: '3946px',
          backgroundImage: `url(${globalImage.HomeImage})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          fontFamily: 'BodoniBT-Bold',
          fontWeight: 'bold',
          fontStretch: 'normal',
          color: '#000000',
          border: 'none',
        }}
      >
        <HuskiHeader handleMenuClick={handleMenuClick} />{' '}
        <div
          style={{
            width: '1654px',
            height: '660px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              width: '100%',
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
              width: '1654px',
              height: '532px',
              margin: '30px auto',
              display: 'flex',
            }}
          >
            <div
              style={{
                width: '1042px',
                height: '481px',
                backgroundImage: `url(${globalImage.TextImage})`,
                backgroundRepeat: 'no-repeat',
                marginRight: 'calc(100% - 1042px - 533px)',
                position: 'relative',
              }}
            >
              <Button
                style={{
                  width: '66px',
                  height: '63px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  backgroundImage: `url(${globalImage.RocketImage})`,
                  backgroundRepeat: 'no-repeat',
                  position: 'absolute',
                  top: '60px',
                  left: '820px',
                }}
                onClick={handleRocketClick}
              ></Button>
              <Button
                style={{
                  width: '81px',
                  height: '81px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  backgroundImage: `url(${globalImage.MoonImage})`,
                  backgroundRepeat: 'no-repeat',
                  position: 'absolute',
                  left: '970px',
                }}
                onClick={handleMoonClick}
              ></Button>
              <div
                style={{
                  width: '700px',
                  height: '67px',
                  display: 'flex',
                  flexDirection: 'row',
                  position: 'absolute',
                  top: '440px',
                  left: '460px',
                }}
              >
                <Button
                  style={{
                    width: '360px',
                    height: '67px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    backgroundImage: `url(${globalImage.ButtonImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onClick={handleBuyClick}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      marginBottom: '5px',
                      marginRight: '15px',
                      backgroundImage: `url(${globalImage.PinksaleImage})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '100% 100%',
                    }}
                  ></div>
                  <div
                    style={{
                      fontFamily: 'BodoniBT-Bold',
                      fontSize: '28px',
                      fontWeight: 'bold',
                      fontStretch: 'normal',
                      color: '#000000',
                      paddingBottom: '10px',
                    }}
                  >
                    Buy HUSKI Presale
                  </div>
                </Button>
                <Button
                  style={{
                    width: '300px',
                    height: '67px',
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
                  }}
                  onClick={handleJoinClick}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      marginBottom: '5px',
                      marginRight: '15px',
                      backgroundImage: `url(${globalImage.TelegramImage})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '100% 100%',
                    }}
                  ></div>
                  <div
                    style={{
                      fontFamily: 'BodoniBT-Bold',
                      fontSize: '28px',
                      fontWeight: 'bold',
                      fontStretch: 'normal',
                      color: '#000000',
                      paddingBottom: '10px',
                    }}
                  >
                    Join Telegram
                  </div>
                </Button>
              </div>
            </div>
            <div
              style={{
                width: '533px',
                backgroundImage: backgroundImage,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
              }}
            ></div>
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '1250px',
            left: '255px',
            height: '400px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span
            style={{
              fontSize: '40px',
            }}
          >
            TOKENOMICS
          </span>
          <span
            style={{
              fontSize: '30px',
              marginTop: '56px',
            }}
          >
            Token Name: Huski Token
          </span>
          <span
            style={{
              fontSize: '30px',
              marginTop: '14px',
            }}
          >
            Symbol: HUSKI
          </span>
          <span
            style={{
              fontSize: '30px',
              marginTop: '14px',
            }}
          >
            Network: Solana
          </span>
          <span
            style={{
              fontSize: '30px',
              marginTop: '14px',
            }}
          >
            Total Supply: 4.2 B HUSKI
          </span>
          <span
            style={{
              fontSize: '30px',
              marginTop: '14px',
            }}
          >
            Decimals: 2
          </span>
        </div>
        <div
          style={{
            width: '256px',
            position: 'absolute',
            top: '1920px',
            left: '832px',
            lineHeight: '22px',
            letterSpacing: '2px',
            fontSize: '48px',
          }}
        >
          ROADMAP
        </div>
        <div
          style={{
            position: 'absolute',
            top: '2022px',
            left: '1060px',
            height: '218px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span
            style={{
              fontSize: '48px',
            }}
          >
            Q2 2024:{' '}
          </span>
          <span
            style={{
              fontSize: '24px',
              marginTop: '5px',
            }}
          >
            Deploy Huski Token on Sol.
          </span>
          <span
            style={{
              fontSize: '24px',
            }}
          >
            Create social media presence for Huski Token.
          </span>
          <span
            style={{
              fontSize: '24px',
            }}
          >
            Conduct an audit of Huski Token. Hold a presale for the token.
          </span>
          <span
            style={{
              fontSize: '24px',
            }}
          >
            Launch the Huski Token.
          </span>
          <span
            style={{
              fontSize: '24px',
            }}
          >
            List Huski Token on Raydium.
          </span>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '2260px',
            left: '275px',
            height: '218px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span
            style={{
              fontSize: '48px',
            }}
          >
            Q3 2024:{' '}
          </span>
          <span
            style={{
              fontSize: '24px',
              marginTop: '5px',
            }}
          >
            Conduct an airdrop for Huski Token holders.
          </span>
          <span
            style={{
              fontSize: '24px',
            }}
          >
            List Huski Token on centralized exchanges such as MEXC and BitMart.
          </span>
          <span
            style={{
              fontSize: '24px',
            }}
          >
            Launch and list Huski Token on decentralized exchanges.
          </span>
          <span
            style={{
              fontSize: '24px',
            }}
          >
            Release the first game within the Huski Token ecosystem.
          </span>
          <span
            style={{
              fontSize: '24px',
            }}
          >
            Expand the game portfolio and integrate additional features.
          </span>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '2742px',
            left: '1200px',
            height: '110px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span
            style={{
              fontSize: '48px',
            }}
          >
            Q4 2024:{' '}
          </span>
          <span
            style={{
              fontSize: '24px',
              marginTop: '5px',
            }}
          >
            Implement a Huski Token bridge feature.
          </span>
          <span
            style={{
              fontSize: '24px',
            }}
          >
            Launch more games within the Huski Token ecosystem.
          </span>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '3250px',
            left: '200px',
            height: '370px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span
            style={{
              fontSize: '48px',
            }}
          >
            Presale is Live
          </span>
          <span
            style={{
              fontSize: '26px',
              marginTop: '30px',
            }}
          >
            Huski Token (HUSKI) is a unique
          </span>
          <span
            style={{
              fontSize: '26px',
            }}
          >
            and community-driven memecoin that revolves
          </span>
          <span
            style={{
              fontSize: '26px',
            }}
          >
            around the adorable and beloved image
          </span>
          <span
            style={{
              fontSize: '26px',
            }}
          >
            of husky dogs.
          </span>
          <div
            style={{
              fontSize: '30px',
              marginTop: '20px',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <div
              style={{
                width: '34px',
                height: '29px',
                backgroundImage: `url(${globalImage.CalenderImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
                marginRight: '25px',
              }}
            ></div>
            <span>June 1st UTC-0 2024</span>
          </div>
          <Button
            style={{
              width: '360px',
              height: '67px',
              marginTop: '20px',
              border: 'none',
              backgroundColor: 'transparent',
              backgroundImage: `url(${globalImage.ButtonImage})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={handleBuyClick}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                marginBottom: '5px',
                marginRight: '15px',
                backgroundImage: `url(${globalImage.PinksaleImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
              }}
            ></div>
            <div
              style={{
                fontFamily: 'BodoniBT-Bold',
                fontSize: '30px',
                fontWeight: 'bold',
                fontStretch: 'normal',
                color: '#000000',
                paddingBottom: '10px',
              }}
            >
              Buy HUSKI Presale
            </div>
          </Button>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '3320px',
            left: '1195px',
            height: '40px',
            // border: '1px solid red',
          }}
        >
          <Button
            style={{
              width: '190px',
              height: '100%',
              background: 'transparent',
              border: 'none',
            }}
            onClick={handlePinkSaleClick}
          ></Button>
          <Button
            style={{
              width: '190px',
              height: '100%',
              marginLeft: '25px',
              background: 'transparent',
              border: 'none',
            }}
            onClick={handleDexviewClick}
          ></Button>
        </div>
      </div>
      <div
        style={{
          width: '1920px',
          height: '639px',
          marginTop: '-1px',
          backgroundImage: `url(${globalImage.VideoBgImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          color: '#fff',
          border: 'none',
          zIndex: '1',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '108px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'BodoniBT-Bold',
            fontSize: '48px',
            fontWeight: 'bold',
            fontStretch: 'normal',
            letterSpacing: '2px',
            color: '#c8c3c1',
          }}
        >
          <span>VIDEO</span>
        </div>
        <div
          style={{
            width: '1464px',
            height: '495px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {data.map((item, index) => (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(undefined)}
              className={`div-box ${hoveredIndex === index ? 'div-box-hovered' : ''}`}
              onClick={() => handleVideoClick(item.link)}
            >
              <div
                style={{
                  width: '400px',
                  height: '225px',
                  backgroundImage: `url(${item.image})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100% 100%',
                }}
              ></div>
              <div
                style={{
                  width: '400px',
                  height: '225px',
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div className={`overlay ${hoveredIndex === index ? 'hovered' : ''}`}></div>
              </div>
              <div
                style={{
                  width: '400px',
                  height: '50px',
                  backgroundImage: `url(${globalImage.VideoBgImage2})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100% 100%',
                  padding: '0 30px',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  fontSize: '20px',
                  color: '#030303',
                }}
              >
                <div
                  style={{
                    width: '100px',
                    height: '20px',
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      backgroundImage: `url(${globalImage.ViralImage})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '100% 100%',
                    }}
                  ></div>
                  <span
                    style={{
                      marginLeft: '10px',
                    }}
                  >
                    Viral
                  </span>
                </div>
                <div>
                  <div
                    style={{
                      width: '100px',
                      height: '20px',
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <div
                      style={{
                        width: '17px',
                        height: '20px',
                        backgroundImage: `url(${globalImage.ClockImage})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '100% 100%',
                      }}
                    ></div>
                    <span
                      style={{
                        marginLeft: '10px',
                      }}
                    >
                      {item.timeSpan}
                    </span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: '400px',
                  height: '2px',
                  border: 'solid 2px #000000',
                }}
              ></div>
              <div
                style={{
                  width: '340px',
                  height: '120px',
                  margin: '20px auto',
                  fontSize: '23px',
                  lineHeight: '28px',
                }}
              >
                <span>{item.title}</span>
              </div>
              <div
                style={{
                  width: '340px',
                  height: '25px',
                  margin: '0 auto',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    color: '#666',
                    fontSize: '20px',
                  }}
                >
                  Creator
                </span>
                <span
                  style={{
                    fontSize: '20px',
                    marginLeft: '10px',
                  }}
                >
                  {item.creator}
                </span>
                <Button
                  style={{
                    width: '25px',
                    height: '25px',
                    marginLeft: '24px',
                    background: 'transparent',
                    backgroundImage: `url(${globalImage.PlayImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%',
                    border: 'none',
                  }}
                ></Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <HuskiFooter />
      <HuskiCopyright />
    </Layout>
  );
};
export default Home;
