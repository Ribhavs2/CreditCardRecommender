// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';

// const HomeScreen = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to Credit Card Recommendation System</Text>
//       <Button title="Go to Dashboard" onPress={() => navigation.navigate('Dashboard')} />
//       <Button title="Register" onPress={() => navigation.navigate('Register')} />
//       <Button title="Login" onPress={() => navigation.navigate('Login')} />
//       <Button title="Add Card" onPress={() => navigation.navigate('AddCard')} />
//       <Button title="Recommend Card" onPress={() => navigation.navigate('RecommendCard')} />
//       <Button title="Profile" onPress={() => navigation.navigate('UserProfile')} />
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
//     textAlign: 'center',
//   },
//   button: {
//     marginVertical: 5,
//   },
// });

// export default HomeScreen;

import React, { useContext } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../AuthContext';

const HomeScreen = ({ navigation }) => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {!isAuthenticated ? (
        <>
          <Button title="Register" onPress={() => navigation.navigate('Register')} />
          <Button title="Login" onPress={() => navigation.navigate('Login')} />
        </>
      ) : (
        <>
          <Button title="Dashboard" onPress={() => navigation.navigate('Dashboard')} />
          <Button title="Add Card" onPress={() => navigation.navigate('AddCard')} />
          <Button title="Recommend Card" onPress={() => navigation.navigate('RecommendCard')} />
          <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
          <Button title="Logout" onPress={logout} />
        </>
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
});

export default HomeScreen;

