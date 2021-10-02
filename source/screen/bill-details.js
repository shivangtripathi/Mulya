import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import CustomHeader from '../components/custom-header';
import {change_variable} from '../actions';
import {connect} from 'react-redux';

const keys = ['Description', 'Bill Amount', 'Date'];

const BillDetailsScreen = props => {
  const {category, amount, date, description} = props.selectedBill;
  const _handleNavigation = () => {
    props.change_variable('category', category);
    props.change_variable('amount', amount);
    props.change_variable('date', date);
    props.change_variable('description', description);
    props.navigation.navigate('EditBillScreen');
  };
  return (
    <View style={{flex: 1}}>
      <CustomHeader navigation={props.navigation} title={'Bill Detail'} />
      <View style={styles.container}>
        <View style={styles.detailsBox}>
          <Text style={styles.category_label}>{category}</Text>
          <View style={styles.divider} />
          <View style={{flexDirection: 'row'}}>
            <View>
              {keys.map((item, index) => (
                <Text key={index} style={styles.key}>
                  {item}
                </Text>
              ))}
            </View>
            <View>
              <Text style={styles.value}>{description}</Text>

              <Text style={styles.value}>{amount}</Text>

              <Text style={styles.value}>{date}</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={() => _handleNavigation()}>
            <Text style={styles.buttonText}>Edit Bill</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffff2',
    paddingHorizontal: 20,
  },
  detailsBox: {
    marginHorizontal: 10,
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderWidth: 0.5,
  },
  category_label: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
    alignSelf: 'center',
  },
  divider: {
    borderBottomColor: '#dedede',
    borderBottomWidth: 1.5,
    marginVertical: 10,
  },
  key: {
    fontSize: 16,
    color: '#141e2f',
    marginBottom: 10,
  },
  value: {
    fontSize: 16,
    color: '#000',
    marginLeft: 20,
    marginBottom: 10,
  },
  button: {
    alignSelf: 'flex-end',
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
  },
});

const mapStateToProps = state => {
  const {bills, selectedBill} = state.variables;
  return {
    bills,
    selectedBill,
  };
};
export default connect(mapStateToProps, {
  change_variable,
})(BillDetailsScreen);
