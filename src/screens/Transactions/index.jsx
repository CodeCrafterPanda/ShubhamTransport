import React, {useCallback, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {UNIQUE_BALANCE_SUMMARY_ID} from '../../hooks/constants';
import BalanceSummary from './BalanceSummary';
import CashInOutModal from './CashInOutModal';
import Transaction from './Transaction';
import TransactionButton from './TransactionButton';
import {styles} from './index.styles';
import {useTData, useAuth} from '../../hooks';
import firestore from '@react-native-firebase/firestore';
import { useFirestore } from '../../hooks';

const App = () => {
  const [showModal, setModal] = useState(false);
  const [modalType, setModalType] = useState('Cash In');
  const {user} = useAuth();
  const {addTransaction,
    updateBalanceSummary,} = useFirestore()
  const {transactions, setTransactions, summary} = useTData();

  const {netBalance, totalIn, totalOut} = summary;

  const handleCashIn = useCallback(
    async transactionData => {
      // Added async keyword here
      try {
        let tBalance = netBalance;
        let tTotalIn = totalIn;
        if (transactionData.paymentMode !== 'Pending') {
          tBalance += transactionData.amount;
          tTotalIn += transactionData.amount;
        }
        transactionData.balance = tBalance;
        // Assuming saveTransaction is an async function that saves the transaction
        await addTransaction(transactionData); // Await for async operation to complete
        await updateBalanceSummary({
          ...summary,
          totalIn: tTotalIn,
          netBalance: tBalance,
        });
        // setTransactions(prev => [transactionData, ...prev]);
        setModal(false);
      } catch (error) {
        console.error('Failed to process transaction', error);
      }
    },
    [netBalance, totalIn], // Dependencies for useCallback
  );

  const handleCashOut = useCallback(
    async transactionData => {
      // Added async keyword here
      try {
        let tBalance = netBalance;
        let tTotalOut = totalOut;
        if (transactionData.paymentMode !== 'Pending') {
          tBalance -= transactionData.amount;
          tTotalOut -= transactionData.amount;
        }
        transactionData.balance = tBalance;
        // Assuming recordTransaction is an async function that records the transaction
        await addTransaction(transactionData); // Await for async operation to complete
        updateBalanceSummary({
          ...summary,
          totalOut: tTotalOut,
          netBalance: tBalance,
        });
        // setTransactions(prev => [transactionData, ...prev]);
        setModal(false);
      } catch (error) {
        console.error('Failed to handle cash out', error);
      }
    },
    [netBalance, totalOut], // Dependencies for useCallback
  );

  const handleTransaction = useCallback(
    async (transactionData, isCashIn) => {
      try {
        let { netBalance, totalIn, totalOut } = summary;

        const amount = transactionData.amount;
        const isPending = transactionData.paymentMode === 'Pending';

        netBalance += isCashIn ? (isPending ? 0 : amount) : (isPending ? 0 : -amount);
        totalIn += isCashIn && !isPending ? amount : 0;
        totalOut += !isCashIn && !isPending ? amount : 0;

        transactionData.balance = netBalance;

        await addTransaction(transactionData);
        await updateBalanceSummary({
          netBalance,
          totalIn,
          totalOut,
          updatedAt: Date.now(),
        });

        setModal(false);
      } catch (error) {
        console.error('Failed to handle transaction', error);
      }
    },
    [summary],
  );

  return (
    <View style={styles.container}>
      <BalanceSummary />
      <ScrollView>
        {transactions.map((transaction, index) => (
          <Transaction key={index} {...transaction} />
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TransactionButton
          title="+ CASH IN"
          onPress={() => {
            setModalType('Cash In');
            setModal(true);
          }}
          style={styles.cashInButton}
        />
        <TransactionButton
          title="- CASH OUT"
          onPress={() => {
            setModalType('Cash Out');
            setModal(true);
          }}
          style={styles.cashOutButton}
        />
      </View>
      {showModal && (
        <CashInOutModal
          type={modalType}
          showModal={showModal}
          setModal={setModal}
          handleSave={handleTransaction}
        />
      )}
    </View>
  );
};

export default App;
