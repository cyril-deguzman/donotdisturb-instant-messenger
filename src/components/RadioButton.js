import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { useState } from "react";



export default function RadioButton({ data, onSelect, current }) {

  const [userOption, setUserOption] = useState(null);
  const selectHandler = (value) => {
    onSelect(value);
    setUserOption(value);
  };



  return (

    

    <View>
        {data.map((item) => {
            return (
                
                <Pressable style={item.value === userOption || item.value === current ? styles.OptionsStatusIndicatorSelected : styles.OptionsStatusIndicator} 
                
                    onPress={() => selectHandler(item.value)}
                >
                    <Image
                    style={styles.StatusIndicator}
                    source={item.indicator}
                    />
                    <Text style={styles.OSIText}>{item.value}</Text>
                    <Image
                    style={styles.RadioButton}
                    source={item.value === userOption || item.value === current ?
                        {uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/vd05xs36wi-I1362%3A22175%3B706%3A7494?alt=media&token=5bb7ea51-6b14-455b-bd65-aa61fabab83d"}
                        :{uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/vd05xs36wi-I1362%3A22176%3B706%3A7518?alt=media&token=6faf3bf9-39dd-4ad7-b779-26d90fd289e1",}}
                    />
                </Pressable>
            );
        })}

    </View>

    
  );


}

const styles = StyleSheet.create({
    OptionsStatusIndicatorSelected: {
        // display: "flex",
        // flexDirection: "row",
        // justifyContent: "space-between",
        // alignItems: "center",
        // width: "100%",
        // height: "25%",
        // paddingLeft: 8,
        // paddingRight: 11,
        // paddingTop: 6,
        // paddingBottom: 5,
        // borderRadius: 10,
        // boxSizing: "border-box",
        backgroundColor: "rgba(217,217,217,0.5)",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: 'row',
        alignItems: "center",
        borderRadius: 10,
        width: "100%",
        height: "25%",
        paddingLeft: 8,
        paddingRight: 11,
        paddingTop: 6,
        paddingBottom: 5,
        boxSizing: "border-box",
      },
      StatusIndicator: {
        width: 26,
        height: "100%",
      },
      OSIText: {
        color: "rgba(79,69,124,1)",
        fontSize: 14,
        lineHeight: 14,
        //fontFamily: "Inter, sans-serif",
        fontWeight: "500",
        textAlign: "left",
        width: "75%",
      },
      RadioButton: {
        width: 19,
        height: 19,
      },
      OptionsStatusIndicator: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: 'row',
        alignItems: "center",
        width: "100%",
        height: "25%",
        paddingLeft: 8,
        paddingRight: 11,
        paddingTop: 6,
        paddingBottom: 5,
        boxSizing: "border-box",
        //backgroundColor: "black"
      },
  });

