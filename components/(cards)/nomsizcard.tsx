import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { HomeCard } from '@/type/card/homeCard'


const Nomsizcard:React.FC<HomeCard> = ({img, title, description}) => {
  return (
    <View style={[tw`items-center`, {backgroundColor: "#B9B9C9"}]}>
        <View>
            <Image style={[tw`w-3/12 rounded-full`, {height: 80}]} source={require("../../assets/images/favicon.png")}/>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
            {/* <Image style={[tw`w-full`]} source={{uri: ("https://images.uzmovi.com/2023-12-03/8720ad888885004d0faba6a256bcd525.jpg")}}/> */}
        </View>
      <Text>salom</Text>
      <Text>salomlar</Text>
    </View>
  )
}

export default Nomsizcard

const styles = StyleSheet.create({
})