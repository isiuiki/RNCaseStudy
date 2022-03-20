import React from 'react';
import {View, SafeAreaView} from 'react-native';
import Header from '../components/Header';
import PostList from '../components/PostList';

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: '#ececec', flex:1}}>
      <Header navigation={navigation} />
      <PostList navigation={navigation} />
    </SafeAreaView>
  );
};

export default Home;
