import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteTransaction, editTransaction } from '../firebase/Transaction';
import { listTransactions } from '../firebase/getTransactions';

// Assuming transactions will be passed as a prop
const TransactionForm = () => {
  const { id } = useParams(); // Retrieve the dynamic ID from the URL
  const transactionId = parseInt(id, 10);
  const [formData, setFormData] = useState({ title: '', amount: '' });
  const navigate = useNavigate();
  const [transactions, setTransactions]= useState([]);

  const AddDataToForm= (data)=>{
    if (data) {
        setFormData({
          title: data.title,
          amount: data.amount
        });
      }
  }
  console.log(formData)

  useEffect(() => {
    // Find the transaction based on the ID from the URL   
    listTransactions(setTransactions)   
    const transaction = transactions.find(transact => transact.id === transactionId);
   
    AddDataToForm(transaction)
   
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editTransaction(formData, transactionId); // Pass the updated data to the parent component
    navigate('/'); // Redirect to home after submission
  };

  const handledDelete = (e)=>{
    // e.preventDefault();
    // deleteTransaction(transactionId) 
    // console.log("deleted successfully")   
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");
  
  // Proceed if confirmed
  if (isConfirmed) {
    deleteTransaction(transactionId);
    console.log("Deleted successfully");
    navigate('/Dashboard');
  } else {
    console.log("Delete operation cancelled");
  }
  }

  return (
    <div>
        <h4>Transaction:<strong>{id}</strong></h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Description:
            <input
              type="text"
              name="title"              
              value={formData.title}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Amount:
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Update</button>        
        <input type="button" value="Delete" onClick={handledDelete}/>
      </form>
    </div>
  );
};

export default TransactionForm;
