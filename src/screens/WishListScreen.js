import React, { useEffect } from 'react'
import { SafeAreaView, View, Text, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import HeraderComponent from "../components/HeaderComponent";
import BottomTabComponent from "../components/BottomTabComponent";
import colors from "../constants/colors";
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import wishlistAction from '../store/actions/wishlist';
import cartAction from '../store/actions/cart';
import qtyAction from '../store/actions/qty';

const width = Dimensions.get('screen').width

const WishListScreen = ({ navigation, route }) => {
    const products = useSelector(state => state.WishList)
    const dispatch = useDispatch()

    useEffect(() => {
        async function getWishListProducts() {
            let wishListData = await AsyncStorage.getItem('wishlist')
            let prods = JSON.parse(wishListData)

            if (prods == null) {
                AsyncStorage.setItem('wishlist', JSON.stringify([]))
                dispatch(wishlistAction.addToWishList([]))
            } else {
                AsyncStorage.setItem('wishlist', JSON.stringify(prods))
                dispatch(wishlistAction.addToWishList(prods))
            }
        }

        getWishListProducts()
    }, [])

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

    const removeWishListItem = (item) => {
        AsyncStorage.getItem('wishlist').then((data) => {
            let wishlistData = JSON.parse(data)
            let leftWishList = [];
            if (wishlistData != null) {
                leftWishList = wishlistData.filter(prod => prod._id != item._id)
            }
            dispatch(wishlistAction.addToWishList(leftWishList))
            AsyncStorage.setItem('wishlist', JSON.stringify(leftWishList))
        })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeraderComponent navigation={navigation} title="Wish List" iconName="back"  parentScreenName="Profile"/>
            {products?.length > 0 ? <View style={{ flex: 1, paddingHorizontal: 18 }}>
                {
                    products?.length > 0 && <View style={{ alignItems: 'flex-end' }}>
                        <TouchableOpacity onPress={() => {
                            AsyncStorage.removeItem('wishlist')
                            dispatch(wishlistAction.addToWishList([]))
                        }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.primaryColor }}>Remove All</Text>
                        </TouchableOpacity>
                    </View>
                }
                <FlatList
                    data={products}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', {
                                product: item,
                                parentScreen: 'WishList'
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
                                <TouchableOpacity onPress={() => removeWishListItem(item)} style={{ position: 'absolute', top: -5, right: -2 }}>
                                    <Image source={require('../../assets/images/icons/minus.png')} style={{ width: 30, height: 30 }} />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />

            </View> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>
                    There is no wishlist data!
                </Text></View>}
            {/* <BottomTabComponent navigation={navigation} screenName="Profile" /> */}
        </SafeAreaView>
    )
}

export default WishListScreen