import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const Details = ({navigation, route}) => {
  const [product, setProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      fetch(
        `https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/${route.params.id}`,
      )
        .then(response => response.json())
        .then(data => {
          setProduct(data);
          console.log(product);
        });
    };

    fetchProducts();
  }, []);

  return (
    <>
      {product && (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
            <Image source={require('../assets/back.png')} style={styles.icon} />
          </TouchableOpacity>
          <Image source={{uri: product.avatar}} style={styles.image} resizeMode='contain'/>
          <View style={styles.modal}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{product.name}</Text>
              <Text style={styles.text}>${product.price}</Text>
            </View>
            <Text style={styles.descriptionText}>{product.description}</Text>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  iconContainer:{
    top: '10%',
    left: 20,
    alignSelf: 'flex-start',
  },
  icon: {
    width: 20,
    height: 20,
  },
  image: {
    width: 200,
    height: 200,
    top: '10%',
  },
  modal: {
    height: '50%',
    position: 'absolute',
    height: '50%',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  descriptionText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '300',
    paddingTop: 20,
  },
});

export default Details;
