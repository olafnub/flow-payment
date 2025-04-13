import { PublicKey } from '@solana/web3.js';

export interface Transaction {
  id: string;
  fromWallet: string;
  amount: number;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
  productName: string;
}

// Mock data generator for demo purposes
export const generateMockTransactions = (count: number): Transaction[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `tx-${Math.random().toString(36).substr(2, 9)}`,
    fromWallet: new PublicKey(Uint8Array.from(Array(32).fill(0))).toString(),
    amount: Math.floor(Math.random() * 1000) + 50,
    timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), 
    // status: ['completed', 'pending', 'failed'][Math.floor(Math.random() * 3)] as Transaction['status'],
    status: ['completed', 'pending'][Math.floor(Math.random() * 2)] as Transaction['status'],
    productName: ['Nike Dunk Low', 'Air Jordan 1', 'Yeezy Boost'][Math.floor(Math.random() * 3)]
  }));
};

export const calculateTotalRevenue = (transactions: Transaction[]): number => {
  return transactions
    .filter(tx => tx.status === 'completed')
    .reduce((sum, tx) => sum + tx.amount, 0);
};

export const getRecentTransactions = (transactions: Transaction[], days: number): Transaction[] => {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return transactions.filter(tx => tx.timestamp > cutoff);
};
