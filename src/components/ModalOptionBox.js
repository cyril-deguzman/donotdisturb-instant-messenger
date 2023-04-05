import React, { useState } from "react";
import { Image, View, Text} from "react-native";
import modalStyles from "./utils/modalStyles";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import ChangeHowTheySeeYouModal from "./ChangeHowTheySeeYouModal";

const ModalOptionBox = (props) => {
    
    const [is2ndModalVisible, set2ndModalVisible] = useState(false); 

    return (
        <View>
        
        {props.optionName == "Change how they see you" ? (
            <ChangeHowTheySeeYouModal is2ndModalVisible={is2ndModalVisible} set2ndModalVisible={set2ndModalVisible} set1stModalVisible={props.set1stModalVisible}/>
        ) : null}
        

        <Pressable
            onPress={() => {
               // props.set1stModalVisible(false);
                set2ndModalVisible(!props.is2ndModalVisible);
            }}
        
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
        </View>
    )
};

export default ModalOptionBox;
