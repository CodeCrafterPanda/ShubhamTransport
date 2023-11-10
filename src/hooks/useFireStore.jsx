import firestore from '@react-native-firebase/firestore';
import {useAuth} from './useAuth'; // Assuming you have an AuthContext for user data
const UNIQUE_BALANCE_SUMMARY_ID = '62101425-99f7-46b3-adf6-a11642e239a9';
export const useFirestore = () => {
  const {user} = useAuth(); // Retrieve current user from context
  // Function to add a new transaction
  const addTransaction = async transaction => {
    try {
      await firestore()
        .collection('Transactions')
        .add({
          ...transaction,
          createdBy: user.uid,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
    } catch (error) {
      console.error('Error adding Transaction:', error);
    }
  };

  const addCustomer = async customer => {
    try {
      await firestore()
        .collection('Customers')
        .add({
          ...customer,
          createdBy: user.uid,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
    } catch (error) {
      console.error('Error adding Customer:', error);
    }
  };

  // Function to update the balance summary
  const updateBalanceSummary = async summary => {
    try {
      await firestore()
        .collection('BalanceSummary')
        .doc(UNIQUE_BALANCE_SUMMARY_ID)
        .update({
          ...summary,
          updatedAt: Date.now(),
        });
    } catch (error) {
      console.error('Error updating Balance Summary:', error);
    }
  };

  // Function to fetch and create the balance summary if it doesn't exist
  const fetchAndCreateBalanceSummary = async setSummary => {
    const BalanceRef = firestore()
      .collection('BalanceSummary')
      .doc(UNIQUE_BALANCE_SUMMARY_ID);
    try {
      const fetchedBalance = await BalanceRef.get();
      if (!fetchedBalance.exists) {
        await BalanceRef.set({
          netBalance: 0,
          totalIn: 0,
          totalOut: 0,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
      } else {
        setSummary(fetchedBalance.data());
      }
    } catch (error) {
      console.error(
        'An error occurred while fetching or creating the Balance:',
        error,
      );
    }
  };

  // Function to listen to real-time updates of transactions
  const listenToTransactions = (setTransactions, onError) => {
    return firestore()
      .collection('Transactions')
      .onSnapshot(querySnapshot => {
        let transactionsArr = [];
        querySnapshot.forEach(documentSnapshot => {
          transactionsArr.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });
        setTransactions(
          transactionsArr.sort((a, b) => b.createdAt - a.createdAt),
        );
      }, onError);
  };

  // Function to listen to real-time updates of transactions
  const listenToCustomers = (setCustomers, onError) => {
    return firestore()
      .collection('Customers')
      .onSnapshot(querySnapshot => {
        let customersArr = [];
        querySnapshot.forEach(documentSnapshot => {
          customersArr.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });
        setCustomers(
          customersArr.sort((a, b) => b.createdAt - a.createdAt),
        );
      }, onError);
  };

  // Function to subscribe to real-time updates of the balance summary
  const subscribeToBalanceSummary = setSummary => {
    return firestore()
      .collection('BalanceSummary')
      .doc(UNIQUE_BALANCE_SUMMARY_ID)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.data()) {
          setSummary(documentSnapshot.data());
        }
      });
  };

  // Additional Firestore operations can be added here
  return {
    addCustomer,
    addTransaction,
    updateBalanceSummary,
    fetchAndCreateBalanceSummary,
    listenToCustomers,
    listenToTransactions,
    subscribeToBalanceSummary,
  };
};
