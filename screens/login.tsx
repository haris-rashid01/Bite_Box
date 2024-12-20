import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

// Firebase Configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAajbB9r61bVOQl8vuwejvFM89HpjC95xE',
  authDomain: 'bite-box-by-haris.firebaseapp.com',
  projectId: 'bite-box-by-haris',
  storageBucket: 'bite-box-by-haris.firebasestorage.app',
  messagingSenderId: '1031547223071',
  appId: '1:1031547223071:web:50cb7f6d29f9dd78e7a92a',
  measurementId: 'G-BYX4GNKN3Z',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(async (result) => {
          const userData = { email: result.user.email };
          await AsyncStorage.setItem('user', JSON.stringify(userData));
          setUser(result.user);
          Alert.alert('Success', 'Logged in with Google');
          navigation.navigate('Home');
        })
        .catch((error) => {
          console.error('Google Sign-In Error:', error.message);
          Alert.alert('Error', error.message);
        });
    }
  }, [response]);

  const handleAuthentication = async () => {
    try {
      if (user) {
        await signOut(auth);
        Alert.alert('Success', 'Logged out successfully');
        await AsyncStorage.removeItem('user');
        setUser(null);
      } else {
        let authUser;
        if (isLogin) {
          authUser = await signInWithEmailAndPassword(auth, email, password);
          Alert.alert('Success', 'Signed in successfully');
        } else {
          authUser = await createUserWithEmailAndPassword(auth, email, password);
          Alert.alert('Success', 'Account created successfully');
        }
        const userData = { email: authUser.user.email };
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        setUser(authUser.user);
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={{ height: 240, width: 360 }} source={require('../assets/images/bb.jpg')} />
      <Text style={styles.title}>{isLogin ? 'Bite Box Login' : 'Bite Box Sign Up'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleAuthentication}>
        <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.linkText}>
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#4285F4', marginTop: 10 }]}
        disabled={!request}
        onPress={() => promptAsync()}
      >
        <Text style={styles.buttonText}>Sign In with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // Styles remain unchanged
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#ff5722',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#ff5722',
    fontSize: 14,
    marginTop: 10,
  },
});

export default LoginScreen;
