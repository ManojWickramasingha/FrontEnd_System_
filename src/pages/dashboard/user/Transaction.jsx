import React, { useState } from 'react';

const Transaction = () => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [editId, setEditId] = useState(null);

    const addTransaction = (e) => {
        e.preventDefault();

        if (editId) {
            const newTransaction = transactions.map((t) =>
                t.id === editId ? { id: editId, description, amount: parseFloat(amount) } : t
            );
            setTransactions(newTransaction);
            setEditId(null);
        } else {
            setTransactions([...transactions, { id: Date.now(), description, amount: parseFloat(amount) }]);
        }

        setDescription('');
        setAmount('');
    };

    const handleEdit = (transaction) => {
        setEditId(transaction.id);
        setDescription(transaction.description);
        setAmount(transaction.amount);
    };

    const handleDelete = (id) => {
        setTransactions(transactions.filter((t) => t.id !== id));
    };

    const getIncome = () => {
        return transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
    };

    const getExpenses = () => {
        return transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0);
    };

    const getTotalAmount = () => {
        return transactions.reduce((total, t) => total + t.amount, 0);
    };

    return (
        <div className='pageTemplate2'>
            <div className='bg-white-200 min-h-screen'>
                <h1 className='text-6xl font-bold  text-center pt-6  text-green-500'>Transaction</h1>
                <div className='container mt-20 mt-auto px-5'>
                    <div className='p-5 bg-white rounded-lg shadow-lg'>
                        <div className='flex columns-1 '>
                         <table className='w-full table-fixed flex flex-col  items-between text-left'>
                            <thead > 
                                <tr className=' '>
                                    <th className='text-xl font-bold w-full md:w-1/4 px-2 py-2'>Description</th>
                                    <th className='text-xl font-bold w-full md:w-1/4 mr-6    px-2 py-2'>Amount</th>
                                    <th className='text-xl font-bold w-full md:w-1/4 px-2 py-2 '>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((t) => (
                                    <tr key={t.id} >
                                        <td className='w-full md:w-1/4 px-2 py-2'>{t.description}</td>
                                        <td className={`w-full md:w-1/4 px-2 py-2 ${t.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>{t.amount}</td>
                                        <td className='w-full md:w-1/4 px-2 py-4'>
                                            <div className=''>
                                            <button className='bg-green-500 px-2  rounded-lg py-2 text-white mr-1' onClick={() => handleEdit(t)}>Edit</button>
                                            <button className='bg-red-500 px-2 rounded-lg py-2 text-white' onClick={() => handleDelete(t.id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                         </table>
                         <table className=' table-fixed flex flex-col items-between text-left'>
                         <thead >
                           
                         <div className='justify-end flex flex-col bg-white p-4 rounded shadow-lg '>
                                <div className='mt-4 text-xl font-bold mr-48 flex '>
                                    Income: <span className='text-green-500 '>{getIncome()}</span>
                                </div>
                                <div className='mt-4 text-xl font-bold mr-48 flex'>
                                    Expense: <span className='text-red-500 '>{getExpenses()}</span>
                                </div>
                                <div className='mt-4 text-xl font-bold  mr-48'>
                                    Total: <span className={getTotalAmount() < 0 ? 'text-red-500' : 'text-green-500'}>{getTotalAmount()}</span>
                                </div>
                                </div>

                         </thead>
                         </table>
                        </div>
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
