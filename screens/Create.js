import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

const Create = ({navigation}) => {
  const [title, setTitle] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [category, setCategory] = useState(null);

  const [categories, setCategories] = useState(null);

  const postProduct = async () => {

    const rawResponse = await fetch(
      'https://62286b649fd6174ca82321f1.mockapi.io/case-study/products',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: title,
          price: price,
          category: category,
          description: description,
          avatar: avatar,
          developeremail: '',
        }),
      },
    );
    navigation.goBack();
    console.log('response')
    console.log(rawResponse)
  };
  

  useEffect(() => {
    const all = [
      {
        id: '0',
        name: 'All',
      },
    ];
    const fetchCategories = async () => {
      fetch(
        'https://62286b649fd6174ca82321f1.mockapi.io/case-study/categories/',
      )
        .then(response => response.json())
        .then(data => {
          setCategories(data);
          console.log(categories);
        });
    };

    fetchCategories();
  }, []);

  const setActive = category => {
    setCategory(category.name);
  };

  const titlechange = (val) => {
      console.log(val)
    setTitle(val)
    console.log(title)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconContainer}>
          <Image source={require('../assets/back.png')} style={styles.icon} />
        </TouchableOpacity>
        <View>
          <TextInput
            placeholder="Product Title"
            value={title}
            onChangeText={val => setTitle(val)}
            style={styles.input}
          />
          <TextInput
            placeholder="Price"
            value={price}
            onChangeText={val => setPrice(val)}
            style={styles.input}
          />
          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={val => setDescription(val)}
            style={styles.input}
          />
          <TextInput
            placeholder="Image link"
            value={avatar}
            onChangeText={val => setAvatar(val)}
            style={styles.input}
          />
          <Text>Selected Category: {category}</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {categories &&
              categories.map(cat => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.category,
                      category === cat.name ? styles.active : null,
                    ]}
                    onPress={() => setCategory(cat.name)}
                    key={cat.id}>
                    <Text
                      style={[
                        styles.text,
                        category === cat.name ? styles.activeText : null,
                      ]}>
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => postProduct()}>
          <Text style={styles.addProduct}>Add Product</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    margin: 10,
    borderRadius: 5,
    padding: 10,
  },
  iconContainer: {
    left: 20,
  },
  icon: {
    width: 20,
    height: 20,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '25%',
  },
  addProduct: {
    color: '#fff',
  },
  category: {
    paddingHorizontal: 20,
    height: 40,
    backgroundColor: '#000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00',
    marginHorizontal: 5,
    justifyContent: 'center',
    marginVertical: 20,
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  active: {
    color: '#000',
    backgroundColor: '#fff',
  },
  activeText: {
    color: '#000',
  },
});

export default Create;
