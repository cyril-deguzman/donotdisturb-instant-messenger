import React from "react";
import { Image, View, Text, TouchableHighlight} from "react-native";
import styles from "./utils/styles";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import useIcon from "../hooks/useIcon";
import modalStyles from "./utils/modalStyles";
import useIndicator from "../hooks/useIndicator";

const OSIOptionBox = (props) => {
    const indicator = useIndicator(props.indicator);
    
    const isSelectedBGStyle = props.selected ? "rgba(217,217,217, 0.5)" : "transparent";

    return (
        <TouchableHighlight
            onPress={props.onPress}
            underlayColor="rgba(217,217,217, 0.5)"
        >

        <View style={[modalStyles.optionOSIContainer, {backgroundColor: isSelectedBGStyle}]}>
            <View style={modalStyles.optionOSIIndicatorContainer}>
                <Image
                    source={indicator} 
                    style={modalStyles.optionIcon}
                />
                <Text style={styles.optionText}>
                    {props.name}
                </Text>
            </View>
            <View style={modalStyles.modalRadioButtonContainer}>
                {props.selected ? (<View style={modalStyles.modalRadioButtonIcon} />) : null}
            </View>
        </View>

        </TouchableHighlight>
    )
};

export default OSIOptionBox;
