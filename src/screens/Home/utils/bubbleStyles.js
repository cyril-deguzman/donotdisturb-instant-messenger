import { StyleSheet } from "react-native";
import colors from "../../../../colors";
import normalize from 'react-native-normalize';

const BubbleStyles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "#F6F6FF",
    },
    bgContainer: {

    },
    bgImg: {
        width: "100%",
        height: "120%",
        position: "absolute",
        top: 0,
        resizeMode: "cover",
    },

    // header 
    headerContainer: {
        backgroundColor: "#fff",
        flexDirection: "row",

        alignItems: "center",
        justifyContent: "space-between",

        borderBottomLeftRadius: normalize(20),
        borderBottomRightRadius: normalize(20),

        paddingLeft: normalize(20),
        paddingRight: normalize(15),
        paddingVertical: normalize(10),

        elevation: 10,
        shadowColor: '#000',
    },
    headerContainerShadow: {
        overflow: 'hidden', 
        paddingBottom: 5,
        borderBottomLeftRadius: normalize(20),
        borderBottomRightRadius: normalize(20),
    },
    headerTextContainer: {
        margin: normalize(10),
    },
    headerText: {
        fontWeight: "bold",
        color: "black",
        fontSize: normalize(22),
    },
    headerSubtext: {
        color: "#AC9EFF",
        fontSize: normalize(15),
    },
    headerAddButtonContainer: {
        
    },
    headerAddButton: {
        width: normalize(40),
        height: normalize(40),
        margin: normalize(10),
    },


    searchContainer: {
        marginLeft: normalize(20),
        marginRight: normalize(20),
        marginTop: normalize(10),
    },

    bubbleContainer: {
        width: "100%",
        height: "87.5%",
    },

    // mini bubble
    miniBubbleContainer: {
        borderRadius: normalize(30),
        backgroundColor: "#fff",
        marginLeft: normalize(20),
        marginRight: normalize(20),
        marginTop: normalize(10),
        marginBottom: normalize(10),
        padding: normalize(10),
    },
    miniBubbleHeader: {
        margin: normalize(10),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    miniBubbleOpenCloseButtonContainer: {
        padding: normalize(10),
    },
    miniBubbleOpenCloseButton: {
        width: normalize(15),
        height: normalize(15),
    },
    miniBubbleHeaderText: {
        font: "bold",
        fontSize: normalize(18),
    },
    miniBubbleEditButtonContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    miniBubbleEditButton: {
        width: normalize(23),
        height: normalize(23),
        
    },
    miniBubbleEditButtonText: {
        fontSize: normalize(14),
        color: "#686868",
    },
    bubblePeopleContainer: {
        margin: normalize(10),
    },

    // see all button 
    seeAllButtonContainer: {
        backgroundColor: "#C8AEFF",
        borderRadius: normalize(30),
        marginLeft: "20%",
        marginRight: "20%",
        alignItems: "center",
    },
    seeAllButtonText: {
        color: "#fff",
        fontWeight: "400",
        fontSize: normalize(17),
        padding: normalize(8),
    },

    
  });
  
  export default BubbleStyles;
  