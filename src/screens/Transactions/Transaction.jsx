import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {styles} from './index.styles';

const Transaction = memo(
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
        {!!comment && <Text style={styles.transactionDetail}>{comment}</Text>}
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

export default Transaction;
