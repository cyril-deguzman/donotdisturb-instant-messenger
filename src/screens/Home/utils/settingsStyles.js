import { StyleSheet } from "react-native";
import colors from "../../../../colors";
import normalize from 'react-native-normalize';

const settingsStyles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "#F6F6FF",
    },
    bgContainer: {
        justifyContent: "space-between",
        alignItems: "center",
    },
    settingsContainer: {
        width: "100%",
        backgroundColor: "#fff",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingTop: 35,
    },
    backgroundImage: {
        marginLeft: -101,
        margineTop: -158,
        width: 595,
        height: 595,
        position: "absolute",
    },

    userContainer: {
        flex: 0.3,
        width: "80%",
        marginTop: "5%",
        marginBottom: "5%",
        flexDirection: "column",
        alignItems: "center",
    },
    userProfileContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: -15,
        zIndex: 1,
    },
    userImage: {
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
        width: 128,
        height: 128,
    },
    userOSI: {
        width: 35,
        height: 35,
        marginLeft: -40,
        marginTop: 97,
    },
    userTextContainer: {
        alignItems: "center",
        padding: 30,
        backgroundColor: "#fff",
        borderRadius: 30,
    
        height: "50%",
        width: "100%",
    },
    userTextName: {
        fontSize: normalize(24), 
        fontWeight: "bold"
    },
    userTextStatus: {
        fontSize: normalize(16), 
        color: "#006FE6"
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
  });
  
  export default settingsStyles;
  