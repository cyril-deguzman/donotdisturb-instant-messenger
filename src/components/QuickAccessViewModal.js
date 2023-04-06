import React from "react";
import { Image, View, Modal } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import useIcon from "../hooks/useIcon";
import { Overlay } from "react-native-elements";
import modalStyles from "./utils/modalStyles";
import GestureRecognizer from 'react-native-swipe-gestures';
import ModalOptionBox from "./ModalOptionBox";

const QuickAccessViewModal = (props) => {
    const slideUpDownIcon = useIcon("slideUpDownIcon");

    const deleteIcon = useIcon("deleteIcon");
    const muteNotificationsIcon = useIcon("muteNotificationsIcon");
    const changeHowTheySeeYouIcon = useIcon("changeHowTheySeeYouIcon");
    const blockIcon = useIcon("blockIcon");
    const addMembersIcon = useIcon("addMembersIcon");
    const leaveIcon = useIcon("leaveIcon");

    const isModalVisible = props.isModalVisible
    const setModalVisible = props.setModalVisible

    return (
        <View style={modalStyles.modalContainer}>
            <GestureRecognizer
                onSwipeDown={ () => setModalVisible(false)}
            >
                <Overlay 
                    isVisible={props.isModalVisible} 
                    onBackdropPress={props.setModalVisible} 
                    children={Modal} 
                    overlayStyle={modalStyles.modalPeopleContainer}
                    animationType="slide"
                >
                    <Pressable onPress={() => setModalVisible(false)}>
                        <View style={modalStyles.modalSlideUpDownContainer}>
                            <Image 
                                source={slideUpDownIcon}
                                style={modalStyles.modalSlideUpDownButton}
                            />
                        </View>
                    </Pressable>

                    {props.isIndividualModal ? (
                        <View>
                            <ModalOptionBox icon={deleteIcon} optionName="Delete this chat" is1stModalVisible={isModalVisible} set1stModalVisible={setModalVisible}/>
                            <ModalOptionBox icon={muteNotificationsIcon} optionName="Mute notifications" is1stModalVisible={isModalVisible} set1stModalVisible={setModalVisible}/>
                            <ModalOptionBox icon={changeHowTheySeeYouIcon} optionName="Change how they see you" is1stModalVisible={isModalVisible} set1stModalVisible={setModalVisible}/>
                            <ModalOptionBox icon={blockIcon} optionName="Block this contact" is1stModalVisible={isModalVisible} set1stModalVisible={setModalVisible}/>
                        </View>
                    ) : 
                    
                        <View>
                            <ModalOptionBox icon={deleteIcon} optionName="Delete this chat" is1stModalVisible={isModalVisible} set1stModalVisible={setModalVisible}/>
                            <ModalOptionBox icon={addMembersIcon} optionName="Add members" is1stModalVisible={isModalVisible} set1stModalVisible={setModalVisible}/>
                            <ModalOptionBox icon={leaveIcon} optionName="Leave group" is1stModalVisible={isModalVisible} set1stModalVisible={setModalVisible}/>
                            <ModalOptionBox icon={changeHowTheySeeYouIcon} optionName="Change how they see you" is1stModalVisible={isModalVisible} set1stModalVisible={setModalVisible}/>
                            <ModalOptionBox icon={muteNotificationsIcon} optionName="Mute notifications" is1stModalVisible={isModalVisible} set1stModalVisible={setModalVisible}/>   
                        </View>
                            
                    }
                    
                    
                </Overlay>
            </GestureRecognizer>
        </View>

    );
};

export default QuickAccessViewModal;
