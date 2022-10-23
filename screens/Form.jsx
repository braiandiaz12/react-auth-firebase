import { View, Text, TextInput, Pressable, TouchableHighlight, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { loginValidationSchema } from '../validation/validationSchema';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { styles } from '../styles/styles';
import { MaterialIcons, Feather } from '@expo/vector-icons';

const Form = () => {
  const navigation = useNavigation() //sin uso... por ahora
  const [user, setUser] = useState({})
  const [isVisible, setIsVisible] = useState(false)
  const [isNewUser, setIsNewUser] = useState(false)

  const handleRegister = (values) => {
    console.log('register');
    console.log(JSON.stringify(values, null, 2))
  }
  const handleLogin = (values) => {
    console.log('login');
    console.log(JSON.stringify(values, null, 2))
  }

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginValidationSchema}
      onSubmit={values => { isNewUser ? handleRegister(values) : handleLogin(values) }}
    >
      {({
        handleChange, handleBlur, handleSubmit, values, errors, touched
      }) => (

        <View style={styles.container}>
          {/* todo: show possible errors here */}
          {errors.email && touched.email && (<Text style={styles.error}>{errors.email}</Text>)}
          <View style={styles.inputWithIcon}>
            <TextInput style={styles.input}
              placeholder='Ingrese email...'
              placeholderTextColor={'darkslategray'}
              onChangeText={handleChange('email')}
              name="email"
              value={values.email}
              textAlignVertical='bottom'
            />
            <MaterialIcons name='alternate-email' size={24} />
          </View>

          {errors.password && touched.password && (<Text style={styles.error}>{errors.password}</Text>)}
          <View style={styles.inputWithIcon}>

            <TextInput style={styles.input}
              placeholder='Ingrese contraseña...'
              placeholderTextColor={'darkslategray'}
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
          <TouchableHighlight style={isNewUser ? [styles.button, styles.bgMistyRose] : [styles.button, styles.bgPowderBlue]} onPress={handleSubmit}>
            {isNewUser ?
              <Text style={[styles.buttonText]}>Crear cuenta</Text>
              :
              <Text style={[styles.buttonText]}>Ingresar</Text>
            }
          </TouchableHighlight>

          <TouchableHighlight style={[styles.button, styles.bgBurlywood]} onPress={() => setIsNewUser((prev => !prev))
          } >
            {isNewUser ?
              <Text style={styles.buttonText}>Ya tengo una cuenta</Text>
              :
              <Text style={styles.buttonText}>Quiero crear una cuenta</Text>
            }
          </TouchableHighlight>
        </View>
      )}
    </Formik>
  )

}

export default Form