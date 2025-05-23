import HuskiCopyright from '@/components/HuskiCopyright';
import HuskiFooter from '@/components/HuskiFooter';
import Header from '@/components/HuskiHeader/index';
import globalImage from '@/image';
import { WalletProvider } from '@suiet/wallet-kit';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React from 'react';
import { Outlet, history } from 'umi';

const PublicFrame: React.FC = () => {
  const handleMenuClick = (key: string) => {
    switch (key) {
      case 'Home':
        // history.push('/home');
        history.push('/publicFrame/Home');
        break;
      case 'Mine':
        history.push('/publicFrame/Mine');
        break;
      case 'Lottery':
        history.push('/publicFrame/Lottery');
        break;
      case 'Stake':
        history.push('/publicFrame/Stake');
        break;
      case 'Airdrop':
        history.push('/publicFrame/Airdrop');
        break;
    }
  };
  return (
    <WalletProvider>
      <Layout style={{ margin: '0 auto' }}>
        <Content
          style={{
            width: '100%',
            // height: '1230px',
            backgroundImage: `url(${globalImage.BackImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
          }}
        >
          <Header handleMenuClick={handleMenuClick} />{' '}
          <div>
            <Outlet />
          </div>
        </Content>
        <HuskiFooter />
        <HuskiCopyright />
      </Layout>
    </WalletProvider>
  );
};

export default PublicFrame;
