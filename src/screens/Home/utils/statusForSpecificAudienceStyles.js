import { StyleSheet } from "react-native";
import colors from "../../../../colors";
import normalize from 'react-native-normalize';

const statusForSpecificAudienceStyles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "#F6F6FF",
    },
    bgContainer: {
        justifyContent: "space-between",
        alignItems: "center",
    },
    audienceContainer: {
        width: "100%",
        backgroundColor: "#fff",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 30,
    },
    backgroundImage: {
        marginLeft: -101,
        margineTop: -158,
        width: 595,
        height: 595,
        position: "absolute",
    },

    descriptionContainer: {
        flex: 0.3,
        width: "90%",
        marginTop: "5%",
        marginBottom: "5%",
        flexDirection: "column",
        //alignItems: "flex-start",
    },
    descriptionTextContainer: {
        alignItems: "flex-start",
        padding: 30,
        backgroundColor: "#fff",
        borderRadius: 30,
    
        width: "100%",
    },
    descriptionTextHeader: {
        fontSize: normalize(24), 
        fontWeight: "bold",
        color: "#4F457C",
        
        marginBottom: "5%",
    },
    userTextStatus: {
        fontSize: normalize(16), 
        color: "#686868",
    },
    /*
    userTextContainerShadow: {
        backgroundColor: "#000",
        borderRadius: 30,

        height: "50%",
        width: "100%",
        zIndex: 0,
        marginTop: -25,
    },
    */

    audienceContainerHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    audienceContainerTextHeader: {
        fontWeight: "bold",
        color: "#4F457C",
        fontSize: normalize(20),
    },
  });
  
  export default statusForSpecificAudienceStyles;
  