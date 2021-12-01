import React from 'react'
import { SafeAreaView, View, Text, Image, StyleSheet } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import color from '../constants/colors'

const ContactUsScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent navigation={navigation} menu="back" title="Contact Us" />
      <View style={styles.content}>
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