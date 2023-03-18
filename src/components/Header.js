import React from "react";
import { Image, View, Text} from "react-native";
import styles from "./utils/styles";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import useIcon from "../hooks/useIcon";

const Header = (props) => {
    const backIcon = useIcon("backIcon");

    return (
        <View style={styles.headerContainer}>
            <Pressable  
                onPress={() => 
                    props.navigation.goBack()
                }
            
                style={({pressed}) => [{
                    backgroundColor: pressed ? "#D9D9D9" : "#FFFFFF00",
                    borderRadius: 50,
                },

                ]}>
                <Image
                    source={backIcon}
                    style={styles.headerBackButton}
                />
                </Pressable>
            <Text style={styles.headerText}>{props.title}</Text>
        </View>
    )
};

export default Header;
