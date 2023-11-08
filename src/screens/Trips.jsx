import React, {useState, useCallback, memo} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Input from '../components/Input';
import Modal from '../components/Modal';
import {useTheme} from '../hooks';
import {
  customerData,
  expenseData,
  paymentModeData,
  paymentProviderData,
  getSummary,
  modifiedTransactions,
  getCurrentTimeAndDate,
} from './constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  transactionContainer: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 10,
    elevation: 5,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  transactionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  transactionDetail: {
    fontSize: 12,
    color: '#757575',
    marginVertical: 5,
  },
  transactionType: {
    fontSize: 12,
    fontWeight: '500',
    color: '#007bff',
    backgroundColor: '#e7f0fd',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 4,
  },
  transactionSubDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  entryByLabel: {
    fontSize: 12,
    color: '#757575',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 8,
  },
  summaryContainer: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 10,
    elevation: 5,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalIn: {
    color: '#4CAF50',
  },
  totalOut: {
    color: '#F44336',
  },
  viewReportsButton: {
    backgroundColor: 'transparent',
    padding: 10,
    alignItems: 'center',
  },
  viewReportsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  cashInButton: {
    backgroundColor: '#4CAF50',
  },
  cashOutButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

const TransactionEntry = memo(
  ({
    title,
    amount,
    balance,
    time,
    type,
    paymentMode,
    paymentProvider,
    date,
    comment,
  }) => {
    return (
      <View style={styles.transactionContainer}>
        <View style={styles.transactionHeader}>
          <Text style={styles.transactionTitle}>{title}</Text>
          <Text
            style={[
              styles.transactionAmount,
              type === 'CashIn' ? styles.totalIn : styles.totalOut,
            ]}>
            ₹ {amount}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.transactionDetails}>
          <Text style={[styles.transactionDetail]}>{date}</Text>
          <Text
            style={[
              styles.transactionDetail,
              {color: '#007bff'},
              balance < 0 && styles.totalOut,
            ]}>
            Balance: ₹ {balance}
          </Text>
        </View>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionType}>{paymentMode}</Text>
          {!!paymentProvider && (
            <Text style={styles.transactionType}>{paymentProvider}</Text>
          )}
        </View>
        <Text style={styles.transactionDetail}>{comment}</Text>
        <View style={styles.divider} />
        <View style={styles.transactionSubDetails}>
          <Text style={styles.entryByLabel}>
            Entry by :{' '}
            <Text style={{color: '#007bff', fontWeight: 'bold'}}>You</Text>
          </Text>
          <Text style={[styles.entryByLabel, {fontWeight: 'bold'}]}>
            {time}
          </Text>
        </View>
      </View>
    );
  },
);

const BalanceSummary = memo(({netBalance, totalIn, totalOut}) => {
  return (
    <View style={styles.summaryContainer}>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Net Balance</Text>
        <Text style={[styles.summaryValue, {color: '#007bff'}]}>
          ₹ {netBalance}
        </Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Total In (+)</Text>
        <Text style={[styles.summaryValue, styles.totalIn]}>₹ {totalIn}</Text>
      </View>

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Total Out (-)</Text>
        <Text style={[styles.summaryValue, styles.totalOut]}>₹ {totalOut}</Text>
      </View>
      {/* <View style={styles.divider} />
    <TouchableOpacity
      style={[styles.viewReportsButton, {alignItems: 'center'}]}>
      <Text style={styles.viewReportsText}>VIEW REPORTS </Text>
    </TouchableOpacity> */}
    </View>
  );
});

const Button = memo(({title, onPress, style}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
));

const DropdownContent = memo(
  ({
    data,
    value,
    setValue,
    style,
    placeholder = '',
    searchPlaceholder = '',
  }) => {
    const [isFocus, setIsFocus] = useState(false);
    const DropdownChangeHandler = (value, setter) => {
      setter(value);
      setIsFocus(false);
    };

    return (
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}, style]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search={!!searchPlaceholder}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : '...'}
        searchPlaceholder={searchPlaceholder}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => DropdownChangeHandler(item.value, setValue)}
      />
    );
  },
);

const ModalContent = ({type, onChange, showModal, setModal, handleSave}) => {
  const [amount, setAmount] = useState('');
  const [customer, setCustomer] = useState(null);
  const [expense, setExpense] = useState(null);
  const [paymentMode, setPaymentMode] = useState(null);
  const [paymentProvider, setPaymentProvider] = useState(null);
  const [comment, setComment] = useState('');

  const {sizes} = useTheme();

  const onSave = () => {
    handleSave({
      amount: +amount,
      title:
        type === 'Cash In'
          ? customerData.find(cst => cst.value === customer).label
          : expense,
      paymentMode,
      paymentProvider,
      comment,
      type: type.replace(' ', ''),
      ...getCurrentTimeAndDate(),
    });
    setModal(false); // Close the modal after saving
  };

  return (
    <Modal
      visible={showModal}
      onRequestClose={() => setModal(false)}
      title={`Add ${type} Entry`}>
      <View style={styles.container}>
        <View style={[styles.summaryContainer, {margin: 0, flex: 1}]}>
          <Input
            placeholder="Amount"
            value={amount}
            onChangeText={setAmount}
            marginBottom={sizes.sm}
          />
          {type === 'Cash In' && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: sizes.sm,
              }}>
              <DropdownContent
                data={customerData}
                value={customer}
                setValue={setCustomer}
                style={{width: '80%'}}
                placeholder="Select Customer"
                searchPlaceholder="Search Customer"
              />
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.cashInButton,
                  {
                    paddingHorizontal: 20,
                    paddingVertical: 13,
                    backgroundColor: '#007bff',
                  },
                ]}
                // onPress={() => setShowCustomerModal(true)}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          )}

          {type === 'Cash Out' && (
            <DropdownContent
              data={expenseData}
              value={expense}
              setValue={setExpense}
              style={{marginBottom: sizes.sm}}
              placeholder="Select Expense"
            />
          )}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: sizes.sm,
            }}>
            <DropdownContent
              style={[
                styles.dropdown,
                {width: paymentMode === 'Online' ? '49%' : '100%'},
              ]}
              data={paymentModeData}
              value={paymentMode}
              setValue={setPaymentMode}
              placeholder="Select Payment Mode"
            />
            {paymentMode === 'Online' && (
              <DropdownContent
                style={[styles.dropdown, {width: '49%'}]}
                data={paymentProviderData}
                placeholder="Select Channel"
                value={paymentProvider}
                setValue={setPaymentProvider}
              />
            )}
          </View>
          <Input
            placeholder="Comment"
            value={comment}
            onChangeText={setComment}
            marginBottom={sizes.sm}
          />
        </View>
        <View style={[styles.buttonContainer, {}]}>
          <Button title="SAVE" onPress={onSave} style={styles.cashInButton} />
          <Button
            title="CANCEL"
            onPress={() => setModal(false)}
            style={styles.cashOutButton}
          />
        </View>
      </View>
    </Modal>
  );
};

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
          <TransactionEntry key={index} {...transaction} />
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          title="+ CASH IN"
          onPress={() => {
            setModalData({type: 'Cash In', data: customerData});
            setModal(true);
          }}
          style={styles.cashInButton}
        />
        <Button
          title="- CASH OUT"
          onPress={() => {
            setModalData({type: 'Cash Out', data: expenseData});
            setModal(true);
          }}
          style={styles.cashOutButton}
        />
      </View>
      {showModal && (
        <ModalContent
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
