import React from "react";
import { Image, Text, View, Modal, TouchableOpacity, TouchableWithoutFeedback, TextInput } from "react-native";
import { Overlay } from "react-native-elements";
import popupStyles from "./utils/popupStyles";

const GroupNamePopup = ({isGroupNameModalVisible, setGroupNameModalVisible, GroupNameHeader}) => {
    const isModalVisible = isGroupNameModalVisible;
    const setModalVisible = setGroupNameModalVisible;

    const [value, onChangeText] = React.useState("");

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
                <View>
                    
                    <Text style={popupStyles.popupGroupNameText}>{GroupNameHeader}</Text>
                    
                    <View style={popupStyles.popupTextInputContainer}>
                        <TextInput
                            editable
                            maxLength={40}
                            onChangeText={text => onChangeText(text)}
                            value={value}
                            style={{padding: 0}}
                        />
                    </View>
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
                            <Text style={popupStyles.popupCancelText}>NEXT</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            
            </Overlay>

        </View>

    );
};

export default GroupNamePopup;
