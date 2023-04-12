import React, { useState } from "react";
import { Image, View, Text, TouchableHighlight} from "react-native";
import modalStyles from "./utils/modalStyles";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import ChangeHowTheySeeYouModal from "./ChangeHowTheySeeYouModal";
import DeleteAlertPopup from "./DeleteAlertPopup";

const ModalOptionBox = (props) => {
    
    const [is2ndModalVisible, set2ndModalVisible] = useState(false); 

    return (
        <View>
        
            {props.optionName == "Change how they see you" ? (
                <ChangeHowTheySeeYouModal is2ndModalVisible={is2ndModalVisible} set2ndModalVisible={set2ndModalVisible} set1stModalVisible={props.set1stModalVisible}/>
            ) : null}
            
            {props.optionName == "Delete this chat" ? (
                <DeleteAlertPopup is2ndModalVisible={is2ndModalVisible} set2ndModalVisible={set2ndModalVisible} set1stModalVisible={props.set1stModalVisible} deleteWhatText={"delete this chat"}/>
            ) : null}

            <TouchableHighlight
                onPress={() => {
                // props.set1stModalVisible(false);
                    set2ndModalVisible(!props.is2ndModalVisible);
                }}
                underlayColor={"rgba(217, 217, 217, 0.5)"}    
            >

                <View style={modalStyles.optionModalContainer}>
                    <Image
                        source = {props.icon} 
                        style={modalStyles.optionModalIcon}
                    />
                    <Text style={modalStyles.optionModalText}>
                        {props.optionName}
                    </Text>
                </View>

            </TouchableHighlight>
        </View>
    )
};

export default ModalOptionBox;
