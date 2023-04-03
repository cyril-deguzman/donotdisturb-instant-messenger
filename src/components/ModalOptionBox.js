import React from "react";
import { Image, View, Text} from "react-native";
import modalStyles from "./utils/modalStyles";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const ModalOptionBox = (props) => {
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

        <View style={modalStyles.optionModalContainer}>
            <Image
                source = {props.icon} 
                style={modalStyles.optionModalIcon}
            />
            <Text style={modalStyles.optionModalText}>
                {props.optionName}
            </Text>
        </View>

    </Pressable>
  )
};

export default ModalOptionBox;
