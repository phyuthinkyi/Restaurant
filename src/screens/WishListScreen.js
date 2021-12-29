import React from 'react'
import { SafeAreaView, View, Text, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import HeraderComponent from "../components/HeaderComponent";
import BottomTabComponent from "../components/BottomTabComponent";
import colors from "../constants/colors";
import {useSelector, useDispatch} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import wishlistAction from '../store/actions/wishlist';
import cartAction from '../store/actions/cart';
import qtyAction from '../store/actions/qty';

const width = Dimensions.get('screen').width

const WishListScreen = ({navigation, route}) => {
    const products = useSelector(state => state.WishList)
    const dispatch =  useDispatch()

    const saveToCart = (item) => {
        item.qty = 1
        AsyncStorage.getItem('cart').then((res) => {
            console.log("Cart Data form Async...", res)
            let cartProducts = JSON.parse(res)
            let products = []
            if (cartProducts == null) {
                products.push(item)
                AsyncStorage.setItem('cart', JSON.stringify(products))
                dispatch(cartAction.addToCart(products))
                AsyncStorage.setItem('cartQty', JSON.stringify(1))
                dispatch(qtyAction.setTotalQty(1))
            } else {
                let isInCart = null
                let totQty = item.qty;
                for (let i = 0; i < cartProducts.length; i++) {
                    totQty += cartProducts[i].qty
                    if (cartProducts[i]._id == item._id) {
                        cartProducts[i].qty += 1
                        isInCart = item._id
                    }
                }
                if (isInCart == null) {
                    cartProducts.push(item) 
                } 
                AsyncStorage.setItem('cart', JSON.stringify(cartProducts))
                dispatch(cartAction.addToCart(cartProducts))
                AsyncStorage.setItem('cartQty', JSON.stringify(totQty))
                dispatch(qtyAction.setTotalQty(totQty))

            }

        })
    }

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <HeraderComponent navigation={navigation} title="Wish List" iconName="back" />
        <View style={{ flex: 1, paddingHorizontal: 18 }}>
          <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={() => {
            AsyncStorage.removeItem('wishlist')
            dispatch(wishlistAction.addToWishList([]))
          }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.primaryColor }}>Remove All</Text>
          </TouchableOpacity>
          </View>
            <FlatList
                data={products}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', {
                            product: item
                        })} key={index} style={{
                            flexDirection: 'row', backgroundColor: colors.white, borderRadius: 10,
                            padding: 16, marginTop: 15
                        }}>
                            <View style={{
                                width: width / 4 + 10, height: width / 4 + 10, borderRadius: 10,
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Image source={{ uri: item.imgUrl }} resizeMode="cover" style={{
                                    width: "100%", height: "100%",
                                    borderRadius: 10
                                }} />
                            </View>
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <Text style={{ fontSize: 20, color: colors.darkGray, fontWeight: 'bold' }}>{item.productName}</Text>
                                <Text style={{ fontSize: 14, color: colors.primaryColor, marginTop: 5 }}>(Made in Myanmar)</Text>
                                <Text style={{ marginTop: 15, fontSize: 16, color: colors.primaryColor }}>{item.price}</Text>
                            </View>
                            <TouchableOpacity onPress={() => saveToCart(item)} style={{
                                borderTopLeftRadius: 10, borderBottomRightRadius: 10, paddingVertical: 8,
                                paddingHorizontal: 25, position: 'absolute', bottom: 0, right: 0,
                                backgroundColor: colors.primaryColor, justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Text style={{ color: colors.white, fontSize: 14, fontWeight: 'bold' }}>Add To Cart</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
            />

        </View>
        {/* <BottomTabComponent navigation={navigation} screenName="Profile" /> */}
    </SafeAreaView>
)
}

export default WishListScreen