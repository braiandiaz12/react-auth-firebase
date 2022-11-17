import { View, Text, Pressable } from 'react-native'
import React, { useContext } from 'react';
import UserCtx from '../userCtx';
import { getAuth } from 'firebase/auth';
import { styles } from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
const auth = getAuth()

const Auth = () => {
  const { user, setUser } = useContext(UserCtx)

  const logout = () => {
    auth.signOut()
      .then(() => {
        setUser({ email: '' })
        deleteUserFromAsyncStorage('email')
      })
      .catch(err => console.log(err))
  }

  const deleteUserFromAsyncStorage = async (key) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.whiteSheet}>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 14 }}>{user.email}</Text>
        <Pressable style={[styles.button]} onPress={logout}>
          <Text style={[styles.buttonText]}>logout</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  )
}

export default Auth