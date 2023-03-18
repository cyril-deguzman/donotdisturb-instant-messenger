import React from "react";
import { Image, View, Text} from "react-native";
import styles from "./utils/styles";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const OptionBox = (props) => {
  return (
    <Pressable
        onPress={() => 
            props.navigation.navigate(props.routeName) 
        }
      
        style={({pressed}) => [
        {
            backgroundColor: pressed ? "#D9D9D9" : "#FFFFFF00",
        },
    ]}>

      <View style={styles.optionContainer}>
        <Image
            source = {props.icon} 
            style={styles.optionIcon}
        />
        <Text style={styles.optionText}>
            {props.name}
        </Text>
      </View>

    </Pressable>
  )
};

export default OptionBox;
