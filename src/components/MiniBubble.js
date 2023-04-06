import React, { useState} from "react";
import { Image, View, Text, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import useIcon from "../hooks/useIcon";
import bubbleStyles from "../screens/Home/utils/bubbleStyles";
import MessageBox from "./MessageBox";
import normalize from "react-native-normalize";
import MiniBubbleSeeAllModal from "./MiniBubbleSeeAllModal";

const MiniBubble = (props) => {
    const openIcon = useIcon("openIcon");
    const closeIcon = useIcon("closeIcon");
    const editIcon = useIcon("editIcon");

    const [openMiniBubble, setOpenMiniBubble] = useState(true);
    const openCloseIcon = openMiniBubble? openIcon : closeIcon;
    
    const [isModalVisible, setModalVisible] = useState(false);

    return (
        <View style={bubbleStyles.miniBubbleContainer}>
            
            <MiniBubbleSeeAllModal isModalVisible={isModalVisible} setModalVisible={setModalVisible}/>

            <TouchableWithoutFeedback
                onPress={() => 
                    setOpenMiniBubble(!openMiniBubble)
                }
                
                style={{borderRadius: normalize(50)}}
                underlayColor="rgba(217, 217, 217, 0.5)"
            >   
                <View style={bubbleStyles.miniBubbleHeader}>
                    <View style={bubbleStyles.miniBubbleOpenCloseButtonContainer}>
                        <Image 
                            source={openCloseIcon}
                            style={bubbleStyles.miniBubbleOpenCloseButton}
                        />
                    </View>
            
            
                        <Text style={bubbleStyles.miniBubbleHeaderText}>{props.bubbleName}</Text>

                        <View style={bubbleStyles.miniBubbleEditButtonContainer}>
                            <Image
                                source={editIcon}
                                style={bubbleStyles.miniBubbleEditButton}
                            />
                            <Text style={bubbleStyles.miniBubbleEditButtonText}>Edit</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>

            {openMiniBubble ? (
                <View style={bubbleStyles.bubblePeopleContainer}> 
                
                    <MessageBox userStatus="idle" friendStatus="openToChat" />
                    <MessageBox userStatus="openToChat" friendStatus="doNotDisturb" />
                    <MessageBox userStatus="invisible" friendStatus="idle" />
                    
                    <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                        activeOpacity={0.5}
                    >
                        <View style={bubbleStyles.seeAllButtonContainer}>
                            <Text style={bubbleStyles.seeAllButtonText}>See all</Text>
                        </View>
                    </TouchableOpacity>
                
                </View>
            ) : null}
            
        </View>
    )
};

export default MiniBubble;
