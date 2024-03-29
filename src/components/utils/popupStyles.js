import { StyleSheet } from "react-native";
import colors from "../../../colors";
import normalize from "react-native-normalize";

const modalStyles = StyleSheet.create({
  //pop ups
  popupContainer: {},
  popupContentContainer: {
    borderRadius: normalize(20),
    backgroundColor: "#fff",
    width: "80%",
    padding: "5%",
  },
  popupDeleteAlertIcon: {
    margin: normalize(12),
  },
  popupDeleteDescriptionContainer: {
    marginHorizontal: normalize(12),
    marginBottom: normalize(20),

    alignItems: "center",
    justifyContent: "center",
  },
  popupDeleteDescriptionText: {
    fontWeight: "700",
    color: "#383157",
    fontSize: normalize(18),

    textAlign: "center",
  },
  popupCancelDeleteButtonContainer: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
    //marginHorizontal: normalize(10),
  },
  popupButtonContainer: {
    //paddingHorizontal: normalize(10),
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(5),
  },
  popupDeleteText: {
    color: "#FF0000",
    fontSize: normalize(16),
  },
  popupCancelText: {
    color: "#383157",
    fontSize: normalize(16),
  },
  popupGroupNameText: {
    fontWeight: "700",
    color: "#383157",
    fontSize: normalize(18),
  },
  popupTextInputContainer: {
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: normalize(20),
    marginTop: normalize(15),
  },
});

export default modalStyles;
