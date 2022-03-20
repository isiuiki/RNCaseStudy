import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity>
        <Text style={styles.headerText}>UPayments Store</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image style={styles.icon} source={require('../assets/search.png')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#ececec'
  },
  headerText: {
    fontWeight: '600',
    fontStyle: 'italic',
    fontSize: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default Header;
