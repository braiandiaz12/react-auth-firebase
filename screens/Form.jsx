//Firebase imports
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
const app = initializeApp(firebaseConfig)
const auth = getAuth()
//
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Pressable, TouchableHighlight, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { loginValidationSchema } from '../validation/validationSchema';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { styles } from '../styles/styles';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import UserCtx from '../userCtx';

const Form = () => {
  const navigation = useNavigation()
  const { user, setUser } = useContext(UserCtx)
  const [isVisible, setIsVisible] = useState(false)
  const [isNewUser, setIsNewUser] = useState(false)
  const [initializing, setInitializing] = useState(true)

  //handling user state change 
  const stateChange = (user) => {
    setUser((prev) => prev = user)
    if (initializing) setInitializing(prev => prev = false)
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(stateChange)
    return subscriber //unsubscribe on unmount
  }, [])

  const handleRegister = (values) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(userCredentials => {
        console.log(userCredentials);
        setUser(prev => ({ ...prev, email: values.email }))
        storeUser(values.email)
      })
      .catch(err => console.log(err))
  }

  const handleLogin = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(userCredentials => {
        console.log(userCredentials);
        setUser(prev => ({ ...prev, email: values.email }))
        storeUser(values.email)
      })
      .catch(err => console.log(err))

  }

  const storeUser = async (user) => {
    try {
      const userEmail = JSON.stringify(user)
      AsyncStorage.setItem('email', userEmail)
    } catch (err) {
      console.log(err);
    }
  }


  if (initializing) return <ActivityIndicator />

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
          <TouchableHighlight onPress={() => navigation.navigate("ForgotPassword")} style={[styles.button, styles.bgRebeccaPurple]}>
            <Text style={[styles.buttonText, styles.textLight]}>Forgot password</Text>
          </TouchableHighlight>
        </View>
      )}
    </Formik>
  )

}

export default Form