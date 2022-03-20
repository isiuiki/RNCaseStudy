import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Categories from './Categories';
import Create from '../screens/Create';
import {useFocusEffect} from '@react-navigation/native';

const PostList = ({navigation}) => {
  const [products, setProducts] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const fetchProducts = async () => {
    setProducts(null);

    await fetch(
      'https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/',
    )
      .then(response => response.json())
      .then(data => {
        if (activeCategory !== 'All') {
          data = data.filter(product => product.category === activeCategory);
        }
        setProducts(data);
      });
  };

  const deleteProduct = async id => {
    const rawResponse = await fetch(
      `https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/${id}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const remainingProducts = products.filter(product => product.id !== id);
    setProducts(remainingProducts);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchProducts();

      return () => {};
    }, [activeCategory]),
  );

  const setActiveCategoryName = name => {
    setActiveCategory(name);
  };

  return (
    <>
      <ScrollView stickyHeaderIndices={[0]}>
        <Categories
          activeCategory={activeCategory}
          setCategoryName={setActiveCategoryName}
        />
        <View style={styles.productsContainer}>
          {products && typeof products === 'string' && <Text>{products}</Text>}

          {products &&
            products.map(product => {
              return (
                <TouchableOpacity
                  key={product.id}
                  style={styles.productContainer}
                  onPress={() =>
                    navigation.navigate('Details', {id: product.id})
                  }>
                  <Image
                    source={{uri: product.avatar}}
                    style={styles.avatar}
                    resizeMode="contain"
                  />
                  <View style={styles.productInfoContainer}>
                    <Text style={styles.text}>{product.name}</Text>
                    <View style={styles.priceContainer}>
                      <Text style={styles.text}>${product.price}</Text>
                      <TouchableOpacity
                        onPress={() => deleteProduct(product.id)}>
                        <Image
                          source={require('../assets/delete.png')}
                          style={styles.edit}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('Create')}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  productContainer: {
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    borderWidth: 1,
    borderColor: '#ececec',
    borderRadius: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  productInfoContainer: {
    bottom: 0,
    position: 'absolute',
    backgroundColor: '#000',
    padding: 10,
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatar: {
    width: 100,
    height: 100,
  },
  text: {
    color: '#fff',
  },
  edit: {
    width: 20,
    height: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  createButton: {
    flexDirection: 'row',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 50,
    right: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
  plus: {
    width: 50,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#000',
    fontSize: 30,
    fontWeight: '600',
  },
});

export default PostList;
