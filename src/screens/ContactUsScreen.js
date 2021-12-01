import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, Image } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import color from '../constants/colors'

const arr = [
  "Mobile Software Development Training Center",
  "Practice and apply knowledge faster in real-world scenarios with projects and interactive courses.",
  "Curate and share Pluralsight content to reach your learning goals faster.",
  "We help you quickly and easily experiment, build UIs, add features, and fix bugs faster."
]

const AboutUsScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent title="About Us" navigation={navigation} menu="back" />
      <View style={styles.content}>
        <View style={styles.aboutUsContainer}>
          <Image style={styles.aboutUsImg}
            source={require('../../assets/images/icons/contact.png')} />
          <Text style={styles.aboutUsText}>Contact Us</Text>
        </View>

        {
          arr.map((item, index) => {
            return (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10, marginTop: 10, }}>
                <View style={{ width: 20, height: 20, backgroundColor: color.primaryColor }}></View>
                <Text style={{ flex: 1, marginLeft: 15, fontSize: 16, color: color.darkGray }}>{item}</Text>
              </View>
            )
          })
        }

      </View>
    </SafeAreaView>
  )
}

export default AboutUsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1
  },
  aboutUsContainer: {
    backgroundColor: color.primaryColor,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  aboutUsImg: {
    width: 80,
    height: 80
  },
  aboutUsText: {
    color: color.white,
    fontSize: 20,
    fontWeight: 'bold'
  },
})