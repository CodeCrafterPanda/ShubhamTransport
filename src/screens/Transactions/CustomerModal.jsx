import React,{useState} from 'react';
import {View} from 'react-native';
import {Input, Modal} from '../../components';
import {useTheme} from '../../hooks';
import TransactionButton from './TransactionButton';
import {styles} from './index.styles';
import { useFirestore } from '../../hooks';

const CustomerModal = ({showModal, setModal}) => {
  const {sizes} = useTheme();
const {addCustomer} = useFirestore()
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [addressLine3, setAddressLine3] = useState('');
  const [pincode, setPincode] = useState('');


  const handleSave =async () => {
    // console.log('Saving data:', {
    //   name,
    //   phoneNumber,
    //   addressLine1,
    //   addressLine2,
    //   addressLine3,
    //   pincode,
    // });
    await addCustomer({
      name,
      phoneNumber,
      addressLine1,
      addressLine2,
      addressLine3,
      pincode,
    })
    setModal(false);
  };
  return (
    <Modal
      visible={showModal}
      onRequestClose={() => setModal(false)}
      title="Add New Customer">
      <View style={[styles.container]}>
        <View style={[styles.summaryContainer, {margin: 0, flex: 1}]}>
          <Input
            placeholder="Name"
            value={name}
            onChangeText={setName}
            marginBottom={sizes.sm}
          />
          <Input
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            marginBottom={sizes.sm}
          />
          <Input
            placeholder="Address Line 1"
            value={addressLine1}
            onChangeText={setAddressLine1}
            marginBottom={sizes.sm}
          />
          <Input
            placeholder="Address Line 2"
            value={addressLine2}
            onChangeText={setAddressLine2}
            marginBottom={sizes.sm}
          />
          <Input
            placeholder="Address Line 3"
            value={addressLine3}
            onChangeText={setAddressLine3}
            marginBottom={sizes.sm}
          />
          <Input
            placeholder="Pincode"
            value={pincode}
            onChangeText={setPincode}
            marginBottom={sizes.sm}
          />
        </View>
        <View style={[styles.buttonContainer, {}]}>
          <TransactionButton
            title="SAVE"
            onPress={handleSave}
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

export default CustomerModal;
