import React, { useState, useEffect } from 'react'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { View, TouchableOpacity, Text, Image, StyleSheet, Dimensions, Modal } from 'react-native'
import colors from '../constants/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useDispatch, useSelector} from 'react-redux'
import loginAction from '../store/actions/login'

const DrawerCustomComponent = (props) => {
  const [showDialog, setShowDialog] = useState(false)
  //const [user, setUser] = useState(null)
  // AsyncStorage.getItem('loginuser').then(res => {
  //   let user = JSON.parse(res);
  //   if(user != null){
  //     setUser(user)
  //   }
  // })

  const dispatch = useDispatch()
  const logoutHandle = (props) => {
    AsyncStorage.removeItem('loginuser')
    dispatch(loginAction.login(null))
    props.navigation.navigate('Login')
    setShowDialog(false)
  }

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.profImgContainer}>
            <Image source={require('../../assets/images/profile.jpeg')} style={styles.profImg} />
          </View>
          <Text style={styles.profLabel}>Name</Text>
          <Text style={styles.profLabel}>09798882724</Text>
        </View>

        <TouchableOpacity onPress={() => props.navigation.navigate('Home')} style={styles.itemContainer}>
          <Image source={require('../../assets/images/icons/home.png')} style={styles.itemImg} />
          <Text style={styles.itemLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('Order')} style={styles.itemContainer}>
          <Image source={require('../../assets/images/icons/order.png')} style={styles.itemImg} />
          <Text style={styles.itemLabel}>Order List</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('LatestItem')} style={styles.itemContainer}>
          <Image source={require('../../assets/images/icons/latest_item.png')} style={styles.itemImg} />
          <Text style={styles.itemLabel}>Latest Items</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('HottestItem')} style={styles.itemContainer}>
          <Image source={require('../../assets/images/icons/hottest_item.png')} style={styles.itemImg} />
          <Text style={styles.itemLabel}>Hottest Items</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity onPress={() => props.navigation.navigate('AboutUs')} style={styles.itemContainer}>
          <Image source={require('../../assets/images/icons/about_us.png')} style={styles.itemImg} />
          <Text style={styles.itemLabel}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('ContactUs')} style={styles.itemContainer}>
          <Image source={require('../../assets/images/icons/contact_us.png')} style={styles.itemImg} />
          <Text style={styles.itemLabel}>Contact Us</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity onPress={() => {
          props.navigation.closeDrawer()
          setShowDialog(true)
        }} style={styles.itemContainer}>
          <Image source={require('../../assets/images/icons/logout.png')} style={styles.itemImg} />
          <Text style={styles.itemLabel}>Logout</Text>
        </TouchableOpacity>

        <Modal animationType="none" transparent={true} visible={showDialog} >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Please Come Back Soon!</Text>
              <Text style={styles.existText}>Are you sure want to exit?</Text>

              <View style={styles.modalBtnContainer}>
                <TouchableOpacity onPress={() => logoutHandle(props)} style={styles.modalBtn}>
                  <Text style={styles.modalBtnText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowDialog(false)}
                  style={styles.modalBtn}>
                  <Text style={styles.modalBtnText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>

    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profileContainer: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#C95227', padding: 18 },
  profImgContainer: { width: 80, height: 80, borderRadius: 40 },
  profImg: { width: '100%', height: '100%', borderRadius: 40 },
  profLabel: { fontWeight: '700', marginTop: 8, fontSize: 18, color: '#fff', textAlign: 'center' },
  itemContainer: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  itemImg: { width: 25, height: 25, tintColor: '#C95227' },
  itemLabel: { marginLeft: 8, fontSize: 16, color: '#6b6c6e', fontWeight: 'bold' },
  divider: {
    width: Dimensions.get('screen').width / 3,
    marginVertical: 15,
    height: 2,
    marginLeft: 30,
    backgroundColor: '#C95227'
  },
  modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: colors.white, padding: 20, width: '90%', borderRadius: 10 },
  modalTitle: { fontSize: 20, color: colors.primaryColor, fontWeight: 'bold', textAlign: 'center' },
  existText: { marginTop: 8, fontSize: 16, color: colors.darkGray, textAlign: 'center' },
  modalBtnContainer: { marginTop: 20, width: '100%', flexDirection: 'row', justifyContent: 'space-between' },
  modalBtn: { borderRadius: 10, width: '45%', backgroundColor: colors.primaryColor, justifyContent: 'center', alignItems: 'center', paddingVertical: 7 },
  modalBtnText: { color: colors.white, fontWeight: 'bold', fontSize: 16 },

})

export default DrawerCustomComponent