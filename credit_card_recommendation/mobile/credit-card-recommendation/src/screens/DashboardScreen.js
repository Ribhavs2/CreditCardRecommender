// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const DashboardScreen = () => {
//   const [cards, setCards] = useState([]);
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     const fetchUserAndToken = async () => {
//       try {
//         const storedUser = await AsyncStorage.getItem('user');
//         const storedToken = await AsyncStorage.getItem('token');
//         if (storedUser && storedToken) {
//           setUser(JSON.parse(storedUser));
//           setToken(storedToken);
//         }
//       } catch (error) {
//         console.error('Failed to fetch user and token from storage', error);
//       }
//     };

//     fetchUserAndToken();
//   }, []);

//   useEffect(() => {
//     if (user && token) {
//       const fetchCards = async () => {
//         try {
//           const response = await axios.get(`http://192.168.1.91:8000/api/user_cards/${user.id}/`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           console.log(response.data);  // Log the data to verify structure
//           setCards(response.data);
//         } catch (error) {
//           console.error(error);
//           Alert.alert('Error', 'Failed to fetch cards');
//         }
//       };

//       fetchCards();
//     }
//   }, [user, token]);

//   const renderCategoryItem = ({ item }) => (
//     <View style={styles.categoryItem}>
//       <Text>Category: {item.category_name}</Text>
//       <Text>Points per Dollar: {item.points_per_dollar}</Text>
//     </View>
//   );

//   const renderCardItem = ({ item }) => (
//     <View style={styles.cardItem}>
//       {item.card_name ? (
//         <>
//           <Text style={styles.cardName}>{item.card_name}</Text>
//           <Text>Value per Point: {item.value_per_point}</Text>
//           <FlatList
//             data={item.categories}
//             renderItem={renderCategoryItem}
//             keyExtractor={(item, index) => index.toString()}
//           />
//         </>
//       ) : (
//         <Text>Card data is incomplete</Text>
//       )}
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Your Cards</Text>
//       <FlatList
//         data={cards}
//         renderItem={renderCardItem}
//         keyExtractor={(item) => item.id.toString()}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   cardItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   cardName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   categoryItem: {
//     paddingLeft: 10,
//     paddingTop: 5,
//   },
// });

// export default DashboardScreen;

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardScreen = ({ navigation }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchUserCards = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('http://192.168.1.91:8000/api/user_cards/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCards(response.data);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch user cards');
      }
    };

    fetchUserCards();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Your Cards</Title>
      {cards.map((card) => (
        <Card key={card.id} style={styles.card}>
          <Card.Content>
            <Title>{card.card_name}</Title>
            {card.categories.map((category, index) => (
              <Paragraph key={index}>
                {category.category_name}: {category.points_per_dollar} points/dollar
              </Paragraph>
            ))}
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    marginBottom: 20,
  },
});

export default DashboardScreen;
