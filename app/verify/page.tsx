'use client';

import { useState } from 'react';
import { verifyPaymentAddress } from '../utils/paymentAddresses';

export default function VerifyPage() {
  const [address, setAddress] = useState('');
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean;
    message: string;
    details: {
      amount: number;
      productName: string;
      timestamp: Date;
    } | null;
  } | null>(null);

  const handleVerify = () => {
    const result = verifyPaymentAddress(address);
    setVerificationResult(result);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Verify Payment Address
          </h1>

          <div className="space-y-4">
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Enter Payment Address
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter the payment address to verify"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={handleVerify}
                  className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Verify
                </button>
              </div>
            </div>

            {verificationResult && (
              <div
                className={`mt-4 p-4 rounded-md ${
                  verificationResult.isValid
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    {verificationResult.isValid ? (
                      <svg
                        className="h-5 w-5 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-red-400"
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
                    )}
                  </div>
                  <div className="ml-3">
                    <h3
                      className={`text-sm font-medium ${
                        verificationResult.isValid ? 'text-green-800' : 'text-red-800'
                      }`}
                    >
                      {verificationResult.message}
                    </h3>
                    {verificationResult.isValid && verificationResult.details && (
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Amount: ${verificationResult.details.amount}</p>
                        <p>Product: {verificationResult.details.productName}</p>
                        <p>
                          Generated:{' '}
                          {new Date(verificationResult.details.timestamp).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
