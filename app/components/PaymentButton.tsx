import React, { useState } from 'react';
import { useSolana } from '../context/SolanaProvider';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';

interface PaymentButtonProps {
  amount: number; // Amount in USD
  recipientAddress: string; // Solana wallet address to receive payment
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  amount,
  recipientAddress,
  onSuccess,
  onError
}) => {
  const { rpc, connected, connect, publicKey } = useSolana();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!rpc || !publicKey) return;
    
    setLoading(true);
    try {
      // Convert USD to SOL (this is a simplified conversion)
      const solAmount = amount / 30; // Assuming 1 SOL = $30 USD
      const lamports = solAmount * LAMPORTS_PER_SOL;

      // Create a transaction
      const recipient = new PublicKey(recipientAddress);
      
      const { signature } = await rpc.transfer({
        amount: lamports,
        to: recipient,
        from: publicKey
      });
      
      // Wait for confirmation
      const status = await rpc.confirmTransaction(signature);
      
      if (status.value?.err) {
        throw new Error('Transaction failed');
      }

      onSuccess?.();
    } catch (error) {
      console.error('Payment failed:', error);
      onError?.(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    if (!connected) {
      connect();
    } else {
      handlePayment();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
    >
      <div className="flex items-center justify-center space-x-2">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        <span>{loading ? 'Processing...' : connected ? 'Pay with SOL' : 'Connect Wallet'}</span>
      </div>
    </button>
  );
};

export default PaymentButton;
