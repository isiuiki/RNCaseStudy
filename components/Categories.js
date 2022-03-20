import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const Categories = ({activeCategory, setCategoryName}) => {
  const [categories, setCategories] = useState(null);

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
          setCategories([...all, ...data]);
          console.log(categories);
        });
    };

    fetchCategories();
  }, []);
  

  return (
    <ScrollView
      style={styles.container}
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      {categories &&
        categories.map(category => {
          return (
            <TouchableOpacity
              style={[
                styles.category,
                activeCategory === category.name ? styles.active : null,
              ]}
              onPress={() => setCategoryName(category.name)}
              key={category.id}>
              <Text
                style={[
                  styles.text,
                  activeCategory === category.name ? styles.activeText : null,
                ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ececec',
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

export default Categories;
