import React, { useState } from 'react'
import { SafeAreaView, View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import color from '../constants/colors'
import { useDispatch, useSelector } from 'react-redux'
import dataAction from '../store/actions/data'

const ContactUsScreen = ({ navigation, route }) => {
  const [data, setData] = useState("") //
  const [prods, setProds] = useState([])//
  const dispatch = useDispatch()
  const collectData = useSelector(state => state.Data)

  console.log("Collect Data", collectData)
  const saveToState = (data) => {
    dispatch(dataAction.SaveData(data))
  }
  const changeState = () => {
    dispatch(dataAction.RemoveData())
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent navigation={navigation} menu="back" title="Contact Us" />
      <View style={styles.content}>

        {/* <View style={{ padding: 20 }}>
          <TextInput
            style={{ height: 45, borderColor: '#000', borderWidth: 1 }}
            onChangeText={text => setData(text)}
          />
          <TouchableOpacity onPress={() => {
            saveToState(data)
          }}
            style={{
              marginVertical: 20, paddingVertical: 8, paddingHorizontal: 18, justifyContent: 'center',
              alignItems: 'center', backgroundColor: '#33aacc'
            }}>
            <Text>Save to State</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            changeState()
          }} style={{
            marginVertical: 20, paddingVertical: 8, paddingHorizontal: 18,
            justifyContent: 'center', alignItems: 'center', backgroundColor: '#33aacc'
          }}>
            <Text>Remove Data from State</Text>
          </TouchableOpacity>
          <Text style={{ marginVertical: 15 }}>{collectData}</Text>
        </View> */}



        <View style={styles.contactUsContainer}>
          <Image style={styles.contactUsImg}
            source={require('../../assets/images/icons/contact.png')} />
          <Text style={styles.contactUsText}>Contact Us</Text>
        </View>
        <View style={styles.contactUsInfoContainer}>
          <Image style={styles.infoImg} 
          source={require('../../assets/images/icons/marker.png')} />
          <Text style={styles.infoText}>No.403, 4th Floor, Diamond Condo, Tower A, Kamayut Tsp, Yangon, Myanmar</Text>

          <Image style={styles.infoImg} 
          source={require('../../assets/images/icons/phone.png')} />
          <Text style={styles.infoText}>(+959) 9798882724</Text>

          <Image style={styles.infoImg} 
          source={require('../../assets/images/icons/email.png')} />
          <Text style={styles.infoText}>mobidevzonetech@gmail.com</Text>

          <Image style={styles.infoImg} 
          source={require('../../assets/images/icons/time.png')} />
          <Text style={styles.infoText}>Open Time - 9 : 00 AM</Text>
          <Text style={styles.infoText}>Close Time - 6 : 00 PM</Text>
        </View>

      </View>
    </SafeAreaView>
  )
}

export default ContactUsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1
  },
  contactUsContainer: {
    backgroundColor: color.primaryColor,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contactUsImg: {
    width: 80,
    height: 80
  },
  contactUsText: {
    color: color.white,
    fontSize: 20,
    fontWeight: 'bold'
  },
  contactUsInfoContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15
  },
  infoImg: {
    width: 30,
    height: 30,
    tintColor: color.primaryColor,
    marginTop: 20
  },
  infoText: {
    color: color.darkGray,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10
  }

})



