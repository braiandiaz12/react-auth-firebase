//Firebase imports
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
const app = initializeApp(firebaseConfig)
const auth = getAuth()
//fin firebase imports
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Pressable, TouchableHighlight, ActivityIndicator, Image, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { loginValidationSchema } from '../validation/validationSchema';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { styles } from '../styles/styles';
import UserCtx from '../userCtx';


const Form = () => {
  const navigation = useNavigation()
  const { user, setUser } = useContext(UserCtx)
  const [isVisible, setIsVisible] = useState(false)
  const [isNewUser, setIsNewUser] = useState(false)
  const [initializing, setInitializing] = useState(true)

  //Handlers
  
  const stateChange = (user) => {
    setUser((prev) => prev = user)
    if (initializing) setInitializing(prev => prev = false)
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(stateChange)
    return subscriber
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
          <Image source={require('../assets/backImage.png')} style={styles.backImage} />
          <View style={styles.whiteSheet} />
          {errors.email && touched.email && (<Text style={styles.error}>{errors.email}</Text>)}
          <SafeAreaView style={styles.form}>
            <Text style={styles.title}>ChatApp</Text>
            <View style={styles.inputWithIcon}>
              <TextInput style={styles.input}
                placeholder='Ingrese email...'
                placeholderTextColor={'darkslategray'}
                onChangeText={handleChange('email')}
                name="email"
                value={values.email}
                textAlignVertical='bottom'
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
              />
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
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              {isNewUser ?
                <Text style={[styles.buttonText]}>Crear cuenta</Text>
                :
                <Text style={[styles.buttonText]}>Ingresar</Text>
              }
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.bgBurlywood]} onPress={() => setIsNewUser((prev => !prev))
            } >
              {isNewUser ?
                <Text style={styles.buttonText}>Ya tengo una cuenta</Text>
                :
                <Text style={styles.buttonText}>Quiero crear una cuenta</Text>
              }
            </TouchableOpacity>
            <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
              <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }} onPress={() => navigation.navigate("ForgotPassword")}>Olvidé mi contraseña</Text>
            </View>
          </SafeAreaView>
          <StatusBar barStyle="light-content" />

        </View>
      )}
    </Formik>
  )

}

export default Form