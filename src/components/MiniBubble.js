import React, { useState} from "react";
import { Image, View, Text, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import useIcon from "../hooks/useIcon";
import bubbleStyles from "../screens/Home/utils/bubbleStyles";
import MessageBox from "./MessageBox";
import normalize from "react-native-normalize";

const MiniBubble = (props) => {
    const openIcon = useIcon("openIcon");
    const closeIcon = useIcon("closeIcon");
    const editIcon = useIcon("editIcon");

    const [openMiniBubble, setOpenMiniBubble] = useState(true);
    const openCloseIcon = openMiniBubble? openIcon : closeIcon;
    
    return (
        <View style={bubbleStyles.miniBubbleContainer}>
            
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
                        onPress={() => console.log("open see all modal")}
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
