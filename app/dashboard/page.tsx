'use client';

import { useState, useEffect } from 'react';
import { generateMockTransactions, calculateTotalRevenue, getRecentTransactions, type Transaction } from '../utils/transactions';
import { format } from 'date-fns';
import { shortenAddress } from '../utils/wallet';

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Todo: fetch from backend
    setTransactions(generateMockTransactions(3));
  }, []);

  const totalRevenue = calculateTotalRevenue(transactions);
  const recentTransactions = getRecentTransactions(transactions, 7);
  const completedTransactions = transactions.filter(tx => tx.status === 'completed');
  const averageAmount = completedTransactions.length > 0
    ? completedTransactions.reduce((sum, tx) => sum + tx.amount, 0) / completedTransactions.length
    : 0;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">Business Dashboard</h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-500">Total Revenue</h3>
            <p className="text-3xl font-bold text-gray-900">${0}</p> {/* fix later */}
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-500">Average Transaction</h3>
            <p className="text-3xl font-bold text-gray-900">${0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-500">Total Transactions</h3>
            <p className="text-3xl font-bold text-gray-900">{transactions.length}</p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    From Wallet
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {tx.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {shortenAddress(tx.fromWallet)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${tx.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {tx.productName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(tx.timestamp, 'MMM d, yyyy HH:mm')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${tx.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                          ${tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                          ${tx.status === 'failed' ? 'bg-red-100 text-red-800' : ''}`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
