import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {styles} from './index.styles';
import {useTData} from '../../hooks';

const BalanceSummary = memo(() => {
  const {summary} = useTData();
  const {netBalance, totalIn, totalOut} = summary;
  return (
    <View style={styles.summaryContainer}>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Net Balance</Text>
        <Text
          style={[
            styles.summaryValue,
            parseInt(netBalance) < 0 ? styles.totalOut : {color: '#007bff'},
          ]}>
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

export default BalanceSummary;
