import { StyleSheet } from "react-native";

const chatStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  msgContainer: {
    fontFamily: "Inter",
  },
  inputToolbar: {
    backgroundColor: "white",
  },
  textInput: {
    fontFamily: "Inter",
    fontSize: 14,
    marginTop: 5,
    marginRight: 10,
    paddingLeft: 10,
    backgroundColor: "#E1E2FF",
    borderRadius: 10,
    width: 50,
    height: 20,
  },
  bubbleText: {
    fontFamily: "Inter",
    fontSize: 14,
  },
  leftBubbleBG: { backgroundColor: "white" },
  rightBubbleBG: { backgroundColor: "#AE6FFF" },
});

export default chatStyles;
