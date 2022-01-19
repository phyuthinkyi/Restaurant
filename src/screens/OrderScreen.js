import React, {useEffect, useState} from 'react'
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import BottomTabComponent from "../components/BottomTabComponent";
import color from '../constants/colors'

const order_list = [
  {
    date: '15 Jan 2021',
    order_no: 'S001',
    total: 25000
  },
  {
    date: '15 Jan 2021',
    order_no: 'S001',
    total: 25000
  },
  {
    date: '15 Jan 2021',
    order_no: 'S001',
    total: 25000
  },
  {
    date: '15 Jan 2021',
    order_no: 'S001',
    total: 25000
  },
  {
    date: '15 Jan 2021',
    order_no: 'S001',
    total: 25000
  },
  {
    date: '15 Jan 2021',
    order_no: 'S001',
    total: 25000
  },
  {
    date: '15 Jan 2021',
    order_no: 'S001',
    total: 25000
  },
  {
    date: '15 Jan 2021',
    order_no: 'S001',
    total: 25000
  },
  {
    date: '15 Jan 2021',
    order_no: 'S001',
    total: 25000
  },
  {
    date: '15 Jan 2021',
    order_no: 'S001',
    total: 25000
  },
  {
    date: '15 Jan 2021',
    order_no: 'S001',
    total: 25000
  },
  {
    date: '15 Jan 2021',
    order_no: 'S001',
    total: 25000
  }
]

const OrderListScreen = ({ navigation, route }) => {
  const [orderList, setOrderList] = useState([])
  console.log("Route Name....", route)

  useEffect(() => {
    const getOrderList = async () => {
      const response = await fetch('https://myshop-6c5af.firebaseio.com/orders.json');
      const resData  = await response.json()
      const list = [];
      for(const key in resData){
        list.push(resData[key])
      }
      setOrderList(list)
      //console.log("order list", list)
    }
    getOrderList()
  }, [])
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderComponent navigation={navigation} title="Order List" iconName="menu" />
      <View style={{ flex: 1, marginTop: 15 }}>
        <FlatList
          data={orderList}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity 
              onPress={() => {
                navigation.navigate('OrderDetail', {
                  selectedOrder: item
                })
              }}
              style={styles.orderCard}>
                <Text style={styles.date}>{item.orderDate}</Text>
                <Text style={styles.order_no}>{item.voucherNo}</Text>
                <View style={styles.totalContainer}>
                  <Text style={styles.totalText}>Total - {item.totalAmount} MMK</Text>
                
                  <View style={styles.rightArrowContainer}>
                    <Image style={styles.rightArrowIcon}
                      source={require('../../assets/images/icons/right_arrow.png')} />
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <BottomTabComponent navigation={navigation} screenName="Order" />
    </SafeAreaView>
  )
}

export default OrderListScreen

const styles = StyleSheet.create({
  orderCard: {
    padding: 10,
    backgroundColor: color.white,
    marginBottom: 5
  },
  date: {
    textAlign: 'right',
    color: color.darkGray,
    fontSize: 14
  },
  order_no: {
    color: color.darkGray,
    fontWeight: 'bold',
    fontSize: 18
  },
  totalContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  totalText: {
    fontSize: 18
  },
  rightArrowContainer: {
    width:25,
    height: 25,
    borderRadius: 15,
    backgroundColor: color.primaryColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightArrowIcon: {
    width: 18,
    height: 18,
    tintColor: color.white
  }
})