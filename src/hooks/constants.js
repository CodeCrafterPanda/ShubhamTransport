export const paymentModeData = [
  {
    value: 'Cash',
    label: 'Cash',
  },
  {
    value: 'Online',
    label: 'Online',
  },
  {
    value: 'Pending',
    label: 'Pending',
  },
];

export const paymentProviderData = [
  {
    value: 'PhonePe',
    label: 'PhonePe',
  },
  {
    value: 'Google Pay',
    label: 'Google Pay',
  },
  {
    value: 'Paytm',
    label: 'Paytm',
  },
  {
    value: 'Bank Transfer',
    label: 'Bank Transfer',
  },
];

export const customerData = [
  {
    value: 'f29dc51f-5705-4e0a-8271-8cc09fbc3e74',
    label: 'Eamia Enterprises pvt. ltd.',
  },
  {
    value: '8c5fd500-57b7-4798-8a9b-08713a9d75d7',
    label: 'Skyble Enterprises pvt. ltd.',
  },
  {
    value: '1993840e-2675-4c97-bb59-4272bf09354d',
    label: 'Ainyx Organization pvt. ltd.',
  },
  {
    value: '197e8df6-dda2-46db-a148-bb8f3365a035',
    label: 'Skidoo Company pvt. ltd.',
  },
  {
    value: 'e0964a72-87a0-4c5b-b5bf-1d28f3772e77',
    label: 'Meezzy Company pvt. ltd.',
  },
  {
    value: '9dce84a0-1391-4477-aead-9b9c499b26c8',
    label: 'Browsetype Enterprises pvt. ltd.',
  },
  {
    value: '78fc08d0-7407-4dd9-8c72-35e391c08975',
    label: 'Jatri Organization pvt. ltd.',
  },
  {
    value: 'af4433cf-3cb1-41d2-81e1-dcd097ab85a1',
    label: 'Devify Enterprises pvt. ltd.',
  },
  {
    value: '3f155c19-f7d3-4759-a90d-44c1879231a6',
    label: 'Voonix Company pvt. ltd.',
  },
  {
    value: '6bb415c3-70ec-4de9-80c3-1532af52735c',
    label: 'Meezzy Organization pvt. ltd.',
  },
];

export const expenseData = [
  {
    value: 'Driver Salary',
    label: 'Driver Salary',
  },
  {
    value: 'Diesel',
    label: 'Diesel',
  },
  {
    value: 'Maintenance',
    label: 'Maintenance',
  },
  {
    value: 'Loan EMI',
    label: 'Loan EMI',
  },
  {
    value: 'Toll Tax',
    label: 'Toll Tax',
  },
  {
    value: 'Other',
    label: 'Other',
  },
];

export function modifyTransactions(transactions) {
  return transactions.map(transaction => {
    // If paymentMode is Cash, set paymentProvider to an empty string
    if (transaction.paymentMode === 'Cash') {
      transaction.paymentProvider = '';
    }

    // If type is CashOut, adjust the amount
    if (transaction.type === 'CashOut') {
      const randomDeduction =
        Math.floor(Math.random() * (1500 - 500 + 1)) + 500; // random number between 500 and 1500
      transaction.amount = Math.max(500, transaction.amount - randomDeduction);
    }

    return transaction;
  });
}

export function getSummary(transactions,prevNetBalance) {
  let netBalance =prevNetBalance|| 0;
  let totalIn = 0;
  let totalOut = 0;
  // Start from the end of the array
  for (let i = transactions.length - 1; i >= 0; i--) {
    let transaction = transactions[i];

    if (transaction.paymentMode !== 'Pending') {
      if (transaction.type === 'CashIn') {
        netBalance += transaction.amount;
        totalIn += transaction.amount;
      } else if (transaction.type === 'CashOut') {
        netBalance -= transaction.amount;
        totalOut += transaction.amount;
      }
    }
    // Modify the transaction's balance
    transaction.balance = netBalance;
  }

  // Format the summary with commas for thousands
  const formatNumber = num =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return {
    netBalance,
    totalIn,
    totalOut,
  };
}
export const modifiedTransactions = modifyTransactions([]);
export function getCurrentTimeAndDate() {
  const now = new Date();
  const options = {hour: '2-digit', minute: '2-digit', hour12: true};
  const time = now.toLocaleTimeString('en-US', options);

  const dateOptions = {day: '2-digit', month: 'short', year: 'numeric'};
  const date = now.toLocaleDateString('en-GB', dateOptions);

  return {
    time: time,
    date: date.replace(/ /g, '-'), // Replace spaces with dashes
  };
}

