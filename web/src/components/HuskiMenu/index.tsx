import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';
import './index.less';

const menuItems = [
  // {
  //   // title: 'Presale',
  //   title: 'Buy',
  //   key: 'Buy',
  // },
  {
    title: 'Buy',
    key: 'Buy',
    children: [
      {
        title: 'Hop',
        key: 'Hop',
      },
      {
        title: 'Turbos',
        key: 'Turbos',
      },
      {
        title: 'Cetus',
        key: 'Cetus',
      },
    ],
  },
  {
    title: 'Play',
    key: 'Play',
    children: [
      {
        title: 'Huski Mine',
        key: 'Mine',
      },
      {
        title: 'Huski Lottery',
        key: 'Lottery',
      },
    ],
  },
  {
    title: 'Stake',
    key: 'Stake',
  },
  {
    title: 'Airdrop',
    key: 'Airdrop',
  },
  {
    title: 'Guide',
    key: 'HuskiBook',
  },
];

const menuStyles: React.CSSProperties = {
  width: '1556px',
  height: '80px',
  backgroundColor: '#000',
  borderBottom: 'none',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-evenly',
};

const { SubMenu } = Menu;

interface MenuProps {
  handleMenuClick: (key: string) => void;
}

const HuskiMenu: React.FC<MenuProps> = ({ handleMenuClick }) => {
  const [activeIndex, setActiveIndex] = useState<string[] | never[]>([]);
  const { goHome, setHome } = useModel('menuModel');
  const onClick = (e: any) => {
    // if (e.key === 'Buy') {
    //   window.open(
    //     'https://www.pinksale.finance/solana/launchpad/FxU1dZ3uqfbSaZRJbyVbhf1iRStBT2nnx4hinneknznS',
    //     '_blank',
    //   );
    // } else if (e.key === 'Whitepaper') {
    //   window.open('https://docs.huski-token.com/Whitepaper.pdf', '_blank');
    // } else {
    //   handleMenuClick(e.key);
    // }
    if (e.key === 'Hop') {
      window.open('https://hop.ag/swap/SUI-HUSKI', '_blank');
    } else if (e.key === 'Turbos') {
      window.open(
        'https://app.turbos.finance/#/trade?input=0x2::sui::SUI&output=0xda1644f58a955833a15abae24f8cc65b5bd8152ce013fde8be0a6a3dcf51fe36::token::TOKEN',
        '_blank',
      );
    } else if (e.key === 'Cetus') {
      window.open(
        'https://app.cetus.zone/swap?from=0x2::sui::SUI&to=0xda1644f58a955833a15abae24f8cc65b5bd8152ce013fde8be0a6a3dcf51fe36::token::TOKEN',
        '_blank',
      );
    } else if (e.key === 'HuskiBook') {
      window.open('https://book.huski-token.com', '_blank');
    } else {
      handleMenuClick(e.key);
    }

    if (location.hash === '#/publicFrame/Home') {
      setActiveIndex([]);
    } else if (location.hash === '#/publicFrame/Mine') {
      setActiveIndex(['Mine']);
    } else if (location.hash === '#/publicFrame/Lottery') {
      setActiveIndex(['Lottery']);
    } else if (location.hash === '#/publicFrame/Stake') {
      setActiveIndex(['Stake']);
    } else if (location.hash === '#/publicFrame/Airdrop') {
      setActiveIndex(['Airdrop']);
    }

    setHome(false);
  };

  useEffect(() => {
    if (location.hash === '#/publicFrame/Home') {
      setActiveIndex([]);
    } else if (location.hash === '#/publicFrame/Mine') {
      setActiveIndex(['Mine']);
    } else if (location.hash === '#/publicFrame') {
      setActiveIndex(['Mine']);
    } else if (location.hash === '#/publicFrame/Lottery') {
      setActiveIndex(['Lottery']);
    } else if (location.hash === '#/publicFrame/Stake') {
      setActiveIndex(['Stake']);
    } else if (location.hash === '#/publicFrame/Airdrop') {
      setActiveIndex(['Airdrop']);
    }
  }, []);

  useEffect(() => {
    if (goHome) {
      setActiveIndex([]);
    }
  }, [goHome]);

  return (
    <Menu style={menuStyles} onClick={onClick} mode="horizontal" selectedKeys={activeIndex}>
      {menuItems.map((item) => {
        if (item.children) {
          return (
            <SubMenu key={item.key} title={item.title}>
              {item.children.map((child) => (
                <Menu.Item key={child.key}>{child.title}</Menu.Item>
              ))}
            </SubMenu>
          );
        }
        return (
          <Menu.Item key={item.key} style={{ width: '20%', textAlign: 'center' }}>
            {item.title}
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

export default HuskiMenu;
