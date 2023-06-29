
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { RootStackParamList } from '../App';
import axios from 'axios'
 const CountryDetails =   ({route,navigation}:NativeStackScreenProps<RootStackParamList, "CountryDetails">)=> {
    const data= route.params?.data;
    const img = data[0]?.flags['png']
    console.log(data[0]?.capital[0])
    const HandleWeather  = async() => {
       const res = await axios.get('http://api.weatherstack.com/current?access_key=d9ad6e94a8f815a2c855d69119fbc2cd&query='+data[0]?.capital[0]);
       const val = await res.data
       console.log(val,'weather')
      navigation.navigate('WeatherDetails',{data: val})
    }
  return (
    <View style={styles.container}>     
    <View style={styles.Modalcontainer}>
          <Text style={{ padding: 10,marginTop: 10,fontSize:30 }}> {data[0]?.name?.common}</Text>
          <Text style={{ padding: 10, fontSize:20 }}> Capital : {data[0]?.capital[0]}</Text>
          <Text style={{ padding: 10,fontSize:20 }}> population : {data[0]?.population}</Text>
          <Text style={{ padding: 10,fontSize:20 }}> latitude : {data[0]?.latlng[0]} & Longitude : {data[0]?.latlng[1]}</Text>
          <Image style={{ width: 80, height: 50, margin: 20 }} source={{ uri: img }} />
        </View>
        <View >
            <TouchableOpacity style={styles.button1} onPress={HandleWeather} >
             <Text style={{ color: 'white',fontSize:16 }} >{data[0]?.capital[0] + "'s Weather"} </Text>
            </TouchableOpacity>
          </View>
        </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor:'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
    Modalcontainer:
    {
      backgroundColor: "white",
      alignItems: 'center',
      justifyContent: 'center',
      height: 300,
      width:'80%',
      borderRadius: 15,
      marginLeft: 10,
      marginRight: 10,
      borderColor: "#009688",
      borderWidth: .5,
    },

    button1: {
      width: 200,
        height: 50,
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center',
        margintop: '2%',
        elevation: 8,
        backgroundColor: "#009688",
        paddingVertical: 10,
        paddingHorizontal: 12,
        margin:20
    }
  });
  
  export default CountryDetails;