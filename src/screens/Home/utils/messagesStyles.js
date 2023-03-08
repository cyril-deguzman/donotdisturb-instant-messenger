import { StyleSheet } from "react-native";
import colors from "../../../../colors";

const messagesStyles = StyleSheet.create({
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
    paddingLeft: 27,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6FF",
  },
});

export default messagesStyles;
