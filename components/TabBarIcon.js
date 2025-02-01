import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colours } from '../config/colours';


const TabBarIcon = ({ text, icon }) => {
 


  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={icon}       
        size={36}
        color={Colours.lightGray} />
      <Text style={styles.text} >{text}</Text>
    </View>
  )
}

export default TabBarIcon

const styles = StyleSheet.create({

  container: {
    backgroundColor: Colours.button,
    width: 100,
    alignItems: "center",    
    gap: 5,
     marginBottom: 5

  },
  text: {
    fontSize: 12,
    color: Colours.lightGray,
    textAlign: 'center',
    flexWrap: 'wrap',
    overflow: "visible",
    marginBottom: 30
  },

})
