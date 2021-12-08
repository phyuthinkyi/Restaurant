import React from 'react'
import { SafeAreaView, View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import color from '../constants/colors'
const width = Dimensions.get('screen').width

const ProductDetailScreen = ({ navigation, route }) => {
  console.log("Route Data..", route)
  let {product} = route.params
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent navigation={navigation} title="Product Detail" menu="back" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.context}>
          <View
            style={styles.imgContainer}>
            <Image source={{uri: product.imgUrl}}
              style={styles.img} />
          </View>

          <View style={styles.cardContainer}>
            <View style={styles.addToCartContainer}>
              <Text style={styles.title}>{product.productName}</Text>
              <Image style={styles.heatIcon} source={require('../../assets/images/icons/heart.png')} />
            </View>
            <View style={styles.priceContainer}>
             { !product.discount == 0 && <Text style={styles.normalPriceText}>{product.price} MMK</Text>}
              <Text style={styles.discPrice}>{product.price - product.discount} MMK</Text>
            </View>
          </View>

          <View style={[styles.addToCartContainer, styles.cardContainer]}>
            <View style={styles.qtyContainer}>
              <Image style={styles.increaseIcon} source={require('../../assets/images/icons/minus.png')} />
              <Text style={styles.qtyText}>1</Text>
              <Image style={styles.increaseIcon} source={require('../../assets/images/icons/minus.png')} />
            </View>
            <View style={styles.btnCartContainer}>
              <Text style={styles.cartText}>Add to Cart</Text>
            </View>
          </View>

          <View style={styles.cardContainer}>
            <Text style={styles.descTitle}>Description</Text>
            <Text style={styles.descText}>{product.description}</Text>
            <Text style={styles.descText}>{product.description}</Text>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProductDetailScreen

const styles = StyleSheet.create({
  container: { flex: 1 },
  context: { flex: 1, paddingBottom: 10 },
  imgContainer: { width: '100%', height: 2 / 3 * width },
  img: { width: '100%', height: '100%', resizeMode: 'cover' },
  cardContainer: { backgroundColor: color.white, borderRadius: 10, padding: 15, marginTop: 15, marginHorizontal: 15 },
  title: { flex: 1, color: color.primaryColor, fontSize: 18, fontWeight: 'bold' },
  heatIcon: { width: 25, height: 25, tintColor: color.primaryColor },
  priceContainer: { flexDirection: 'row', marginTop: 10 },
  normalPriceText: { marginRight: 10, color: color.darkGray, fontSize: 16, textDecorationLine: 'line-through' },
  discPrice: { color: color.darkGray, fontSize: 16 },
  descTitle: { fontSize: 18, color: color.darkGray, fontWeight: 'bold' },
  descText: { fontSize: 14, color: color.darkGray, marginTop: 5 },
  addToCartContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  qtyContainer: { flexDirection: 'row', alignItems: 'center' },
  increaseIcon: { width: 30, height: 30, tintColor: color.primaryColor },
  qtyText: { marginHorizontal: 10, fontSize: 16, color: color.darkGray, fontWeight: 'bold' },
  btnCartContainer: { backgroundColor: color.primaryColor, borderRadius: 5, paddingVertical: 3, paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center' },
  cartText: { color: color.white, fontSize: 16, fontWeight: 'bold' },
})