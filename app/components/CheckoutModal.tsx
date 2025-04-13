import React, { useEffect, useState } from 'react';
// import { useSolana } from '../context/SolanaProvider';
import { generateWalletAddress, shortenAddress } from '../utils/wallet';
import { addPaymentAddress } from '../utils/paymentAddresses';

interface CheckoutModalProps {
  amount: number;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  amount,
  description,
  isOpen,
  onClose,
  onSuccess
}) => {
  const { connected, connect } = {connected: true, connect: async () => {}};
  const [merchantWallet, setMerchantWallet] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Generate a new merchant wallet address when the modal opens
      const { publicKey } = generateWalletAddress();
      setMerchantWallet(publicKey);
      // Register the payment address
      addPaymentAddress(publicKey, amount, description);
    }
  }, [isOpen, amount, description]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(merchantWallet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Checkout</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Amount</span>
              <span className="text-gray-900 font-medium">${amount.toFixed(2)}</span>
            </div>
            <div className="text-sm text-gray-500">{description}</div>
          </div>

          {/* Merchant Wallet Address */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="text-sm font-medium text-gray-700 mb-2">Send payment to:</div>
            <div className="flex items-center justify-between bg-white rounded border p-3">
              <div className="font-mono text-sm truncate">
                {shortenAddress(merchantWallet)}
              </div>
              <button
                onClick={copyToClipboard}
                className="ml-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Send exactly ${amount.toFixed(2)} worth of SOL to this address
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <div className="font-medium text-gray-900">Pay with Solana</div>
                <div className="text-sm text-gray-500">
                  {'Connect your wallet to pay'}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={connected ? onSuccess : connect}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
          >
            {connected ? 'Confirm Payment' : 'Connect Wallet'}
          </button>

          <div className="mt-4 text-center text-sm text-gray-500">
            Powered by Flow Payment • Terms • Privacy
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
