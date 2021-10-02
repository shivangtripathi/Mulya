import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {change_variable} from '../actions';
import {connect} from 'react-redux';

const ExpenseBox = props => {
  const _renderExpense = () => {
    var amount = parseInt(0);
    props.bills.map((item, index) => {
      amount += parseInt(item.amount);
    });
    return amount;
  };
  return (
    <View style={styles.box}>
      <View>
        <Text style={styles.label}>Budget </Text>
        <TextInput
          keyboardType={'numeric'}
          style={styles.textInputLabel}
          value={props.budget}
          placeholder={'0'}
          onChangeText={e => props.change_variable('budget', e)}
        />
      </View>
      <Text style={styles.divider}> | </Text>
      <View>
        <Text style={styles.label}>Expense </Text>
        <Text style={styles.sublabel}>{_renderExpense()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#000',
    marginVertical: 10,
    padding: 20,
    backgroundColor: '#fffff4',
    borderRadius: 5,
  },
  sublabel: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  textInputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  label: {
    color: '#111',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  divider: {
    fontSize: 40,
  },
});

const mapStateToProps = state => {
  const {bills, budget, expense, update} = state.variables;
  return {
    bills,
    budget,
    expense,
    update,
  };
};
export default connect(mapStateToProps, {
  change_variable,
})(ExpenseBox);
