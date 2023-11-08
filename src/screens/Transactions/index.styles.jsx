import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
