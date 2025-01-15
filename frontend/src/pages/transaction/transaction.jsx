import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Transaction = () => {
    const { state } = useLocation();
    const { accountNumber, password } = state || {};
    const [transactionData, setTransactionData] = useState(null);

    useEffect(() => {
        if (!accountNumber || !password) {
            console.error('Account number or password not provided.');
            return;
        }

        const fetchTransactionData = async () => {
            try {
                const response = await fetch('http://localhost:8000/bank/transaction', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ accountNumber, password }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch transaction data');
                }

                const data = await response.json();
                setTransactionData(data);
            } catch (error) {
                console.error('Error fetching transaction data:', error);
            }
        };

        fetchTransactionData();
    }, [accountNumber, password]);

    if (!transactionData) {
        return <h2 style={{ textAlign: 'center' }}>Loading transaction data...</h2>;
    }

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ marginBottom: '20px' }}>
                <h3 className="text-lg font-bold text-slate-800">Transaction Overview</h3>
                <p className="text-slate-500">Details of your debits and credits.</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
                    <div className="flex justify-between border-gray-200 border-b dark:border-gray-700 pb-3">
                        <dl>
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Current Balance</dt>
                            <dd className="leading-none text-3xl font-bold text-gray-900 dark:text-white">${transactionData.currentBalance}</dd>
                        </dl>
                    </div>
                    <div className="grid grid-cols-2 py-3">
                        <dl>
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Total Credit</dt>
                            <dd className="leading-none text-xl font-bold text-green-500 dark:text-green-400">${transactionData.totalCredit}</dd>
                        </dl>
                        <dl>
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Total Debit</dt>
                            <dd className="leading-none text-xl font-bold text-red-600 dark:text-red-500">-${transactionData.totalDebit}</dd>
                        </dl>
                    </div>
                </div>
            </div>

            <h3>Credits</h3>
            <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '80%' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Transaction ID</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>To Account</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Amount</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transactionData.credits.map((credit) => (
                        <tr key={credit._id}>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{credit._id}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{credit.toAccountNumber}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{credit.amount}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{credit.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Debits</h3>
            <table style={{ margin: '20px auto', borderCollapse: 'collapse', width: '80%' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Transaction ID</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>From Account</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Amount</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transactionData.debits.map((debit) => (
                        <tr key={debit._id}>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{debit._id}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{debit.fromAccountNumber}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{debit.amount}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{debit.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Transaction;
