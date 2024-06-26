import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import api from './api';
import './styles.css';
import { Container, TextField, MenuItem, Button, Typography, Box } from '@mui/material';

const PDFGeneration = () => {
    const [category, setCategory] = useState('year');
    const [startDate, setStartDate] = useState('');
    const [balance, setBalance] = useState(null);

    const fetchBalanceData = async () => {
        try {
            const response = await api.post('/transactions/balance', {
                category,
                startDate
            });
            setBalance(response.data);
        } catch (error) {
            console.error('Error fetching balance data:', error);
        }
    };

    const generatePDF = () => {
        const input = document.getElementById('pdfContent');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 10, 30);
            const date = new Date().toLocaleDateString();
            const time = new Date().toLocaleTimeString();
            pdf.text(`Downloaded on ${date} at ${time}`, 10, 20);
            pdf.save('balanceReport.pdf');
        });
    };

    return (
        <Container className="container">
            <Typography variant="h4" component="h1" gutterBottom>
                PDF Generation
            </Typography>
            <Box component="form" noValidate autoComplete="off">
                <TextField
                    select
                    label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    fullWidth
                    margin="normal"
                >
                    <MenuItem value="year">Year</MenuItem>
                    <MenuItem value="month">Month</MenuItem>
                    <MenuItem value="week">Week</MenuItem>
                    <MenuItem value="day">Day</MenuItem>
                </TextField>
                <TextField
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button variant="contained" color="primary" onClick={fetchBalanceData} fullWidth>
                    Fetch Balance
                </Button>
            </Box>
            {balance && (
                <Box id="pdfContent" mt={4}>
                    <Typography variant="h6">Balance Report</Typography>
                    <Typography>Total Income: {balance.totalIncome}</Typography>
                    <Typography>Total Expense: {balance.totalExpense}</Typography>
                    <Typography>Total Balance: {balance.totalBalance}</Typography>
                </Box>
            )}
            {balance && (
                <Button variant="contained" color="secondary" onClick={generatePDF} fullWidth sx={{ mt: 2 }}>
                    Download PDF
                </Button>
            )}
        </Container>
    );
};

export default PDFGeneration;
