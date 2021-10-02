import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, Modal} from 'react-native';
import {change_variable} from '../actions';
import {connect} from 'react-redux';
import ExpenseBox from '../components/expense-box';
import ExpenseList from '../components/expense-list';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {categories} from '../utils/categories';
import {VictoryPie} from 'victory-native';
import {colorScale} from '../utils/color-scale';
import CategoryModel from './Modals/category-model';

const MULYA = 'Mulya';

const HomeScreen = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const _getUrgentBills = () => {
    const sortable = [];
    props.bills.map((item, index) => {
      sortable.push([item.amount, item.uuid]);
    });
    sortable.sort((a, b) => b[0] - a[0]);
    var urgentBills = [];
    var max = parseInt(props.budget);
    sortable.map((it, idx) => {
      if (it[0] <= max) {
        max = max - it[0];
        urgentBills.push(it[1]);
      }
    });
    props.change_variable('urgentBills', urgentBills);
  };
  const _process_data = () => {
    var data = [];
    var categories_checked = [];
    props.bills.map((item, value) => {
      if (categories_checked.indexOf(item.category) === -1) {
        var category = props.bills.filter(it => it.category === item.category);
        var sum = 0;
        category.map((it, idx) => (sum += it.amount));
        data.push({x: item.category, y: sum});
        categories_checked.push(item.category);
      }
    });
    return data;
  };
  const _renderBills = props => {
    _getUrgentBills();
    if (props.bills.length === 0) {
      return (
        <View style={styles.addBillContainer}>
          <Text style={styles.addBillLabel}>No Bills</Text>
        </View>
      );
    } else {
      return (
        <>
          <VictoryPie
            height={350}
            labelPosition="centroid"
            data={_process_data()}
            colorScale={colorScale}
            categories={{x: categories}}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.section_label}>Bills List</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image
                  source={require('../assets/filter.png')}
                  style={{width: 25, height: 25, marginLeft: 10}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ExpenseList update={props.update} />
        </>
      );
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{MULYA}</Text>
      <CategoryModel
        modalVisible={modalVisible}
        handleModalClose={() => setModalVisible(!modalVisible)}
      />
      <ExpenseBox />
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => props.navigation.navigate('AddBillScreen')}>
        <Text style={styles.buttonText}>Add Bill</Text>
      </TouchableOpacity>
      {_renderBills(props)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffff2',
    paddingHorizontal: 20,
  },
  header: {
    textAlign: 'center',
    marginTop: 20,
    textTransform: 'uppercase',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  section_label: {
    fontSize: 18,
    marginVertical: 10,
    color: '#000',
    letterSpacing: 0.4,
    fontWeight: '800',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    borderRadius: 5,
    marginVertical: 10,
    width:100,
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
  },
  addBillContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 40,
  },
  addBillLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
  },
});

const mapStateToProps = state => {
  const {bills, budget, renderedBill, update} = state.variables;
  return {
    bills,
    budget,
    renderedBill,
    update,
  };
};
export default connect(mapStateToProps, {
  change_variable,
})(HomeScreen);
