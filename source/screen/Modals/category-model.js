import React, {useState} from 'react';
import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import {change_variable} from '../../actions';
import {connect} from 'react-redux';
import {categories} from '../../utils/categories';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import CustomHeader from '../../components/custom-header';
import { useNavigation } from '@react-navigation/core';

const CategoryModel = props => {
  const [filteredList, setFilteredList] = useState([]);
  const navigation = useNavigation();
  const _handleFilterSelection = item => {
    const index = filteredList.indexOf(item);
    if (filteredList.indexOf(item) === -1) {
      filteredList.push(item);
    } else {
      filteredList.splice(index, 1);
    }
    setFilteredList(filteredList);
  };

  const _setFilter = () => {
    props.change_variable('selectedCategory', filteredList);
    props.change_variable('update', !props.update);
    props.handleModalClose();
  };

  const _renderCategories = props => {
    var output = [];
    categories.map((item, index) => {
      var isSelected =
        props.selectedCategory.indexOf(item) === -1 ? false : true;
      output.push(
        <View style={{flexDirection: 'row', marginTop: 10}} key={index}>
          <BouncyCheckbox
            size={25}
            fillColor="red"
            unfillColor="#fff"
            textStyle={styles.label}
            disableText={true}
            isChecked={isSelected}
            iconStyle={{borderColor: 'red'}}
            textStyle={{fontFamily: 'JosefinSans-Regular'}}
            onPress={() => _handleFilterSelection(item)}
          />
          <Text style={styles.label}>{item}</Text>
        </View>,
      );
    });
    return <View style={{marginTop: 10}}>{output}</View>;
  };
  return (
    <Modal
      animationType="fade"
      transparent={false}
      style={styles.modal}
      visible={props.modalVisible}
      onRequestClose={() => props.handleModalClose()}>
      <CustomHeader title={'Filter Categories'} modal={true} handleModalClose={props.handleModalClose} navigation={navigation}/>
      <View style={styles.modalView}>
        {_renderCategories(props)}
        <TouchableOpacity style={styles.button} onPress={() => _setFilter()}>
          <Text style={styles.buttonText}>Set Filter</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: 20,
    flex: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: '800',
    color: '#222',
  },
  modalView: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    color: '#111',
    textAlign: 'left',
    marginLeft: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    borderRadius: 5,
    marginVertical: 10,
    alignSelf: 'flex-end',
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
  },
});

const mapStateToProps = state => {
  const {bills, budget, selectedCategory, update} = state.variables;
  return {
    bills,
    budget,
    selectedCategory,
    update,
  };
};
export default connect(mapStateToProps, {
  change_variable,
})(CategoryModel);
