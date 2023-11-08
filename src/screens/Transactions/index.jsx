import React, {useState, useCallback, memo} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

import {Input, Modal} from '../../components';

import {useTheme} from '../../hooks';
import {
  customerData,
  expenseData,
  paymentModeData,
  paymentProviderData,
  getSummary,
  modifiedTransactions,
  getCurrentTimeAndDate,
} from '../constants';
import {styles} from './index.styles';
import BalanceSummary from './BalanceSummary';
import TransactionButton from './TransactionButton';
import CashInOutModal from './CashInOutModal';
import Transaction from './Transaction';


const App = () => {
  const [allTransactions, setAllTransactions] = useState(modifiedTransactions);
  const [showModal, setModal] = useState(false);
  const [modalData, setModalData] = useState({
    type: 'Cash In',
  });

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
            setModalData({type: 'Cash In', data: customerData});
            setModal(true);
          }}
          style={styles.cashInButton}
        />
        <TransactionButton
          title="- CASH OUT"
          onPress={() => {
            setModalData({type: 'Cash Out', data: expenseData});
            setModal(true);
          }}
          style={styles.cashOutButton}
        />
      </View>
      {showModal && (
        <CashInOutModal
          type={modalData.type}
          onChange={setAllTransactions}
          showModal={showModal}
          setModal={setModal}
          handleSave={
            modalData.type === 'Cash In' ? handleCashIn : handleCashOut
          }
        />
      )}
    </View>
  );
};

export default App;
