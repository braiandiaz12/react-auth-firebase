import { View, Text, Pressable } from 'react-native';
import { styles } from '../styles/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react'

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Pressable onPress={() => navigation.navigate("Login")}>
        <MaterialCommunityIcons name='login-variant' size={48} color='tomato' />
      </Pressable>

    </View>
  )
}

export default Home