import { ScrollView, FlatList, Image, StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import recipeInfo from '../assets/placeholders/recipeInfo.json';

const apiKey = 'd39928a7b31048459f53673e3e5b3c91';

export default function Recipe() {

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("https://via.placeholder.com/150");
  const [ingredients, setIngredients] = useState([]);
  const listIngredients = ingredients.map((i) => <Text style={styles.ingredients} key={i.original}>{i.original}</Text>);

  const getFoodInfo = () => {
    fetch(
        'https://api.spoonacular.com/food/images/analyze?apiKey=' + apiKey + '&imageUrl=https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_21/2870431/190524-classic-american-cheeseburger-ew-207p.jpg'
    )
    .then((response) => response.json())
    .then((data) => {
      const id = data.recipes[0].id;
      fetch (
        'https://api.spoonacular.com/recipes/' + id  + '/information?apiKey=' + apiKey
      )
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
        setImageUrl(recipeInfo.image);
      })
      .catch(() => {
        //alert("recipe not found!");
        setTitle("Recipe")
      })
    })
    .catch(() => {
        // alert("spoonacular API limit reached!");
        setTitle(recipeInfo.title);
        setImageUrl(recipeInfo.image);
    });
  }

  const getPlaceholderInfo = () => {
    setTitle(recipeInfo.title);
    setImageUrl(recipeInfo.image);
    setIngredients(recipeInfo.extendedIngredients);
  }

  //Called every page refresh
  useEffect(() => {
    // getFoodInfo();
    getPlaceholderInfo();
  })

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}} style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.recipeImage} source={{uri: imageUrl}} alt={"Recipe Image"}/>
      </View>
      <View style={styles.ingredientsContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Ingredients</Text>
        <View style={styles.ingredientsContainer}>
          {listIngredients}
        </View>
      </View>
      </View> 
      {/* <Button title="Click" onPress={getFoodInfo}></Button> */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#ffafcc'
  },
  titleContainer: {
    backgroundColor: '#CF7898',
    borderRadius: 10,
    margin: 10,
    padding: 20
  },
  title: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  imageContainer: {
    width: '90%',
    height: 250,
    alignItems: 'center',
    margin: 10
  },
  recipeImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
    borderWidth: 2
  },
  subtitle: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 10,
    backgroundColor: '#CF7898'
  },
  ingredientsContainer: {
    padding: 5
  },
  ingredients: {
    fontSize: 20,
    padding: 5,
    color: 'white'
  }
});