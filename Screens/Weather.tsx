
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { RootStackParamList } from '../App';


 const Weather =   ({route,navigation}:NativeStackScreenProps<RootStackParamList, "WeatherDetails">)=> {
    
    const weather= route.params?.data;
    const weatherImg = weather?.current?.weather_icons[0]
    const HandleHome  = () => {
      navigation.navigate('Home')
    }
  return (
    <View style={styles.container}>
      
    <View style={styles.Modalcontainer}>   
    <Text style={{ padding: 10,marginTop: 10,fontSize:30 }}> {weather?.location?.name}</Text>
         <Text style={{ padding: 10, marginTop: 10,fontSize:20  }}> temperature : {weather?.current?.temperature} C </Text>
         <Image style={{ width: 50, height: 50, margin: 20,borderRadius:50 }} testID='weather-image' source={{ uri:weatherImg  }} />
         <Text style={{ padding: 10,fontSize:20  }}> WindSpeed : {weather?.current?.wind_speed} KM/hr</Text>
         <Text style={{ padding: 10,fontSize:20, marginBottom: 10 }}> precipitation : { weather?.current?.precip}</Text>  
         </View>   
  <View>
  <TouchableOpacity style={styles.button1} onPress={HandleHome} >          
      <Text style={{ color: 'white',fontSize:16 }} >Close</Text>
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
  
  export default Weather;