// src/context/WalletContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

interface Wallet {
  address: string;
  balance: number;
}

interface WalletContextType {
  wallet: Wallet | null;
  setWallet: (wallet: Wallet) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [wallet, setWallet] = useState<Wallet | null>(null);

  useEffect(() => {
    const fetchWallet = async () => {
      const address = '0x1234567890abcdef';
      const balance = 1000;
      setWallet({ address, balance });
    };

    fetchWallet();
  }, []);

  return <WalletContext.Provider value={{ wallet, setWallet }}>{children}</WalletContext.Provider>;
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
