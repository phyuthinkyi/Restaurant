import React,{useState, useEffect} from 'react'
import { SafeAreaView, View, Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import color from '../constants/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'

// const arr = [
//   "Mobile Software Development Training Center",
//   "Practice and apply knowledge faster in real-world scenarios with projects and interactive courses.",
//   "Curate and share Pluralsight content to reach your learning goals faster.",
//   "We help you quickly and easily experiment, build UIs, add features, and fix bugs faster."
// ]

// https://myshop-6c5af.firebaseio.com/aboutus.json
// https://myshop-6c5af.firebaseio.com/contactus.json

const AboutUsScreen = ({ navigation, route }) => {
  const [data, setData] = useState("")
  const [collectData, setCollectData] = useState("")
  const [aboutUs, setAboutUs] = useState([])

  useEffect(() => {
    const getAboutUs = async () => {
      const response = await fetch('https://myshop-6c5af.firebaseio.com/aboutus.json')
      const resData =  await  response.json();
      //console.log("About Us Data...", resData);
      
      const list = [];
      for(const key in resData){
        list.push(resData[key])
      }
      setAboutUs(list)

    }
    getAboutUs()
  }, [])

  const saveToAsycStorage = (data) => {
    console.log("DATA is", data)
    AsyncStorage.setItem('name', JSON.stringify(data))
  }

  const getDataFromAsyncStorage = async () => {
      const res = await AsyncStorage.getItem('name')
      const collData = JSON.parse(res)

      console.log("Data..", collData)
      setCollectData(collData)
  }

  const removeDataFromAsyncStorage  =  () => {
    AsyncStorage.removeItem('name')
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent title="About Us" navigation={navigation} iconName="menu" />
      <View style={styles.content}>
        <View style={styles.aboutUsContainer}>
          <Image style={styles.aboutUsImg}
            source={require('../../assets/images/icons/contact.png')} />
          <Text style={styles.aboutUsText}>Contact Us</Text>
        </View>

        {/* <View style={{padding: 20}}>
            <TextInput
                style={{height: 45, borderColor:'#000', borderWidth: 1}}
                onChangeText={text => setData(text)}
            />
            <TouchableOpacity onPress={() => {
                saveToAsycStorage(data)
            }}  style={{marginVertical: 20, paddingVertical: 8, paddingHorizontal: 18,  justifyContent:  'center', alignItems: 'center',backgroundColor: '#33aacc'}}>
              <Text>Save to Async Storage</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                getDataFromAsyncStorage()
            }}  style={{marginVertical: 20, paddingVertical: 8, paddingHorizontal: 18,  justifyContent:  'center', alignItems: 'center',backgroundColor: '#33aacc'}}>
              <Text>Get Data from Async Storage</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                removeDataFromAsyncStorage()
            }}  style={{marginVertical: 20, paddingVertical: 8, paddingHorizontal: 18,  justifyContent:  'center', alignItems: 'center',backgroundColor: '#33aacc'}}>
              <Text>Remove Data from Async Storage</Text>
            </TouchableOpacity>
            <Text style={{marginVertical: 15}}>{collectData}</Text>
        </View> */}

        {
          aboutUs.map((item, index) => {
            return (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10, marginTop: 10, }}>
                <View style={{ width: 20, height: 20, backgroundColor: color.primaryColor }}></View>
                <Text style={{ flex: 1, marginLeft: 15, fontSize: 16, color: color.darkGray }}>{item.description}</Text>
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