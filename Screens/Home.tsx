import { StyleSheet,TouchableOpacity,ActivityIndicator, TextInput, View,Text, Alert  } from 'react-native';
import { useState } from 'react';
import { RootStackParamList } from '../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios  from 'axios';


type ProfileScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;
type Props = {
  navigation: ProfileScreenNavigationProp;
};

export default function Home({navigation}:Props) {
    const [country, setCountry] = useState('');
    const [load,setLoad]=useState(false)
   
    const handlePress = async () => {
      setLoad(true);
      try {
        const response = await axios.get("https://restcountries.com/v3.1/name/" + country);
        navigation.navigate('CountryDetails', { data: response.data });
      } catch (error) {
        Alert.alert(
          'Failed', error?.response?.data?.message,
          [
            { text: 'OK' },
          ],
          {
            cancelable: true
          }
        );
      }
      setLoad(false);
    };
    
     
    return(
     <View style={styles.container} >
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter the Country"
        onChangeText={newText => setCountry(newText)}
      />
     
        <View style={styles.bottom}>
       <TouchableOpacity testID="buttontest" style={country.length > 0?styles.button:styles.disable} onPress={handlePress} disabled={country.length > 0 ? false : true}>
          <Text  style={{ color: 'white',fontSize:16 }} > {load?  <ActivityIndicator size="large"  animating={load} color="white" />: 'Get Weather'} </Text>
       </TouchableOpacity>
       </View>
      </View>
       
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor:'white'
      },
      inputStyle: {
        margin: 40,
        height: 42,
        borderColor: "#009688",
        borderWidth: 1,
        paddingLeft: 5,
      },
    button: {
        width: '50%',
        height: 50,
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center',
        margintop: '2%',
        elevation: 8,
        backgroundColor: "#009688",
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    disable: {
      width: '50%',
      height: 50,
      borderRadius:10,
      alignItems: 'center',
      justifyContent: 'center',
      margintop: '2%',
      elevation: 8,
      backgroundColor: "grey",
      paddingVertical: 10,
      paddingHorizontal: 12
  },
    bottom: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
})
 //     const handlePress  = async () => {
    //       setLoad(true)
    //  const val  = await axios.get("https://restcountries.com/v3.1/name/"+country).then(res=>
    //   {
    //     navigation.navigate('CountryDetails',{data: res.data})
    //     setLoad(false)
    //   }).catch(error=> {
    //     setLoad(false)
    //     Alert.alert(
    //     'Failed', error?.response?.data?.message,
    //     [
    //       {text: 'OK'},
    //     ],
    //     { 
    //       cancelable: true 
    //     }
    //   );})
       
    // }