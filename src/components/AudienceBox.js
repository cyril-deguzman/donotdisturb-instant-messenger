import React from "react";
import { Image, View, Text, StyleSheet} from "react-native";
import styles from "./utils/styles";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import normalize from "react-native-normalize";
import useIcon from "../hooks/useIcon";

const AudienceBox = (props) => {
    const editIcon = useIcon("editIcon");
    const trashIcon = useIcon("trashIcon");
    const openIcon = useIcon("openIcon");

    return (
        <Pressable
            onPress={() => 
                props.navigation.navigate(props.routeName) 
            }
        >

            <View style={audienceBoxStyles.audienceBoxContainer}>
                <View>
                    <Image 
                        source={props.audienceIndicator}
                        style={audienceBoxStyles.audienceBoxIndicator}
                    />
                
                </View>
                <View style={audienceBoxStyles.audienceBoxTextContainer}>
                    <Text style={audienceBoxStyles.audienceBoxStatusMessageText}>"Finals snz ;-;"</Text>
                    <Text style={audienceBoxStyles.audienceBoxAudienceNameText}>DLSU Friends</Text>
                    <Text style={audienceBoxStyles.audienceBoxNameListText}>Status for: Leana Rebong, Rayden Lizan, and 10 more</Text>
                    
                    <View style={audienceBoxStyles.audienceBoxExcludeContainer}>
                        <Image
                            source={openIcon}
                        />
                        <Text style={audienceBoxStyles.audienceBoxExcludeHeaderText}>Exlcuding</Text>
                        <Text style={audienceBoxStyles.audienceBoxExcludePersonText}>person A</Text>
                        <Text style={audienceBoxStyles.audienceBoxExcludePersonText}>person B</Text>
                        <Text style={audienceBoxStyles.audienceBoxExcludePersonText}>person C</Text>
                    </View>

                    <Text style={audienceBoxStyles.audienceBoxClearStatusText}>Status will clear after tomorrow 8:30 PM</Text>
                </View>
                <View style={audienceBoxStyles.audienceBoxIconsContainer}>
                    <Image
                        source={editIcon}
                        style={audienceBoxStyles.audienceBoxEditIcon}
                    />
                    <Image 
                        source={trashIcon}
                        style={audienceBoxStyles.audienceBoxTrashIcon}
                    />
                </View>
            </View>
        </Pressable>
    )
};

const audienceBoxStyles = StyleSheet.create({
    audienceBoxContainer: {
        flexDirection: "row",
    },
    audienceBoxIndicator: {
        width: normalize(31),
        height: normalize(31),
        marginHorizontal: normalize(20),
        marginVertical: normalize(10),
    },
    audienceBoxTextSpacing: {
        marginVertical: normalize(5),
    },
    audienceBoxTextContainer: {
        marginVertical: normalize(15),
        width: "60%",
    },
    audienceBoxStatusMessageText: {
        fontStyle: "italic",
        color: "#000",
        fontSize: normalize(16),
        marginBottom: normalize(18),
    },
    audienceBoxAudienceNameText: {
        fontWeight: "600",
        color: "#383157",
        fontSize: normalize(18),
    },
    audienceBoxNameListText: {
        color: "#383157",
        fontSize: normalize(16),
    },

    
    audienceBoxExcludeContainer: {
        marginHorizontal: normalize(15),
    },
    audienceBoxExcludeHeaderText: {
        color: "#FF0000",
        fontSize: normalize(14),
    },
    audienceBoxExcludePersonText: {
        color: "#686868",
        fontSize: normalize(12),
    },

    audienceBoxClearStatusText: {
        color: "#686868",
        fontSize: normalize(14),
    },


    audienceBoxIconsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    audienceBoxEditIcon: {
        width: normalize(23),
        height: normalize(30),
        marginHorizontal: normalize(10),
    },
    audienceBoxTrashIcon: {
        width: normalize(20),
        height: normalize(22),
        //margin: normalize(10),
        margin: normalize(10),
    },



});

export default AudienceBox;



