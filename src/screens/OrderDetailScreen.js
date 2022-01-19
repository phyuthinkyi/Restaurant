import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import color from '../constants/colors'

const OrderDetailScreen = ({ navigation, route }) => {
  console.log("Route Data Params..", route)
  let orderDetailData = route?.params?.selectedOrder
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderComponent navigation={navigation} title="Order Detail" iconName="back" parentScreenName="Order"/>
      <ScrollView>
        <View style={{ flex: 1, padding: 15 }}>
          <Text style={styles.textRight}>{orderDetailData.orderDate}</Text>
          <Text style={styles.textBold}>{orderDetailData.voucherNo}</Text>

          <View style={styles.titleRowContainer}>
            <Text style={[{ flex: 1 }, styles.textBold]}>Name</Text>
            <Text style={[{ width: '15%', textAlign: 'center' }, styles.textBold]}>Qty</Text>
            <Text style={[{ width: '20%' }, styles.textRightBold]}>Price</Text>
            <Text style={[{ width: '20%' }, styles.textRightBold]}>Total</Text>
          </View>
          <View style={styles.bigDivider} />
          {

            orderDetailData?.porducts.map((item, index) => {
              return (
                <View key={index}>
                  <View style={styles.titleRowContainer}>
                    <Text style={[{ flex: 1 }, styles.textNormal]}>{item.proudctName}</Text>
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
              <Text style={styles.textRightBold}>{orderDetailData.totalAmount}</Text>
              <Text style={styles.textRightBold}>{orderDetailData.tax}</Text>
              <Text style={styles.textRightBold}>{orderDetailData.delivery}</Text>
            </View>
          </View>
          <View style={styles.bigDivider} />
          <View style={styles.subTotalContainer}>
            <Text style={styles.textRightBold}>Total - </Text>
            <Text style={[styles.textRightBold, { marginLeft: 20 }]}>{orderDetailData.totalAmount + orderDetailData.tax + orderDetailData.delivery}</Text>
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