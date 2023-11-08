import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Input, Modal} from '../../components';
import {useTheme} from '../../hooks';
import {
  customerData,
  expenseData,
  getCurrentTimeAndDate,
  paymentModeData,
  paymentProviderData,
} from '../constants';
import DropdownContent from './DropDownContent';
import TransactionButton from './TransactionButton';
import {styles} from './index.styles';

const CashInOutModal = ({type, onChange, showModal, setModal, handleSave}) => {
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
          <TransactionButton
            title="SAVE"
            onPress={onSave}
            style={styles.cashInButton}
          />
          <TransactionButton
            title="CANCEL"
            onPress={() => setModal(false)}
            style={styles.cashOutButton}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CashInOutModal;
