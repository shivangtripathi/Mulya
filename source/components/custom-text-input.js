import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const CustomTextInput = ({placeholder, label, onChangeText, value,numeric=false,disabled=false}) => {
  return (
    <View style={styles.textInputContainer}>
      <Text style={styles.textInputLabel}>{label}</Text>
      <TextInput
        value={value}
        placeholder={placeholder ? placeholder : ''}
        onChangeText={onChangeText}
        style={styles.textInput}
        editable={!disabled}
        keyboardType={numeric?'numeric':'default'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    marginTop: 20,
    paddingBottom: 5,
    borderBottomColor:'#dedede',
    borderBottomWidth:1,
    minWidth:100,
  },
  textInputLabel: {
    fontSize: 18,
    color: '#000',
    opacity: 0.7,
    letterSpacing: 0.5,
  },
  textInput: {
    color: '#111',
    fontSize: 16,
  },
});

export default CustomTextInput;
