import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer'
import HomeScreen from '../screens/HomeScreen'
import CartScreen from '../screens/CartScreen'
import AboutUsScreen from '../screens/AboutUsScreen'
import ContactUsScreen from '../screens/ContactUsScreen'
import HottestItemScreen from '../screens/HottestItemScreen'
import LatestItemScreen from '../screens/LatestItemScreen'
import OrderScreen from '../screens/OrderScreen'
import OrderDetailScreen from '../screens/OrderDetailScreen'
import ProductDetailScreen from '../screens/ProductDetailScreen'
import ProfileScreen from '../screens/ProfileScreen'
import DrawerCustomComponent from './DarwerComponent'
import WishListScreen from '../screens/WishListScreen'
import LoginScreen from '../screens/LoginScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HomeClassScreen from '../screens/HomeClassScreen'
import NextClassScreen from '../screens/NextClassScreen'

const Drawer = createDrawerNavigator()

const Navigator = () => {
const [isUser, setIsUser] = useState(false)
AsyncStorage.getItem('loginuser').then(res => {
  let user = JSON.parse(res);
  if(user != null){
    setIsUser(true)
  }
})
  return (
    <NavigationContainer>
      <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
        drawerContent={(props) => <DrawerCustomComponent {...props}/>}>
        {/* {!isUser && <Drawer.Screen name="Login" component={LoginScreen} />} */}
        <Drawer.Screen name='HomeClass' component={HomeClassScreen} />
        <Drawer.Screen name='NextClass' component={NextClassScreen} />
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Cart" component={CartScreen} />
        <Drawer.Screen name="AboutUs" component={AboutUsScreen} />
        <Drawer.Screen name="ContactUs" component={ContactUsScreen} />
        <Drawer.Screen name="HottestItem" component={HottestItemScreen} />
        <Drawer.Screen name="LatestItem" component={LatestItemScreen} />
        <Drawer.Screen name="Order" component={OrderScreen} />
        <Drawer.Screen name="OrderDetail" component={OrderDetailScreen} />
        <Drawer.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="WishList" component={WishListScreen} />
      </Drawer.Navigator>

    </NavigationContainer>
  )
}

export default Navigator