import React from "react";
import { Image, View, Text} from "react-native";
import styles from "./utils/styles";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { Switch } from '@rneui/themed';
import normalize from "react-native-normalize";

const SwitchBox = (props) => {
    const [value, setValue] = React.useState(false);

    const toggleSwitch = () => {
        setChecked(!checked);
      };
  
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

      <View style={styles.switchContainer}>
            <Image
                source = {props.icon} 
                style={styles.chatInfoOptionIcon}
            />
            <Text style={styles.optionText}>
                {props.name}
            </Text>
          
        <Switch
            color="black"
            value={value}
            onValueChange={() => setValue(!value)}
            style={{ paddingStart: normalize(140) }}
        />

      </View>

    </Pressable>
  )
};

export default SwitchBox;