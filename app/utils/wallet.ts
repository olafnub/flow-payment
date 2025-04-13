import { Keypair } from '@solana/web3.js';

export const generateWalletAddress = () => {
  // Generate a new Solana keypair
  const keypair = Keypair.generate();
  return {
    publicKey: keypair.publicKey.toString(),
    secretKey: keypair.secretKey // In a real app, you'd want to securely store this
  };
};

export const shortenAddress = (address: string) => {
  if (!address) return '';
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};
