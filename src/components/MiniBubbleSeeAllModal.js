import React from "react";
import { Image, View, Modal } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import useIcon from "../hooks/useIcon";
import MessageBox from "./MessageBox";
import { ScrollView } from "react-native-gesture-handler";
import { Overlay } from "react-native-elements";
import modalStyles from "./utils/modalStyles";
import GestureRecognizer from 'react-native-swipe-gestures';

const MiniBubbleSeeAllModal = (props) => {
    const slideUpDownIcon = useIcon("slideUpDownIcon");

    return (
        <View style={modalStyles.modalSeeAllContainer}>
            <GestureRecognizer
                onSwipeDown={ () => props.setModalVisible(false) }
            >
                <Overlay 
                    isVisible={props.isModalVisible} 
                    onBackdropPress={props.setModalVisible} 
                    children={Modal} 
                    overlayStyle={modalStyles.modalSeeAllPeopleContainer}
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
               
                    
                    <ScrollView>
                        <MessageBox
                            navigation={props.navigation}
                            userStatus="idle"
                            friendStatus="openToChat"
                        />
                        <MessageBox
                            navigation={props.navigation}
                            userStatus="openToChat"
                            friendStatus="doNotDisturb"
                        />
                        <MessageBox
                            navigation={props.navigation}
                            userStatus="invisible"
                            friendStatus="idle"
                        />
                        <MessageBox
                            navigation={props.navigation}
                            userStatus="doNotDisturb"
                            friendStatus="invisible"
                        />

                        <MessageBox
                            navigation={props.navigation}
                            userStatus="idle"
                            friendStatus="openToChat"
                        />
                        <MessageBox
                            navigation={props.navigation}
                            userStatus="openToChat"
                            friendStatus="doNotDisturb"
                        />
                        <MessageBox
                            navigation={props.navigation}
                            userStatus="invisible"
                            friendStatus="idle"
                        />
                        <MessageBox
                            navigation={props.navigation}
                            userStatus="doNotDisturb"
                            friendStatus="invisible"
                        />
                        
                    </ScrollView>
                </Overlay>
            </GestureRecognizer>
        </View>

    );
};

export default MiniBubbleSeeAllModal;
