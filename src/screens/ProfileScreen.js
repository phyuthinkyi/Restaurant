import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Modal } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import BottomTabComponent from '../components/BottomTabComponent'
import color from '../constants/colors'
//https://myshop-6c5af.firebaseio.com/profile.json

const ProfileScreen = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [profileData, setProfileData] = useState({})

  useEffect(() => {
    const getProfileData = async () => {
      const response = await fetch('https://myshop-6c5af.firebaseio.com/profile.json')
      const resData = await response.json();
      console.log('Profile Data..', resData);
      let profileData = {}
      for(const key in resData){
        profileData = resData[key]
      }
      setProfileData(profileData)
      //console.log('Modified Profile Data....', profileData)
    }
    getProfileData()

  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderComponent navigation={navigation} title="Profile" iconName="menu" />
      <ScrollView style={{ marginBottom: 10 }} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          <View
            style={styles.userContainer}>
            <View style={styles.userImgContainer}>
              <Image style={styles.userImg} source={require('../../assets/images/profile.jpeg')} />
            </View>
            <Text style={styles.userInfo}>{profileData?.name} ({profileData?.school})</Text>
            <Text style={styles.userInfo}>{profileData?.phone}</Text>
          </View>

          <View style={styles.profileCard}>
            <View style={styles.phoneContainer}>
              <Text style={styles.phoneLabel}>Phone</Text>
              <Text style={styles.phoneValue}>{profileData?.phone}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.phoneContainer}>
              <Text style={styles.phoneLabel}>Email</Text>
              <Text style={styles.phoneValue}>{profileData?.email}</Text>
            </View>
          </View>

          <View style={styles.profileCard}>
            <Text style={styles.phoneLabel}>Address</Text>
            <Text style={{ marginTop: 10, fontSize: 16, color: color.darkGray }}>{profileData?.address}</Text>
          </View>

          <View style={styles.profileCard}>
            <TouchableOpacity onPress={() => {
              console.log("Click")
              navigation.navigate('Order')
            }} style={styles.labelContainer}>
              <Image style={styles.labelIcon}
                source={require('../../assets/images/icons/order.png')} />
              <Text style={styles.labelText}>My Order</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              console.log("Click")
              navigation.navigate('WishList')
            }} style={styles.labelContainer}>
              <Image style={{ width: 25, height: 30, tintColor: color.primaryColor }}
                source={require('../../assets/images/icons/heart.png')} />
              <Text style={styles.labelText}>My Wishlist</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setModalVisible(true)
            }} style={styles.labelContainer}>
              <Image style={styles.labelIcon}
                source={require('../../assets/images/icons/logout_circle.png')} />
              <Text style={styles.labelText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
     
      <Modal
        transparent={true}
        animationType="none "
        visible={modalVisible}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <View style={{ width: '95%', borderRadius: 10, padding: 15, backgroundColor: color.white, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: color.primaryColor, fontSize: 18, fontWeight: 'bold' }}>Come Back Soon!</Text>
            <Text style={{ fontSize: 16, color: color.darkGray, marginTop: 10 }}>Are you sure want to exit?</Text>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TouchableOpacity
                style={{ width: '40%', backgroundColor: color.primaryColor, padding: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                <Text style={{ color: color.white, fontWeight: 'bold' }}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: '40%', backgroundColor: color.primaryColor, padding: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                onPress={() => {
                    setModalVisible(false)
                }}
              >
                <Text style={{ color: color.white, fontWeight: 'bold' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <BottomTabComponent navigation={navigation} screenName="Profile" />
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  userContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: color.primaryColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  userImgContainer: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
  userImg: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
  userInfo: {
    marginTop: 5,
    color: color.white,
    fontSize: 16,
    textAlign: 'center'
  },
  profileCard: {
    marginHorizontal: 10,
    marginTop: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    justifyContent: 'center'
  },
  phoneContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  phoneLabel: {
    fontSize: 18,
    color: color.darkGray,
    fontWeight: 'bold'
  },
  phoneValue: {
    fontSize: 18,
    color: color.darkGray
  },
  divider: {
    marginVertical: 10,
    width: '100%', height: 1,
    backgroundColor: color.darkLight
  },
  labelContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  labelIcon: {
    width: 25,
    height: 25,
    tintColor: color.primaryColor
  },
  labelText: {
    marginLeft: 13,
    fontSize: 18,
    color: color.darkGray
  }
})