// import React, { useContext, useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

interface SolanaContextType {
  connection: Connection | null;
  connected: boolean;
  publicKey: PublicKey | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

// const SolanaContext = createContext<SolanaContextType>({
//   connection: null,
//   connected: false,
//   publicKey: null,
//   connect: async () => {},
//   disconnect: async () => {},
// });

const SolanaContext = ({
    connection: false,
    connected: false,
    publicKey: new PublicKey('11111111111111111111111111111111'),
    connect: async () => {},
    disconnect: async () => {},
  });

// export const useSolana = () => useContext(SolanaContext);

export const SolanaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [connection, setConnection] = useState<Connection | null>(null);
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);

  useEffect(() => {
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
    setConnection(connection);
  }, []);

  const connect = async () => {
    try {
      // Dumm Wallet
      const dummyPublicKey = new PublicKey('11111111111111111111111111111111');
      setPublicKey(dummyPublicKey);
      setConnected(true);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const disconnect = async () => {
    setPublicKey(null);
    setConnected(false);
  };

  return (
    // <SolanaContext value={{ connection, connected, publicKey, connect, disconnect }}>
      {children}
    // </SolanaContext>
  );
};
