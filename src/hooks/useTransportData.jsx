import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  customerData,
  expenseData,
  paymentModeData,
  paymentProviderData
} from './constants';
import { useFirestore } from './useFireStore';
export const TDataContext = createContext();
export const TDataProvider = ({children}) => {
  const [paymentModes, setPaymentModes] = useState([]);
  const [paymentProviders, setPaymentProviders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [users, setUsers] = useState([]);
  const [summary, setSummary] = useState({});
  const [transactions, setTransactions] = useState([]);
  const {
    fetchAndCreateBalanceSummary,
    listenToCustomers,
    listenToTransactions,
    subscribeToBalanceSummary,
  } = useFirestore();

  useEffect(() => {
    // Fetch initial data
    fetchAndCreateBalanceSummary(setSummary);
    // Simulating setting initial data
    setPaymentModes(paymentModeData);
    setPaymentProviders(paymentProviderData);
    // setCustomers(customerData);
    setExpenses(expenseData);
    // You would have your own logic to set users and transactions
    // Subscribe to customers
    const customersUnsub = listenToCustomers(setCustomers, onError);
    // Subscribe to transactions
    const transactionsUnsub = listenToTransactions(setTransactions, onError);
    // Subscribe to balance summary updates
    const balanceUnsub = subscribeToBalanceSummary(setSummary);

    // Cleanup subscriptions on component unmount
    return () => {
      customersUnsub();
      transactionsUnsub();
      balanceUnsub();
    };
  }, []);

  // useEffect(() => {
  //   const subscriber = firestore()
  //     .collection('BalanceSummary')
  //     .doc(UNIQUE_BALANCE_SUMMARY_ID)
  //     .onSnapshot(documentSnapshot => {
  //       if (documentSnapshot.data()) {
  //         setSummary(documentSnapshot.data());
  //       }
  //     });
  //   return () => subscriber();
  // }, [UNIQUE_BALANCE_SUMMARY_ID]);

  // useEffect(() => {
  //   if (transactions.length > 0) {
  //     setSummary(prev => ({...prev, ...getSummary(transactions,prev.netBalance)}));
  //   }
  // }, [transactions]);

  const onError = () => {};

  // const onTransactionsResult = querySnapshot => {
  //   let transactionsArr = [];
  //   querySnapshot.forEach(documentSnapshot => {
  //     transactionsArr.push({
  //       id: documentSnapshot.id,
  //       ...documentSnapshot.data(),
  //     });
  //   });
  //   setTransactions(transactionsArr);
  //   console.log(transactionsArr);
  // };

  // const fetchAndCreateBalanceSummary = async t => {
  //   const BalanceRef = firestore()
  //     .collection('BalanceSummary')
  //     .doc(UNIQUE_BALANCE_SUMMARY_ID);
  //   try {
  //     const fetchedBalance = await BalanceRef.get();
  //     if (!fetchedBalance.exists) {
  //       await BalanceRef.set({
  //         netBalance: 0,
  //         totalIn: 0,
  //         totalOut: 0,
  //         createdAt: Date.now(),
  //         updatedAt: Date.now(),
  //       });
  //       console.log('Balance added!');
  //     } else {
  //       console.log('Balance added22', fetchedBalance.data());
  //       setSummary(fetchedBalance.data());
  //     }
  //   } catch (error) {
  //     console.error(
  //       'An error occurred while fetching or creating the Balance:',
  //       error,
  //     );
  //   }
  // };

  return (
    <TDataContext.Provider
      value={{
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
        setTransactions,
        summary,
      }}>
      {children}
    </TDataContext.Provider>
  );
};

export const useTData = () => {
  const context = useContext(TDataContext);
  if (!context) {
    throw new Error('useTData must be used within a TDataProvider');
  }
  return context;
};
