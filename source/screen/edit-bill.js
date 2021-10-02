import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import CustomHeader from '../components/custom-header';
import {change_variable} from '../actions';
import {connect} from 'react-redux';
import CustomTextInput from '../components/custom-text-input';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import {categories} from '../utils/categories';
import uuid from 'react-native-uuid';

const EditBillScreen = props => {
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);
  const _editBill = () => {
    var new_bills = props.bills.filter(
      item => item.uuid !== props.selectedBill.uuid,
    );
    const body = {
      uuid: uuid.v4(),
      amount: props.amount,
      category: props.category === '' ? 'Food & Dining' : props.category,
      description: props.description,
      date: props.date,
    };
    new_bills.unshift(body);
    props.change_variable('bills', new_bills);
    props.change_variable('update', !props.update);
    props.navigation.navigate('HomeScreen');
  };

  return (
    <View style={{flex: 1}}>
      <CustomHeader title={'Edit Bill'} navigation={props.navigation} />
      <TouchableWithoutFeedback
        style={styles.container}
        onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text style={styles.textInputLabel}>Category </Text>
          <Picker
            selectedValue={props.category}
            onValueChange={(itemValue, itemIndex) =>
              props.change_variable('category', itemValue)
            }>
            {categories.map((item, idx) => {
              return <Picker.Item label={item} value={item} />;
            })}
          </Picker>
          <CustomTextInput
            label="Description"
            onChangeText={e => props.change_variable('description', e)}
            value={props.description}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <CustomTextInput
              label="Amount"
              numeric={true}
              onChangeText={e => props.change_variable('amount', e)}
              value={props.amount}
            />
            <TouchableOpacity onPress={() => setOpen(true)}>
              <CustomTextInput
                disabled={true}
                value={props.date}
                label={'Date'}
              />
            </TouchableOpacity>
            {open && (
              <DatePicker
                modal
                open={open}
                mode="date"
                date={props.date}
                onConfirm={date => {
                  setOpen(false);
                  props.change_variable(
                    'date',
                    moment(date).format('DD-MM-YYYY'),
                  );
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            )}
          </View>
          <TouchableOpacity style={styles.button} onPress={() => _editBill()}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffff2',
    paddingHorizontal: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
  },
  textInputLabel: {
    fontSize: 18,
    color: '#000',
    opacity: 0.7,
    letterSpacing: 0.5,
    marginTop: 20,
  },
});

const mapStateToProps = state => {
  const {amount, bills, category, date, description,selectedBill, update} = state.variables;
  return {
    amount,
    bills,
    category,
    date,
    description,
    selectedBill,
    update,
  };
};
export default connect(mapStateToProps, {
  change_variable,
})(EditBillScreen);
