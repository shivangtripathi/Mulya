import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('reduxstore', jsonValue);
  } catch (e) {
    Alert.alert('Loading State Error');
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('reduxstore');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    Alert.alert('Error loading data from Async Storage');
  }
};

export {getData,storeData};