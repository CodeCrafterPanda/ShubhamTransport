import React, { createContext, useState, useEffect, useContext } from 'react';
import {paymentModeData,paymentProviderData,customerData,expenseData} from './constants'
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [paymentModes, setPaymentModes] = useState([]);
  const [paymentProviders, setPaymentProviders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch initial data here and populate the states
    // For example, this could be fetching from an API or local storage

    // Simulating setting initial data
    setPaymentModes(paymentModeData);
    setPaymentProviders(paymentProviderData);
    setCustomers(customerData);
    setExpenses(expenseData);
    // You would have your own logic to set users and transactions
  }, []);

  return (
    <DataContext.Provider value={{
      paymentModes,
      setPaymentModes,
      paymentProviders,
      setPaymentProviders,
      customers,
      setCustomers,
      expenses,
      setExpenses,
      users,
      setUsers,
      transactions,
      setTransactions
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
