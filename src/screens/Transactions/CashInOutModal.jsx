import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Input, Modal} from '../../components';
import {useTData, useTheme} from '../../hooks';
import {
  expenseData,
  getCurrentTimeAndDate,
  paymentModeData,
  paymentProviderData,
} from '../constants';
import CustomerModal from './CustomerModal';
import DropdownContent from './DropDownContent';
import TransactionButton from './TransactionButton';
import {styles} from './index.styles';

const CashInOutModal = ({type, showModal, setModal, handleSave}) => {
  const [showCustomerModal, setCustomerModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [customer, setCustomer] = useState(null);
  const [expense, setExpense] = useState(null);
  const [paymentMode, setPaymentMode] = useState(null);
  const [paymentProvider, setPaymentProvider] = useState(null);
  const [comment, setComment] = useState('');
  const {customers} = useTData();
  const modifiedCustomersData = customers?.map(cst => ({
    value: cst.id,
    label: cst.name,
  }));
  const {sizes} = useTheme();

  const onSave = () => {
    handleSave(
      {
        amount: +amount,
        title:
          type === 'Cash In'
            ? modifiedCustomersData.find(cst => cst.value === customer).label
            : expense,
        customer,
        paymentMode,
        paymentProvider,
        comment,
        type: type.replace(' ', ''),
        ...getCurrentTimeAndDate(),
      },
      type === 'Cash In',
    );
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
                data={modifiedCustomersData}
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
                onPress={() => setCustomerModal(true)}>
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
        <CustomerModal
          showModal={showCustomerModal}
          setModal={setCustomerModal}
        />
      </View>
    </Modal>
  );
};

export default CashInOutModal;
