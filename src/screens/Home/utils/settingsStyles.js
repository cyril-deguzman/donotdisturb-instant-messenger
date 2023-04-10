import { StyleSheet } from "react-native";
import colors from "../../../../colors";
import normalize from "react-native-normalize";

const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6FF",
  },
  bgContainer: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingsContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: normalize(50),
    borderTopRightRadius: normalize(50),
    paddingTop: normalize(35),
  },
  chatInfoContainer: {
    width: "100%",
    height: normalize(400),
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 35,
  },
  userInfoContainer: {
    flex: 0.3,
    width: "80%",
    flexDirection: "column",
    alignItems: "center",
    // marginTop: "1%",
    marginBottom: "1%",
  },
  groupInfoContainer: {
    flex: 0.3,
    width: "80%",
    flexDirection: "column",
    alignItems: "center",
    // marginTop: "1%",
    marginBottom: "5%",
  },
  chatInfoGroupContainer: {
    width: "100%",
    height: "80%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 35,
  },
  backgroundImage: {
    marginLeft: -101,
    margineTop: -158,
    width: 595,
    height: 595,
    position: "absolute",
  },
  userProfileContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: normalize(-15),
    zIndex: 1,
  },
  userImage: {
    borderTopLeftRadius: normalize(100),
    borderTopRightRadius: normalize(100),
    borderBottomLeftRadius: normalize(100),
    borderBottomRightRadius: normalize(100),
    width: normalize(128),
    height: normalize(128),
  },
  userOSI: {
    width: normalize(35),
    height: normalize(35),
    marginLeft: normalize(-30),
  },
  userTextContainer: {
    alignItems: "center",
    padding: normalize(30),
    backgroundColor: "#fff",
    borderRadius: normalize(30),

    width: "100%",

    elevation: 10,
    shadowColor: "#000",
  },
  userTextContainerShadow: {
    width: "80%",
    marginBottom: "5%",

    overflow: "hidden",
    paddingBottom: normalize(8),
    paddingHorizontal: normalize(2),
    borderRadius: normalize(30),
  },
  userTextName: {
    fontSize: normalize(24),
    fontWeight: "bold",
  },
  userTextStatus: {
    fontSize: normalize(16),
    color: "#006FE6",
  },
  chatInfoTextContainer: {
    alignItems: "center",
    padding: 30,
    backgroundColor: "#fff",
    borderRadius: 30,

    height: "50%",
    width: "100%",
  },
  userTheySeeYouStatus: {
    fontSize: normalize(14),
    color: "#818181",
    textAlign: "center",
  },
  /*
    userTextContainerShadow: {
        backgroundColor: "#000",
        borderRadius: 30,

        height: "50%",
        width: "100%",
        zIndex: 0,
        marginTop: -25,
    },
    */
});

export default settingsStyles;
