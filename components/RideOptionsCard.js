import React, { useState  } from 'react'
import { SafeAreaView,StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { Icon, Image } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native'
import { useNavigation} from '@react-navigation/core'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'
import Intl from 'intl'
import 'intl'
import 'intl/locale-data/jsonp/en-IN'

const data = [
    {
        id:'Uber-X-123',
        title: 'Uber Go',
        multiplier: 0.8,
        image:"https://links.papareact.com/3pn",

    },
    {
        id:'Uber-XL-456',
        title: 'Uber Select',
        multiplier: 1.2,
        image:"https://links.papareact.com/5w8",

    },
    {
        id:'Uber-LUX-1789',
        title: 'Uber XL',
        multiplier: 1.75,
        image:"https://links.papareact.com/7pf",

    },
]

const SURGE_CHARGE_RATE = 18;

const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation)

    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
            <Text style={tw`text-center py-5 text-lg font-bold`}>Select a Ride - {travelTimeInformation?.distance?.text} </Text>
            <TouchableOpacity onPress={()=> navigation.navigate('NavigateCard')}
            style={[tw`absolute top-3 left-5 p-3 rounded-full`]}>
                <Icon name='chevron-left' type='fontawesome'/>
           
            </TouchableOpacity>
           
            </View>
            <FlatList
            data={data} keyExtractor={(item) => item.id}
            renderItem={({item: { id,title,multiplier, image}, item})=> (
                <TouchableOpacity 
                onPress={()=> setSelected(item)}
                style={tw`-ml-2 flex-row justify-between items-center px-10  ${id === selected?.id && 'bg-gray-200'}`}>
                    
                    <Image
                    style={{
                        width:90,
                        height:90,
                        resizeMode:'contain'
                    }}
                    source={{uri: image}}
                    />
                    <View style={tw`-ml-2`}>
                        <Text style={tw`text-sm font-bold`}>{title}</Text>
                        <Text style={tw`text-xs`}>{travelTimeInformation?.duration?.text}</Text>
                    </View>
                    <Text style={tw`text-sm font-bold`}>
                        {new Intl.NumberFormat('en-IN', {
                            style:'currency',
                            currency:'INR'
                        }).format(
                            (travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * multiplier) / 100

                        )}
                    </Text>
                </TouchableOpacity>
            )}
            />
            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity 
                disabled={!selected}
                style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}>
                    <Text style={tw`text-center text-white text-lg`}>Choose {selected?.title}</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

export default RideOptionsCard

const styles = StyleSheet.create({})
