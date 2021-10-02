import React, {Component} from 'react';
import {Text, View,StyleSheet} from 'react-native';
import {getData} from '../utils/async-storage';
import {change_variable} from '../actions';
import {connect} from 'react-redux';

export class Splash extends Component {
  componentDidMount = () => {
    getData()
      .then(data => {
        if(data)
        {
        this.props.change_variable('bills', data.bills);
        this.props.change_variable('budget', data.budget);
        }
      })
      .then(() => this.props.navigation.replace('HomeScreen'));
  };

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}> MULYA </Text>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        alignItems:'center',
        flex:1,
        justifyContent:'center'
    },
    label:{
        fontSize:30,
        fontWeight:'bold',
        color:'#fff',
        letterSpacing:0.8
    },
    labelContainer:{
        backgroundColor:'#000',
        height:200,
        width:200,
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center',
    }
})

const mapStateToProps = state => {
  const {} = state.variables;
  return {};
};

export default connect(mapStateToProps, {
  change_variable,
})(Splash);
