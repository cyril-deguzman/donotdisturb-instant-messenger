import React, { useState} from "react";
import { Image, View, Text, Modal } from "react-native";
import styles from "./utils/styles";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import useIcon from "../hooks/useIcon";
import MessageBox from "./MessageBox";
import { ScrollView } from "react-native-gesture-handler";
import { Overlay } from "react-native-elements";
import modalStyles from "./utils/modalStyles";
import GestureRecognizer from 'react-native-swipe-gestures';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import ModalOptionBox from "./ModalOptionBox";

const QuickAccessViewModal = (props) => {
    const slideUpDownIcon = useIcon("slideUpDownIcon");

    const deleteIcon = useIcon("deleteIcon");
    const muteNotificationsIcon = useIcon("muteNotificationsIcon");
    const changeHowTheySeeYouIcon = useIcon("changeHowTheySeeYouIcon");
    const blockIcon = useIcon("blockIcon");
    const addMembersIcon = useIcon("addMembersIcon");
    const leaveIcon = useIcon("leaveIcon");

    return (
        <View style={modalStyles.modalContainer}>
            <GestureRecognizer
                onSwipeDown={ () => props.setModalVisible(false) }
            >
                <Overlay 
                    isVisible={props.isModalVisible} 
                    onBackdropPress={props.setModalVisible} 
                    children={Modal} 
                    overlayStyle={modalStyles.modalPeopleContainer}
                    animationType="slide"
                >
                    <Pressable onPress={() => props.setModalVisible(false)}>
                        <View style={modalStyles.modalSlideUpDownContainer}>
                            <Image 
                                source={slideUpDownIcon}
                                style={modalStyles.modalSlideUpDownButton}
                            />
                        </View>
                    </Pressable>

                    {props.isIndividualModal ? (
                        <View>
                            <ModalOptionBox icon={deleteIcon} optionName="Delete this chat" navigation={props.navigation} routeName={"Messages"}/>
                            <ModalOptionBox icon={muteNotificationsIcon} optionName="Mute notifications" navigation={props.navigation} routeName={"Messages"}/>
                            <ModalOptionBox icon={changeHowTheySeeYouIcon} optionName="Change how they see you" navigation={props.navigation} routeName={"Messages"}/>
                            <ModalOptionBox icon={blockIcon} optionName="Block this contact" navigation={props.navigation} routeName={"Messages"}/>
                        </View>
                    ) : 
                    
                        <View>
                            <ModalOptionBox icon={deleteIcon} optionName="Delete this chat" navigation={props.navigation} routeName={"Messages"}/>
                            <ModalOptionBox icon={addMembersIcon} optionName="Add members" navigation={props.navigation} routeName={"Messages"}/>
                            <ModalOptionBox icon={leaveIcon} optionName="Leave group" navigation={props.navigation} routeName={"Messages"}/>
                            <ModalOptionBox icon={changeHowTheySeeYouIcon} optionName="Change how they see you" navigation={props.navigation} routeName={"Messages"}/>
                            <ModalOptionBox icon={muteNotificationsIcon} optionName="Mute notifications" navigation={props.navigation} routeName={"Messages"}/>   
                        </View>
                            
                    }
                    
                    
                </Overlay>
            </GestureRecognizer>
        </View>

    );
};

export default QuickAccessViewModal;
