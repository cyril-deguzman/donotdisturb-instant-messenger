import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";

const addMembersStyles = StyleSheet.create({
  label: {
    fontSize: normalize(20),
    fontFamily: "Inter",
    fontWeight: "bold",
    marginTop: normalize(5),
  },
  containerLabel: {
    fontSize: normalize(20),
    fontFamily: "Inter",
    fontWeight: "bold",
    color: "#4F457C",
    marginLeft: normalize(5),
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  indicator: {
    width: normalize(20),
    height: normalize(20),
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  rowSpace: {
    flexDirection: "row",
    marginTop: normalize(20),
    marginHorizontal: normalize(20),
    alignItems: "center",
    justifyContent: "space-between",
  },
  topContainer: {
    marginHorizontal: normalize(20),
  },
  profileImg: {
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(50),
  },
  together: {
    flexDirection: "row",
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
  },
  nextStyle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: normalize(5),
  },
  nextButton: {
    width: normalize(77),
    height: normalize(39),
    marginTop: normalize(8),
    justifyContent: "flex-end",
  },
  backIcon: {
    width: normalize(20),
    height: normalize(20),
    marginTop: normalize(8),
    marginRight: normalize(20),
  },
  row: {
    flexDirection: "row",
    marginTop: normalize(40),
    alignItems: "center",
    justifyContent: "space-between",
  },
  messageContainer: {
    width: "100%",
    height: "80%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: normalize(50),
    borderTopRightRadius: normalize(50),
    overflow: "hidden",
    paddingTop: normalize(35),
    paddingLeft: normalize(20),
    paddingRight: normalize(10),
  },
  backImage: {
    width: "100%",
    height: "120%",
    position: "absolute",
    top: 0,
    resizeMode: "cover",
  },
});

export default addMembersStyles;
