import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecommendCardScreen = () => {
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [recommendedCard, setRecommendedCard] = useState(null);

  const handleRecommendCard = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      const { id: userId } = JSON.parse(user);

      const response = await axios.post('http://192.168.1.91:8000/api/recommend_card/', {
        user_id: userId,
        category,
        priority,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRecommendedCard(response.data);
      Alert.alert('Success', 'Recommendation received');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to get recommendation');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommend Card</Text>
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Priority"
        value={priority}
        onChangeText={setPriority}
      />
      <Button title="Get Recommendation" onPress={handleRecommendCard} />
      {recommendedCard && (
        <View>
          <Text>Recommended Card: {recommendedCard.card_name}</Text>
          <Text>Points per Dollar: {recommendedCard.points_per_dollar}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default RecommendCardScreen;
