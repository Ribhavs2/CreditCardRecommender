// import React, { useState, useEffect } from 'react';
// import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const AddCardScreen = ({ navigation }) => {
//   const [cardId, setCardId] = useState('');
//   const [cards, setCards] = useState([]);

//   useEffect(() => {
//     const fetchCards = async () => {
//       try {
//         const response = await axios.get('http://192.168.1.91:8000/api/pre_existing_cards/');
//         setCards(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchCards();
//   }, []);

//   const handleAddCard = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const user = await AsyncStorage.getItem('user');
//       const { id: userId } = JSON.parse(user);
      
//       const response = await axios.post('http://192.168.1.91:8000/api/add_card/', {
//         user_id: userId,
//         card_id: cardId,
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       Alert.alert('Success', 'Card added successfully');
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to add card');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Add Card</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Card ID"
//         value={cardId}
//         onChangeText={setCardId}
//       />
//       <Button title="Add Card" onPress={handleAddCard} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 12,
//     paddingLeft: 8,
//   },
// });

// export default AddCardScreen;

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native'; // Ensure StyleSheet is imported from 'react-native'
import { Button, TextInput, Menu, Provider } from 'react-native-paper'; // Correct imports from 'react-native-paper'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddCardScreen = ({ navigation }) => {
  const [cardId, setCardId] = useState('');
  const [cards, setCards] = useState([]);
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://192.168.1.91:8000/api/pre_existing_cards/');
        setCards(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCards();
  }, []);

  const handleAddCard = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      const { id: userId } = JSON.parse(user);

      const response = await axios.post('http://192.168.1.91:8000/api/add_card/', {
        user_id: userId,
        card_id: cardId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Alert.alert('Success', 'Card added successfully');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add card');
    }
  };

  return (
    <Provider>
      <View style={styles.container}>
        <TextInput
          label="Select Card"
          value={cardId}
          onChangeText={setCardId}
          mode="outlined"
          style={styles.input}
        />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>Show menu</Button>}>
          {cards.map((card) => (
            <Menu.Item key={card.id} onPress={() => { setCardId(card.id); closeMenu(); }} title={card.card_name} />
          ))}
        </Menu>
        <Button mode="contained" onPress={handleAddCard} style={styles.button}>
          Add Card
        </Button>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default AddCardScreen;


