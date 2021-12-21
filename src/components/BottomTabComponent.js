import React, {useEffect} from "react";
import { View, TouchableOpacity, Text, Image, Dimensions, StyleSheet } from 'react-native'
import colors from "../constants/colors";
import {useSelector, useDispatch} from 'react-redux'
import qtyAction from "../store/actions/qty";
import AsyncStorage from "@react-native-async-storage/async-storage";
const width = Dimensions.get('screen').width

const BottomTabComponent = ({ navigation, screenName }) => {
  const qty = useSelector(state => state.Qty)
  const dispatch = useDispatch()

  useEffect(() => {
    
   async function getQty() {
      let qtyData = await AsyncStorage.getItem('cartQty')
      let qty = JSON.parse(qtyData)
      if(qty == null){
        dispatch(qtyAction.setTotalQty(0))
        AsyncStorage.setItem('cartQty', JSON.stringify(0))
      }else{
        dispatch(qtyAction.setTotalQty(qty))
        AsyncStorage.setItem('cartQty', JSON.stringify(qty))
      }
    }

    getQty()

  }, [navigation, qty])



  return (
    <View style={styles.bottomTabContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.bottomTabContent}>
        <Image source={require('../../assets/images/icons/home.png')}
          style={[styles.bottomTabIcon, { tintColor: screenName == "Home" ? '#C95227' : 'gray' }]} />
        <Text style={[styles.bottomTabTitle, { color: screenName == "Home" ? '#C95227' : 'gray' }]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.bottomTabContent}>
        <Image source={require('../../assets/images/icons/cart.png')}
          style={[styles.bottomTabIcon, { tintColor: screenName == "Cart" ? '#C95227' : 'gray' }]} />
        
      { qty != 0 &&  <View style={{
          position: 'absolute', top: -5, right: 0, marginTop: 5, borderRadius: 11,
          marginRight: width / 8 - 22, width: 22, height: 22, justifyContent: 'center', alignItems: 'center',
          backgroundColor: 'green'
        }}>
           <Text style={{ fontSize: 12, color: colors.white }}>{qty}</Text>
        </View>}
        <Text style={[styles.bottomTabTitle, { color: screenName == "Cart" ? '#C95227' : 'gray' }]}>Cart</Text>

      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Order')} style={styles.bottomTabContent}>
        <Image source={require('../../assets/images/icons/order.png')}
          style={[styles.bottomTabIcon, { tintColor: screenName == "Order" ? '#C95227' : 'gray' }]} />
        <Text style={[styles.bottomTabTitle, { color: screenName == "Order" ? '#C95227' : 'gray' }]}>Order</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.bottomTabContent}>
        <Image source={require('../../assets/images/icons/profile.png')}
          style={[styles.bottomTabIcon, { tintColor: screenName == "Profile" ? '#C95227' : 'gray' }]} />
        <Text style={[styles.bottomTabTitle, { color: screenName == "Profile" ? '#C95227' : 'gray' }]}>Profile</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomTabContainer: { height: 60, backgroundColor: '#fff', flexDirection: 'row' },
  bottomTabContent: { width: width / 4, justifyContent: 'center', alignItems: 'center' },
  bottomTabIcon: { width: 25, height: 25 },
  bottomTabTitle: { marginTop: 2, fontSize: 12, fontWeight: 'bold' }
})

export default BottomTabComponent