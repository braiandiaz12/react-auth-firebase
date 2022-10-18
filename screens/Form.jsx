import { View, Text, TextInput, Pressable, TouchableHighlight, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { styles } from '../styles/styles';
import { MaterialIcons, Feather } from '@expo/vector-icons';

const Form = () => {
  const navigation = useNavigation() //sin uso... por ahora
  const [user, setUser] = useState({})
  const [isVisible, setIsVisible] = useState(false)

  const handleRegister = (values) => {
    console.log(JSON.stringify(values, null, 2))
  }

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={values => handleRegister(values)}
    >
      {({
        handleChange, handleBlur, handleSubmit, values
      }) => (

        <View style={styles.container}>
          {/* todo: show possible errors here */}
          <View style={styles.inputWithIcon}>
            <TextInput style={styles.input}
              placeholder='poné email...'
              placeholderTextColor={'limegreen'}
              onChangeText={handleChange('email')}
              name="email"
              value={values.email}
              textAlignVertical='bottom'
            />
            <MaterialIcons name='alternate-email' size={24} />
          </View>
          <View style={styles.inputWithIcon}>

            <TextInput style={styles.input}
              placeholder='contraseña...'
              placeholderTextColor={'red'}
              onChangeText={handleChange('password')}
              name='password'
              value={values.password}
              textAlignVertical='bottom'
              secureTextEntry={isVisible}
            />
            <Pressable onPress={() => setIsVisible(!isVisible)}>
              <Feather name={isVisible ? "eye" : "eye-off"} size={24} />
            </Pressable>

          </View>
          <TouchableHighlight onPress={handleSubmit}>
            <Text>Register</Text>
          </TouchableHighlight>




        </View>
      )}
    </Formik>
  )

}

export default Form