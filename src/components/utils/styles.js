import { StyleSheet } from "react-native";
import colors from "../../../colors";
import normalize from "react-native-normalize";

const styles = StyleSheet.create({
  listContainer: { paddingHorizontal: 0, paddingBottom: 20, paddingTop: 0, backgroundColor: "transparent" },
  row: {
    flexDirection: "row",
    marginTop: 3,
    alignItems: "center",
    maxHeight: 19,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: "medium",
    fontFamily: "Inter",
  },
  time: {
    fontSize: 13,
    fontFamily: "Inter",
    lineHeight: 13,
  },
  messagePreview: {
    marginTop: -2,
    fontSize: 13,
    fontFamily: "Inter",
  },
  statusIndicatorText: {
    marginTop: 3,
    fontSize: 11,
    fontFamily: "Inter",
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 6,
  },
  indicator: {
    position: "absolute",
    width: 18,
    height: 18,
    bottom: 0,
    right: -1,
  },
  smallIndicator: {
    width: 13,
    height: 13,
  },
  // search bar
  searchContainer: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    // backgroundColor: "white",
    backgroundColor: "transparent",
    paddingLeft: 0,
    paddingRight: 0,
  },
  searchInputContainer: {
    borderRadius: 10,
    height: 30,
    backgroundColor: "#F6F6FF",
  },
  searchInputContainerWhite: {
    borderRadius: 10,
    height: 35,
    backgroundColor: "white",
  },
  searchInput: { fontSize: 14 },

  // option box
  optionHeaderContainer: {
    paddingLeft: normalize(27),
    paddingBottom: normalize(10),
  },
  optionHeaderText: {
    color: "#686868",
    font: normalize(16),
  },
  optionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  optionText: {
    color: "#383157",
    alignSelf: "center",
    font: normalize(16),
  },
  optionIcon: {
    marginLeft: normalize(40),
    marginRight: normalize(20),
    marginTop: normalize(12),
    marginBottom: normalize(12),
    alignSelf: "flex-start",
    width: normalize(35),
    height: normalize(35),
  },

  chatInfoOptionIcon: {
    marginLeft: normalize(40),
    marginRight: normalize(20),
    marginTop: normalize(15),
    marginBottom: normalize(15),
    alignSelf: "flex-start",
    width: normalize(35),
    height: normalize(35),
  },

  switchContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  //header
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: normalize(20),
    marginBottom: normalize(20),
    marginLeft: normalize(18),
    width: "100%",
  },
  headerBackButton: {
    width: normalize(20),
    height: normalize(20),
    margin: normalize(10),
  },
  headerText: {
    fontSize: normalize(20),
    fontWeight: "700",
    marginLeft: normalize(10),
  },

  //chatinfostatusbox
  chatInfoOptionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 90,
    marginRight: 30
  },

  SaveButton: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: "100%",
    borderRadius: 50,
    boxSizing: "border-box",
    backgroundColor: "rgba(122,107,188,1)",
    left: 1,
  },
  SaveHeaderButtonBG: {
    display: "flex",
    flexDirection: "column",
    
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 19,
    paddingRight: 19,
    paddingTop: 8,
    paddingBottom: 11,
    borderRadius: 30,
    boxSizing: "border-box",
    backgroundColor: "rgba(122,107,188,1)",
    marginLeft: 90,
    
 
    
  },
  SaveText: {
    top: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "rgba(255,255,255,1)",
    fontSize: 16,
    lineHeight: 16,
    //fontFamily: "Inter, sans-serif",
    fontWeight: "700",
    textAlign: "center",
  },
});

export default styles;
