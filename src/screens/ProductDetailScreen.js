import React, { useState } from 'react'
import { SafeAreaView, View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import color from '../constants/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import cartAction from '../store/actions/cart'
import qtyAction from '../store/actions/qty'
import wishlistAction from '../store/actions/wishlist'


const width = Dimensions.get('screen').width

const ProductDetailScreen = ({ navigation, route }) => {
  console.log("Route Data..", route)
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()
  let { product } = route.params


  const saveToCart = (item) => {
    item.qty = qty
    AsyncStorage.getItem('cart').then((res) => {
      let cartData = JSON.parse(res)
      let products = [];
      if (cartData == null) {
        products.push(item)
        AsyncStorage.setItem('cart', JSON.stringify(products))
        dispatch(cartAction.addToCart(products))

        AsyncStorage.setItem('cartQty', JSON.stringify(item.qty))
        dispatch(qtyAction.setTotalQty(item.qty))
      } else {
        let cartId = null
        let totQty = item.qty

        for (let i = 0; i < cartData.length; i++) {
          totQty += cartData[i].qty
          if (item._id == cartData[i]._id) {
            cartId = item._id
            cartData[i].qty += item.qty
          }
        }
        if (cartId == null) {
          cartData.push(item)
        }
        AsyncStorage.setItem('cart', JSON.stringify(cartData))
        dispatch(cartAction.addToCart(cartData))
        AsyncStorage.setItem('cartQty', JSON.stringify(totQty))
        dispatch(qtyAction.setTotalQty(totQty))
        setQty(1)
      }
    })

  }

  const addToWishList = (product) => {
    AsyncStorage.getItem('wishlist').then((res) => {
      const wishListData = JSON.parse(res)
      let products = []
      if(wishListData == null){
        products.push(product)
        
        dispatch(wishlistAction.addToWishList(products))
        AsyncStorage.setItem('wishlist', JSON.stringify(products))
      }else{
        let isWishListId = null
        for(let i=0; i<wishListData.length; i++){
          if(wishListData[i]._id == product._id){
              isWishListId = product._id
          }
        }

        console.log("Is ID null...?", isWishListId)
        if(isWishListId == null){
          wishListData.push(product)
        }

        AsyncStorage.setItem('wishlist', JSON.stringify(wishListData))
        dispatch(wishlistAction.addToWishList(wishListData))

      }
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent navigation={navigation} title="Product Detail" menu="back" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.context}>
          <View
            style={styles.imgContainer}>
            <Image source={{ uri: product.imgUrl }}
              style={styles.img} />
          </View>

          <View style={styles.cardContainer}>
            <View style={styles.addToCartContainer}>
              <Text style={styles.title}>{product.productName}</Text>
              <TouchableOpacity onPress={() => addToWishList(product)}>
                <Image style={styles.heatIcon} source={require('../../assets/images/icons/heart.png')} />
              </TouchableOpacity>
            </View>
            <View style={styles.priceContainer}>
              {!product.discount == 0 && <Text style={styles.normalPriceText}>{product.price} MMK</Text>}
              <Text style={styles.discPrice}>{product.price - product.discount} MMK</Text>
            </View>
          </View>

          <View style={[styles.addToCartContainer, styles.cardContainer]}>
            <View style={styles.qtyContainer}>
              <TouchableOpacity onPress={() => {
                if (qty > 1) {
                  setQty(qty - 1)
                }
              }}>
                <Image style={styles.increaseIcon} source={require('../../assets/images/icons/minus.png')} />
              </TouchableOpacity>
              <Text style={styles.qtyText}>{qty}</Text>
              <TouchableOpacity onPress={() => {
                setQty(qty + 1)
              }}>
                <Image style={styles.increaseIcon} source={require('../../assets/images/icons/plus.png')} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => saveToCart(product)} style={styles.btnCartContainer}>
              <Text style={styles.cartText}>Add to Cart</Text>
            </TouchableOpacity>
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