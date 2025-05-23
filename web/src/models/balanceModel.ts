import { apiTestnet } from '@/api/api';
import { ADDRESS_SUI } from '@/contact/contact';
import { Connection, JsonRpcProvider } from '@mysten/sui.js';
import { useState } from 'react';

export default function Page() {
  const [balance, setBalance] = useState('');
  const provider = new JsonRpcProvider(
    // new Connection({ fullnode: 'https://fullnode.testnet.sui.io:443' }),
    new Connection({ fullnode: apiTestnet }),
  );
  const sleep = async (time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('');
      }, time);
    });
  };
  const fetchBalance = async (address) => {
    if (address) {
      await sleep(1000);
      try {
        const coins = await provider.getCoins({
          owner: address,
          // coinType: '0x2::sui::SUI',
          coinType: ADDRESS_SUI.coinType1,
        });
        const totalBalance = coins.data.reduce((acc, coin) => acc + parseInt(coin.balance), 0);
        // setBalance(Number((totalBalance / common.DECIMALS).toFixed(3)) + '');
        setBalance(Number((totalBalance / 1e9).toFixed(3)) + '');
      } catch (error) {
        console.error('Failed to fetch balance:', error);
      }
    }
  };

  return {
    balance,
    fetchBalance,
  };
}
