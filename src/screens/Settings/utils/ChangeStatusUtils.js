import useIndicator from "../../../hooks/useIndicator";
import normalize from "react-native-normalize";
import { StyleSheet } from "react-native";

const initDropdownItems = [
  { label: "Never", value: "Never", labelStyle: { color: "#4F457C" } },
  {
    label: "30 minutes",
    value: "30 minutes",
    labelStyle: { color: "#4F457C" },
  },
  { label: "1 hour", value: "1 hour", labelStyle: { color: "#4F457C" } },
  { label: "6 hours", value: "6 hours", labelStyle: { color: "#4F457C" } },
  { label: "12 hours", value: "12 hours", labelStyle: { color: "#4F457C" } },
  { label: "1 day", value: "1 day", labelStyle: { color: "#4F457C" } },
  { label: "Custom", value: "Custom", labelStyle: { color: "#4F457C" } },
];

const handleConfirm = (
  date,
  setDropdownItems,
  setDropdownValue,
  hideDatePicker
) => {
  const customDuration =
    date.getHours().toString() +
    " hours and " +
    date.getMinutes().toString() +
    " minutes";

  setDropdownItems([
    {
      label: customDuration,
      value: customDuration,
      labelStyle: { color: "#4F457C" },
    },
    ...initDropdownItems,
  ]);

  setDropdownValue(customDuration);
  hideDatePicker();
};

const timeOptions = [
  "30 minutes",
  "1 hour",
  "3 hours",
  "8 hours",
  "24 hours",
  "Custom",
];

const radioData = [
  {
    id: "Open to Chat",
    value: "Open to Chat",
    indicator: useIndicator("openToChat"),
  },
  {
    id: "Be Right Back",
    value: "Be Right Back",
    indicator: useIndicator("idle"),
  },
  {
    id: "Do Not Disturb",
    value: "Do Not Disturb",
    indicator: useIndicator("doNotDisturb"),
  },
  {
    id: "Invisible",
    value: "Invisible",
    indicator: useIndicator("invisible"),
  },
];

const dictionary = {
  "Open to Chat": "openToChat",
  "Be Right Back": "idle",
  "Do Not Disturb": "doNotDisturb",
  Invisible: "invisible",
};

const styles = StyleSheet.create({
  userProfileContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: normalize(-15),
    zIndex: 1,
  },
  userImage: {
    borderRadius: normalize(100),
    width: normalize(64),
    height: normalize(64),
  },
  userOSI: {
    width: normalize(22),
    height: normalize(22),
    marginLeft: normalize(-16),
  },
  userInfoContainer: {
    flex: 0.3,
    width: "70%",
    flexDirection: "column",
    alignItems: "center",

    marginBottom: "1%",
  },
  userTextName: {
    fontSize: normalize(20),
    fontWeight: "bold",
  },
  userTextStatus: {
    fontSize: normalize(16),
    color: "#006FE6",
  },
  chatInfoTextContainer: {
    alignItems: "center",
    paddingTop: 22,
    backgroundColor: "#fff",
    borderRadius: 30,
    height: "50%",
    width: "100%",
  },
});

export {
  initDropdownItems,
  handleConfirm,
  timeOptions,
  radioData,
  dictionary,
  styles,
};
