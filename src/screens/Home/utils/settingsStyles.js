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
        borderTopLeftRadius: normalize(50),
        borderTopRightRadius: normalize(50),
        paddingTop: normalize(35),
    },

    userProfileContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: normalize(-15),
        zIndex: 1,
    },
    userImage: {
        borderTopLeftRadius: normalize(100),
        borderTopRightRadius: normalize(100),
        borderBottomLeftRadius: normalize(100),
        borderBottomRightRadius: normalize(100),
        width: normalize(128),
        height: normalize(128),
    },
    userOSI: {
        width: normalize(35),
        height: normalize(35),
        marginLeft: normalize(-30),
    },
    userTextContainer: {
        alignItems: "center",
        padding: normalize(30),
        backgroundColor: "#fff",
        borderRadius: normalize(30),

        width: "100%",

        elevation: 10,
        shadowColor: "#000",
    },
    userTextContainerShadow: {
        width: "80%",
        marginBottom: "5%",

        overflow: "hidden",
        paddingBottom: normalize(8),
        paddingHorizontal: normalize(2),
        borderRadius: normalize(30),
    },
    userTextName: {
        fontSize: normalize(24), 
        fontWeight: "bold"
    },
    userTextStatus: {
        fontSize: normalize(16), 
        color: "#006FE6"
    },
  });
  
  export default settingsStyles;
  