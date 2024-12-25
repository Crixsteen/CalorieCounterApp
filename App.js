import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ImageBackground } from 'react-native';
import axios from 'axios';
import styles from './styles';

export default function App() {
  const [food, setFood] = useState('');
  const [quantity, setQuantity] = useState('');
  const [calories, setCalories] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchFoodData = async (foodName) => {
    try {
      const response = await axios.get(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${foodName}&search_simple=1&json=1`
      );

      if (response.data.products.length > 0) {
        const product = response.data.products[0];
        return product.nutriments['energy-kcal_100g'] || 0;
      } else {
        Alert.alert('Errore', 'Cibo non trovato nel database.');
        return 0;
      }
    } catch (error) {
      console.error('Errore durante il recupero dei dati:', error.message);
      Alert.alert('Errore', 'Impossibile ottenere i dati dal database.');
      return 0;
    }
  };

  const calculateCalories = async () => {
    if (!food.trim()) {
      Alert.alert('Errore', 'Inserisci il nome di un cibo.');
      return;
    }

    const quantityParsed = parseFloat(quantity);
    if (isNaN(quantityParsed) || quantityParsed <= 0) {
      Alert.alert('Errore', 'Inserisci una quantità valida (in grammi).');
      return;
    }

    setLoading(true);
    const caloriePer100g = await fetchFoodData(food.trim().toLowerCase());
    setLoading(false);

    if (caloriePer100g === 0) {
      return;
    }

    const totalCalories = (caloriePer100g / 100) * quantityParsed;
    setCalories(totalCalories);
  };

  const resetAll = () => {
    setFood('');
    setQuantity('');
    setCalories(0);
    setLoading(false);
  };

  return (
    <ImageBackground
      source={require('./assets/FOOD.jpg')} // Percorso corretto dell'immagine
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Contatore di Calorie</Text>
        <TextInput
          style={styles.input}
          placeholder="Inserisci il cibo (es: mela, pane)"
          value={food}
          onChangeText={(text) => setFood(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Inserisci la quantità (in grammi)"
          value={quantity}
          onChangeText={(text) => setQuantity(text)}
          keyboardType="numeric"
        />
        <View style={styles.buttonContainer}>
          <Button title="Calcola Calorie" onPress={calculateCalories} color="#B56576" />
          <Button title="Azzera" onPress={resetAll} color="#355070" />
        </View>
        {loading ? (
          <Text style={styles.loading}>Caricamento...</Text>
        ) : (
          <Text style={styles.result}>
            {calories > 0
              ? `Calorie Totali: ${calories.toFixed(2)} kcal`
              : 'Inserisci un alimento e una quantità'}
          </Text>
        )}
      </View>
    </ImageBackground>
  );
}

