import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Transaction = () => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    const addTransaction = async (e) => {
        e.preventDefault();

        // Validation
        const validationErrors = {};
        if (!description.trim()) {
            validationErrors.description = 'Description is required';
        }
        if (!amount || isNaN(amount) || parseFloat(amount) === 0) {
            validationErrors.amount = 'Amount must be a number and not zero';
        }
        if (!date) {
            validationErrors.date = 'Date is required';
        } else if (new Date(date) > new Date()) {
            validationErrors.date = 'Date cannot be in the future';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (editId) {
            const updatedTransactions = transactions.map((t) =>
                t.id === editId ? { id: editId, description, amount: parseFloat(amount), date } : t
            );
            setTransactions(updatedTransactions);
            setEditId(null);
        } else {
            const newTransaction = { id: Date.now(), description, amount: parseFloat(amount), date };
            setTransactions([...transactions, newTransaction]);
            await addTransactionToAPI(newTransaction);
        }

        setDescription('');
        setAmount('');
        setDate('');
        setErrors({});
    };

    const addTransactionToAPI = async (transaction) => {
        try {
            await axios.post("https://localhost:7026/api/Transaction", {
                amount: transaction.amount,
                description: transaction.description,
                date: transaction.date
            });
        } catch (error) {
            console.error("There was an error adding the transaction!", error);
        }
    };

    const getList = async () => {
        try {
            const response = await axios.get("https://localhost:7026/api/Transaction");
            setTransactions(response.data);
        } catch (error) {
            console.error("There was an error fetching the transactions!", error);
        }
    };

    const handleEdit = (transaction) => {
        setEditId(transaction.id);
        setDescription(transaction.description);
        setAmount(transaction.amount);
        setDate(transaction.date);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:7026/api/Transaction/${id}`);
            setTransactions(transactions.filter((t) => t.id !== id));
        } catch (error) {
            console.error("There was an error deleting the transaction!", error);
        }
    };

    const getIncome = () => {
    };

    const getExpenses = () => {
    };

    const getTotalAmount = () => {
    };

    useEffect(() => {
        getList();
    }, []);

    return (
        <div className=''>
            <div className='bg-white-200 '>
                <h1 className='text-6xl font-bold text-center pt-6 text-green-500'>Transaction</h1>
                <div className='container mt-10 mt-auto px-5'>
                    <div className='p-2 bg-white rounded-lg shadow-lg'>
                        <div className='flex columns-2'>
                            <table className='w-full table-fixed flex flex-col items-between text-left'>
                                <thead>
                                    <tr>
                                        <th className='text-xl font-bold w-full md:w-1/4 px-2 py-2'>Description</th>
                                        <th className='text-xl font-bold w-full md:w-1/4 px-2 py-2'>Amount</th>
                                        <th className='text-xl font-bold w-full md:w-1/4 px-2 py-2'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((t) => (
                                        <tr key={t.id}>
                                            <td className='w-full md:w-1/4 px-2 py-2'>{t.description}</td>
                                            <td className={`w-full md:w-1/4 px-2 py-2 ${t.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>{t.amount}</td>
                                            <td className='w-full md:w-1/4 px-2 py-4'>
                                                <div>
                                                    <button className='bg-green-500 px-2 rounded-lg py-2 text-white mr-1' onClick={() => handleEdit(t)}>Edit</button>
                                                    <button className='bg-red-500 px-2 rounded-lg py-2 text-white' onClick={() => handleDelete(t.id)}>Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className='justify-end flex flex-col bg-white p-4 rounded shadow-lg'>
                                <div className='mt-4 text-xl font-bold flex'>
                                    Income: <span className='text-green-500'>{getIncome()}</span>
                                </div>
                                <div className='mt-4 text-xl font-bold flex'>
                                    Expense: <span className='text-red-500'>{getExpenses()}</span>
                                </div>
                                <div className='mt-4 text-xl font-bold'>
                                    Total: <span className={getTotalAmount() < 0 ? 'text-red-500' : 'text-green-500'}>{getTotalAmount()}</span>
                                </div>
                            </div>
                        </div>
                        <div className='mt-16 mb-4 lg:w-1/2 xl:w-1/3 p-5 mx-auto rounded shadow-lg border'>
                            <h1 className='text-xl font-bold text-center mb-5'>Add Your Transaction</h1>
                            <form onSubmit={addTransaction} className='flex text-center flex-col mx-auto border-double border-indigo-50'>
                                <input
                                    type="date"
                                    className='border border-slate-300 rounded-md w-full px-2 py-2 mb-2'
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                                {errors.date && <span className='text-red-500'>{errors.date}</span>}
                                <input
                                    type='text'
                                    className='border border-slate-300 rounded-md w-full px-2 py-2 mb-2'
                                    placeholder='Description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                {errors.description && <span className='text-red-500'>{errors.description}</span>}
                                <input
                                    type='number'
                                    className='border border-slate-300 rounded-md w-full px-2 py-2 mb-2'
                                    placeholder='Amount'
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                                {errors.amount && <span className='text-red-500'>{errors.amount}</span>}
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
