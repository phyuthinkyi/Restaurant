import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import colors from "../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch, useSelector} from 'react-redux'
import loginAction from "../store/actions/login";

const LoginScreen = ({ navigation, route }) => {
  const [username, setUserName] = useState('')
  const [pass, setPass] = useState('')
  const dispatch = useDispatch()

  const loginHandle = async () => {
    //console.log('Type Data...', username, 'and pass ', pass)
    const response = await fetch('https://mobidevzoneshopapi.herokuapp.com/api/users');
    const resData = await response.json();
    console.log('Res data..', resData);
    resData.map((res) => {
      if(res.username == username  && res.password == pass){
        AsyncStorage.setItem('loginuser', JSON.stringify(res))
        dispatch(loginAction.login(res))
        setUserName('')
        setPass('')
        navigation.navigate('Home')
      }
    })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
       <View style={{ flex: 1, padding: 18, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '100%' }}>
          <TextInput
            value={username}
            style={{ height: 50, borderWidth: 1, borderColor: colors.primaryColor, borderRadius: 5, paddingLeft: 10, }}
            placeholder="username"
            onChangeText={text => setUserName(text)}
          />
          <TextInput
            value={pass}
            style={{ marginTop: 10, height: 50, borderWidth: 1, borderColor: colors.primaryColor, borderRadius: 5, paddingLeft: 10 }}
            placeholder="password"
            onChangeText={text => setPass(text)}
          />

          <TouchableOpacity onPress={() => loginHandle()} style={{ marginTop: 10, height: 50, borderRadius: 5, justifyContent: 'center', 
          alignItems: 'center', backgroundColor: colors.primaryColor }}>
            <Text style={{ fontWeight: 'bold', color: colors.white }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen;