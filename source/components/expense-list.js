import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {change_variable} from '../actions';
import {connect} from 'react-redux';

const RenderBill = ({item, navigation, change_variable, urgentBills}) => {
  const {category, amount, date, uuid} = item.item;
  const _handleNavigation = () => {
    change_variable('selectedBill', item.item);
    navigation.navigate('BillDetailsScreen');
  };
  var _date = new Date(date);
  _date = moment().format('DD-MMM-YY');
  const isUrgent = urgentBills.indexOf(uuid) > -1;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.bill, {borderBottomColor: isUrgent ? 'red' : 'green'}]}
      onPress={() => _handleNavigation()}>
      <View>
        <Text style={styles.category_label}>{category}</Text>
        <Text style={styles.date}>{_date}</Text>
        {isUrgent && <Text style={{color: 'red'}}>To be paid</Text>}
      </View>
      <Text style={styles.amount_label}>{'₹ ' + amount}</Text>
    </TouchableOpacity>
  );
};

const ExpenseList = props => {
  const navigation = useNavigation();
  const filters = props.selectedCategory;
  var data = [];
  if (filters.length > 0) {
    props.bills.map((item, index) => {
      if (filters.indexOf(item.category) > -1) {
        data.push(item);
      }
    });
  } else {
    data = props.bills;
  }

  return (
    <View>
      <FlatList
        style={{marginBottom: 20}}
        data={data}
        renderItem={item => (
          <RenderBill
            item={item}
            urgentBills={props.urgentBills}
            navigation={navigation}
            change_variable={props.change_variable}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bill: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#f9f1f1',
    marginTop: 5,
    borderBottomWidth: 2,
    borderRadius: 5,
    justifyContent: 'space-between',
  },
  category_label: {
    fontSize: 16,
    color: '#111',
  },
  amount_label: {
    fontSize: 16,
    color: '#222',
    marginTop: 5,
  },
  date: {
    fontSize: 14,
    color: '#696969',
  },
});

const mapStateToProps = state => {
  const {bills, selectedCategory, urgentBills} = state.variables;
  return {
    bills,
    selectedCategory,
    urgentBills,
  };
};
export default connect(mapStateToProps, {
  change_variable,
})(ExpenseList);
