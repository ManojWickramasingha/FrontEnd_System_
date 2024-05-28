import React, { useState } from 'react';

const Transaction = () => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [transaction, setTransaction] = useState([]);

    const addTransaction = (e) => {
        e.preventDefault();
        setTransaction([...transaction, { id: Date.now(), description, amount }]);
        setDescription('');
        setAmount('');
    };

    return (
        <div className='pageTemplate2'>
            <div className='bg-gray-200 min-n-screen'>
                <h1 className='text-3xl font-bold text-center pt-12'>Expense Tracker</h1>
                <div className='container mt-auto px-5'>
                    <div className='p-5 bg-white rounded-lg shadow-lg'>
                        <div className='mt-16 mb-4 lg:w-1/2 xl:w-1/3 p-5 mx-auto rounded shadow-lg border'>
                       
                            <h1 className='text-xl font-bold text-center mb-5'>Add Your Transaction</h1>
                            <form onSubmit={addTransaction} className='flex text-center flex-col mx-auto border-double border-indigo-50'>
                                <input 
                                    type='text'
                                    className='border border-slate-300 rounded-md w-full px-2 py-2 mb-2'
                                    placeholder='Description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <input 
                                    type='number'
                                    className='border border-slate-300 rounded-md w-full px-2 py-2 mb-2'
                                    placeholder='Amount'
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                                <button className='bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none text-white px-4 py-2 rounded-md'>Add Transaction</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transaction;
