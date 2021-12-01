import React from "react";
import {SafeAreaView, View, Text, Touchable} from 'react-native'
import HeaderComponent from "../components/HeaderComponent";
import BottomTabComponent from "../components/BottomTabComponent";

const CartScreen = ({navigation, route}) => {
  return(
      <SafeAreaView style={{flex: 1}}>
          <HeaderComponent navigation={navigation} title="Cart" iconName="menu" />
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>Cart Screen</Text>
          </View>
          <BottomTabComponent navigation={navigation} screenName="Cart" />
      </SafeAreaView>
  )
}


export default CartScreen;