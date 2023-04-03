import React, { useState} from "react";
import { Image, View, Text} from "react-native";
import styles from "./utils/styles";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import useIcon from "../hooks/useIcon";
import bubbleStyles from "../screens/Home/utils/bubbleStyles";
import MessageBox from "./MessageBox";
import MiniBubbleSeeAllModal from "./MiniBubbleSeeAllModal";

const MiniBubble = (props) => {
    const openIcon = useIcon("openIcon");
    const closeIcon = useIcon("closeIcon");
    const editIcon = useIcon("editIcon");

    const [openMiniBubble, setOpenMiniBubble] = useState(true);
    const openCloseIcon = openMiniBubble? openIcon : closeIcon;
    
    const [isModalVisible, setModalVisible] = useState(false);
    const [animateModal, setAnimateModal] = useState(false);
    return (
        <View style={bubbleStyles.miniBubbleContainer}>
            <MiniBubbleSeeAllModal isModalVisible={isModalVisible} setModalVisible={setModalVisible} animateModal={animateModal} setAnimateModal={setAnimateModal}/>

            <View style={bubbleStyles.miniBubbleHeader}>
            
                <Pressable
                    onPress={() => 
                        setOpenMiniBubble(!openMiniBubble)
                    }
                    
                    style={({pressed}) => [
                    {
                        backgroundColor: pressed ? "#D9D9D9" : "#FFFFFF00",
                        borderRadius: 50,
                    },
                    
                ]}>

                    <View style={bubbleStyles.miniBubbleOpenCloseButtonContainer}>
                        <Image 
                            source={openCloseIcon}
                            style={bubbleStyles.miniBubbleOpenCloseButton}
                        />
                    </View>
                
                </Pressable>
            
                <Text style={bubbleStyles.miniBubbleHeaderText}>{props.bubbleName}</Text>

                <View style={bubbleStyles.miniBubbleEditButtonContainer}>
                    <Image
                        source={editIcon}
                        style={bubbleStyles.miniBubbleEditButton}
                    />
                    <Text style={bubbleStyles.miniBubbleEditButtonText}>Edit</Text>
                </View>
            </View>

            {openMiniBubble ? (
            <View style={bubbleStyles.bubblePeopleContainer}> 
            
                <MessageBox userStatus="idle" friendStatus="openToChat" />
                <MessageBox userStatus="openToChat" friendStatus="doNotDisturb" />
                <MessageBox userStatus="invisible" friendStatus="idle" />
                
                <Pressable
                    onPress={() => 
                        setModalVisible(true) &&  setAnimateModal(true)
                    }
                    /*
                    style={({pressed}) => [
                    {
                        backgroundColor: pressed ? "#D9D9D9" : "#FFFFFF00",
                    },
                    
                ]}*/>
                <View style={bubbleStyles.seeAllButtonContainer}>
                    <Text style={bubbleStyles.seeAllButtonText}>See all</Text>
                </View>
                </Pressable>
            
            </View>
            ) : null}
            
        </View>
    )
};

export default MiniBubble;
