import { StyleSheet } from "react-native";


const defaultStatusStyles = StyleSheet.create({
    HomeDefaultStatusInvisible: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",
        paddingTop: 46,
        boxSizing: "border-box",
        backgroundColor: "rgba(246,246,255,1)",
        height: "100%",
        //backgroundColor: "rgba(246,1,1,1)"
      },
      TopHalf: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        boxSizing: "border-box",
        //backgroundColor: "rgba(246,1,1,1)",
      },

      CurrentStatus: {
        //marginTop: ,
        position: "relative",
        width: 291,
        height: 71,
        boxSizing: "border-box",
      },
      HeaderBG: {
        position: "absolute",
        top: 6,
        left: 27,
        width: 264,
        height: 56,
        // backgroundColor: "white",
        // borderColor: "rgba(246,246,255,1)",
        // borderRadius: 25,
      },
      ProfilePic: {
        position: "absolute",
        width: 67,
        height: 67,
      },
      CurrentStatusOSI: {
        position: "absolute",
        top: 46,
        left: 42,
        width: 25,
        height: 25,
        // borderWidth: 2,
        // borderColor: "rgba(246,246,255,1)",
        // borderRadius: 12.5,
        // boxSizing: "border-box",
        // backgroundColor: "rgba(30,227,62,1)",
      },
      UserName: {
        position: "absolute",
        top: 19,
        left: 74,
        color: "rgba(0,0,0,1)",
        fontSize: 14,
        lineHeight: 14,
        //fontFamily: "Inter, sans-serif",
        fontWeight: "700",
      },
      UserCustomMessage: {
        position: "absolute",
        top: 39,
        left: 74,
        color: "rgba(152,152,152,1)",
        fontSize: 10,
        lineHeight: 10,
        //fontFamily: "Inter, sans-serif",
        fontWeight: "700",
      },
      BottomHalf: {
        
        top: 25,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: 805,
        paddingLeft: 36,
        paddingRight: 100,
        paddingTop: 25,
        borderRadius: 50,
        paddingBottom: 664,
        boxSizing: "border-box",
        backgroundColor:  "rgba(255,255,255,1)",
      },
      SetYourDefaultStatusText: {
        color: "rgba(79,69,124,1)",
        fontSize: 20,
        lineHeight: 20,
        //fontFamily: "Inter, sans-serif",
        fontWeight: "800",
      },
      SetYourDefaultStatusDesc: {
        color: "rgba(104,104,104,1)",
        fontSize: 13,
        lineHeight: 13,
        //fontFamily: "Inter, sans-serif",
        fontWeight: "400",
        marginTop: 8
      },
      DefaultStatusText: {
        color: "rgba(79,69,124,1)",
        fontSize: 20,
        lineHeight: 20,
        //fontFamily: "Inter, sans-serif",
        fontWeight: "700",
        marginTop: 40
      },
      Osilist: {
        width: 312,
        height: 148,
        boxSizing: "border-box",
        //backgroundColor: "rgba(246,1,1,1)",
        marginTop: 10,
      },
    
    
      SetStatusMessageGroup: {
        width: 309,
        height: 67,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
        marginTop: 30
      },
    
      SetStatusMessageGroupHeader: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        width: "100%",
        boxSizing: "border-box",
      },
      SetStatusMessageText: {
        color: "rgba(90,80,132,1)",
        fontSize: 15,
        lineHeight: 15,
        //fontFamily: "Inter, sans-serif",
        fontWeight: "700",
        width: "60%"
      },
      OptionalText: {
        color: "rgba(100,100,100,1)",
        fontSize: 10,
        lineHeight: 10,
        //fontFamily: "Inter, sans-serif",
        fontWeight: "400",
        textAlign: "right",
        width: "40%"
      },
      SetStatusMessageTextBox: {
        width: "100%",
        height: 42,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,1)",
        borderRadius: 5,
        boxSizing: "border-box",
        padding: 10
      },
  });
  
  export default defaultStatusStyles;
  