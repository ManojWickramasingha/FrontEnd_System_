import React, { useState } from 'react';

const Transaction = () => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [transaction, setTransaction] = useState([]);
    const [editId, setEditId] = useState(null);

    const addTransaction = (e) => {
        e.preventDefault();

        if (editId) {
            const newTransaction = transaction.map((t) =>
                t.id === editId ? { id: editId, description, amount } : t
            );
            setTransaction(newTransaction);
            setEditId(null);
        } else {
            setTransaction([...transaction, { id: Date.now(), description, amount }]);
        }

        setDescription('');
        setAmount('');
    };

    const handleEdit = (t) => {
        setEditId(t.id);
        setDescription(t.description);
        setAmount(t.amount);
    };

    const handleDelete = (id) => {
        setTransaction(transaction.filter((t) => t.id !== id));
    };

    return (
        <div className='pageTemplate2'>
            <div className='bg-gray-200 min-h-screen'>
                <h1 className='text-3xl font-bold text-center pt-12'>Expense Tracker</h1>
                <div className='container mt-20 mt-auto px-5'>
                    <div className='p-5 bg-white rounded-lg shadow-lg'>
                        <h2 className='text-2xl font-bold text-center mb-5'>Transaction</h2>
                        <table className='w-full table-fixed flex flex-col items-between text-left'>
                            <thead>
                                <tr className='flex w-full justify-between'>
                                    <th className='text-xl font-bold w-full md:w-1/4 px-2 py-2'>Description</th>
                                    <th className='text-xl font-bold w-full md:w-1/4 px-2 py-2'>Amount</th>
                                    <th className='text-xl font-bold w-full md:w-1/4 px-2 py-2'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transaction.map((t) => (
                                    <tr key={t.id} className='flex w-full justify-between'>
                                        <td className='py-2 px-2 w-full md:w-1/4'>{t.description}</td>
                                        <td className='py-2 px-2 w-full md:w-1/4'>{t.amount}</td>
                                        <td className='py-2 px-2 w-full md:w-1/4'>
                                            <button className='bg-green-500 px-4 py-2 text-white mr-2' onClick={() => handleEdit(t)}>Edit</button>
                                            <button className='bg-red-500 px-4 py-2 text-white' onClick={() => handleDelete(t.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='mt-16 mb-4 lg:w-1/2 xl:w-1/3 p-5 mx-auto rounded shadow-lg border'>
                            <h1 className='text-xl font-bold text-center mb-5'>Add Your Transaction</h1>
                            <form onSubmit={addTransaction} className='flex text-center flex-col mx-auto border-double border-indigo-50'>
                               
                            <input
                                    type="date"
                                    className='border border-slate-300 rounded-md w-full px-2 py-2 mb-2'

                                    placeholder=" "
                                    />

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
                                <button className='bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none text-white px-4 py-2 rounded-md'>{editId ? 'Update Transaction' : 'Add Transaction'}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transaction;
