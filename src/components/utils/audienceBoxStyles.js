import { StyleSheet } from "react-native";
import colors from "../../../colors";
import normalize from 'react-native-normalize';

const audienceBoxStyles = StyleSheet.create({
    audienceBoxContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    audienceBoxIndicator: {
        width: normalize(31),
        height: normalize(31),
        marginRight: normalize(5),
        marginVertical: normalize(10),
    },

    
    audienceBoxTextSpacing: {
        marginVertical: normalize(5),
    },
    audienceBoxTextContainer: {
        marginVertical: normalize(15),
        width: "65%",
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
        fontSize: normalize(16),

        marginBottom: normalize(2),
    },
    audienceBoxNameListText: {
        color: "#383157",
        fontSize: normalize(14),
        
        marginBottom: normalize(2),
    },

    
    audienceBoxExcludeContainer: {
        //marginTop: normalize(10),
        marginBottom: normalize(10),
    },
    audienceBoxExcludeHeaderContainer: {
        alignItems: "center",
        flexDirection: "row",

        marginTop: normalize(10),
    },
    audienceBoxExcludeOpenCloseIcon: {
        width: normalize(10),
        height: normalize(10),
        marginRight: normalize(10),
        tintColor: "#FF0000",
    },
    
    audienceBoxExcludeHeaderText: {
        color: "#FF0000",
        fontSize: normalize(12),
    },
    audienceBoxExlcudePersonContainer: {
        
    },
    audienceBoxExcludePersonText: {
        color: "#686868",
        fontSize: normalize(12),
        marginHorizontal: normalize(15),
        marginVertical: normalize(3),
    },
    audienceBoxExcludeSeeMoreLessText: {
        color: "#006FE6",
        fontSize: normalize(12),
        marginHorizontal: normalize(15),
        marginVertical: normalize(3),
        textDecorationLine: "underline",
    },

    audienceBoxClearStatusText: {
        color: "#686868",
        fontSize: normalize(12),
    },


    audienceBoxIconsContainer: {
        flexDirection: "row",
        //alignItems: "center",
        marginTop: normalize(20),
    },
    audienceBoxEditIcon: {
        width: normalize(23),
        height: normalize(30),
        marginHorizontal: normalize(10),
    },
    audienceBoxTrashIcon: {
        width: normalize(20),
        height: normalize(22),
        marginLeft: normalize(10),
        marginTop: normalize(10),
    },
});

export default audienceBoxStyles;
