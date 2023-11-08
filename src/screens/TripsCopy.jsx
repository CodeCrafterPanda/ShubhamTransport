import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {Input, Modal} from '../components';
import {useTheme} from '../hooks';
import {
  customerData,
  expenseData,
  getSummary,
  modifiedTransactions,
  paymentModeData,
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

const TransactionEntry = ({
  title,
  amount,
  balance,
  time,
  type,
  paymentMode,
  paymentProvider,
  date,
  comment,
}) => (
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
      <Text style={[styles.entryByLabel, {fontWeight: 'bold'}]}>{time}</Text>
    </View>
  </View>
);

const BalanceSummary = ({netBalance, totalIn, totalOut}) => (
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

const CashInModal = ({showModal, setModal, handleCashIn}) => {
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [customerValue, setCustomerValue] = useState(null);
  const [paymentModeValue, setPaymentModeValue] = useState(null);
  const [paymentProviderValue, setPaymentProviderValue] = useState(null);
  const [isCustomerFocus, setIsCustomerFocus] = useState(false);
  const [isPaymentProviderFocus, setIsPaymentProviderFocus] = useState(false);
  const [isPaymentModeFocus, setIsPaymentModeFocus] = useState(false);
  const {assets, colors, gradients, sizes} = useTheme();

  return (
    <>
      <Modal
        visible={showModal}
        onRequestClose={() => setModal(false)}
        title="Add Cash In Entry">
        <View style={[styles.container]}>
          <View style={[styles.summaryContainer, {margin: 0, flex: 1}]}>
            <Input placeholder="Amount" marginBottom={sizes.sm} />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: sizes.sm,
              }}>
              <Dropdown
                style={[
                  styles.dropdown,
                  {width: '80%'},
                  isCustomerFocus && {borderColor: 'blue'},
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={customerData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isCustomerFocus ? 'Select Customer' : '...'}
                searchPlaceholder="Search Customer..."
                value={customerValue}
                onFocus={() => setIsCustomerFocus(true)}
                onBlur={() => setIsCustomerFocus(false)}
                onChange={item => {
                  setCustomerValue(item.value);
                  setIsCustomerFocus(false);
                }}
                searchQuery={e => console.log(e)}
              />
              
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: sizes.sm,
              }}>
              <Dropdown
                style={[
                  styles.dropdown,
                  {width: paymentModeValue === 'Online' ? '49%' : '100%'},
                  isPaymentModeFocus && {borderColor: colors.primary},
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={paymentModeData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isPaymentModeFocus ? 'Payment Mode' : '...'}
                value={paymentModeValue}
                onFocus={() => setIsPaymentModeFocus(true)}
                onBlur={() => setIsPaymentModeFocus(false)}
                onChange={item => {
                  setPaymentModeValue(item.value);
                  setIsPaymentModeFocus(false);
                }}
              />
              {paymentModeValue === 'Online' && (
                <Dropdown
                  style={[
                    styles.dropdown,
                    {width: '49%'},
                    isPaymentProviderFocus && {borderColor: colors.primary},
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={paymentProviderData}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={
                    !isPaymentProviderFocus ? 'Select Channel' : '...'
                  }
                  value={paymentProviderValue}
                  onFocus={() => setIsPaymentProviderFocus(true)}
                  onBlur={() => setIsPaymentProviderFocus(false)}
                  onChange={item => {
                    setPaymentProviderValue(item.value);
                    setIsPaymentProviderFocus(false);
                  }}
                />
              )}
            </View>
            <Input placeholder="Comment" marginBottom={sizes.sm} />
          </View>
          <View style={[styles.buttonContainer, {}]}>
            <TouchableOpacity
              style={[styles.button, styles.cashInButton]}
              onPress={() => {
                handleCashIn();
                setModal(false);
              }}>
              <Text style={styles.buttonText}>SAVE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cashOutButton]}
              onPress={() => setModal(false)}>
              <Text style={styles.buttonText}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <CustomerModal
        showModal={showCustomerModal}
        setModal={setShowCustomerModal}
      />
    </>
  );
};

const CashOutModal = ({showModal, setModal, handleCashOut}) => {
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [expenseValue, setExpenseValue] = useState(null);
  const [paymentModeValue, setPaymentModeValue] = useState(null);
  const [paymentProviderValue, setPaymentProviderValue] = useState(null);
  const [isExpenseFocus, setIsExpenseFocus] = useState(false);
  const [isPaymentProviderFocus, setIsPaymentProviderFocus] = useState(false);
  const [isPaymentModeFocus, setIsPaymentModeFocus] = useState(false);
  const {assets, colors, gradients, sizes} = useTheme();

  return (
    <>
      <Modal
        visible={showModal}
        onRequestClose={() => setModal(false)}
        title="Add Cash Out Entry">
        <View style={[styles.container]}>
          <View style={[styles.summaryContainer, {margin: 0, flex: 1}]}>
            <Input placeholder="Amount" marginBottom={sizes.sm} />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: sizes.sm,
              }}>
              <Dropdown
                style={[
                  styles.dropdown,
                  {width: '100%'},
                  isExpenseFocus && {borderColor: 'blue'},
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={expenseData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isExpenseFocus ? 'Select Expense' : '...'}
                value={expenseValue}
                onFocus={() => setIsExpenseFocus(true)}
                onBlur={() => setIsExpenseFocus(false)}
                onChange={item => {
                  setExpenseValue(item.value);
                  setIsExpenseFocus(false);
                }}
              />
              {/* <TouchableOpacity
                style={[
                  styles.button,
                  styles.cashInButton,
                  {
                    paddingHorizontal: 20,
                    paddingVertical: 13,
                    backgroundColor: '#007bff',
                  },
                ]}
                onPress={() => setShowCustomerModal(true)}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity> */}
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: sizes.sm,
              }}>
              <Dropdown
                style={[
                  styles.dropdown,
                  {width: paymentModeValue === 'Online' ? '49%' : '100%'},
                  isPaymentModeFocus && {borderColor: colors.primary},
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={paymentModeData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isPaymentModeFocus ? 'Payment Mode' : '...'}
                value={paymentModeValue}
                onFocus={() => setIsPaymentModeFocus(true)}
                onBlur={() => setIsPaymentModeFocus(false)}
                onChange={item => {
                  setPaymentModeValue(item.value);
                  setIsPaymentModeFocus(false);
                }}
              />
              {paymentModeValue === 'Online' && (
                <Dropdown
                  style={[
                    styles.dropdown,
                    {width: '49%'},
                    isPaymentProviderFocus && {borderColor: colors.primary},
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={paymentProviderData}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={
                    !isPaymentProviderFocus ? 'Select Channel' : '...'
                  }
                  value={paymentProviderValue}
                  onFocus={() => setIsPaymentProviderFocus(true)}
                  onBlur={() => setIsPaymentProviderFocus(false)}
                  onChange={item => {
                    setPaymentProviderValue(item.value);
                    setIsPaymentProviderFocus(false);
                  }}
                />
              )}
            </View>
            <Input placeholder="Comment" marginBottom={sizes.sm} />
          </View>
          <View style={[styles.buttonContainer, {}]}>
            <TouchableOpacity
              style={[styles.button, styles.cashInButton]}
              onPress={() => {
                handleCashOut();
                setModal(false);
              }}>
              <Text style={styles.buttonText}>SAVE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cashOutButton]}
              onPress={() => setModal(false)}>
              <Text style={styles.buttonText}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <DriverModal showModal={showDriverModal} setModal={setShowDriverModal} />
    </>
  );
};

const CustomerModal = ({showModal, setModal}) => {
  const {assets, colors, gradients, sizes} = useTheme();

  return (
    <Modal
      visible={showModal}
      onRequestClose={() => setModal(false)}
      title="Add Customer">
      <View style={[styles.container]}>
        <View style={[styles.summaryContainer, {margin: 0, flex: 1}]}>
          <Input placeholder="Name" marginBottom={sizes.sm} />
          <Input placeholder="Phone Number" marginBottom={sizes.sm} />
          <Input placeholder="Address Line 1" marginBottom={sizes.sm} />
          <Input placeholder="Address Line 2" marginBottom={sizes.sm} />
          <Input placeholder="Address Line 3" marginBottom={sizes.sm} />
          <Input placeholder="Pincode" marginBottom={sizes.sm} />
        </View>
        <View style={[styles.buttonContainer, {}]}>
          <TouchableOpacity
            style={[styles.button, styles.cashInButton]}
            onPress={() => setModal(true)}>
            <Text style={styles.buttonText}>SAVE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.cashOutButton]}
            onPress={() => setModal(false)}>
            <Text style={styles.buttonText}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const DriverModal = ({showModal, setModal}) => {
  const {assets, colors, gradients, sizes} = useTheme();

  return (
    <Modal
      visible={showModal}
      onRequestClose={() => setModal(false)}
      title="Add Driver">
      <View style={[styles.container]}>
        <View style={[styles.summaryContainer, {margin: 0, flex: 1}]}>
          <Input placeholder="Name" marginBottom={sizes.sm} />
          <Input placeholder="Phone Number" marginBottom={sizes.sm} />
          <Input placeholder="Address Line 1" marginBottom={sizes.sm} />
          <Input placeholder="Address Line 2" marginBottom={sizes.sm} />
          <Input placeholder="Address Line 3" marginBottom={sizes.sm} />
          <Input placeholder="Pincode" marginBottom={sizes.sm} />
        </View>
        <View style={[styles.buttonContainer, {}]}>
          <TouchableOpacity
            style={[styles.button, styles.cashInButton]}
            onPress={() => setModal(true)}>
            <Text style={styles.buttonText}>SAVE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.cashOutButton]}
            onPress={() => setModal(false)}>
            <Text style={styles.buttonText}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const App = () => {
  const [allTransactions, setAllTransactions] = useState(modifiedTransactions);
  const [showModal, setModal] = useState(false);
  const [showCashoutModal, setShowCashoutModal] = useState(false);

  const handleCashIn = number => {
    const randomNumber = Math.floor(Math.random() * (15000 - 9500 + 1)) + 500;
    setAllTransactions(prev => [
      {
        id: 100,
        title: 'Kaymbo Organization pvt. ltd.',
        amount: randomNumber,
        balance: 81638,
        time: '11:22 AM',
        date: '18-Jan-2023',
        paymentMode: 'Online',
        paymentProvider: 'Paytm',
        type: 'CashIn',
        comment:
          'Dilation of Left Common Carotid Artery with Four or More Drug-eluting Intraluminal Devices, Open Approach',
      },
      ...prev,
    ]);
  };

  const handleCashOut = number => {
    const randomNumber = Math.floor(Math.random() * (15000 - 9500 + 1)) + 500;
    setAllTransactions(prev => [
      {
        id: 100,
        title: 'Kaymbo Organization pvt. ltd.',
        amount: randomNumber,
        balance: 81638,
        time: '11:22 AM',
        date: '18-Jan-2023',
        paymentMode: 'Online',
        paymentProvider: 'Paytm',
        type: 'CashOut',
        comment:
          'Dilation of Left Common Carotid Artery with Four or More Drug-eluting Intraluminal Devices, Open Approach',
      },
      ...prev,
    ]);
  };

  // const modifiedTransactions = ;
  const summary = getSummary(allTransactions);
  console.log(summary)
  return (
    <>
      <View style={styles.container}>
        <BalanceSummary
          netBalance={summary.netBalance}
          totalIn={summary.totalIn}
          totalOut={summary.totalOut}
        />
        <ScrollView>
          {/* Map over your transactions to display them */}
          {allTransactions.map((transaction, index) => (
            <TransactionEntry key={index} {...transaction} />
          ))}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cashInButton]}
            onPress={() => setModal(true)}>
            <Text style={styles.buttonText}>+ CASH IN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cashOutButton]}>
            <Text
              style={styles.buttonText}
              onPress={() => setShowCashoutModal(true)}>
              - CASH OUT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <CashInModal
        showModal={showModal}
        setModal={setModal}
        handleCashIn={handleCashIn}
      />
      <CashOutModal
        showModal={showCashoutModal}
        setModal={setShowCashoutModal}
        handleCashOut={handleCashOut}
      />
    </>
  );
};

export default App;
