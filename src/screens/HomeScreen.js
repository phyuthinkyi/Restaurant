import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import HeraderComponent from "../components/HeaderComponent";
import BottomTabComponent from "../components/BottomTabComponent";
import colors from "../constants/colors";
import {useDispatch} from 'react-redux'
import cartAction from "../store/actions/cart";
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get('screen').width
//https://mobidevzoneshopapi.herokuapp.com/api/products

const HomeScreen = ({ navigation, route }) => {
    const [products, setProducts] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        // fetch('https://mobidevzoneshopapi.herokuapp.com/api/products')
        //     .then((response) => response.json())
        //     .then((prods) => {
        //         console.log("Products Data...", prods)
        //         setProducts(prods)
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });

        const getProductList = async () => {
            const response  = await fetch('https://mobidevzoneshopapi.herokuapp.com/api/products')
            const resData = await response.json()  
             setProducts(resData)
        }

        getProductList()

    }, [])

    const saveToCart = (item) => {
        item.qty = 1
        AsyncStorage.getItem('cart').then((res) => {
            console.log("Cart Data form Async...", res)
            let cartProducts = JSON.parse(res)
            let products = []
            if(res == null){
                products.push(item)
                AsyncStorage.setItem('cart', JSON.stringify(products))
                dispatch(cartAction.addToCart(products))
            }else{
                // cartData.push(product)
                // AsyncStorage.setItem('cart', JSON.stringify(cartData))
                // dispatch(cartAction.addToCart(cartData))

                //cartProducts
                let isInCart = null
                for(let i = 0; i < cartProducts.length; i++){
                    if(cartProducts[i]._id == item._id){
                        cartProducts[i].qty += 1
                        isInCart = item._id
                    }
                }
                if(isInCart == null){
                    cartProducts.push(item)
                    AsyncStorage.setItem('cart', JSON.stringify(cartProducts))
                    dispatch(cartAction.addToCart(cartProducts))
                }else{
                    AsyncStorage.setItem('cart', JSON.stringify(cartProducts))
                    dispatch(cartAction.addToCart(cartProducts))
                }
            }

        })
        console.log("Selected Product...", item)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeraderComponent navigation={navigation} title="Home" iconName="menu" />
            <View style={{ flex: 1, paddingHorizontal: 18 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.primaryColor }}>Popular Items</Text>
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
            <BottomTabComponent navigation={navigation} screenName="Home" />
        </SafeAreaView>
    )
}


export default HomeScreen;