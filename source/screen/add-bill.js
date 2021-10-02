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
import uuid from 'react-native-uuid';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import {categories} from '../utils/categories';

const AddBillScreen = props => {
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    uuid: uuid.v4(),
    amount: 0,
    category: '',
    description: '',
    date: date,
  });

  const _addBill = () => {
    var body = {...state};
    if (state.category === '') {
      body = {...state, category: 'Food & Dining'};
    }
    var new_bills = props.bills;
    new_bills.unshift(body);
    props.change_variable('bills', new_bills);
    props.change_variable('update', !props.update);
    props.navigation.pop();
  };
  return (
    <View style={{flex: 1}}>
      <CustomHeader title={'Add Bill'} navigation={props.navigation} />
      <TouchableWithoutFeedback
        style={styles.container}
        onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text style={styles.textInputLabel}>Category </Text>
          <View
            style={{
              borderWidth: 0.2,
              borderRadius: 2,
              backgroundColor: '#fff',
              borderColor: '#000',
              marginTop: 10,
            }}>
            <Picker
              style={{color:'#000'}}
              selectedValue={state.category}
              onValueChange={(itemValue, itemIndex) =>
                setState({...state, category: itemValue})
              }>
              {categories.map((item, idx) => {
                return <Picker.Item label={item} style={{color:'#fff'}} value={item} />;
              })}
            </Picker>
          </View>

          <CustomTextInput
            label="Description"
            onChangeText={e => setState({...state, description: e})}
            value={state.description}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <CustomTextInput
              label="Amount"
              numeric={true}
              onChangeText={e => setState({...state, amount: e})}
              value={state.amount}
            />
            <TouchableOpacity onPress={() => setOpen(true)}>
              <CustomTextInput
                disabled={true}
                value={state.date}
                label={'Date'}
              />
            </TouchableOpacity>
            {open && (
              <DatePicker
                modal
                
                open={open}
                mode="date"
                style={{backgroundColor:'#fff'}}
                maximumDate={new Date()}
                
                date={new Date()}
                onConfirm={date => {
                  setOpen(false);
                  setState({
                    ...state,
                    date: moment(date).format('DD-MM-YYYY'),
                  });
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            )}
          </View>
          <TouchableOpacity style={styles.button} onPress={() => _addBill()}>
            <Text style={styles.buttonText}>Add Bill</Text>
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
  const {bills, selectedBill, update} = state.variables;
  return {
    bills,
    selectedBill,
    update,
  };
};
export default connect(mapStateToProps, {
  change_variable,
})(AddBillScreen);
