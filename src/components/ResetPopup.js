import React from "react";
import { Image, Text, View, Modal, TouchableOpacity } from "react-native";
import useIcon from "../hooks/useIcon";
import { Overlay } from "react-native-elements";
import popupStyles from "./utils/popupStyles";

const ResetPopup = ({isResetModalVisible, setResetModalVisible}) => {
    const resetIcon = useIcon("resetIcon");

    const isModalVisible = isResetModalVisible;
    const setModalVisible = setResetModalVisible;

    return (
        <View style={popupStyles.popupContainer}>
            <Overlay 
                isVisible={isModalVisible} 
                onBackdropPress={setModalVisible} 
                children={Modal} 
                overlayStyle={popupStyles.popupContentContainer}
                animationType="slide"
                backdropStyle={{backgroundColor: "rgba(0, 0, 0, 0.6)"}}
            >
                <View style={popupStyles.popupDeleteDescriptionContainer}>
                    <Image
                        source={resetIcon}
                        style={popupStyles.popupDeleteAlertIcon}
                    />
                    
                    <Text style={popupStyles.popupDeleteDescriptionText}>Are you sure you want to reset to your default status?</Text>
                </View>

                <View style={popupStyles.popupCancelDeleteButtonContainer}>
                    <TouchableOpacity 
                        onPress={()=> setModalVisible(false)}
                        style={popupStyles.popupButtonContainer}
                    >
                        <View>
                            <Text style={popupStyles.popupCancelText}>CANCEL</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={()=> setModalVisible(false)}
                        style={popupStyles.popupButtonContainer}
                    >
                        <View>
                            <Text style={popupStyles.popupDeleteText}>RESET</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            
            </Overlay>

        </View>

    );
};

export default ResetPopup;
