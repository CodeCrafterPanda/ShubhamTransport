import React, {useCallback, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {getSummary, modifiedTransactions} from '../constants';
import BalanceSummary from './BalanceSummary';
import CashInOutModal from './CashInOutModal';
import Transaction from './Transaction';
import TransactionButton from './TransactionButton';
import {styles} from './index.styles';

const App = () => {
  const [allTransactions, setAllTransactions] = useState(modifiedTransactions);
  const [showModal, setModal] = useState(false);
  const [modalType, setModalType] = useState('Cash In');

  const handleCashIn = useCallback(transactionData => {
    setAllTransactions(prev => [transactionData, ...prev]);
    setModal(false);
  }, []);

  const handleCashOut = useCallback(transactionData => {
    setAllTransactions(prev => [transactionData, ...prev]);
    setModal(false);
  }, []);

  const summary = getSummary(allTransactions);

  return (
    <View style={styles.container}>
      <BalanceSummary
        netBalance={summary.netBalance}
        totalIn={summary.totalIn}
        totalOut={summary.totalOut}
      />
      <ScrollView>
        {allTransactions.map((transaction, index) => (
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
          onChange={setAllTransactions}
          showModal={showModal}
          setModal={setModal}
          handleSave={modalType === 'Cash In' ? handleCashIn : handleCashOut}
        />
      )}
    </View>
  );
};

export default App;
