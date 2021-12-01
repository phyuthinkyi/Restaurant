import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, ScrollView, FlatList } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import color from '../constants/colors'

const orderDetailData = {
  date: '22 Jan 2021',
  order_no: 'S001',
  subTotal: 47500,
  tax: 1000,
  delivery: 2500,
  prodList: [{
    name: 'Burger (Made in Myanmar)',
    qty: 2,
    price: 1500,
  },
  {
    name: 'Grilled cheese with tomato',
    qty: 5,
    price: 30000,
  },
  {
    name: 'Pumpkin Soup',
    qty: 1,
    price: 5500,
  },
  {
    name: 'Grilled Cheese',
    qty: 2,
    price: 6000,
  },
  {
    name: 'Pumpkin Soup',
    qty: 4,
    price: 2000,
  },
  {
    name: 'Pumpkin Soup',
    qty: 2,
    price: 1500,
  },
  ]
}

const OrderDetailScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderComponent navigation={navigation} title="Order Detail" menu="back" />
      <ScrollView>
        <View style={{ flex: 1, padding: 15 }}>
          <Text style={styles.textRight}>{orderDetailData.date}</Text>
          <Text style={styles.textBold}>{orderDetailData.order_no}</Text>

          <View style={styles.titleRowContainer}>
            <Text style={[{ flex: 1 }, styles.textBold]}>Name</Text>
            <Text style={[{ width: '15%', textAlign: 'center' }, styles.textBold]}>Qty</Text>
            <Text style={[{ width: '20%' }, styles.textRightBold]}>Price</Text>
            <Text style={[{ width: '20%' }, styles.textRightBold]}>Total</Text>
          </View>
          <View style={styles.bigDivider} />
          {

            orderDetailData.prodList.map((item, index) => {
              console.log("Item", item)
              return (
                <View key={index}>
                  <View style={styles.titleRowContainer}>
                    <Text style={[{ flex: 1 }, styles.textNormal]}>{item.name}</Text>
                    <Text style={[{ width: '15%', textAlign: 'center' }, styles.textNormal]}>{item.qty}</Text>
                    <Text style={[{ width: '20%' }, styles.textRight]}>{item.price}</Text>
                    <Text style={[{ width: '20%' }, styles.textRight]}>{item.qty * item.price}</Text>
                  </View>
                  <View style={styles.smallDivider} />
                </View>

              )
            })
          }
          <View style={styles.subTotalContainer}>
            <View>
              <Text style={styles.textRightBold}>Sub Total -</Text>
              <Text style={styles.textRightBold}>Tax -</Text>
              <Text style={styles.textRightBold}>Delivery -</Text>
            </View>
            <View style={{ marginLeft: 20 }}>
              <Text style={styles.textRightBold}>{orderDetailData.subTotal}</Text>
              <Text style={styles.textRightBold}>{orderDetailData.tax}</Text>
              <Text style={styles.textRightBold}>{orderDetailData.delivery}</Text>
            </View>
          </View>
          <View style={styles.bigDivider} />
          <View style={styles.subTotalContainer}>
            <Text style={styles.textRightBold}>Total - </Text>
            <Text style={[styles.textRightBold, { marginLeft: 20 }]}>{orderDetailData.subTotal + orderDetailData.tax + orderDetailData.delivery}</Text>
          </View>
          <View style={[{ marginTop: 5 }, styles.bigDivider]} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default OrderDetailScreen

const styles = StyleSheet.create({
  textRight: { textAlign: 'right', color: color.darkGray, fontSize: 14 },
  textBold: { color: color.darkGray, fontSize: 18, fontWeight: 'bold', marginTop: 5 },
  textNormal: { color: color.darkGray, fontSize: 14 },
  titleRowContainer: { flexDirection: 'row', paddingLeft: 5, paddingVertical: 10, alignItems: 'center' },
  textRightBold: { textAlign: 'right', color: color.darkGray, fontSize: 18, fontWeight: 'bold', marginTop: 5 },
  bigDivider: { height: 2, backgroundColor: color.darkGray },
  smallDivider: { marginLeft: 5, height: 1, backgroundColor: color.darkGray },
  subTotalContainer: { flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 15 },
})