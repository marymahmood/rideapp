import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from '@env';
import tw from 'tailwind-react-native-classnames';
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import RideOptionsCard from '../components/RideOptionsCard';
import {  setOrigin } from '../slices/navSlice'
import NavFavourites from './NavFavourites';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation=useNavigation()

    return (
        <SafeAreaView style={tw`bg-white `}>
            <Text style={tw`text-center py-5 text-xl`}>Good Morning, Maryam</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <View>
                <GooglePlacesAutocomplete
                placeholder='Where to?'
                styles={toInputBoxStyles}
                fetchOrigin={true}
                fetchDetails={true}
                returnKeyType={'search'}
                minLength={2}
                onPress={(data, details = null)=>{
                    dispatch(
                        setDestination({
                        location:details.geometry.location,
                        description: data.description
                    }));
                    navigation.navigate('RideOptionsCard');
           
                }}
                enablePoweredByContainer={false}
                query={{
                    key:GOOGLE_MAPS_APIKEY,
                    language:'en'
                }}
                nearbyPlacesAPI="GooglePlacesSearch"
                debounce={400}
                />
                </View>
                <NavFavourites/>

            </View>
            <View style={tw`flex-row justify-evenly py-2 border-t border-gray-100`}>
                <TouchableOpacity 
                style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
                onPress={()=> navigation.navigate("RideOptionsCard")}
                >
                    <Icon name='car' type='font-awesome' color='white' size={16}/>
                    <Text style={tw`text-white text-center`}>Rides</Text>

                </TouchableOpacity>
                <TouchableOpacity style={tw`flex flex-row justify-between w-24 px-4 py-3`}>
                    <Icon name='cutlery' type='font-awesome' color='black' size={16}/>
                    <Text style={tw`text-black text-center`}>Eats</Text>

                </TouchableOpacity>
                
            </View>
            
        </SafeAreaView>
    )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 20,
        flex:0,
    },
    textInput: {
        backgroundColor: '#DDDDDF',
        borderRadius: 0,
        fontSize: 10,

    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom:0,
    }

})
