import { StyleSheet } from "react-native";
import colors from "../../../../colors";

const messagesStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#F6F6FF",
  },
  row: {
    flexDirection: "row",
    marginTop: 75,
    marginHorizontal: 20,
    alignItems: "center",
  },
  statusBar: {
    height: 56,
    backgroundColor: "#fff",
    borderRadius: 30,
    marginRight: 25,
    flex: 1,
    flexDirection: "row",
  },
  leftStatusBar: {
    flexDirection: "row",
    width: 70,
  },
  profileImg: {
    width: 67,
    height: 67,
    position: "absolute",
    marginTop: -5,
    marginLeft: -5,
  },
  indicator: {
    width: 25,
    height: 25,
    position: "absolute",
    bottom: -10,
    right: 4,
  },
  rightStatusBar: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Inter",
  },
  customMessage: {
    color: "#989898",
    fontSize: 11,
    fontWeight: "bold",
    fontFamily: "Inter",
  },
  tabLabel: {
    fontFamily: "Inter",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Inter",
    marginBottom: 5,
  },
  pencilIcon: { width: 40, height: 40, marginTop: 8 },
  messageContainer: {
    width: "100%",
    height: "75%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: "hidden",
    paddingTop: 35,
    paddingHorizontal: 25,
  },
  bgImg: {
    width: "100%",
    height: "120%",
    position: "absolute",
    top: 0,
    resizeMode: "cover",
  },
});

export default messagesStyles;
