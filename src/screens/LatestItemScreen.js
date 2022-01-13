import React, {useEffect, useState} from 'react'
import { SafeAreaView, View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import color from '../constants/colors'
const width = Dimensions.get('screen').width
const LatestItemScreen = ({ navigation, route }) => {
    const [latestProducts, setLatestproducts] = useState([])

    useEffect(() => {
        const getLatestProductList = async () => {
            const resp = await fetch('https://mobidevzoneshopapi.herokuapp.com/api/products')
            const latestList = await resp.json()
            setLatestproducts(latestList)
        }

        getLatestProductList()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderComponent navigation={navigation} menu="back" title="Latest Items" />
            <View style={{ flex: 1 }}>
                <FlatList
                    numColumns={2}
                    data={latestProducts}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.cardCtn}>
                                <View style={styles.imgCtn}>
                                    <View style={{ width: 100, height: 80 }}>
                                    <Image source={{ uri: item.imgUrl }} resizeMode="cover" style={{
                                        width: "100%", height: "100%",
                                        borderRadius: 10
                                    }} />
                                    </View>

                                    <Text style={styles.prodNameTxt}>{item.productName}</Text>
                                    <Text style={styles.priceTxt}>{item.price} MMK</Text>

                                    <View style={styles.qtyContainer}>
                                        <Image style={styles.increaseIcon} source={require('../../assets/images/icons/minus.png')} />
                                        <Text style={styles.qtyText}>1</Text>
                                        <Image style={styles.increaseIcon} source={require('../../assets/images/icons/plus.png')} />
                                    </View>
                                </View>
                                <View style={styles.addToCartCtn}>
                                    <Text style={{ color: color.white }}>Add to Cart</Text>
                                </View>
                            </View>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </SafeAreaView>
    )
}

export default LatestItemScreen

const styles = StyleSheet.create({
    qtyContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
    increaseIcon: { width: 30, height: 30, tintColor: color.primaryColor },
    qtyText: { marginHorizontal: 10, fontSize: 16, color: color.darkGray, fontWeight: 'bold' },
    cardCtn: { width: width / 2 - 20, backgroundColor: color.white, margin: 10 },
    imgCtn: { flex: 1, alignItems: 'center', padding: 10, justifyContent: 'center' },
    prodNameTxt: { textAlign: 'center', marginTop: 10, color: color.darkGray, fontSize: 16, fontWeight: 'bold' },
    priceTxt: { textAlign: 'center', marginTop: 10, color: color.darkGray, fontSize: 14 },
    addToCartCtn: { backgroundColor: color.primaryColor, justifyContent: 'center', alignItems: 'center', padding: 10 },

})
