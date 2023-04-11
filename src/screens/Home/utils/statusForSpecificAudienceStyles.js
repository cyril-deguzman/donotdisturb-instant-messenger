import { StyleSheet } from "react-native";
import colors from "../../../../colors";
import normalize from 'react-native-normalize';

const statusForSpecificAudienceStyles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "#F6F6FF",
    },
    bgContainer: {
        //justifyContent: "space-between",
        alignItems: "center",
    },
    

    descriptionContainer: {
        //flex: 0.3,
        width: "90%",
        marginTop: "5%",
        marginBottom: "5%",
        //flexDirection: "column",
        //alignItems: "flex-start",

        overflow: "hidden",
        paddingBottom: normalize(8),
        paddingHorizontal: normalize(2),
        borderRadius: normalize(30),
    },
    descriptionTextContainer: {
        //alignItems: "flex-start",
        padding: normalize(30),
        backgroundColor: "#fff",
        borderRadius: normalize(30),
    
         //width: "100%",

        elevation: 10,
        shadowColor: "#000",
    },
    descriptionTextHeader: {
        fontSize: normalize(21), 
        fontWeight: "bold",
        color: "#4F457C",
        
        marginBottom: "5%",
    },
    descriptionTextContent: {
        fontSize: normalize(14), 
        color: "#686868",
    },

    audienceContainer: {
        width: "100%",
        backgroundColor: "#fff",
        borderTopLeftRadius: normalize(50),
        borderTopRightRadius: normalize(50),
        padding: normalize(30),

        height: "100%",
    },

    editBubbleContainer: {
        width: "100%",
        backgroundColor: "#fff",
        borderTopLeftRadius: normalize(50),
        borderTopRightRadius: normalize(50),
        padding: normalize(20),

        height: "100%",
    },
    audienceContainerHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    audienceContainerTextHeader: {
        fontWeight: "bold",
        color: "#4F457C",
        fontSize: normalize(18),
    },
  });
  
  export default statusForSpecificAudienceStyles;
  