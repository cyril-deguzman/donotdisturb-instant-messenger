import { StyleSheet } from "react-native";
import colors from "../../../colors";

const styles = StyleSheet.create({
  listContainer: { paddingHorizontal: 0, paddingBottom: 20, paddingTop: 0 },
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
});

export default styles;
