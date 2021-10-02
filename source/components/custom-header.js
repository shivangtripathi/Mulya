import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {change_variable} from '../actions';
import {connect} from 'react-redux';

const CustomHeader = props => {
  const navigation = props.navigation;

  const _handleDelete = () => {
    var new_bills = props.bills.filter(
      item => item.uuid !== props.selectedBill.uuid,
    );
    props.change_variable('bills', new_bills);
    props.change_variable('selectedBill', {});
    props.change_variable('update',!props.update);
    props.navigation.pop();
  };

  return (
    <View style={styles.headerContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            props.modal ? props.handleModalClose() : navigation.pop()
          }>
          <Image
            source={require('../assets/back.png')}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>
        <Text style={styles.label}>{props.title}</Text>
      </View>
      {props.title === 'Bill Detail' ? (
        <TouchableOpacity activeOpacity={0.8} onPress={_handleDelete}>
          <Image
            source={require('../assets/delete.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 20,
    marginLeft: 20,
    color: '#000',
    letterSpacing: 0.8,
    fontWeight: '700',
  },
});

const mapStateToProps = state => {
  const {bills, selectedBill,update} = state.variables;
  return {
    bills,
    selectedBill,
    update
  };
};
export default connect(mapStateToProps, {
  change_variable,
})(CustomHeader);
